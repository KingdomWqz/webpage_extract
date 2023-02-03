import { useState } from "react"
import "./popup.css"

function IndexPopup() {
  const [data, setData] = useState("")

  const table_click = async () => {
    const imgData = await chrome.tabs.captureVisibleTab();
    console.log(imgData);
  }

  return (
    <div className="body">
      <div className="menu">
          <button id="capture">截图</button>
          <button id="table" onClick={table_click}>表格分析</button>
          <button id="pageContent">获取网页内容</button>
          <button id="log">Log</button>
          <button id="test">Test</button>
      </div>
      <div>
          <div>样式名列表</div>
          <div id="classList" className="area">null</div>
          <div>父级容器</div>
          <div id="parentClass" className="area">null</div>
          <div>数据提取示例</div>
          <div id="extract" className="area">null</div>
      </div>
    </div>
  )
}

export default IndexPopup
