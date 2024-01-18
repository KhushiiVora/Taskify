const AuthService = require("../services/authService");
const authService = new AuthService();

const postSignup = async (req, res) => {
  const result = await authService.signup(req.body);
  if (result.error) {
    res.status(403).send(result.error);
  }
  if (result.jwt) {
    res.cookie("token", result.jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send("Successfully Signed Up");
  }
};

const postLogin = async (req, res) => {
  console.log(req.headers);
  const result = await authService.login(req.body);
  if (result.isLoggedIn) {
    res.cookie("token", result.jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send("Successfully Logged In");
  } else {
    res.status(401).send("Authentication Failed");
  }
};

module.exports = {
  postSignup,
  postLogin,
};
