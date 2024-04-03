import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { workspaceIdSaved } from "../../state/chatSlice";
import { socketSaved } from "../../state/socketSlice";

import MessageContainer from "./MessageContainer";
import ChatBoxSidebar from "./ChatBoxSidebar";

const ChatBox = () => {
  const [socketId, setSocketId] = useState("");

  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const { user } = useSelector((state) => state.user);

  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: user._id,
        },
      }),
    []
  );

  useEffect(() => {
    dispatch(workspaceIdSaved(workspaceId));
    dispatch(socketSaved(socket));

    socket.on("connection", () => {
      setSocketId(socket.id);
      console.log("inside connection event", socket);
      console.log("connected", socket.id);
    });

    // socket.emit("join-workspace-room", workspaceId);
  }, []);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* {console.log(socketId)} */}
      <ChatBoxSidebar />
      <MessageContainer />
    </div>
  );
};

export default ChatBox;
