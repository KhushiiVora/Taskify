import React from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../../utils/extractTime";

import { FaUserCircle } from "react-icons/fa";

const MessageCard = React.forwardRef((props, ref) => {
  const { message } = props;
  const { user } = useSelector((state) => state.user);
  const { members } = useSelector((state) => state.members);

  const fromMe = message.senderId === user._id;

  const profilePic = fromMe
    ? user.profilePic
    : members.filter((member) => member._id === message.senderId)[0]
        ?.profilePic;

  const formattedTime = extractTime(message.createdAt);

  return (
    <div
      ref={ref}
      className={`chatbox__message_container--message_card ${
        fromMe ? "sender" : ""
      }`}
    >
      {!fromMe &&
        (profilePic ? (
          <img src={profilePic} />
        ) : (
          <FaUserCircle className="message_card--profile_pic" />
        ))}
      <div className="message_card__message">
        <div className={`message_card__message--content`}>
          {message.message}
        </div>
        <div className="message_card__message--time">{formattedTime}</div>
      </div>
    </div>
  );
});

export default MessageCard;
