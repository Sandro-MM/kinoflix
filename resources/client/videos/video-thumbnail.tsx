import {Video} from '@app/titles/models/video';
import React, {ReactElement, useEffect, useState} from 'react';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {ImageSize} from '@app/images/use-image-src';
import {VideoPlayerSkeleton} from '@app/videos/video-player-skeleton';
import clsx from 'clsx';
import {loadYoutubePoster} from '@common/player/providers/youtube/load-youtube-poster';
import {youtubeIdFromSrc} from '@common/player/utils/youtube-id-from-src';

interface Props {
  video: Video;
  isLazy?: boolean;
  title?: Title;
  episode?: Episode;
  srcSize?: ImageSize;
  size?: string;
  fallback?: ReactElement;
  forceTitleBackdrop?: boolean;
}
export function VideoThumbnail({
  video,
  isLazy,
  title,
  episode,
  srcSize,
  size = 'w-full max-h-full',
  fallback,
  forceTitleBackdrop = false,
}: Props) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    video.thumbnail
  );

  useEffect(() => {
    if (
      !video.thumbnail &&
      !forceTitleBackdrop &&
      video.src.includes('youtube')
    ) {
      const youtubeId = youtubeIdFromSrc(video.src);
      if (youtubeId) {
        loadYoutubePoster(youtubeId).then(url => {
          if (url) {
            setThumbnailUrl(url);
          }
        });
      }
    }
  }, [video.src, video.thumbnail, forceTitleBackdrop]);

  if (forceTitleBackdrop || !thumbnailUrl) {
    if (title) {
      return (
        <TitleBackdropFallback
          title={title}
          episode={episode}
          srcSize={srcSize}
          size={size}
        />
      );
    }
    if (fallback) {
      return fallback;
    }
    return <VideoPlayerSkeleton animate={false} />;
  }

  return (
    <img
      loading={isLazy ? 'lazy' : undefined}
      decoding="async"
      src={thumbnailUrl}
      alt=""
      className={clsx(size, 'aspect-video flex-shrink-0 object-cover')}
    />
  );
}

interface TitleBackdropFallbackProps {
  title: Title;
  episode?: Episode;
  srcSize?: ImageSize;
  size?: string;
}
function TitleBackdropFallback({
  title,
  episode,
  srcSize,
  size,
}: TitleBackdropFallbackProps) {
  return (
    <TitleBackdrop
      title={title}
      episode={episode}
      srcSize={srcSize}
      size={size}
    />
  );
}
