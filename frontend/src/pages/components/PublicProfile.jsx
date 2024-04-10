import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../atoms/Button";
import Avatar from "@mui/material/Avatar";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

export default function PublicProfile(props) {
  const { member, setPublicProfile } = props;

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <table className="profile_container">
      <thead>
        <tr>
          <th
            className="back-button profile_container--icons"
            onClick={() => setPublicProfile(null)}
          >
            <IoArrowBackCircle />
          </th>
          <th className="profile_container--data">Profile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">
            <Avatar
              className="profile_container--avatar"
              alt={member.username}
              src={member.profilePic}
              sx={{ width: 150, height: 150 }}
            />
          </td>
        </tr>
        <tr>
          <td className="profile_container--icons">
            <FaUser />
          </td>
          <td className="profile_container--data">
            <div>
              <span>Username</span>
              <div>{member.username}</div>
              <hr />
            </div>
          </td>
        </tr>
        <tr>
          <td className="profile_container--icons">
            <MdEmail />
          </td>
          <td className="profile_container--data">
            <div>
              <span>Email</span>
              <div>{member.email}</div>
              <hr />
            </div>
          </td>
        </tr>
        <tr>
          <td className="profile_container--icons">
            <PiUserListFill />
          </td>
          <td className="profile_container--data">
            <div>
              <span>Bio</span>
              <div>{member.bio}</div>
              <hr />
            </div>
          </td>
        </tr>
        {user._id === member._id && (
          <tr>
            <td colSpan="2">
              <Button
                type="button"
                text="Edit My Profile"
                icon={<FaUserEdit />}
                onClick={() => navigate("/profile")}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
