import { useState } from "react";
import axios from "../../axiosConfig";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Button from "../atoms/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/dialog.styles";

export default function TaskDialog(props) {
  const theme = useTheme();
  const { categoryId, open, handleDialogClose, setTasks, setIsMainChecked } =
    props;

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
    //    axios call for creating a task and then in .then call handleClose function as well as set the field to ""
    let data = {
      ...formData,
      dueDate,
      assignedTo: assignees,
    };
    await axios
      .post(`/dashboard/tasks/${categoryId}/create`, data, {
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
  }

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleDialogClose}>
            <div className="dialog_container">
              <form onSubmit={handleSubmit} className="dialog_container__form">
                <h1>Task</h1>
                <TextField
                  name="name"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <FormControl sx={{ m: 1, width: 300 }}>
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
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="dueDate"
                      label="Due date"
                      value={dueDate}
                      onChange={(newValue) => setDueDate(newValue)}
                      format="LL"
                      disablePast
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button type="submit" text="Add" />
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
