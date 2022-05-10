
const capture = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "capture" });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('capture').addEventListener(
        'click', capture);
});