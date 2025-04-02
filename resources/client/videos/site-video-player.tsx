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

import {VASTClient, VASTParser,VASTTracker} from 'vast-client';




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
}
export const SiteVideoPlayer = memo((props: Props) => {
  const {video, autoPlay, title, episode, vastUrl} = props;
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
  vastUrl
}: Props) {
  const playerRef = useRef<PlayerActions>(null!);
  const logVideoPlay = useLogVideoPlay(playerRef, {enabled: logPlays});
  const mediaItem = videoToMediaItem(video, mediaItemId);
  const related = relatedVideos?.map(v => videoToMediaItem(v)) ?? [];
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [adMediaUrl, setAdMediaUrl] = useState<string | null>(null);
  const [vastTracker, setVastTracker] = useState<any>(null);
  const [skipTime, setSkipTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [canSkip, setCanSkip] = useState<boolean>(false);



  console.log()

  useEffect(() => {
    async function fetchVAST() {
      if (!vastUrl) return;
      const vastClient = new VASTClient();
      try {
        const response = await vastClient.get('https://statics.dmcdn.net/h/html/vast/simple-inline.xml');
        if (response){
          console.log(response)
          const validAd = response.ads.find((ad:any) => ad?.creatives?.length > 0);
          if (!validAd) return;
          console.log(validAd,'validAdvalidAd');
          const creative:any = validAd.creatives.find((c:any) => c?.mediaFiles);
          console.log(creative,'creativecreativecreative');
          const mediaFileUrl = creative?.mediaFiles?.find((mf:any) => mf.fileURL)?.fileURL;
          const mediaFileSkipDelay = creative?.skipDelay;
          setSkipTime(mediaFileSkipDelay)

          console.log(mediaFileSkipDelay,'mediaFileSkipDelay');
          console.log(mediaFileUrl,'mediaFileUrlmediaFileUrl');
          if (mediaFileUrl) {
            console.log(mediaFileUrl,'mediaFileUrlmediaFileUrl')
            setAdMediaUrl(mediaFileUrl);
            const tracker = new VASTTracker(vastClient, validAd, creative);
            setVastTracker(tracker);
            tracker.trackImpression();


          } else {
            setAdMediaUrl(null)
          }
        }



      } catch (error) {
        console.error("Error fetching VAST:", error);
      }
    }
    fetchVAST();
  }, [vastUrl]);


  useEffect(() => {
    if (!videoRef.current || !vastTracker) return;

    const videoEl: any = videoRef.current;

    vastTracker.on('loaded', (i: any) => {
      console.log(i, 'loaded')
    })

    const handlePlay = () => {
      vastTracker.setPaused(false);

    };

    const handlePause = () => {
      vastTracker.setPaused(true);

    };

    vastTracker.track('skip');

    const handleTimeUpdate = (i:any) => {
      setTimeLeft(skipTime - videoEl.currentTime)
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
        console.log(vastTracker.clickThroughURLTemplate,'vastTracker.clickThroughURLTemplatevastTracker.clickThroughURLTemplate')
        vastTracker.click();
        window.open(vastTracker.clickThroughURLTemplate.url, '_blank');
      }
    };

    videoEl.addEventListener("play", handlePlay);
    videoEl.addEventListener("pause", handlePause);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", handleEnded);
    videoEl.addEventListener("click", handleClickThrough);
    videoEl.addEventListener("skip", handleSkip);
    return () => {
      videoEl.removeEventListener("play", handlePlay);
      videoEl.removeEventListener("pause", handlePause);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("ended", handleEnded);
      videoEl.removeEventListener("click", handleClickThrough);
      videoEl.removeEventListener("skip", handleSkip);
    };
  }, [vastTracker,skipTime]);




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

  return (
    <>

      {adMediaUrl ?
        <div className={'w-full h-full bg-twitter flex justify-center items-center relative'}>
          <div className={'w-full h-max relative'}>
            <video className={'w-full'} ref={videoRef} controls={false} autoPlay>
              <source src={adMediaUrl} type="video/mp4" />
            </video>

              <button
                disabled={!canSkip}
                onClick={handleSkip}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: canSkip?'pointer':'default',
                  border: 'none',
                }}
              >
                {timeLeft > 0 ? timeLeft.toFixed(0) : 'Skip Ad'}

              </button>

          </div>
        </div>
        :
        <VideoPlayer
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
      }
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
