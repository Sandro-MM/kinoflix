import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';
import {PolarAreaChart} from '@common/charts/polar-area-chart';

export function InsightsDevicesChart() {
  return (
    <InsightsAsyncChart metric="devices">
      <PolarAreaChart
        title={<Trans message="Top devices" />}
        colSpan="col-span-4"
      />
    </InsightsAsyncChart>
  );
}
