import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../axiosConfig";
import TaskDialog from "./TaskDialog";
import Button from "../atoms/Button";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskList(props) {
  const { categoryId } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [overDueTaskIds, setOverDueTaskIds] = useState([]);

  const { members } = useSelector((state) => state.members);

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
      .then((data) => setTasks(data))
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
        />
      </section>
      <section>
        {tasks.length ? (
          <table>
            <thead>
              <tr>
                <th>
                  <Checkbox />
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
                  <tr key={task._id}>
                    <td>
                      <Checkbox />
                    </td>
                    <td>{task.name}</td>
                    <td>
                      {task.state ? (
                        <Chip label="Completed" color="success" />
                      ) : overDueTaskIds.includes(task._id) ? (
                        <Chip label="Over Due" color="error" />
                      ) : (
                        <Chip label="Pending..." color="primary" />
                      )}
                    </td>
                    <td>
                      <ul>
                        {task.assignedTo.map((member) => {
                          return (
                            <li key={member._id}>
                              {
                                members.find(
                                  (stateMember) => stateMember._id === member
                                )?.username
                              }
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>{task.dueDate.split("T")[0]}</td>
                    <td>🚽</td>
                  </tr>
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
