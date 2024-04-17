import { useState } from "react";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskCategoryCard from "./TaskCategoryCard";
import ConfirmationDialog from "./ConfirmationDialog";
import { StyledDiv } from "../../styles/taskCategoryList.styles";

function TaskCategoryList(props) {
  const {
    workspaceId,
    taskCategories,
    setTaskCategories,
    isLeader,
    handleExpand,
  } = props;

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
  };

  const handleTaskCategoryDelete = async () => {
    await axios
      .delete(
        `/dashboard/taskCategories/${workspaceId}/delete/${categoryToDelete._id}`,
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setTaskCategories(data);
      })
      .catch((error) => {
        console.log(error);
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
    handleConfirmDialogClose();
  };
  console.log(" Task Categories: ", taskCategories);

  return (
    <>
      {taskCategories.map((category) => {
        return (
          <TaskCategoryCard
            isLeader={isLeader}
            setTaskCategories={setTaskCategories}
            handleExpand={handleExpand}
            key={category._id}
            category={category}
            workspaceId={workspaceId}
            setOpenConfirmDialog={setOpenConfirmDialog}
            setCategoryToDelete={setCategoryToDelete}
          />
        );
      })}
      <ConfirmationDialog
        title={`${categoryToDelete?.name} Delete Confirmation`}
        description={
          <>
            Are you sure you want to delete {categoryToDelete?.name} ? <br />
            NOTE: This action will permanently delete {
              categoryToDelete?.name
            }{" "}
            and its progress.
          </>
        }
        confirmText="Yes, Delete"
        openConfirmDialog={openConfirmDialog}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmAction={handleTaskCategoryDelete}
      />
      <ToastContainer />
    </>
  );
}

export default TaskCategoryList;
