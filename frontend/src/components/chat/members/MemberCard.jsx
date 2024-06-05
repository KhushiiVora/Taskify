import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";

import { StyledBadge } from "../../../styles/chatbox.styles";

const MemberCard = ({ member }) => {
  const { workspaceId } = useParams();
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);

  const [onlineUsers, setOnlineUsers] = useState([]);
  let isOnline = onlineUsers.includes(member._id);

  useEffect(() => {
    socket?.emit("join-workspace-room", workspaceId);
    // console.log("inside membercard online users");
    socket?.on("online-users", (users) => {
      // console.log("socket online users: ", users);
      setOnlineUsers(users);
    });
  }, [socket]);

  return (
    <div className="chatbox__sidebar--member_card">
      <div>
        {isOnline ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={member.username} src={member.profilePic} />
          </StyledBadge>
        ) : (
          <Avatar alt={member.username} src={member.profilePic} />
        )}
      </div>
      <div>
        <span>
          {member.username} {user._id === member._id ? "(You)" : ""}
        </span>
      </div>
    </div>
  );
};
export default MemberCard;
