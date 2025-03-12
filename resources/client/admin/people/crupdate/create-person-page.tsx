import {useForm} from 'react-hook-form';
import {
  CreatePersonPayload,
  useCreatePerson,
} from '@app/admin/people/requests/use-create-person';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {PersonPrimaryFactsForm} from '@app/admin/people/crupdate/person-primary-facts-form';

export function CreatePersonPage() {
  const navigate = useNavigate();
  const form = useForm<CreatePersonPayload>({
    defaultValues: {
      gender: 'female',
      known_for: 'Acting',
      popularity: 3,
    },
  });
  const createPerson = useCreatePerson(form);
  return (
    <CrupdateResourceLayout
      onSubmit={values =>
        createPerson.mutate(values, {
          onSuccess: response => {
            navigate(`../${response.person.id}/edit`, {
              relative: 'path',
              replace: true,
            });
          },
        })
      }
      form={form}
      title={<Trans message="New person" />}
      isLoading={createPerson.isPending}
      disableSaveWhenNotDirty
    >
      <FileUploadProvider>
        <PersonPrimaryFactsForm />
      </FileUploadProvider>
    </CrupdateResourceLayout>
  );
}
