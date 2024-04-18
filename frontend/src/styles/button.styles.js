import styled from "styled-components";

const ButtonDiv = styled.div`
  .icon_button {
    background: ${(props) => props.theme.bgColor2};
    border: none;
    border-radius: 50%;
    outline: none;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor2};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .icons {
    font-size: 1.5rem;
    color: ${(props) => props.theme.iconColor};
  }
  .text_icons {
    font-size: 1.2rem;
    color: ${(props) => props.theme.iconColor};
  }
  .text_button {
    background: ${(props) => props.theme.color1};
    padding: 0.5rem;
    border: 2px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor2};
    color: ${(props) => props.theme.iconColor};
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;
  }

  .underlined_button {
    background: ${(props) => props.theme.color1};
    padding: 0.3rem;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.iconColor};
    border-radius: 0.5rem;
    outline: none;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor2};
    color: ${(props) => props.theme.iconColor};
    font-size: 1rem;
    margin: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;
  }
`;

export default ButtonDiv;
