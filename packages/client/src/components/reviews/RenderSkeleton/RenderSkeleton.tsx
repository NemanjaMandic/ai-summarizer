import Skeleton from 'react-loading-skeleton';

export const RenderSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 align-start">
      {[1, 2, 3].map((n) => (
        <div key={n}>
          <Skeleton width={'20%'} />
          <Skeleton width={'60%'} />
          <Skeleton width={'100%'} />
        </div>
      ))}
    </div>
  );
};
