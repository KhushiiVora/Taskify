import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../axiosConfig";

import TaskDialog from "./TaskDialog";
import TaskRowCard from "./TaskRowCard";
import Button from "../atoms/Button";
import Checkbox from "@mui/material/Checkbox";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskList(props) {
  const { categoryId, workspaceId } = props;

  const [isNewTask, setIsNewTask] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [overDueTaskIds, setOverDueTaskIds] = useState([]);

  const workspaceMembers = useSelector((state) => state.members);
  const user = useSelector((state) => state.user.user);

  /* dbTasks-fetched from db
  tasks.forEach(task=>{
    task.state, assignned, dueDate,
    .save()
  })
  tasks deleted */

  useEffect(() => {
    axios
      .get(`/dashboard/tasks/${workspaceId}/${categoryId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error.response.data);
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
  }, []);

  useEffect(() => {
    const pendingTasks = tasks.filter((task) => !task.status);

    setOverDueTaskIds(
      pendingTasks
        .filter(
          (task) => new Date(task.dueDate).getDate() < new Date().getDate()
        )
        .map((task) => task._id)
    );
  }, [isChecked, tasks]);

  useEffect(computeMainCheckedValueOnTasksChange, [tasks]);

  function computeMainCheckedValueOnTasksChange() {
    const mainCheckedValue = tasks.reduce((result, currentTask) => {
      return result && currentTask.state;
    }, true);

    setIsChecked(mainCheckedValue);
  }

  const updateTaskState = (taskId, state) => {
    const updatedTasks = [...tasks];

    updatedTasks.forEach((task) => {
      if (task._id === taskId) {
        task.state = state;
      }
    });

    setTasks(updatedTasks);
  };

  const handleDialogOpen = (eventName) => {
    if (eventName === "add") {
      setIsNewTask(true);
    } else {
      setIsNewTask(false);
    }
    setDialogOpen(true);
  };
  const handleDialogClose = (event) => {
    if (event.target.tagName === "SECTION" || event.type === "submit") {
      setIsNewTask(true);
      setDialogOpen(false);
    }
  };

  const setAllTaskStates = () => {
    setIsChecked(async (prev) => {
      await axios
        .patch(
          `/dashboard/tasks/${workspaceId}/edit/${categoryId}/allStates`,
          { state: !prev },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          console.log(error);
        });

      return !prev;
    });
  };

  return (
    <div>
      <section>
        <h1>Do the following</h1>
        <Button
          type="button"
          text="Add Task"
          onClick={() => handleDialogOpen("add")}
        />
        <TaskDialog
          task={taskToEdit}
          workspaceId={workspaceId}
          categoryId={categoryId}
          isNewTask={isNewTask}
          open={dialogOpen}
          handleDialogClose={handleDialogClose}
          setTasks={setTasks}
          setIsMainChecked={setIsChecked}
        />
      </section>
      <section>
        {tasks.length ? (
          <table>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    checked={isChecked}
                    onClick={setAllTaskStates}
                    color="success"
                  />
                </th>
                <th>Name</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Due</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <TaskRowCard
                    setIsMainChecked={setIsChecked}
                    key={`${task._id}-${task.state}`}
                    task={task}
                    workspaceId={workspaceId}
                    overDueTaskIds={overDueTaskIds}
                    workspaceMembers={workspaceMembers}
                    user={user}
                    setTasks={setTasks}
                    updateTaskState={updateTaskState}
                    handleDialogOpen={handleDialogOpen}
                    setTaskToEdit={setTaskToEdit}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Please Create a task</p>
        )}
      </section>
      <ToastContainer />
    </div>
  );
}

export default TaskList;
