import { useState } from "react";
import axios from "../../axiosConfig";
import { useDispatch } from "react-redux";

import { saved as workspaceSaved } from "../../state/workspaceSlice";

import Button from "../atoms/Button";
import TextField from "@mui/material/TextField";
import { StyledSection } from "../../styles/workspaceDialog.styles";

export default function WorkspaceDialog(props) {
  const { username, open, handleClose } = props;

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
          handleClose(event);
          setFormData({
            name: "",
            code: "",
          });
        })
        .catch((error) => console.log(error));
    } else {
      await axios
        .post(`/dashboard/workspace/${username}/join`, formData, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((workspace) => {
          dispatch(workspaceSaved(workspace));
          handleClose(event);
          setFormData({
            name: "",
            code: "",
          });
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleClose}>
            <div className="workspace_container">
              <form
                onSubmit={handleSubmit}
                className="workspace_container__form"
              >
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
            </div>
          </StyledSection>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
