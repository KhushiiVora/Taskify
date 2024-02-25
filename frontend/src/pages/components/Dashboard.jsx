import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";
import WorkspaceList from "./WorkspaceList";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const { username } = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(username);
  }, []);

  const handleClose = (event) => {
    if (event.target.tagName === "SECTION" || event.type === "submit") {
      setOpen(false);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Button type="button" text="Add Workspace" onClick={handleOpen} />
      <WorkspaceList />
      <WorkspaceDialog
        username={username}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
