import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { restored as workspaceMemebersRestored } from "../state/memberSlice";
import axios from "../axiosConfig";

import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import toast from "react-hot-toast";

const useGetMembers = (workspaceId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWorkspaceMembers = async () => {
      setLoading(true);
      await axios
        .get(`/chat/${workspaceId}/members`, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          dispatch(workspaceMemebersRestored(data));
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
    getWorkspaceMembers();
  }, []);

  return { loading };
};

export default useGetMembers;
