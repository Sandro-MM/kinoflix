import {useTrans} from '@ui/i18n/use-trans';
import {ChipValue} from '@ui/forms/input-field/chip-field/chip-field';
import {useCallback, useRef, useState} from 'react';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Title} from '@app/titles/models/title';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Response extends BackendResponse {
  titles: Title[];
  total_pages: number;
}

export interface ImportMultipleFromTmdbFormValue {
  type: 'movie' | 'series';
  country?: string;
  language?: string;
  min_rating?: string;
  max_rating?: string;
  genres?: ChipValue[];
  keywords?: ChipValue[];
  release_date?: {
    start?: string;
    end?: string;
  };
  pages_to_import?: number;
  start_from_page?: number;
  current_page?: number;
}

interface Payload
  extends Omit<
    ImportMultipleFromTmdbFormValue,
    'genres' | 'keywords' | 'release_date'
  > {
  genres?: string;
  keywords?: string;
  start_date?: string;
  end_date?: string;
}

export interface ImportMultipleProgressData {
  totalItems: number;
  currentItem: number;
  progress: number;
  titleList: string[];
}

interface MutateOptions {
  onSuccess?: () => void;
  onProgress?: (data: ImportMultipleProgressData) => void;
}

export function useImportMultipleFromTmdb() {
  const {trans} = useTrans();
  const titlesList = useRef<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = useRef(new AbortController());

  const cancel = useCallback(() => {
    controller.current.abort('canceled');
  }, []);

  const handler = useCallback(
    async (v: ImportMultipleFromTmdbFormValue, options: MutateOptions) => {
      let stopped = false;
      let error = false;
      let pagesToImport = v.pages_to_import ? +v.pages_to_import : 1;
      const startFromPage = v.start_from_page ? +v.start_from_page : 1;

      if (pagesToImport + startFromPage > 500) {
        pagesToImport = 500 - startFromPage;
      }

      const stopImporting = () => {
        setIsLoading(false);
        titlesList.current = [];
        controller.current = new AbortController();
        stopped = true;
      };

      let currentPage = startFromPage === 1 ? 0 : startFromPage;
      setIsLoading(true);

      controller.current.signal.addEventListener('abort', () =>
        stopImporting(),
      );

      let index = 0;
      while (index <= pagesToImport && !stopped) {
        // open progress bar instantly, instead of waiting for first response to come back
        if (index === 0) {
          options.onProgress?.({
            totalItems: pagesToImport * 20,
            currentItem: 0,
            progress: 0,
            titleList: [],
          });
        }

        index++;
        currentPage++;

        try {
          const response = await apiClient
            .post<Response>(
              'tmdb/import',
              formValueToPayload({...v, current_page: currentPage}),
              {
                signal: controller.current.signal,
              },
            )
            .then(r => r.data);

          if (response.total_pages < pagesToImport) {
            pagesToImport = response.total_pages;
          }

          // limit array to 1000 items
          if (titlesList.current.length > 1000) {
            titlesList.current = titlesList.current.slice(0, 1000);
          }

          titlesList.current.unshift(...response.titles.map(t => t.name));

          const totalItems = pagesToImport * 20;
          const currentItem = (index - 1) * 20;

          options.onProgress?.({
            totalItems: totalItems,
            currentItem: currentItem,
            progress: Math.round((currentItem / totalItems) * 100),
            titleList: titlesList.current,
          });
        } catch (e) {
          stopImporting();
          error = true;
          if ((e as any).message !== 'canceled') {
            console.error(e);
            showHttpErrorToast(e);
          }
        }
      }

      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: DatatableDataQueryKey('titles'),
        });
        toast(trans(message('Titles imported')));
        setIsLoading(false);
        options.onSuccess?.();
      }
    },
    [trans],
  );

  return {
    mutate: handler,
    cancel,
    isLoading,
  };
}

function formValueToPayload(values: ImportMultipleFromTmdbFormValue): Payload {
  const payload: Payload = {
    type: values.type,
    pages_to_import: values.pages_to_import,
    start_from_page: values.start_from_page,
    current_page: values.current_page,
  };

  if (values.country) {
    payload.country = values.country;
  }

  if (values.language) {
    payload.language = values.language;
  }

  if (values.min_rating) {
    payload.min_rating = values.min_rating;
  }

  if (values.max_rating) {
    payload.max_rating = values.max_rating;
  }

  if (values.genres) {
    payload.genres = values.genres.map(genre => genre.id).join(',');
  }
  if (values.keywords) {
    payload.keywords = values.keywords.map(keyword => keyword.id).join(',');
  }

  if (values.release_date) {
    payload.start_date = values.release_date.start;
    payload.end_date = values.release_date.end;
  }

  return payload;
}
