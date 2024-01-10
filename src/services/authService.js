const bcrypt = require("bcrypt");

const UserService = require("../services/userService");
const userService = new UserService();

class AuthService {
  signup = async (data) => {
    const hashedPassword = await this.hashPassword(data.password);
    const result = await userService.register({
      ...data,
      password: hashedPassword,
    });
    return result;
  };
  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
}

module.exports = AuthService;
