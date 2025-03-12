import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {Form} from '@ui/forms/form';
import {useForm, useFormContext} from 'react-hook-form';
import {DialogFooter} from '@ui/overlays/dialog/dialog-footer';
import {Button} from '@ui/buttons/button';
import {
  CreateTitleCreditPayload,
  useCreateTitleCredit,
} from '@app/admin/titles/requests/use-create-title-credit';
import {useValueLists} from '@common/http/value-lists';
import {UpdateTitleCreditPayload} from '@app/admin/titles/requests/use-update-title-credit';
import {Fragment, useMemo} from 'react';
import {FormSelect} from '@ui/forms/select/select';
import {Item} from '@ui/forms/listbox/item';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import clsx from 'clsx';
import {FormNormalizedModelField} from '@common/ui/normalized-model/normalized-model-field';

interface Props {
  isCrew: boolean;
}
export function AddCreditDialog({isCrew}: Props) {
  const {formId, close} = useDialogContext();
  const form = useForm<CreateTitleCreditPayload>({
    defaultValues: {
      department: !isCrew ? 'actors' : undefined,
      job: !isCrew ? 'actor' : undefined,
    },
  });
  const createCredit = useCreateTitleCredit(form);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Create credit" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            createCredit.mutate(values, {onSuccess: () => close()});
          }}
        >
          <FormNormalizedModelField
            endpoint="normalized-models/person"
            name="person_id"
            label={<Trans message="Person" />}
            className="mb-24"
            autoFocus
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
          disabled={createCredit.isPending}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface SharedCreditDialogFieldsProps {
  isCrew: boolean;
}
export function SharedCreditDialogFields({
  isCrew,
}: SharedCreditDialogFieldsProps) {
  return (
    <Fragment>
      <FormTextField
        name="character"
        label={<Trans message="Character" />}
        required={!isCrew}
        className={clsx('mb-24', isCrew && 'hidden')}
      />
      <CrewFields isCrew={isCrew} />
    </Fragment>
  );
}

interface CrewFieldsProps {
  isCrew: boolean;
}
function CrewFields({isCrew}: CrewFieldsProps) {
  const {data} = useValueLists(['tmdbDepartments']);
  const {watch} = useFormContext<UpdateTitleCreditPayload>();
  const selectedDepartment = watch('department');
  const {jobs, departments} = useMemo(() => {
    const departments =
      data?.tmdbDepartments.map(d => ({
        department: d.department.toLowerCase(),
        jobs: d.jobs,
      })) || [];
    const department = departments.find(
      d => d.department === selectedDepartment,
    );
    const jobs = department?.jobs.map(job => ({job: job.toLowerCase()})) || [];
    return {
      jobs,
      departments,
    };
  }, [data, selectedDepartment]);

  return (
    <Fragment>
      <FormSelect
        name="department"
        label={<Trans message="Department" />}
        required
        disabled={!isCrew}
        items={departments}
        className="mb-24"
        selectionMode="single"
        showSearchField
      >
        {item => (
          <Item value={item.department}>
            <Trans message={item.department} />
          </Item>
        )}
      </FormSelect>
      <FormSelect
        name="job"
        label={<Trans message="Job" />}
        required
        disabled={!isCrew}
        items={jobs}
        selectionMode="single"
        showSearchField
      >
        {item => (
          <Item value={item.job} key={item.job}>
            <Trans message={item.job} />
          </Item>
        )}
      </FormSelect>
    </Fragment>
  );
}
