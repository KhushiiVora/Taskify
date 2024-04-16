const WorkspaceService = require("../services/workspaceService");
const TaskService = require("../services/taskService");
const ErrorService = require("../services/errorService");

const workspaceService = new WorkspaceService();
const taskService = new TaskService();
const errorService = new ErrorService();

const getTaskCategories = async (req, res) => {
  const { workspaceId } = req.params;
  const result = await workspaceService.findWorkspaceById(
    workspaceId,
    "taskCategories"
  );
  if (result.workspace) {
    const taskCategories = await Promise.all(
      result.workspace.taskCategories.map(async (taskCategory) => {
        const progress = await taskCategory.getTasksWithStateTrue();
        return { ...taskCategory.toObject(), progress };
      })
    );
    // console.log("objects with progress------", taskCategories);
    res.status(200).send(taskCategories);
  } else {
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const postCreateTaskCatogory = async (req, res) => {
  const { workspaceId } = req.params;
  const { categoryName } = req.body;

  const result = await taskService.saveTaskCategory({
    name: categoryName,
    workspaceId,
  });
  if (result.savedTaskCategory) {
    res.status(200).send(result.savedTaskCategory);
  } else {
    console.log("Error in postCreateTaskCatogory: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditCategoryName = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  const result = await taskService.editCategoryName(categoryId, categoryName);

  if (result.updateTaskCategory) {
    res.status(200).send(result.updateTaskCategory);
  } else {
    console.log("Error in patchEditCategoryName: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const deleteTaskCategory = async (req, res) => {
  const { categoryId, workspaceId } = req.params;

  const result = await taskService.deleteTaskCategory(categoryId, workspaceId);

  if (result.taskCategories) {
    res.status(200).send(result.taskCategories);
  } else {
    console.log("Error in deleteTaskCategory: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  getTaskCategories,
  postCreateTaskCatogory,
  patchEditCategoryName,
  deleteTaskCategory,
};
