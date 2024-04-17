import styled from "styled-components";

const ButtonDiv = styled.div`
  .icon_button {
    background: ${(props) => props.theme.bgColor};
    border: none;
    border-radius: 50%;
    outline: none;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .icons {
    font-size: 1.5rem;
    color: ${(props) => props.theme.iconColor};
  }
  .text_button {
    background: ${(props) => props.theme.color1};
    padding: 1rem;
    border: 2px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.iconColor};
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;
  }
`;

export default ButtonDiv;
