const express = require("express");
const router = express.Router();

const {
  postCreateWorkspace,
  postJoinWorkspace,
  getMembers,
  patchRemoveMember,
} = require("../controllers/workspace.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  userPrivilegeMiddleware,
} = require("../middlewares/userPrivilege.middlewares");
const {
  workspaceValidationSchema,
} = require("../validators/workspace.validators");

const workspaceMiddleware = validateSchema(workspaceValidationSchema);

router.post("/:username/create", workspaceMiddleware, postCreateWorkspace);
router.post("/:username/join", workspaceMiddleware, postJoinWorkspace);

router.get("/:workspaceId", userPrivilegeMiddleware, getMembers);
router.patch(
  "/:workspaceId/member/remove",
  userPrivilegeMiddleware,
  patchRemoveMember
);

module.exports = router;
