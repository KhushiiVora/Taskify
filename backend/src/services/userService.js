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

  findUserById = async (userId, populateWith) => {
    try {
      let user = null;
      if (populateWith) {
        user = await User.findById(userId).populate({
          path: populateWith,
          select: "-password",
        });
      } else {
        user = await User.findById(userId).select("-password");
        return { user };
      }
    } catch (error) {
      console.log("error in findUserById service", error);
      return { error };
    }
  };

  editUserData = async (userId, value, fieldToEdit) => {
    const { user, error } = await this.findUserById(userId, "");
    try {
      if (user) {
        user[fieldToEdit] = value;
        const editedUser = await user.save();
        return { editedUser };
      }
    } catch (error) {
      return { error };
    }
  };
  //----------------Below two functions need to be modify--------------------
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
  //---------------------------------------------
}

module.exports = UserService;
