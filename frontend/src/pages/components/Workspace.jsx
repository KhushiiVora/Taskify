import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { membersRestored } from "../../state/memberSlice";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import ConfirmationDialog from "./ConfirmationDialog";
import AddTaskCategory from "./AddTaskCategory";
import TaskCategoryList from "./TaskCategoryList";
import Button from "../atoms/Button";
import TaskList from "./TaskList";
// import MemberAccessPanel from "./MemberAccessPanel";

import MUIButton from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdLock } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { StyledSection } from "../../styles/workspace.styles";

export default function Workspace(props) {
  const { workspaceId, setOpenMemberAccessPanel } = props;

  const [openTaskCategoryInput, setOpenTaskCategoryInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [confirmationDialogData, setConfirmationDialogData] = useState({
    titile: "",
    description: "",
    confirmText: "",
    handleConfirmAction: () => {},
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  const { user } = useSelector((state) => state.user);
  const { leaders, members } = useSelector((state) => state.members);

  useEffect(() => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTaskCategories(data))
      .catch((error) => {
        console.log(error.response);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });

    axios
      .get(`/dashboard/members/${workspaceId}/`, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        dispatch(membersRestored(data));
      })
      .catch((error) => {
        console.log(error);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  }, [workspaceId]);

  const handleWorkspaceLock = async () => {
    await axios
      .patch(
        `/dashboard/workspace/${workspaceId}/edit/lock`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        refreshPage(error.response.status);
      });
    handleConfirmDialogClose();
  };

  const handleWorspaceExit = async () => {
    await axios
      .patch(
        `/dashboard/workspace/${workspaceId}/member/exit`,
        { memberId: user._id },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
    handleConfirmDialogClose();
  };

  const handleWorspaceDelete = async () => {
    await axios
      .delete(`/dashboard/workspace/delete/${workspaceId}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleConfirmDialogClose();
  };

  const handleClick = (event) => {
    setOpenTaskCategoryInput(!openTaskCategoryInput);
  };

  const handleExpand = (event, categoryId) => {
    setExpand(!expand);
    if (event.target.tagName !== "BUTTON") setSelectedCategoryId(categoryId);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledSection>
      {expand ? (
        <section>
          <Button onClick={handleExpand} type="button" text="Back" />
          <TaskList categoryId={selectedCategoryId} workspaceId={workspaceId} />
        </section>
      ) : (
        <>
          <section>
            <h1>{workspaceData?.name}</h1>
            <h1>Workspace details</h1>
            {leaders.includes(user._id) ? (
              <Button
                type="button"
                onClick={handleClick}
                text="Create Task Category"
              />
            ) : (
              <></>
            )}
            <Button
              type="button"
              onClick={() => navigate(`/chatbox/${workspaceData._id}`)}
              text="Chat box"
            />
            {openTaskCategoryInput ? (
              <AddTaskCategory
                isNewCategory={true}
                setOpenTaskCategoryInput={setOpenTaskCategoryInput}
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
              />
            ) : (
              <></>
            )}
          </section>
          {leaders.includes(user._id) ? (
            <div>
              <MUIButton
                onClick={() => {
                  setConfirmationDialogData({
                    title: !workspaceData?.locked
                      ? "Workspace Lock Confirmation"
                      : "Workspace Unlock Confirmation",
                    description: !workspaceData?.locked ? (
                      <>
                        Are you sure you want to lock the workspace? <br />
                        NOTE: This action will prevent other users from joining
                        the workspace.
                      </>
                    ) : (
                      <>
                        Are you sure you want to unlock the workspace? <br />
                        NOTE: This action will allow other users to join the
                        workspace and collaborate.
                      </>
                    ),
                    confirmText: workspaceData?.locked ? "Unlock" : "Lock",
                    handleConfirmAction: handleWorkspaceLock,
                  });
                  setOpenConfirmDialog(true);
                }}
              >
                {workspaceData?.locked ? (
                  <>
                    <MdLock /> Locked
                  </>
                ) : (
                  <>
                    <MdLockOpen /> Lock
                  </>
                )}
              </MUIButton>
            </div>
          ) : (
            <div>
              {workspaceData?.locked ? (
                <span>
                  <MdLock /> Locked
                </span>
              ) : (
                <span>
                  <MdLockOpen /> Open
                </span>
              )}
            </div>
          )}

          <div
            className="avater-container"
            onClick={() => {
              // console.log("div");
              setOpenMemberAccessPanel(true);
            }}
          >
            <AvatarGroup total={members.length}>
              {[
                ...new Array(
                  (members.length % 5) + (members.length >= 5 ? 3 : 0)
                ),
              ].map((_, index) => {
                return (
                  <Avatar
                    alt={members[index].username}
                    src={members[index].profilePic}
                  />
                );
              })}
            </AvatarGroup>
            {/* {openMemberAccessPanel && <MemberAccessPanel />} */}
          </div>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  if (leaders.length === 1 && leaders.includes(user._id)) {
                    setConfirmationDialogData({
                      title: "",
                      description:
                        "Please designate at least one member as a leader before you exit, to ensure the continuity of leadership privileges.",
                      confirmText: "",
                      handleConfirmAction: null,
                    });
                  } else {
                    setConfirmationDialogData({
                      title: `Workspace Exit confirmation`,
                      description: `Are you sure you want to exit from ${workspaceData.name}?`,
                      confirmText: "Yes, Exit",
                      handleConfirmAction: handleWorspaceExit,
                    });
                  }
                  setOpenConfirmDialog(true);
                  handleClose();
                }}
              >
                <IoExit /> Exit
              </MenuItem>
              {leaders.includes(user._id) && (
                <MenuItem
                  onClick={() => {
                    setConfirmationDialogData({
                      title: `Workspace Delete confirmation`,
                      description: (
                        <>
                          Are you sure you want to delete ${workspaceData.name}?
                          <br />
                          NOTE: This action will delete {
                            workspaceData.name
                          }{" "}
                          permanently and its progress.
                        </>
                      ),
                      confirmText: "Yes, Exit and Delete",
                      handleConfirmAction: handleWorspaceDelete,
                    });
                    setOpenConfirmDialog(true);
                    handleClose();
                  }}
                >
                  <MdDelete /> Exit and Delete
                </MenuItem>
              )}
            </Menu>
          </div>
          {taskCategories.length ? (
            <section className="categories_container">
              <TaskCategoryList
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
                isLeader={leaders.includes(user._id)}
                taskCategories={taskCategories}
                handleExpand={handleExpand}
              />
            </section>
          ) : (
            <>
              <h2>You dont have any taskCategory so please create one</h2>
            </>
          )}
        </>
      )}
      <ConfirmationDialog
        title={confirmationDialogData.title}
        description={confirmationDialogData.description}
        confirmText={confirmationDialogData.confirmText}
        openConfirmDialog={openConfirmDialog}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmAction={confirmationDialogData.handleConfirmAction}
      />
      <ToastContainer />
    </StyledSection>
  );
}
