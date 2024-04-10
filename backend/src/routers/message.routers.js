const express = require("express");
const { getMembers } = require("../controllers/workspace.controllers");
const {
  postSaveMessage,
  getMessages,
} = require("../controllers/message.controllers");
const {
  userPrivilegeMiddleware,
} = require("../middlewares/userPrivilege.middlewares");
const router = express.Router();

router.get("/:workspaceId/members", userPrivilegeMiddleware, getMembers);
router.get("/:workspaceId/messages", userPrivilegeMiddleware, getMessages);

router.post(
  "/:workspaceId/messages/save",
  userPrivilegeMiddleware,
  postSaveMessage
);

module.exports = router;
