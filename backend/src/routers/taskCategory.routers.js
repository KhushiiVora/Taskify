const express = require("express");
const router = express.Router();

const {
  getTaskCategories,
  postCreateTaskCatogory,
  patchEditCategoryName,
  deleteTaskCategory,
} = require("../controllers/taskCategory.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  userPrivilegeMiddleware,
} = require("../middlewares/userPrivilege.middlewares");
const {
  leaderPrivilegeMiddleware,
} = require("../middlewares/leaderPrivilege.middlewares");

const {
  taskCategoryValidationSchema,
} = require("../validators/task.validators");
const taskCategoryMiddleware = validateSchema(taskCategoryValidationSchema);

router.get("/:workspaceId/", userPrivilegeMiddleware, getTaskCategories);
router.post(
  "/:workspaceId/create",
  leaderPrivilegeMiddleware,
  taskCategoryMiddleware,
  postCreateTaskCatogory
);
router.patch(
  "/:workspaceId/edit/:categoryId/name",
  leaderPrivilegeMiddleware,
  taskCategoryMiddleware,
  patchEditCategoryName
);
router.delete(
  "/:workspaceId/delete/:categoryId",
  leaderPrivilegeMiddleware,
  deleteTaskCategory
);
module.exports = router;
