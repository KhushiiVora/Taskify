import styled from "styled-components";

const StyledBar = styled.div`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0;

  /* position: relative; */

  .progress--value {
    width: 100%;
    padding: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progress--bar {
    /* background-color: #00c251; */
    /* background-color: #ddd; */
    background-color: ${(props) => props.theme.bgColor2};
    border-radius: 0.7rem;
    height: 40%;
    overflow: hidden;
  }
  .progress--status {
    background-color: ${(props) => props.theme.successColorDark};
    height: 100%;
  }
`;

export { StyledBar };
