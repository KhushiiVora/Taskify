import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";
import WorkspaceList from "./WorkspaceList";
import MemberAccessPanel from "./MemberAccessPanel";
import Workspace from "./Workspace";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/dashboard.styles";

import { TiMessages } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";

export default function Dashboard() {
  const { username } = useSelector((state) => state.user.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openMemberAccessPanel, setOpenMemberAccessPanel] = useState(false);
  // const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [openedWorkspaceId, setOpenedWorkspaceId] = useState("");

  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
  }, []);

  const handleDialogClose = (event) => {
    if (event.target.tagName === "SECTION" || event.type === "submit") {
      setDialogOpen(false);
    }
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleWorkspaceOpen = (event, key) => {
    // setWorkspaceOpen(true);
    console.log(key);
    setOpenedWorkspaceId(key);
  };
  // const handleWorkspaceClose = (event) => {
  //   setWorkspaceOpen(false);
  // };

  return (
    <StyledSection>
      <header
        className={`dashboard__header ${
          openMemberAccessPanel ? "blur-background" : ""
        }`}
      >
        <div>
          <Button type="button" onClick={() => navigate("/")} text="🏠" />
          <h1>Dashboard</h1>
        </div>
        <Button type="button" text="Add Workspace" onClick={handleDialogOpen} />
        <Button
          type="button"
          icon={<IoLogOut />}
          text="Logout"
          onClick={logout}
        />
      </header>
      <section
        className={`dashboard__workspace-container ${
          openMemberAccessPanel ? "blur-background" : ""
        }`}
      >
        <WorkspaceList handleWorkspaceOpen={handleWorkspaceOpen} />
        {openedWorkspaceId ? (
          <Workspace
            workspaceId={openedWorkspaceId}
            setOpenMemberAccessPanel={setOpenMemberAccessPanel}
          />
        ) : (
          <NoWorkspaceSelected />
        )}
      </section>
      <WorkspaceDialog
        username={username}
        open={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
      {openMemberAccessPanel && (
        <MemberAccessPanel
          workspaceId={openedWorkspaceId}
          setOpenMemberAccessPanel={setOpenMemberAccessPanel}
        />
      )}
      <ToastContainer />
    </StyledSection>
  );
}

const NoWorkspaceSelected = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user.username} ❄</p>
        <p>Select a workspace to start with</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
