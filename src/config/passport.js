const userService = new require("../services/userService");
// const userService = new UserService();
const JWTStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const getTokenFromCookie = (req) => {
  const token = null;
  if (req && req.cookies) {
    const token = req.cookies["token"];
  }
  return token;
};

const options = {
  jwtFromRequest: getTokenFromCookie,
  secretOrKey: secretKey,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = userService.findById(payload.userId);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
