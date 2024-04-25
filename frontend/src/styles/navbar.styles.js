import styled from "styled-components";

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.3rem;
  position: fixed;
  background-color: ${(props) => props.theme.bgColor1};
  z-index: 2;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.iconColor};
  }
  .active {
    font-weight: bold;
    text-shadow: 0 4px 2px ${(props) => props.theme.bgColor2};
  }
`;
export { StyledNav };
