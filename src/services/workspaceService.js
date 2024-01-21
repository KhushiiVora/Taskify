const Workspace = require("../models/workspace");

const UserService = require("../services/userService");
const userService = new UserService();

class WorkspaceService {
  saveWorkspace = async (username, data) => {
    const { user } = await userService.findByUsername(username);
    console.log(user);
    const workspace = new Workspace(data);

    try {
      workspace.leaders.push(user._id);
      workspace.members.push(user._id);
      const savedWorkspace = await workspace.save();
      return { savedWorkspace };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}

module.exports = WorkspaceService;
