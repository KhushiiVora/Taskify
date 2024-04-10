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
    text-transform: none;
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

  .profile_container {
    cursor: default;
  }

  .profile_container,
  .profile_container thead,
  .profile_container tbody {
    width: 100%;
  }

  .profile_container tr {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .profile_container--avatar {
    border: 1px solid #222;
  }

  .profile_container--data {
    width: 100%;
    padding: 0.5rem;
  }

  .profile_container--icons {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.2rem;
    font-size: 1.2rem;
  }

  .back-button {
    cursor: pointer;
  }

  .back-button,
  th {
    font-size: 1.4rem;
  }

  .profile_container--data div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .profile_container--data div span {
    font-weight: bold;
  }
`;

export { StyledSection };
