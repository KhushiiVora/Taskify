import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;

  .dashboard__header {
    display: flex;
    justify-content: space-between;
  }
  .dashboard__workspace-container {
    height: 100%;
    width: 100%;
    display: flex;
  }
`;

export { StyledSection };
