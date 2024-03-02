const TaskService = require("../services/taskService");
const taskService = new TaskService();

const getTasks = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const { taskCategory, error } = await taskService.findTaskCategoryById(
      categoryId
    );
    if (taskCategory) {
      const populatedTaskCategory = await taskCategory.populate("tasks");
      res.status(200).send(populatedTaskCategory.tasks);
    } else {
      console.log("error in getTasks", error);
      res.status(500).send(error);
    }
  } catch (error) {
    console.log("error in getTask", error);
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
