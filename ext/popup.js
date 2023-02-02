let classData = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("capture").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "capture" });
  });

  document.getElementById("pageContent").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "getHTML" });
  });

  document.getElementById("log").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ tabId: activeTab.id, action: "Log" });
  });

  document.getElementById("test").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ tabId: activeTab.id, action: "Test" });
  });
  // document.getElementById('show').addEventListener('click', async () => {
  //     const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  //     const activeTab = tabs[0];
  //     chrome.tabs.sendMessage(activeTab.id, { 'action': 'showEls', 'data': classData });
  // })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "getHTML") {
    classData = request.message;
    document.querySelector("#classList").innerHTML = classData.join(", ");
    document.querySelector("#parentClass").innerHTML = request.parent;
    document.querySelector("#extract").innerHTML = request.extract.join(", ");
  }
  return true;
});

// function requestContent() {
//     var code = [
//         "var __console_log = window.console.log;",
//         "function __sendSublime(msg) {",
//             "__console_log(msg, 'test');",
//         "}",
//         "window.console.log = __sendSublime;"].join('');
//     chrome.tabs.executeScript(null, {code: code});
// }

const captureConsole = () => {
  alert("capture");
};
