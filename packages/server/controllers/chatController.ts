import type { Request, Response } from 'express';
import z from 'zod';
import { chatSchema } from '../constants';
import { chatService } from '../services/chat';

const sendMessage = async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json(z.treeifyError(parseResult.error));
  }

  try {
    const { prompt, conversationId } = req.body;
    const response = await chatService.sendMessage(prompt, conversationId);
    res.json({ message: response.message });
  } catch (error) {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Something went wrong';
    res.status(500).json({ error: errorMessage });
  }
};

export const chatController = {
  sendMessage,
};
