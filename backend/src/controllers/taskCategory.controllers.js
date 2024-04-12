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
    res.status(200).send(result.workspace.taskCategories);
  } else {
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const postCreateTaskCatogory = async (req, res) => {
  const { workspaceId } = req.params;
  const { categoryName } = req.body;

  const { workspace, error: workspaceError } =
    await workspaceService.findWorkspaceById(workspaceId, "");
  if (workspace) {
    const result = await taskService.saveTaskCategory({
      name: categoryName,
    });
    if (result.savedTaskCategory) {
      workspace.taskCategories.push(result.savedTaskCategory._id);
      await workspace.save();
      res.status(200).send(result.savedTaskCategory);
    } else {
      const error = errorService.handleError(result.error);
      res.status(error.status).send(error.message);
    }
  } else {
    const error = errorService.handleError(workspaceError);
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
    res.status(500).send(result.error);
  }
};

module.exports = {
  getTaskCategories,
  postCreateTaskCatogory,
  patchEditCategoryName,
};
