import {Title} from '@app/titles/models/title';
import {Episode, EPISODE_MODEL} from '@app/titles/models/episode';
import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {Trans} from '@ui/i18n/trans';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {useState} from 'react';
import {Button} from '@ui/buttons/button';
import {useCreateReview} from '@app/reviews/requests/use-create-review';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {useDeleteReviews} from '@app/reviews/requests/use-delete-reviews';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {TitleLink} from '@app/titles/title-link';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {StarSelector} from '@app/reviews/review-list/star-selector';

interface Props {
  title: Title;
  episode?: Episode;
  initialRating?: {id: number; score: number};
}
export function RatingDialog({title, episode, initialRating}: Props) {
  const item = episode || title;
  const createReview = useCreateReview();
  const deleteReview = useDeleteReviews();
  const {close} = useDialogContext();
  const [currentRating, setCurrentRating] = useState(initialRating?.score || 0);

  const handleCreateReview = () => {
    if (currentRating) {
      createReview.mutate(
        {reviewable: item, score: currentRating},
        {
          onSuccess: () => close(),
        },
      );
    }
  };

  const handleDeleteReview = () => {
    if (initialRating) {
      deleteReview.mutate(
        {reviewIds: [initialRating.id]},
        {
          onSuccess: () => close(),
        },
      );
    }
  };

  return (
    <Dialog size="w-auto">
      <DialogHeader>
        <DialogTitle item={item} />
      </DialogHeader>
      <DialogBody>
        {item.model_type === EPISODE_MODEL ? (
          <EpisodeDetails title={title} episode={episode!} />
        ) : (
          <TitleDetails title={title} />
        )}
        <div className="pb-16">
          <StarSelector
            count={10}
            value={currentRating}
            onValueChange={setCurrentRating}
            className="my-14"
          />
          <Button
            variant="flat"
            color="primary"
            className="w-full"
            disabled={!currentRating || createReview.isPending}
            onClick={handleCreateReview}
          >
            <Trans message="Rate" />
          </Button>
          {initialRating && (
            <Button
              className="mt-14 w-full"
              disabled={deleteReview.isPending}
              onClick={handleDeleteReview}
            >
              <Trans message="Remove rating" />
            </Button>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
}

interface TitleDetailsProps {
  title: Title;
}
function TitleDetails({title}: TitleDetailsProps) {
  return (
    <div className="mb-24 flex items-center gap-12">
      <TitlePoster size="w-60" srcSize="sm" title={title} />
      <div className="text-sm">
        <div>{title.name}</div>
        <div>{title.year}</div>
      </div>
    </div>
  );
}

interface EpisodeDetailsProps {
  title: Title;
  episode: Episode;
}
function EpisodeDetails({title, episode}: EpisodeDetailsProps) {
  return (
    <div className="mb-24 flex items-center gap-12">
      <EpisodePoster size="w-100" title={title} episode={episode} />
      <div className="text-base">
        <TitleLink title={title} color="primary" />
        <div className="text-sm">
          {episode.name} (<CompactSeasonEpisode episode={episode} />)
        </div>
      </div>
    </div>
  );
}

interface DialogTitleProps {
  item: Title | Episode;
}
function DialogTitle({item}: DialogTitleProps) {
  if (item.model_type === EPISODE_MODEL) {
    return <Trans message="Rate this episode" />;
  } else if (item.is_series) {
    return <Trans message="Rate this series" />;
  } else {
    return <Trans message="Rate this movie" />;
  }
}
