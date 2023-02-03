chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender);
    if (request.action === "Log") {
      console.log("Log");
  
      const debuggee = { tabId: request.tabId };
      chrome.debugger.attach(debuggee, "1.3", onAttach.bind(null, debuggee));
    } else if (request.action === "Test") {
      console.log("Test");
  
      const debuggee = { tabId: request.tabId };
      chrome.debugger.sendCommand(debuggee, "Runtime.enable");
      // chrome.debugger.sendCommand(debuggee, "Page.enable");
      chrome.debugger.sendCommand(debuggee, "Log.enable");
  
      chrome.debugger.onEvent.addListener((source, method, param) => {
        if (method == "Runtime.consoleAPICalled") {
          if (param.type == "warning" || param.type == "error") {
            console.log(source, method, param);
          }
        }
      });
    }
    return true;
  });
  
  const onAttach = (debuggee) => {
    if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      return;
    }
  
    console.log("attach succeed");
    console.log(debuggee.tabId);
    //   chrome.debugger.sendCommand({ tabId: debuggee.tabId }, "Log.clear");
    //   chrome.debugger.sendCommand({ tabId: debuggee.tabId }, "Log.enable");
  
    //   chrome.debugger.onEvent.addListener((source, method, param) => {
    //     console.log(source);
    //   });
  };
  