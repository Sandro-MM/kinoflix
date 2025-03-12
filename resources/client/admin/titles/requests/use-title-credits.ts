import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {TitleCredit} from '@app/titles/models/title';
import {useParams} from 'react-router';

export const titleCreditsQueryKey = (
  titleId: number | string,
  season?: number | string,
  episode?: number | string,
  params?: any,
) => {
  const key = ['titles', `${titleId}`, 'credits'];
  if (season) {
    key.push('season', `${season}`);
  }
  if (episode) {
    key.push('episode', `${episode}`);
  }
  if (params) {
    key.push(params);
  }
  return key;
};

interface Params {
  department?: string;
  crewOnly?: string;
}

export function useTitleCredits(params: Params = {}) {
  const {titleId, season, episode} = useParams();
  return useInfiniteData<TitleCredit>({
    endpoint: `titles/${titleId}/credits`,
    queryKey: titleCreditsQueryKey(titleId!, season, episode, params),
    queryParams: {
      ...params,
      perPage: 30,
      season: season || '',
      episode: episode || '',
    },
  });
}
