import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const getProduct = async (productId: number) => {
  return prisma.product.findUnique({
    where: { id: productId },
  });
};

export const productRepository = { getProduct };
