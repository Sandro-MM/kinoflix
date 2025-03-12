import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {DateRangeValue} from '@ui/forms/input-field/date/date-range-picker/date-range-value';
import {apiClient} from '@common/http/query-client';
import {
  DatasetItem,
  LocationDatasetItem,
  ReportMetric,
} from '@common/admin/analytics/report-metric';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {User} from '@ui/types/user';
import {Title} from '@app/titles/models/title';
import {Video} from '@app/titles/models/video';
import {Episode} from '@app/titles/models/episode';
import {Season} from '@app/titles/models/season';

const endpoint = 'reports/insights';

export interface TopModelDatasetItem extends DatasetItem {
  model: Title | Season | Episode | Video | User;
}

export interface FetchInsightsReportResponse extends BackendResponse {
  report: {
    totalClicks: number;
    plays: ReportMetric;
    browsers: ReportMetric;
    locations: ReportMetric<LocationDatasetItem>;
    devices: ReportMetric;
    platforms: ReportMetric;
    movies: ReportMetric<TopModelDatasetItem>;
    series: ReportMetric<TopModelDatasetItem>;
    titles: ReportMetric<TopModelDatasetItem>;
    videos: ReportMetric<TopModelDatasetItem>;
    users: ReportMetric<TopModelDatasetItem>;
    seasons: ReportMetric<TopModelDatasetItem>;
    episodes: ReportMetric<TopModelDatasetItem>;
  };
}

export type InsightsReportMetric =
  | 'plays'
  | 'devices'
  | 'browsers'
  | 'platforms'
  | 'locations'
  | 'movies'
  | 'series'
  | 'titles'
  | 'seasons'
  | 'episodes'
  | 'users'
  | 'videos';

interface Payload {
  dateRange: DateRangeValue;
  model?: string;
  metrics?: InsightsReportMetric[];
}

interface Options {
  isEnabled: boolean;
}

export function useInsightsReport(payload: Payload, options: Options) {
  return useQuery({
    queryKey: [endpoint, payload],
    queryFn: () => fetchReport(endpoint, payload),
    placeholderData: keepPreviousData,
    enabled: options.isEnabled,
    staleTime: Infinity,
  });
}

function fetchReport<
  T extends FetchInsightsReportResponse = FetchInsightsReportResponse,
>(endpoint: string, payload: Payload): Promise<T> {
  const params: Record<string, any> = {
    model: payload.model,
    metrics: payload.metrics?.join(','),
  };
  params.startDate = payload.dateRange.start.toAbsoluteString();
  params.endDate = payload.dateRange.end.toAbsoluteString();
  params.timezone = payload.dateRange.start.timeZone;

  return apiClient.get(endpoint, {params}).then(response => response.data);
}
