import { getTables } from "./send";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Container, Nav, Navbar } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function IndexPopup() {
  const [tableNum, setTableNum] = useState(0);

  useEffect(() => {
    const tab = getTables(setTableNum);
  }, []);

  const table_click = async () => {
    const imgData = await chrome.tabs.captureVisibleTab({ quality: 50 });
    axios.post("http://localhost:3000/screenshot/save", { img: imgData });
  };

  return (
    <div className="body">
      <Navbar bg="light">
        <Container className="header">
          <Navbar.Brand href="#home">TaurusApp</Navbar.Brand>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="#">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <div className="main">
        <h2>Table({tableNum})</h2>
        <Alert variant="primary">This is a primary alert—check it out!</Alert>
        <div>bbb</div>
      </div>
    </div>
  );
}

export default IndexPopup;
