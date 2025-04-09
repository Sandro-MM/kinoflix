import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {useContext, useEffect, useRef} from 'react';
import {PlayerStoreContext} from '@common/player/player-context';
import {useHtmlMediaInternalState} from '@common/player/providers/html-media/use-html-media-internal-state';
import {useHtmlMediaEvents} from '@common/player/providers/html-media/use-html-media-events';
import {useHtmlMediaApi} from '@common/player/providers/html-media/use-html-media-api';

export function HtmlVideoProvider() {
  const ref = useRef<HTMLVideoElement>(null);

  const autoPlay = usePlayerStore(s => s.options.autoPlay);
  const muted = usePlayerStore(s => s.muted);
  const cuedMedia = usePlayerStore(s => s.cuedMedia);
  const adPlaying = usePlayerStore(s => s.adPlaying);
  const vastTracker = usePlayerStore(s => s.vastTracker);
  const skipTime = usePlayerStore(s => s.skipTime);
  const set = usePlayerStore();
  const store = useContext(PlayerStoreContext);

  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);

  useEffect(() => {
    console.log('[HtmlVideoProvider] setting providerApi');
    store.setState({ providerApi });
  }, [store, providerApi]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !adPlaying || !vastTracker) return;

    console.log('[HtmlVideoProvider] 🎬 VAST tracking with play/pause/time/click/ended');

    const fired = {
      firstQuartile: false,
      midpoint: false,
      thirdQuartile: false,
    };

    const handlePlay = () => {
      vastTracker.setPaused(false);
      console.log('[HTML VIDEO] ▶️ play - resumed');
    };

    const handlePause = () => {
      vastTracker.setPaused(true);
      console.log('[HTML VIDEO] ⏸️ pause - paused');
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const duration = video.duration || 30;
      const percent = current / duration;
      const timeLeft = skipTime - current;

      console.log('[HTML VIDEO] ⏱️ timeupdate', {
        current,
        duration,
        percent,
        timeLeft,
        canSkip: current >= skipTime,
      });



      if (percent >= 0.25 && !fired.firstQuartile) {
        vastTracker.track('firstQuartile');
        fired.firstQuartile = true;
        console.log('[HTML VIDEO] 🟡 Tracked firstQuartile');
      }
      if (percent >= 0.5 && !fired.midpoint) {
        vastTracker.track('midpoint');
        fired.midpoint = true;
        console.log('[HTML VIDEO] 🟠 Tracked midpoint');
      }
      if (percent >= 0.75 && !fired.thirdQuartile) {
        vastTracker.track('thirdQuartile');
        fired.thirdQuartile = true;
        console.log('[HTML VIDEO] 🔴 Tracked thirdQuartile');
      }
    };

    const handleClick = () => {
      const clickUrl = vastTracker.clickThroughURLTemplate?.url;
      console.log('[HTML VIDEO] 🖱️ click', { clickUrl });
      if (clickUrl) {
        vastTracker.click();
        window.open(clickUrl, '_blank');
      }
    };

    const handleEnded = () => {
      console.log('[HTML VIDEO] 🛑 ended');
      vastTracker.complete();
      set.finishAd(

      );
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('click', handleClick);

    return () => {
      console.log('[HtmlVideoProvider] 🧹 Cleanup VAST event handlers');
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('click', handleClick);
    };
  }, [adPlaying, vastTracker, skipTime, set]);



  let src = cuedMedia?.src;
  if (src && cuedMedia?.initialTime) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }

  return (
    <video
      className="w-full h-full"
      ref={ref}
      src={src}
      playsInline
      poster={cuedMedia?.poster}
      autoPlay={autoPlay}
      muted={muted}
      {...events}
    >
      {cuedMedia?.captions?.map((caption, index) => (
        <track
          key={caption.id}
          label={caption.label}
          kind="subtitles"
          srcLang={caption.language || 'en'}
          src={caption.src}
          default={index === 0}
        />
      ))}
    </video>
  );
}
