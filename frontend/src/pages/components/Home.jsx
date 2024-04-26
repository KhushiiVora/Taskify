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
        <div className="section_container__sections workspace">
          <div className="section_container__sections--img">
            <img
              src={addWorkspace}
              alt="Add Workspace"
              className="workspace_img"
            />
          </div>
          <div className="section_container__sections--content">
            <h1>
              Craft your space, join the place, in Taskify's workspace, find
              your pace.
            </h1>
            <div style={{ borderColor: theme.iconColor }}></div>
            <p>
              You can create your own workspace, join existing ones to
              collaborate with different teams, and effectively manage tasks
              within a team environment.
            </p>
          </div>
        </div>
      </section>

      {/* --------Section 2: Task Organization --------------*/}
      <section className="section_container">
        <div className="section_container__sections task">
          <div className="section_container__sections--content">
            <h1>Organize your tasks to access it fast</h1>
            <div style={{ borderColor: theme.color3 }}></div>
            <p>
              With Taskify, you can easily group your tasks into different
              categories based on your own criteria to efficiently manage your
              workload.
            </p>
          </div>
          <div className="section_container__sections--img">
            <img src={addTask} alt="Task Organization" className="task_img" />
          </div>
        </div>
      </section>

      {/* --------Section 3: Group Chatting --------------*/}
      <section className="section_container">
        <div className="section_container__sections chat">
          <div className="section_container__sections--img">
            <img src={groupChat} alt="Group Chat" className="chat_img" />
          </div>
          <div className="section_container__sections--content">
            <h1>Real-time chatting, building strong connections</h1>
            <div style={{ borderColor: theme.color2 }}></div>
            <p>
              Engage in live chatting with your team members to foster stronger
              bonds and enhance collaboration, vital for building a cohesive and
              effective team.
            </p>
          </div>
        </div>
      </section>

      {/* --------Section 4: Sub Features --------------*/}
      <section className="section_conatiner">
        <div className="section_container__sections">
          <div className="section_container__sections--cards">
            <div className="section_container__sections--card">
              <div className="sections--card_img">
                <img src={taskCheckList} alt="Task Checklist" className="task_check_img"/>
              </div>
              <div className="sections--card_content">
                <p>
                  You can mark tasks as completed or uncompleted to track their
                  status and progress effectively.
                </p>
              </div>
            </div>
            <div className="section_container__sections--card">
              <div className="sections--card_img">
                <img src={workspaceLock} alt="Workspace Lock" className="workspace_lock_img"/>
              </div>
              <div className="sections--card_content">
                <p>
                  Leaders hold the privilege of locking or unlocking the
                  workspace, managing who joins to enhance workspace security.
                </p>
              </div>
            </div>
            <div className="section_container__sections--card">
              <div className="sections--card_img">
                <img src={userProfile} alt="User Profile" className="profile_img"/>
              </div>
              <div className="sections--card_content">
                <p>
                  You can manage your public profile to control how others see
                  you online, helping you make a positive impression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StyledSection>
  );
}
