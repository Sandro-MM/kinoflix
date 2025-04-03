import {TimeLineSvg} from '@app/live-tv/time-line-svg';
import React from 'react';
import {Tooltip} from '@ui/tooltip/tooltip';
import TimelineSelector from '@app/live-tv/time-line-hover';
import {ParseCustomTimestamp} from '@app/live-tv/live-tv-time converter';
import {VideoPlayerLiveTV} from '@app/live-tv/live-tv';

interface Program {
  title: {
    lang: string;
    text: string;
  };
  start: string;
  stop: string;
  channel: string;
}

interface TimelineItemProps {
  programs: Program[] | null;
  selectedProgram?: Program | null;
  setSelectedProgram: (program: Program) => void;
  selectedDate: string | null;
  setSelectedTime: (time: string | null | number) => void;
  selectedTime: string | null | number;
}


export const TimelineItem: React.FC<TimelineItemProps> = ({
                                                            programs,
                                                            selectedProgram,
                                                            setSelectedProgram,
                                                            selectedDate,
                                                            selectedTime,
                                                            setSelectedTime,

}) => {

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 6) % 24;
    return {
      time: `${String(hour).padStart(2, "0")}:00`,
      left: `${(i * (100 / 24)).toFixed(4)}%`,
    };
  });

  const getProgramPosition = (startTime: number | string) => {
    if (typeof startTime !== "number") return "0%";

    const date = new Date(+startTime * 1000); // Convert from seconds to milliseconds

    const startHour = date.getUTCHours(); // Extract HH
    const startMinutes = date.getUTCMinutes(); // Extract MM

    const totalHours = startHour + startMinutes / 60; // Convert to fractional hours
    const adjustedHour = (totalHours - 6.09 + 24) % 24; // Shift so 06:00 is 0%

    return `${(adjustedHour * (100 / 24)).toFixed(4)}%`; // Convert to percentage
  };



  const programsItem =

    <>
    {
    programs?.map((program, index) => (
      <Tooltip key={index} label={
        <div>

          <div className={'mx-auto w-max my-4'}>{ParseCustomTimestamp(program.start)}</div>
          <VideoPlayerLiveTV enableControls={false} keyItem={program.title.text} stream={`https://api.oho.ge/tv/streaming/dvr/?start=${program.start}&end=${program.stop}&id=${program.channel}&quality=low.m3u8`}/>
          <div className={'mx-auto w-max my-4'}>{program.title.text}</div>
      </div>}>
      <div
        onClick={() => setSelectedProgram(program)}
        className={`
        absolute top-[-4px] z-10 size-14 cursor-pointer rounded-full border-2 border-solid border-bg
        ${selectedProgram === program ? "bg-primary" : "bg-chip"}
      `}
        style={{ left: getProgramPosition(program.start) }}
      />
    </Tooltip>
  ))
    }
    </>

  const hoursItem = hours.map((hour, index) => (
    <div
      key={index}
      className={`font-roboto absolute top-[2px] text-[10px] font-normal text-[#919191] ${
        index === 0 ? 'ml-0' : 'ml-[-15px]'
      }`}
      style={{left: hour.left}}
    >
      {hour.time}
    </div>
  ))


  return (
    <div>
      <div className="relative h-12 w-full">
        {hoursItem}
      </div>
      <TimeLineSvg />
      <div className={' h-18 w-full'}>
        <TimelineSelector selectedDate={selectedDate} onTimeSelect={setSelectedTime}>
          {programsItem}
        </TimelineSelector>
      </div>



    </div>
  );
}
