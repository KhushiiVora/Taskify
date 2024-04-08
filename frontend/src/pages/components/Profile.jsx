import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saved as userSaved } from "../../state/userSlice";
import { useLocation } from "react-router-dom";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import AvatarDialog from "./AvatarDialog";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MdEdit } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";

export default function Profile() {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState(user.username);
  const [userBio, setUserBio] = useState(user.bio);

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
    console.log("Call me...............");
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
        .catch((error) => console.log(error));
    } else {
      console.log("ME to nahi gaya🤪😝");
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
        .catch((error) => console.log(error));
    } else {
      console.log("ME to nahi gaya🤪😝");
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
              <td>
                <img
                  src={user.profilePic}
                  alt="avatar image"
                  height="200"
                  width="200"
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
                <Button type="submit" text="Log out" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <AvatarDialog
        open={openAvatarDialog}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}
