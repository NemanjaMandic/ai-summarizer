import { readFileSync } from 'fs';
import path from 'path';
import { llmClient } from '../llm/client';
import template from '../llm/prompts/chat.txt';
import { conversationRepository } from '../repositories/conversation';

const parkInfo = readFileSync(
  path.join(__dirname, '..', '/llm/prompts', 'WonderWorld.md'),
  'utf-8',
);

const instructions = template.replace('{{reviews}}', parkInfo);

type ChatResponse = {
  id: string;
  message: string;
};

const sendMessage = async (prompt: string, conversationId: string): Promise<ChatResponse> => {
  const response = await llmClient.generateText({
    model: 'gpt-4o-mini',
    instructions,
    prompt: prompt,
    temperature: 0.2,
    maxTokens: 100,
    previousResponseId: conversationRepository.getLastResponseId(conversationId),
  });

  conversationRepository.setLastResponseId(conversationId, response.id);

  return {
    id: response.id,
    message: response.text,
  };
};

export const chatService = {
  sendMessage,
};
