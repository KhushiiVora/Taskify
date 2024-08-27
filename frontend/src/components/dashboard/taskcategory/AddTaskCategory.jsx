import { useEffect, useRef, useState } from "react";
import axios from "../../../axiosConfig";
import { refreshPage } from "../../../utils/refreshPage";
import Button from "../../atoms/Button";

import { IoAddOutline } from "react-icons/io5";
import { MdSaveAs } from "react-icons/md";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerIcon from "../../atoms/SpinnerIcon";

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
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (!isNewCategory) setTitle(categoryToEdit.name);
  }, []);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (isNewCategory) {
      await axios
        .post(
          `/dashboard/taskCategories/${workspaceId}/create`,
          { categoryName: title },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data)
        .then((taskCategory) => {
          setTaskCategories((previousList) => [...previousList, taskCategory]);
          setOpenTaskCategoryInput(false);
          setLoading(false);
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
          setLoading(false);
        });
    } else {
      console.log("hollaaaa");
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
          setCategoryToEdit(null);
          setLoading(false);
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
          setLoading(false);
          setCategoryToEdit(null);
        });
    }
  };

  return (
    <>
      <form
        className="addTaskCategory__form"
        onBlur={() => {
          if (isNewCategory) {
            !title && setOpenTaskCategoryInput(false);
          } else {
            categoryToEdit.name === title &&
              !loading &&
              setCategoryToEdit(null);
          }
        }}
      >
        <input
          className="addTaskCategory--input"
          name="categoryName"
          onChange={handleChange}
          value={title}
          placeholder="Task Category name"
          ref={inputRef}
        />
        <Button
          type="button"
          name="addTaskCategory"
          onClick={() => title && handleSubmit()}
          className={`addTaskCategory--button ${
            isNewCategory ? "add" : "edit"
          }`}
          icon={
            loading ? (
              <SpinnerIcon />
            ) : isNewCategory ? (
              <IoAddOutline />
            ) : (
              <MdSaveAs />
            )
          }
        />
      </form>
      <ToastContainer />
    </>
  );
}

export default AddTaskCategory;
