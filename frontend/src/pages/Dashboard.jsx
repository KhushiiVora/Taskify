import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

import Button from "../components/atoms/Button";
import WorkspaceDialog from "../components/dashboard/workspace/WorkspaceDialog";
import WorkspaceList from "../components/dashboard/workspace/WorkspaceList";
import MemberAccessPanel from "../components/dashboard/sidepanel/MemberAccessPanel";
import Workspace from "../components/dashboard/workspace/Workspace";

import { ToastContainer } from "react-toastify";
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";
import SpinnerIcon from "../components/atoms/SpinnerIcon";
import noWorkspaceSelected from "/img/noWorkspaceSelected.svg";
import { StyledSection } from "../styles/dashboard.styles";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openMemberAccessPanel, setOpenMemberAccessPanel] = useState(false);
  const [openedWorkspaceId, setOpenedWorkspaceId] = useState("");
  const { username } = useSelector((state) => state.user.user);
  const { members } = useSelector((state) => state.members);
  const { workspaces } = useSelector((state) => state.workspaces);

  const { logout, loading } = useLogout();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.workspaceId) {
      setOpenedWorkspaceId(location.state.workspaceId);
    }
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
    setOpenedWorkspaceId(key);
  };

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
        <div>
          <h1>
            {openedWorkspaceId
              ? workspaces.filter(
                  (Workspace) => Workspace._id === openedWorkspaceId
                )[0]?.name
              : ""}
          </h1>
        </div>
        <Button
          type="button"
          className="text_button"
          icon={loading ? <SpinnerIcon /> : <IoLogOut className="text_icons" />}
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
          <NoWorkspaceSelected workspaces={workspaces} />
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

const NoWorkspaceSelected = (props) => {
  const { workspaces } = props;
  const { user } = useSelector((state) => state.user);
  return (
    <div className="dashboard__empty">
      <div>
        <h2>
          Welcome {workspaces.length ? "back" : ""} {user.username}!
        </h2>
        <img
          className="dashboard__empty--img"
          src={noWorkspaceSelected}
          alt="No Workspace Selected"
        />
        {!workspaces.length ? (
          <p>
            Ready to enhance your productivity? Click the <RiAddCircleFill />{" "}
            button to create or join a workspace.
          </p>
        ) : (
          <p>
            Ready to enhance your productivity? Select a workspace to get
            started.
          </p>
        )}
      </div>
    </div>
  );
};
