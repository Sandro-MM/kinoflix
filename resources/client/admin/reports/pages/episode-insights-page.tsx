import React from 'react';
import {PageStatus} from '@common/http/page-status';
import {
  ModelInsightsPageLayout,
  ModelInsightsPageTitle,
} from '@app/admin/reports/model-insights-page-layout';
import {TitleLinkWithEpisodeNumber} from '@app/titles/title-link';
import {InsightsPlaysChart} from '@app/admin/reports/insights/insights-plays-chart';
import {InsightsDevicesChart} from '@app/admin/reports/insights/insights-devices-chart';
import {InsightsLocationsChart} from '@app/admin/reports/insights/insights-locations-chart';
import {InsightsPlatformsChart} from '@app/admin/reports/insights/insights-platforms-chart';
import {useEpisode} from '@app/episodes/requests/use-episode';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {EpisodeLink} from '@app/episodes/episode-link';

export function EpisodeInsightsPage() {
  const query = useEpisode('episode');

  return query.data ? (
    <ModelInsightsPageLayout
      reportModel={`episode=${query.data.episode.id}`}
      name={query.data.episode.name}
      backLink="../../../../"
      title={
        <ModelInsightsPageTitle
          image={
            <EpisodePoster
              episode={query.data.episode}
              title={query.data.title}
              srcSize="sm"
            />
          }
          name={
            <EpisodeLink
              episode={query.data.episode}
              title={query.data.title}
              seasonNumber={query.data.episode.season_number}
            />
          }
          description={
            <TitleLinkWithEpisodeNumber
              episode={query.data.episode}
              title={query.data.title}
            />
          }
        />
      }
    >
      <InsightsPlaysChart />
      <InsightsDevicesChart />
      <InsightsLocationsChart />
      <InsightsPlatformsChart />
    </ModelInsightsPageLayout>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );
}
