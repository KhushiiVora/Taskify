import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "../axiosConfig";

import { messagesRestored } from "../state/chatSlice";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.chats);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const messages = await axios
          .get(`/chat/${chatsData.workspaceId}/messages`, {
            withCredentials: true,
          })
          .then((response) => response.data)
          .catch((error) => console.log(error));
        messages.length && dispatch(messagesRestored(messages));
      } catch (error) {
        // toast.error(error);
        console.log("error in useGetMessages", error);
      } finally {
        setLoading(false);
      }
    };

    if (chatsData.workspaceId) getMessages();
    // }, [selectedConversation._id, setMessages]);
  }, [chatsData.workspaceId]);

  return { loading, messages: chatsData.messages };
};

export default useGetMessages;
