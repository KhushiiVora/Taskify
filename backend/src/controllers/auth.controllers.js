const AuthService = require("../services/authService");
const ErrorService = require("../services/errorService");

const authService = new AuthService();
const errorService = new ErrorService();

const postSignup = async (req, res) => {
  const result = await authService.signup(req.body);
  if (result.error) {
    console.log("Error in postSignup: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
  if (result.jwt) {
    res.cookie("token", result.jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send(result.savedUser);
  }
};

const postLogin = async (req, res) => {
  const result = await authService.login(req.body);
  if (result.isLoggedIn) {
    res.cookie("token", result.jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send(result.user);
  } else {
    res.status(401).send("Invalid username or password!");
  }
};

const getLogout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0, httpOnly: true });
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).send("Unable to log out! Try again.");
  }
};
module.exports = {
  postSignup,
  postLogin,
  getLogout,
};
