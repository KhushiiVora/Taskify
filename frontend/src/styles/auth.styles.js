import styled from "styled-components";
import TextField from "@mui/material/TextField";

const StyledSection = styled.section`
  width: 100%;
  /* height: 100%; */
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .auth_container {
    display: flex;
    width: 50%;
    height: 80%;
    box-shadow: 0px 0px 20px 8px ${(props) => props.theme.bgColor2};
    border-radius: 1.5rem;
  }

  .auth_container--img {
    width: 50%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor3};
    border-radius: 1rem 0rem 0rem 1rem;
  }

  .form_container {
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }

  .form_container h1 {
    color: ${(props) => props.theme.iconColor};
  }

  .form_container__redirect {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

export { StyledSection, StyledTextField };
