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
}

module.exports = userService;
