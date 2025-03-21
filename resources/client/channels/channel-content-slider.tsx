import {ChannelContentProps} from '@app/channels/channel-content';
import React, {Fragment, useEffect, useState} from 'react';
import {useCarousel} from '@app/channels/carousel/use-carousel';
import {Title} from '@app/titles/models/title';
import {TitleRating} from '@app/reviews/title-rating';
import {Button} from '@ui/buttons/button';
import {Trans} from '@ui/i18n/trans';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {TitleLink} from '@app/titles/title-link';
import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {IconButton} from '@ui/buttons/icon-button';
import {ChevronLeftIcon} from '@ui/icons/material/ChevronLeft';
import {ChevronRightIcon} from '@ui/icons/material/ChevronRight';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {AnimatePresence, m} from 'framer-motion';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {useChannelContent} from '@common/channels/requests/use-channel-content';
import {Channel, ChannelContentItem} from '@common/channels/channel';

export function ChannelContentSlider({
  channel,
  isNested,
}: ChannelContentProps<Title>) {
  const {
    scrollContainerRef,
    activePage,
    canScrollBackward,
    canScrollForward,
    scrollToNextPage,
    scrollToPreviousPage,
  } = useCarousel({rotate: true});
  const {data: pagination} =
    useChannelContent<ChannelContentItem<Title>>(channel);

  return (
    <Fragment>
      <ChannelHeader
        channel={channel as Channel}
        isNested={isNested}
        margin="mb-18"
      />
      <div className={'w-[100vw] md:h-[100dvh] h-[374px]'}>

        <div className="gap-24 md:flex max-md:w-[100vw] w-[100vw] h-[100dvh] absolute top-0 left-0">
          <div className="relative flex-auto">
            <div
              ref={scrollContainerRef}
              className="hidden-scrollbar flex h-full select-none snap-x snap-mandatory snap-always items-center overflow-x-auto"
            >
              {pagination?.data.map((item, index) => (
                <Slide key={item.id} item={item} index={index} />
              ))}
            </div>
            <div className="absolute bottom-[-8px] z-9999 w-[calc(100vw-60px)] h-[200px] flex items-center justify-start">
              <div className="hidden md:block">
                <IconButton
                  variant="text"
                  className={'h-[156px]'}
                  size="lg"
                  color="white"
                  disabled={!canScrollBackward}
                  onClick={() => scrollToPreviousPage()}
                >
                  <ChevronLeftIcon className={'!size-[100px]'} />
                </IconButton>
              </div>
              <div className={'w-[calc(100%-120px)]'}>
                <UpNext titles={pagination?.data ?? []} activePage={activePage} />
              </div>
              <div className="hidden md:block">
                <IconButton
                  className={'h-[156px]'}
                  variant="text"
                  size="lg"
                  color="white"
                  disabled={!canScrollForward}
                  onClick={() => scrollToNextPage()}
                >
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>


      </div>
    </Fragment>
  );
}

interface SlideProps {
  item: Title;
  index: number;
}
function Slide({item, index}: SlideProps) {
  return (
    <div className="relative h-full w-full flex-shrink-0 snap-start snap-normal overflow-hidden">
      <TitleBackdrop
        size={'md:h-[100vh] w-[100vw] h-[50vh] max-md:max-h-[400px]'}
        title={item}
        lazy={index > 0}
        className="min-h-240 md:min-h-0 w-[100vw]"
        wrapperClassName="h-full"
      />
      <div className="absolute inset-0 isolate flex h-full w-full items-center justify-start gap-24 rounded p-30 text-white md:items-end">
        <div className="absolute left-0 h-full w-full bg-gradient-to-b from-black/40 max-md:top-0 md:bottom-0 md:h-3/4 md:bg-gradient-to-t md:from-black/100" />
        {/*<TitlePoster*/}
        {/*  title={item}*/}
        {/*  size="max-h-320"*/}
        {/*  srcSize="md"*/}
        {/*  className="z-10 shadow-md max-md:hidden"*/}
        {/*/>*/}
        <div className="z-10 text-lg md:max-w-620 absolute md:bottom-[250px] bottom-16 left-16  md:left-[70px]">

          <TitleRating score={item.rating} />

          <div className="my-8 text-2xl md:text-5xl">
            <TitleLink title={item} />
          </div>

          {item.description && (
            <p className="max-md:hidden">{item.description}</p>
          )}

          {item.primary_video && (
            <Button
              variant="flat"
              color="primary"
              startIcon={<MediaPlayIcon />}
              radius="rounded-full"
              className="mt-24 md:min-h-42 md:min-w-144"
              elementType={Link}
              to={getWatchLink(item.primary_video)}
            >
              {item.primary_video.category === 'full' ? (
                <Trans message="Watch now" />
              ) : (
                <Trans message="Play trailer" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface UpNextProps {
  titles: Title[];
  activePage: number;
}
function UpNext({titles, activePage}: UpNextProps) {
  const [itemsVisible, setItemsVisible] = useState(getItemsVisible());

  useEffect(() => {
    function handleResize() {
      setItemsVisible(getItemsVisible());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getItemsVisible() {
    return window.innerWidth / 300;
  }

  const itemCount = titles.length;
  const start = activePage + 1;
  const end = start + itemsVisible;
  const items = titles.slice(start, end);
  if (end > itemCount) {
    items.push(...titles.slice(0, end - itemCount));
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <div className="w-full flex-shrink-0 max-md:hidden px-16">
        {/*<div className="mb-12 text-lg font-semibold">*/}
        {/*  <Trans message="Up next" />*/}
        {/*</div>*/}
        <div className="flex flex-row gap-16 relative">
          {items.map(item => (
            <m.div
              key={item.id}
              className="relative  flex-auto max-w-[300px]"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
            >
              <TitleBackdrop
                title={item}
                className="mb-6 rounded"
                size="w-full max-h-[220px]"
                srcSize="md"
                wrapWithLink
                showPlayButton
              />
              <div className={'absolute bottom-12 left-12'}>
                <div className="mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                  <TitleLink title={item} className="text-base font-medium" />
                </div>
                <div>
                  <TitleRating score={item.rating} className="text-sm" />
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
