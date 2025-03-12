import React, {useContext} from 'react';
import {DateRangeValue} from '@ui/forms/input-field/date/date-range-picker/date-range-value';

export interface InsightsChartsContextValue {
  dateRange: DateRangeValue;
  model: string;
}

export const InsightsChartsContext =
  React.createContext<InsightsChartsContextValue>(null!);

export function useInsightsChartContext() {
  return useContext(InsightsChartsContext);
}
