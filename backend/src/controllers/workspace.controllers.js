const WorkspaceService = require("../services/workspaceService");
const ErrorService = require("../services/errorService");
const { updateMany } = require("../models/workspace");

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
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const postJoinWorkspace = async (req, res) => {
  console.log(req.body, req.params);
  const result = await workspaceService.joinWorkspace(
    req.params.username,
    req.body
  );
  if (result.updatedWorkspace) {
    res.status(200).send(result.updatedWorkspace);
  } else {
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
    res.status(500).send(result.error);
  }
};

module.exports = {
  postCreateWorkspace,
  postJoinWorkspace,
  getMembers,
  patchRemoveMember,
};
