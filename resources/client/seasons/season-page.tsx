import React, {Fragment} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {GetSeasonResponse, useSeason} from '@app/seasons/requests/use-season';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {Title} from '@app/titles/models/title';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {Trans} from '@ui/i18n/trans';
import {TitleLink} from '@app/titles/title-link';
import {SeasonLink} from '@app/seasons/season-link';
import {useParams} from 'react-router';
import clsx from 'clsx';
import {SitePageLayout} from '@app/site-page-layout';
import {EpisodeListItem} from '@app/seasons/episode-list-item';
import {useSeasonEpisodes} from '@app/titles/requests/use-season-episodes';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';

export function SeasonPage() {
  const query = useSeason('seasonPage');
  const content = query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent data={query.data} />
    </Fragment>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return <SitePageLayout>{content}</SitePageLayout>;
}

interface PageContentProps {
  data: GetSeasonResponse;
}
function PageContent({data}: PageContentProps) {
  const {title, season} = data;
  return (
    <div>
      <TitlePageHeaderImage title={title} season={season} />
      <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
        <div className="mb-24 flex items-center gap-12">
          <TitlePoster size="w-70" srcSize="sm" title={title} />
          <div>
            <TitleLink title={title} color="primary" className="text-xl" />
            <div className="text-lg">
              <Trans message="Episode list" />
            </div>
          </div>
        </div>
        <SeasonList title={title} />
        <EpisodeList data={data} />
        <SeasonList title={title} />
      </div>
    </div>
  );
}

interface SeasonListProps {
  title: Title;
}
function SeasonList({title}: SeasonListProps) {
  const {season} = useParams();
  return (
    <div>
      <div className="mb-4 text-base font-semibold">
        <Trans message="Seasons" />:
      </div>
      <div className="mb-34 flex flex-wrap items-center gap-10">
        {[...new Array(title.seasons_count).keys()].map(index => {
          const number = index + 1;
          const isActive = season === `${number}`;
          return (
            <SeasonLink
              key={number}
              title={title}
              seasonNumber={number}
              className={clsx(
                'flex h-30 w-30 flex-shrink-0 items-center justify-center rounded border text-base',
                isActive
                  ? 'pointer-events-none bg-primary text-white'
                  : 'text-primary',
              )}
            >
              {number}
            </SeasonLink>
          );
        })}
      </div>
    </div>
  );
}

interface EpisodeListProps {
  data: GetSeasonResponse;
}
function EpisodeList({data: {episodes, title}}: EpisodeListProps) {
  const query = useSeasonEpisodes(episodes);
  return (
    <main>
      {query.items.map(episode => (
        <EpisodeListItem
          key={episode.id}
          episode={episode}
          title={title}
          allowRating
          showPlayButton
          className="mb-34"
        />
      ))}
      <InfiniteScrollSentinel query={query} />
    </main>
  );
}
