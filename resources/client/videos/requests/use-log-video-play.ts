import {PlayerActions} from '@common/player/hooks/use-player-actions';
import {MediaItem} from '@common/player/media-item';
import {Video} from '@app/titles/models/video';
import {MutableRefObject, useCallback} from 'react';
import {getCookie} from 'react-use-cookie';

interface Options {
  enabled?: boolean;
}

export function useLogVideoPlay(
  playerRef: MutableRefObject<PlayerActions>,
  {enabled = true}: Options = {}
) {
  return useCallback((): boolean => {
    const player = playerRef.current;
    if (!player || !enabled) {
      return false;
    }
    const media = player.getState().cuedMedia as MediaItem<Video> | undefined;
    if (!media?.meta?.id || player.getCurrentTime() === 0) {
      return false;
    }
    return navigator.sendBeacon(
      `/api/v1/videos/${media.meta.id}/log-play`,
      JSON.stringify({
        currentTime: player.getCurrentTime(),
        duration: player.getState().mediaDuration,
        _token: getCookie('XSRF-TOKEN'),
      })
    );
  }, [playerRef, enabled]);
}
