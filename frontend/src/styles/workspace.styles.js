import styled from "styled-components";
import theme from "./theme";

const StyledSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor1};
  box-shadow: 0px 0px 8px 2px ${(props) => props.theme.bgColor1};
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;

  > section {
    height: 100%;
  }

  .no_task_category {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .no_task_category p {
    font-size: 1.2rem;
    text-align: center;
    margin: 0.5rem;
  }
  .no_task_category img {
    width: 50%;
  }

  .workspace__header {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 0.3rem;
    margin-bottom: 0.5rem;
  }

  .workspace__header--actions {
    display: flex;
    gap: 0.7rem;
  }

  .workspace__header--actions .addTaskCategory__form {
    position: absolute;
    top: 3rem;
    z-index: 1;
    display: flex;
    border-radius: 0.5rem;
    border: 2px solid ${(props) => props.theme.color3};
    background-color: ${(props) => props.theme.color1};
    overflow: hidden;
  }

  .addTaskCategory__form .addTaskCategory--input {
    outline: none;
    border: none;
    padding: 0.5rem;
  }
  .action_lock,
  .action_locked {
    height: 100%;
    width: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    border: 2px solid ${(props) => props.theme.iconColor};
    transition: all 0.3s ease;
  }
  .action_lock:active,
  .action_locked:active {
    transform: translateY(0px);
  }

  .action_lock:hover,
  .action_locked:hover {
    box-shadow: 0px 0px 8px 2px ${(props) => props.theme.bgColor2};
    transform: translateY(-1px);
  }

  .action_lock {
    color: ${(props) => props.theme.iconColor};
    background-color: ${(props) => props.theme.color1};
  }

  .action_lock:hover {
    background-color: ${(props) => props.theme.color1};
  }

  .action_locked {
    color: ${(props) => props.theme.color1};
    background-color: ${(props) => props.theme.iconColor};
  }

  .action_locked:hover {
    background-color: ${(props) => props.theme.iconColor};
  }

  .text_lock,
  .text_locked {
    color: ${(props) => props.theme.iconColor};
    font-size: 1.1rem;
    display: flex;
    gap: 0.2rem;
    justify-content: center;
    align-items: center;
  }

  .text_locked {
    font-weight: bold;
  }
  .categories_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .avatar-container {
    cursor: pointer;
  }
  .avatar-container .avatar-container--avatar {
    border: 1px solid ${(props) => props.theme.borderColor};
  }
  .menu_icons {
    color: ${(props) => props.theme.color2};
  }

  .task_category_skeleton {
    display: flex;
    flex-direction: column;
  }
  .skeleton__search,
  .skeleton__cards--card,
  .skeleton__progress {
    border-radius: 0.7rem;
  }
  .skeleton__search {
    margin: 1rem;
  }
  .skeleton__cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  .skeleton__cards--card {
    border: 3px solid ${(props) => props.theme.bgColor4};
    padding: 1rem;
    border-radius: 0.7rem;
  }
  .skeleton__progress {
    margin: 1rem 0;
  }
`;
const menuItemStyling = {
  color: `${theme.color2}`,
  display: "flex",
  gap: "0.2rem",
  "& .icons": {
    color: `${theme.color2}`,
    fontSize: "1.1rem",
  },
};

export { StyledSection, menuItemStyling };
