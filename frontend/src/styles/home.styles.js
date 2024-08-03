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
    margin-top: 1rem;
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

  .section_container__sections {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2rem;
  }
  .workspace {
    background: ${(props) => props.theme.iconColorShadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.iconColorShadow};
  }
  .task {
    background: ${(props) => props.theme.color3Shadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.color3Shadow};
  }
  .chat {
    background: ${(props) => props.theme.color2Shadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.color2Shadow};
  }
  /* .cards {
    background: ${(props) => props.theme.successColorShadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.successColorShadow};
  } */
  /* --------------- Common Styling 2: Section Content ------------- */
  .section_container__sections--content {
    width: 40%;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .section_container__sections--content h1 {
    font-size: 2.5rem;
    align-self: first baseline;
  }
  .section_container__sections--content div {
    margin-top: 2rem;
    width: 20%;
    border-width: 0.3rem;
    border-style: solid;
    border-radius: 0.5rem;
    align-self: first baseline;
  }

  .section_container__sections--content p {
    padding-top: 3rem;
    font-size: 1.5rem;
    text-align: justify;
    line-height: 2rem;
    color: ${(props) => props.theme.textColor1};
  }

  /* --------------- Common Styling 3: Section Image ------------- */
  .section_container__sections--img {
    width: 60%;
    display: flex;
    justify-content: center;
  }
  .workspace_img {
    width: 70%;
    /* padding: 2rem 0rem; */
  }
  .task_img {
    width: 80%;
  }
  .chat_img {
    width: 100%;
  }

  /**---------------- Section4: SubFeature Cards --------------*/
  .section_container__sections--cards {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding: 8rem 5rem 4rem 5rem;
  }
  .section_container__sections--card {
    width: 35%;
    height: 100%;
    margin: 1rem;
    border-radius: 1rem;
    background: ${(props) => props.theme.successColorShadow};
    box-shadow: 0px 0px 6px 3px ${(props) => props.theme.successColorShadow};
  }
  .sections--card_img {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
  }
  .task_check_img {
    height: 20rem;
  }
  .workspace_lock_img {
    height: 20rem;
  }
  .profile_img {
    height: 20rem;
  }
  .sections--card_content {
    width: 100%;
    height: 30%;
  }
  .sections--card_content p {
    padding: 2rem 4rem;
    color: ${(props) => props.theme.textColor1};
    text-align: justify;
    font-size: 1.3rem;
  }
`;

export { StyledSection };
