const express = require("express");
const { getMembers } = require("../controllers/workspace.controllers");
const {
  postSaveMessage,
  getMessages,
} = require("../controllers/message.controllers");

const router = express.Router();

router.get("/:workspaceId/members", getMembers);
router.get("/:workspaceId/messages", getMessages);

router.post("/:workspaceId/messages/save", postSaveMessage);

module.exports = router;
