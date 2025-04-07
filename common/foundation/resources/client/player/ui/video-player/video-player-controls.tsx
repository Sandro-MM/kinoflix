import {usePlayerStore} from '@common/player/hooks/use-player-store';
import clsx from 'clsx';
import {Seekbar} from '@common/player/ui/controls/seeking/seekbar';
import {PlayButton} from '@common/player/ui/controls/play-button';
import {NextButton} from '@common/player/ui/controls/next-button';
import {
  ToggleMuteButton,
  VolumeControls,
} from '@common/player/ui/controls/volume-controls';
import {FormattedCurrentTime} from '@common/player/ui/controls/formatted-current-time';
import {FormattedPlayerDuration} from '@common/player/ui/controls/formatted-player-duration';
import {ToggleCaptionsButton} from '@common/player/ui/controls/toggle-captions-button';
import {PlaybackOptionsButton} from '@common/player/ui/controls/playback-options-button';
import {FullscreenButton} from '@common/player/ui/controls/fullscreen-button';
import {PipButton} from '@common/player/ui/controls/pip-button';
import React, {Fragment, ReactNode} from 'react';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {VideoControls} from '@app/live-tv/video-controls';
import {SkipButton} from '@app/live-tv/skip-button';

interface Props {
  rightActions?: ReactNode;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  isLiveTvControls?: boolean;
  setSelectedVideo?: (video: string) => void;
  streamink?: string;
}

export function VideoPlayerControls({
  rightActions,
  onPointerEnter,
  onPointerLeave,
  isLiveTvControls = false,
  setSelectedVideo,
  streamink
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const controlsVisible = usePlayerStore(s => s.controlsVisible);
  const className = clsx(
    'player-bottom-text-shadow absolute z-40 text-white/87 transition-opacity duration-300',
    controlsVisible ? 'opacity-100' : 'opacity-0',
  );

  const sharedProps = {
    rightActions,
    onPointerEnter,
    onPointerLeave,
    isLiveTvControls,
    className,
    setSelectedVideo,
    streamink
  };

  return isMobile ? (
    <MobileControls {...sharedProps} />
  ) : isLiveTvControls ? (
    <LiveControls {...sharedProps} />
  ) : (
    <DesktopControls {...sharedProps} />
  );
}

interface ResponsiveControlsProps extends Props {
  className: string;
}

function DesktopControls({
  onPointerEnter,
  onPointerLeave,
  rightActions,
  className,
}: ResponsiveControlsProps) {
  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={e => e.stopPropagation()}
      className={clsx('bottom-0 left-0 right-0 p-8', className)}
    >
      <Seekbar trackColor="bg-white/40" />
      <div className="flex w-full items-center gap-4">
        <PlayButton color="white" />
        <NextButton color="white" />
        <VolumeControls
          className="max-md:hidden"
          fillColor="bg-white"
          trackColor="bg-white/20"
          buttonColor="white"
        />
        <span className="ml-10 text-sm">
          <FormattedCurrentTime className="min-w-40 text-right" /> /{' '}
          <FormattedPlayerDuration className="min-w-40 text-right" />
        </span>
        <div className="ml-auto flex flex-shrink-0 items-center gap-4">
          {rightActions}
          <ToggleCaptionsButton color="white" />
          <PlaybackOptionsButton color="white" />
          <FullscreenButton className="ml-auto" color="white" />
          <PipButton color="white" />
        </div>
      </div>
    </div>
  );
}

function MobileControls({
  rightActions,
  onPointerEnter,
  onPointerLeave,
  className,
}: ResponsiveControlsProps) {
  return (
    <Fragment>
      <div
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={e => e.stopPropagation()}
        className={clsx('left-0 right-0 top-0 px-6 pt-6 ', className)}
      >
        <div className="flex items-end justify-end">
          {rightActions}
          <ToggleCaptionsButton color="white" />
          <PlaybackOptionsButton color="white" />
          <PipButton color="white" />
          <ToggleMuteButton color="white" size="md" />
        </div>
      </div>
      <div
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={e => e.stopPropagation()}
        className={clsx('bottom-0 left-0 right-0 px-12', className)}
      >
        <div className="flex items-end gap-24">
          <div className="text-sm">
            <FormattedCurrentTime className="min-w-40 text-right" /> /{' '}
            <FormattedPlayerDuration className="min-w-40 text-right" />
          </div>
          <FullscreenButton
            size="sm"
            iconSize="lg"
            color="white"
            className="ml-auto"
          />
        </div>
        <Seekbar trackColor="bg-white/40" />
      </div>
    </Fragment>
  );
}

function LiveControls({
  onPointerEnter,
  onPointerLeave,
  rightActions,
  className,
  setSelectedVideo,
  streamink
}: ResponsiveControlsProps) {
  return (
    <div className={'relative'}>
      <div
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={e => e.stopPropagation()}
        className={clsx('bottom-0 left-0 right-0 p-8', className)}
      >
        <Seekbar trackColor="bg-white/40" />

        <div className="flex w-full items-center gap-4">
          <div className="ml-auto flex flex-shrink-0 items-center gap-4">
            {rightActions}

            <VolumeControls
              className="max-md:hidden"
              fillColor="bg-white"
              trackColor="bg-white/20"
              buttonColor="white"
            />
            <FullscreenButton className="ml-auto" color="white" />
            <PipButton color="white" />
          </div>
        </div>
      </div>

      <div className={'absolute bottom-0 h-max w-full'}>
        <VideoControls
          backward30={<SkipButton seconds={30} direction={'backward'} />}
          forward30={<SkipButton seconds={30} direction={'forward'} />}
          playButton={<PlayButton color="white" />}
          forward1={<SkipButton seconds={60} direction={'forward'} />}
          backward1={<SkipButton seconds={60} direction={'backward'} />}
          forward5={<SkipButton seconds={300} direction={'forward'} />}
          backward5={<SkipButton seconds={300} direction={'backward'} />}
          setSelectedVideo={setSelectedVideo}
          streamink={streamink}
        />
      </div>
    </div>
  );
}
