import TaskCategoryCard from "./TaskCategoryCard";

import { StyledDiv } from "../../styles/taskCategoryList.styles";

function TaskCategoryList(props) {
  const {
    workspaceId,
    taskCategories,
    setTaskCategories,
    isLeader,
    handleExpand,
  } = props;

  console.log(taskCategories);

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
          />
        );
      })}
    </>
  );
}

export default TaskCategoryList;
