import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa6';

type StarRatingProps = {
  value: number;
  outOf?: number;
};

export const StarRating = ({ value }: StarRatingProps) => {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1 text-yellow-500">
      {placeholders.map((p) => (p <= value ? <FaStar key={p} /> : <FaRegStar key={p} />))}
    </div>
  );
};
