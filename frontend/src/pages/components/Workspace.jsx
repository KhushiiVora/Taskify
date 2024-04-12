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

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdLock } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { StyledSection } from "../../styles/workspace.styles";

export default function Workspace(props) {
  const { workspaceId, setOpenMemberAccessPanel } = props;

  const [openTaskCategoryInput, setOpenTaskCategoryInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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
              <MUIButton onClick={() => setOpenConfirmDialog(true)}>
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
              <ConfirmationDialog
                title={
                  !workspaceData?.locked
                    ? "Workspace Lock Confirmation"
                    : "Workspace Unlock Confirmation"
                }
                description={
                  !workspaceData?.locked ? (
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
                  )
                }
                confirmText={workspaceData?.locked ? "Unlock" : "Lock"}
                openConfirmDialog={openConfirmDialog}
                handleConfirmDialogClose={handleConfirmDialogClose}
                handleConfirmAction={handleWorkspaceLock}
              />
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
      <ToastContainer />
    </StyledSection>
  );
}
