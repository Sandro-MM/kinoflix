import React, {useState, useEffect, useRef} from 'react';
import {Button} from '@ui/buttons/button';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {useCarousel} from '@app/channels/carousel/use-carousel';
import {IconButton} from '@ui/buttons/icon-button';
import {ChevronLeftIcon} from '@ui/icons/material/ChevronLeft';
import {ChevronRightIcon} from '@ui/icons/material/ChevronRight';
import {AnimatePresence, motion as m, useDragControls} from 'framer-motion';
import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {TitleRating} from '@app/reviews/title-rating';
import {TitleLink} from '@app/titles/title-link';
import {Title} from '@app/titles/models/title';

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

export const PastDatesListDesktop = ({ days, selectedDay, setSelectedDay }: PastDatesListProps) => {


  const dialogContext = useDialogContext();
  const [pastDates, setPastDates] = useState<DateItem[]>([]);

  useEffect(() => {
    setPastDates(getPastDates(days));
  }, [days]);

  return (
    <div className={'flex items-center w-full'}>

      <div className="md:flex max-md:w-[100vw] w-[100vw] h-max">
        <div className="relative flex-auto">

            <div className={'lg:w-[calc(100vw-58px)] lg:mx-auto  w-full'}>
              {  pastDates &&
              <UpNext selectedDay={selectedDay} setSelectedDay={setSelectedDay} titles={pastDates} />
            }


          </div>
        </div>
      </div>

    {/*<div className={'lg:overflow-x-scroll flex lg:ml-auto lg:w-[calc(100vw-44px)] flex-col w-full lg:flex-row'}>*/}
    {/*  {pastDates.map((date, index) => (*/}
    {/*    <Button*/}
    {/*        variant={selectedDay === date.fullDate ? "raised" : "outline"}*/}
    {/*        color={selectedDay === date.fullDate ? "primary" : "chip" }*/}
    {/*        radius={'rounded-[0px]'}*/}
    {/*        className="min-h-56 min-w-144 flex gap-12 max-lg:!justify-start"*/}
    {/*        key={index}*/}
    {/*        onClick={() => {setSelectedDay(date.fullDate)*/}
    {/*          if (dialogContext?.close) {*/}
    {/*          dialogContext.close();*/}
    {/*        }}*/}
    {/*    }*/}

    {/*      >*/}
    {/*      <div className={'text-2xl'}>{date.day}</div>*/}
    {/*      <div className={'max-lg:flex gap-5'}>*/}
    {/*        <div className={'lg:text-base text-left text-2xl'}>{date.month}</div>*/}
    {/*        <div className={'lg:text-sm text-left text-2xl'}>{date.weekday}</div>*/}
    {/*      </div>*/}
    {/*    </Button>*/}
    {/*  ))}*/}
    {/*</div>*/}

    </div>
  );
};

// Function to generate past dates
const getPastDates = (days: number): DateItem[] => {
  const result: DateItem[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

    result.push({
      day: date.toLocaleDateString("en-GB", { day: "2-digit" }),
      month: date.toLocaleDateString("en-GB", { month: "long" }),
      weekday: date.toLocaleDateString("en-GB", { weekday: "short" }),
      fullDate: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-'),
    });
  }

  return result.reverse();
};



interface UpNextProps {
  titles: any;
  selectedDay: any;
  setSelectedDay: any;
}

export default function UpNext({
                                 titles,
                                 selectedDay,
                                 setSelectedDay,
                               }: UpNextProps) {
  const [itemsVisible, setItemsVisible] = useState(getItemsVisible());
  const [startIndex, setStartIndex] = useState(0);

  function getItemsVisible() {
    return Math.floor((window.innerWidth - 180) / 140);
  }

  useEffect(() => {
    const handleResize = () => {
      const visible = getItemsVisible();
      setItemsVisible(visible);
      setStartIndex(Math.max(0, titles.length - visible)); // Always show last `n`
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [titles.length]);

  const endIndex = startIndex + itemsVisible;
  const visibleItems = titles.slice(startIndex, endIndex);

  const canScrollBackward = startIndex > 0;
  const canScrollForward = endIndex < titles.length;

  const handlePrev = () => {
    if (canScrollBackward) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canScrollForward) {
      setStartIndex((prev) => Math.min(titles.length - itemsVisible, prev + 1));
    }
  };

  return (
    <div className="w-full h-56 flex items-center justify-start relative">

        <IconButton
          variant="text"
          className="h-56"
          size="lg"
          color="white"
          onClick={handlePrev}
        >
          <ChevronLeftIcon />
        </IconButton>


      <AnimatePresence initial={false} mode="wait">
        <div className="w-[calc(100%-100px)] mx-auto flex-shrink-0 max-md:hidden">
          <div className="hidden-scrollbar flex h-full snap-x snap-mandatory gap-[0] overflow-x-auto">
            {visibleItems.map((date:any, index:number) => (
              <m.div
                key={index}
                className="relative flex-auto min-w-[140px] w-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={selectedDay === date.fullDate ? "raised" : "outline"}
                  color={selectedDay === date.fullDate ? "primary" : "chip"}
                  radius="rounded-[0px]"
                  className="min-h-56 min-w-144 flex gap-12"
                  onClick={() => setSelectedDay(date.fullDate)}
                >
                  <div className="text-2xl">{date.day}</div>
                  <div className="gap-5">
                    <div className="text-base">{date.month}</div>
                    <div className="text-sm">{date.weekday}</div>
                  </div>
                </Button>
              </m.div>
            ))}
          </div>
        </div>
      </AnimatePresence>


        <IconButton
          variant="text"
          className="h-56"
          size="lg"
          color="white"
          onClick={handleNext}
        >
          <ChevronRightIcon />
        </IconButton>

    </div>
  );
}
