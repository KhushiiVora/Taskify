import styled from "styled-components";

const ButtonDiv = styled.div`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
    transition: all 0.3s ease;
  }

  .full-height {
    height: 100%;
  }

  .underlined_button {
    background: ${(props) => props.theme.color1};
    padding: 0.3rem 0.5rem;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.iconColor};
    border-radius: 0.5rem;
    outline: none;
    box-shadow: 0px 0px 10px 5px ${(props) => props.theme.bgColor2};
    color: ${(props) => props.theme.iconColor};
    font-size: 1rem;
    /* margin: 0.2rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filled_button {
    width: 8rem;
    background: ${(props) => props.theme.iconColor};
    color: ${(props) => props.theme.color1};
    font-size: 1rem;
    padding: 0.7rem 2.5rem;
    border-radius: 0.7rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .start_button {
    width: 12rem;
    background: ${(props) => props.theme.iconColor};
    box-shadow: 0px 2px 12px 5px ${(props) => props.theme.bgColor2};
    color: ${(props) => props.theme.color1};
    font-size: 1rem;
    font-weight:bold;
    padding: 1rem 2.5rem;
    border-radius: 0.8rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .start_button:hover,
  .filled_button:hover,
  .underlined_button:hover,
  .text_button:hover {
    transform: translateY(-1px);
  }

  .underlined_button:active,
  .text_button:active {
    box-shadow: none;
    transform: translateY(0px);
  }
  .start_button:active,
  .filled_button:active {
    transform: translateY(1px);
  }

  .link_button {
    border: none;
    background: ${(props) => props.theme.color1};
    color: ${(props) => props.theme.color3};
    font-weight: bold;
    font-size: 1rem;
    font-style: italic;
    cursor: pointer;
  }
`;

export default ButtonDiv;
