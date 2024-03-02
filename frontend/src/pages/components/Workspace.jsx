import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axiosConfig";

import AddTaskCategory from "./AddTaskCategory";
import TaskCategoryList from "./TaskCategoryList";
import Button from "../atoms/Button";
import { StyledSection } from "../../styles/workspace.styles";
import TaskList from "./TaskList";

export default function Workspace(props) {
  const { workspaceId } = props;

  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTaskCategories(data))
      .catch((error) => console.log("in catch", error));
  }, []);

  const handleClick = (event) => {
    setOpen(!open);
  };

  const handleExpand = (event, categoryId) => {
    setExpand(!expand);
    if (event.target.tagName !== "BUTTON") setSelectedCategoryId(categoryId);
  };

  return (
    <StyledSection>
      {expand ? (
        <section>
          <Button onClick={handleExpand} type="button" text="Back" />
          <TaskList categoryId={selectedCategoryId} />
        </section>
      ) : (
        <>
          <section>
            <h1>{workspaceData?.name}</h1>
            <h1>Workspace details</h1>
            {workspaceData.leaders.includes(user._id) ? (
              <Button
                type="button"
                onClick={handleClick}
                text="Create Task Category"
              />
            ) : (
              <></>
            )}
            {open ? (
              <AddTaskCategory
                setOpen={setOpen}
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
              />
            ) : (
              <></>
            )}
          </section>
          {taskCategories.length ? (
            <section className="categories_container">
              <TaskCategoryList
                taskCategories={taskCategories}
                handleExpand={handleExpand}
              />
            </section>
          ) : (
            <>
              <h2>You dont have any taskCategory so please create one</h2>
            </>
          )}
        </>
      )}
    </StyledSection>
  );
}
