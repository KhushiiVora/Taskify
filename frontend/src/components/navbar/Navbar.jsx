import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StyledNav } from "../../styles/navbar.styles";
import taskifyLogo from "/img/taskifyLogo.png";

export default function Navbar(props) {
  const { username } = props;
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
              className={`${location.pathname === "/profile" ? "active" : ""}`}
              to={"/profile"}
            >
              Profile
            </NavLink>
            <NavLink to={`/dashboard/${username}`}>Dashboard</NavLink>
          </div>
        </div>
      </StyledNav>
      <Outlet />
    </>
  );
}
