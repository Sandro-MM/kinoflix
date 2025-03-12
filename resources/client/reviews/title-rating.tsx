import {StarIcon} from '@ui/icons/material/Star';
import clsx from 'clsx';

interface Props {
  score: number | null;
  className?: string;
}
export function TitleRating({score, className}: Props) {
  if (!score) return null;
  return (
    <div
      className={clsx(
        'flex flex-shrink-0 items-center gap-4 whitespace-nowrap',
        className,
      )}
    >
      <StarIcon className="text-primary" />
      <span>{score} / 10</span>
    </div>
  );
}
