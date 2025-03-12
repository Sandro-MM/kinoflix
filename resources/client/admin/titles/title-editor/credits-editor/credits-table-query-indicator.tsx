import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {TitleCredit} from '@app/titles/models/title';
import React from 'react';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {RecentActorsIcon} from '@ui/icons/material/RecentActors';
import {Trans} from '@ui/i18n/trans';
import {TitleEditorPageStatus} from '@app/admin/titles/title-editor/title-editor-page-status';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';

interface Props {
  query: UseInfiniteDataResult<TitleCredit>;
}
export function CreditsTableQueryIndicator({query}: Props) {
  if (query.data && !query.items.length) {
    return <NoCreditsMessage />;
  }

  if (!query.data) {
    return <TitleEditorPageStatus query={query} />;
  }

  return <InfiniteScrollSentinel query={query} />;
}

function NoCreditsMessage() {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <RecentActorsIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="No credits have been added yet" />}
    />
  );
}
