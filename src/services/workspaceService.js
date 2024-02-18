const Workspace = require("../models/workspace");

const UserService = require("../services/userService");
const userService = new UserService();

class WorkspaceService {
  saveWorkspace = async (username, data) => {
    const { user } = await userService.findByUsername(username);
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
  findWorkspace = async (code) => {
    try {
      const workspace = await Workspace.findOne({ code });
      return { workspace };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
  joinWorkspace = async (username, data) => {
    const { user } = await userService.findByUsername(username);
    console.log(user);
    const { workspace, error } = await this.findWorkspace(data.code);
    if (workspace) {
      const member = workspace.members.find(
        (member) => user._id.valueOf() == member.valueOf()
      );
      if (!member) {
        workspace.members.push(user._id);
        const updatedWorkspace = await workspace.save();
        return { updatedWorkspace };
      } else {
        return new Error("Already a member");
      }
    }
    return { error };
  };
}

module.exports = WorkspaceService;
