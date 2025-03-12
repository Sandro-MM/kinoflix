import {PageStatus} from '@common/http/page-status';
import {Title} from '@app/titles/models/title';
import {PageMetaTags} from '@common/http/page-meta-tags';
import React, {Fragment} from 'react';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {
  GetEpisodeResponse,
  useEpisode,
} from '@app/episodes/requests/use-episode';
import {ChipList} from '@ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@ui/forms/input-field/chip-field/chip';
import {Link} from 'react-router';
import {TitlePageCast} from '@app/titles/pages/title-page/sections/title-page-cast';
import {RelatedTitlesPanel} from '@app/titles/related-titles-panel';
import {CompactCredits} from '@app/titles/compact-credits';
import {TitlePageAsideLayout} from '@app/titles/pages/title-page/title-page-aside-layout';
import {WatchlistButton} from '@app/user-lists/watchlist-button';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {getGenreLink} from '@app/titles/genre-link';
import {SitePageLayout} from '@app/site-page-layout';
import {EpisodePageHeader} from '@app/episodes/episode-page-header';
import {TitlePageVideoGrid} from '@app/titles/pages/title-page/sections/title-page-video-grid';
import {useIsStreamingMode} from '@app/videos/use-is-streaming-mode';
import {WatchNowButton} from '@app/titles/pages/title-page/watch-now-button';
import {Episode} from '@app/titles/models/episode';
import {TitlePageSections} from '@app/titles/pages/title-page/sections/title-page-sections';
import {TitlePageEpisodeGrid} from '@app/titles/pages/title-page/sections/title-page-episode-grid';
import {Trans} from '@ui/i18n/trans';
import {useSettings} from '@ui/settings/use-settings';
import {TruncatedDescription} from '@common/ui/other/truncated-description';

export function EpisodePage() {
  const query = useEpisode('episodePage');

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
  data: GetEpisodeResponse;
}
function PageContent({data}: PageContentProps) {
  const {episode, title} = data;
  return (
    <div>
      <TitlePageHeaderImage title={title} episode={episode} />
      <div className="container mx-auto mt-12 px-14 md:mt-40 md:px-24">
        <div className="items-start gap-54 md:flex">
          <Aside title={title} episode={episode} />
          <div className="flex-auto">
            <EpisodePageHeader title={title} episode={episode} />
            <MainContent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MainContentProps {
  data: GetEpisodeResponse;
}
function MainContent({data}: MainContentProps) {
  const {episode, title, credits} = data;
  const {title_page} = useSettings();
  return (
    <main className="@container">
      {title.genres?.length ? (
        <ChipList>
          {title.genres.map(genre => (
            <Chip
              className="capitalize"
              elementType={Link}
              to={getGenreLink(genre)}
              key={genre.id}
            >
              {genre.display_name || genre.name}
            </Chip>
          ))}
        </ChipList>
      ) : null}
      <TruncatedDescription
        className="mt-16"
        description={episode.description}
      />
      <CompactCredits credits={credits} />
      {title_page?.sections.map(name => (
        <EpisodePageSection key={name} name={name} data={data} />
      ))}
    </main>
  );
}

interface EpisodePageSectionProps {
  data: GetEpisodeResponse;
  name: (typeof TitlePageSections)[number];
}
function EpisodePageSection({name, data}: EpisodePageSectionProps) {
  switch (name) {
    case 'videos':
      return <TitlePageVideoGrid title={data.title} episode={data.episode} />;
    case 'cast':
      return <TitlePageCast credits={data.credits?.actors} />;
    case 'related':
      return <RelatedTitlesPanel title={data.title} />;
    case 'episodes':
      return (
        <TitlePageEpisodeGrid
          data={data}
          label={<Trans message="Other episodes" />}
        />
      );
    default:
      return null;
  }
}

interface AsideProps {
  title: Title;
  episode: Episode;
}
function Aside({title, episode}: AsideProps) {
  const isStreamingMode = useIsStreamingMode();
  return (
    <TitlePageAsideLayout
      className="max-md:hidden"
      poster={<TitlePoster title={title} size="w-full" srcSize="lg" />}
    >
      {isStreamingMode && episode.primary_video && (
        <WatchNowButton
          video={episode.primary_video}
          variant="flat"
          defaultLabel
        />
      )}
      <WatchlistButton
        item={title}
        variant={isStreamingMode ? 'outline' : 'flat'}
      />
    </TitlePageAsideLayout>
  );
}
