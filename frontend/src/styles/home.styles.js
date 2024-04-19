import styled from "styled-components";

const StyledSection = styled.section`
  .taskify {
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    /* background-image: url("/home/taskCompletion.svg"); */
  }
  .taskify img {
    width: 40%;
    position: absolute;
  }

  .taskify--img1 {
    justify-self: flex-start;
    z-index: -1;
    border-radius: 50%;
    bottom:0;
  }
  .taskify--img2 {
    justify-self: center;
    left: 30%;
    z-index: 1;
  }
  .taskify--img3 {
    justify-self: flex-end;
    right: 0;
    z-index: -1;
    background: transparent;
    border-radius: 80%;
  }
`;

export { StyledSection };
