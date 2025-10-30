import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

type GetReviewsResponse = {
  summary: string | null;
  reviews: Review[];
};

type SegmentMetadataOptions = Omit<UseQueryOptions<GetReviewsResponse>, 'queryKey' | 'queryFn'>;

export const useReviewsApi = (productId: number, options?: SegmentMetadataOptions) => {
  return useQuery<GetReviewsResponse>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data } = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
      return data;
    },
    ...options,
  });
};
