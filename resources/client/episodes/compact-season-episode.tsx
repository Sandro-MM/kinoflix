import {Episode} from '@app/titles/models/episode';
import {Trans} from '@ui/i18n/trans';

interface Props {
  episode?: Episode;
  seasonNum?: number;
  episodeNum?: number;
  className?: string;
}
export function CompactSeasonEpisode({
  episode,
  seasonNum,
  episodeNum,
  className,
}: Props) {
  if (!seasonNum && episode) {
    seasonNum = episode.season_number;
  }
  if (!episodeNum && episode) {
    episodeNum = episode.episode_number;
  }

  if (seasonNum && episodeNum) {
    return (
      <span className={className}>
        <Trans
          message="s:seasone:episode"
          values={{
            season: prefixWithZero(seasonNum),
            episode: prefixWithZero(episodeNum),
          }}
        />
      </span>
    );
  }

  if (seasonNum) {
    return (
      <span className={className}>
        <Trans
          message="s:season"
          values={{
            season: prefixWithZero(seasonNum),
          }}
        />
      </span>
    );
  }

  if (episodeNum) {
    return (
      <span className={className}>
        <Trans
          message="e:episode"
          values={{
            episode: prefixWithZero(episodeNum),
          }}
        />
      </span>
    );
  }

  return null;
}

function prefixWithZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
