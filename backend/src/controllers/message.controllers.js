const MessageService = require("../services/messageService");
const ConversationService = require("../services/conversationService");
const ErrorService = require("../services/errorService");

const messageService = new MessageService();
const conversationService = new ConversationService();
const errorService = new ErrorService();

const { io } = require("../socket");

const postSaveMessage = async (req, res) => {
  const { message } = req.body;
  const { workspaceId } = req.params;
  const senderId = req.user._id;
  const data = { message, workspaceId, senderId };

  const result = await messageService.saveMessage(data);

  if (result.savedMessage) {
    io.to(workspaceId).emit("newMessage", result.savedMessage);
    res.status(201).send(result.savedMessage);
  } else {
    console.log("Error in postSaveMessage controller: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
};

const getMessages = async (req, res) => {
  const { workspaceId } = req.params;
  const result = await conversationService.findConversation(
    workspaceId,
    "messages"
  );

  if (result.error) {
    console.log("Error in getMessages controller: ", result.error);
    const error = errorService.handleError(result.error);
    return res.status(error.status).send(error.message);
  }

  if (!result.conversation) {
    return res.status(200).send([]);
  }
  const messages = result.conversation.messages;
  return res.status(200).send(messages);
};
module.exports = { postSaveMessage, getMessages };
