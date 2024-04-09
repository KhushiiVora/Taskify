import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar({ username }) {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        {"      "}
        <NavLink to={"/profile"}>Profile</NavLink>
        {"      "}
        <NavLink to={`/dashboard/${username}`}>Dashboard</NavLink>
        {/* Add logout over here */}
      </nav>
      <Outlet />
    </>
  );
}
