import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

const NavBar = () => {

  const activeStyle = {
    textDecoration: "underline",
    color: "darkblue",
  };

  const navA = ({ isActive }) => (isActive ? activeStyle : undefined);

  
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink style={navA} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={navA} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink style={navA} to="/signup">
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
