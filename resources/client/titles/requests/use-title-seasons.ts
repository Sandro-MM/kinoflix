import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {Season} from '@app/titles/models/season';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';

export const titleSeasonsQueryKey = (titleId: number | string) => [
  'title',
  `${titleId}`,
  'seasons',
];

export function useTitleSeasons(
  titleId: string | number,
  initialPage?: PaginationResponse<Season>,
  queryParams?: Record<string, string | number>
) {
  return useInfiniteData<Season>({
    initialPage,
    endpoint: `titles/${titleId}/seasons`,
    queryKey: titleSeasonsQueryKey(titleId),
    queryParams,
  });
}
