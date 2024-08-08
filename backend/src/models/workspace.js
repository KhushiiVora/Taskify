const mongoose = require("mongoose");
const validator = require("validator");

const workspaceSchema = new mongoose.Schema(
  {
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

    leaders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },

    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: (value) => {
        console.log(value);
      },
    },

    taskCategories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "TaskCategory",
      // unique: true,
    },
  },
  { timestamps: true }
);

// Define the model
const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
