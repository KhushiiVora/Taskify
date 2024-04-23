import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 90%;
  width: 100%;
  gap: 10rem;

  /**---------------- Main Section --------------*/
  .main_section {
    display: flex;
    height: 100%;
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
    padding-top: 2rem;
    font-size: 1.5rem;
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
  .section1_workspace {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .section1_workspace__img {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .section1_workspace__img img {
    width: 80%;
    padding: 2rem 0rem;
  }
  .section1_workspace__content {
    width: 50%;
    padding: 6rem 10rem 6rem 2rem;
    display: flex;
    flex-direction: column;
  }
  .section1_workspace__content h1 {
    font-size: 2.5rem;
  }
  .section1_workspace__content hr {
    margin-top: 2rem;
    width: 25%;
    border: 0.3rem solid ${(props) => props.theme.iconColor};
    border-radius: 0.5rem;
  }
  .section1_workspace__content p {
    padding-top: 3rem;
    font-size: 1.5rem;
    text-align: justify;
    line-height: 2rem;
    color: ${(props) => props.theme.textColor1};
  }
  /**---------------- Section2: Task --------------*/
  .section2_task {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .section2_task__img {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .section2_task__img img {
    width: 80%;
  }
  .section2_task__content {
    width: 50%;
    padding: 6rem;
    display: flex;
    flex-direction: column;
  }
  .section2_task__content h1 {
  }
  .section2_task__content p {
  }

  /**---------------- Section3: Group Chat --------------*/
  .section3_chat {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .section3_chat__img {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .section3_chat__img img {
  }
  .section3_chat__content {
    width: 50%;
    padding: 6rem;
    display: flex;
    flex-direction: column;
  }

  /**---------------- Section4: SubFeature Cards --------------*/
`;

export { StyledSection };
