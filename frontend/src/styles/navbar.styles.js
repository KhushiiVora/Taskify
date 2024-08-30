import styled from "styled-components";

const StyledNav = styled.nav`
  width: 95%;
  position: fixed;
  backdrop-filter: blur(10px);
  margin: 0.3rem 2rem;
  z-index: 2;

  .navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid ${(props) => props.theme.iconColor};
    box-shadow: 0px 2px 20px ${(props) => props.theme.iconColor};
    border-radius: 0 0 0.7rem 0.7rem;
    overflow: hidden;
  }

  .navbar__logo {
    width: 8%;
    display: flex;
    align-items: center;
    margin: 0.2rem 0 0 0.5rem;
    background-color: ${(props) => props.theme.color1};
  }
  .navbar__logo img {
    width: 100%;
  }

  .navbar__links {
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0.7rem;
    display: flex;
    /* justify-content: end; */
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.iconColor};
    transition: all 0.5s ease;
  }

  a:active {
    transform: translateY(1px);
  }
  .active {
    color: ${(props) => props.theme.successColorDark};
    transform: translateY(-1px);
  }
`;
export { StyledNav };
