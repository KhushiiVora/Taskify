const leaderPrivilegeMiddleware = (req, res, next) => {
  const { workspaceId } = req.params;
  const user = req.user;
  let isLeader = false;

  user.workspaces.forEach((workspace) => {
    if (workspaceId == workspace._id) {
      isLeader = workspace.leaders.includes(user._id);
    }
  });

  if (!isLeader) {
    return res.status(403).send("Access denied!! You're not a leader.");
  }

  next();
};

module.exports = { leaderPrivilegeMiddleware };
