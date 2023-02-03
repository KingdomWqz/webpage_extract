import type { PlasmoCSConfig } from "plasmo"

let captureDiv = null;

const capture_mousedown = (e) => {
    const div = document.createElement('DIV');
    div.style.position = 'absolute';
    div.style.border = 'solid 3px red';
    div.style.zIndex = '999';
    div.style.top = `${e.clientY}px`;
    div.style.left = `${e.clientX}px`;

    captureDiv = div;
    document.body.append(div);
    document.body.addEventListener('mousemove', capture_mousemove);
    document.body.addEventListener('mouseup', capture_mouseup);
};

const capture_mousemove = (e) => {
    captureDiv.style.width = `${e.clientX - parseInt(captureDiv.style.left.replace('px', ''))}px`;
    captureDiv.style.height = `${e.clientY - parseInt(captureDiv.style.top.replace('px', ''))}px`;
};

const capture_mouseup = (e) => {
    document.body.removeEventListener('mousemove', capture_mousemove);
    document.body.removeEventListener('mouseup', capture_mouseup);
}

const getClassName = (name) => {
    return name.replace('class="', '').replace('"', '').trim();
}

const getChildNodes = (el) => {
    const childs = [];
    el.childNodes.forEach(e => e.nodeType !== 3 && childs.push(e));
    return childs;
}

const getPageContent = () => {
    let sim = [];
    const tt = document.body.getElementsByTagName('*');
    for (let t = 0; t < tt.length; t++) {
        let num = {};
        let childs = [];

        // 排除SVG
        // length > 10 大概才算结果项 
        if (tt[t].childNodes.length <= 10 ||
            tt[t].tagName.toUpperCase() == 'SVG') continue;
        
        childs = getChildNodes(tt[t]);

        for (let i = 0; i < childs.length; i++) {
            // className != undifined or != ''
            if (childs[i].className) {
                const n = num[childs[i].className] ? num[childs[i].className] : 0;
                num[childs[i].className] = n + 1;
            }
        }
        for (const i in num) {
            if (num[i] > childs.length * 2 / 3) {
                const childs = tt[t].getElementsByTagName('*');
                let classes = '';
                for (let c = 0; c < childs.length; c++) {
                    const name = childs[c].className ? childs[c].className : '';
                    if (childs[c]?.className && classes.indexOf(name) == -1) {
                        classes += `,${name},`;
                    }
                }
                sim.push({ el: tt[t], childs: getChildNodes(tt[t]).length, class: i, classes: classes });
                // break;
            }
        }
    }
    console.log('====== 智能判断可能 ======');
    console.log(sim);
    let allMayClasses = '';
    sim.forEach(s => allMayClasses += s.classes);
    // console.log(allMayClasses);
    console.log('====== 智能判断最有可能 ======');
    sim.sort((a,b) => b.childs - a.childs)
    console.log(sim[0]);


    const reg = /class="(.*?)"/g;
    const html = document.body.innerHTML;
    const classes = html.match(reg);

    // 统计class
    let data = {};
    for (let i = 0; i < classes.length; i++) {
        const name = getClassName(classes[i]);
        const n = data[name] ? data[name] : 0;
        data[name] = n + 1;
    }
    console.log('====== 页面用到的样式及次数 ======');
    console.log(data);

    // 统计个数，排除1,2，不大可能是搜索结果相关的class
    let num = {};
    for (const key in data) {
        if (data[key] === 1 || data[key] === 2 || allMayClasses.indexOf(`,${key},`) == -1) continue;

        const n = num[data[key]] ? num[data[key]] : 0;
        num[data[key]] = n + 1;
    }
    console.log('====== 出现次数相同的样式个数 ======');
    console.log(num);

    // 找最大
    let max = null;
    for (const key in num) {
        if (max) {
            if (num[key] > max.num) {
                max = { id: key, num: num[key] }
            }
        } else {
            max = { id: key, num: num[key] }
        }
    }
    console.log('====== 出现次数最多的 ======');
    console.log(max);

    if (parseInt(max.id) != sim[0].childs) {
        max.id = sim[0].childs;
    }

    // 获取相关class
    let result = [];
    for (const key in data) {
        if (data[key] == parseInt(max.id)) result.push(getClassName(key));
    }
    console.log('====== 出现次数最多的样式列表 ======');
    console.log(result);

    // 判断父级
    let parent = null;
    for (let p = 0; p < result.length; p++) {
        const allChilds = document.querySelector(`.${result[p].replace(/(\s)+/g, '.')}`).getElementsByTagName('*');
        let num = 0;
        for (let j = 0; j < allChilds.length; j++) {
            if (result.indexOf(allChilds[j].className) != -1) num++;
        }
        console.log(result[p], num);

        if (parent) {
            if (num > parent.num) {
                parent = { id: p, num: num }
            }
        } else {
            parent = { id: p, num: num }
        }
    }
    console.log('====== 父级容器的样式 ======');
    console.log(parent);

    // 提取数据
    const extracts = [];
    const allChilds = document.querySelectorAll(`.${result[parent.id].replace(/(\s)+/g, '.')}`);
    allChilds.forEach(child => {
        const nodes = child.getElementsByTagName('*');
        const data = [];
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName == 'FONT' ||
                nodes[i].innerText == '' ||
                nodes[i].innerText.indexOf('\n') != -1 ||
                data.indexOf(nodes[i].innerText) != -1) continue;
            // if (nodes[i].firstChild && nodes[i].firstChild.nodeType == 3) {
            //     data.push(nodes[i].innerText);
            // }
            data.push(nodes[i].innerText);
        }
        extracts.push(data);
    })
    
    console.log('====== 父级容器下的文本节点 ======');
    console.log(extracts);

    chrome.runtime.sendMessage({
        action: 'getHTML',
        message: result,
        parent: result[parent.id],
        extract: extracts
    }, (response) => {
        console.log(response);
    });
}

const showElements = (data) => {
    for (let i = 0; i < data.length; i++) {
        const els = document.querySelectorAll(`.${data[i]}`);
        for (let j = 0; j < 1; j++) {
            console.log(els[j]);
            els[j].style.border = 'solid 1px red';

            // const rect = els[j].getBoundingClientRect();

            // const div = document.createElement('DIV');
            // div.style.position = 'absolute';
            // div.style.border = 'solid 1px red';
            // div.style.zIndex = '999';
            // div.style.top = `${rect.top}px`;
            // div.style.left = `${rect.left}px`;
            // div.style.bottom = `${rect.bottom}px`;
            // div.style.right = `${rect.right}px`;

            // document.body.append(div);
        }
    }
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        // if (request.message === "capture") {
        //     document.body.addEventListener('mousedown', capture_mousedown);
        // }
        if (request.action === 'getHTML') {
            getPageContent();
        }
        if (request.action === 'showEls') {
            showElements(request.data)
        }
        return true;
    }
);

console.log('haha');

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

