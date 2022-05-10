let captureDiv = null;

/**
 * 截图
 * @param {*} e 
 */
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

const getPageContent = () => {
    const reg = /class="(\S*)"/g;
    const html = document.body.innerHTML;
    const classes = html.match(reg);

    // 统计class
    let data = {};
    for (let i = 0; i < classes.length; i++) {
        const n = data[classes[i]] ? data[classes[i]] : 0;
        data[classes[i]] = n + 1;
    }
    console.log(data);

    // 统计个数，排除1个和2个，不大可能是搜索结果相关的class
    let num = {};
    for (const key in data) {
        if (data[key] === 1 || data[key] === 2) continue;

        const n = num[data[key]] ? num[data[key]] : 0;
        num[data[key]] = n + 1;
    }
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
    console.log(max);

    // 获取相关class
    let result = [];
    for (const key in data) {
        if (data[key] == parseInt(max.id)) result.push(key.replace('class="', '').replace('"', ''));
    }
    console.log(result);

    // 判断父级
    let p = 0;
    for (; p < result.length; p++) {
        const allChilds = document.querySelector(`.${result[p]}`).getElementsByTagName('*');
        let num = 0;
        for (let j = 0; j < allChilds.length; j++) {
            if (result.indexOf(allChilds[j].className) != -1) num++;
        }
        console.log(result[p], num);
        if (num == result.length - 1) break;
    }

    // 提取示例
    const extracts = [];
    const allChilds = document.querySelector(`.${result[p]}`).getElementsByTagName('*');
    console.log(allChilds);
    for (let i = 0; i < allChilds.length; i++) {
        if (allChilds[i].tagName == 'FONT') continue;
        if (allChilds[i].firstChild && allChilds[i].firstChild.nodeType == 3) {
            extracts.push(allChilds[i].innerText);
        }
    }
    console.log(extracts);

    chrome.runtime.sendMessage({
        action: 'getHTML',
        message: result,
        parent: result[p],
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