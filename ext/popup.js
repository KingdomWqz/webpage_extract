
let classData = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('capture').addEventListener(
        'click', async () => {
            const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { 'action': 'capture' });
        });

    document.getElementById('pageContent').addEventListener('click', async () => {
        const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { 'action': 'getHTML' });
    })

    // document.getElementById('show').addEventListener('click', async () => {
    //     const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    //     const activeTab = tabs[0];
    //     chrome.tabs.sendMessage(activeTab.id, { 'action': 'showEls', 'data': classData });
    // })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == 'getHTML') {
        classData = request.message;
        document.querySelector('#classList').innerHTML = classData.join(', ');
        document.querySelector('#parentClass').innerHTML = request.parent;
        document.querySelector('#extract').innerHTML = request.extract.join(', ');
    }
    return true;
})




