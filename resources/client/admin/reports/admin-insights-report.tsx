import React from 'react';
import {useOutletContext} from 'react-router';
import {AdminReportOutletContext} from '@app/admin/reports/mtdb-admin-report-page';
import {InsightsPlaysChart} from '@app/admin/reports/insights/insights-plays-chart';
import {InsightsDevicesChart} from '@app/admin/reports/insights/insights-devices-chart';
import {InsightsSeriesChart} from '@app/admin/reports/insights/insights-series-chart';
import {InsightsMoviesChart} from '@app/admin/reports/insights/insights-movies-chart';
import {InsightsVideosChart} from '@app/admin/reports/insights/insights-videos-chart';
import {InsightsUsersChart} from '@app/admin/reports/insights/insights-users-chart';
import {InsightsLocationsChart} from '@app/admin/reports/insights/insights-locations-chart';
import {InsightsPlatformsChart} from '@app/admin/reports/insights/insights-platforms-chart';
import {InsightsChartsContext} from '@app/admin/reports/insights/insights-charts-context';

export function AdminInsightsReport() {
  const {dateRange} = useOutletContext<AdminReportOutletContext>();
  const model = 'video_play=0';

  return (
    <div className="chart-grid">
      <InsightsChartsContext.Provider value={{dateRange, model}}>
        <InsightsPlaysChart />
        <InsightsDevicesChart />
        <InsightsSeriesChart />
        <InsightsMoviesChart />
        <InsightsVideosChart />
        <InsightsUsersChart />
        <InsightsLocationsChart />
        <InsightsPlatformsChart />
      </InsightsChartsContext.Provider>
    </div>
  );
}
