import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesSaved } from "../state/chatSlice";
import axios from "../axiosConfig";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.chats);

  const sendMessage = async (messageText) => {
    setLoading(true);
    const data = { message: messageText };
    try {
      const message = await axios
        .post(`/chat/${chatsData.workspaceId}/messages/save`, data, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .catch((error) =>
          console.log("error in post call of send message", error)
        );

      dispatch(messagesSaved(message));
    } catch (error) {
      // toast.error(error.message);
      console.log("error in useSendMessage", error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
