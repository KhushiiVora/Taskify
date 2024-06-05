import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetMessages from "../../../hooks/useGetMessages";
import useListenMessages from "../../../hooks/useListenMessages";
import MessageSkeleton from "./MessageSkeleton";
import MessageCard from "./MessageCard";
import { ToastContainer } from "react-toastify";

const Messages = () => {
  let { loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  const { messages } = useSelector((state) => state.chats);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    // overflow-auto gives scrollbar
    <div className="chatbox__message_container--messages">
      {/* Case 1: Show skeleton when it is loading i.e. still fetching the data */}
      {loading &&
        [...Array(4)].map((_, index) => {
          <MessageSkeleton key={index} />;
        })}
      {/* Case 2: Show a text message when there no messages between the sender and the receiver */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white ">
          Send a message to start the conversation
        </p>
      )}
      {/* Case 3: There are messages and not loading */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <MessageCard
            key={message?._id}
            message={message}
            ref={lastMessageRef}
          />
        ))}
      <ToastContainer />
    </div>
  );
};
export default Messages;
