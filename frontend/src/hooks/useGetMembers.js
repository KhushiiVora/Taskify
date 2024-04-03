import { useEffect, useState } from "react";
import axios from "../axiosConfig";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import toast from "react-hot-toast";

const useGetMembers = (workspaceId) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getWorkspaceMembers = async () => {
      setLoading(true);
      try {
        const { members: workspaceMembers } = await axios
          .get(`/chat/${workspaceId}/members`, {
            withCredentials: true,
          })
          .then((response) => response.data)
          .catch((error) => console.log("Error in fetching members\n", error));
        // if (data.error) {
        //   throw new Error(data.error);
        // }
        setMembers(workspaceMembers);
      } catch (error) {
        // toast.error(error.message);
        console.log("error in get workspace members", error);
      } finally {
        setLoading(false);
      }
    };
    getWorkspaceMembers();
  }, []);

  return { loading, members };
};

export default useGetMembers;
