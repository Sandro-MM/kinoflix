import {LineChart} from '@common/charts/line-chart';
import {Trans} from '@ui/i18n/trans';
import {FormattedNumber} from '@ui/i18n/formatted-number';
import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';

export function InsightsPlaysChart() {
  return (
    <InsightsAsyncChart metric="plays">
      {({data}) => (
        <LineChart
          colSpan="col-span-8"
          title={<Trans message="Plays" />}
          hideLegend
          description={
            <Trans
              message=":count total plays"
              values={{
                count: (
                  <FormattedNumber value={data?.report.plays.total || 0} />
                ),
              }}
            />
          }
        />
      )}
    </InsightsAsyncChart>
  );
}
