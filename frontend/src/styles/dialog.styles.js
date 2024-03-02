import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #a0a0a08c;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;

  .dialog_container {
    padding: 3rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  }
  .dialog_container__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export { StyledSection };
