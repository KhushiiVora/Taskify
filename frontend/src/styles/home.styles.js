import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 90%;
  width: 100%;
  gap: 2rem;

  /**---------------- Main Section --------------*/
  .main_section {
    display: flex;
    height: 100%;
    width: 100%;
    margin-bottom: 5rem;
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

  /* --------------- Common Section Content ------------- */
  .section_content {
    width: 50%;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .section_content--divider {
    margin-top: 2rem;
    width: 25%;
    border-width: 0.3rem;
    border-style: solid;
    border-radius: 0.5rem;
    align-self: first baseline;
  }
  .section_content--header {
    font-size: 2.5rem;
    align-self: first baseline;
  }
  .section_content--description {
    padding-top: 3rem;
    font-size: 1.5rem;
    text-align: justify;
    line-height: 2rem;
    color: ${(props) => props.theme.textColor1};
  }
  /**---------------- Section1: Workspace --------------*/
  .section1_workspace {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 10rem 10rem 4rem 4rem;
    background: ${(props) => props.theme.iconColor};
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

  /**---------------- Section2: Task --------------*/
  .section2_task {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 2rem 8rem 6rem 10rem;
  }
  .section2_task__img {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .section2_task__img img {
    width: 100%;
  }

  /**---------------- Section3: Group Chat --------------*/
  .section3_chat {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 4rem 10rem 4rem 4rem;
  }
  .section3_chat__img {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .section3_chat__img img {
    width: 100%;
  }

  /**---------------- Section4: SubFeature Cards --------------*/
`;

export { StyledSection };
