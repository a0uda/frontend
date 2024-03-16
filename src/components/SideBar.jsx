// Filename - components/Sidebar.js

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 	return (
// 		<>
// 			<Button variant="primary" onClick={handleShow}>
// 				Launch
// 			</Button>

// 			<Offcanvas show={show} onHide={handleClose}>
// 				<Offcanvas.Header closeButton>
// 					<Offcanvas.Title>Offcanvas</Offcanvas.Title>
// 				</Offcanvas.Header>
// 				<Offcanvas.Body>
// 					Some text as placeholder. In real life you can have the elements you
// 					have chosen. Like, text, images, lists, etc.
// 				</Offcanvas.Body>
// 			</Offcanvas>
// 		</>
// 	);
// }

// export default Example;

const Sidebar = ({ SidebarData, toggleSideBar, sideBar }) => {
  // const [sidebar, setSidebar] = useState(true);

  // const toggleSidebar = () => setSidebar(!sidebar);
  // setSidebar(showSideBar)

  const [show, setShow] = useState(false);
  const userType = useSelector((state) => state.user.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <Offcanvas show={sideBar} onHide={toggleSideBar}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className={`sidebar-entry ${userType != "M" && "d-none"} `}
            onClick={() => {
              navigate("/creatematch");
            }}
          >
            Create Match
          </div>
          <div
            className={`sidebar-entry ${userType != "M" && "d-none"} `}
            onClick={() => {
              navigate("/addstadium");
            }}
          >
            Add Stadium
          </div>
          <div
            className={`sidebar-entry ${userType == "A" && "d-none"} `}
            onClick={() => {
              navigate("/viewmatches");
            }}
          >
            View Matches
          </div>
          <div
            className={`sidebar-entry ${userType != "A" && "d-none"} `}
            onClick={() => {
              navigate("/admin");
            }}
          >
            Pending Users
          </div>
          <div
            className={`sidebar-entry ${userType != "A" && "d-none"} `}
            onClick={() => {
              navigate("/admindelete");
            }}
          >
            Delete Users
          </div>
          <div
            className={`sidebar-entry ${userType != "F" && "d-none"} `}
            onClick={() => {
              navigate("/editdetails");
            }}
          >
            Edit Details
          </div>
          <div
            className={`sidebar-entry ${userType != "F" && "d-none"} `}
            onClick={() => {
              navigate("/yourtickets");
            }}
          >
            Your Tickets
          </div>
          <div
            className="sidebar-entry"
            onClick={() => {
              localStorage.clear();
			  window.location.reload();
              navigate("/home");
            }}
          >
            Log Out
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
