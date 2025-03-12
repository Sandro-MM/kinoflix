import {UseWatchPageVideoResponse} from '@app/videos/requests/use-watch-page-video';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Button} from '@ui/buttons/button';
import {Link, useParams} from 'react-router';
import {AnimatePresence, m} from 'framer-motion';
import {Skeleton} from '@ui/skeleton/skeleton';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import clsx from 'clsx';
import {Video} from '@app/titles/models/video';
import {useSettings} from '@ui/settings/use-settings';
import React, {Fragment} from 'react';
import {EpisodeSelector} from '@app/videos/watch-page/episode-selector';
import {MediaEpisodesIcon} from '@ui/icons/media/media-episodes';
import {Trans} from '@ui/i18n/trans';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';

const className = 'flex items-center flex-wrap gap-14';

interface Props {
  data: UseWatchPageVideoResponse | undefined;
}
export function WatchPageAlternativeVideos({data}: Props) {
  const navigate = useNavigate();
  const {streaming} = useSettings();
  const title = data?.title;
  const episode = data?.episode;
  const video = data?.video;

  const showEpisodeSelector =
    title &&
    episode &&
    video &&
    (video.type === 'embed' || video.type === 'external');

  if (!showEpisodeSelector && !streaming.show_video_selector) {
    return null;
  }

  return (
    <div className="mt-14 flex items-start justify-between gap-48">
      {streaming.show_video_selector && (
        <Fragment>
          <VideoDropdown
            className="lg:hidden"
            videos={data?.alternative_videos || []}
          />
          <div className="max-lg:hidden">
            <AnimatePresence initial={false} mode="wait">
              {data ? (
                <VideoList videos={data.alternative_videos} />
              ) : (
                <Skeletons />
              )}
            </AnimatePresence>
          </div>
        </Fragment>
      )}
      {showEpisodeSelector && (
        <EpisodeSelector
          title={title}
          currentEpisode={episode}
          onSelected={episode => {
            navigate(getWatchLink(episode.primary_video));
          }}
          trigger={
            <Button
              variant="outline"
              className="min-h-40"
              startIcon={<MediaEpisodesIcon />}
            >
              <Trans message="All episodes" />
            </Button>
          }
        />
      )}
    </div>
  );
}

interface VideoDropdownProps {
  videos: Video[];
  className?: string;
}
function VideoDropdown({videos, className}: VideoDropdownProps) {
  const navigate = useNavigate();
  return (
    <MenuTrigger>
      <Button
        variant="outline"
        className={clsx('min-h-40', className)}
        startIcon={<MediaPlayIcon />}
      >
        <Trans message="Other sources" />
      </Button>
      <Menu>
        {videos.map(video => (
          <MenuItem
            value={video.id}
            key={video.id}
            startIcon={<MediaPlayIcon />}
            endSection={<QualityBadge video={video} />}
            onSelected={() => navigate(getWatchLink(video))}
          >
            {video.name}
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}

interface VideoListProps {
  videos: Video[];
}
function VideoList({videos}: VideoListProps) {
  const {videoId} = useParams();

  if (videos.length < 2) {
    return null;
  }

  return (
    <m.div
      key="alternative-sources"
      className={className}
      {...opacityAnimation}
    >
      {videos.map(video => (
        <Button
          elementType={Link}
          to={getWatchLink(video)}
          key={video.id}
          variant="outline"
          color={videoId === `${video.id}` ? 'primary' : 'chip'}
          startIcon={<MediaPlayIcon aria-hidden />}
          className="min-h-40 gap-10"
        >
          {video.name}
          <QualityBadge video={video} />
        </Button>
      ))}
    </m.div>
  );
}

interface QualityBadgeProps {
  video: Video;
}
function QualityBadge({video}: QualityBadgeProps) {
  if (!video.quality || video.quality === 'default') {
    return null;
  }
  return (
    <span className="rounded border px-6 text-xs font-bold uppercase">
      {video.quality}
    </span>
  );
}

function Skeletons() {
  return (
    <m.div
      key="skeletons"
      className={clsx(className, 'h-40')}
      {...opacityAnimation}
    >
      <Skeleton variant="rect" size="h-full w-[116px]" />
      <Skeleton variant="rect" size="h-full w-[116px]" />
      <Skeleton variant="rect" size="h-full w-[116px]" />
      <Skeleton variant="rect" size="h-full w-[116px]" />
      <Skeleton variant="rect" size="h-full w-[116px]" />
    </m.div>
  );
}
