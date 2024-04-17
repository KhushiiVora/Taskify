import { useState } from "react";
import axios from "../../axiosConfig";
import { useDispatch } from "react-redux";

import { saved as workspaceSaved } from "../../state/workspaceSlice";

import Button from "../atoms/Button";
import TextField from "@mui/material/TextField";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/dialog.styles";

export default function WorkspaceDialog(props) {
  const { username, open, handleDialogClose } = props;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event?.target?.value;

    setFormData({
      ...formData,
      [event?.target?.name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const btnText = event.nativeEvent.submitter.innerText;
    if (btnText === "Create Workspace") {
      await axios
        .post(`/dashboard/workspace/${username}/create`, formData, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((workspace) => {
          dispatch(workspaceSaved(workspace));
          handleDialogClose(event);
          setFormData({
            name: "",
            code: "",
          });
        })
        .catch((error) => {
          console.log(error);
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
        .post(`/dashboard/workspace/${username}/join`, formData, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((workspace) => {
          dispatch(workspaceSaved(workspace));
          handleDialogClose(event);
          setFormData({
            name: "",
            code: "",
          });
        })
        .catch((error) => {
          console.log(error);
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
                <h1>Workspace</h1>
                <TextField
                  name="name"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <TextField
                  name="code"
                  id="outlined-basic"
                  label="Secret Code"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.code}
                  required
                />
                <Button type="submit" text="Create Workspace" />
                <Button type="submit" text="Join Workspace" />
              </form>
              <ToastContainer />
            </div>
          </StyledSection>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
