import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Link} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import React, {Fragment} from 'react';
import {Video} from '@app/titles/models/video';
import {BooleanIndicator} from '@common/datatable/column-templates/boolean-indicator';
import {FormattedNumber} from '@ui/i18n/formatted-number';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {BarChartIcon} from '@ui/icons/material/BarChart';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';

export const VideosDatatableColumns: ColumnConfig<Video>[] = [
  {
    key: 'name',
    allowsSorting: true,
    width: 'flex-3',
    visibleInMode: 'all',
    header: () => <Trans message="Video" />,
    body: video => (
      <div className="flex items-center gap-12">
        {video.title ? (
          <TitlePoster
            title={video.title}
            srcSize="sm"
            size="w-32"
            aspect="aspect-square"
          />
        ) : null}
        <div className="min-w-0 overflow-hidden">
          <div className="overflow-hidden overflow-ellipsis">
            <Link
              to={getWatchLink(video)}
              target="_blank"
              className="hover:underline"
            >
              {video.title?.name}
              {video.season_num | video.episode_num ? (
                <span>
                  {' '}
                  (
                  <CompactSeasonEpisode
                    seasonNum={video.season_num}
                    episodeNum={video.episode_num}
                  />
                  )
                </span>
              ) : null}
            </Link>
          </div>
          <div className="overflow-hidden overflow-ellipsis text-xs text-muted">
            {video.name}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'type',
    allowsSorting: true,
    header: () => <Trans message="Type" />,
    body: video => <span className="capitalize">{video.type}</span>,
  },
  {
    key: 'category',
    allowsSorting: true,
    header: () => <Trans message="Category" />,
    body: video => <span className="capitalize">{video.category}</span>,
  },
  {
    key: 'approved',
    allowsSorting: true,
    header: () => <Trans message="Approved" />,
    body: video => <BooleanIndicator value={video.approved} />,
    width: 'w-80 flex-shrink-0',
  },
  {
    key: 'plays_count',
    allowsSorting: true,
    header: () => <Trans message="Plays" />,
    body: video =>
      video.plays_count ? <FormattedNumber value={video.plays_count} /> : null,
    width: 'w-80 flex-shrink-0',
  },
  {
    key: 'reports_count',
    allowsSorting: true,
    header: () => <Trans message="Reports" />,
    body: video =>
      video.reports_count ? (
        <FormattedNumber value={video.reports_count} />
      ) : null,
    width: 'w-80 flex-shrink-0',
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    maxWidth: 'max-w-100',
    header: () => <Trans message="Last updated" />,
    body: video =>
      video.updated_at ? <FormattedDate date={video.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-84 flex-shrink-0',
    body: video => (
      <Fragment>
        <IconButton
          size="md"
          className="text-muted"
          elementType={Link}
          to={`${video.id}/insights`}
        >
          <BarChartIcon />
        </IconButton>
        <Link to={`${video.id}/edit`} className="text-muted">
          <IconButton size="md">
            <EditIcon />
          </IconButton>
        </Link>
      </Fragment>
    ),
  },
];
