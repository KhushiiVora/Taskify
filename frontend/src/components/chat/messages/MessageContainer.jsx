import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="chatbox__message_container">
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
