import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {Form} from '@ui/forms/form';
import {useForm} from 'react-hook-form';
import {DialogFooter} from '@ui/overlays/dialog/dialog-footer';
import {Button} from '@ui/buttons/button';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';
import React from 'react';
import {CreateTitleTagPayload} from '@app/admin/title-tags/title-tags-editor/requests/use-create-title-tag';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {useUpdateTitleTag} from '@app/admin/title-tags/title-tags-editor/requests/use-update-title-tag';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Props {
  tag: TitleTag;
}
export function UpdateTitleTagDialog({tag}: Props) {
  const displayName = tag.model_type.replace('_', ' ');
  const {formId, close} = useDialogContext();
  const form = useForm<CreateTitleTagPayload>({
    defaultValues: {
      name: tag.name,
      display_name: tag.display_name,
    },
  });
  const updateTag = useUpdateTitleTag(form, tag);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add :name" values={{name: displayName}} />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={async values => {
            updateTag.mutate(values, {
              onSuccess: () => {
                toast(message(':name updated', {values: {name: displayName}}));
                close();
              },
            });
          }}
        >
          <FormTextField
            name="name"
            label={<Trans message="Name" />}
            description={
              <Trans
                message="Unique :name identifier."
                values={{name: displayName}}
              />
            }
            className="mb-20"
            required
            autoFocus
          />
          <FormTextField
            name="display_name"
            label={<Trans message="Display name" />}
            description={
              <Trans
                message="User friendly :name name."
                values={{name: displayName}}
              />
            }
            className="mb-20"
          />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          type="submit"
          variant="flat"
          color="primary"
          disabled={updateTag.isPending}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
