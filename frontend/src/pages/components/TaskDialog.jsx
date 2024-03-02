import { useState } from "react";
import axios from "../../axiosConfig";

import Button from "../atoms/Button";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StyledSection } from "../../styles/dialog.styles";

export default function TaskDialog(props) {
  const { categoryId, open, handleDialogClose, setTasks } = props;

  const [formData, setFormData] = useState({
    name: "",
  });
  const [dueDate, setDueDate] = useState(dayjs());

  const handleChange = (event) => {
    const value = event?.target?.value;

    setFormData({
      ...formData,
      [event?.target?.name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    //    axios call for creating a task and then in .then call handleClose function as well as set the field to ""
    let data = {
      ...formData,
      dueDate,
    };
    await axios
      .post(`/dashboard/tasks/${categoryId}/create`, data, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((task) => {
        setTasks((previousList) => [...previousList, task]);
        setFormData({
          name: "",
        });
        setDueDate(dayjs());
        handleDialogClose(event);
      })
      .catch((error) => console.log("createTask", error));
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
                  label="Task Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
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
    </>
  );
}
