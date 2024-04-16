const express = require("express");
const router = express.Router();

const {
  getTasks,
  postCreateTask,
  deleteTask,
  postEditState,
  patchEditTask,
  patchEditAllStates,
} = require("../controllers/task.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  leaderPrivilegeMiddleware,
} = require("../middlewares/leaderPrivilege.middlewares");
const {
  userPrivilegeMiddleware,
} = require("../middlewares/userPrivilege.middlewares");
const { taskValidationSchema } = require("../validators/task.validators");
const taskMiddleware = validateSchema(taskValidationSchema);

router.get("/:workspaceId/:categoryId/", userPrivilegeMiddleware, getTasks);
router.post(
  "/:workspaceId/:categoryId/create",
  userPrivilegeMiddleware,
  taskMiddleware,
  postCreateTask
);
router.delete(
  "/:workspaceId/delete/:categoryId/:taskId",
  leaderPrivilegeMiddleware,
  deleteTask
);

router.patch(
  "/:workspaceId/edit/:categoryId/allStates",
  userPrivilegeMiddleware,
  patchEditAllStates
);
router.post(
  "/:workspaceId/edit/:taskId/state",
  userPrivilegeMiddleware,
  postEditState
);
router.patch(
  "/:workspaceId/edit/:taskId/",
  userPrivilegeMiddleware,
  taskMiddleware,
  patchEditTask
);

module.exports = router;
