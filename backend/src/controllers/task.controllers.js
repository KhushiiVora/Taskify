const TaskService = require("../services/taskService");
const ErrorService = require("../services/errorService");

const taskService = new TaskService();
const errorService = new ErrorService();

const getTasks = async (req, res) => {
  const { categoryId } = req.params;
  const result = await taskService.findTaskCategoryById(categoryId, "tasks");

  if (result.taskCategory) {
    res.status(200).send(result.taskCategory.tasks);
  } else {
    console.log("Error in getTasks: ", result.error);
    const error = errorService.handleError(
      new Error("Could not retrieve tasks!")
    );
    res.status(500).send(error.message);
  }
};

const postCreateTask = async (req, res) => {
  const data = req.body;
  const { categoryId } = req.params;
  data.dueDate = data.dueDate.split("T")[0];
  data.taskCategoryId = categoryId;

  const result = await taskService.saveTask(data, categoryId);
  if (result.savedTask) {
    res.status(200).send(result.savedTask);
  } else {
    console.log("Error in postCreateTask: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { categoryId, taskId } = req.params;
  const result = await taskService.deleteTask(categoryId, taskId);
  if (result.tasks) {
    res.status(200).send(result.tasks);
  } else {
    console.log("Error in deleteTask: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditTask = async (req, res) => {
  const { taskId } = req.params;
  const data = req.body;
  data.dueDate = data.dueDate.split("T")[0];
  const result = await taskService.editTaskData(taskId, data);
  if (!result) {
    return res.status(200);
  }
  if (result.editedTask) {
    res.status(200).send(result.editedTask);
  } else {
    console.log("Error in pacthEditTask: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const postEditState = async (req, res) => {
  const { taskId } = req.params;
  const { state } = req.body;

  const result = await taskService.editState(taskId, state);
  if (result.task) {
    res.status(200).send(result.task);
  } else {
    console.log("Error in postEditState: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditAllStates = async (req, res) => {
  const { categoryId } = req.params;
  const { state } = req.body;

  const result = await taskService.editAllStates(categoryId, state);
  if (result.tasks) {
    res.status(200).send(result.tasks);
  } else {
    console.log("Error in patchEditAllStates: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  getTasks,
  postCreateTask,
  deleteTask,
  postEditState,
  patchEditTask,
  patchEditAllStates,
};
