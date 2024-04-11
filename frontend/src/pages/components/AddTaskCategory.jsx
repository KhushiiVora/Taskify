import { useState } from "react";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTaskCategory({
  setOpenAddTaskCategory,
  setTaskCategories,
  workspaceId,
}) {
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    await axios
      .post(
        `/dashboard/taskCategories/${workspaceId}/create`,
        { categoryName: event.target.value },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((taskCategory) => {
        console.log("handleSubmit in taskcategory", taskCategory);
        setTaskCategories((previousList) => [...previousList, taskCategory]);
        setOpenAddTaskCategory(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        refreshPage(error.response.status);
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
  };

  return (
    <>
      <h3>Task Category</h3>
      <input
        name="categoryName"
        onChange={handleChange}
        value={title}
        autoFocus
        onBlur={() =>
          !title ? setOpenAddTaskCategory(false) : setOpenAddTaskCategory(true)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" && title) handleSubmit(event);
        }}
      />
      <ToastContainer />
    </>
  );
}

export default AddTaskCategory;
