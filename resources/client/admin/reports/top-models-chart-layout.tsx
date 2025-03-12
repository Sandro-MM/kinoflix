import {Trans} from '@ui/i18n/trans';
import {ChartLayout, ChartLayoutProps} from '@common/charts/chart-layout';
import React, {Fragment, ReactElement} from 'react';
import {ReportMetric} from '@common/admin/analytics/report-metric';
import {ChartLoadingIndicator} from '@common/charts/chart-loading-indicator';
import {TopModelDatasetItem} from '@app/admin/reports/requests/use-insights-report';
import {InfoIcon} from '@ui/icons/material/Info';
import {FormattedNumber} from '@ui/i18n/formatted-number';
import {Link} from 'react-router';
import {UserAvatar} from '@common/auth/user-avatar';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import {UserProfileLink} from '@common/users/user-profile-link';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {SeasonPoster} from '@app/seasons/season-poster';
import {SeasonLink} from '@app/seasons/season-link';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {EpisodeLink} from '@app/episodes/episode-link';
import clsx from 'clsx';

interface Props extends Partial<ChartLayoutProps> {
  data?: ReportMetric<TopModelDatasetItem>;
  title: ReactElement;
}
export function TopModelsChartLayout({data, isLoading, ...layoutProps}: Props) {
  const dataItems = data?.datasets[0].data || [];

  return (
    <ChartLayout
      {...layoutProps}
      className="col-span-6 row-span-11"
      contentIsFlex={isLoading}
      contentClassName="overflow-y-auto compact-scrollbar"
    >
      {isLoading && <ChartLoadingIndicator />}
      {dataItems.map(item => (
        <div
          key={item.model.id}
          className="mb-20 flex items-center justify-between gap-24 text-sm"
        >
          <div className="flex items-center gap-8">
            <Image
              model={item.model}
              size="w-42 h-42"
              className="flex-shrink-0 rounded"
            />
            <div>
              <div className="text-sm">
                <Name model={item.model} />
              </div>
              <div className="text-xs text-muted">
                <Description model={item.model} />
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-4">
            <MediaPlayIcon className="text-muted" size="sm" />
            <Trans
              message=":count plays"
              values={{count: <FormattedNumber value={item.value} />}}
            />
          </div>
        </div>
      ))}
      {!isLoading && !dataItems.length ? (
        <div className="flex items-center gap-8 text-muted">
          <InfoIcon size="sm" />
          <Trans message="No plays in selected timeframe." />
        </div>
      ) : null}
    </ChartLayout>
  );
}

interface ImageProps {
  model: TopModelDatasetItem['model'];
  size: string;
  className: string;
}
function Image({model, size, className}: ImageProps) {
  const link = `/admin/${model.model_type}s/${model.id}`;

  switch (model.model_type) {
    case 'title':
      return (
        <TitlePoster
          title={model}
          size={size}
          srcSize="sm"
          className={className}
          link={`/admin/titles/${model.id}/insights`}
        />
      );
    case 'season':
      return (
        <SeasonPoster
          season={model}
          title={model.title!}
          size={size}
          srcSize="sm"
          className={className}
          link={`/admin/titles/${model.title_id}/insights/seasons/${model.number}`}
        />
      );
    case 'episode':
      return (
        <EpisodePoster
          episode={model}
          title={model.title!}
          size={size}
          srcSize="sm"
          className={className}
          link={`/admin/titles/${model.title_id}/insights/seasons/${model.season_number}/episodes/${model.episode_number}`}
        />
      );
    case 'video':
      return model.thumbnail ? (
        <Link to={link} className={clsx(size, className)}>
          <img src={model.thumbnail} className="h-full w-full" alt="" />
        </Link>
      ) : (
        <TitlePoster
          title={model.title!}
          size={size}
          srcSize="sm"
          className={className}
          link={`/admin/videos/${model.id}/insights`}
        />
      );
    case 'user':
      // there's no separate insights page for user
      return <UserAvatar user={model} size={size} className={className} />;
  }
}

interface NameProps {
  model: TopModelDatasetItem['model'];
}
function Name({model}: NameProps) {
  switch (model.model_type) {
    case 'title':
      return <TitleLink title={model} target="_blank" />;
    case 'season':
      return (
        <SeasonLink
          title={model.title!}
          seasonNumber={model.number}
          target="_blank"
        />
      );
    case 'episode':
      return (
        <EpisodeLink
          title={model.title!}
          episode={model}
          seasonNumber={model.season_number}
          target="_blank"
        />
      );
    case 'video':
      return (
        <Link
          to={getWatchLink(model)}
          className="hover:underline"
          target="_blank"
        >
          {model.name}
        </Link>
      );
    case 'user':
      return model.id ? (
        <UserProfileLink user={model} target="_blank" />
      ) : (
        <Fragment>{model.name}</Fragment>
      );
  }
}

interface DescriptionProps {
  model: TopModelDatasetItem['model'];
}
function Description({model}: DescriptionProps) {
  switch (model.model_type) {
    case 'title':
      return <span>{model.year}</span>;
    case 'season':
      return <TitleLink title={model.title!} target="_blank" />;
    case 'episode':
      return <TitleLink title={model.title!} target="_blank" />;
    case 'user':
      return null;
    case 'video':
      return <TitleLink title={model.title!} target="_blank" />;
  }
}
