import {Link, useOutletContext, useParams} from 'react-router';
import {VideoThumbnail} from '@app/videos/video-thumbnail';
import {PlayCircleIcon} from '@ui/icons/material/PlayCircle';
import {Video} from '@app/titles/models/video';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Button} from '@ui/buttons/button';
import {Trans} from '@ui/i18n/trans';
import {EditIcon} from '@ui/icons/material/Edit';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {AddIcon} from '@ui/icons/material/Add';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {AddFilterButton} from '@common/datatable/filters/add-filter-button';
import {TuneIcon} from '@ui/icons/material/Tune';
import React, {Fragment, useMemo} from 'react';
import {useBackendFilterUrlParams} from '@common/datatable/filters/backend-filter-url-params';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {FilterList} from '@common/datatable/filters/filter-list/filter-list';
import {TitleVideosSortButton} from '@app/admin/titles/title-editor/videos-editor/title-videos-sort-button';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {VideoGridItemBottomGradient} from '@app/titles/video-grid';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useDeleteVideos} from '@app/admin/videos/requests/use-delete-videos';
import {VideosEditorSeasonSelect} from '@app/admin/titles/title-editor/videos-editor/videos-editor-season-select';
import {VideosDatatableFilters} from '@app/admin/videos/videos-datatable-filters';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {Title} from '@app/titles/models/title';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {TitleEditorPageStatus} from '@app/admin/titles/title-editor/title-editor-page-status';

export function TitleVideosEditor() {
  const filters = useMemo(
    () => VideosDatatableFilters.filter(f => f.key !== 'title_id'),
    [],
  );
  const {encodedFilters} = useBackendFilterUrlParams(filters);
  const {season, episode} = useParams();
  const title = useOutletContext<Title>();
  const query = useInfiniteData<Video>({
    queryKey: ['video', 'edit-title-page'],
    endpoint: 'videos',
    defaultOrderBy: 'created_at',
    defaultOrderDir: 'desc',
    queryParams: {
      perPage: 20,
      filters: encodedFilters,
      title_id: title.id,
      season: season ?? null,
      episode: episode ?? null,
      withCount: 'reports',
    },
  });

  let content;

  if (query.data) {
    content = query.items.length ? (
      <Fragment>
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
          {query.items.map(video => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
        <InfiniteScrollSentinel query={query} />
      </Fragment>
    ) : (
      <NoVideosMessage isFiltering={encodedFilters != null} />
    );
  } else {
    content = <TitleEditorPageStatus query={query} />;
  }

  return (
    <TitleEditorLayout>
      <div className="mb-24 flex flex-wrap items-center gap-12">
        <Button
          variant="outline"
          color="primary"
          startIcon={<AddIcon />}
          elementType={Link}
          to="new"
          className="mr-auto"
        >
          <Trans message="Add video" />
        </Button>
        <VideosEditorSeasonSelect title={title} />
        <TitleVideosSortButton
          value={`${query.sortDescriptor.orderBy}:${query.sortDescriptor.orderDir}`}
          onValueChange={value => {
            const [orderBy, orderDir] = value.split(':');
            query.setSortDescriptor({orderBy, orderDir: orderDir as any});
          }}
        />
        <AddFilterButton
          icon={<TuneIcon />}
          color={null}
          variant="outline"
          filters={filters}
        />
      </div>
      <FilterList className="mb-24" filters={filters} />
      {content}
    </TitleEditorLayout>
  );
}

interface NoVideosMessageProps {
  isFiltering: boolean;
}
function NoVideosMessage({isFiltering}: NoVideosMessageProps) {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <MediaPlayIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={
        isFiltering ? (
          <Trans message="No matching videos" />
        ) : (
          <Trans message="No videos have been added yet" />
        )
      }
    />
  );
}

interface VideoItemProps {
  video: Video;
}
function VideoItem({video}: VideoItemProps) {
  const link = getWatchLink(video);
  return (
    <div className="">
      <Link to={link} className="relative isolate block" target="_blank">
        <VideoThumbnail video={video} title={video.title} srcSize="lg" />
        <VideoGridItemBottomGradient />
        <span className="absolute bottom-0 left-0 z-30 flex items-center gap-x-6 p-10 text-white">
          <PlayCircleIcon />
          <span className="capitalize">{video.category}</span>
        </span>
      </Link>
      <div>
        <div className="mb-4 mt-12 flex items-center gap-24">
          <Link to={link} className="block font-semibold hover:underline">
            {video.name}
          </Link>
          {video.reports_count ? (
            <div className="ml-auto flex-shrink-0 whitespace-nowrap text-sm text-muted">
              <Trans
                message=":count reports"
                values={{count: video.reports_count}}
              />
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-14 text-sm text-muted">
          {(video.season_num != null || video.episode_num != null) && (
            <CompactSeasonEpisode
              seasonNum={video.season_num}
              episodeNum={video.episode_num}
            />
          )}
          <FormattedDate date={video.created_at} />
        </div>
        <div className="mt-14 flex items-center gap-24">
          <Button
            variant="outline"
            size="xs"
            startIcon={<EditIcon />}
            elementType={Link}
            to={`edit/${video.id}`}
          >
            <Trans message="Edit" />
          </Button>
          <DeleteButton video={video} />
        </div>
      </div>
    </div>
  );
}

interface DeleteButtonProps {
  video: Video;
}
function DeleteButton({video}: DeleteButtonProps) {
  const deleteVideos = useDeleteVideos();
  return (
    <DialogTrigger
      type="modal"
      onClose={confirmed => {
        if (confirmed) {
          deleteVideos.mutate({videoIds: [video.id]});
        }
      }}
    >
      <Button
        className="ml-auto"
        variant="outline"
        size="xs"
        startIcon={<DeleteIcon />}
        disabled={deleteVideos.isPending}
      >
        <Trans message="Delete" />
      </Button>
      <ConfirmationDialog
        isDanger
        title={<Trans message="Delete video" />}
        body={<Trans message="Are you sure you want to delete this video?" />}
        confirm={<Trans message="Delete" />}
      />
    </DialogTrigger>
  );
}
