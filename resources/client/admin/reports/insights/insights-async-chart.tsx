import {cloneElement, ReactElement, useCallback, useRef, useState} from 'react';
import {BaseChartProps} from '@common/charts/base-chart';
import {UseQueryResult} from '@tanstack/react-query';
import {
  FetchInsightsReportResponse,
  InsightsReportMetric,
  useInsightsReport,
} from '@app/admin/reports/requests/use-insights-report';
import {useInsightsChartContext} from '@app/admin/reports/insights/insights-charts-context';

interface Props {
  children:
    | ReactElement<BaseChartProps>
    | ((
        query: UseQueryResult<FetchInsightsReportResponse>
      ) => ReactElement<BaseChartProps>);
  metric: InsightsReportMetric;
}
export function InsightsAsyncChart({children, metric}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const {dateRange, model} = useInsightsChartContext();
  const query = useInsightsReport(
    {metrics: [metric], model, dateRange},
    {isEnabled}
  );
  const chart = typeof children === 'function' ? children(query) : children;
  const observerRef = useRef<IntersectionObserver>();

  const contentRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsEnabled(true);
            observerRef.current?.disconnect();
            observerRef.current = undefined;
          }
        },
        {threshold: 0.1} // if only header is visible, don't load
      );
      observerRef.current = observer;
      observer.observe(el);
    } else if (observerRef.current) {
      observerRef.current?.disconnect();
    }
  }, []);

  return cloneElement<BaseChartProps>(chart, {
    data: query.data?.report?.[metric],
    isLoading: query.isLoading,
    contentRef,
  });
}
