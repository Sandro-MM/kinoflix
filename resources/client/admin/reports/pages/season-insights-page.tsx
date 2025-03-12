import React from 'react';
import {PageStatus} from '@common/http/page-status';
import {
  ModelInsightsPageLayout,
  ModelInsightsPageTitle,
} from '@app/admin/reports/model-insights-page-layout';
import {TitleLink} from '@app/titles/title-link';
import {InsightsPlaysChart} from '@app/admin/reports/insights/insights-plays-chart';
import {InsightsDevicesChart} from '@app/admin/reports/insights/insights-devices-chart';
import {InsightsLocationsChart} from '@app/admin/reports/insights/insights-locations-chart';
import {InsightsPlatformsChart} from '@app/admin/reports/insights/insights-platforms-chart';
import {useSeason} from '@app/seasons/requests/use-season';
import {SeasonPoster} from '@app/seasons/season-poster';
import {SeasonLink} from '@app/seasons/season-link';

export function SeasonInsightsPage() {
  const query = useSeason('season');

  return query.data ? (
    <ModelInsightsPageLayout
      reportModel={`season=${query.data.season.id}`}
      name={`Season ${query.data.season.number}`}
      title={
        <ModelInsightsPageTitle
          image={
            <SeasonPoster
              season={query.data.season}
              title={query.data.title}
              srcSize="sm"
            />
          }
          name={
            <SeasonLink
              seasonNumber={query.data.season.number}
              title={query.data.title}
            />
          }
          description={<TitleLink title={query.data.title} />}
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
