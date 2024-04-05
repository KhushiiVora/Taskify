import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 1rem;

  .avatars_container {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .avatars_container__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
  }
  img {
    height: 12rem;
    width: 100%;
    object-fit: contain;
  }
  .pagination {
    margin: 1rem;
    display: flex;
    /* height: 1.5rem; */
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .pagination--page_number {
    font-size: 1.2rem;
    padding: 1rem;
    border: 1px solid black;
  }
  .pagination--left,
  .pagination--right {
    padding: 1rem;
    border: 1px solid black;
  }
  .selected {
    background-color: #777;
  }
  .avatar--selected {
    border: 2px solid black;
    box-shadow: 0 0 10px 2px #777;
  }
  .disabled {
    opacity: 0;
  }
`;

export { StyledDiv };
