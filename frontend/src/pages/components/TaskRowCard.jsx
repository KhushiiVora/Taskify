import axios from "../../axiosConfig";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
function TaskRowCard(props) {
  const {
    task,
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

  useEffect(() => {
    if (isChecked !== task.state) {
      axios
        .post(
          `/dashboard/tasks/edit/${task._id}/state`,
          { state: isChecked },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          updateTaskState(data._id, data.state);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isChecked]);

  const handleClick = async (eventName) => {
    if (eventName === "delete") {
      await axios
        .delete(`/dashboard/tasks/delete/${task.taskCategoryId}/${task._id}`, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => console.log(error));
      console.log("delete");
    } else {
      console.log("edit");
      setTaskToEdit(task);
      handleDialogOpen(eventName);
    }
  };

  return (
    <tr key={task._id}>
      <td>
        <Checkbox
          checked={isChecked}
          color="success"
          onClick={() => {
            setIsChecked(!isChecked);
            setIsMainChecked(false);
          }}
        />
      </td>
      <td>{task.name}</td>
      <td>
        {task.state ? (
          <Chip label="Completed" color="success" />
        ) : overDueTaskIds.includes(task._id) ? (
          <Chip label="Over Due" color="error" />
        ) : (
          <Chip label="Pending" color="primary" />
        )}
      </td>
      <td>
        <ul>
          {task.assignedTo.map((member) => {
            return (
              <li key={member._id}>
                {
                  workspaceMembers.members.find(
                    (stateMember) => stateMember._id === member
                  )?.username
                }
              </li>
            );
          })}
        </ul>
      </td>
      <td>{task.dueDate.split("T")[0]}</td>
      {workspaceMembers.leaders.includes(user._id) ? (
        <td onClick={() => handleClick("delete")}>
          <Tooltip title="Delete">
            <IconButton>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </td>
      ) : (
        <td>
          <Tooltip title="Leaders Only">
            <IconButton style={{ cursor: "not-allowed" }}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </td>
      )}
      <td onClick={() => handleClick("edit")}>
        <Tooltip title="Edit">
          <IconButton>
            <MdEdit />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}
export default TaskRowCard;
