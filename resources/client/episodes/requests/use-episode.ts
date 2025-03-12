import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {seasonQueryKey} from '@app/seasons/requests/use-season';
import {GroupTitleCredits} from '@app/titles/requests/use-title';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface GetEpisodeResponse extends BackendResponse {
  episode: Episode;
  title: Title;
  credits?: GroupTitleCredits;
}

export function useEpisode(
  loader: 'episodePage' | 'episodeCreditsPage' | 'episode',
) {
  const {titleId, season, episode} = useParams();
  return useQuery({
    queryKey: [
      ...seasonQueryKey(titleId!, season!),
      'episodes',
      `${episode}`,
      loader,
    ],
    queryFn: () => fetchEpisode(titleId!, season!, episode!, loader),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (
        data?.title.id == titleId &&
        data?.episode.season_number == season &&
        data?.episode.episode_number == episode
      ) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchEpisode(
  titleId: string,
  seasonNumber: string,
  episodeNumber: string,
  loader: string,
) {
  return apiClient
    .get<GetEpisodeResponse>(
      `titles/${titleId}/seasons/${seasonNumber}/episodes/${episodeNumber}`,
      {params: {loader}},
    )
    .then(response => response.data);
}
