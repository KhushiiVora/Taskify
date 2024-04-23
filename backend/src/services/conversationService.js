const Conversation = require("../models/conversation");

class ConversationService {
  saveConversation = async (data) => {
    const conversation = new Conversation(data);
    try {
      const savedConversation = await conversation.save();
      return { savedConversation };
    } catch (error) {
      console.log("error in Conversation Service", error);
      return { error };
    }
  };
  findConversation = async (workspaceId, populateWith) => {
    let conversation = null;
    try {
      if (populateWith)
        conversation = await Conversation.findOne({ workspaceId }).populate(
          populateWith
        );
      else conversation = await Conversation.findOne({ workspaceId });

      return { conversation };
    } catch (error) {
      console.log("Error in find Conversation", error);
      return { error };
    }
  };
}

module.exports = ConversationService;
