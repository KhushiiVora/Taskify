import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import Button from "../atoms/Button";
import TaskDialog from "./TaskDialog";

function TaskList(props) {
  const { categoryId } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboard/tasks/${categoryId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
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
              <th>Name</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Due</th>
              <th></th>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task._id}>
                    <td>{task.name}</td>
                    <td>{`${task.state}`}</td>
                    <td>{task.assignedTo.length}</td>
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
    </div>
  );
}

export default TaskList;
