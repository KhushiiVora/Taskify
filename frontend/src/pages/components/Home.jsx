import React from "react";
import Footer from "./Footer";

import workTime from "/home/workTime.gif";
import progressIndicator from "/home/progressIndicator.gif";
import taskCompletion from "/home/taskCompletion.svg";
import { StyledSection } from "../../styles/home.styles";

export default function Home() {
  return (
    <StyledSection>
      <div className="graphics_container">
        <div className="graphics_container__top_img">
          <img
            className="top_img--img1"
            src={taskCompletion}
            alt="Task Completion"
          />
          <img
            className="top_img--img2"
            src={progressIndicator}
            alt="Progress Indicator"
          />
        </div>
        <div className="graphics_container__bottom_img">
          <img src={workTime} alt="Work time" className="bottom_img--img3" />
        </div>
      </div>
    </StyledSection>
  );
}
