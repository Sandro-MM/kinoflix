import {Title} from '@app/titles/models/title';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Button} from '@ui/buttons/button';
import {StarBorderIcon} from '@ui/icons/material/StarBorder';
import {Trans} from '@ui/i18n/trans';
import {RatingDialog} from '@app/reviews/rating-dialog';
import {Episode} from '@app/titles/models/episode';
import clsx from 'clsx';
import {TitleRating} from '@app/reviews/title-rating';
import {useCurrentUserRatingFor} from '@app/reviews/requests/use-current-user-ratings';
import {Skeleton} from '@ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {ReactElement} from 'react';
import {useAuthClickCapture} from '@app/use-auth-click-capture';

interface Props {
  title: Title;
  episode?: Episode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function InteractableRating({
  title,
  episode,
  size = 'md',
  className,
}: Props) {
  const isUpcoming = episode
    ? episode.status === 'upcoming'
    : title.status === 'upcoming';
  const score = (episode || title).rating;

  if (isUpcoming) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex min-w-[243px] flex-shrink-0 items-center',
        getSizeClassName(size),
        className,
      )}
    >
      {score ? (
        <div className="border-r pr-14">
          <TitleRating score={score} />
        </div>
      ) : null}
      <RateButton title={title} episode={episode} />
    </div>
  );
}

function RateButton({title, episode}: Props) {
  const item = episode || title;
  const {isLoading, rating} = useCurrentUserRatingFor(item);
  const authHandler = useAuthClickCapture();

  let content: ReactElement;

  if (isLoading) {
    content = (
      <m.div
        key="skeleton"
        {...opacityAnimation}
        className="flex min-h-36 items-center"
      >
        <Skeleton variant="rect" size="w-[106px] h-16 ml-14" />
      </m.div>
    );
  } else {
    content = (
      <m.div key="button" {...opacityAnimation}>
        <DialogTrigger type="modal">
          {rating ? (
            <Button onClickCapture={authHandler}>
              <Trans
                message="Your rating: :value / 10"
                values={{value: rating.score}}
              />
            </Button>
          ) : (
            <Button
              onClickCapture={authHandler}
              startIcon={<StarBorderIcon />}
              className="min-w-120"
            >
              <Trans message="Rate this" />
            </Button>
          )}
          <RatingDialog
            title={title}
            episode={episode}
            initialRating={rating}
          />
        </DialogTrigger>
      </m.div>
    );
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {content}
    </AnimatePresence>
  );
}

function getSizeClassName(size: Props['size']) {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
  }
}
