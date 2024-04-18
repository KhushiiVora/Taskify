import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  background-color: ${(props) => props.theme.bgColor1};
  border-radius: 1rem;
  padding: 0.5rem;

  h1 {
    color: ${(props) => props.theme.iconColor};
    font-size: 2rem;
  }

  .workspace__header {
    display: flex;
  }

  .categories_container {
    display: flex;
    flex-wrap: wrap;
  }
  .avater-container {
    cursor: pointer;
  }
`;

export { StyledSection };
