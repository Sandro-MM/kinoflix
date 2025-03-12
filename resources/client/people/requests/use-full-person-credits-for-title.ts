import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {EpisodeCredit, PersonCredit} from '@app/titles/models/title';
import {Person} from '@app/titles/models/person';

export interface GetFullTitleCreditsResponse extends BackendResponse {
  credits: EpisodeCredit[];
}

interface Params {
  credit: PersonCredit;
  department: string;
  person: Person;
}

interface Options {
  enabled?: boolean;
}

export function useFullPersonCreditsForTitle(
  {person, credit, department}: Params,
  options: Options,
) {
  return useQuery({
    queryKey: [
      'people',
      `${person.id}`,
      'full-credits',
      `${credit.id}`,
      `${department}`,
    ],
    queryFn: () => fetchCredits(person.id, credit.id, department),
    enabled: options.enabled,
  });
}

function fetchCredits(
  personId: number | string,
  titleId: number | string,
  department: string,
) {
  return apiClient
    .get<GetFullTitleCreditsResponse>(
      `people/${personId}/full-credits/${titleId}/${department}`,
    )
    .then(response => response.data);
}
