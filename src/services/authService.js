const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserService = require("../services/userService");
const userService = new UserService();

class AuthService {
  secret = process.env.JWT_SECRET_KEY;

  /* 1. Sign Up function */
  signup = async (data) => {
    const hashedPassword = await this.hashPassword(data.password);
    const { savedUser, error } = await userService.register({
      ...data,
      password: hashedPassword,
    });
    if (error) return { isSignedUp: false, error };

    const token = this.generateToken(savedUser._id);
    if (token) {
      const error = await userService.saveToken(savedUser, token);
      if (!error) return { isSignedUp: true, jwt: token };
    }
    return { isSignedUp: true };
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  /* 2. Login function */
  login = async (data) => {
    const { username, password } = data;
    const { user } = await userService.findByUsername(username);

    if (user) {
      console.log(user);
      const isValidPassword = bcrypt.compare(password, user.password);

      if (!isValidPassword) return { isLoggedIn: false };

      const token = this.generateToken(user._id);
      if (token) {
        const error = await userService.saveToken(user, token);
        if (!error) return { isLoggedIn: true, jwt: token };
      }
      return { isLoggedIn: false };
    }
  };

  /* 3. Generate token function  */
  generateToken = (userId) => {
    try {
      const payload = { userId };
      const options = { expiresIn: "30d" };
      const token = jwt.sign(payload, this.secret, options);
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

module.exports = AuthService;
