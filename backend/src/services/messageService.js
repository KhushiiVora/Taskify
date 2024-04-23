const Message = require("../models/message");
const ConversationService = require("../services/conversationService");
const conversationService = new ConversationService();

class MessageService {
  saveMessage = async (data) => {
    const newMessage = new Message(data);
    let { conversation, error: conversationError } =
      await conversationService.findConversation(data.workspaceId, "");

    if (conversationError) {
      return { error: conversationError };
    }
    try {
      if (!conversation) {
        const { savedConversation, error: saveConversationError } =
          await conversationService.saveConversation({
            workspaceId: data.workspaceId,
          });

        if (saveConversationError) {
          return { error: saveConversationError };
        }
        conversation = savedConversation;
      }

      const savedMessage = await newMessage.save();

      conversation.messages.push(savedMessage._id);
      await conversation.save();

      return { savedMessage };
    } catch (error) {
      console.log("Error in saveMessage service: ", error);
      return { error };
    }
  };
}

module.exports = MessageService;
