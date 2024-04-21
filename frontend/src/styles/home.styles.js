import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 90%;
  width: 100%;

  /**---------------- Main Section --------------*/
  .main_section {
    display: flex;
    min-height: 100%;
    width: 100%;
  }
  .main_section__content {
    width: 50%;
    padding: 6rem 8rem;
    display: flex;
    flex-direction: column;
  }
  .main_section__content h1 {
    font-size: 2.5rem;
  }
  .main_section__content p {
    margin-top: 2rem;
    font-size: 1.4rem;
    text-align: justify;
    color: ${(props) => props.theme.textColor1};
  }

  .main_section__content--start_btn {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .graphics_container {
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .graphics_container img {
    width: 50%;
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

  /**---------------- Section1: Workspace --------------*/
`;

export { StyledSection };
