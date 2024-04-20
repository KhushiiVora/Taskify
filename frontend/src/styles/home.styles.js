import styled from "styled-components";

const StyledSection = styled.section`
  .graphics_container {
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .graphics_container img {
    width: 40%;
  }
  .graphics_container__bottom_img {
    display: flex;
    justify-content: center;
  }
  .graphics_container__top_img {
    display: flex;
    justify-content: center;
  }

  .top_img--img1 {
    z-index: 1;
    position: relative;
    left: 3%;
    top: 10%;
    transform: rotate(-20deg);
  }
  .top_img--img2 {
    z-index: -1;
    border-radius: 80%;
    position: relative;
    right: 7%;
  }
  .bottom_img--img3 {
    z-index: 1;
    border-radius: 60%;
    position: absolute;
    top: 55%;
    right: 35%;
  }
`;

export { StyledSection };
