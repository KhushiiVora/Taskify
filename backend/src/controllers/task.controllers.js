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
    console.log("error in getTasks", result.error);
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
  const { taskCategory, error: taskCategoryError } =
    await taskService.findTaskCategoryById(categoryId, "");

  if (taskCategory) {
    const result = await taskService.saveTask(data);
    if (result.savedTask) {
      taskCategory.tasks.push(result.savedTask._id);
      await taskCategory.save();
      res.status(200).send(result.savedTask);
    } else {
      console.log("Error in postCreateTask: ", result.error);
      const error = errorService.handleError(result.error);
      res.status(error.status).send(error.message);
    }
  } else {
    const error = errorService.handleError(taskCategoryError);
    res.status(error.status).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { categoryId, taskId } = req.params;
  // console.log(taskId);
  const tasks = await taskService.deleteTask(categoryId, taskId);
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    console.log("in task controller");
    res.end();
  }
};

const postEditState = async (req, res) => {
  const { taskId } = req.params;
  const { state } = req.body;
  const { task } = await taskService.editState(taskId, state);
  res.status(200).send(task);
};

const patchEditTask = async (req, res) => {
  const { taskId } = req.params;
  const data = req.body;
  data.dueDate = data.dueDate.split("T")[0];
  const result = await taskService.editTaskData(taskId, data);
  if (!result) {
    res.status(200);
    return;
  }
  if (result.editedTask) {
    res.status(200).send(result.editedTask);
  } else {
    res.status(500).send(result.error);
  }
};

const patchEditAllStates = async (req, res) => {
  const { categoryId } = req.params;
  const { state } = req.body;

  const result = await taskService.editAllStates(categoryId, state);
  if (result.tasks) {
    res.status(200).send(result.tasks);
  } else {
    res.status(500).send(result.error);
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
