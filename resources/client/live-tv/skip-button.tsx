import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {Button} from '@ui/buttons/button';
import React from 'react';

interface SkipButtonProps {
  seconds: number; // e.g. 30, 60, 300
  direction: 'forward' | 'backward';
}

export function SkipButton({ seconds, direction }: SkipButtonProps) {
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
    <Button color={'chip'} variant={'flat'} onClick={handleClick} className="md:px-6 py-2 max-md:!bg-transparent max-md:!border-none flex items-center justify-end gap-5">

      {direction === 'backward' && <svg
        className={'svg-icon'}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
      >
        <path d="M13 10V0L6 5l7 5z"></path>
        <path d="M7 10V0L0 5l7 5z"></path>
      </svg>}

      {direction === 'forward' ? `+${seconds / 60 >= 1 ? seconds / 60 + ' min ' : seconds + ' sec '}` : `-${seconds / 60 >= 1 ? seconds / 60 + ' min ' : seconds + ' sec '}`}
      {direction === 'forward' && <svg
        className={'rotate-180 svg-icon'}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
      >
        <path d="M13 10V0L6 5l7 5z"></path>
        <path d="M7 10V0L0 5l7 5z"></path>
      </svg>}

    </Button>
  );
}
