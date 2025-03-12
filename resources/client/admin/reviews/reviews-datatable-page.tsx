import React, {useCallback, useMemo, useState} from 'react';
import clsx from 'clsx';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {DataTableHeader} from '@common/datatable/data-table-header';
import {useBackendFilterUrlParams} from '@common/datatable/filters/backend-filter-url-params';
import {
  GetDatatableDataParams,
  useDatatableData,
} from '@common/datatable/requests/paginated-resources';
import {FilterList} from '@common/datatable/filters/filter-list/filter-list';
import {SelectedStateDatatableHeader} from '@common/datatable/selected-state-datatable-header';
import {AnimatePresence} from 'framer-motion';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import reviewsImage from './reviews.svg';
import {Review} from '@app/titles/models/review';
import {DeleteReviewsButton} from '@app/admin/reviews/delete-reviews-button';
import {ReviewDatatableItem} from '@app/admin/reviews/review-datatable-item';
import {ReviewsDatatableFilters} from '@app/admin/reviews/reviews-datatable-filters';
import {ReviewListSortButton} from '@app/reviews/review-list/review-list-sort-button';
import {Reviewable} from '@app/reviews/reviewable';
import {FullPageLoader} from '@ui/progress/full-page-loader';
import {Trans} from '@ui/i18n/trans';

interface Props {
  hideTitle?: boolean;
  reviewable?: Reviewable;
}
export function ReviewsDatatablePage({hideTitle, reviewable}: Props) {
  const filters = useMemo(() => {
    return ReviewsDatatableFilters.filter(
      f => f.key !== 'reviewable_id' || !reviewable,
    );
  }, [reviewable]);
  const {encodedFilters} = useBackendFilterUrlParams(filters);
  const [params, setParams] = useState<GetDatatableDataParams>({perPage: 15});
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [sort, setSort] = useState<string>('created_at:desc');
  const [orderBy, orderDir] = sort.split(':');

  const query = useDatatableData<Review>(
    'reviews',
    {
      ...params,
      orderBy,
      orderDir: orderDir as 'asc' | 'desc',
      with: 'reviewable,user',
      filters: encodedFilters,
      reviewable_type: reviewable?.model_type,
      reviewable_id: reviewable?.id,
    },
    undefined,
    () => {
      setSelectedReviews([]);
    },
  );

  const toggleReview = useCallback(
    (id: number) => {
      const newValues = [...selectedReviews];
      if (!newValues.includes(id)) {
        newValues.push(id);
      } else {
        const index = newValues.indexOf(id);
        newValues.splice(index, 1);
      }
      setSelectedReviews(newValues);
    },
    [selectedReviews, setSelectedReviews],
  );

  const isFiltering = !!(params.query || params.filters || encodedFilters);
  const pagination = query.data?.pagination;

  return (
    <div className={clsx(!hideTitle && 'p-12 md:p-24')}>
      <div className={clsx('mb-16')}>
        <StaticPageTitle>
          <Trans message="Reviews" />
        </StaticPageTitle>
        {!hideTitle && (
          <h1 className="text-3xl font-light">
            <Trans message="Reviews" />
          </h1>
        )}
      </div>
      <div>
        <AnimatePresence initial={false} mode="wait">
          {selectedReviews.length ? (
            <SelectedStateDatatableHeader
              selectedItemsCount={selectedReviews.length}
              actions={
                <DeleteReviewsButton
                  size="sm"
                  variant="flat"
                  reviewIds={selectedReviews}
                />
              }
              key="selected"
            />
          ) : (
            <DataTableHeader
              key="default"
              filters={filters}
              searchValue={params.query}
              onSearchChange={query => setParams({...params, query})}
              actions={
                <ReviewListSortButton
                  value={sort}
                  onValueChange={newSort => setSort(newSort)}
                  color="primary"
                  showReportsItem
                />
              }
            />
          )}
        </AnimatePresence>
        <FilterList className="mb-14" filters={filters} />

        {query.isLoading ? (
          <FullPageLoader className="min-h-200" />
        ) : (
          <div className="rounded border-x border-t">
            {pagination?.data.map(review => (
              <ReviewDatatableItem
                key={review.id}
                review={review}
                isSelected={selectedReviews.includes(review.id)}
                onToggle={() => toggleReview(review.id)}
              />
            ))}
          </div>
        )}

        {(query.isFetched || query.isPlaceholderData) &&
        !pagination?.data.length ? (
          <DataTableEmptyStateMessage
            className="pt-50"
            isFiltering={isFiltering}
            image={reviewsImage}
            title={<Trans message="No reviews have been created yet" />}
            filteringTitle={<Trans message="No matching reviews" />}
          />
        ) : undefined}

        <DataTablePaginationFooter
          className="mt-10"
          query={query}
          onPageChange={page => setParams({...params, page})}
          onPerPageChange={perPage => setParams({...params, perPage})}
        />
      </div>
    </div>
  );
}
