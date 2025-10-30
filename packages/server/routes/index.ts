import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from '../controllers/chatController';
import { reviewController } from '../controllers/reviewController';
import { PrismaClient } from '../generated/prisma';

const router = express.Router();

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post('/api/products/:id/reviews/summarize', reviewController.summarizeReviews);

// router.get('/api/products');

// router.get('/api/products');

export default router;
