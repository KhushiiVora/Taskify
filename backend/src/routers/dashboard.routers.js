const express = require("express");
const router = express.Router();

const workspaceRouter = require("./workspace.routers");
const taskCategoryRouter = require("./taskCategory.routers");
const taskRouter = require("./task.routers");

router.use("/workspace", workspaceRouter);
router.use("/members", workspaceRouter);
router.use("/taskCategories", taskCategoryRouter);
router.use("/tasks", taskRouter);

module.exports = router;
