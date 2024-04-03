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
      user.workspaces.push(workspace._id);
      const savedWorkspace = await workspace.save();
      await user.save();
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
  findWorkspaceById = async (workspaceId, populateWith) => {
    try {
      let workspace = null;
      if (populateWith) {
        workspace = await Workspace.findById(workspaceId).populate({
          path: populateWith,
          select: "-password -workspaces",
        });
      } else {
        workspace = await Workspace.findById(workspaceId);
      }
      return { workspace };
    } catch (error) {
      console.log("error in findWorkspaceById service", error);
      return { error };
    }
  };
  joinWorkspace = async (username, data) => {
    const { user } = await userService.findByUsername(username);
    const { workspace, error } = await this.findWorkspace(data.code);
    if (workspace) {
      if (data.name === workspace.name) {
        const member = workspace.members.find(
          (member) => user._id.valueOf() == member.valueOf()
        );
        if (!member) {
          workspace.members.push(user._id);
          user.workspaces.push(workspace._id);
          const updatedWorkspace = await workspace.save();
          await user.save();
          return { updatedWorkspace };
        } else {
          return { error: new Error("Already a member") };
        }
      } else {
        return { error: new Error("Workspace name or code did not matched") };
      }
    }
    return { error };
  };
  getWorkspaceMembers = async (workspaceId) => {
    const result = await this.findWorkspaceById(workspaceId, "members");
    if (result.workspace)
      return {
        leaders: result.workspace.leaders,
        members: result.workspace.members,
      };
    else {
      console.log("workspace members cannot be found!!!");
    }
  };
}

module.exports = WorkspaceService;
