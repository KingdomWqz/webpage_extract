
const getTables = async (callback) => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "getTables" }, (res) => {
        console.log(res);
        callback(res.data);
    });
    return activeTab;
}

export { getTables };