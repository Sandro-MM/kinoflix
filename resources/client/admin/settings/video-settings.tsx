import {Trans} from '@ui/i18n/trans';
import {FormSelect} from '@ui/forms/select/select';
import {Item} from '@ui/forms/listbox/item';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {useTrans} from '@ui/i18n/use-trans';
import {
  AdminSettingsForm,
  AdminSettingsLayout,
} from '@common/admin/settings/form/admin-settings-form';
import React from 'react';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {useForm} from 'react-hook-form';
import {JsonChipField} from '@common/admin/settings/form/json-chip-field';

export function VideoSettings() {
  return (
    <AdminSettingsLayout
      title={<Trans message="Video and streaming" />}
      description={
        <Trans message="Control how videos are played and displayed on the site." />
      }
    >
      {data => <Form data={data} />}
    </AdminSettingsLayout>
  );
}

interface FormProps {
  data: AdminSettings;
}
function Form({data}: FormProps) {
  const {trans} = useTrans();
  const form = useForm<AdminSettings>({
    defaultValues: {
      client: {
        streaming: {
          prefer_full: data.client.streaming?.prefer_full ?? false,
          show_video_selector:
            data.client.streaming?.show_video_selector ?? false,
          show_header_play: data.client.streaming?.show_header_play ?? false,
          qualities: data.client.streaming?.qualities ?? [],
          video_panel_content:
            data.client.streaming?.video_panel_content ?? 'all',
          default_sort: data.client.streaming?.default_sort ?? 'order:asc',
        },
      },
    },
  });

  return (
    <AdminSettingsForm form={form}>
      <ShownVideoTypeSelect />
      <SortingMethodSelect />
      <FormSwitch
        className="mb-24"
        name="client.streaming.prefer_full"
        description={
          <Trans
            message={
              'When user clicks on "play" buttons across the site play full movie or episode instead of trailers and clips.'
            }
          />
        }
      >
        <Trans message="Prefer full videos" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.streaming.show_video_selector"
        description={
          <Trans message="Show alternative videos on the watch page." />
        }
      >
        <Trans message="Alternative videos" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.streaming.show_header_play"
        description={
          <Trans message="Whether play button should be shown on main title header." />
        }
      >
        <Trans message="Header play button" />
      </FormSwitch>
      <JsonChipField
        className="mb-24"
        label={<Trans message="Possible video qualities" />}
        name="client.streaming.qualities"
        placeholder={trans({message: 'Add another...'})}
      />
    </AdminSettingsForm>
  );
}

function SortingMethodSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="client.streaming.default_sort"
      label={<Trans message="Video sorting" />}
      selectionMode="single"
      description={
        <Trans message="When multiple videos are shown on the page, how should they be sorted by default." />
      }
    >
      <Item value="order:asc">
        <Trans message="Manual (order assigned manually in admin area)" />
      </Item>
      <Item value="created_at:desc">
        <Trans message="Date added" />
      </Item>
      <Item value="name:asc">
        <Trans message="Name (a-z)" />
      </Item>
      <Item value="Language:asc">
        <Trans message="Language (a-z)" />
      </Item>
      <Item value="reports:asc">
        <Trans message="Reports (videos with less reports first)" />
      </Item>
      <Item value="score:desc">
        <Trans message="Score (most liked videos first)" />
      </Item>
    </FormSelect>
  );
}

function ShownVideoTypeSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="client.streaming.video_panel_content"
      label={<Trans message="Shown videos" />}
      selectionMode="single"
      description={
        <Trans message="What type of videos should be shown in title and episode pages (if there is more then one video attached)." />
      }
    >
      <Item value="all">
        <Trans message="All videos" />
      </Item>
      <Item value="full">
        <Trans message="Full movies and episodes" />
      </Item>
      <Item value="short">
        <Trans message="Short videos (everything except full movies & episodes)" />
      </Item>
      <Item value="trailer">
        <Trans message="Trailers" />
      </Item>
      <Item value="clip">
        <Trans message="Clips" />
      </Item>
    </FormSelect>
  );
}
