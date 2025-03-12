import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Season} from '@app/titles/models/season';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface GetSeasonResponse extends BackendResponse {
  season: Season;
  title: Title;
  episodes?: PaginationResponse<Episode>;
}

interface Params {
  skipUpdating?: boolean;
  truncateDescriptions?: boolean;
  load?: string;
}

export const seasonQueryKey = (
  titleId: number | string,
  season: number | string,
  params?: any,
) => {
  const key = ['titles', `${titleId}`, 'seasons', `${season}`];
  if (params) {
    key.push(params);
  }
  return key;
};

export function useSeason(loader: 'seasonPage' | 'season' | 'editSeasonPage') {
  const {titleId, season} = useParams();
  return useQuery({
    queryKey: seasonQueryKey(titleId!, season!, loader),
    queryFn: () => fetchSeason(titleId!, season!, loader),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (data?.title?.id == titleId && data?.season?.number == season) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchSeason(
  titleId: number | string,
  seasonNumber: number | string,
  loader: string,
) {
  return apiClient
    .get<GetSeasonResponse>(`titles/${titleId}/seasons/${seasonNumber}`, {
      params: {loader},
    })
    .then(response => response.data);
}
