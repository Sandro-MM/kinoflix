import {useCallback, useEffect, useRef, useState} from 'react';
import debounce from 'just-debounce-it';
import {useLayoutEffect} from '@react-aria/utils';

interface Options {
  rotate?: boolean;
}

const containerClassName =
  'content-carousel content-grid relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-24 snap-always snap-x snap-mandatory hidden-scrollbar scroll-smooth';
const itemClassName = 'snap-start snap-normal';

export function useCarousel({rotate = false}: Options = {}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemWidth = useRef<number>(0);
  const perPage = useRef<number>(5);

  const [canScrollBackward, setCanScrollBackward] = useState(rotate);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [activePage, setActivePage] = useState(0);

  const updateNavStatus = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el && itemWidth.current) {
      if (!rotate) {
        setCanScrollForward(
          el.scrollWidth - 1 > el.scrollLeft + el.clientWidth
        );
        setCanScrollBackward(el.scrollLeft > 0);
      }
      const pageWidth = el.clientWidth;
      const activePage = Math.round(el.scrollLeft / pageWidth);
      setActivePage(activePage);
    }
  }, [rotate]);

  // enable/disable navigation buttons based on element scroll offset
  useEffect(() => {
    const el = scrollContainerRef.current;
    const handleScroll = debounce(() => updateNavStatus(), 100);
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [updateNavStatus]);

  // get width for first grid item
  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      perPage.current = Number(
        getComputedStyle(el).getPropertyValue('--nVisibleItems')
      );
      const firstGridItem = el.children.item(0);
      const observer = new ResizeObserver(entries => {
        itemWidth.current = entries[0].contentRect.width;
        updateNavStatus();
      });
      if (firstGridItem) {
        observer.observe(firstGridItem);
      }
      return () => observer.unobserve(el);
    }
  }, [updateNavStatus]);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      setActivePage(index);
      const amount = itemWidth.current * index;
      scrollContainerRef.current.scrollTo({left: amount});
    }
  }, []);

  const scrollToPreviousPage = useCallback(() => {
    if (scrollContainerRef.current) {
      const pageWidth = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollLeft =
        !currentScroll && rotate
          ? scrollContainerRef.current.scrollWidth - pageWidth
          : currentScroll - pageWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
      });
    }
  }, [rotate]);

  const scrollToNextPage = useCallback(() => {
    if (scrollContainerRef.current) {
      const pageWidth = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollLeft =
        rotate &&
        currentScroll + pageWidth >= scrollContainerRef.current.scrollWidth
          ? 0
          : (activePage + 1) * pageWidth;
      scrollContainerRef.current.scrollTo({left: scrollLeft});
    }
  }, [activePage, rotate]);

  return {
    scrollContainerRef,
    scrollToIndex,
    scrollToPreviousPage,
    scrollToNextPage,
    canScrollForward,
    canScrollBackward,
    activePage,
    containerClassName,
    itemClassName,
  };
}
