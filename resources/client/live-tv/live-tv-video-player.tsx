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
      {/* Ad video player, conditionally visible */}
      <div style={{ display: adMediaUrl ? 'block' : 'none' }}>
        <video
          muted={muted}
          autoPlay={true}
          playsInline
          ref={videoRef}
          controls={false}
          className="object-contain"
          style={{ width: '100%', height: '100%' }}
        >
          {adMediaUrl && <source src={adMediaUrl} type="video/mp4" />}
        </video>
        {/* Your ad controls */}
        <button onClick={handleSkip}>Skip Ad</button>
      </div>

      {/* Main SiteVideoPlayer, always mounted but hidden during ad */}
      <div style={{ display: adMediaUrl ? '' : 'block' }}>
        <SiteVideoPlayer
          isLiveTvControls={true}
          enableControls={enableControls}
          key={keyItem}
          autoPlay={false}
          video={{
            src: stream,
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
        />
      </div>
    </>
  );};
export default VideoPlayerLiveTV;
