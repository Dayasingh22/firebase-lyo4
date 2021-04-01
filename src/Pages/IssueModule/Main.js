import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaFolderPlus,
  FaLock,
  FaUserCircle,
  FaBuffer,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { firebaseDb } from "../../firebase";
import { Typography } from "@material-ui/core";
const Main = ({ handleToggleSidebar }) => {
  const [charts, setCharts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseDb.child("charts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setIsLoading(false);
        setCharts({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const deleteFile = (file) => {
    if (window.confirm("Are you sure to delete this file")) {
      firebaseDb.child(`charts/${file}`).remove();
    }
  };

  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>
        <div
          style={{
            padding: "20px 24px",
          }}
        >
          <Link
            to="/flow-chart"
            className="link add-project"
            style={{ textDecoration: "none" }}
          >
            <FaFolderPlus />
            <span className="add"> New Project</span>
          </Link>
          <Link
            to="/new-node"
            className="link add-node"
            style={{
              textDecoration: "none",
              marginLeft: "20px",
            }}
          >
            <FaBuffer />
            <span className="add"> Add Custom Node</span>
          </Link>
        </div>
        <div className="right">
          <input type="text" placeholder="Search Projects" />
        </div>
      </header>
      <div className="main-content">
        {isLoading && (
          <Typography variant="h3" style={{ textAlign: "center" }}>
            Loading...
          </Typography>
        )}
        {Object.keys(charts).map((id) => {
          var d = new Date(charts[id].date);
          return (
            <div className="main-content-list" key={id}>
              <div className="title">
                <Link
                  to={{
                    pathname: "/edit",
                    state: `${charts[id].values}`,
                    id: `${id}`,
                    name: `${charts[id].name}`,
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h2>
                    <FaLock style={{ color: "blue" }} />
                    <span>{charts[id].name}</span>
                  </h2>
                </Link>
              </div>
              <div className="content">
                <div className="author">
                  <FaUserCircle style={{ color: "#ccc" }} />
                  <span className="name">mukund.shridaran</span>
                  <span className="date">
                    - updated on {`${d.toDateString()}`}
                  </span>
                </div>
                <button
                  onClick={() => deleteFile(id)}
                  className="delete main-delete"
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      {/* <div className="main-content">
        {Array.apply(0, new Array(localStorage.length)).map(function(o, i) {
          return (
            <div className="main-content-list" key={localStorage.key(i)}>
              <div className="title">
                <Link
                  to={{
                    pathname: "/edit",
                    state: `${localStorage.getItem(`${localStorage.key(i)}`)}`,
                    name: `${localStorage.key(i)}`,
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h2>
                    <FaLock style={{ color: "blue" }} />
                    <span>{localStorage.key(i)}</span>
                  </h2>
                </Link>
              </div>
              <div className="content">
                <div className="author">
                  <FaUserCircle style={{ color: "#ccc" }} />
                  <span className="name">mukund.shridaran</span>
                  <span className="date">- updated 9 months ago</span>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div> */}
    </main>
  );
};

export default Main;
