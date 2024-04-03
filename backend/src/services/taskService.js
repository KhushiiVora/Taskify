const TaskCategory = require("../models/taskCategory");
const Task = require("../models/task");

class TaskService {
  saveTaskCategory = async (data) => {
    const taskCategory = new TaskCategory(data);
    try {
      const savedTaskCategory = await taskCategory.save();
      return { savedTaskCategory };
    } catch (error) {
      console.log("in taskService", error);
      return { error };
    }
  };
  findTaskCategoryById = async (categoryId, populateWith) => {
    try {
      let taskCategory = null;
      if (populateWith) {
        taskCategory = await TaskCategory.findById(categoryId).populate(
          populateWith
        );
      } else {
        taskCategory = await TaskCategory.findById(categoryId);
      }
      return { taskCategory };
    } catch (error) {
      console.log("error in findTaskCategoryById", error);
      return { error };
    }
  };
  saveTask = async (data) => {
    const task = new Task(data);
    try {
      const savedTask = await task.save();
      return { savedTask };
    } catch (error) {
      console.log("error in saveTask", error);
    }
  };
}

module.exports = TaskService;
