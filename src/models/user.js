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
  tokens: [
    {
      /*Each token in an tokens array will be an object with a single field called token.*/
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// need to figure out whether the leader is included as members array also
userSchema.virtual("workspaces", {
  ref: "Workspace",
  localField: "_id",
  foreignField: "members",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
