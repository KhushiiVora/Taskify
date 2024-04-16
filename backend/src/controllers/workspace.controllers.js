const WorkspaceService = require("../services/workspaceService");
const ErrorService = require("../services/errorService");

const workspaceService = new WorkspaceService();
const errorService = new ErrorService();

const postCreateWorkspace = async (req, res) => {
  const result = await workspaceService.saveWorkspace(
    req.params.username,
    req.body
  );
  if (result.savedWorkspace) {
    res.status(200).send(result.savedWorkspace);
  } else {
    console.log("Error in postCreateWorkspace: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const postJoinWorkspace = async (req, res) => {
  const result = await workspaceService.joinWorkspace(
    req.params.username,
    req.body
  );
  if (result.updatedWorkspace) {
    res.status(200).send(result.updatedWorkspace);
  } else {
    console.log("Error in postJoinWorkspace: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const deleteWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  const result = await workspaceService.deleteWorkspace(workspaceId);

  if (result.success) {
    res.status(200).send("Workspace exited and deleted successfully");
  } else {
    console.log("Error in deleteWorkspace: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const getMembers = async (req, res) => {
  const { workspaceId } = req.params;
  const result = await workspaceService.getWorkspaceMembers(workspaceId);

  if (result.workspaceMembers) {
    res.status(200).send(result.workspaceMembers);
  } else {
    console.log("Error in getMembers controller: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(500).send(error.message);
  }
};

const patchRemoveMember = async (req, res) => {
  const { workspaceId } = req.params;
  const { memberId } = req.body;

  const result = await workspaceService.removeWorkspaceMember(
    workspaceId,
    memberId
  );
  if (result.updatedWorkspace) {
    res.status(200).send(result.updatedWorkspace);
  } else {
    console.log("Error in patchRemoveMember: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const patchEditLeader = async (req, res) => {
  const { workspaceId } = req.params;
  const { memberId } = req.body;

  const result = await workspaceService.editLeaders(workspaceId, memberId);

  if (result.updatedWorkspace) {
    res.status(200).send(result.updatedWorkspace);
  } else {
    console.log("Error in patchEditLeader: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(500).send(error.message);
  }
};

const patchEditLock = async (req, res) => {
  const { workspaceId } = req.params;
  const { locked } = req.body;

  const result = await workspaceService.editLock(workspaceId, locked);

  if (result.workspace) {
    res.status(200).send(result.workspace);
  } else {
    console.log("Error in patchEditLock: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  postCreateWorkspace,
  postJoinWorkspace,
  getMembers,
  patchRemoveMember,
  patchEditLeader,
  patchEditLock,
  deleteWorkspace,
};
