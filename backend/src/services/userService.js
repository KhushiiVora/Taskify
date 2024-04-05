const User = require("../models/user");

class UserService {
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

  findById = async (userId) => {
    try {
      const user = await User.findOne({ _id: userId }).populate("workspaces");
      return user;
    } catch (error) {
      throw error;
    }
  };
  setProfilePic = async (username, profilePic) => {
    const { user } = await this.findByUsername(username);
    try {
      if (user) {
        user.profilePic = profilePic;
        const isSet = await user.save();
        console.log(isSet);
        return { isSet };
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserService;
