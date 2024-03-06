import { NavLink, Outlet } from "react-router-dom";

export default function MainNavbar() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        {"      "}
        <NavLink to="/profile">Profile</NavLink>
        {"      "}
        <NavLink to="/signup">Sign Up</NavLink>
        {"  "}
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
