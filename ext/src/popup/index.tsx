import { getTables } from "./send";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Container, Nav, Navbar, Table } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function IndexPopup() {
  const [count, setCount] = useState(0);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const tab = getTables(getTablesHandle);
  }, []);

  const getTablesHandle = (list) => {
    setCount(list.length);
    setTables(list);
  };

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
        <Alert variant="primary">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
        </Alert>
        <h2>Table({count})</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default IndexPopup;
