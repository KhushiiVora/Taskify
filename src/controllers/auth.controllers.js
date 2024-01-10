const AuthService = require("../services/authService");
const authService = new AuthService();

const postSignup = async (req, res) => {
  const result = await authService.signup(req.body);
  if (result.error) {
    res.status(400).send(error);
  } else {
    res.status(200).json(result.savedUser);
  }
};

module.exports = {
  postSignup,
};
