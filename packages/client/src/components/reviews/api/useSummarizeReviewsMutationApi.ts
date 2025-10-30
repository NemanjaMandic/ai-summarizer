import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSummarizeReviewsMutationApi = (
  productId: number,
  options?: Omit<UseMutationOptions<unknown, Error, unknown>, 'mutationFn'>,
) => {
  return useMutation({
    mutationFn: async () => {
      await axios.post(`/api/products/${productId}/reviews/summarize`);
    },
    ...options,
  });
};
