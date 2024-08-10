import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig";

import { cleared as userCleared } from "../state/userSlice";
import { cleared as workspacesCleared } from "../state/workspaceSlice";
import { cleared as socketCleared } from "../state/socketSlice";
import { cleared as membersCleared } from "../state/memberSlice";
import { cleared as chatStateCleared } from "../state/chatSlice";

import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setLoading(true);

    await axios
      .get("/auth/logout/", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        clearState();
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
  const clearState = () => {
    dispatch(workspacesCleared());
    dispatch(socketCleared());
    dispatch(membersCleared());
    dispatch(chatStateCleared());
    dispatch(userCleared());
  };
  return { loading, logout, clearState };
};
export default useLogout;
