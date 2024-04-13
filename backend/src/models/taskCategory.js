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
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
  },
});

const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);
module.exports = TaskCategory;
