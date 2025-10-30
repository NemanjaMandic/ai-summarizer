import Skeleton from 'react-loading-skeleton';

export const ReviewSkeleton = () => {
  return (
    <div>
      <Skeleton width={'100%'} />
      <Skeleton width={'80%'} />
      <Skeleton width={'60%'} />
    </div>
  );
};
