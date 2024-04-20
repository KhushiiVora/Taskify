import styled from "styled-components";

const StyledBar = styled.div`
  background-color: #ddd;
  width: 100%;
  height: 1.5rem;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  /* border: 1px solid #000; */
  .progress--value {
    position: absolute;
    width: 100%;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .progress--bar {
    /* background-color: #00c251; */
    background-color: ${(props) => props.theme.successColorDark};
    height: 100%;
  }
`;

export { StyledBar };
