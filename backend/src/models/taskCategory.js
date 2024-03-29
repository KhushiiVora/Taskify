const mongoose = require("mongoose");
const validator = require("validator");

const taskCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_. ")),
  },
  // tasks: [
  //   {
  //     task: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Task",
  //     },
  //   },
  // ],
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
  },
});

taskCategorySchema.virtual("workspace", {
  ref: "Workspace",
  localField: "_id",
  foreignField: "taskCategories",
});

const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);
module.exports = TaskCategory;
