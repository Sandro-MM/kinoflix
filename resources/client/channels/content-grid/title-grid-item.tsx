import {Title} from '@app/titles/models/title';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleRating} from '@app/reviews/title-rating';
import {TitleLink} from '@app/titles/title-link';
import {ReactNode} from 'react';
import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {FormattedDate} from '@ui/i18n/formatted-date';

export interface TitlePortraitGridItemProps {
  item: Title;
  rating?: number;
  description?: ReactNode;
}
export function TitlePortraitGridItem({
  item,
  rating,
  description,
}: TitlePortraitGridItemProps) {
  return (
    <div>
      <div className="relative">
        <TitlePoster title={item} srcSize="md" showPlayButton />
      </div>
      <div className="mt-10 text-sm">
        <RatingOrReleaseDate title={item} rating={rating} className="mb-4" />
        <TitleLink title={item} className="block text-base font-medium" />
        {description ? <div className="mt-4">{description}</div> : null}
      </div>
    </div>
  );
}

export function TitleLandscapeGridItem({item}: TitlePortraitGridItemProps) {
  return (
    <div>
      <TitleBackdrop
        title={item}
        srcSize="lg"
        size="w-full"
        className="rounded"
        wrapWithLink
        showPlayButton
      />
      <div className="mt-10 text-sm">
        <TitleLink
          title={item}
          className="mb-4 block text-base font-semibold"
        />
        <BulletSeparatedItems className="mb-4">
          {item.release_date && (
            <FormattedDate date={item.release_date} timezone="utc" />
          )}
          {item.certification && (
            <div className="uppercase">{item.certification}</div>
          )}
        </BulletSeparatedItems>
        <TitleRating score={item.rating} className="mb-4" />
      </div>
    </div>
  );
}

interface RatingOrReleaseDateProps {
  title: Title;
  rating?: number;
  className?: string;
}
function RatingOrReleaseDate({
  title,
  rating,
  className,
}: RatingOrReleaseDateProps) {
  if (!rating) {
    rating = title.rating;
  }
  if (rating) {
    return <TitleRating score={rating} className={className} />;
  }
  if (title.release_date) {
    return (
      <div className={className}>
        <FormattedDate date={title.release_date} timezone="utc" />
      </div>
    );
  }
  return null;
}
