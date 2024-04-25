import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";
import React from "react";

const MessageCard = React.forwardRef((props, ref) => {
  const { message } = props;
  const { user } = useSelector((state) => state.user);
  const { members } = useSelector((state) => state.members);

  // const { workspaceId } = useSelector((state) => state.chats);
  const fromMe = message.senderId === user._id;

  const profilePic = fromMe
    ? user.profilePic
    : members.filter((member) => member._id === message.senderId)[0]
        ?.profilePic;
  // console.log(profilePic);
  // const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div
      ref={ref}
      className={`chatbox__message_container--message_card ${
        fromMe ? "sender" : ""
      }`}
    >
      {!fromMe && <img alt="image" src={profilePic} />}
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
