import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 90%;
  width: 100%;
  /* gap: 2rem; */

  /**---------------- Main Section --------------*/
  .main_section {
    display: flex;
    height: 100%;
    width: 100%;
    margin-bottom: 6rem;
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
    margin-top: 3rem;
    justify-self: center;
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .graphics_container img {
    width: 45%;
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
    top: 47%;
    right: 27%;
  }

  /* -------------- Common Styling 1: Section Conatiner ------------ */
  .section_container {
    height: 100%;
    width: 100%;
    padding: 8rem 5rem 4rem 5rem;
  }

  /* --------------- Common Styling 2: Section Content ------------- */
  .section_content {
    width: 40%;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .section_content--divider {
    margin-top: 2rem;
    width: 20%;
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
  .workspace_container {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    background: ${(props) => props.theme.iconColorShadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.iconColorShadow};
  }
  .section1_workspace__img {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .section1_workspace__img img {
    width: 70%;
    padding: 2rem 0rem;
  }

  /**---------------- Section2: Task --------------*/

  .task_container {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    background: ${(props) => props.theme.color3Shadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.color3Shadow};
  }
  .section2_task__img {
    width: 60%;
    display: flex;
    justify-content: center;
  }
  .section2_task__img img {
    width: 80%;
  }

  /**---------------- Section3: Group Chat --------------*/
  .chat_container {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    background: ${(props) => props.theme.color2Shadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.color2Shadow};
  }
  .chat_container__img {
    width: 60%;
    display: flex;
    justify-content: center;
  }
  .chat_container__img img {
    width: 100%;
  }

  /**---------------- Section4: SubFeature Cards --------------*/
`;

export { StyledSection };
