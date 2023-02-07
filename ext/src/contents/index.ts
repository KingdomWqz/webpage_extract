import type { PlasmoCSConfig } from "plasmo"

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        const tableDOMs = document.querySelectorAll('table');
        sendResponse({
            status: 1,
            data: {
                num: tableDOMs.length
            }
        });
        return true;
    }
);

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

