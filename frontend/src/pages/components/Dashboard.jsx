import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";
import WorkspaceList from "./WorkspaceList";
import MemberAccessPanel from "./MemberAccessPanel";
import Workspace from "./Workspace";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";
import noWorkspaceSelected from "/img/noWorkspaceSelected.svg";
import { StyledSection } from "../../styles/dashboard.styles";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openMemberAccessPanel, setOpenMemberAccessPanel] = useState(false);
  // const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [openedWorkspaceId, setOpenedWorkspaceId] = useState("");
  const { username } = useSelector((state) => state.user.user);
  const { members } = useSelector((state) => state.members);

  const { logout } = useLogout();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.workspaceId) {
      setOpenedWorkspaceId(location.state.workspaceId);
    }
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
          <Button
            type="button"
            className="icon_button"
            title="Home"
            onClick={() => navigate("/")}
            icon={<IoHome className="icons" />}
          />
          <h1>Dashboard</h1>
        </div>
        <Button
          type="button"
          className="text_button"
          icon={<IoLogOut className="text_icons" />}
          text="Logout"
          onClick={logout}
        />
      </header>
      <section
        className={`dashboard__workspace-container ${
          openMemberAccessPanel ? "blur-background" : ""
        }`}
      >
        <WorkspaceList
          members={members}
          openedWorkspaceId={openedWorkspaceId}
          handleDialogOpen={handleDialogOpen}
          handleWorkspaceOpen={handleWorkspaceOpen}
        />
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
  const { user } = useSelector((state) => state.user);
  const { workspaces } = useSelector((state) => state.workspaces);
  return (
    <div className="dashboard__empty">
      <div>
        <h2>Welcome {user.username}!</h2>
        <img
          className="dashboard__empty--img"
          src={noWorkspaceSelected}
          alt="No Workspace Selected"
        />
        <p>
          {/* {workspaces.length ? "Select" : "Create"} a workspace to start with */}
          Ready to boost your productivity? Create your new workspace or join an
          existing one by clicking the {<RiAddCircleFill />} button.
        </p>
      </div>
    </div>
  );
};
