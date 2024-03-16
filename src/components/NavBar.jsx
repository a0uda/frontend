import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import * as FaIcons from "react-icons/fa";
import avatar from "../assets/avatar.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";

const NavBar = () => {
  const activePage = useSelector((state) => state.page.value);
  const userType = useSelector((state) => state.user.value);
  // console.log(activePage, userType);
  const dispatch = useDispatch();

  const [sideBar, setSideBar] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const toggleSidebar = () => setSideBar(!sideBar);
  const toggleNavbar = () => setCollapse(!collapse);

  const firstName = useSelector((state) => state.firstname.value);

  return (
    <>
      <Navbar expand="lg" className=" navbar">
        <Sidebar toggleSideBar={toggleSidebar} sideBar={sideBar} />
        <Container>
          <Nav>
            <div className="navleftside">
              <FaIcons.FaBars
                className={`crsp  ${userType == "G" && "d-none"}`}
                onClick={() => {
                  setSideBar(!sideBar);
                }}
              />
              <Nav.Link href="/home">E7GEZLY</Nav.Link>
            </div>
          </Nav>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${userType != "G" && "d-none"}`}
          />
          {/* <FaIcons.FaBars className={`crsp  ${userType == "guest" && "d-none"}`} onClick={() => { setSideBar(!sideBar) }} /> */}

          {/* </NavBar.Toggle> */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`${userType != "G" && "d-none"} navrightside`}
          >
            <Nav className={`${userType != "G" && "d-none"} d-flex gap-3`}>
              <Link
                to="/home"
                className={` navrightsideitem 
                 
                }`}
                onClick={() => {
                  dispatch(setActivePage("home"));
                }}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={` navrightsideitem 
                 
                }`}
                onClick={() => {
                  dispatch(setActivePage("login"));
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`navrightsideitem 
                 
                }`}
                onClick={() => {
                  dispatch(setActivePage("signup"));
                }}
              >
                Signup
              </Link>
            </Nav>
          </Navbar.Collapse>
          <nav className={`${userType == "G" && "d-none"} avatar`}>
            <span>Hello {firstName}</span>
            <img src={avatar} className={`avatar-image `} />
          </nav>

          {/* <Navbar.Collapse id="basic-navbar-nav" className={`navrightside ${userType != "guest" && "d-none"}`}>
                        
                    </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
