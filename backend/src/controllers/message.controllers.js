const MessageService = require("../services/messageService");
const ConversationService = require("../services/conversationService");
const messageService = new MessageService();
const conversationService = new ConversationService();
const { io } = require("../socket");

const postSaveMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { workspaceId } = req.params;
    const senderId = req.user._id;
    const data = { message, workspaceId, senderId };

    const { savedMessage } = await messageService.saveMessage(data);

    io.to(workspaceId).emit("newMessage", savedMessage);
    res.status(201).send(savedMessage);
  } catch (error) {
    console.log("Error in saveMessage controller: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const { conversation } = await conversationService.findConversation(
      workspaceId,
      "messages"
    );

    if (!conversation) return res.status(200).send([]);

    const messages = conversation.messages;

    res.status(200).send(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
module.exports = { postSaveMessage, getMessages };
