import {FormImageSelector} from '@common/uploads/components/image-selector';
import {Trans} from '@ui/i18n/trans';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {FormDatePicker} from '@ui/forms/input-field/date/date-picker/date-picker';
import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {useOutletContext, useParams} from 'react-router';
import {Form} from '@ui/forms/form';
import {useUpdateEpisode} from '@app/episodes/requests/use-update-episode';
import {EpisodeEditorLayout} from '@app/admin/titles/title-editor/episode-editor/episode-editor-layout';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {
  CreateEpisodePayload,
  useCreateEpisode,
} from '@app/episodes/requests/use-create-episode';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {Button} from '@ui/buttons/button';
import {useCurrentDateTime} from '@ui/i18n/use-current-date-time';
import {Title} from '@app/titles/models/title';
import {
  GetEpisodeResponse,
  useEpisode,
} from '@app/episodes/requests/use-episode';
import {TitleEditorPageStatus} from '@app/admin/titles/title-editor/title-editor-page-status';

export function EpisodePrimaryFactsForm() {
  const {episode: episodeNumber} = useParams();
  if (episodeNumber) {
    return <UpdateEpisodePanel />;
  } else {
    return <NewEpisodeForm />;
  }
}

function NewEpisodeForm() {
  const title = useOutletContext<Title>();
  const {season} = useParams();
  const navigate = useNavigate();
  const now = useCurrentDateTime();
  const form = useForm<CreateEpisodePayload>({
    defaultValues: {
      release_date: now.toAbsoluteString(),
    },
  });
  const createEpisode = useCreateEpisode(form, title.id, season!);
  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Form
      form={form}
      onSubmit={values => {
        createEpisode.mutate(values, {
          onSuccess: response => {
            toast(message('Episode created'));
            navigate(`../${response.episode.episode_number}`, {
              relative: 'path',
            });
          },
        });
      }}
    >
      <EpisodeEditorLayout
        actions={
          <Button
            variant="flat"
            color="primary"
            type="submit"
            disabled={createEpisode.isPending || !isDirty}
          >
            <Trans message="Save" />
          </Button>
        }
      >
        <FormFields />
      </EpisodeEditorLayout>
    </Form>
  );
}

function UpdateEpisodePanel() {
  const query = useEpisode('episode');
  return query.data ? (
    <UpdateEpisodeForm episode={query.data.episode} />
  ) : (
    <EpisodeEditorLayout
      actions={
        <Button variant="flat" color="primary" type="submit" disabled>
          <Trans message="Save" />
        </Button>
      }
    >
      <TitleEditorPageStatus query={query} />
    </EpisodeEditorLayout>
  );
}

interface UpdateEpisodeFormProps {
  episode: GetEpisodeResponse['episode'];
}
function UpdateEpisodeForm({episode}: UpdateEpisodeFormProps) {
  const title = useOutletContext<Title>();
  const navigate = useNavigate();
  const form = useForm<CreateEpisodePayload>({
    defaultValues: {
      name: episode.name,
      description: episode.description,
      release_date: episode.release_date,
      runtime: episode.runtime,
      popularity: episode.popularity,
      poster: episode.poster,
    },
  });

  const updateEpisode = useUpdateEpisode(
    title.id,
    episode.season_number,
    episode.episode_number,
    form,
  );

  return (
    <Form
      form={form}
      onSubmit={values => {
        updateEpisode.mutate(values, {
          onSuccess: () => {
            toast(message('Episode updated'));
            navigate('../../../', {relative: 'path'});
          },
        });
      }}
    >
      <EpisodeEditorLayout
        actions={
          <Button
            variant="flat"
            color="primary"
            type="submit"
            disabled={updateEpisode.isPending || !form.formState.isDirty}
          >
            <Trans message="Save" />
          </Button>
        }
      >
        <FormFields />
      </EpisodeEditorLayout>
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
          diskPrefix="episode-posters"
          label={<Trans message="Poster" />}
          stretchPreview
        />
        <div className="mb-24 flex-auto max-md:mt-24">
          <FormTextField
            name="name"
            label={<Trans message="Title" />}
            className="mb-24"
            required
          />
          <FormDatePicker
            name="release_date"
            label={<Trans message="Release date" />}
            className="mb-24"
            granularity="day"
            timezone="UTC"
          />
          <FormTextField
            name="runtime"
            label={<Trans message="Runtime" />}
            type="number"
            min={1}
            className="mb-24"
          />
          <FormTextField
            name="popularity"
            label={<Trans message="Popularity" />}
            type="number"
            min={1}
          />
        </div>
      </div>
      <FormTextField
        name="description"
        label={<Trans message="Overview" />}
        inputElementType="textarea"
        rows={6}
        className="mb-24"
      />
    </Fragment>
  );
}
