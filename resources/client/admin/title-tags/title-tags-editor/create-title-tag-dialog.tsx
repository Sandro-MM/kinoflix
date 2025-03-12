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
import {
  CreateTitleTagPayload,
  useCreateTitleTag,
} from '@app/admin/title-tags/title-tags-editor/requests/use-create-title-tag';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Props {
  type: TitleTag['model_type'];
}
export function CreateTitleTagDialog({type}: Props) {
  const displayName = type.replace('_', ' ');
  const {formId, close} = useDialogContext();
  const form = useForm<CreateTitleTagPayload>();
  const addTag = useCreateTitleTag(form, type);
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
            await addTag.mutate(values, {
              onSuccess: () => {
                toast(message(':name created', {values: {name: displayName}}));
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
          disabled={addTag.isPending}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
