import styled from "styled-components";
import theme from "../styles/theme";

const StyledSection = styled.section`
  min-height: 100%;
  background-color: ${(props) => props.theme.color1};
  box-shadow: 0px 0px 10px 10px ${(props) => props.theme.color1};
  padding: 1rem;

  table {
    width: 100%;
    text-align: center;
  }
  tr {
    box-shadow: 0px 2px 5px 2px ${(props) => props.theme.bgColor2};
    border-radius: 0.7rem;
  }
  th {
    font-size: 1.1rem;
  }

  td,
  th {
    padding: 0.3rem;
  }

  .tasklist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
  .tasklist__header h1 {

  }
  .tasklist__header .underlined_button {
    height: 2.7rem;
  }

  .tasklist__table {
    margin-top: 1rem;
  }

  .task_row--status_chip {
    border-radius: 0.7rem;
    font-size: 0.9rem;
    width: 6rem;
  }
  .success {
    border: 1px solid ${(props) => props.theme.successColorDark};
    background-color: ${(props) => props.theme.successColorShadow};
    color: ${(props) => props.theme.successColorDark};
  }
  .overdue {
    border: 1px solid ${(props) => props.theme.color2};
    background-color: ${(props) => props.theme.color2Shadow};
    color: ${(props) => props.theme.color2};
  }
  .pending {
    border: 1px solid ${(props) => props.theme.color3};
    background-color: ${(props) => props.theme.color3Shadow};
    color: ${(props) => props.theme.color3};
  }
  .tasklist__assignee .tasklist__assignee--avatar {
    border: 1px solid ${(props) => props.theme.borderColor};
    width: 2rem;
    height: 2rem;
  }
  .tasklist__assignee {
    display: flex;
    justify-content: center;
  }
  .MuiAvatarGroup-avatar {
    width: 2rem;
    height: 2rem;
    font-size: 1.1rem;
  }
  .tasklist__checkboxes,
  .tasklist__icons {
    width: 1rem;
  }
  .tasklist__icons--delete {
    color: ${(props) => props.theme.color2};
  }
  .tasklist__icons--edit {
    color: ${(props) => props.theme.color3};
  }

  .no_task {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .no_task p {
    text-align: center;
  }
  .no_task img {
    width: 50%;
  }
  .skeleton_container {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .skeleton__search,
  .skeleton__taskrow {
    border-radius: 0.7rem;
  }
  .skeleton__search {
    margin: 0.5rem 0;
  }
`;

const colorSuccess = {
  "&.Mui-checked": {
    color: theme.successColorDark,
  },
};

export { StyledSection, colorSuccess };
