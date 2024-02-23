const WorkspaceService = require("../services/workspaceService");
const ErrorService = require("../services/errorService");

const workspaceService = new WorkspaceService();
const errorService = new ErrorService();

const postCreateWorkspace = async (req, res) => {
  const result = await workspaceService.saveWorkspace(
    req.params.username,
    req.body
  );
  if (result.savedWorkspace && result.updatedUser)
    res.status(200).send({
      savedWorkspace: result.savedWorkspace,
      updatedUser: result.updatedUser,
    });
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
  if (result.updatedWorkspace && result.updatedUser)
    res.status(200).send({
      updatedWorkspace: result.updatedWorkspace,
      updatedUser: result.updatedUser,
    });
  else {
    console.log(result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

module.exports = { postCreateWorkspace, postJoinWorkspace };
