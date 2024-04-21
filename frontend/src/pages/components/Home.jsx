import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Footer";

import Button from "../atoms/Button";
import workTime from "/home/workTime.gif";
import progressIndicator from "/home/progressIndicator.gif";
import taskCompletion from "/home/taskCompletion.svg";
import { StyledSection } from "../../styles/home.styles";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <StyledSection>
      <section className="main_section">
        <div className="main_section__content">
          <h1>Taskify Your Day, Simplify Your Way</h1>
          <p>
            Taskify! Where organization meets collaboration seamlessly.
            Streamline tasks, categorize, and chat live – all in one workspace!
            Boost your team's efficiency and achieve more together,
            effortlessly.
          </p>
          <div className="main_section__content--start_btn">
            <Button
              type="button"
              text="Get Started"
              onClick={() => {
                navigate(`/dashboard/${user?.username}`);
              }}
              className="start_button"
            />
          </div>
        </div>
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
      </section>
    </StyledSection>
  );
}
