import {
  SearchResponse,
  useSearchResults,
} from '@app/search/requests/use-search-results';
import {useParams} from 'react-router';
import {SitePageLayout} from '@app/site-page-layout';
import {Trans} from '@ui/i18n/trans';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import React, {Fragment, useMemo} from 'react';
import {Title, TITLE_MODEL} from '@app/titles/models/title';
import {Person, PERSON_MODEL} from '@app/titles/models/person';
import {ContentGrid} from '@app/channels/content-grid/channel-content-grid';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {useTrans} from '@ui/i18n/use-trans';
import {TextField} from '@ui/forms/input-field/text-field/text-field';
import {message} from '@ui/i18n/message';
import {UseQueryResult} from '@tanstack/react-query';
import {useSettings} from '@ui/settings/use-settings';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {SearchIcon} from '@ui/icons/material/Search';
import {PageStatus} from '@common/http/page-status';

export function SearchPage() {
  const {query: searchTerm} = useParams();
  const query = useSearchResults('searchPage', searchTerm);

  return (
    <Fragment>
      <PageMetaTags query={query} />
      <SitePageLayout>
        <section className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
          <main>
            <MobileSearchBar />
            <PageContent query={query} />
          </main>
        </section>
      </SitePageLayout>
    </Fragment>
  );
}

function MobileSearchBar() {
  const {searchQuery = ''} = useParams();
  const navigate = useNavigate();
  const {trans} = useTrans();

  return (
    <TextField
      defaultValue={searchQuery}
      onChange={e => {
        navigate(`/search/${e.target.value}`, {replace: true});
      }}
      autoFocus
      className="w-full md:hidden"
      size="lg"
      placeholder={trans(message('Search...'))}
    />
  );
}

interface PageContentProps {
  query: UseQueryResult<SearchResponse>;
}
function PageContent({query}: PageContentProps) {
  const {branding} = useSettings();

  if (query.data) {
    if (query.data.results.length === 0) {
      return (
        <IllustratedMessage
          className="mt-40"
          image={<SearchIcon size="xl" />}
          imageHeight="h-auto"
          imageMargin="mb-12"
          title={
            <Trans
              message={`Could not find any results for “:query”`}
              values={{query: query.data.query}}
            />
          }
          description={<Trans message="Try a different search query." />}
        />
      );
    }
    return <SearchResults query={query} />;
  }

  if (query.fetchStatus === 'idle') {
    return (
      <IllustratedMessage
        className="mt-40"
        image={<SearchIcon size="xl" />}
        imageHeight="h-auto"
        imageMargin="mb-12"
        title={
          <Trans
            message="Search :siteName"
            values={{siteName: branding.site_name}}
          />
        }
        description={
          <Trans message="Find movies, tv series, people and more." />
        }
      />
    );
  }

  return <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />;
}

interface PageContentProps {
  query: UseQueryResult<SearchResponse>;
}
function SearchResults({query}: PageContentProps) {
  const {query: searchTerm} = useParams();
  const {movies, series, people} = useMemo(() => {
    const movies: Title[] = [];
    const series: Title[] = [];
    const people: Person[] = [];

    query.data?.results.forEach(result => {
      if (result.model_type === TITLE_MODEL && result.is_series) {
        series.push(result);
      } else if (result.model_type === TITLE_MODEL && !result.is_series) {
        movies.push(result);
      } else if (result.model_type === PERSON_MODEL) {
        people.push(result);
      }
    });

    return {movies, series, people};
  }, [query]);

  return (
    <Fragment>
      <SiteSectionHeading
        className="my-24 md:mb-48"
        headingType="h1"
        fontSize="text-xl md:text-3xl"
        hideBorder
      >
        <Trans
          message="Search results for: “:query“"
          values={{query: searchTerm}}
        />
      </SiteSectionHeading>
      {movies.length > 0 && (
        <div className="mb-48">
          <SiteSectionHeading fontSize="text-2xl">
            <Trans message="Movies" />
          </SiteSectionHeading>
          <ContentGrid content={movies} variant="portrait" />
        </div>
      )}
      {series.length > 0 && (
        <div className="mb-48">
          <SiteSectionHeading fontSize="text-2xl">
            <Trans message="Series" />
          </SiteSectionHeading>
          <ContentGrid content={series} variant="portrait" />
        </div>
      )}
      {people.length > 0 && (
        <div className="mb-48">
          <SiteSectionHeading fontSize="text-2xl">
            <Trans message="People" />
          </SiteSectionHeading>
          <ContentGrid content={people} variant="portrait" />
        </div>
      )}
    </Fragment>
  );
}
