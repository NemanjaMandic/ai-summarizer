import dayjs from 'dayjs';
import { PrismaClient, type Review, type Summary } from '../generated/prisma';

const prisma = new PrismaClient();

const getReviews = async (productId: number, limit?: number): Promise<Review[]> => {
  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
};

const storeReviewSummary = async (productId: number, summary: string): Promise<Summary> => {
  const now = new Date();
  const expiresAt = dayjs(now).add(7, 'day').toDate();
  const storeData = {
    content: summary,
    productId: productId,
    createdAt: now,
    expiresAt: expiresAt,
  };

  return prisma.summary.upsert({
    where: { productId },
    create: storeData,
    update: storeData,
  });
};

const getReviewSummary = async (productId: number): Promise<string | null> => {
  const summary = await prisma.summary.findFirst({
    where: {
      AND: [{ productId }, { expiresAt: { gt: new Date() } }],
    },
    // where: { productId },
  });
  return summary ? summary.content : null;
};

export const reviewRepository = {
  getReviews,
  storeReviewSummary,
  getReviewSummary,
};
