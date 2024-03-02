import { StyledDiv } from "../../styles/taskCategoryList.styles";

function TaskCategoryList(props) {
  const { taskCategories, handleExpand } = props;

  console.log(taskCategories);

  return (
    <>
      {taskCategories.map((category) => {
        return (
          <StyledDiv
            key={category._id}
            onClick={(event) => handleExpand(event, category._id)}
          >
            <h4>{category.name}</h4>
            <div>{category.tasks.length} tasks</div>
          </StyledDiv>
        );
      })}
    </>
  );
}

export default TaskCategoryList;
