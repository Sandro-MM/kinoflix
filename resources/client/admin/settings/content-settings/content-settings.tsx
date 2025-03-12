import {Trans} from '@ui/i18n/trans';
import {Tabs} from '@ui/tabs/tabs';
import {TabList} from '@ui/tabs/tab-list';
import {Tab} from '@ui/tabs/tab';
import {TabPanel, TabPanels} from '@ui/tabs/tab-panels';
import {ContentSettingsGeneralPanel} from '@app/admin/settings/content-settings/content-settings-general-panel';
import {
  AdminSettingsForm,
  AdminSettingsLayout,
} from '@common/admin/settings/form/admin-settings-form';
import React from 'react';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {useForm} from 'react-hook-form';
import {ContentSettingsAutomationPanel} from '@app/admin/settings/content-settings/content-settings-automation-panel';
import {ContentSettingsTitlePagePanel} from '@app/admin/settings/content-settings/content-settings-title-page-panel';

export function ContentSettings() {
  return (
    <AdminSettingsLayout
      title={<Trans message="Content" />}
      description={
        <Trans message="Control how content is displayed across the site." />
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
  const form = useForm<AdminSettings>({
    defaultValues: {
      client: {
        titles: {
          enable_reviews: data.client.titles?.enable_reviews ?? false,
          enable_comments: data.client.titles?.enable_comments ?? false,
        },
        comments: {
          per_video: data.client?.comments?.per_video ?? false,
        },
        content: {
          search_provider: data.client.content?.search_provider ?? 'all',
          title_provider: data.client.content?.title_provider ?? '',
          force_season_update:
            data.client.content?.force_season_update ?? false,
          people_provider: data.client.content?.people_provider ?? '',
          automate_filmography:
            data.client.content?.automate_filmography ?? false,
        },
        title_page: {
          sections: data.client.title_page?.sections ?? [],
        },
        tmdb: {
          language: data.client.tmdb?.language ?? 'en',
          includeAdult: data.client.tmdb?.includeAdult ?? false,
        },
      },
      server: {
        rating_column: data.server.rating_column,
        tmdb_api_key: data.server.tmdb_api_key,
      },
    },
  });

  return (
    <AdminSettingsForm form={form}>
      <Tabs>
        <TabList>
          <Tab width="min-w-132">
            <Trans message="General" />
          </Tab>
          <Tab width="min-w-132">
            <Trans message="Automation" />
          </Tab>
          <Tab width="min-w-132">
            <Trans message="Title page" />
          </Tab>
        </TabList>
        <TabPanels className="pt-24">
          <TabPanel>
            <ContentSettingsGeneralPanel />
          </TabPanel>
          <TabPanel>
            <ContentSettingsAutomationPanel />
          </TabPanel>
          <TabPanel>
            <ContentSettingsTitlePagePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AdminSettingsForm>
  );
}
