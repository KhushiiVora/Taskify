import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axiosConfig";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const chatsData = useSelector((state) => state.chats);

  const sendMessage = async (messageText) => {
    setLoading(true);
    const data = { message: messageText };
    await axios
      .post(`/chat/${chatsData.workspaceId}/messages/save`, data, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log(error);
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
      });

    setLoading(false);
  };
  return { loading, sendMessage };
};

export default useSendMessage;
