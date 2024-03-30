const Conversation = require("../models/conversation");

class ConversationService {
  saveConversation = async (data) => {
    const conversation = new Conversation(data);
    try {
      const savedConversation = await conversation.save();
      return { savedConversation };
    } catch (error) {
      console.log("error in Conversation Service");
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
      console.log("error in find Conversation");
    }
  };
}

module.exports = ConversationService;
