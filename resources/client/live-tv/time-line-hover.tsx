import React, {useState, useRef, MouseEvent, ReactElement} from 'react';
import c from 'highlight.js/lib/languages/c';
import {Tooltip} from '@ui/tooltip/tooltip';
import {ParseCustomTimestamp} from '@app/live-tv/live-tv-time converter';
import {Channel} from '@app/live-tv/live-tv';
import VideoPlayerLiveTV from '@app/live-tv/live-tv-video-player';

interface TimelineSelectorProps {
  onTimeSelect: (time: string | number) => void;
  children: ReactElement | null | undefined;
  selectedDate: string | number | null | undefined;
  selectedChannel:Channel
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ onTimeSelect,children,selectedDate,selectedChannel }) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | number | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const getProgressLineWidth = (selectedDate: string): string => {
    const now = new Date();
    const currentTime = now.getTime();

    const selected = new Date(selectedDate);
    selected.setHours(6, 0, 0, 0); // 6:00 AM on selected date

    const timelineStart = selected.getTime();
    const timelineEnd = timelineStart + 24 * 60 * 60 * 1000; // +24 hours (6:00 AM next day)

    if (currentTime < timelineStart) {
      return "0%"; // Before the timeline starts
    }

    if (currentTime >= timelineEnd) {
      return "100%"; // After the timeline ends
    }

    const elapsed = currentTime - timelineStart;
    const percentage = (elapsed / (24 * 60 * 60 * 1000)) * 100;

    return `${percentage.toFixed(2)}%`;
  };








  // Mouse move handler with typed event
  const handleMouseMove = (e: MouseEvent) => {
    if (!timelineRef.current || !bottomDivRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const bottomRect = bottomDivRef.current.getBoundingClientRect();

    const timelineWidthRatio = timelineRect.width / bottomRect.width;
    const maxSelectableHours = timelineWidthRatio * 24;

    const percent = ((e.clientX - timelineRect.left) / timelineRect.width) * 100;
    const clampedPercent = Math.max(0, Math.min(100, percent));

    const baseTime = new Date();
    baseTime.setHours(6, 0, 0, 0); // Start of timeline (6:00 AM today)

    const hoveredMilliseconds = (clampedPercent / 100) * (maxSelectableHours * 60 * 60 * 1000);
    const selectedTime = new Date(baseTime.getTime() + hoveredMilliseconds);

    const hoveredTimestamp = Math.floor(selectedTime.getTime() / 1000); // Unix time (in seconds)

    setHoverPercent(clampedPercent);
    setHoveredTime(hoveredTimestamp); // Set as Unix timestamp
  };


  // Mouse leave handler
  const handleMouseLeave = (): void => {
    setHoveredTime(null);
    setHoverPercent(null);
  };

  // Click handler
  const handleClick = (): void => {
    if (hoveredTime) {
      onTimeSelect(hoveredTime);
    }
  };

  const converter = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (

    <div className={'h-18 w-full'}>
      <div className={'relative h-18 w-full'}>



          <div
            style={{ width: getProgressLineWidth(selectedDate?.toString()!) }}
            ref={timelineRef}
            className="h-18 w-full absolute top-[-5px] cursor-pointer py-5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <div className={'w-full bg-primary h-8'}></div>
            {hoveredTime && (
              <div className={`absolute bg-toast z-tooltip text-center my-4 max-w-240 min-w-240 break-words rounded px-8 py-4 -translate-y-full  -translate-x-1/2 top-[-10px] text-xs text-white shadow`} style={{left: `${hoverPercent}%`}}>
                {converter(+hoveredTime)}
                {hoveredTime && <VideoPlayerLiveTV
                  keyItem={hoveredTime.toString()}
                  stream={`https://api.oho.ge/tv/streaming/dvr/?start=${hoveredTime}&id=${selectedChannel.id}.m3u8`}
                  enableControls={false}
                />}
              </div>
            )}
          </div>


        <div ref={bottomDivRef} className={'w-full bg-chip h-8'}></div>
        <div className={'w-full absolute top-[1px] z-[3]'}>
          {children}
        </div>
      </div>
    </div>




  );
};

export default TimelineSelector;
