import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axiosConfig";
import { refreshPage } from "../../../utils/refreshPage";

import TaskDialog from "./TaskDialog";
import TaskRowCard from "./TaskRowCard";
import Button from "../../atoms/Button";
import Checkbox from "@mui/material/Checkbox";

import { IoArrowBackCircle } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection, colorSuccess } from "../../../styles/taskList.styles";

function TaskList(props) {
  const { handleExpand, categoryId, workspaceId } = props;

  const [isNewTask, setIsNewTask] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [overDueTaskIds, setOverDueTaskIds] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const workspaceMembers = useSelector((state) => state.members);
  const user = useSelector((state) => state.user.user);

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
  }, []);

  useEffect(() => {
    const pendingTasks = tasks.filter((task) => !task.status);

    setOverDueTaskIds(
      pendingTasks
        .filter((task) => {
          const currentDate = new Date();
          const taskDueDate = new Date(task.dueDate);
          if (
            currentDate.getDate() <= taskDueDate.getDate() &&
            currentDate.getMonth() <= taskDueDate.getMonth() &&
            currentDate.getFullYear() <= taskDueDate.getFullYear()
          )
            return false;
          else return true;
        })
        .map((task) => task._id)
    );
  }, [isChecked, tasks]);

  useEffect(() => {
    computeMainCheckedValueOnTasksChange();

    if (filteredTasks.length && searchInput) {
      setFilteredTasks(
        tasks.filter((task) => task.name.toLowerCase().includes(searchInput))
      );
    }
  }, [tasks]);

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
          refreshPage(error.response.status);
        });

      return !prev;
    });
  };

  const displayTasks = filteredTasks.length ? filteredTasks : tasks;

  const handleChange = (event) => {
    setSearchInput(event.target.value);

    if (event.target.value) {
      setFilteredTasks(
        tasks.filter((task) =>
          task.name.toLowerCase().includes(event.target.value)
        )
      );
    } else {
      setFilteredTasks([]);
    }
  };

  return (
    <StyledSection>
      <section className="tasklist__header">
        <Button
          className="icon_button"
          title="Back"
          onClick={handleExpand}
          type="button"
          icon={<IoArrowBackCircle className="icons" />}
        />
        <Button
          className="underlined_button"
          type="button"
          text="Add Task"
          icon={<RiAddCircleFill className="text_icons" />}
          onClick={() => handleDialogOpen("add")}
        />
        <div className="tasklist__header--search">
          <input
            name="searchTask"
            type="text"
            onChange={handleChange}
            value={searchInput}
            placeholder="Search Task by name"
          />
        </div>
      </section>
      <section>
        {tasks.length ? (
          <table>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    sx={colorSuccess}
                    checked={isChecked}
                    onClick={setAllTaskStates}
                    // color="success"
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
              {displayTasks.map((task) => {
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
                    setFilteredTasks={setFilteredTasks}
                    searchInput={searchInput}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Please Create a task</p>
        )}
      </section>
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
      <ToastContainer />
    </StyledSection>
  );
}

export default TaskList;
