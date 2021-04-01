import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Popup from "reactjs-popup";
import { firebaseDb } from "../../../../firebase";

import Aside from "../../Aside";

const NewNode = () => {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const [nodeName, setNodeName] = useState("");
  const [nodeDesc, setNodeDesc] = useState("");
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    firebaseDb.child("custom_nodes").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setNodes({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const deleteNode = (node) => {
    if (window.confirm("Are you sure to delete this node")) {
      firebaseDb.child(`custom_nodes/${node}`).remove();
    }
  };

  return (
    <div className="app">
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <div className={`app ${toggled ? "toggled" : ""}`}>
        <Aside toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      </div>
      <main>
        <div className="new-node">
          <header style={{ padding: "20px 24px" }}>
            <Popup
              trigger={
                <a className="add-project" style={{ cursor: "pointer" }}>
                  New Node
                </a>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Create Node </div>
                  <div className="content">
                    <label style={{ marginLeft: "10px", marginTop: "10px" }}>
                      Name of Node:
                    </label>
                    <input
                      type="text"
                      placeholder="Name of the Node"
                      value={nodeName}
                      onChange={(evt) => setNodeName(evt.target.value)}
                      style={{
                        width: "90%",
                        border: "1px solid black",
                        marginTop: "5px",
                      }}
                    />
                    <div style={{ marginTop: "20px" }}>
                      <label style={{ marginLeft: "10px" }}>
                        Description of Node:
                      </label>
                      <input
                        type="text"
                        placeholder="Description of the Node"
                        value={nodeDesc}
                        onChange={(evt) => setNodeDesc(evt.target.value)}
                        style={{
                          width: "90%",
                          border: "1px solid black",
                          marginTop: "5px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      className="button"
                      onClick={() => {
                        if (nodeName === "") {
                          alert("Please provide name of the node");
                          return;
                        }
                        if (nodeDesc === "") {
                          alert("Please provide description of the node");
                          return;
                        }
                        var data = {
                          id: (
                            Math.random() +
                            (sessionStorage.length + 1)
                          ).toString(),
                          name: `${nodeName}`,
                          Description: `${nodeDesc}`,
                        };
                        firebaseDb.child("custom_nodes").push(data);
                        close();
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </header>
          <div className="main-content">
            <div className="main-content-list">
              <div className="title">
                <table id="node-table">
                  <thead>
                    <tr>
                      <th>Node Name</th>
                      <th>Node Description</th>
                      <th>No of Field Present</th>
                      <th>Remove Node</th>
                    </tr>
                  </thead>
                  {Object.keys(nodes).map((id) => {
                    const node = JSON.stringify(nodes[id]);
                    var noOfFields = 0;
                    if (nodes[id].Image === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textArea === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textField === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].Image2 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textArea2 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textField2 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].Image3 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textArea3 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].textField3 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].code === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].code2 === "true") {
                      noOfFields++;
                    }
                    if (nodes[id].code3 === "true") {
                      noOfFields++;
                    }
                    return (
                      <tbody key={id}>
                        <tr>
                          <td>
                            <Link
                              to={{
                                pathname: "/create-node",
                                state: `${node}`,
                                id: `${id}`,
                                name: `${nodes[id].name}`,
                                description: `${nodes[id].Description}`,
                              }}
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {nodes[id].name}
                            </Link>
                          </td>
                          <td>{nodes[id].Description}</td>
                          <td>{noOfFields}</td>
                          <td>
                            <button
                              onClick={() => deleteNode(id)}
                              className="delete"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                  {/* {Array.apply(0, new Array(sessionStorage.length)).map(
                    function(o, i) {
                      const elemen = JSON.parse(
                        `${sessionStorage.getItem(`${sessionStorage.key(i)}`)}`
                      );
                      var noOfFields = 0;
                      if (elemen.Image === "true") {
                        noOfFields++;
                      }
                      if (elemen.textArea === "true") {
                        noOfFields++;
                      }
                      if (elemen.textField === "true") {
                        noOfFields++;
                      }
                      if (elemen.Image2 === "true") {
                        noOfFields++;
                      }
                      if (elemen.textArea2 === "true") {
                        noOfFields++;
                      }
                      if (elemen.textField2 === "true") {
                        noOfFields++;
                      }
                      if (elemen.Image3 === "true") {
                        noOfFields++;
                      }
                      if (elemen.textArea3 === "true") {
                        noOfFields++;
                      }
                      if (elemen.textField3 === "true") {
                        noOfFields++;
                      }
                      return (
                        <tbody key={elemen.id}>
                          <tr>
                            <td>
                              <Link
                                to={{
                                  pathname: "/create-node",
                                  state: `${sessionStorage.getItem(
                                    `${sessionStorage.key(i)}`
                                  )}`,
                                  name: `${sessionStorage.key(i)}`,
                                  description: `${elemen.Description}`,
                                }}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {elemen.name}
                              </Link>
                            </td>
                            <td>{elemen.Description}</td>
                            <td>{noOfFields}</td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteNode(`${sessionStorage.key(i)}`)
                                }
                                className="delete"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                  )} */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewNode;
