import styled from "styled-components";

const StyledSearchBar = styled.div`
  .searchbar__container {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
    overflow: hidden;
  }
  .searchbar__container.workspace_search {
    width: 80%;
  }
  .searchbar__container.tasklist_search {
    width: 25%;
  }

  .searchbar__container.category_search {
    width: 30%;
    margin: 0.2rem 1rem;
  }
  .searchbar__container.category_search > input {
    background-color: ${(props) => props.theme.bgColor1};
  }
  .searchbar__container.category_search + .searchbar--error {
    margin-left: 1rem;
  }

  .searchbar__container--focused {
    border: 2px solid ${(props) => props.theme.iconColor};
  }
  .searchbar__container--error {
    border-color: ${(props) => props.theme.color2};
  }

  .searchbar--icon {
    width: 10%;
    font-size: 1.1rem;
    color: ${(props) => props.theme.iconColor};
  }

  .searchbar--error {
    padding: 0.1rem;
    display: none;
    color: ${(props) => props.theme.color2};
    font-size: 0.8rem;
  }

  .searchbar--error.display {
    display: block;
  }

  .searchbar__container input {
    width: 90%;
    outline: none;
    border: none;
  }
`;

export { StyledSearchBar };
