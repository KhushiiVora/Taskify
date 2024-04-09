const UserService = require("../services/userService");
const userService = new UserService();

// Error handling remaining
const patchEditProfilePic = async (req, res) => {
  const { userId } = req.params;
  const { profilePic } = req.body;
  console.log(profilePic);
  const result = await userService.editUserData(
    userId,
    profilePic,
    "profilePic"
  );
  if (result.editedUser) {
    console.log("Profile Picture edited successfully");
    res.status(200).send(result.editedUser);
  } else {
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
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

module.exports = { patchEditProfilePic, patchEditUsername, patchEditUserBio };
