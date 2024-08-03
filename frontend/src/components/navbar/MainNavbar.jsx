import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StyledNav } from "../../styles/navbar.styles";

export default function MainNavbar() {
  const location = useLocation();
  return (
    <>
      <StyledNav>
        <div className="navbar">
          <NavLink
            className={`${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={`${location.pathname === "/signup" ? "active" : ""}`}
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            className={`${location.pathname === "/login" ? "active" : ""}`}
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </StyledNav>
      <Outlet />
    </>
  );
}
