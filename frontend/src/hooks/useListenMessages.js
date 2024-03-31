import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageSaved } from "../state/chatSlice";

const useListenMessages = () => {
  const { socket } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage, cb) => {
      dispatch(messageSaved(newMessage));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);
};

export default useListenMessages;
