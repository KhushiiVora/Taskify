import { useState } from "react";
import axios from "../../axiosConfig";

function AddTaskCategory({ setOpen, setTaskCategories, workspaceId }) {
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
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h3>Task Category</h3>
      <input
        name="categoryName"
        onChange={handleChange}
        value={title}
        autoFocus
        onBlur={() => (!title ? setOpen(false) : setOpen(true))}
        onKeyDown={(event) => {
          if (event.key === "Enter" && title) handleSubmit(event);
        }}
      />
    </>
  );
}

export default AddTaskCategory;
