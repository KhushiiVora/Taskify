const UserService = require("../services/userService");
const ErrorService = require("../services/errorService");
const userService = new UserService();
const errorService = new ErrorService();

const getWorkspaces = async (req, res) => {
  const result = await userService.findUserById(req.user._id, "workspaces");

  if (result.user) {
    res.status(200).send(result.user.workspaces);
  } else {
    console.log("Error in getWorkspaces: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};
const patchEditProfilePic = async (req, res) => {
  const { userId } = req.params;
  const { profilePic } = req.body;
  const result = await userService.editUserData(
    userId,
    profilePic,
    "profilePic"
  );
  if (result.editedUser) {
    res.status(200).send(result.editedUser);
  } else {
    console.log("Error in patchEditProfilePic: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditUsername = async (req, res) => {
  const { userId } = req.params;
  const { username } = req.body;
  const result = await userService.editUserData(userId, username, "username");
  if (result.editedUser) {
    res.status(200).send(result.editedUser);
  } else {
    console.log("Error in patchEditUsername: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditUserBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;
  const result = await userService.editUserData(userId, bio, "bio");
  if (result.editedUser) {
    res.status(200).send(result.editedUser);
  } else {
    console.log("Error in patchEditUserBio: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  getWorkspaces,
  patchEditProfilePic,
  patchEditUsername,
  patchEditUserBio,
};
