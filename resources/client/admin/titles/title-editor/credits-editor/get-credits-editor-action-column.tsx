import {Trans} from '@ui/i18n/trans';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import {EditCreditDialog} from '@app/admin/titles/title-editor/credits-editor/edit-credit-dialog';
import React from 'react';
import {ColumnConfig} from '@common/datatable/column-config';
import {TitleCredit} from '@app/titles/models/title';
import {useDeleteTitleCredit} from '@app/admin/titles/requests/use-delete-title-credit';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';

export const getCreditsEditorActionColumn = (): ColumnConfig<TitleCredit> => {
  return {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-84 flex-shrink-0',
    visibleInMode: 'all',
    body: item => (
      <div className="text-muted">
        <DialogTrigger type="modal">
          <IconButton>
            <EditIcon />
          </IconButton>
          <EditCreditDialog credit={item} />
        </DialogTrigger>
        <DeleteButton creditId={item.pivot.id} />
      </div>
    ),
  };
};

interface DeleteButtonProps {
  creditId: number;
}
function DeleteButton({creditId}: DeleteButtonProps) {
  const deleteCredit = useDeleteTitleCredit(creditId);
  return (
    <DialogTrigger
      type="modal"
      onClose={confirmed => {
        if (confirmed) {
          deleteCredit.mutate();
        }
      }}
    >
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        isDanger
        title={<Trans message="Delete credit" />}
        body={<Trans message="Are you sure you want to delete this credit?" />}
        confirm={<Trans message="Delete" />}
      />
    </DialogTrigger>
  );
}
