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
    height: 10rem;
    width: 100%;
    object-fit: contain;
  }
  .pagination {
    margin: 1rem;
    display: flex;
    /* height: 1.5rem; */
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
  }
  .pagination--page_number {
    font-size: 1rem;
    padding: 0.7rem 1rem;
    border: 1px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
  }
  .pagination--left,
  .pagination--right {
    font-size: 1rem;
    padding: 0.75rem 0.7rem;
    border: 1px solid ${(props) => props.theme.iconColor};
    border-radius: 0.7rem;
    color: ${(props) => props.theme.iconColor};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selected {
    background-color: ${(props) => props.theme.bgColor2};
  }
  .avatar--selected {
    border: 2px solid ${(props) => props.theme.iconColor};
    box-shadow: 0px 0px 15px 7px ${(props) => props.theme.bgColor2};
  }
  .disabled {
    opacity: 0;
  }
`;

export { StyledDiv };
