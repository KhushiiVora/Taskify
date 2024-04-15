const Task = require("../models/task");
const TaskCategory = require("../models/taskCategory");
const Workspace = require("../models/workspace");

const UserService = require("./userService");
const userService = new UserService();

class WorkspaceService {
  saveWorkspace = async (username, data) => {
    const { user, error: userError } = await userService.findByUsername(
      username
    );
    if (userError) {
      return { error: userError };
    }
    const workspace = new Workspace(data);
    try {
      workspace.leaders.push(user._id);
      workspace.members.push(user._id);
      user.workspaces.push(workspace._id);
      const savedWorkspace = await workspace.save();
      await user.save();
      return { savedWorkspace };
    } catch (error) {
      console.log("Error in saveWorkspace service: ", error);
      return { error };
    }
  };
  findWorkspaceByCode = async (code) => {
    try {
      const workspace = await Workspace.findOne({ code });
      return { workspace };
    } catch (error) {
      console.log("Error in findWorkspaceByCode service: ", error);
      return { error };
    }
  };
  findWorkspaceById = async (workspaceId, populateWith) => {
    try {
      let workspace = null;
      if (populateWith) {
        workspace = await Workspace.findById(workspaceId).populate({
          path: populateWith,
          select: "-password",
          // select: "-password -workspaces",
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
    const { workspace, error: workspaceError } = await this.findWorkspaceByCode(
      data.code
    );
    const { user, error: userError } = await userService.findByUsername(
      username
    );
    if (workspaceError || userError) {
      return { error: workspaceError ?? userError };
    }

    if (workspace) {
      if (!workspace.locked && data.name === workspace.name) {
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
          return { error: new Error("You're a Member Already.") };
        }
      } else {
        if (workspace.locked)
          return {
            error: new Error("Opps! Workspace is locked."),
          };
        else
          return {
            error: new Error("Workspace name or code did not matched."),
          };
      }
    } else {
      return { error: new Error("Workspace doesn't exist.") };
    }
  };

  getWorkspaceMembers = async (workspaceId) => {
    const result = await this.findWorkspaceById(workspaceId, "members");
    if (result.workspace) {
      return {
        workspaceMembers: {
          leaders: result.workspace.leaders,
          members: result.workspace.members,
        },
      };
    } else {
      return {
        error: new Error(
          "Workspace members cannot be found. Try refreshing the page!"
        ),
      };
    }
  };
  removeWorkspaceMember = async (workspaceId, memberId) => {
    const { workspace, error: workspaceError } = await this.findWorkspaceById(
      workspaceId,
      ""
    );
    const { user, error: userError } = await userService.findUserById(
      memberId,
      ""
    );
    if (workspaceError || userError) {
      return { error: workspaceError ?? userError };
    }

    console.log("MemberId: ", workspace.members.indexOf(memberId));

    if (!workspace.members.includes(memberId)) {
      return { error: new Error("User has already been removed!") };
    }

    try {
      if (workspace.leaders.includes(memberId)) {
        workspace.leaders.splice(workspace.leaders.indexOf(memberId), 1);
      }
      workspace.members.splice(workspace.members.indexOf(memberId), 1);
      user.workspaces.splice(user.workspaces.indexOf(workspaceId), 1);
      await user.save();
      const updatedWorkspace = await (
        await workspace.save()
      ).populate("members");
      return { updatedWorkspace };
    } catch (error) {
      console.log("error in removeWorkspaceMember service: ", error);
      return { error: new Error("Unable to remove user!") };
    }
  };

  editLeaders = async (workspaceId, memberId) => {
    const { workspace, error: workspaceError } = await this.findWorkspaceById(
      workspaceId,
      ""
    );
    if (workspaceError) {
      return { error: workspaceError };
    }

    try {
      if (workspace.leaders.includes(memberId)) {
        workspace.leaders.splice(workspace.leaders.indexOf(memberId), 1);
      } else {
        workspace.leaders.push(memberId);
      }
      const updatedWorkspace = await (
        await workspace.save()
      ).populate("members");

      return { updatedWorkspace };
    } catch (error) {
      console.log("Error in editLeaders service: ", error);
      return { error };
    }
  };

  editLock = async (workspaceId) => {
    const { workspace, error: workspaceError } = await this.findWorkspaceById(
      workspaceId,
      "members"
    );
    if (workspaceError) {
      return { error: workspaceError };
    }

    try {
      workspace.locked = !workspace.locked;
      const updatedWorkspace = await workspace.save();
      return { updatedWorkspace };
    } catch (error) {
      console.log("Error in editLock service: ", error);
      return { error };
    }
  };

  deleteWorkspace = async (workspaceId) => {
    const { workspace, error: workspaceError } = await this.findWorkspaceById(
      workspaceId,
      "members"
    );
    if (workspaceError) {
      return { error: workspaceError };
    }

    try {
      const tasksDeleted = await workspace.taskCategories.reduce(
        async (resultPromise, taskCategoryId) => {
          const result = await resultPromise;
          const { acknowledged } = await Task.deleteMany({ taskCategoryId });
          return result && acknowledged;
        },
        Promise.resolve(true)
      );

      if (tasksDeleted) {
        const { acknowledged: taskCategoriesDeleted } =
          await TaskCategory.deleteMany({
            workspaceId,
          });

        if (taskCategoriesDeleted) {
          const { acknowledged: workspaceDeleted } = await Workspace.deleteOne({
            _id: workspaceId,
          });

          if (workspaceDeleted) {
            workspace.members.forEach(async (member) => {
              member.workspaces.splice(
                member.workspaces.indexOf(workspaceId),
                1
              );
              await member.save();
            });
            return { success: true };
          }
        }
      }
    } catch (error) {
      console.log("Error in  deleteWorkspace service: ", error);
      return { error };
    }
  };
}

module.exports = WorkspaceService;
