import styled from "styled-components";
import theme from "./theme";

const StyledSection = styled.section`
  position: absolute;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a8c;
  cursor: pointer;

  h2 {
    text-align: center;
    margin: 1rem;
    color: ${(props) => props.theme.iconColor};
  }
  .panel {
    width: 25%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.color1};
    border: 1px solid ${(props) => props.theme.borderColor};
    overflow-y: scroll;
    height: 100%;
    padding: 0.5rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  }
  .panel__member {
    margin: 0.1rem;
    display: flex;
    align-self: flex-start;
    gap: 1rem;
    color: black;
  }
  .panel__member--username,
  .panel__member--leader {
    text-transform: none;
  }
  .panel__member--leader {
    font-size: 0.6rem;
    color: ${(props) => props.theme.successColorDark};
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .panel__member div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .panel__member--avatar {
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  .profile_container {
    cursor: default;
  }

  .back-button {
    cursor: pointer;
  }

  .back-button,
  th {
    font-size: 1.4rem;
  }
`;

const menuItemIconStyling = {
  display: "flex",
  gap: "0.3rem",
  "& .icons": {
    color: `${theme.iconColor}`,
    fontSize: "1.1rem",
  },
  "& .edit_icons": {
    color: `${theme.color3}`,
    fontSize: "1.1rem",
  },
  "& .delete_icons": {
    color: `${theme.color2}`,
    // fontSize: "1.1rem",
  },
};

export { StyledSection, menuItemIconStyling };
