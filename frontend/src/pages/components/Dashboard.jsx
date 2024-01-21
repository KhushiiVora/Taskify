import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../atoms/Button";
import WorkspaceDialog from "./WorkspaceDialog";

import Backdrop from "@mui/material/Backdrop";

export default function Workspace(props) {
  const { username } = useParams();
  const [open, setOpen] = React.useState(false);

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
      <Button type="button" text="Add" onClick={handleOpen} />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        // onClick={handleClose}
      >
        {/* redux state instead of props*/}
        <WorkspaceDialog username={username} />
      </Backdrop>
    </>
  );
}
