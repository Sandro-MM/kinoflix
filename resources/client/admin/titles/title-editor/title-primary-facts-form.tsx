import {FormImageSelector} from '@common/uploads/components/image-selector';
import {Trans} from '@ui/i18n/trans';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {FormDatePicker} from '@ui/forms/input-field/date/date-picker/date-picker';
import {FormSelect, Option} from '@ui/forms/select/select';
import {useValueLists} from '@common/http/value-lists';
import {useForm} from 'react-hook-form';
import {
  CreateTitlePayload,
  useCreateTitle,
} from '@app/admin/titles/requests/use-create-title';
import {Title} from '@app/titles/models/title';
import {Form} from '@ui/forms/form';
import {useUpdateTitle} from '@app/admin/titles/requests/use-update-title';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {useOutletContext} from 'react-router';
import React, {Fragment} from 'react';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {Button} from '@ui/buttons/button';
import {useCurrentDateTime} from '@ui/i18n/use-current-date-time';
import {FormComboBox} from '@ui/forms/combobox/form-combobox';

export function TitlePrimaryFactsForm() {
  const title = useOutletContext<Title>();

  return (
    <FileUploadProvider>
      {title ? <EditTitleForm title={title} /> : <CreateTitleForm />}
    </FileUploadProvider>
  );
}

function CreateTitleForm() {
  const now = useCurrentDateTime();
  const navigate = useNavigate();
  const form = useForm<CreateTitlePayload>({
    defaultValues: {
      release_date: now.toAbsoluteString(),
      certification: 'pg',
      language: 'en',
    },
  });
  const createTitle = useCreateTitle(form);
  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Form
      form={form}
      onSubmit={values => {
        createTitle.mutate(values, {
          onSuccess: response => {
            toast(message('Title created'));
            navigate(`../${response.title.id}/edit`, {
              relative: 'path',
              replace: true,
            });
          },
        });
      }}
    >
      <TitleEditorLayout
        actions={
          <Button
            variant="flat"
            color="primary"
            type="submit"
            disabled={createTitle.isPending || !isDirty}
          >
            <Trans message="Create" />
          </Button>
        }
      >
        <FormFields />
      </TitleEditorLayout>
    </Form>
  );
}

interface EditTitleFormProps {
  title: Title;
}
function EditTitleForm({title}: EditTitleFormProps) {
  const navigate = useNavigate();
  const form = useForm<CreateTitlePayload>({
    defaultValues: {
      name: title.name,
      is_series: title.is_series,
      original_title: title.original_title,
      poster: title.poster,
      backdrop: title.backdrop,
      release_date: title.release_date,
      tagline: title.tagline,
      description: title.description,
      runtime: title.runtime,
      certification: title.certification,
      budget: title.budget,
      revenue: title.revenue,
      language: title.language,
      popularity: title.popularity,
    },
  });
  const updateTitle = useUpdateTitle(form);

  return (
    <Form
      form={form}
      onSubmit={values => {
        updateTitle.mutate(values, {
          onSuccess: () => {
            toast(message('Title updated'));
            navigate('../../../', {relative: 'path', replace: true});
          },
        });
      }}
    >
      <TitleEditorLayout
        actions={
          <Button
            variant="flat"
            color="primary"
            type="submit"
            disabled={updateTitle.isPending || !form.formState.isDirty}
          >
            <Trans message="Save" />
          </Button>
        }
      >
        <FormFields />
      </TitleEditorLayout>
    </Form>
  );
}

function FormFields() {
  return (
    <Fragment>
      <div className="gap-24 md:flex">
        <FormImageSelector
          variant="square"
          previewSize="w-204 aspect-poster"
          name="poster"
          diskPrefix="title-posters"
          label={<Trans message="Poster" />}
          showRemoveButton
        />
        <div className="flex-auto max-md:mt-24">
          <FormImageSelector
            name="backdrop"
            variant="square"
            diskPrefix="title-backdrops"
            label={<Trans message="Backdrop" />}
            stretchPreview
            previewSize="min-h-124"
            className="mb-24"
          />
          <FormTextField
            name="name"
            label={<Trans message="Title" />}
            className="mb-24"
            required
          />
          <FormTextField
            name="original_title"
            label={<Trans message="Original title" />}
            className="mb-24"
          />
          <FormSwitch name="is_series" className="mb-24">
            <Trans message="Series" />
          </FormSwitch>
        </div>
      </div>
      <FormDatePicker
        name="release_date"
        label={<Trans message="Release date" />}
        className="mb-24"
        granularity="day"
        timezone="UTC"
      />
      <FormTextField
        name="tagline"
        label={<Trans message="Tagline" />}
        className="mb-24"
      />
      <FormTextField
        name="description"
        label={<Trans message="Overview" />}
        inputElementType="textarea"
        rows={4}
        className="mb-24"
      />
      <div className="mb-24 items-center gap-24 md:flex">
        <FormTextField
          name="runtime"
          label={<Trans message="Runtime" />}
          type="number"
          min={1}
          className="flex-1 max-md:mb-24"
        />
        <CertificationCombobox />
      </div>
      <div className="mb-24 items-center gap-24 md:flex">
        <FormTextField
          name="budget"
          label={<Trans message="Budget (US dollars)" />}
          type="number"
          min={1}
          className="flex-1 max-md:mb-24"
        />
        <FormTextField
          name="revenue"
          label={<Trans message="Revenue (US dollars)" />}
          type="number"
          min={1}
          className="flex-1 max-md:mb-24"
        />
      </div>
      <div className="mb-24 items-center gap-24 md:flex">
        <FormTextField
          name="popularity"
          label={<Trans message="Popularity" />}
          type="number"
          min={1}
          className="flex-1 max-md:mb-24"
        />
        <LanguageSelect />
      </div>
    </Fragment>
  );
}

function CertificationCombobox() {
  const {data} = useValueLists(['titleFilterAgeRatings']);
  return (
    <FormComboBox
      name="certification"
      selectionMode="single"
      label={<Trans message="Certification" />}
      className="flex-1"
      allowCustomValue
    >
      {data?.titleFilterAgeRatings.map(({name, value}) => (
        <Option key={value} value={value}>
          <Trans message={name} />
        </Option>
      ))}
    </FormComboBox>
  );
}

function LanguageSelect() {
  const {data} = useValueLists(['tmdbLanguages']);
  return (
    <FormSelect
      name="language"
      selectionMode="single"
      label={<Trans message="Language" />}
      showSearchField
      searchPlaceholder="Search languages"
      className="flex-1"
    >
      {data?.tmdbLanguages.map(language => (
        <Option key={language.code} value={language.code}>
          <Trans message={language.name} />
        </Option>
      ))}
    </FormSelect>
  );
}
