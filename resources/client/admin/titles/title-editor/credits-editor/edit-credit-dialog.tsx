import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {Form} from '@ui/forms/form';
import {useForm} from 'react-hook-form';
import {TextField} from '@ui/forms/input-field/text-field/text-field';
import {DialogFooter} from '@ui/overlays/dialog/dialog-footer';
import {Button} from '@ui/buttons/button';
import {TitleCredit} from '@app/titles/models/title';
import {
  UpdateTitleCreditPayload,
  useUpdateTitleCredit,
} from '@app/admin/titles/requests/use-update-title-credit';
import {SharedCreditDialogFields} from '@app/admin/titles/title-editor/credits-editor/add-credit-dialog';

interface Props {
  credit: TitleCredit;
}
export function EditCreditDialog({credit}: Props) {
  const {formId, close} = useDialogContext();
  const isCrew = credit.pivot.department !== 'actors';
  const form = useForm<UpdateTitleCreditPayload>({
    defaultValues: {
      character: credit.pivot.character,
      department: credit.pivot.department,
      job: credit.pivot.job,
    },
  });
  const updateCredit = useUpdateTitleCredit(form, credit.pivot.id);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Edit credit" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            updateCredit.mutate(values, {onSuccess: () => close()});
          }}
        >
          <TextField
            value={credit.name}
            label={<Trans message="Person" />}
            required
            readOnly
            disabled
            className="mb-24"
          />
          <SharedCreditDialogFields isCrew={isCrew} />
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
          disabled={updateCredit.isPending}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
