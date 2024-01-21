const mongoose = require("mongoose");
const validator = require("validator");

// const isUnique = async (value) => {
//   // Check if the value already exists in the User collection
//   const count = await User.countDocuments({ username: value });

//   // If count is greater than 0, the value is not unique
//   return count === 0;
// };

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_. ")),
  },
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true, // This ensures uniqueness at the database level
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_.")),
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
    required: true,
    // validate: (value) => validator.isUnique(value),
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
    required: true,
    // validate: {
    //   validator: isUnique,
    //   message: "Each member must be unique.",
    // },
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
    // unique: true,
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
