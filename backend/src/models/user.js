const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_.")),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => validator.isStrongPassword(value),
  },
  bio: {
    type: String,
    trim: true,
    validate: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, "_. ")),
  },
  profilePic: {
    type: String,
    default: "",
  },
  workspaces: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Workspace",
  },
});



const User = mongoose.model("User", userSchema);

module.exports = User;
