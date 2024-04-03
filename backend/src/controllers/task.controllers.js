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
  try {
    const { taskCategory, error } = await taskService.findTaskCategoryById(
      categoryId
    );
    if (taskCategory) {
      const { savedTask } = await taskService.saveTask(data);
      if (savedTask) {
        taskCategory.tasks.push(savedTask._id);
        await taskCategory.save();
        res.status(200).send(savedTask);
      } else {
        res.status(500).send("couldn't create Task");
      }
    } else {
      console.log("error in findTaskCategory: ", error);
      res.status(500).send("createTask couldn't succeed");
    }
  } catch (error) {
    console.log("error in createTask", error);
  }
};

module.exports = { getTasks, postCreateTask };
