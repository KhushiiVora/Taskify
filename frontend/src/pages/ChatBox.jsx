import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { workspaceIdSaved } from "../state/chatSlice";
import { saved as socketSaved } from "../state/socketSlice";
import { cleared as chatsCleared } from "../state/chatSlice";

import MessageContainer from "../components/chat/messages/MessageContainer";
import ChatBoxSidebar from "../components/chat/members/ChatBoxSidebar";
import { StyledSection } from "../styles/chatbox.styles";

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
      // console.log("inside connection event", socket);
      // console.log("connected", socket.id);
    });
    return () => {
      dispatch(chatsCleared());
    };
    // socket.emit("join-workspace-room", workspaceId);
  }, []);

  return (
    <StyledSection>
      <ChatBoxSidebar />
      <MessageContainer />
    </StyledSection>
  );
};

export default ChatBox;
