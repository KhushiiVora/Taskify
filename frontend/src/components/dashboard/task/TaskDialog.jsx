import { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import { refreshPage } from "../../../utils/refreshPage";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Button from "../../atoms/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  StyledSection,
  StyledTextField,
  StyledDatePicker,
} from "../../../styles/dialog.styles";

export default function TaskDialog(props) {
  const theme = useTheme();
  const {
    workspaceId,
    categoryId,
    open,
    handleDialogClose,
    setTasks,
    setIsMainChecked,
    isNewTask,
    task,
    handleExpand,
  } = props;

  const { members } = useSelector((state) => state.members);

  const [formData, setFormData] = useState({
    name: "",
  });
  const [dueDate, setDueDate] = useState(dayjs());
  const [assignees, setAssignees] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (isNewTask) {
      setFormData({ name: "" });
      setAssignees([]);
      setDueDate(dayjs());
    } else {
      setFormData({ name: task.name });
      setAssignees(task.assignedTo);
      const currentDate = new Date();
      const taskDueDate = new Date(task.dueDate);
      if (
        currentDate.getDate() <= taskDueDate.getDate() &&
        currentDate.getMonth() <= taskDueDate.getMonth() &&
        currentDate.getFullYear() <= taskDueDate.getFullYear()
      ) {
        setDueDate(dayjs(task.dueDate));
      }

      // if (new Date().getDate() <= new Date(task.dueDate).getDate()) {
      //   setDueDate(dayjs(task.dueDate));
      // }
    }
  }, [isNewTask]);

  function getStyles(name, assignees, theme) {
    return {
      fontWeight:
        assignees.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const value = event?.target?.value;
    setFormData({
      ...formData,
      [event?.target?.name]: value,
    });
  };

  const handleAssigneesChange = (event) => {
    const value = event?.target?.value;
    setAssignees(typeof value === "string" ? value.split(",") : value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let data = {
      ...formData,
      dueDate,
      assignedTo: assignees,
    };
    if (isNewTask) {
      await axios
        .post(`/dashboard/tasks/${workspaceId}/${categoryId}/create`, data, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((task) => {
          setTasks((previousList) => [...previousList, task]);
          setIsMainChecked(false);
          setFormData({
            name: "",
          });
          setDueDate(dayjs());
          setAssignees([]);
          handleDialogClose(event);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setTimeout(handleExpand, 3000);
          } else {
            refreshPage(error.response.status);
          }
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
      await axios
        .patch(`/dashboard/tasks/${workspaceId}/edit/${task._id}/`, data, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((editedTask) => {
          if (editedTask) {
            setTasks((previousList) => {
              const newTasks = previousList.filter(
                (task) => task._id !== editedTask._id
              );
              newTasks.push(editedTask);
              return newTasks;
            });
          }
          setIsMainChecked(false);
          setFormData({
            name: "",
          });
          setDueDate(dayjs());
          setAssignees([]);
          handleDialogClose(event);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setTimeout(handleExpand, 3000);
          } else {
            refreshPage(error.response.status);
          }
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
  }

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleDialogClose}>
            <div className="dialog_container">
              <form onSubmit={handleSubmit} className="dialog_container__form">
                <h1>Task</h1>
                <StyledTextField
                  name="name"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <FormControl sx={{ width: "90%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Assignees
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={assignees}
                    onChange={handleAssigneesChange}
                    input={<OutlinedInput label="Assignee" />}
                    MenuProps={MenuProps}
                    required
                  >
                    {members.map((member) => (
                      <MenuItem
                        key={member._id}
                        value={member._id}
                        style={getStyles(member.username, assignees, theme)}
                      >
                        {member.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="dialog_container__form--date">
                    <DemoContainer components={["DatePicker"]}>
                      <StyledDatePicker
                        name="dueDate"
                        label="Due date"
                        value={dueDate}
                        onChange={(newValue) => setDueDate(newValue)}
                        format="LL"
                        disablePast
                        required
                      />
                    </DemoContainer>
                  </div>
                </LocalizationProvider>
                <div className="dialog_container__form--buttons">
                  <Button
                    className="filled_button"
                    type="submit"
                    text={isNewTask ? "Add" : "Edit"}
                  />
                </div>
              </form>
            </div>
          </StyledSection>
        </>
      ) : (
        <></>
      )}
      <ToastContainer />
    </>
  );
}
