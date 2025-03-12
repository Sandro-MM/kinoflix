import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';
import {TopModelsChartLayout} from '@app/admin/reports/top-models-chart-layout';

export function InsightsUsersChart() {
  return (
    <InsightsAsyncChart metric="users">
      <TopModelsChartLayout title={<Trans message="Top users" />} />
    </InsightsAsyncChart>
  );
}
