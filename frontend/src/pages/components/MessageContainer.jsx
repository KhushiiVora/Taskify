import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    /* need to change the whole layout */
    <div className="chatbox__message_container">
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
