import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StyledNav } from "../../styles/navbar.styles";

export default function Navbar(props) {
  const { username } = props;
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
            className={`${location.pathname === "/profile" ? "active" : ""}`}
            to={"/profile"}
          >
            Profile
          </NavLink>
          <NavLink to={`/dashboard/${username}`}>Dashboard</NavLink>
        </div>
      </StyledNav>
      <Outlet />
    </>
  );
}
