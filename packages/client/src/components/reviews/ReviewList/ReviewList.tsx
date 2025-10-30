import { HiSparkles } from 'react-icons/hi2';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { RenderSkeleton } from '../RenderSkeleton';
import { ReviewSkeleton } from '../ReviewSkeleton/ReviewSkeleton';
import { StarRating } from '../StarRating';
import { useReviewsApi } from '../api/useReviewsApi';
import { useSummarizeReviewsMutationApi } from '../api/useSummarizeReviewsMutationApi';

type ReviewListProps = { productId: number };

export const ReviewList = ({ productId }: ReviewListProps) => {
  const queryClient = useQueryClient();

  const { data: reviewData, isLoading, isError: isGetReviewsError } = useReviewsApi(productId);

  const {
    mutate,
    isPending,
    isError: isSummarizeError,
    data: summarizeData,
  } = useSummarizeReviewsMutationApi(productId, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews', productId] }),
  });

  if (!reviewData?.reviews.length) {
    return null;
  }

  console.log('isSummarizeError', isSummarizeError);
  console.log('summarizeData', summarizeData);
  return (
    <div>
      <div className="mb-5">
        {reviewData?.summary ? (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Review Summary</h3>
            <p>{reviewData.summary}</p>
          </div>
        ) : (
          <>
            <Button
              disabled={isLoading || isPending || !!reviewData?.summary}
              onClick={() => mutate({})}
              className="cursor-pointer"
            >
              <HiSparkles /> Summarize
            </Button>
          </>
        )}
        {isPending && (
          <div className="py-3 w-full">
            <ReviewSkeleton />
          </div>
        )}
        {isSummarizeError && (
          <div className="text-red-500 mt-2">Could not summarize reviews. Please try again.</div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {isLoading && <RenderSkeleton />}

        {isGetReviewsError && <div className="text-red-500">Could not fetch reviews.</div>}

        {reviewData && !isLoading && reviewData.reviews.length === 0 && (
          <div>No reviews available.</div>
        )}

        {reviewData?.reviews.map((review) => (
          <div key={review.id} className="border p-4 mb-4 rounded">
            <div className="font-semibold">{review.author}</div>
            <div className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <StarRating value={review.rating} />
            </div>
            <div className="py-2">{review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
