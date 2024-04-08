const UserService = require("../services/userService");
const userService = new UserService();

// Error handling remaining
const postEditProfilePic = async (req, res) => {
  const { username } = req.params;
  const { profilePic } = req.body;
  const isSet = await userService.setProfilePic(username, profilePic);
  res.status(200).send(isSet);
};

const patchEditUsername = async (req, res) => {
  const { userId } = req.params;
  const { username } = req.body;
  const result = await userService.editUserData(userId, username, "username");
  if (result.editedUser) {
    console.log("Username edited successfully");
    res.status(200).send(result.editedUser);
  } else {
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditUserBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;
  const result = await userService.editUserData(userId, bio, "bio");
  if (result.editedUser) {
    console.log("User Bio edited successfully");
    res.status(200).send(result.editedUser);
  } else {
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

module.exports = { postEditProfilePic, patchEditUsername, patchEditUserBio };
