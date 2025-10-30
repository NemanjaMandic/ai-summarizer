const conversations = new Map<string, string>();

export const getLastResponseId = (conversationId: string) => {
  return conversations.get(conversationId);
};

export const setLastResponseId = (conversationId: string, responseId: string) => {
  conversations.set(conversationId, responseId);
};

export const clearConversations = () => {
  conversations.clear();
};

export const conversationRepository = {
  getLastResponseId,
  setLastResponseId,
  clearConversations,
};
