import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #a0a0a08c;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .dialog_container {
    width: 30%;
    padding: 3rem 2rem 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .dialog_container__avatar {
    width: 55%;
  }
  .dialog_container__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .dialog_container h1 {
    color: ${(props) => props.theme.iconColor};
    font-size: 1.7rem;
    margin-bottom: 1rem;
  }
  .dialog_container__form--buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }
  .dialog_container__form--date {
    width: 90%;
  }
`;

const StyledTextField = styled(TextField)`
  width: 90%;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export { StyledSection, StyledTextField, StyledDatePicker };
