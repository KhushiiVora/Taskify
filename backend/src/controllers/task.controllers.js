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
  console.log(taskId);
  const tasks = await taskService.deleteTask(categoryId, taskId);
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    console.log("in task controller");
    res.end();
  }
};

module.exports = { getTasks, postCreateTask, deleteTask };
