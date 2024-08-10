import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StyledNav } from "../../styles/navbar.styles";
import taskifyLogo from "/img/taskifyLogo.png";

export default function MainNavbar() {
  const location = useLocation();
  return (
    <>
      <StyledNav>
        <div className="navbar">
          <div className="navbar__logo">
            <img src={taskifyLogo} alt="Taskify Logo" />
          </div>
          <div className="navbar__links">
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
        </div>
      </StyledNav>
      <Outlet />
    </>
  );
}
