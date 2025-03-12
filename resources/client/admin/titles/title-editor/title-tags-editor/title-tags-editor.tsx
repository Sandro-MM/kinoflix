import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@ui/buttons/icon-button';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useOutletContext} from 'react-router';
import {Title} from '@app/titles/models/title';
import {Table} from '@common/ui/tables/table';
import {
  TitleTag,
  useDetachTitleTag,
} from '@app/admin/titles/requests/use-detach-title-tag';
import {Button} from '@ui/buttons/button';
import {AddIcon} from '@ui/icons/material/Add';
import {AddTitleTagDialog} from '@app/admin/titles/title-editor/title-tags-editor/add-title-tag-dialog';
import {GENRE_MODEL} from '@app/titles/models/genre';
import {KEYWORD_MODEL} from '@app/titles/models/keyword';
import {PRODUCTION_COUNTRY_MODEL} from '@app/titles/models/production-country';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {CloseIcon} from '@ui/icons/material/Close';

const columnConfig: ColumnConfig<TitleTag>[] = [
  {
    key: 'name',
    header: () => <Trans message="ID" />,
    visibleInMode: 'all',
    body: tag => <span>{tag.name}</span>,
  },
  {
    key: 'display_name',
    header: () => <Trans message="Display name" />,
    body: tag => <span>{tag.display_name}</span>,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: tag => (
      <DialogTrigger type="modal">
        <IconButton className="text-muted">
          <CloseIcon />
        </IconButton>
        <DetachTagDialog tag={tag} />
      </DialogTrigger>
    ),
  },
];

interface Props {
  type: TitleTag['model_type'];
}
export function TitleTagsEditor({type}: Props) {
  const data = useTableData({type});
  return (
    <TitleEditorLayout>
      <div className="mb-14">
        <DialogTrigger type="modal">
          <Button variant="outline" color="primary" startIcon={<AddIcon />}>
            <Trans
              message="Add :name"
              values={{name: type.replace('_', ' ')}}
            />
          </Button>
          <AddTitleTagDialog type={type} />
        </DialogTrigger>
      </div>
      <Table
        enableSelection={false}
        columns={columnConfig}
        data={data as any}
      />
    </TitleEditorLayout>
  );
}

function useTableData({type}: Props) {
  const title = useOutletContext<Title>();
  switch (type) {
    case GENRE_MODEL:
      return title.genres;
    case KEYWORD_MODEL:
      return title.keywords;
    case PRODUCTION_COUNTRY_MODEL:
      return title.production_countries;
  }
}

interface DetachTagDialogProps {
  tag: TitleTag;
}
function DetachTagDialog({tag}: DetachTagDialogProps) {
  const {close} = useDialogContext();
  const detachTag = useDetachTitleTag(tag);
  const modelName = tag.model_type.replace('_', ' ');
  return (
    <ConfirmationDialog
      isLoading={detachTag.isPending}
      isDanger
      title={<Trans message="Detach :name" values={{name: modelName}} />}
      body={
        <Trans
          message="Are you sure you want to detach this :name?"
          values={{name: modelName}}
        />
      }
      confirm={<Trans message="Detach" />}
      onConfirm={() => {
        detachTag.mutate(undefined, {
          onSuccess: () => close(),
        });
      }}
    />
  );
}

export function TitleGenresEditor() {
  return <TitleTagsEditor type={GENRE_MODEL} />;
}

export function TitleKeywordsEditor() {
  return <TitleTagsEditor type={KEYWORD_MODEL} />;
}

export function TitleCountriesEditor() {
  return <TitleTagsEditor type={PRODUCTION_COUNTRY_MODEL} />;
}
