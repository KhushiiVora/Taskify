import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saved as userSaved } from "../../state/userSlice";
import { useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import AvatarDialog from "./AvatarDialog";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { MdEdit } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { PiTreeStructureFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { workspaces } = useSelector((state) => state.workspaces);

  const [username, setUsername] = useState(user.username);
  const [userBio, setUserBio] = useState(user.bio);

  const { logout } = useLogout();

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.isSignedUp) setOpenAvatarDialog(true);
  }, []);

  const handleDialogOpen = () => {
    setOpenAvatarDialog(true);
  };
  const handleDialogClose = (event) => {
    if (
      event.target.tagName === "SECTION" ||
      event.target.name === "selectAvatarButton"
    ) {
      setOpenAvatarDialog(false);
    }
  };

  const handleUsernameEdit = async (event) => {
    event.preventDefault();
    if (username !== user.username) {
      await axios
        .patch(
          `/profile/edit/${user._id}/username`,
          { username },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          console.log("Updated user: ", data);
          dispatch(userSaved(data));
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
  };

  const handleUserBioEdit = async (event) => {
    event.preventDefault();
    if (userBio !== user.bio) {
      await axios
        .patch(
          `/profile/edit/${user._id}/bio`,
          { bio: userBio },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          console.log("Updated user: ", data);
          dispatch(userSaved(data));
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
  };
  return (
    <>
      <div>Profile page</div>
      <section>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td colSpan="2">
                <Avatar
                  alt={user.username}
                  src={user.profilePic}
                  sx={{ width: 150, height: 150 }}
                />
              </td>
              <td onClick={handleDialogOpen}>
                <Tooltip title="Edit">
                  <IconButton>
                    <MdEdit />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
            <tr>
              <td>
                <FaUser />
              </td>
              <td>
                {!editUsername ? (
                  <div>
                    <span>Username</span>
                    <div>{user.username}</div>
                    <hr />
                  </div>
                ) : (
                  <TextField
                    id="standard-read-only-input"
                    label="Username"
                    value={username}
                    autoFocus={true}
                    onChange={(event) => {
                      setUsername(event?.target?.value);
                    }}
                    variant="standard"
                  />
                )}
              </td>
              <td onClick={() => setEditUsername(!editUsername)}>
                <Tooltip title={`${editUsername ? "Save" : "Edit"}`}>
                  {editUsername ? (
                    <IconButton onClick={handleUsernameEdit}>
                      <MdSaveAs />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <MdEdit />
                    </IconButton>
                  )}
                </Tooltip>
              </td>
            </tr>
            <tr>
              <td>
                <MdEmail />
              </td>
              <td>
                <div>
                  <span>Email</span>
                  <div>{user.email}</div>
                  <hr />
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <PiUserListFill />
              </td>
              <td>
                {!editBio ? (
                  <div>
                    <span>Bio</span>
                    <div>{user.bio}</div>
                    <hr />
                  </div>
                ) : (
                  <TextField
                    id="standard-multiline-static"
                    label="Bio"
                    multiline
                    rows={4}
                    value={userBio}
                    autoFocus={true}
                    onChange={(event) => setUserBio(event?.target?.value)}
                    variant="standard"
                  />
                )}
              </td>
              <td onClick={() => setEditBio(!editBio)}>
                <Tooltip title={`${editBio ? "Save" : "Edit"}`}>
                  {editBio ? (
                    <IconButton onClick={handleUserBioEdit}>
                      <MdSaveAs />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <MdEdit />
                    </IconButton>
                  )}
                </Tooltip>
              </td>
            </tr>
            <tr>
              <td>
                <PiTreeStructureFill />
              </td>
              <td colSpan="2">
                <span>Workspaces</span>
                <div>
                  {workspaces.map((workspace) => {
                    return (
                      <Chip
                        key={workspace._id}
                        label={workspace.name}
                        // onClick={handleClick}
                      />
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Button
                  type="button"
                  icon={<IoLogOut />}
                  text="Logout"
                  onClick={logout}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer />
      </section>
      <AvatarDialog
        open={openAvatarDialog}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}
