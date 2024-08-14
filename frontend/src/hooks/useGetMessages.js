import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "../axiosConfig";

import { messagesRestored } from "../state/chatSlice";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.chats);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      await axios
        .get(`/chat/${chatsData.workspaceId}/messages`, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((data) => {
          if (data.length) {
            dispatch(messagesRestored(data));
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          setLoading(false);
        });
    };

    if (chatsData.workspaceId) getMessages();
    // }, [selectedConversation._id, setMessages]);
   
  }, [chatsData.workspaceId]);

  return { loading };
};

export default useGetMessages;
