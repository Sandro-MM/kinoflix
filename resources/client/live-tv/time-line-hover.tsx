import React, {useState, useRef, MouseEvent, ReactElement} from 'react';
import c from 'highlight.js/lib/languages/c';
import {Tooltip} from '@ui/tooltip/tooltip';
import {ParseCustomTimestamp} from '@app/live-tv/live-tv-time converter';

interface TimelineSelectorProps {
  onTimeSelect: (time: string | number) => void;
  children: ReactElement | null | undefined;
  selectedDate: string | number | null | undefined;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ onTimeSelect,children,selectedDate }) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | number | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const getProgressLineWidth = (selectedDate: string) => {
    console.log(selectedDate)
    const now = new Date();

    // Parse ISO date (safe way):
    const utcDate = new Date(selectedDate + "T00:00:00Z"); // force UTC midnight

    // Convert explicitly to local midnight:
    const selected = new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate()
    );

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    console.log("Selected date (local midnight):", selected.toString());
    console.log("Today start (local midnight):", todayStart.toString());

    if (selected.getTime() < todayStart.getTime()) {
      console.log("Selected date is in the past. Returning 100%.");
      return "100%";
    } else if (selected.getTime() > todayStart.getTime()) {
      console.log("Selected date is in the future. Returning 0%.");
      return "0%";
    }

    // Today's progress:
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const totalCurrentTimeInHours = currentHour + currentMinutes / 60;

    const adjustedTime = Math.max(0, totalCurrentTimeInHours - 6);
    const percentage = Math.min((adjustedTime / 18) * 100, 100).toFixed(4); // from 6 AM to midnight

    return `${percentage}%`;
  };






  // Mouse move handler with typed event
  const handleMouseMove = (e: MouseEvent) => {
    if (!timelineRef.current || !bottomDivRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const bottomRect = bottomDivRef.current.getBoundingClientRect();

    // Calculate how much of the full width the timeline div covers
    const timelineWidthRatio = timelineRect.width / bottomRect.width;
    const maxSelectableHours = timelineWidthRatio * 24; // Max hours range from 6:00 AM

    // Calculate hover percentage within the *timeline div* (not the full width)
    const percent = ((e.clientX - timelineRect.left) / timelineRect.width) * 100;
    const clampedPercent = Math.max(0, Math.min(100, percent));

    const baseTime = new Date();
    baseTime.setHours(6, 0, 0, 0); // Start at 6:00 AM

    // Compute the hovered time but clamp it within the timeline's allowed range
    const hoveredMilliseconds = (clampedPercent / 100) * (maxSelectableHours * 60 * 60 * 1000);
    const selectedTime = new Date(baseTime.getTime() + hoveredMilliseconds);

    const hours = selectedTime.getHours().toString().padStart(2, "0");
    const minutes = selectedTime.getMinutes().toString().padStart(2, "0");

    setHoverPercent(clampedPercent);
    setHoveredTime(`${hours}:${minutes}`);
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
              <div className={`absolute bg-toast z-tooltip my-4 max-w-240 break-words rounded px-8 py-4 top-[20px] text-xs text-white shadow`} style={{left: `calc(${hoverPercent}% - 12px)`}}>
                {hoveredTime}
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
