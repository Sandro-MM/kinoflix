import React, {ReactElement} from 'react';
import {CreateChannelPageLayout} from '@common/admin/channels/channel-editor/create-channel-page-layout';
import {MOVIE_MODEL} from '@app/titles/models/title';
import {Trans} from '@ui/i18n/trans';
import {ChannelNameField} from '@common/admin/channels/channel-editor/controls/channel-name-field';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {ContentTypeField} from '@common/admin/channels/channel-editor/controls/content-type-field';
import {channelContentConfig} from '@app/admin/channels/channel-content-config';
import {ContentModelField} from '@common/admin/channels/channel-editor/controls/content-model-field';
import {AppChannelRestrictionField} from '@app/admin/channels/app-channel-restriction-field';
import {ContentOrderField} from '@common/admin/channels/channel-editor/controls/content-order-field';
import {ContentLayoutFields} from '@common/admin/channels/channel-editor/controls/content-layout-fields';
import {ChannelPaginationTypeField} from '@common/admin/channels/channel-editor/controls/channel-pagination-type-field';
import {ChannelSeoFields} from '@app/admin/channels/channel-seo-fields';
import clsx from 'clsx';
import {Tabs} from '@ui/tabs/tabs';
import {TabList} from '@ui/tabs/tab-list';
import {Tab} from '@ui/tabs/tab';
import {TabPanel, TabPanels} from '@ui/tabs/tab-panels';
import {AppChannelAutoUpdateField} from '@app/admin/channels/app-channel-auto-update-field';

export function CreateChannelPage() {
  return (
    <CreateChannelPageLayout
      submitButtonText={<Trans message="Create" />}
      defaultValues={{
        contentModel: MOVIE_MODEL,
        autoUpdateProvider: 'local',
        layout: 'grid',
        nestedLayout: 'carousel',
        paginationType: 'infiniteScroll',
      }}
    >
      <Tabs>
        <TabList>
          <Tab>
            <Trans message="Settings" />
          </Tab>
          <Tab>
            <Trans message="SEO" />
          </Tab>
        </TabList>
        <TabPanels className="pt-24">
          <TabPanel>
            <ChannelNameField />
            <FormSwitch
              className="mt-24"
              name="config.hideTitle"
              description={
                <Trans message="Whether title should be shown when displaying this channel on the site." />
              }
            >
              <Trans message="Hide title" />
            </FormSwitch>
            <FormTextField
              name="description"
              label={<Trans message="Description" />}
              inputElementType="textarea"
              rows={2}
              className="my-24"
            />
            <ContentTypeField config={channelContentConfig} className="mb-24" />
            <AppChannelAutoUpdateField
              config={channelContentConfig}
              className="mb-24"
            />
            <ContentModelField
              config={channelContentConfig}
              className="mb-24"
            />
            <AppChannelRestrictionField
              config={channelContentConfig}
              className="mb-24"
            />
            <ContentOrderField config={channelContentConfig} />
            <ContentLayoutFields
              config={channelContentConfig}
              className="my-24"
            />
            <ChannelPaginationTypeField
              config={channelContentConfig}
              className="mb-24"
            />
          </TabPanel>
          <TabPanel>
            <ChannelSeoFields />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CreateChannelPageLayout>
  );
}

interface TitleProps {
  children: ReactElement;
  className?: string;
}
function Title({children, className}: TitleProps) {
  return (
    <h2 className={clsx('mb-20 mt-20 border-t pt-20 text-2xl', className)}>
      {children}
    </h2>
  );
}
