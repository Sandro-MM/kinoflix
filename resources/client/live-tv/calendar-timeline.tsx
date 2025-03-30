import React, { useState, useEffect } from "react";
import {Button} from '@ui/buttons/button';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';

interface DateItem {
  day: string;
  month: string;
  weekday: string;
  fullDate: string;
}

interface PastDatesListProps {
  days: number;
  selectedDay: string | null;
  setSelectedDay: (day: string) => void;
}

export const PastDatesList = ({ days, selectedDay, setSelectedDay }: PastDatesListProps) => {


  const dialogContext = useDialogContext();
  const [pastDates, setPastDates] = useState<DateItem[]>([]);

  useEffect(() => {
    setPastDates(getPastDates(days));
  }, [days]);

  return (
    <div className={'flex items-center w-full'}>

    <div className={'lg:overflow-x-scroll flex lg:ml-auto lg:w-[calc(100vw-44px)] flex-col w-full lg:flex-row'}>
      {pastDates.map((date, index) => (
        <Button
            variant={selectedDay === date.fullDate ? "raised" : "outline"}
            color={selectedDay === date.fullDate ? "primary" : "chip" }
            radius={'rounded-[0px]'}
            className="min-h-56 min-w-144 flex gap-12 max-lg:!justify-start"
            key={index}
            onClick={() => {setSelectedDay(date.fullDate)
              if (dialogContext?.close) {
              dialogContext.close();
            }}
        }

          >
          <div className={'text-2xl'}>{date.day}</div>
          <div className={'max-lg:flex gap-5'}>
            <div className={'lg:text-base text-left text-2xl'}>{date.month}</div>
            <div className={'lg:text-sm text-left text-2xl'}>{date.weekday}</div>
          </div>
        </Button>
      ))}
    </div>

    </div>
  );
};

// Function to generate past dates
const getPastDates = (days: number): DateItem[] => {
  const result: DateItem[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    result.push({
      day: date.toLocaleDateString("en-GB", { day: "2-digit" }),
      month: date.toLocaleDateString("en-GB", { month: "long" }),
      weekday: date.toLocaleDateString("en-GB", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0], // "YYYY-MM-DD" format
    });
  }

  return result.reverse();
};

