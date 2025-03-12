import {Title} from '@app/titles/models/title';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {Trans} from '@ui/i18n/trans';
import {FormattedCurrency} from '@ui/i18n/formatted-currency';
import {WatchlistButton} from '@app/user-lists/watchlist-button';
import {
  DetailItem,
  TitlePageAsideLayout,
} from '@app/titles/pages/title-page/title-page-aside-layout';
import {KeywordLink} from '@app/titles/keyword-link';
import {ProductionCountryLink} from '@app/titles/production-country-link';
import {WatchNowButton} from '@app/titles/pages/title-page/watch-now-button';
import {useIsStreamingMode} from '@app/videos/use-is-streaming-mode';
import {getTitleLink} from '@app/titles/title-link';
import {ShareMenuTrigger} from '@app/sharing/share-menu-trigger';
import {Button} from '@ui/buttons/button';
import React from 'react';
import {ShareIcon} from '@ui/icons/material/Share';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import {Link} from 'react-router';
import {useAuth} from '@common/auth/use-auth';
import {GetTitleResponse} from '@app/titles/requests/use-title';

interface Props {
  data: GetTitleResponse;
  className?: string;
}
export function TitlePageAside({data: {title, language}, className}: Props) {
  const isStreamingMode = useIsStreamingMode();
  const {hasPermission} = useAuth();
  return (
    <TitlePageAsideLayout
      className={className}
      poster={
        <div className="relative">
          <TitlePoster title={title} size="w-full" srcSize="lg" />
          {hasPermission('titles.update') && (
            <IconButton
              elementType={Link}
              to={`/admin/titles/${title.id}/edit`}
              className="absolute bottom-6 right-4"
              color="white"
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      }
    >
      {isStreamingMode && title.primary_video && (
        <WatchNowButton video={title.primary_video} variant="flat" />
      )}
      <WatchlistButton
        item={title}
        variant={isStreamingMode ? 'outline' : 'flat'}
      />
      <ShareButton title={title} />
      <dl className="mt-14">
        {language && (
          <DetailItem label={<Trans message="Original language" />}>
            <Trans message={language} />
          </DetailItem>
        )}
        {title.original_title !== title.name && (
          <DetailItem label={<Trans message="Original title" />}>
            {title.original_title}
          </DetailItem>
        )}
        {title.budget ? (
          <DetailItem label={<Trans message="Budget" />}>
            <FormattedCurrency value={title.budget} currency="usd" />
          </DetailItem>
        ) : null}
        {title.revenue ? (
          <DetailItem label={<Trans message="Revenue" />}>
            <FormattedCurrency value={title.revenue} currency="usd" />
          </DetailItem>
        ) : null}
        {title.production_countries?.length ? (
          <DetailItem label={<Trans message="Production countries" />}>
            <ul className="mt-12 flex flex-wrap gap-8">
              {title.production_countries.map(country => (
                <li
                  key={country.id}
                  className="w-max rounded-full border px-10 py-4 text-xs"
                >
                  <ProductionCountryLink country={country} />
                </li>
              ))}
            </ul>
          </DetailItem>
        ) : null}
        {title.keywords?.length ? (
          <DetailItem label={<Trans message="Keywords" />}>
            <ul className="mt-12 flex flex-wrap gap-8">
              {title.keywords.map(keyword => (
                <li
                  key={keyword.id}
                  className="w-max rounded-full border px-10 py-4 text-xs"
                >
                  <KeywordLink keyword={keyword} />
                </li>
              ))}
            </ul>
          </DetailItem>
        ) : null}
      </dl>
    </TitlePageAsideLayout>
  );
}

interface ShareButtonProps {
  title: Title;
}
function ShareButton({title}: ShareButtonProps) {
  const link = getTitleLink(title, {absolute: true});
  return (
    <ShareMenuTrigger link={link}>
      <Button
        variant="outline"
        color="primary"
        startIcon={<ShareIcon />}
        className="mt-14 min-h-40 w-full"
      >
        <Trans message="Share" />
      </Button>
    </ShareMenuTrigger>
  );
}
