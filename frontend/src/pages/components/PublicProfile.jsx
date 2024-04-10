import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

export default function PublicProfile() {
  const { user } = useSelector((state) => state.user);

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
            </tr>
            <tr>
              <td>
                <FaUser />
              </td>
              <td>
                <div>
                  <span>Username</span>
                  <div>{user.username}</div>
                  <hr />
                </div>
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
            </tr>
            <tr>
              <td>
                <PiUserListFill />
              </td>
              <td>
                <div>
                  <span>Bio</span>
                  <div>{user.bio}</div>
                  <hr />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
