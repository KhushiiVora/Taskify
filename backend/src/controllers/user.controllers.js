const UserService = require("../services/userService");
const userService = new UserService();

const postEditProfilePic = async (req, res) => {
  const { username } = req.params;
  const { profilePic } = req.body;
  const isSet = await userService.setProfilePic(username, profilePic);
  res.status(200).send(isSet);
};

module.exports = { postEditProfilePic };
