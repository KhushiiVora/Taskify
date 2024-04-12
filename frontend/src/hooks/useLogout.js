import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import axios from "../axiosConfig";

import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);

    await axios
      .get("/auth/logout/", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        // clear the user redux state
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        toast.success(response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });

    setLoading(true);
  };
  return { loading, logout };
};
export default useLogout;
