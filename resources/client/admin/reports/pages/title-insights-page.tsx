import React from 'react';
import {useTitle} from '@app/titles/requests/use-title';
import {PageStatus} from '@common/http/page-status';
import {
  ModelInsightsPageLayout,
  ModelInsightsPageTitle,
} from '@app/admin/reports/model-insights-page-layout';
import {useParams} from 'react-router';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import {InsightsPlaysChart} from '@app/admin/reports/insights/insights-plays-chart';
import {InsightsDevicesChart} from '@app/admin/reports/insights/insights-devices-chart';
import {InsightsLocationsChart} from '@app/admin/reports/insights/insights-locations-chart';
import {InsightsPlatformsChart} from '@app/admin/reports/insights/insights-platforms-chart';
import {InsightsSeasonsChart} from '@app/admin/reports/insights/insights-seasons-chart';
import {InsightsEpisodesChart} from '@app/admin/reports/insights/insights-episodes-chart';

export function TitleInsightsPage() {
  const {titleId} = useParams();
  const query = useTitle('title');

  return query.data ? (
    <ModelInsightsPageLayout
      reportModel={`title=${titleId}`}
      name={query.data.title.name}
      title={
        <ModelInsightsPageTitle
          image={<TitlePoster title={query.data.title} srcSize="sm" />}
          name={<TitleLink title={query.data.title} />}
          description={<span>{query.data.title.year}</span>}
        />
      }
    >
      <InsightsPlaysChart />
      <InsightsDevicesChart />
      <InsightsSeasonsChart />
      <InsightsEpisodesChart />
      <InsightsLocationsChart />
      <InsightsPlatformsChart />
    </ModelInsightsPageLayout>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );
}
