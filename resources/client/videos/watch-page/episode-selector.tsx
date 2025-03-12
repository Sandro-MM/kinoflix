import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@ui/buttons/icon-button';
import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useDarkThemeVariables} from '@ui/themes/use-dark-theme-variables';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {Accordion, AccordionItem} from '@ui/accordion/accordion';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import React, {Fragment, ReactElement, ReactNode, useState} from 'react';
import {ArrowBackIcon} from '@ui/icons/material/ArrowBack';
import {FullPageLoader} from '@ui/progress/full-page-loader';
import {ArrowForwardIcon} from '@ui/icons/material/ArrowForward';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {TvIcon} from '@ui/icons/material/Tv';
import {AnimatePresence, m} from 'framer-motion';
import {useSeasonEpisodes} from '@app/titles/requests/use-season-episodes';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {Tooltip} from '@ui/tooltip/tooltip';
import {MediaEpisodesIcon} from '@ui/icons/media/media-episodes';
import {List, ListItem} from '@ui/list/list';

interface Props {
  title: Title;
  currentEpisode: Episode;
  onSelected: (episode: Episode) => void;
  trigger?: ReactElement;
}
export function EpisodeSelector(props: Props) {
  const trigger = props.trigger || (
    <Tooltip label={<Trans message="Episodes" />}>
      <IconButton>
        <MediaEpisodesIcon />
      </IconButton>
    </Tooltip>
  );
  return (
    <DialogTrigger type="popover" placement="top">
      {trigger}
      <EpisodeSelectorDialog {...props} />
    </DialogTrigger>
  );
}

type SelectorPanel = 'episodes' | 'seasons';

function EpisodeSelectorDialog({title, currentEpisode, onSelected}: Props) {
  const {close} = useDialogContext();
  const darkThemeVars = useDarkThemeVariables();
  const [activeTab, setActiveTab] = useState<SelectorPanel>('episodes');
  const [selectedSeason, setSelectedSeason] = useState(
    currentEpisode.season_number,
  );

  const heading =
    activeTab === 'episodes' ? (
      <Trans message="Season :number" values={{number: selectedSeason}} />
    ) : (
      title.name
    );

  const showBackButton = activeTab === 'episodes' && title.seasons_count > 1;

  return (
    <Dialog style={darkThemeVars} className="dark" size="lg">
      <DialogHeader
        titleTextSize="text-md"
        closeButtonSize="md"
        className="h-60"
        padding={showBackButton ? 'pl-10 pr-20' : 'px-20'}
        leftAdornment={
          showBackButton ? (
            <IconButton onClick={() => setActiveTab('seasons')}>
              <ArrowBackIcon />
            </IconButton>
          ) : null
        }
      >
        {heading}
      </DialogHeader>
      <DialogBody
        className="stable-scrollbar relative h-780 text-main md:h-400"
        padding="p-0"
      >
        <AnimatePresence initial={false}>
          {activeTab === 'episodes' ? (
            <EpisodeList
              title={title}
              season={selectedSeason}
              onSelected={episode => {
                close();
                onSelected(episode);
              }}
              selectedEpisodeId={
                currentEpisode.season_number === selectedSeason
                  ? currentEpisode.id
                  : undefined
              }
            />
          ) : (
            <SeasonList
              title={title}
              selectedSeason={selectedSeason}
              onSelected={number => {
                setSelectedSeason(number);
                setActiveTab('episodes');
              }}
            />
          )}
        </AnimatePresence>
      </DialogBody>
    </Dialog>
  );
}

interface SeasonListProps {
  title: Title;
  onSelected: (number: number) => void;
  selectedSeason?: number;
}
function SeasonList({title, onSelected, selectedSeason}: SeasonListProps) {
  return (
    <AnimatedPanel name="seasons">
      <List>
        {[...new Array(title.seasons_count).keys()].map(season => {
          const seasonNumber = season + 1;
          return (
            <ListItem
              className="group"
              endIcon={
                <ArrowForwardIcon
                  className="invisible group-hover:visible"
                  size="sm"
                />
              }
              showCheckmark
              isSelected={selectedSeason === seasonNumber}
              onSelected={() => onSelected(seasonNumber)}
              key={seasonNumber}
              onClick={() => onSelected(seasonNumber)}
            >
              <Trans message="Season :number" values={{number: seasonNumber}} />
            </ListItem>
          );
        })}
      </List>
    </AnimatedPanel>
  );
}

interface EpisodeListProps {
  title: Title;
  season: number;
  onSelected: (episode: Episode) => void;
  selectedEpisodeId: number | undefined;
}
function EpisodeList({
  title,
  season,
  selectedEpisodeId,
  onSelected,
}: EpisodeListProps) {
  const query = useSeasonEpisodes(
    undefined,
    {truncateDescriptions: 'true'},
    {titleId: title.id, season},
  );

  let content: ReactNode;

  if (query.noResults) {
    content = (
      <IllustratedMessage
        className="pt-56"
        imageMargin="mb-8"
        image={
          <div className="text-muted">
            <TvIcon size="xl" />
          </div>
        }
        imageHeight="h-auto"
        title={<Trans message="This season has not episodes yet." />}
      />
    );
  } else if (query.isLoading) {
    content = <FullPageLoader />;
  } else {
    content = (
      <Fragment>
        <Accordion
          defaultExpandedValues={
            selectedEpisodeId ? [selectedEpisodeId] : undefined
          }
        >
          {query.items.map(episode => (
            <AccordionItem
              value={episode.id}
              key={episode.id}
              buttonPadding="py-10 pl-26 pr-10"
              label={
                <div className="flex items-center gap-14">
                  <div>{episode.episode_number}</div>
                  <div>{episode.name}</div>
                </div>
              }
            >
              <EpisodeItem
                title={title}
                episode={episode}
                isSelected={episode.id === selectedEpisodeId}
                onSelected={() => onSelected(episode)}
              />
            </AccordionItem>
          ))}
        </Accordion>
        <InfiniteScrollSentinel query={query} />
      </Fragment>
    );
  }

  return <AnimatedPanel name="episodes">{content}</AnimatedPanel>;
}

interface EpisodeItemProps {
  title: Title;
  episode: Episode;
  isSelected: boolean;
  onSelected: () => void;
}
function EpisodeItem({
  episode,
  title,
  isSelected,
  onSelected,
}: EpisodeItemProps) {
  const isPlayable = !isSelected && episode.primary_video;
  return (
    <div
      className="flex gap-20 text-lg text-main"
      onClick={isPlayable ? () => onSelected() : undefined}
    >
      <EpisodePoster
        wrapWithLink={false}
        size="w-84 md:w-224"
        title={title}
        episode={episode}
        className="overflow-hidden rounded-panel"
      >
        {isPlayable ? (
          <IconButton variant="flat" color="white" radius="rounded-full">
            <MediaPlayIcon />
          </IconButton>
        ) : undefined}
      </EpisodePoster>
      <p className="pt-12 text-sm">{episode.description}</p>
    </div>
  );
}

const variants = {
  enter: (activeTab: SelectorPanel) => {
    return {
      x: activeTab === 'episodes' ? 608 : -608,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: SelectorPanel) => {
    return {
      zIndex: 0,
      x: direction === 'seasons' ? 608 : -608,
      opacity: 0,
    };
  },
};

interface AnimatedPanelProps {
  name: SelectorPanel;
  children: ReactNode;
}
function AnimatedPanel({name, children}: AnimatedPanelProps) {
  return (
    <m.div
      className="absolute h-full w-full"
      key={name}
      custom={name}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{type: 'tween', duration: 0.15}}
    >
      {children}
    </m.div>
  );
}
