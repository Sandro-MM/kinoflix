import {
  VASTClient,
  VASTTracker,
  VastCreativeLinear,
} from '@dailymotion/vast-client';
import type { StateCreator } from 'zustand';
import type {
  HtmlVideoMediaItem,
  MediaItem,
} from '@common/player/media-item';
import type {
  PlayerState,
  ProviderListeners,
} from '@common/player/state/player-state';
import {isIOS} from '@react-aria/utils';
import {isiOS} from '@tiptap/react';

export interface AdSlice {
  adPlaying: boolean;
  adType: 'pre-roll' | 'mid-roll' | 'post-roll' | 'banner' | null;
  currentAdMedia?: MediaItem;
  vastTracker?: VASTTracker;
  skipTime: number;
  canSkip: boolean;
  timeLeft: number;
  _previousCuedMedia?: MediaItem;
  playAd: (ad: MediaItem, adType: AdSlice['adType'], media?:MediaItem) => Promise<void>;
  skipAd: () => void;
  finishAd: () => void;
}

type BaseSliceCreator = StateCreator<
  PlayerState & AdSlice,
  [['zustand/immer', unknown]],
  [],
  AdSlice
>;

type StoreLice = BaseSliceCreator extends (...a: infer U) => infer R
  ? (...a: [...U, Set<Partial<ProviderListeners>>]) => R
  : never;

export const createAdSlice: StoreLice = (set, get, store) => {
  return {
    adPlaying: false,
    adType: null,
    currentAdMedia: undefined,
    vastTracker: undefined,
    skipTime: 15,
    canSkip: false,
    timeLeft: 0,
    _previousCuedMedia: undefined,

    playAd: async (ad, adType,media) => {
      console.log('[playAd] called with:', ad, adType);
        console.log('[playAd] MediaMedia:', media);
      const previousMedia = get().cuedMedia;
      console.log('[playAd] ✅ cuedMedia before ad:', previousMedia);

      if (!previousMedia || previousMedia.id.toString().startsWith('vast-ad')) {
        console.warn('[playAd] ⚠️ No valid previousMedia to store before ad');
      } else {
        set(state => {
          if (media && media.provider !== 'htmlVideo') {
            state._previousCuedMedia = media;
          }
        });
        console.log('[playAd] 🧠 Stored previousMedia in slice:', previousMedia);
      }

      const vastUrl = ad?.vastUrl || ad?.meta?.vastUrl;
      if (!vastUrl) {
        console.warn('[playAd] ❌ No VAST URL found. Skipping ad.');
        return;
      }

      const vastClient = new VASTClient();
      const response = await vastClient.get(vastUrl);
      console.log('[playAd] 📦 VAST response:', response);

      const validAd = response?.ads?.find(ad => ad?.creatives?.length > 0);
      const creative = validAd?.creatives?.find(
        (c): c is VastCreativeLinear =>
          c.type === 'linear' && !!(c as VastCreativeLinear).mediaFiles?.length
      );

      const mediaFileUrl = creative?.mediaFiles?.find(f => f.fileURL)?.fileURL;
      const skipDelay = creative?.skipDelay ?? 15;

      if (!mediaFileUrl || !validAd || !creative) {
        console.warn('[playAd] ❌ Invalid VAST creative or media. Skipping ad.');
        return;
      }

      const tracker = new VASTTracker(vastClient, validAd, creative);
      tracker.trackImpression();

      const adMedia: HtmlVideoMediaItem<{ vastCreative: VastCreativeLinear }> = {
        id: `vast-ad-${Date.now()}`,
        provider: 'htmlVideo',
        src: mediaFileUrl,
        meta: { vastCreative: creative },
      };

      const { cue } = get();
      console.log('[playAd] 🎬 Cueing adMedia:', adMedia);
      await cue(adMedia);

      if (!get().providerReady) {
        console.log('[playAd] ⏳ Waiting for providerReady...');
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            unsubscribe();
            reject(new Error('Timed out waiting for providerReady'));
          }, 5000);

          const unsubscribe = store.subscribe(state => {
            if (state.providerReady) {
              clearTimeout(timeout);
              unsubscribe();
              resolve();
            }
          });
        });
      }

      const providerApi = get().providerApi;
      if (!providerApi) {
        console.error('[playAd] ❌ providerApi still not ready');
        return;
      }

      await providerApi.play();

      set(state => {
        state.adPlaying = true;
        state.adType = adType;
        state.currentAdMedia = adMedia;
        state.vastTracker = tracker;
        state.skipTime = skipDelay;
        state.canSkip = false;
        state.timeLeft = skipDelay;
      });

      const fired = { firstQuartile: false, midpoint: false, thirdQuartile: false };
      providerApi.onTimeUpdate = currentTime => {
        const duration = creative.duration ?? 30;
        const timeLeft = skipDelay - currentTime;
        const percent = currentTime / duration;

        tracker.setProgress(currentTime);

        if (!fired.firstQuartile && percent >= 0.25) {
          tracker.track('firstQuartile');
          fired.firstQuartile = true;
        }
        if (!fired.midpoint && percent >= 0.5) {
          tracker.track('midpoint');
          fired.midpoint = true;
        }
        if (!fired.thirdQuartile && percent >= 0.75) {
          tracker.track('thirdQuartile');
          fired.thirdQuartile = true;
        }

        set(state => {
          state.timeLeft = timeLeft;
          state.canSkip = currentTime >= skipDelay;
        });
      };

      providerApi.onClick = () => {
        const clickUrl = creative?.videoClickThroughURLTemplate?.url;
        if (clickUrl) {
          tracker.click();
          window.open(clickUrl, '_blank');
        }
      };

      providerApi.onEnded = () => {
        console.log('[playAd] 🎬 Ad ended. Finishing...');
        tracker.complete();
        get().finishAd();
      };
    },

    skipAd: () => {
      const tracker = get().vastTracker;
      if (tracker) {
        tracker.track('skip');
        tracker.skip();
        tracker.complete();
      }
      get().finishAd();
    },


    finishAd: async () => {
      console.log('[finishAd] 🎞️ Resuming original media:', get()._previousCuedMedia);
      const previousMedia = get()._previousCuedMedia;
      const adType = get().adType;

      set(state => {
        state.adType = null;
        state.currentAdMedia = undefined;
        state.vastTracker = undefined;
        state.skipTime = 15;
        state.timeLeft = 0;
        state.canSkip = false;
        state._previousCuedMedia = undefined;
        state.adPlaying = false;
        state.controlsVisible= true;
      });


      if (previousMedia && adType !== 'post-roll') {
        // 🛑 Strip vastUrl to avoid re-triggering preroll ad
        const mediaWithoutVast = {
          ...previousMedia,
          vastUrl: undefined,
          meta: {
            ...previousMedia.meta,
            vastUrl: undefined
          }
        };
        setTimeout(async () => {

            console.log('[finishAd] 🧽 Resetting and force-setting main media for iOS');

            // Force set src on the native <video> tag
            const src = mediaWithoutVast.src || mediaWithoutVast.meta?.src;
            if (src) {
              get().providerApi?.forceSetSrc?.(src);
            }

            // Cue media in Zustand store (this updates internal state)
            await get().cue(mediaWithoutVast);

            // Attempt autoplay
            try {
              await get().play();
            } catch (e) {
              console.warn('[finishAd] iOS autoplay failed, waiting for user interaction');
            }

            // Normal non-iOS flow
            // await get().cue(mediaWithoutVast);

        }, 500);
        // await get().play();
      }
    },
  };
};
