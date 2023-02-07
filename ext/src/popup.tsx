import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

import "./popup.css";
import "bootstrap/dist/css/bootstrap.min.css";

function IndexPopup() {
  const [data, setData] = useState("");

  useEffect(() => {
    alert("start");
  }, []);

  const table_click = async () => {
    const imgData = await chrome.tabs.captureVisibleTab({ quality: 50 });
    axios.post("http://localhost:3000/screenshot/save", { img: imgData });
  };

  return (
    <div className="body">
      <div className="header">
        <Button variant="outline-primary">Refresh</Button>
      </div>
      
      <h2>Table</h2>
      <Alert variant="primary">
          This is a primary alert—check it out!
        </Alert>
      <div>bbb</div>
    </div>
  );
}

export default IndexPopup;
