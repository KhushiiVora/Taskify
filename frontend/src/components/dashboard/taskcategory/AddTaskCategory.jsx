import { useEffect, useRef, useState } from "react";
import axios from "../../../axiosConfig";
import { refreshPage } from "../../../utils/refreshPage";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTaskCategory(props) {
  const {
    isNewCategory,
    categoryToEdit,
    setCategoryToEdit,
    setOpenTaskCategoryInput,
    setTaskCategories,
    workspaceId,
  } = props;
  const [title, setTitle] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (!isNewCategory) setTitle(categoryToEdit.name);
  }, []);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (isNewCategory) {
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
          setTaskCategories((previousList) => [...previousList, taskCategory]);
          setOpenTaskCategoryInput(false);
        })
        .catch((error) => {
          refreshPage(error.response.status);
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
    } else {
      if (title === categoryToEdit.name) {
        setCategoryToEdit(null);
        return;
      }
      await axios
        .patch(
          `/dashboard/taskCategories/${workspaceId}/edit/${categoryToEdit._id}/name`,
          { categoryName: title },
          { withCredentials: true }
        )
        .then((response) => response.data)
        .then((data) => {
          setTaskCategories((previousList) => {
            const newList = [...previousList];
            newList.forEach((categoryData) => {
              if (categoryData._id === data._id) {
                categoryData.name = data.name;
                categoryData.tasks = data.tasks;
                categoryData.progress = data.progress;
              }
            });
            return newList;
          });
        })
        .catch((error) => {
          refreshPage(error.response.status);
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
      setCategoryToEdit(null);
    }
  };

  return (
    <>
      <input
        name="categoryName"
        onChange={handleChange}
        value={title}
        placeholder="Task Category name"
        ref={inputRef}
        onBlur={() => {
          if (isNewCategory) {
            !title
              ? setOpenTaskCategoryInput(false)
              : setOpenTaskCategoryInput(true);
          } else {
            setCategoryToEdit(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && title) handleSubmit(event);
        }}
      />
      <ToastContainer />
    </>
  );
}

export default AddTaskCategory;
