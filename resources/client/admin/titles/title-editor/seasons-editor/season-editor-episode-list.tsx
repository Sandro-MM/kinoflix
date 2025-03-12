import {GetSeasonResponse, useSeason} from '@app/seasons/requests/use-season';
import React, {Fragment} from 'react';
import {Trans} from '@ui/i18n/trans';
import {Link} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {Button} from '@ui/buttons/button';
import {EditIcon} from '@ui/icons/material/Edit';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useDeleteEpisode} from '@app/episodes/requests/use-delete-episode';
import {Episode} from '@app/titles/models/episode';
import {EpisodeListItem} from '@app/seasons/episode-list-item';
import {AddIcon} from '@ui/icons/material/Add';
import {SeasonEditorLayout} from '@app/admin/titles/title-editor/seasons-editor/season-editor-layout';
import {useSeasonEpisodes} from '@app/titles/requests/use-season-episodes';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {TitleEditorPageStatus} from '@app/admin/titles/title-editor/title-editor-page-status';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {TvIcon} from '@ui/icons/material/Tv';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';

export function SeasonEditorEpisodeList() {
  return (
    <SeasonEditorLayout>
      <div className="mb-16">
        <Button
          variant="outline"
          color="primary"
          startIcon={<AddIcon />}
          size="xs"
          elementType={Link}
          to="new"
        >
          <Trans message="Add episode" />
        </Button>
      </div>
      <Content />
    </SeasonEditorLayout>
  );
}

function Content() {
  const query = useSeason('editSeasonPage');
  if (query.data) {
    return query.data.episodes?.data.length ? (
      <LazyEpisodeList data={query.data} />
    ) : (
      <NoEpisodesMessage />
    );
  } else {
    return <TitleEditorPageStatus query={query} />;
  }
}

function NoEpisodesMessage() {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <TvIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="No episodes have been added yet" />}
    />
  );
}

interface LazyEpisodeListProps {
  data: GetSeasonResponse;
}
function LazyEpisodeList({data}: LazyEpisodeListProps) {
  const query = useSeasonEpisodes(data.episodes);
  return (
    <Fragment>
      {query.items.map(episode => (
        <EpisodeListItem
          key={episode.id}
          episode={episode}
          title={data.title}
          className="mb-24"
        >
          <div className="mt-12 flex items-center gap-12">
            <Button
              variant="outline"
              size="xs"
              startIcon={<EditIcon />}
              elementType={Link}
              to={`${episode.episode_number}/primary-facts`}
            >
              <Trans message="Edit" />
            </Button>
            <DialogTrigger type="modal">
              <IconButton size="xs" variant="outline">
                <DeleteIcon />
              </IconButton>
              <DeleteEpisodeDialog episode={episode} />
            </DialogTrigger>
          </div>
        </EpisodeListItem>
      ))}
      <InfiniteScrollSentinel query={query} />
    </Fragment>
  );
}

interface DeleteEpisodeDialogProps {
  episode: Episode;
}
function DeleteEpisodeDialog({episode}: DeleteEpisodeDialogProps) {
  const deleteEpisode = useDeleteEpisode(episode);
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isLoading={deleteEpisode.isPending}
      isDanger
      title={<Trans message="Delete episode" />}
      body={<Trans message="Are you sure you want to delete this episode?" />}
      confirm={<Trans message="Delete" />}
      onConfirm={() => {
        deleteEpisode.mutate(undefined, {onSuccess: () => close()});
      }}
    />
  );
}
