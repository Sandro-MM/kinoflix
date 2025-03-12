import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {SeasonPoster} from '@app/seasons/season-poster';
import {SeasonLink} from '@app/seasons/season-link';
import {GetTitleResponse} from '@app/titles/requests/use-title';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useTitleSeasons} from '@app/titles/requests/use-title-seasons';

interface Props {
  data: GetTitleResponse;
}
export function TitlePageSeasonGrid({data: {title, seasons}}: Props) {
  const query = useTitleSeasons(title.id, seasons);
  return (
    <div className="mt-48">
      <SiteSectionHeading
        titleAppend={seasons?.total ? `(${seasons.total})` : undefined}
      >
        <Trans message="Seasons" />
      </SiteSectionHeading>
      <div>
        <div className="grid grid-cols-4 gap-14 sm:grid-cols-6 lg:grid-cols-8">
          {query.items.map(season => (
            <div key={season.id}>
              <SeasonPoster
                title={title}
                season={season}
                srcSize="sm"
                className="aspect-poster flex-shrink-0"
              />
              <div className="mt-4">
                <SeasonLink
                  className="text-sm"
                  title={title}
                  seasonNumber={season.number}
                  color="primary"
                />
                <div className="text-xs text-muted">
                  <FormattedDate
                    timezone="utc"
                    date={season.release_date}
                    options={{year: 'numeric'}}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <InfiniteScrollSentinel
          query={query}
          variant="loadMore"
          loaderMarginTop="mt-14"
          size="sm"
        />
      </div>
    </div>
  );
}
