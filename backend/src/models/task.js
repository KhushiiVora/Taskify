const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_. ")),
  },
  dueDate: {
    type: Date,
    validate: (value) => validator.isDate(value),
  },
  state: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  taskCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskCategory",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
