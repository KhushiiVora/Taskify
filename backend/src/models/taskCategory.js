const mongoose = require("mongoose");
const validator = require("validator");

const taskCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      validate: (value) =>
        validator.isAlphanumeric(validator.blacklist(value, "_. ")),
    },
    tasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Task",
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
  },
  {
    virtuals: true,
  }
);

taskCategorySchema.virtual("progress", {
  ref: "Task",
  localField: "_id",
  foreignField: "taskCategoryId",
  justOne: false,
  options: { match: { state: true } },
  count: true,
});

taskCategorySchema.methods.getTasksWithStateTrue = async function () {
  try {
    await this.populate("progress");
    return this.progress;
  } catch (error) {
    console.error("Error in taskCategory model (retrieving tasks with state true):", error);
    return [];
  }
};

const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);
module.exports = TaskCategory;
