import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axiosConfig";

import TaskCategory from "./TaskCategory";
import Button from "../atoms/Button";
import { StyledSection } from "../../styles/workspace.styles";

export default function Workspace(props) {
  const { workspaceId } = props;

  const [open, setOpen] = useState(false);
  const [taskCategories, setTaskCategories] = useState([]);

  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  const user = useSelector((state) => state.user.user);
  console.log("workspaceData", workspaceData);

  useEffect(() => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/get`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTaskCategories(data))
      .catch((error) => console.log("in controller", error));
  }, []);

  const handleClick = (e) => {
    setOpen(!open);
  };

  return (
    <StyledSection>
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
          <TaskCategory
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
          {taskCategories.map((category) => {
            return <div key={category._id}>{category.name}</div>;
          })}
        </section>
      ) : (
        <>
          <h2>You dont have any taskCategory so please create one</h2>
        </>
      )}
    </StyledSection>
  );
}
