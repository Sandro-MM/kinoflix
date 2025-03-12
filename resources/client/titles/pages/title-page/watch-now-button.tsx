import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {Trans} from '@ui/i18n/trans';
import {Button, ButtonProps} from '@ui/buttons/button';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Video} from '@app/titles/models/video';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';

interface Props {
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  size?: string;
  video: Video;
  defaultLabel?: boolean;
}
export function WatchNowButton({
  video,
  variant = 'outline',
  color = 'primary',
  size = 'w-full min-h-40 mt-14',
  defaultLabel,
}: Props) {
  const label =
    video.episode_num && !defaultLabel ? (
      <span className="inline-flex gap-4">
        <Trans message="Start watching" />
        <CompactSeasonEpisode
          seasonNum={video.season_num}
          episodeNum={video.episode_num}
        />
      </span>
    ) : (
      <Trans message="Watch now" />
    );

  return (
    <Button
      to={getWatchLink(video)}
      elementType={Link}
      startIcon={<MediaPlayIcon />}
      color={color}
      variant={variant}
      className={size}
    >
      {label}
    </Button>
  );
}
