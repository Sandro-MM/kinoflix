import {SiteVideoPlayer} from '@app/videos/site-video-player';
import React, { useEffect, useRef, useState} from 'react';
import {VASTClient, VASTTracker} from '@dailymotion/vast-client';

const VideoPlayerLiveTV = ({keyItem,
                                    stream,
                                    enableControls,
                                    vastUrl,
                                    setSelectedVideo,
                                    streamink
                                  }: {
  keyItem: string;
  stream: string;
  enableControls?: boolean;
  vastUrl?: string;
  setSelectedVideo?: (video: string) => void;
  streamink?: string;
}) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [adMediaUrl, setAdMediaUrl] = useState<string | null>(null);
  const [vastTracker, setVastTracker] = useState<any>(null);
  const [skipTime, setSkipTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [adCompletedByUser, setAdCompletedByUser] = useState(false);



  useEffect(() => {
    async function fetchVAST() {
      if (!vastUrl) return;
      const vastClient = new VASTClient();
      try {
        // 'https://statics.dmcdn.net/h/html/vast/simple-inline.xml'
        const response = await vastClient.get('https://statics.dmcdn.net/h/html/vast/simple-inline.xml');
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
    setAdCompletedByUser(true); // Mark user interaction
  };

  const handleEnded = () => {
    vastTracker.complete();
    setAdMediaUrl(null);
    setAdCompletedByUser(true); // Mark ad completion as user interaction
  };

  useEffect(() => {
    if (adCompletedByUser && videoRef.current) {
      videoRef.current.play?.();
    }
  }, [adCompletedByUser]);



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
    <SiteVideoPlayer
      // setSelectedVideo={setSelectedVideo}
      // streamink={streamink}
      isLiveTvControls={true}
      enableControls={enableControls}
      key={keyItem}
      autoPlay={true}
      video={{
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        name: '123',
        type: 'video',
        category: 'full',
        origin: 'local',
        quality: '480',
        approved: true,
        user_id: 1,
        season_num: 1,
        episode_num: 1,
        title_id: 1,
        model_type: 'video',
        id: 1,
        upvotes: 1,
        downvotes: 1,
        score: 1,
      }}
      mediaItemId={`123123`}
    />)}
</>
  )};
export default VideoPlayerLiveTV;
