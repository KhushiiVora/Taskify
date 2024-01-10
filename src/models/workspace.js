const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  // leaders: [
  //   {
  //     leader: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
  leaders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  /* leader ids will also be member ids */
  // members: [
  //   {
  //     member: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  // taskCategories: [
  //   {
  //     taskCategory: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "TaskCategory",
  //     },
  //   },
  // ],
  taskCategories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "TaskCategory",
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
