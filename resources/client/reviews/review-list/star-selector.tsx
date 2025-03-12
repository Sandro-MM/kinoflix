import {useState} from 'react';
import {IconButton} from '@ui/buttons/icon-button';
import {StarIcon} from '@ui/icons/material/Star';
import {StarBorderIcon} from '@ui/icons/material/StarBorder';
import clsx from 'clsx';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';

interface Props {
  count: number;
  value: number;
  onValueChange?: (value: number) => void;
  className?: string;
  readonly?: boolean;
}
export function StarSelector({
  count,
  value,
  onValueChange,
  className,
  readonly,
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const [hoverRating, setHoverRating] = useState(value);
  const {trans} = useTrans();
  return (
    <div
      className={clsx('flex items-center', className)}
      onPointerLeave={() => {
        if (!readonly) {
          setHoverRating(value);
        }
      }}
    >
      {Array.from({length: count}).map((_, i) => {
        const number = i + 1;
        const isActive = hoverRating >= number;
        return (
          <IconButton
            key={i}
            size={isMobile ? 'xs' : 'sm'}
            aria-label={trans(
              message('Rate :count stars', {values: {count: number}}),
            )}
            iconSize="md"
            color={isActive ? 'primary' : undefined}
            disabled={readonly}
            onClick={() => {
              onValueChange?.(number);
            }}
            onPointerEnter={() => {
              setHoverRating(number);
            }}
          >
            {isActive ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        );
      })}
    </div>
  );
}
