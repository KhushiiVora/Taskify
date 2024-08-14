import styled from "styled-components";
import theme from "./theme";

const StyledDiv = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.color1};
  border: 1px solid ${(props) => props.theme.color3};
  border-radius: 0.5rem;
  box-shadow: 0 0 10px 2px ${(props) => props.theme.bgColor2};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }

  .span-button {
    font-weight: bold;
    /* color: skyblue; */
    color: ${(props) => props.theme.color3};
    cursor: pointer;
  }

  .category_content {
    display: flex;
    justify-content: space-between;
    line-height: 1.3;
  }
  .category_content input {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: inherit;
    outline: none;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    margin-bottom: 0.5rem;
  }
`;

const menuItemEditStyling = {
  color: `${theme.color3}`,
  display: "flex",
  gap: "0.2rem",
  "& .icons": {
    color: `${theme.color3}`,
    fontSize: "1.1rem",
  },
};

const menuItemDeleteStyling = {
  color: `${theme.color2}`,
  display: "flex",
  gap: "0.2rem",
  "& .icons": {
    color: `${theme.color2}`,
    fontSize: "1.1rem",
  },
};
export { StyledDiv, menuItemDeleteStyling, menuItemEditStyling };
