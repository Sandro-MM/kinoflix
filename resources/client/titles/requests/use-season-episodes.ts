import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Episode} from '@app/titles/models/episode';
import {useParams} from 'react-router';
import {seasonQueryKey} from '@app/seasons/requests/use-season';

interface Props {
  titleId?: number | string;
  season?: number | string;
  willSortOrFilter?: boolean;
  defaultOrderBy?: string;
  defaultOrderDir?: 'desc' | 'asc';
}

export function useSeasonEpisodes(
  initialPage?: PaginationResponse<Episode>,
  queryParams?: Record<string, string | number>,
  props: Props = {},
) {
  const urlParams = useParams();
  const titleId = props.titleId || urlParams.titleId;
  const season = props.season || urlParams.season;
  return useInfiniteData<Episode>({
    initialPage,
    willSortOrFilter: props.willSortOrFilter,
    defaultOrderBy: props.defaultOrderBy,
    defaultOrderDir: props.defaultOrderDir,
    endpoint: `titles/${titleId}/seasons/${season}/episodes`,
    queryKey: [...seasonQueryKey(titleId!, season!), 'episodes'],
    queryParams,
  });
}
