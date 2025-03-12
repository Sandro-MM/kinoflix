import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {VideoGridItem, VideoGridItemSkeleton} from '@app/titles/video-grid';
import React, {ReactNode} from 'react';
import {useWatchPageVideo} from '@app/videos/requests/use-watch-page-video';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {useIsStreamingMode} from '@app/videos/use-is-streaming-mode';
import {Video} from '@app/titles/models/video';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import clsx from 'clsx';

export function WatchPageAside() {
  const {data} = useWatchPageVideo();

  const content = !data ? (
    <m.div key="skeleton" {...opacityAnimation}>
      <VideoGridItemSkeleton className="mb-34" />
      <VideoGridItemSkeleton className="mb-34" />
      <VideoGridItemSkeleton className="mb-34" />
    </m.div>
  ) : (
    <m.div key="loaded" {...opacityAnimation}>
      {data.related_videos.map(video => (
        <RelatedVideo video={video} key={video.id} activeVideo={data.video} />
      ))}
    </m.div>
  );

  return (
    <aside className="w-350 flex-shrink-0 max-lg:mt-54">
      <SiteSectionHeading
        fontWeight="font-medium"
        fontSize="text-2xl"
        margin="mb-28"
      >
        <Header />
      </SiteSectionHeading>
      <AnimatePresence initial={false} mode="wait">
        {content}
      </AnimatePresence>
    </aside>
  );
}

function Header() {
  const {data} = useWatchPageVideo();
  const isStreamingMode = useIsStreamingMode();

  if (!data?.video) {
    return <div className="h-32" />;
  }

  return isStreamingMode ? (
    <Trans message="Related movies & series" />
  ) : (
    <Trans message="Related videos" />
  );
}

interface RelatedVideoProps {
  video: Video;
  activeVideo: Video;
}
function RelatedVideo({video, activeVideo}: RelatedVideoProps) {
  const isStreamingMode = useIsStreamingMode();

  let name: ReactNode = video.name;

  if (isStreamingMode) {
    if (video.episode) {
      name = (
        <span>
          {video.episode.name} (<CompactSeasonEpisode episode={video.episode} />
          )
        </span>
      );
    } else {
      name = video.title!.name;
    }
  }

  return (
    <VideoGridItem
      video={video}
      title={video.title}
      episode={video.episode}
      forceTitleBackdrop={isStreamingMode}
      className={clsx(
        'mb-24 text-sm',
        activeVideo.id === video.id && 'text-primary',
      )}
      showCategory={!isStreamingMode}
      name={name}
    />
  );
}
