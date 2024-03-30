import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { workspaceIdSaved, workspaceIdCleared } from "../../state/chatSlice";

import MessageContainer from "./MessageContainer";
import ChatBoxSidebar from "./ChatBoxSidebar";
import { useEffect } from "react";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();

  useEffect(() => {
    dispatch(workspaceIdSaved(workspaceId));

    // return () => dispatch(workspaceIdCleared());
  }, []);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <ChatBoxSidebar />
      <MessageContainer />
    </div>
  );
};

export default ChatBox;
