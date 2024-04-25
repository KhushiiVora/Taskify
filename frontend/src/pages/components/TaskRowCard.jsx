import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast, Slide, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { colorSuccess } from "../../styles/taskList.styles";

function TaskRowCard(props) {
  const {
    task,
    workspaceId,
    overDueTaskIds,
    workspaceMembers,
    user,
    setTasks,
    setIsMainChecked,
    updateTaskState,
    handleDialogOpen,
    setTaskToEdit,
  } = props;

  const [isChecked, setIsChecked] = useState(task.state);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isChecked !== task.state) {
      axios
        .post(
          `/dashboard/tasks/${workspaceId}/edit/${task._id}/state`,
          { state: isChecked },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          updateTaskState(data._id, data.state);
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
    }
  }, [isChecked]);

  const handleClick = async (eventName) => {
    if (eventName === "delete") {
      await axios
        .delete(
          `/dashboard/tasks/${workspaceId}/delete/${task.taskCategoryId}/${task._id}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data)
        .then((data) => {
          setTasks(data);
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
    } else {
      setTaskToEdit(task);
      handleDialogOpen(eventName);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <tr key={task._id}>
      <td className="tasklist__checkboxes">
        <Checkbox
          sx={colorSuccess}
          checked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
            setIsMainChecked(false);
          }}
        />
      </td>
      <td>{task.name}</td>
      <td>
        {task.state ? (
          <Chip
            className="task_row--status_chip success"
            label="Completed"
            // color="success"
          />
        ) : overDueTaskIds.includes(task._id) ? (
          <Chip
            className="task_row--status_chip overdue"
            label="Over Due"
            // color="error"
          />
        ) : (
          <Chip
            className="task_row--status_chip pending"
            label="Pending"
            // color="primary"
          />
        )}
      </td>
      <td onClick={() => {}}>
        <AvatarGroup
          className="tasklist__assignee"
          total={task.assignedTo.length}
          onClick={handleMenuClick}
        >
          {[
            ...new Array(
              (task.assignedTo.length % 3) +
                (task.assignedTo.length >= 3 ? 1 : 0)
            ),
          ].map((_, index) => {
            return (
              <Avatar
                className="tasklist__assignee--avatar"
                alt={
                  workspaceMembers.members.find(
                    (stateMember) => stateMember._id === task.assignedTo[index]
                  )?.username
                }
                src={
                  workspaceMembers.members.find(
                    (stateMember) => stateMember._id === task.assignedTo[index]
                  )?.profilePic
                }
              />
            );
          })}
        </AvatarGroup>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            style={{
              width: `${task.assignedTo.length < 3 ? "auto" : "15rem"}`,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
            onClick={handleClose}
          >
            {task.assignedTo.map((member) => {
              return (
                <Chip
                  key={member}
                  avatar={
                    <Avatar
                      alt={
                        workspaceMembers.members.find(
                          (stateMember) => stateMember._id === member
                        )?.username
                      }
                      src={
                        workspaceMembers.members.find(
                          (stateMember) => stateMember._id === member
                        )?.profilePic
                      }
                    />
                  }
                  label={
                    workspaceMembers.members.find(
                      (stateMember) => stateMember._id === member
                    )?.username
                  }
                  variant="outlined"
                />
              );
            })}
          </MenuItem>
        </Menu>
      </td>
      <td>{task.dueDate.split("T")[0]}</td>
      {workspaceMembers.leaders.includes(user._id) ? (
        <td className="tasklist__icons" onClick={() => handleClick("delete")}>
          <Tooltip title="Delete">
            <IconButton>
              <MdDelete className="tasklist__icons--delete" />
            </IconButton>
          </Tooltip>
        </td>
      ) : (
        <td className="tasklist__icons">
          <Tooltip title="Leaders Only">
            <IconButton style={{ cursor: "not-allowed" }}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </td>
      )}
      <td className="tasklist__icons" onClick={() => handleClick("edit")}>
        <Tooltip title="Edit">
          <IconButton>
            <MdEdit className="tasklist__icons--edit" />
          </IconButton>
        </Tooltip>
      </td>
      <ToastContainer />
    </tr>
  );
}
export default TaskRowCard;
