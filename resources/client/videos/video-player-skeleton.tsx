import {Skeleton} from '@ui/skeleton/skeleton';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import React from 'react';

interface Props {
  animate?: boolean;
}
export function VideoPlayerSkeleton({animate}: Props) {
  return (
    <div className="relative">
      <Skeleton
        variant="rect"
        className="aspect-video"
        animation={animate ? 'pulsate' : null}
      />
      <MediaPlayIcon
        className="absolute inset-0 m-auto text-fg-base/40"
        size="w-80 h-80"
      />
    </div>
  );
}
