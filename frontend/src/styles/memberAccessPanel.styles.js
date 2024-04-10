import styled from "styled-components";

const StyledSection = styled.section`
  position: absolute;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a8c;
  cursor: pointer;

  h2 {
    text-align: center;
    margin: 1rem;
  }
  .panel {
    width: 25%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #222;
    overflow-y: scroll;
    height: 100%;
    padding: 0.5rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  }
  .panel__member {
    margin: 0.1rem;
    display: flex;
    align-self: flex-start;
    gap: 1rem;
    color: black;
  }
  .panel__member--username,
  .panel__member--leader {
    text-transform: capitalize;
  }
  .panel__member--leader {
    font-size: 0.5rem;
    color: #555;
  }
  .panel__member div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .panel__member--avatar {
    border: 1px solid #222;
  }
`;

export { StyledSection };
