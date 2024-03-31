import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axiosConfig";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const chatsData = useSelector((state) => state.chats);

  const sendMessage = async (messageText) => {
    setLoading(true);
    const data = { message: messageText };
    try {
      await axios
        .post(`/chat/${chatsData.workspaceId}/messages/save`, data, {
          withCredentials: true,
        })
        .then((response) => console.log(response.data.message))
        .catch((error) =>
          console.log("error in post call of send message", error)
        );
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
