import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";

import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";

export default function Workspace(props) {
  const { username } = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(username);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Button type="button" text="Add Workspace" onClick={handleOpen} />
      <WorkspaceDialog username={username} open={open} />
    </>
  );
}
