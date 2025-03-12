import React, {Fragment, ReactNode, useState} from 'react';
import {useSeasonEpisodes} from '@app/titles/requests/use-season-episodes';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {ContentGridLayout} from '@app/channels/content-grid/content-grid-layout';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {Link, useParams} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Episode} from '@app/titles/models/episode';
import {Title} from '@app/titles/models/title';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {Button} from '@ui/buttons/button';
import {message} from '@ui/i18n/message';
import {SortIcon} from '@ui/icons/material/Sort';
import {ExpandMoreIcon} from '@ui/icons/material/ExpandMore';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Skeleton} from '@ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {FormattedDuration} from '@ui/i18n/formatted-duration';
import {GetTitleResponse} from '@app/titles/requests/use-title';

interface Props {
  data: GetTitleResponse;
  label?: ReactNode;
  showSeasonSelector?: boolean;
}
export function TitlePageEpisodeGrid({data, label, showSeasonSelector}: Props) {
  const {season} = useParams();
  const [selectedSeason, setSelectedSeason] = useState<number>(
    season ? parseInt(season) : 1,
  );
  const query = useSeasonEpisodes(
    data.episodes,
    {
      perPage: 21,
      excludeDescription: 'true',
    },
    {
      season: selectedSeason,
      willSortOrFilter: true,
      defaultOrderBy: 'episode_number',
      defaultOrderDir: 'asc',
      titleId: data.title.id,
    },
  );
  const {isInitialLoading, items, sortDescriptor, setSortDescriptor} = query;

  return (
    <div className="mt-48">
      <SiteSectionHeading
        wrap
        actions={
          <Fragment>
            {showSeasonSelector && (
              <SeasonSelector
                selectedSeason={selectedSeason}
                onSeasonChange={setSelectedSeason}
                seasonCount={data.title.seasons_count}
              />
            )}
            <SortButton
              value={`${sortDescriptor.orderBy}:${sortDescriptor?.orderDir}`}
              onValueChange={value => {
                const [orderBy, orderDir] = value.split(':');
                setSortDescriptor({
                  orderBy,
                  orderDir: orderDir as 'asc' | 'desc',
                });
              }}
            />
          </Fragment>
        }
      >
        {label || <Trans message="Episodes" />}
      </SiteSectionHeading>
      <AnimatePresence initial={false} mode="wait">
        {isInitialLoading ? (
          <SkeletonGrid />
        ) : (
          <EpisodeGrid episodes={items} title={data.title} query={query} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface GridItemProps {
  episode: Episode;
  title: Title;
}
function GridItem({episode, title}: GridItemProps) {
  const runtime = episode.runtime || title.runtime;
  const name = (
    <Fragment>
      <CompactSeasonEpisode className="uppercase" episode={episode} /> -{' '}
      {episode.name}
    </Fragment>
  );
  return (
    <div>
      <div className="relative">
        <EpisodePoster
          episode={episode}
          title={title}
          srcSize="md"
          showPlayButton
          rightAction={
            runtime ? (
              <span className="rounded bg-black/50 p-4 text-xs font-medium text-white">
                <FormattedDuration minutes={runtime} verbose />
              </span>
            ) : null
          }
        />
      </div>
      <div className="mt-10">
        {episode.release_date && (
          <div className="mb-2 text-sm text-muted">
            <FormattedDate date={episode.release_date} timezone="utc" />
          </div>
        )}
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
          {episode.primary_video ? (
            <Link
              className="rounded outline-none hover:underline focus-visible:ring focus-visible:ring-offset-2"
              to={getWatchLink(episode.primary_video)}
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </div>
      </div>
    </div>
  );
}

interface EpisodeGridProps {
  episodes: Episode[];
  title: Title;
  query: UseInfiniteDataResult<Episode>;
}
function EpisodeGrid({title, episodes, query}: EpisodeGridProps) {
  return (
    <m.div key="episode-grid" {...opacityAnimation}>
      <ContentGridLayout variant="landscape">
        {episodes.map(episode => (
          <GridItem key={episode.id} episode={episode} title={title} />
        ))}
      </ContentGridLayout>
      <InfiniteScrollSentinel
        query={query}
        variant="loadMore"
        size="sm"
        loaderMarginTop="mt-16"
      />
    </m.div>
  );
}

function SkeletonGrid() {
  return (
    <m.div key="episode-grid" {...opacityAnimation}>
      <ContentGridLayout variant="landscape">
        {[...new Array(6).keys()].map(number => (
          <div key={number}>
            <Skeleton variant="rect" size="aspect-video" animation="pulsate" />
            <div className="mt-10 min-h-44">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          </div>
        ))}
      </ContentGridLayout>
    </m.div>
  );
}

interface SeasonSelectorProps {
  selectedSeason: number;
  onSeasonChange: (newSeason: number) => void;
  seasonCount: number;
}
function SeasonSelector({
  selectedSeason,
  onSeasonChange,
  seasonCount,
}: SeasonSelectorProps) {
  return (
    <MenuTrigger
      selectedValue={selectedSeason}
      onSelectionChange={newValue => onSeasonChange(newValue as number)}
      selectionMode="single"
    >
      <Button variant="outline" startIcon={<ExpandMoreIcon />} className="mr-4">
        <Trans message="Season :number" values={{number: selectedSeason}} />
      </Button>
      <Menu>
        {[...new Array(seasonCount).keys()].map(number => {
          const seasonNumber = number + 1;
          return (
            <MenuItem value={seasonNumber} key={seasonNumber}>
              <Trans message="Season :number" values={{number: seasonNumber}} />
            </MenuItem>
          );
        })}
      </Menu>
    </MenuTrigger>
  );
}

const SortOptions = [
  {
    value: 'episode_number:desc',
    label: message('Newest'),
  },
  {
    value: 'episode_number:asc',
    label: message('Oldest'),
  },
];

interface SortButtonProps {
  value: string;
  onValueChange: (newValue: string) => void;
}
function SortButton({value, onValueChange}: SortButtonProps) {
  let selectedOption = SortOptions.find(option => option.value === value);
  if (!selectedOption) {
    selectedOption = SortOptions[0];
  }
  return (
    <MenuTrigger
      selectedValue={value}
      onSelectionChange={newValue => onValueChange(newValue as string)}
      selectionMode="single"
    >
      <Button variant="outline" startIcon={<SortIcon />}>
        <Trans {...selectedOption.label} />
      </Button>
      <Menu>
        {SortOptions.map(option => (
          <MenuItem value={option.value} key={option.value}>
            <Trans {...option.label} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
