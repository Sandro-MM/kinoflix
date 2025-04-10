import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {Button} from '@ui/buttons/button';
import React from 'react';
import {MediaFastForwardIcon} from '@ui/icons/media/media-fast-forward';

interface SkipButtonProps {
  seconds: number; // e.g. 30, 60, 300
  direction: 'forward' | 'backward';
}

export function SkipButtonMobile({ seconds, direction }: SkipButtonProps) {
  const { getCurrentTime, seek, play } = usePlayerActions();

  const handleClick = () => {
    const currentTime = getCurrentTime();
    const newTime =
      direction === 'forward'
        ? currentTime + seconds
        : Math.max(0, currentTime - seconds);

    seek(newTime);
    play()
  };

  return (
    <Button color={'chip'} variant={'text'} onClick={handleClick} className="md:px-6 py-0 flex items-center justify-end px-0 text-2xl">

      {direction === 'backward' && <MediaFastForwardIcon className={'rotate-180 size-36'}/>}

      {direction === 'forward' ? `+${seconds / 60 >= 1 ? seconds / 60 + ' m ' : seconds + ' s '}` : `-${seconds / 60 >= 1 ? seconds / 60 + ' m ' : seconds + ' s '}`}
      {direction === 'forward' && <MediaFastForwardIcon className={'size-36'}/>}

    </Button>
  );
}
