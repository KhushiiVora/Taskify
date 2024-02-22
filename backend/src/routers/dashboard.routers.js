const express = require("express");
const router = express.Router();

const workspaceRouter = require("./workspace.routers");

router.use("/workspace", workspaceRouter);

module.exports = router;
