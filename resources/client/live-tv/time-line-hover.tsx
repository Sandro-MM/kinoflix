import React, {useState, useRef, MouseEvent, ReactElement} from 'react';
import c from 'highlight.js/lib/languages/c';
import {Tooltip} from '@ui/tooltip/tooltip';
import {ParseCustomTimestamp} from '@app/live-tv/live-tv-time converter';

interface TimelineSelectorProps {
  onTimeSelect: (time: string) => void;
  children: ReactElement | null | undefined;
  selectedDate: string | null | undefined;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ onTimeSelect,children,selectedDate }) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const getProgressLineWidth = (selectedDate: string) => {
    const now = new Date(); // Current date and time
    console.log(now, "NOW");

    const selected = new Date(selectedDate); // Convert selectedDate to Date object
    console.log(selectedDate, "SELECTED DATE");

    // Create a separate date object for today at midnight
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Reset selected date's time for comparison
    selected.setHours(0, 0, 0, 0);

    // If the selected date is in the past, return 100% width
    if (selected < todayStart) {
      return "100%";
    }

    // If the selected date is today, calculate the progress line width
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Convert the current time into fractional hours (e.g., 14:30 → 14.5)
    const totalCurrentTimeInHours = currentHour + currentMinutes / 60;

    // Adjust the time to start from 06:00
    const adjustedTime = (totalCurrentTimeInHours - 6 + 24) % 24;

    // Calculate the percentage of the timeline (out of 24 hours)
    const percentage = (adjustedTime * (100 / 24)).toFixed(4);

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
            style={{ width: getProgressLineWidth(selectedDate!) }}
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
