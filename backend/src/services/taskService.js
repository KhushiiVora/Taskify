const TaskCategory = require("../models/taskCategory");
const Task = require("../models/task");
const WorkspaceService = require("./workspaceService");

const workspaceService = new WorkspaceService();

class TaskService {
  //--------------------- TASKCATEGORY RELATED FUNCTIONALITY --------------------------
  saveTaskCategory = async (data) => {
    const taskCategory = new TaskCategory(data);
    const { workspace, error: workspaceError } =
      await workspaceService.findWorkspaceById(data.workspaceId, "");

    if (workspaceError) {
      return { error: workspaceError };
    }
    try {
      let savedTaskCategory = await taskCategory.save();
      workspace.taskCategories.push(savedTaskCategory._id);
      const progress = await savedTaskCategory.getTasksWithStateTrue();
      savedTaskCategory = { ...savedTaskCategory.toObject(), progress };
      await workspace.save();
      return { savedTaskCategory };
    } catch (error) {
      console.log("Error in savedTaskCategory taskService: ", error);
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
      console.log("Error in findTaskCategoryById", error);
      return { error };
    }
  };

  editCategoryName = async (categoryId, categoryName) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "");

    if (taskCategoryError) return { error: taskCategoryError };

    try {
      taskCategory.name = categoryName;
      let updateTaskCategory = await taskCategory.save();
      const progress = await updateTaskCategory.getTasksWithStateTrue();
      updateTaskCategory = { ...updateTaskCategory.toObject(), progress };
      return { updateTaskCategory };
    } catch (error) {
      console.log("Error in categoryName service: ", error);
      return { error };
    }
  };

  deleteTaskCategory = async (categoryId, workspaceId) => {
    const { workspace, error: workspaceError } =
      await workspaceService.findWorkspaceById(workspaceId, "");

    if (workspaceError) return { error: workspaceError };

    try {
      await Task.deleteMany({
        taskCategoryId: categoryId,
      });

      const { deletedCount: taskCategoryDeleted } =
        await TaskCategory.deleteOne({ _id: categoryId });

      if (taskCategoryDeleted) {
        workspace.taskCategories.splice(
          workspace.taskCategories.indexOf(categoryId),
          1
        );
      }
      let { taskCategories } = await (
        await workspace.save()
      ).populate("taskCategories");

      taskCategories = await Promise.all(
        workspace.taskCategories.map(async (taskCategory) => {
          const progress = await taskCategory.getTasksWithStateTrue();
          return { ...taskCategory.toObject(), progress };
        })
      );

      return { taskCategories };
    } catch (error) {
      console.log("error in  deleteTaskcategory", error);
      return { error };
    }
  };
  //--------------------- TASK RELATED FUNCTIONALITY --------------------------
  saveTask = async (data, categoryId) => {
    const task = new Task(data);
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "");

    if (taskCategoryError) {
      return { error: taskCategoryError };
    }
    try {
      const savedTask = await task.save();
      taskCategory.tasks.push(savedTask._id);
      await taskCategory.save();
      return { savedTask };
    } catch (error) {
      console.log("Error in saveTask service: ", error);
      return { error };
    }
  };

  findTaskById = async (taskId) => {
    try {
      const task = await Task.findById(taskId);

      return { task };
    } catch (error) {
      console.log("Error in findTaskById: ", error);
      return { error };
    }
  };

  deleteTask = async (categoryId, taskId) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "");

    if (taskCategoryError) {
      return { error: taskCategoryError };
    }

    try {
      const { acknowledged: taskDeleted } = await Task.deleteOne({
        _id: taskId,
      });

      if (taskDeleted) {
        taskCategory.tasks.splice(taskCategory.tasks.indexOf(taskId), 1);
        await taskCategory.save();
        const { tasks } = await taskCategory.populate("tasks");
        return { tasks };
      }
    } catch (error) {
      console.log("Error in deleteTask: ", error);
      return { error };
    }
  };

  editTaskData = async (taskId, data) => {
    const { task, error: taskError } = await this.findTaskById(taskId);

    if (taskError) {
      return { error: taskError };
    }
    try {
      let isModified = false;
      Object.keys(data).forEach((field) => {
        if (task[field] !== data[field]) {
          isModified = true;
          task[field] = data[field];
        }
      });

      if (isModified) {
        const editedTask = await task.save();
        return { editedTask };
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error in editTaskData: ", error);
      return { error };
    }
  };

  editState = async (taskId, state) => {
    const { task, error: taskError } = await this.findTaskById(taskId);
    if (taskError) {
      return { error: taskError };
    }
    try {
      if (task.state !== state) {
        task.state = state;
        const editedTask = await task.save();
        return { task: editedTask };
      }
      return { task };
    } catch (error) {
      console.log("Error in editState: ", error);
      return { error };
    }
  };

  editAllStates = async (categoryId, state) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "tasks");

    if (taskCategoryError) {
      return { error: taskCategoryError };
    }

    try {
      taskCategory.tasks.forEach(async (task) => {
        task.state = state;
        await task.save();
      });
      return { tasks: taskCategory.tasks };
    } catch (error) {
      console.log("Error in editAllStates ", error);
      return { error };
    }
  };
}

module.exports = TaskService;
