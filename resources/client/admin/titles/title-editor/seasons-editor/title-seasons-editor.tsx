import {Title} from '@app/titles/models/title';
import {Season} from '@app/titles/models/season';
import {Trans} from '@ui/i18n/trans';
import {Link, useOutletContext} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import React, {Fragment} from 'react';
import {useDeleteSeason} from '@app/admin/titles/requests/use-delete-season';
import {useTitleSeasons} from '@app/titles/requests/use-title-seasons';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {TitleEditorPageStatus} from '@app/admin/titles/title-editor/title-editor-page-status';
import {EditIcon} from '@ui/icons/material/Edit';
import {SeasonPoster} from '@app/seasons/season-poster';
import {SeasonLink} from '@app/seasons/season-link';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Button} from '@ui/buttons/button';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {TvIcon} from '@ui/icons/material/Tv';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {AddIcon} from '@ui/icons/material/Add';
import {useCreateSeason} from '@app/admin/titles/requests/use-create-season';

export function TitleSeasonsEditor() {
  const title = useOutletContext<Title>();
  const createSeason = useCreateSeason(title.id);
  const query = useTitleSeasons(title.id, undefined, {
    perPage: 15,
  });

  let content;
  if (query.data) {
    content = query.items.length ? (
      <Fragment>
        <div className="mt-24 grid grid-cols-2 gap-24 md:grid-cols-5">
          {query.items.map(season => (
            <div key={season.id}>
              <SeasonPoster
                title={title}
                season={season}
                srcSize="md"
                className="aspect-poster flex-shrink-0"
              />
              <div className="mt-8">
                <div className="flex items-center justify-between gap-14">
                  <SeasonLink title={title} seasonNumber={season.number} />
                  <div className="text-xs text-muted">
                    <FormattedDate
                      timezone="utc"
                      date={season.release_date}
                      options={{year: 'numeric'}}
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  {
                    <Trans
                      message=":count episodes"
                      values={{count: season.episodes_count}}
                    />
                  }
                </div>
                <div className="mt-14 flex items-center justify-between gap-14">
                  <Button
                    variant="outline"
                    size="xs"
                    startIcon={<EditIcon />}
                    elementType={Link}
                    to={`${season.number}/episodes`}
                  >
                    <Trans message="Edit" />
                  </Button>
                  <DeleteButton title={title} season={season} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <InfiniteScrollSentinel query={query} />
      </Fragment>
    ) : (
      <NoSeasonsMessage />
    );
  } else {
    content = <TitleEditorPageStatus query={query} />;
  }

  return (
    <TitleEditorLayout>
      <Button
        variant="outline"
        color="primary"
        startIcon={<AddIcon />}
        disabled={createSeason.isPending}
        onClick={() => createSeason.mutate()}
      >
        <Trans message="Add season" />
      </Button>
      {content}
    </TitleEditorLayout>
  );
}

function NoSeasonsMessage() {
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
      title={<Trans message="No seasons have been added yet" />}
    />
  );
}

interface DeleteButtonProps {
  title: Title;
  season: Season;
}
function DeleteButton({title, season}: DeleteButtonProps) {
  const deleteSeason = useDeleteSeason(title, season.id);
  return (
    <DialogTrigger
      type="modal"
      onClose={confirmed => {
        if (confirmed) {
          deleteSeason.mutate();
        }
      }}
    >
      <IconButton size="xs" variant="outline">
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        isDanger
        title={<Trans message="Delete season" />}
        body={<Trans message="Are you sure you want to delete this season?" />}
        confirm={<Trans message="Delete" />}
      />
    </DialogTrigger>
  );
}
