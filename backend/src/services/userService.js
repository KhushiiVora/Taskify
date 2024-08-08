const User = require("../models/user");

class UserService {
  register = async (data) => {
    const user = new User(data);
    try {
      const savedUser = await user.save();
      return { savedUser };
    } catch (error) {
      console.log("Error in register userService: ", error);
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
      console.log("Error in findByUsername service: ", error);
      return { error };
    }
  };

  findUserById = async (userId, populateWith) => {
    try {
      let user = null;
      if (populateWith) {
        user = await User.findById(userId)
          .populate(populateWith)
          .select("-password");

        user.workspaces.sort(
          (workspace1, workspace2) =>
            workspace2.updatedAt - workspace1.updatedAt
        );
      } else {
        user = await User.findById(userId).select("-password");
      }
      return { user };
    } catch (error) {
      console.log("error in findUserById service", error);
      return { error };
    }
  };

  editUserData = async (userId, value, fieldToEdit) => {
    const { user, error: userError } = await this.findUserById(userId, "");
    if (userError) {
      return { error: userError };
    }
    try {
      user[fieldToEdit] = value;
      const editedUser = await user.save();
      return { editedUser };
    } catch (error) {
      console.log("Error in editUserData service: ", error);
      return { error };
    }
  };
}

module.exports = UserService;
