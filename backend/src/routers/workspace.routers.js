const express = require("express");
const router = express.Router();

const {
  postCreateWorkspace,
  postJoinWorkspace,
  getMembers,
} = require("../controllers/workspace.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  workspaceValidationSchema,
} = require("../validators/workspace.validators");

const workspaceMiddleware = validateSchema(workspaceValidationSchema);

router.get("/:workspaceId", getMembers);
router.post("/:username/create", workspaceMiddleware, postCreateWorkspace);
router.post("/:username/join", workspaceMiddleware, postJoinWorkspace);

module.exports = router;
