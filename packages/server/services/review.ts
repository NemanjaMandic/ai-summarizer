import { llmClient } from '../llm/client';
import { reviewRepository } from '../repositories/review';

const summarizeReviews = async (productId: number): Promise<string> => {
  const existingSummary = await reviewRepository.getReviewSummary(productId);

  if (existingSummary) {
    return existingSummary;
  }
  //get last 10 reviews for the product
  const reviews = await reviewRepository.getReviews(productId, 10);

  const reviewContents = reviews.map((review) => review.content).join('\n\n');

  // const summaryPrompt = template.replace('{{reviews}}', reviewContents);

  const summary = await llmClient.summarizeReviews(reviewContents);

  await reviewRepository.storeReviewSummary(productId, summary);
  return summary;
};
export const reviewService = {
  summarizeReviews,
};
