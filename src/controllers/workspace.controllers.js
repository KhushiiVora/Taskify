const WorkspaceService = require("../services/workspaceService");
const workspaceService = new WorkspaceService();

const postCreateWorkspace = async (req, res) => {
  console.log(req.body, req.params);
  const result = await workspaceService.saveWorkspace(
    req.params.username,
    req.body
  );
  if (result.savedWorkspace) res.status(200).json(result.savedWorkspace);
  else res.status(500).send(result.error);
};

module.exports = { postCreateWorkspace };
