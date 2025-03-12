import {TitlePageHeaderLayout} from '@app/titles/pages/title-page/title-page-header-layout';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {FormattedDuration} from '@ui/i18n/formatted-duration';
import {InteractableRating} from '@app/reviews/interactable-rating';
import {Breadcrumb} from '@ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@ui/breadcrumbs/breadcrumb-item';
import {getTitleLink} from '@app/titles/title-link';
import {getSeasonLink} from '@app/seasons/season-link';
import React from 'react';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {TitlePoster} from '@app/titles/title-poster/title-poster';

interface Props {
  title: Title;
  episode: Episode;
  showPoster?: boolean;
}
export function EpisodePageHeader({title, episode, showPoster}: Props) {
  const navigate = useNavigate();
  const runtime = episode.runtime || title.runtime;
  return (
    <TitlePageHeaderLayout
      poster={
        showPoster ? (
          <TitlePoster title={title} size="w-80" srcSize="sm" />
        ) : undefined
      }
      name={episode.name}
      description={
        <BulletSeparatedItems className="my-10 md:my-0">
          <Trans
            message="Aired :date"
            values={{
              date: (
                <FormattedDate date={episode.release_date} timezone="utc" />
              ),
            }}
          />
          {title.certification && (
            <span className="uppercase">{title.certification}</span>
          )}
          {runtime ? <FormattedDuration minutes={runtime} verbose /> : null}
        </BulletSeparatedItems>
      }
      right={<InteractableRating title={title} episode={episode} />}
    >
      <Breadcrumb isNavigation>
        <BreadcrumbItem onSelected={() => navigate(getTitleLink(title))}>
          {title.name}
        </BreadcrumbItem>
        <BreadcrumbItem
          onSelected={() =>
            navigate(getSeasonLink(title, episode.season_number))
          }
        >
          <Trans
            message="Season :number"
            values={{number: episode.season_number}}
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Trans
            message="Episode :number"
            values={{number: episode.episode_number}}
          />
        </BreadcrumbItem>
      </Breadcrumb>
    </TitlePageHeaderLayout>
  );
}
