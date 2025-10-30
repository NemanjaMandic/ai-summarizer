import type { Request, Response } from 'express';
import { productRepository } from '../repositories/product';
import { reviewRepository } from '../repositories/review';
import { reviewService } from '../services/review';

const getReviews = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }
  const product = await productRepository.getProduct(productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  try {
    const reviews = await reviewRepository.getReviews(productId);
    const summary = await reviewRepository.getReviewSummary(productId);

    console.log('Fetched summary:', summary);
    res.json({
      summary,
      reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const summarizeReviews = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  const product = await productRepository.getProduct(productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  const reviews = await reviewRepository.getReviews(productId, 1);
  if (!reviews.length) {
    res.status(404).json({ error: 'No reviews found for this product' });
    return;
  }

  try {
    const summary = await reviewService.summarizeReviews(productId);
    res.json({ summary });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const reviewController = { getReviews, summarizeReviews };
