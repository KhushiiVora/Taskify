import { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { refreshPage } from "../../../utils/refreshPage";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskCategoryCard from "./TaskCategoryCard";
import ConfirmationDialog from "../../ConfirmationDialog";

function TaskCategoryList(props) {
  const {
    workspaceId,
    taskCategories,
    setTaskCategories,
    isLeader,
    handleExpand,
    loading,
    setLoading,
  } = props;

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer Started🚀: ");
      getTaskCategoryList();
    }, 5000);

    setLoading(true);
    getTaskCategoryList();

    return () => {
      console.log("Stopped......");
      clearInterval(timer);
    };
  }, [workspaceId]);

  useEffect(() => {
    setLoading(true);
    getTaskCategoryList();
  }, []);

  const getTaskCategoryList = async () => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        setTaskCategories(data);
        setLoading(false);
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
        setLoading(false);
      });
  };

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

  return !loading && (
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
