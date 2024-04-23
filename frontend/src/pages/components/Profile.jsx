import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saved as userSaved } from "../../state/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

import useLogout from "../../hooks/useLogout";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import axios from "../../axiosConfig";
import AvatarDialog from "./AvatarDialog";

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
import { StyledSection } from "../../styles/profile.styles";

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
  const navigate = useNavigate();
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
    if (username && username !== user.username) {
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
    if (userBio.trim() && userBio !== user.bio) {
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
    <StyledSection>
      {/* <section> */}
      <table className="profile_container">
        <thead>
          <tr>
            <th>{user.username}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="profile_container--avatar">
              <Avatar
                className="avatar--img"
                alt={user.username}
                src={user.profilePic}
                sx={{ width: 150, height: 150 }}
              />
              <div onClick={handleDialogOpen} className="avatar--icon">
                <Tooltip title="Edit">
                  <IconButton>
                    <MdEdit />
                  </IconButton>
                </Tooltip>
              </div>
            </td>
            {/* <td onClick={handleDialogOpen}>
              <Tooltip title="Edit">
                <IconButton>
                  <MdEdit />
                </IconButton>
              </Tooltip>
            </td> */}
          </tr>
          <tr>
            <td className="profile_container--icons">
              <FaUser />
            </td>
            <td className="profile_container__data divider">
              <div>
                <span className="profile_container__data--title">Username</span>
                {!editUsername ? (
                  <div>{user.username}</div>
                ) : (
                  <Input
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event?.target?.value);
                    }}
                    autoFocus
                  />
                )}
              </div>
            </td>
            <td
              className="profile_container--icons divider"
              onClick={() => setEditUsername(!editUsername)}
            >
              <Tooltip title={`${editUsername ? "Save" : "Edit"}`}>
                {editUsername ? (
                  <IconButton onClick={handleUsernameEdit}>
                    <MdSaveAs className="icon-save" />
                  </IconButton>
                ) : (
                  <IconButton>
                    <MdEdit className="icon-edit" />
                  </IconButton>
                )}
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td className="profile_container--icons">
              <MdEmail />
            </td>
            <td className="profile_container__data divider" colSpan="2">
              <div>
                <span className="profile_container__data--title">Email</span>
                <div>{user.email}</div>
                {/* <hr /> */}
              </div>
            </td>
            {/* <td></td> */}
          </tr>
          <tr>
            <td className="profile_container--icons">
              <PiUserListFill />
            </td>
            <td className="profile_container__data divider">
              <div>
                <span className="profile_container__data--title">Bio</span>
                {!editBio ? (
                  <div>{user.bio}</div>
                ) : (
                  <textarea
                    name="bio"
                    value={userBio}
                    onChange={(event) => {
                      setUserBio(event?.target?.value);
                    }}
                    rows={1}
                    autoFocus
                  />
                )}
              </div>
            </td>
            <td
              className="profile_container--icons divider"
              onClick={() => setEditBio(!editBio)}
            >
              <Tooltip title={`${editBio ? "Save" : "Edit"}`}>
                {editBio ? (
                  <IconButton onClick={handleUserBioEdit}>
                    <MdSaveAs className="icon-save" />
                  </IconButton>
                ) : (
                  <IconButton>
                    <MdEdit className="icon-edit" />
                  </IconButton>
                )}
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td className="profile_container--icons">
              <PiTreeStructureFill />
            </td>
            <td colSpan="2" className="profile_container__data divider">
              <div>
                <span className="profile_container__data--title">
                  Workspaces
                </span>
                <div>
                  {workspaces.map((workspace) => {
                    return (
                      <Chip
                        key={workspace._id}
                        label={workspace.name}
                        onClick={() =>
                          navigate(`/dashboard/${username}`, {
                            state: { workspaceId: workspace._id },
                          })
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <Button
                type="button"
                className="text_button"
                icon={<IoLogOut className="icons" />}
                text="Logout"
                onClick={logout}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
      {/* </section> */}
      <AvatarDialog
        open={openAvatarDialog}
        handleDialogClose={handleDialogClose}
      />
    </StyledSection>
  );
}
