import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
  content: string;
  role: 'user' | 'bot';
};

type MessagesProps = {
  messages: Message[];
};
export const ChatMessages = ({ messages }: MessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopy = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection: string = window.getSelection()?.toString().trim() || '';
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-1 max-w-md rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end rounded-xl w-fit' : 'bg-gray-100 text-black self-start rounded-xl w-fit'}`}
          onCopy={handleCopy}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </>
  );
};
