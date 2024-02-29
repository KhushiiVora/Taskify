const express = require("express");
const router = express.Router();

const workspaceRouter = require("./workspace.routers");
const taskCategoryRouter = require("./taskCategory.routers");

router.use("/workspace", workspaceRouter);
router.use("/taskCategories", taskCategoryRouter);

module.exports = router;
