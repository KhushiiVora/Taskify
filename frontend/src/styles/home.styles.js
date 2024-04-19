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
  }
  .bottom_img {
    display: flex;
    justify-content: center;
  }
  .top_img {
    display: flex;
    justify-content: center;
  }

  .taskify--img1 {
    z-index: 1;
    border-radius: 60%;
    position: absolute;
    top: 60%;
  }
  .taskify--img2 {
    z-index: 1;
  }
  .taskify--img3 {
    right: 0;
    z-index: -1;
    border-radius: 80%;
  }
`;

export { StyledSection };
