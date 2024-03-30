import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    /* need to change the whole layout */
    <div className="md:min-w-[450px] flex flex-col">
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
