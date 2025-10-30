import { useState } from 'react';
import { ChatForm } from '../ChatForm/ChatForm';
import { ChatMessages } from '../ChatMessages';
import type { Message } from '../ChatMessages/ChatMessages';
import { TypingIndicator } from '../TypingIndicator';

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col  flex-1 gap-3 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      <ChatForm setMessages={setMessages} setIsBotTyping={setIsBotTyping} setError={setError} />
    </div>
  );
};
