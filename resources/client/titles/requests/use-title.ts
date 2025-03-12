import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {Title, TitleCredit, TitleCreditPivot} from '@app/titles/models/title';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {LengthAwarePaginationResponse} from '@common/http/backend-response/pagination-response';
import {Season} from '@app/titles/models/season';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';
import {Episode} from '@app/titles/models/episode';

export type GroupTitleCredits = Partial<
  Record<TitleCreditPivot['department'], TitleCredit[]>
>;

export interface GetTitleResponse extends BackendResponse {
  title: Title;
  seasons?: LengthAwarePaginationResponse<Season>;
  episodes?: LengthAwarePaginationResponse<Episode>;
  credits?: GroupTitleCredits;
  language?: string;
}

export function useTitle(
  loader: 'title' | 'titlePage' | 'titleCreditsPage' | 'editTitlePage',
) {
  const {titleId} = useParams();
  return useQuery({
    queryKey: ['titles', `${titleId}`, loader],
    queryFn: () => fetchTitle(titleId!, loader),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (data?.title?.id == titleId) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchTitle(titleId: number | string, loader: string) {
  return apiClient
    .get<GetTitleResponse>(`titles/${titleId}`, {params: {loader}})
    .then(response => response.data);
}
