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
import React, {useState} from 'react';
import {Item} from '@ui/forms/listbox/item';
import {FormComboBox} from '@ui/forms/combobox/form-combobox';
import {useNormalizedModels} from '@common/ui/normalized-model/use-normalized-models';
import {
  AttachTitleTagPayload,
  useAttachTitleTag,
} from '@app/admin/titles/requests/use-attach-title-tag';

interface Props {
  type: TitleTag['model_type'];
}
export function AddTitleTagDialog({type}: Props) {
  const {formId, close} = useDialogContext();
  const form = useForm<AttachTitleTagPayload>();
  const attachTag = useAttachTitleTag(form, type);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add :name" values={{name: type.replace('_', ' ')}} />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            attachTag.mutate(values, {onSuccess: () => close()});
          }}
        >
          <NameField type={type} />
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
          disabled={attachTag.isPending}
        >
          <Trans message="Add" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface NameFieldProps {
  type: TitleTag['model_type'];
}
function NameField({type}: NameFieldProps) {
  const [query, setQuery] = useState('');
  const {isFetching, data} = useNormalizedModels(`normalized-models/${type}`, {
    query,
  });
  return (
    <FormComboBox
      isAsync
      name="tag_name"
      isLoading={isFetching}
      inputValue={query}
      onInputValueChange={setQuery}
      items={data?.results}
      allowCustomValue
      autoFocus
    >
      {item => (
        <Item key={item.id} value={item.name} textLabel={item.name}>
          <Trans message={item.description || item.name} />
        </Item>
      )}
    </FormComboBox>
  );
}
