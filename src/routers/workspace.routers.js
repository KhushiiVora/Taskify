const express = require("express");
const router = express.Router();

const { postCreateWorkspace } = require("../controllers/workspace.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  workspaceValidationSchema,
} = require("../validators/workspace.validators");

const workspaceMiddleware = validateSchema(workspaceValidationSchema);

router.post("/:username/create", workspaceMiddleware, postCreateWorkspace);

module.exports = router;
