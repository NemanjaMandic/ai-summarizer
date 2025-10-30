import type { Message } from '../ChatMessages/ChatMessages';

export type ChatFormData = {
  prompt: string;
};

export type ChatFormProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsBotTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};
