import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const MessageCard = ({ message }) => {
  /*-------------- */
  const user = useSelector((state) => state.user.user);
  // const { workspaceId } = useSelector((state) => state.chats);
  const fromMe = message.senderId === user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe
  //   ? user.profilePic
  //   : selectedConversation?.profilePic;
  const profilePic = "https://avatar.iran.liara.run/public/boy?username=sam";
  // console.log(profilePic);
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  /*-------------- */
  /* NEED TO CHANGE  */

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
};

export default MessageCard;
