const User = require("../models/user");

class userService {
  register = async (data) => {
    const user = new User(data);
    try {
      const savedUser = await user.save();
      return { savedUser };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  saveToken = async (user, token) => {
    try {
      user.tokens = user.tokens.concat({ token });
      await user.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  findByUsername = async (username) => {
    try {
      const user = await User.findOne({
        $or: [{ username }, { email: username }],
      });
      return { user };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}

module.exports = userService;
