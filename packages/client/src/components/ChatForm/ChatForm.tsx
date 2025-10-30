import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import norificationSound from '../../assets/sounds/notification.mp3';
import popSound from '../../assets/sounds/pop.mp3';
import type { ChatResponse } from '../ChatBot/types';
import { Button } from '../ui/button';
import type { ChatFormData, ChatFormProps } from './types';

export const ChatForm = ({ setMessages, setIsBotTyping, setError }: ChatFormProps) => {
  const conversationId = useRef(crypto.randomUUID());

  const popAudio = new Audio(popSound);
  popAudio.volume = 0.2;

  const notificationAudio = new Audio(norificationSound);
  notificationAudio.volume = 0.2;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChatFormData>();

  const onSubmit = async ({ prompt }: ChatFormData) => {
    setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
    setIsBotTyping(true);
    reset({ prompt: '' });
    popAudio.play();
    try {
      const { data } = await axios.post<ChatResponse>('/api/chat', {
        prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
      setError(null);
      notificationAudio.play();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        console.error('Error sending message:', error);
      } else if (error instanceof Error) {
        setError(error.message);
        console.error('Error sending message:', error);
      } else {
        setError('An unknown error occurred.');
        console.error('Error sending message:', error);
      }
    } finally {
      setIsBotTyping(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(onSubmit)();
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register('prompt', {
          maxLength: 1000,
          validate: (value) => value.trim().length > 0,
        })}
        autoFocus
        className="w-full border-0 focus:outline-none resize-none"
        placeholder="Ask anything"
        maxLength={1000}
      />
      <Button className="rounded-full" size="icon" disabled={!isValid}>
        <FaArrowUp />
      </Button>
    </form>
  );
};
