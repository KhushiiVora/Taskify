import styled from "styled-components";
import { styled as MUIStyled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledSection = styled.section`
  display: flex;
  height: 100%;
  img {
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 50%;
  }

  .chatbox__sidebar {
    width: 20%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    border: 1px solid ${(props) => props.theme.iconColor};
  }
  .chatbox__sidebar--member_card {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .chatbox__message_container {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1rem;
    background-color: ${(props) => props.theme.color2Shadow};
  }
  .chatbox__message_container--messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.7rem;
  }
  .chatbox__message_container--message_card {
    max-width: 50%;
    display: flex;
    gap: 0.7rem;
  }
  .chatbox__message_container--message_card img {
    height: 1.5rem;
  }
  .message_card--profile_pic {
    font-size: 1.4rem;
    color: ${(props) => props.theme.textColor1};
  }
  .sender {
    align-self: flex-end;
  }
  .sender .message_card__message {
    border-radius: 0.7rem 0.2rem 0.7rem 0.7rem;
  }
  .message_card__message {
    background-color: ${(props) => props.theme.color1};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 0.2rem 0.7rem 0.7rem 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.6rem;
  }

  .message_card__message--time {
    font-weight: bold;
    font-size: 0.7rem;
    color: ${(props) => props.theme.textColor1};
    align-self: flex-end;
  }
  .chatbox__message_container--form {
    justify-self: flex-end;
    position: sticky;
    bottom: 1rem;
    display: flex;
    gap: 0.5rem;
    padding-top: 0.7rem;
  }
  .chatbox__message_container--form input {
    padding: 0.5rem;
    flex-grow: 1;
    outline: none;
    border: 1px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
  }
  .chatbox__message_container--form input:focus {
    border: 2px solid ${(props) => props.theme.iconColor};
  }

  .chatbox__message_container--skeleton {
    border-radius: none;
    border-radius: 0 0.7rem 0.7rem 0.7rem;
  }
  .chatbox__message_container--skeleton.sender {
    border-radius: 0.7rem 0rem 0.7rem 0.7rem;
  }
`;

const StyledBadge = MUIStyled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export { StyledSection, StyledBadge };
