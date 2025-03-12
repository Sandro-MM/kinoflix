import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';
import {TopModelsChartLayout} from '@app/admin/reports/top-models-chart-layout';

export function InsightsMoviesChart() {
  return (
    <InsightsAsyncChart metric="movies">
      <TopModelsChartLayout title={<Trans message="Most played movies" />} />
    </InsightsAsyncChart>
  );
}
