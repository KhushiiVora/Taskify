const User = require("../models/user");

class userService {
  signup = async (data) => {
    const user = new User(data);
    try {
      const savedUser = await user.save().then((savedUser) => savedUser);
      return { savedUser };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}

module.exports = userService;
