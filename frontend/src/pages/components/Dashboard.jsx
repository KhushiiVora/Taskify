import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";
import WorkspaceList from "./WorkspaceList";
import Workspace from "./Workspace";

import { useSelector } from "react-redux";

import { StyledSection } from "../../styles/dashboard.styles";

export default function Dashboard() {
  const { username } = useSelector((state) => state.user.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [openedWorkspaceId, setOpenedWorkspaceId] = useState("");
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
      <header className="dashboard__header">
        <div>
          <Button type="button" onClick={() => navigate("/")} text="🏠" />
          <h1>Dashboard</h1>
        </div>
        <Button type="button" text="Add Workspace" onClick={handleDialogOpen} />
      </header>
      <section className="dashboard__workspace-container">
        <WorkspaceList handleWorkspaceOpen={handleWorkspaceOpen} />
        {openedWorkspaceId ? (
          <Workspace workspaceId={openedWorkspaceId} />
        ) : (
          <></>
        )}
      </section>
      <WorkspaceDialog
        username={username}
        open={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </StyledSection>
  );
}
