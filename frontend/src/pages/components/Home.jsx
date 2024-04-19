import React from "react";
import Footer from "./Footer";

import workTime from "/home/workTime.gif";
import progressIndicator from "/home/progressIndicator.gif";
import taskCompletion from "/home/taskCompletion.svg";
import { StyledSection } from "../../styles/home.styles";

export default function Home() {
  return (
    <StyledSection>
      <div className="taskify">
        <div>
          <img
            src={taskCompletion}
            alt="Task Completion"
            className="taskify--img2"
          />
          /
          <img
            src={progressIndicator}
            alt="Progress Indicator"
            className="taskify--img3"
          />
        </div>
        <div>
          <img src={workTime} alt="Work time" className="taskify--img1" />
        </div>
      </div>
    </StyledSection>
  );
}
