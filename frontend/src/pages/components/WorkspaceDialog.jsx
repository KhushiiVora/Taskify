import React, { useState } from "react";
import axios from "../../axiosConfig";

import Button from "../atoms/Button";
import TextField from "@mui/material/TextField";

export default function WorkspaceDialog(props) {
  const { username } = props;
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const btnText = e.nativeEvent.submitter.innerText;
    if (btnText === "Create Workspace") {
      await axios
        .post(`/dashboard/workspace/${username}/create`, formData, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    } else {
      await axios
        .post(`/dashboard/workspace/${username}/join`, formData, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <h1>Workspace</h1>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}
