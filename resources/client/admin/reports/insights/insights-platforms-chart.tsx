import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';
import {PolarAreaChart} from '@common/charts/polar-area-chart';

export function InsightsPlatformsChart() {
  return (
    <InsightsAsyncChart metric="platforms">
      <PolarAreaChart
        colSpan="col-span-5"
        title={<Trans message="Top platforms" />}
      />
    </InsightsAsyncChart>
  );
}
