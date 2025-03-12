import {InteractableRating} from '@app/reviews/interactable-rating';
import {Title} from '@app/titles/models/title';
import {TitlePageHeaderLayout} from '@app/titles/pages/title-page/title-page-header-layout';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {FormattedDuration} from '@ui/i18n/formatted-duration';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import React from 'react';
import {WatchlistButton} from '@app/user-lists/watchlist-button';

interface Props {
  title: Title;
  showPoster?: boolean;
}
export function TitlePageHeader({title, showPoster = false}: Props) {
  return (
    <TitlePageHeaderLayout
      name={<TitleLink title={title} />}
      poster={
        showPoster ? (
          <TitlePoster title={title} size="w-80" srcSize="sm" />
        ) : null
      }
      description={
        <div>
          <BulletSeparatedItems>
            <FormattedDate date={title.release_date} timezone="utc" />
            {title.certification && (
              <div className="uppercase">{title.certification}</div>
            )}
            {title.runtime && (
              <FormattedDuration minutes={title.runtime} verbose />
            )}
          </BulletSeparatedItems>
        </div>
      }
      right={
        <div className="flex items-center justify-between gap-10 max-md:mt-10 max-md:flex-wrap">
          <InteractableRating title={title} />
          <WatchlistButton item={title} size="sm" className="md:hidden" />
        </div>
      }
    />
  );
}
