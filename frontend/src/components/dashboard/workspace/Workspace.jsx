import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";
import { refreshPage, quickRefresh } from "../../../utils/refreshPage";
import { restored as membersRestored } from "../../../state/memberSlice";
import { lockStateSaved } from "../../../state/workspaceSlice";

import ConfirmationDialog from "../../ConfirmationDialog";
import AddTaskCategory from "../taskcategory/AddTaskCategory";
import TaskCategoryList from "../taskcategory/TaskCategoryList";
import Button from "../../atoms/Button";
import TaskList from "../task/TaskList";
import ProgressBar from "../ProgressBar";
import TaskCategorySkeleton from "../../skeleton/TaskCategorySkeleton";

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
import { RiAddCircleFill } from "react-icons/ri";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import noTaskCategory from "/img/noTaskCategory.svg";
import {
  StyledSection,
  menuItemStyling,
} from "../../../styles/workspace.styles";
import { StyledSearchBar } from "../../../styles/searchbar.styles";

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
  const [filteredTaskCategories, setFilteredTaskCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const workspaceProgress = useMemo(() => {
    const result = taskCategories.reduce(
      (result, category) => {
        result.cumulativeProgress += category.progress;
        result.cumulativeTasks += category.tasks.length;
        return result;
      },
      { cumulativeProgress: 0, cumulativeTasks: 0 }
    );
    return result;
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        setTaskCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        setLoading(false);
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
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
    setExpand(false);
  }, [workspaceId]);

  const handleWorkspaceLock = async () => {
    await axios
      .patch(
        `/dashboard/workspace/${workspaceId}/edit/lock`,
        { locked: !workspaceData.locked },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        dispatch(lockStateSaved(data));
      })
      .catch((error) => {
        console.log(error);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
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
        quickRefresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
    handleConfirmDialogClose();
  };

  const handleWorkspaceDelete = async () => {
    await axios
      .delete(`/dashboard/workspace/delete/${workspaceId}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        quickRefresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
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

  useEffect(() => {
    if (filteredTaskCategories.length && searchInput) {
      setFilteredTaskCategories(
        taskCategories.filter((taskCategory) =>
          taskCategory.name.toLowerCase().includes(searchInput)
        )
      );
    }
  }, [taskCategories]);

  const displayTaskCategories = filteredTaskCategories.length
    ? filteredTaskCategories
    : taskCategories;

  const handleChange = (event) => {
    setSearchInput(event.target.value);

    if (event.target.value) {
      setFilteredTaskCategories(
        taskCategories.filter((taskCategory) =>
          taskCategory.name.toLowerCase().includes(event.target.value)
        )
      );
    } else {
      setFilteredTaskCategories([]);
    }
  };

  return (
    <StyledSection>
      {expand ? (
        <section>
          <TaskList
            handleExpand={handleExpand}
            categoryId={selectedCategoryId}
            workspaceId={workspaceId}
          />
        </section>
      ) : (
        <section>
          {/* <h1>{workspaceData?.name}</h  1> */}
          <section className="workspace__header">
            <div className="workspace__header--actions">
              {leaders.includes(user._id) ? (
                <Button
                  className="underlined_button full-height"
                  type="button"
                  text="Task Category"
                  icon={<RiAddCircleFill className="text_icons" />}
                  onClick={handleClick}
                />
              ) : (
                <></>
              )}
              <Button
                className="underlined_button full-height"
                type="button"
                text="Chat box"
                icon={<IoChatbubblesSharp className="text_icons" />}
                onClick={() => navigate(`/chatbox/${workspaceData._id}`)}
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
            </div>
            <div className="workspace__header--actions">
              {leaders.includes(user._id) ? (
                <div>
                  <MUIButton
                    className={`${
                      workspaceData.locked ? "action_locked" : "action_lock"
                    }`}
                    onClick={() => {
                      setConfirmationDialogData({
                        title: !workspaceData?.locked
                          ? "Workspace Lock Confirmation"
                          : "Workspace Unlock Confirmation",
                        description: !workspaceData?.locked ? (
                          <>
                            Are you sure you want to lock the workspace? <br />
                            NOTE: This action will prevent other users from
                            joining the workspace.
                          </>
                        ) : (
                          <>
                            Are you sure you want to unlock the workspace?{" "}
                            <br />
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
                        <MdLock /> <span>Locked</span>
                      </>
                    ) : (
                      <>
                        <MdLockOpen /> <span>Lock</span>
                      </>
                    )}
                  </MUIButton>
                </div>
              ) : (
                <div
                  className={`${
                    workspaceData.locked ? "text_locked" : "text_lock"
                  }`}
                >
                  {workspaceData?.locked ? (
                    <>
                      <MdLock />
                      <span>Locked</span>
                    </>
                  ) : (
                    <>
                      <MdLockOpen />
                      <span>Open</span>
                    </>
                  )}
                </div>
              )}

              <div
                className="avatar-container"
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
                        className="avatar-container--avatar"
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
                  {members.length > 1 && (
                    <MenuItem
                      sx={menuItemStyling}
                      onClick={() => {
                        if (
                          leaders.length === 1 &&
                          leaders.includes(user._id)
                        ) {
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
                      <IoExit className="menu_icons" /> Exit
                    </MenuItem>
                  )}
                  {leaders.includes(user._id) && (
                    <MenuItem
                      sx={menuItemStyling}
                      onClick={() => {
                        setConfirmationDialogData({
                          title: `Workspace Delete confirmation`,
                          description: (
                            <>
                              Are you sure you want to delete{" "}
                              {workspaceData.name}
                              ?
                              <br />
                              NOTE: This action will delete {
                                workspaceData.name
                              }{" "}
                              permanently and its progress.
                            </>
                          ),
                          confirmText: "Yes, Exit and Delete",
                          handleConfirmAction: handleWorkspaceDelete,
                        });
                        setOpenConfirmDialog(true);
                        handleClose();
                      }}
                    >
                      <MdDelete className="menu_icons" /> Exit and Delete
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </div>
          </section>
          <TaskCategorySkeleton loading={loading} />
          {!loading && (
            <ProgressBar
              value={workspaceProgress.cumulativeProgress}
              total={workspaceProgress.cumulativeTasks}
            />
          )}

          {!loading && taskCategories.length ? (
            <StyledSearchBar>
              <div
                className={`searchbar__container category_search ${
                  searchFocus ? "searchbar__container--focused" : ""
                } ${
                  searchInput.length && !filteredTaskCategories.length
                    ? "searchbar__container--error"
                    : ""
                }`}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              >
                <input
                  type="text"
                  onChange={handleChange}
                  value={searchInput}
                  placeholder="Search Category by name"
                  autoComplete="off"
                />
                <IoSearch className="searchbar--icon" />
              </div>
              <span
                className={`searchbar--error ${
                  searchInput.length && !filteredTaskCategories.length
                    ? "display"
                    : ""
                }`}
              >
                No Result Found
              </span>
            </StyledSearchBar>
          ) : (
            <></>
          )}

          {!loading && taskCategories.length ? (
            <section className="categories_container">
              <TaskCategoryList
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
                isLeader={leaders.includes(user._id)}
                taskCategories={displayTaskCategories}
                handleExpand={handleExpand}
              />
            </section>
          ) : (
            <div className="no_task_category">
              <img src={noTaskCategory} alt="No Task Category" />
              <p>You don't have any Task Category, so please create one.</p>
            </div>
          )}
        </section>
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
