import {Video} from '@app/titles/models/video';
import {PlayCircleIcon} from '@ui/icons/material/PlayCircle';
import {ReactNode} from 'react';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Skeleton} from '@ui/skeleton/skeleton';
import clsx from 'clsx';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {VideoThumbnail} from '@app/videos/video-thumbnail';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';

interface Props {
  videos?: Video[];
  heading?: ReactNode;
  count?: number;
  title?: Title;
  episode?: Episode;
}
export function VideoGrid({videos, heading, count, title, episode}: Props) {
  const isMobile = useIsMobileMediaQuery();
  if (!videos?.length) return null;

  if (!count) {
    count = isMobile ? 4 : 3;
  }

  return (
    <div className="mt-48">
      {heading}
      <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-24">
        {videos.slice(0, count).map(video => (
          <VideoGridItem
            key={video.id}
            video={video}
            title={title}
            episode={episode}
          />
        ))}
      </div>
    </div>
  );
}

interface VideoGridItemProps {
  video: Video;
  className?: string;
  title?: Title;
  episode?: Episode;
  name?: ReactNode;
  showCategory?: boolean;
  forceTitleBackdrop?: boolean;
}
export function VideoGridItem({
  video,
  className,
  title,
  episode,
  name,
  showCategory = true,
  forceTitleBackdrop = false,
}: VideoGridItemProps) {
  const link = getWatchLink(video);
  return (
    <div key={video.id} className={className}>
      <Link to={link} className="relative isolate block">
        <VideoThumbnail
          video={video}
          title={title}
          episode={episode}
          srcSize="lg"
          forceTitleBackdrop={forceTitleBackdrop}
        />
        <VideoGridItemBottomGradient />
        <span className="absolute bottom-0 left-0 z-30 flex items-center gap-x-6 p-10 text-white">
          <PlayCircleIcon size={showCategory ? 'md' : 'lg'} />
          {showCategory && <span className="capitalize">{video.category}</span>}
        </span>
      </Link>
      <Link to={link} className="mt-12 block hover:underline">
        {name || video.name}
      </Link>
    </div>
  );
}

interface VideoGridItemSkeletonProps {
  className?: string;
}
export function VideoGridItemSkeleton({className}: VideoGridItemSkeletonProps) {
  return (
    <div className={clsx(className, 'h-[228px]')}>
      <Skeleton variant="rect" size="w-full aspect-video" animation="pulsate" />
      <Skeleton variant="text" size="w-3/4 mt-12 h-20" />
    </div>
  );
}

export function VideoGridItemBottomGradient() {
  return (
    <div className="pointer-events-none absolute bottom-0 z-20 h-full w-full bg-gradient-to-t from-black to-40%" />
  );
}
