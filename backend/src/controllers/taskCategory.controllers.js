const WorkspaceService = require("../services/workspaceService");
const TaskService = require("../services/taskService");
const workspaceService = new WorkspaceService();
const taskService = new TaskService();

const getTaskCategories = async (req, res) => {
  const { workspaceId } = req.params;
  try {
    const workspace = await workspaceService.findWorkspaceById(
      workspaceId,
      "taskCategories"
    );
    res.status(200).send(workspace.taskCategories);
  } catch (error) {
    console.log("error in taskController", error);
  }
};

const postCreateTaskCatogory = async (req, res) => {
  const { workspaceId } = req.params;
  const { categoryName } = req.body;
  try {
    const workspace = await workspaceService.findWorkspaceById(workspaceId, "");
    const { savedTaskCategory, error } = await taskService.saveTaskCategory({
      name: categoryName,
    });
    console.log(savedTaskCategory);
    if (savedTaskCategory) {
      workspace.taskCategories.push(savedTaskCategory._id);
      await workspace.save();
      res.status(200).send(savedTaskCategory);
    }
  } catch (error) {
    console.log("error in taskcategory controller", error);
  }
};

module.exports = {
  getTaskCategories,
  postCreateTaskCatogory,
};
