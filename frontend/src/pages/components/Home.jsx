import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Footer";

import Button from "../atoms/Button";
import workTime from "/home/workTime.gif";
import progressIndicator from "/home/progressIndicator.gif";
import taskCompletion from "/home/taskCompletion.svg";
import addWorkspace from "/home/addWorkspace.svg";
import addTask from "/home/addTask.svg";
import groupChat from "/home/groupChat.svg";
import userProfile from "/home/userProfile.svg";
import workspaceLock from "/home/workspaceLock.svg";
import taskCheckList from "/home/taskCheckList.svg";
import { StyledSection } from "../../styles/home.styles";
import theme from "../../styles/theme";

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
      {/* --------Section 1: workspace --------------*/}
      <section className="section_container">
        <div className="workspace_container">
          <div className="section1_workspace__img">
            <img src={addWorkspace} alt="Add Workspace" />
          </div>
          <div className="section_content">
            <h1 className="section_content--header">
              Craft your space, join the place, in Taskify's workspace, find
              your pace.
            </h1>
            <div
              className="section_content--divider"
              style={{ borderColor: theme.iconColor }}
            ></div>
            <p className="section_content--description">
              You can create your own workspace, join existing ones to
              collaborate with different teams, and effectively manage tasks
              within a team environment.
            </p>
          </div>
        </div>
      </section>
      {/* --------Section 2: Task Organization --------------*/}
      <section className="section_container">
        <div className="task_container">
          <div className="section_content">
            <h1 className="section_content--header">
              Organize your tasks to access it fast
            </h1>
            <div
              className="section_content--divider"
              style={{ borderColor: theme.color3 }}
            ></div>
            <p className="section_content--description">
              With Taskify, you can easily group your tasks into different
              categories based on your own criteria to efficiently manage your
              workload.
            </p>
          </div>
          <div className="section2_task__img">
            <img src={addTask} alt="Task Organization" />
          </div>
        </div>
      </section>

      {/* --------Section 3: Group Chatting --------------*/}
      <section className="section_container">
        <div className="chat_container">
          <div className="chat_container__img">
            <img src={groupChat} alt="Group Chat" />
          </div>
          <div className="section_content">
            <h1 className="section_content--header">
              Real-time chatting, building strong connections
            </h1>
            <div
              className="section_content--divider"
              style={{ borderColor: theme.color2 }}
            ></div>
            <p className="section_content--description">
              Engage in live chatting with your team members to foster stronger
              bonds and enhance collaboration, vital for building a cohesive and
              effective team.
            </p>
          </div>
        </div>
      </section>
    </StyledSection>
  );
}
