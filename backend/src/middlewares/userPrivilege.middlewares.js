const userPrivilegeMiddleware = (req, res, next) => {
  const { workspaceId } = req.params;
  const user = req.user;
  let isValidWorkspace = false;

  user.workspaces.forEach((workspace) => {
    if (workspaceId == workspace._id) {
      isValidWorkspace = true;
    }
  });

  if (!isValidWorkspace) {
    console.log("Your access is denied!!");
    return res.status(403).send("Access denied!! You've been removed.");
  }

  next();
};

module.exports = { userPrivilegeMiddleware };
