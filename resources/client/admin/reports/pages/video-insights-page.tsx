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
import {useVideo} from '@app/admin/videos/requests/use-video';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {VideoThumbnail} from '@app/videos/video-thumbnail';

export function VideoInsightsPage() {
  const query = useVideo();
  const video = query.data?.video;

  return video ? (
    <ModelInsightsPageLayout
      reportModel={`video=${video.id}`}
      name={video.name}
      title={
        <ModelInsightsPageTitle
          image={<VideoThumbnail video={video} srcSize="sm" />}
          name={
            <Link
              to={getWatchLink(video)}
              className="hover:underline"
              target="_blank"
            >
              {video.name}
            </Link>
          }
          description={<TitleLink title={video.title!} />}
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
