import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {EpisodeLink} from '@app/episodes/episode-link';
import {InteractableRating} from '@app/reviews/interactable-rating';
import React, {ReactNode} from 'react';
import {Episode} from '@app/titles/models/episode';
import {Title} from '@app/titles/models/title';
import {TitleRating} from '@app/reviews/title-rating';
import clsx from 'clsx';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';

interface Props {
  episode: Episode;
  title: Title;
  allowRating?: boolean;
  className?: string;
  children?: ReactNode;
  showPlayButton?: boolean;
  centerPlayButton?: boolean;
}
export function EpisodeListItem({
  episode,
  title,
  allowRating = true,
  className,
  children,
  showPlayButton,
}: Props) {
  return (
    <div className={clsx('flex items-center gap-20', className)}>
      <div className="relative w-288 flex-shrink-0 overflow-hidden rounded max-md:hidden">
        <EpisodePoster
          title={title}
          episode={episode}
          seasonNumber={episode.season_number}
          lazy={true}
          srcSize="md"
          showPlayButton={showPlayButton}
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-6 text-center text-sm text-white">
          <CompactSeasonEpisode episode={episode} />
        </div>
      </div>
      <div className="flex-auto">
        <EpisodeLink
          title={title}
          seasonNumber={episode.season_number}
          episode={episode}
          color="primary"
          className="text-base font-semibold"
        />
        <div className="mt-4 text-xs text-muted">
          <FormattedDate
            date={episode.release_date}
            preset="long"
            timezone="utc"
          />
        </div>
        <div className="my-12">
          <EpisodeRating
            title={title}
            episode={episode}
            allowRating={allowRating}
          />
        </div>
        <div className="text-sm">
          {episode.description || (
            <span className="italic">
              <Trans message="We have no overview for this episode yet." />
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

interface EpisodeRatingProps {
  title: Title;
  episode: Episode;
  allowRating: boolean;
}
function EpisodeRating({title, episode, allowRating}: EpisodeRatingProps) {
  if (episode.status === 'upcoming') {
    return null;
  }

  return allowRating ? (
    <InteractableRating title={title} episode={episode} />
  ) : (
    <TitleRating score={episode.rating} />
  );
}
