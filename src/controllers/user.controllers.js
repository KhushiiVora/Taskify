const userValidator = require("../validators/user.validator");
const UserService = require("../services/userService");
const userService = new UserService();

const postSignup = async (req, res) => {
  const { error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const result = await userService.signup(req.body);
    if (result.error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(result.savedUser);
    }
  }
};

module.exports = {
  postSignup,
};
