import getXPath from "get-xpath";
import type { PlasmoCSConfig } from "plasmo";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let res = [];
  const nodes = document.querySelectorAll("table");
  for (let i = 0; i < nodes.length; i++) {
    const trs = nodes[i].querySelectorAll("tr");
    const tds = nodes[i]
      .querySelector("tr")
      .querySelectorAll(trs[0].querySelector("td") ? "td" : "th").length;

    const table = {
      name: trs.length + " X " + tds,
      xpath: getXPath(nodes[i]),
    };

    res.push(table);
  }

  sendResponse({
    status: 1,
    data: res,
  });

  return true;
});

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};
