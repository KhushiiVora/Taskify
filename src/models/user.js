const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
});

// need to figure out whether the leader is included as members array also
userSchema.virtual("workspaces", {
  ref: "Workspace",
  localField: "_id",
  foreignField: "members",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
