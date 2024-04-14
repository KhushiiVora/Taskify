const TaskCategory = require("../models/taskCategory");
const Task = require("../models/task");
const WorkspaceService = require("./workspaceService");

const workspaceService = new WorkspaceService();

class TaskService {
  //--------------------- TASKCATEGORY RELATED FUNCTIONALITY --------------------------
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
      // console.log("progress in service: ", taskCategory.progress);
      return { taskCategory };
    } catch (error) {
      console.log("error in findTaskCategoryById", error);
      return { error };
    }
  };

  editCategoryName = async (categoryId, categoryName) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "");

    if (taskCategoryError) return { error: taskCategoryError };

    try {
      if (taskCategory) {
        taskCategory.name = categoryName;
        const updateTaskCategory = await taskCategory.save();
        return { updateTaskCategory };
      }
    } catch (error) {
      console.log("error in categoryName", error);
      return { error };
    }
  };

  deleteTaskCategory = async (categoryId, workspaceId) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "");

    const { workspace, error: workspaceError } =
      await workspaceService.findWorkspaceById(workspaceId, "");

    if (taskCategoryError || workspaceError)
      return { error: taskCategoryError ?? workspaceError };
    try {
      const { acknowledged } = await Task.deleteMany({
        taskCategoryId: categoryId,
      });

      if (acknowledged) {
        const { acknowledged: taskCategoryDeleted } =
          await TaskCategory.deleteOne({ _id: categoryId });

        if (taskCategoryDeleted) {
          workspace.taskCategories.splice(
            workspace.taskCategories.indexOf(categoryId),
            1
          );
          const { taskCategories } = await (
            await workspace.save()
          ).populate("taskCategories");

          return { taskCategories };
        }
      }
    } catch (error) {
      console.log("error in  deleteTaskcategory", error);
      return { error };
    }
  };
  //--------------------- TASK RELATED FUNCTIONALITY --------------------------
  saveTask = async (data) => {
    const task = new Task(data);
    try {
      const savedTask = await task.save();
      return { savedTask };
    } catch (error) {
      console.log("error in saveTask", error);
      return { error };
    }
  };
  findTaskById = async (taskId) => {
    try {
      const task = await Task.findById(taskId);

      return { task };
    } catch (error) {
      console.log("error in taskService find task", error);
      return { error };
    }
  };
  deleteTask = async (categoryId, taskId) => {
    try {
      const { taskCategory, error } = await this.findTaskCategoryById(
        categoryId,
        ""
      );
      if (taskCategory) {
        taskCategory.tasks.splice(taskCategory.tasks.indexOf(taskId), 1);

        await taskCategory.save();
        const task = await Task.deleteOne({ _id: taskId });
        /*{ acknowledged: true, deletedCount: 1 } */
        // console.log(task);
        const { tasks } = await taskCategory.populate("tasks");
        // console.log(tasks);
        return tasks;
      }
    } catch (error) {
      console.log("error in taskService delete task", error);
    }
  };

  editState = async (taskId, state) => {
    const { task } = await this.findTaskById(taskId);
    try {
      if (task.state !== state) {
        task.state = state;
        const editedTask = await task.save();
        return { task: editedTask };
      } else {
        return { task };
      }
    } catch (error) {
      console.log("error in taskService editState", error);
    }
  };

  editAllStates = async (categoryId, state) => {
    const { taskCategory, error: taskCategoryError } =
      await this.findTaskCategoryById(categoryId, "tasks");

    try {
      if (taskCategory) {
        taskCategory.tasks.forEach(async (task) => {
          task.state = state;
          await task.save();
        });

        return { tasks: taskCategory.tasks };
      } else {
        return { error: taskCategoryError };
      }
    } catch (error) {
      console.log("in edit all states true: ", error);
      return { error };
    }
  };

  editTaskData = async (taskId, data) => {
    const { task, error } = await this.findTaskById(taskId);
    try {
      if (task) {
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
      } else {
        return { error };
      }
    } catch (error) {
      console.log("error in edit Task data", error);
      return { error };
    }
  };
}

module.exports = TaskService;
