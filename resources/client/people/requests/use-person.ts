import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Person} from '@app/titles/models/person';
import {PersonCredit} from '@app/titles/models/title';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface GetPersonResponse extends BackendResponse {
  person: Person;
  knownFor: PersonCredit[];
  credits: Record<string, PersonCredit[]>;
  total_credits_count: number;
}

export function usePerson(loader: 'personPage' | 'editPersonPage') {
  const {personId} = useParams();
  return useQuery({
    queryKey: ['people', `${personId}`, loader],
    queryFn: () => fetchPerson(personId!, loader),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (data?.person?.id == personId) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchPerson(personId: number | string, loader: string) {
  return apiClient
    .get<GetPersonResponse>(`people/${personId}`, {params: {loader}})
    .then(response => response.data);
}
