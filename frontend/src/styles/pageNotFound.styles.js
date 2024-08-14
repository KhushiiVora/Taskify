import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  width: 100%;

  .image_conatiner {
    height: 30%;
  }
  .image_conatiner img {
    height: 25rem;
    margin: 2rem;
  }
  .content_container {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .content_container h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.borderColor};

  }
  .content_container p {
    font-size: 1.5rem;
    color: ${(props) => props.theme.textColor1};
  }
`;

export { StyledSection };
