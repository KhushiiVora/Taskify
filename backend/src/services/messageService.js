const Message = require("../models/message");
const ConversationService = require("../services/conversationService");
const conversationService = new ConversationService();

class MessageService {
  saveMessage = async (data) => {
    const newMessage = new Message(data);
    try {
      let { conversation } = await conversationService.findConversation(
        data.workspaceId,
        ""
      );

      if (!conversation) {
        const { savedConversation } =
          await conversationService.saveConversation({
            workspaceId: data.workspaceId,
          });

        if (savedConversation) conversation = savedConversation;
      }

      const savedMessage = await newMessage.save();

      conversation.messages.push(savedMessage._id);
      await conversation.save();

      return { savedMessage };
    } catch (error) {
      console.log("error in message service", error);
    }
  };
}

module.exports = MessageService;
