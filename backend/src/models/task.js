const mongoose = require("mongoose");

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
  // assignedTo: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
  assignedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

taskSchema.virtual("taskCategory", {
  ref: "TaskCategory",
  localField: "_id",
  foreignField: "tasks",
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
