const express = require("express");
const router = express.Router();

const {
  getTaskCategories,
  postCreateTaskCatogory,
} = require("../controllers/taskCategory.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  userPrivilegeMiddleware,
} = require("../middlewares/userPrivilege.middlewares");

const {
  taskCategoryValidationSchema,
} = require("../validators/task.validators");
const taskCategoryMiddleware = validateSchema(taskCategoryValidationSchema);

router.get("/:workspaceId/", userPrivilegeMiddleware, getTaskCategories);
router.post(
  "/:workspaceId/create",
  userPrivilegeMiddleware,
  taskCategoryMiddleware,
  postCreateTaskCatogory
);

module.exports = router;
