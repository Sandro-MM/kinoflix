import {useValueLists} from '@common/http/value-lists';
import {useMemo} from 'react';
import {getTitleChannelFilters} from '@app/channels/channel-header/get-title-channel-filters';

interface Options {
  disabled?: boolean;
}

export function useTitleIndexFilters(options: Options = {}) {
  const {data, isLoading, fetchStatus} = useValueLists(
    [
      'titleFilterLanguages',
      'productionCountries',
      'genres',
      'titleFilterAgeRatings',
    ],
    undefined,
    options
  );
  const filters = useMemo(() => {
    return getTitleChannelFilters({
      countries: data?.productionCountries || [],
      languages: data?.titleFilterLanguages || [],
      genres: data?.genres || [],
      ageRatings: data?.titleFilterAgeRatings || [],
    });
  }, [data]);

  return {filters, filtersLoading: isLoading && fetchStatus !== 'idle'};
}
