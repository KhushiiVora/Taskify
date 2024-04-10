import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

export default function PublicProfile() {
  const location = useLocation();

  const { member } = location.state;

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
                  alt={member.username}
                  src={member.profilePic}
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
                  <div>{member.username}</div>
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
                  <div>{member.email}</div>
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
                  <div>{member.bio}</div>
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
