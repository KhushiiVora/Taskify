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
  const { categoryId } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
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
      .get(`/dashboard/tasks/${categoryId}/`, {
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
  }, []);

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = (event) => {
    if (event.target.tagName === "SECTION" || event.type === "submit") {
      setDialogOpen(false);
    }
  };

  return (
    <div>
      <section>
        <h1>Do the following</h1>
        <Button type="button" text="Add Task" onClick={handleDialogOpen} />
        <TaskDialog
          categoryId={categoryId}
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
                    onClick={() => setIsChecked(!isChecked)}
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
                    isMainChecked={isChecked}
                    setIsMainChecked={setIsChecked}
                    key={task._id}
                    task={task}
                    overDueTaskIds={overDueTaskIds}
                    workspaceMembers={workspaceMembers}
                    user={user}
                    setTasks={setTasks}
                    updateTaskState={updateTaskState}
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
