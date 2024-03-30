const WorkspaceService = require("../services/workspaceService");
const ErrorService = require("../services/errorService");

const workspaceService = new WorkspaceService();
const errorService = new ErrorService();

const postCreateWorkspace = async (req, res) => {
  const result = await workspaceService.saveWorkspace(
    req.params.username,
    req.body
  );
  if (result.savedWorkspace) res.status(200).send(result.savedWorkspace);
  else {
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
  if (result.updatedWorkspace) res.status(200).send(result.updatedWorkspace);
  else {
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const getMembers = async (req, res) => {
  const { workspaceId } = req.params;
  const members = await workspaceService.getWorkspaceMembers(workspaceId);
  res.status(200).send(members);
};

module.exports = { postCreateWorkspace, postJoinWorkspace, getMembers };
