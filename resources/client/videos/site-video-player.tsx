import {guessPlayerProvider} from '@common/player/utils/guess-player-provider';
import {VideoPlayer} from '@common/player/ui/video-player/video-player';
import {VideoThumbnail} from '@app/videos/video-thumbnail';
import {IconButton} from '@ui/buttons/icon-button';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Video} from '@app/titles/models/video';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {VideoPlayerSkeleton} from '@app/videos/video-player-skeleton';
import {MediaItem} from '@common/player/media-item';
import {useLogVideoPlay} from '@app/videos/requests/use-log-video-play';
import {PlayerActions} from '@common/player/hooks/use-player-actions';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {isSameMedia} from '@common/player/utils/is-same-media';
import {Trans} from '@ui/i18n/trans';
import {EpisodeSelector} from '@app/videos/watch-page/episode-selector';
import {VASTClient, VASTTracker} from '@dailymotion/vast-client';

interface Props {
  video: Video;
  relatedVideos?: Video[];
  autoPlay?: boolean;
  title?: Title;
  episode?: Episode;
  mediaItemId?: string;
  logPlays?: boolean;
  showEpisodeSelector?: boolean;
  enableControls?: boolean;
  vastUrl?: string;
  isLiveTvControls?: boolean;
  setSelectedVideo?: (video: string) => void;
  streamink?: string;
}
export const SiteVideoPlayer = memo((props: Props) => {
  const {video, autoPlay, title, episode, vastUrl,isLiveTvControls} = props;
  if (
    video.type === 'video' ||
    video.type === 'stream' ||
    (video.type === 'embed' && video.src.includes('youtube'))
  ) {
    return <NativeVideoPlayer {...props} />;
  }

  if (video.type === 'embed') {
    return <EmbedPlayer src={video.src} autoPlay={autoPlay} />;
  }

  if (video.type === 'external') {
    return (
      <div className="relative">
        <VideoThumbnail
          title={title}
          episode={episode}
          video={video}
          fallback={<div className="aspect-video w-full bg-fg-base/4" />}
        />
        <div
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          onClick={() => window.open(video.src, '_blank')}
        >
          <IconButton variant="flat" color="primary" size="lg">
            <MediaPlayIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  return <VideoPlayerSkeleton />;
});

interface EmberPlayerProps {
  src: string;
  autoPlay?: boolean;
}

const EmbedPlayer = memo(({src, autoPlay}: EmberPlayerProps) => {
  let finalSrc = '';
  try {
    const url = src.includes('<iframe') ? src.match(/src="([^"]*)"/)?.[1] : src;
    const parsed = new URL(url || '');
    parsed.searchParams.set('autoplay', autoPlay ? '1' : '0');
    finalSrc = parsed.toString();
  } catch {}

  if (!finalSrc) {
    return (
      <div className="flex aspect-video w-full items-center justify-center">
        <div className="rounded-panel border p-10">
          <Trans message="There was an issue playting this video." />
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={finalSrc}
      className="aspect-video w-full"
      allowFullScreen
      allow="autoplay; encrypted-media; picture-in-picture;"
    />
  );
});

function NativeVideoPlayer({
  video,
  title,
  episode,
  mediaItemId,
  relatedVideos,
  autoPlay,
  logPlays,
  showEpisodeSelector,
  enableControls,
  vastUrl,
  isLiveTvControls,
  setSelectedVideo,
  streamink
}: Props) {
  const playerRef = useRef<PlayerActions>(null!);
  const logVideoPlay = useLogVideoPlay(playerRef, {enabled: logPlays});
  const mediaItem = videoToMediaItem(video, mediaItemId);
  const related = relatedVideos?.map(v => videoToMediaItem(v)) ?? [];
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [adMediaUrl, setAdMediaUrl] = useState<string | null>(null);
  const [vastTracker, setVastTracker] = useState<any>(null);
  const [skipTime, setSkipTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);





  useEffect(() => {
    async function fetchVAST() {
      if (!vastUrl) return;
      const vastClient = new VASTClient();
      try {
        // 'https://statics.dmcdn.net/h/html/vast/simple-inline.xml'
        const response = await vastClient.get(vastUrl);
        if (response) {
          console.log(response);
          const validAd = response.ads.find(
            (ad: any) => ad?.creatives?.length > 0,
          );
          if (!validAd) return;
          console.log(validAd, 'validAdvalidAd');
          const creative: any = validAd.creatives.find(
            (c: any) => c?.mediaFiles,
          );
          console.log(creative, 'creativecreativecreative');
          const mediaFileUrl = creative?.mediaFiles?.find(
            (mf: any) => mf.fileURL,
          )?.fileURL;
          const mediaFileSkipDelay = creative?.skipDelay;
          console.log(mediaFileSkipDelay);
          if (mediaFileSkipDelay) {
            setSkipTime(mediaFileSkipDelay);
          } else {
            setSkipTime(15);
          }

          console.log(mediaFileSkipDelay, 'mediaFileSkipDelay');
          console.log(mediaFileUrl, 'mediaFileUrlmediaFileUrl');
          if (mediaFileUrl) {
            console.log(mediaFileUrl, 'mediaFileUrlmediaFileUrl');
            setAdMediaUrl(mediaFileUrl);
            const tracker = new VASTTracker(vastClient, validAd, creative);
            setVastTracker(tracker);
            tracker.trackImpression();
          } else {
            setAdMediaUrl(null);
          }
        }
      } catch (error) {
        console.error('Error fetching VAST:', error);
      }
    }

    fetchVAST();
  }, [vastUrl]);

  useEffect(() => {
    if (!videoRef.current || !vastTracker) return;

    const videoEl: any = videoRef.current;

    vastTracker.on('loaded', (i: any) => {
      console.log(i, 'loaded');
    });

    const handlePlay = () => {
      vastTracker.setPaused(false);
    };

    const handlePause = () => {
      vastTracker.setPaused(true);
    };

    vastTracker.track('skip');

    const handleTimeUpdate = (i: any) => {
      setTimeLeft(skipTime - videoEl.currentTime);
      if (videoEl.currentTime >= skipTime) {
        setCanSkip(true);
      }
      vastTracker.setProgress(videoEl.currentTime);
    };

    videoEl.addEventListener('timeupdate', handleTimeUpdate);

    const handleEnded = () => {
      vastTracker.complete();
      setAdMediaUrl(null);


    };

    const handleClickThrough = () => {
      if (vastTracker.clickThroughURLTemplate) {
        console.log(
          vastTracker.clickThroughURLTemplate,
          'vastTracker.clickThroughURLTemplatevastTracker.clickThroughURLTemplate',
        );
        vastTracker.click();
        window.open(vastTracker.clickThroughURLTemplate.url, '_blank');
      }
    };

    videoEl.addEventListener('play', handlePlay);
    videoEl.addEventListener('pause', handlePause);
    videoEl.addEventListener('timeupdate', handleTimeUpdate);
    videoEl.addEventListener('ended', handleEnded);
    videoEl.addEventListener('click', handleClickThrough);
    videoEl.addEventListener('skip', handleSkip);
    return () => {
      videoEl.removeEventListener('play', handlePlay);
      videoEl.removeEventListener('pause', handlePause);
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
      videoEl.removeEventListener('ended', handleEnded);
      videoEl.removeEventListener('click', handleClickThrough);
      videoEl.removeEventListener('skip', handleSkip);
    };
  }, [vastTracker, skipTime]);

  const handleSkip = () => {
    if (vastTracker) {
      vastTracker.track('skip');
      vastTracker.skip();
      vastTracker.complete();
    }
    setAdMediaUrl(null);
    setCanSkip(false);

  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        logVideoPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [logVideoPlay]);


  useEffect(() => {
    const video:any = videoRef.current;

    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <>
      {adMediaUrl ? (
        <div className="relative flex h-full w-full items-center justify-center bg-twitter">
          <div className="relative flex h-full w-full items-center justify-center">
            <video
              muted={muted}
              autoPlay={true}
              playsInline
              ref={videoRef}
              controls={false}

              className="object-contain"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
            >
              <source src={adMediaUrl} type="video/mp4" />
            </video>
            <div className={'absolute bottom-16 right-16 flex items-center justify-center gap-12'}>
            <button
              onClick={() => setMuted(prev => !prev)}
              className={
                'flex items-center justify-center gap-14 rounded bg-background px-22 py-12'
              }
              style={{
                border: 'none',
              }}
            >
              {!muted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 15"
                  width="20"
                  height="15"
                  className="svg-icon--volume-up svg-icon"
                >
                  <path d="M0 5h4l5-4v13l-5-4H0V5zm20 2.5c0 1.4-.28 2.78-.82 4.06-.55 1.3-1.34 2.46-2.35 3.44l-1.33-1.4c.8-.8 1.44-1.76 1.87-2.8.42-1.05.64-2.17.63-3.3 0-1.13-.2-2.25-.63-3.3-.43-1.04-1.07-2-1.87-2.8L16.83 0c1 .98 1.8 2.15 2.35 3.44.54 1.28.82 2.66.82 4.06zm-4.67 0c0 .78-.15 1.55-.45 2.27-.3.73-.74 1.38-1.3 1.93l-1.4-1.4c.36-.37.65-.8.85-1.28.2-.48.3-1 .3-1.52s-.1-1.04-.3-1.52c-.2-.48-.5-.9-.86-1.28l1.4-1.4c.57.55 1 1.2 1.3 1.93.3.72.47 1.5.46 2.27z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="13"
                  className="svg-icon--volume-off svg-icon"
                >
                  <path d="M0 4h4l5-4v13L4 9H0V4zm17 1l-1-1-1.5 1.5L13 4l-1 1 1.5 1.5L12 8l1 1 1.5-1.5L16 9l1-1-1.5-1.5L17 5z"></path>
                </svg>
              )}
            </button>

            {timeLeft !== null && (
              <button
                disabled={!canSkip}
                onClick={handleSkip}
                className={
                  'flex items-center justify-center gap-14 rounded bg-background px-22 py-12'
                }
                style={{
                  cursor: canSkip ? 'pointer' : 'default',
                  border: 'none',
                }}
              >
                {timeLeft > 0 ? `Skip in ${timeLeft.toFixed(0)}` : 'Skip Ad'}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 9 10"
                  width="9"
                  height="10"
                  className="svg-icon--step-forward svg-icon"
                >
                  <path d="M0 0v10l7-5-7-5zm7 0h2v10H7V0z"></path>
                </svg>
              </button>

            )}
           </div>
          </div>
        </div>
      ) : (
        <VideoPlayer
          setSelectedVideo={setSelectedVideo}
          streamink={streamink}
          isLiveTvControls={isLiveTvControls}
          enableControls={enableControls}
          apiRef={playerRef}
          id="player"
          queue={[mediaItem, ...related]}
          autoPlay={autoPlay}
          onBeforePlayNext={nextMedia => {
            if (nextMedia && !isSameMedia(mediaItem, nextMedia)) {
              navigate(getWatchLink(nextMedia.meta));
            }
            return true;
          }}
          onDestroy={() => logVideoPlay()}
          listeners={{
            playbackEnd: () => logVideoPlay(),
            beforeCued: ({previous}) => {
              // only log when cueing from previous video and not when cueing initial one
              if (previous) {
                logVideoPlay();
              }
            },
          }}
          rightActions={
            showEpisodeSelector && title && episode ? (
              <EpisodeSelector
                title={title}
                currentEpisode={episode}
                onSelected={episode => {
                  navigate(getWatchLink(episode.primary_video));
                }}
              />
            ) : undefined
          }
        />
      )}
    </>
  );
}

function videoToMediaItem(video: Video, mediaItemId?: string): MediaItem {
  return {
    id: mediaItemId || video.id,
    provider: guessPlayerProvider(video.src),
    src: video.src,
    poster: video.thumbnail,
    meta: video,
    initialTime: video.latest_play?.time_watched ?? undefined,
    captions: video.captions?.map(caption => ({
      id: caption.id,
      src: caption.url,
      label: caption.name,
      language: caption.language,
    })),
  };
}
