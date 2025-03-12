import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {Trans} from '@ui/i18n/trans';
import {ContentModelField} from '@common/admin/channels/channel-editor/controls/content-model-field';
import {
  channelContentConfig,
  Layout,
} from '@app/admin/channels/channel-content-config';
import {NEWS_ARTICLE_MODEL} from '@app/titles/models/news-article';
import {CHANNEL_MODEL} from '@common/channels/channel';
import {MOVIE_MODEL, SERIES_MODEL} from '@app/titles/models/title';
import {ContentOrderField} from '@common/admin/channels/channel-editor/controls/content-order-field';
import {FormSelect, Option} from '@ui/forms/select/select';
import React from 'react';
import {FormSwitch} from '@ui/forms/toggle/switch';

interface Props {
  isWatchlist?: boolean;
}
export function CrupdateUserListForm({isWatchlist}: Props) {
  return (
    <div>
      {!isWatchlist && (
        <FormTextField
          name="name"
          label={<Trans message="Name" />}
          required
          autoFocus
          className="mb-24"
        />
      )}
      <FormTextField
        name="description"
        label={<Trans message="Description" />}
        inputElementType="textarea"
        rows={2}
        className="mb-24"
      />
      {!isWatchlist && (
        <ContentModelField
          config={channelContentConfig}
          className="mb-24"
          exclude={[
            NEWS_ARTICLE_MODEL,
            CHANNEL_MODEL,
            MOVIE_MODEL,
            SERIES_MODEL,
          ]}
        />
      )}
      <ContentOrderField config={channelContentConfig} className="mb-24" />
      <FormSelect
        className="w-full flex-auto"
        selectionMode="single"
        name="config.layout"
        label={<Trans message="Layout" />}
      >
        <Option value={Layout.grid}>
          <Trans {...channelContentConfig.layoutMethods[Layout.grid].label} />
        </Option>
        <Option value={Layout.list}>
          <Trans {...channelContentConfig.layoutMethods[Layout.list].label} />
        </Option>
        <Option value={Layout.landscapeGrid}>
          <Trans
            {...channelContentConfig.layoutMethods[Layout.landscapeGrid].label}
          />
        </Option>
      </FormSelect>
      <FormSwitch name="public" className="mt-24">
        <Trans message="Public" />
      </FormSwitch>
    </div>
  );
}
