const WorkspaceService = require("../services/workspaceService");
const workspaceService = new WorkspaceService();

const postCreateWorkspace = async (req, res) => {
  const result = await workspaceService.saveWorkspace(
    req.params.username,
    req.body
  );
  if (result.savedWorkspace) res.status(200).json(result.savedWorkspace);
  else res.status(500).send(result.error);
};

const postJoinWorkspace = async (req, res) => {
  console.log(req.body, req.params);
  const result = await workspaceService.joinWorkspace(
    req.params.username,
    req.body
  );
  if (result.updatedWorkspace) res.status(200).json(result.updatedWorkspace);
  else res.status(400).send(result.error);
};

module.exports = { postCreateWorkspace, postJoinWorkspace };
