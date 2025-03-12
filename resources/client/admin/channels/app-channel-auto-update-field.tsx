import {useSettings} from '@ui/settings/use-settings';
import {ChannelAutoUpdateField} from '@common/admin/channels/channel-editor/controls/channel-auto-update-field';
import React, {useMemo} from 'react';
import {ChannelContentConfig} from '@common/admin/channels/channel-editor/channel-content-config';
import {message} from '@ui/i18n/message';

interface Props {
  className?: string;
  config: ChannelContentConfig;
}
export function AppChannelAutoUpdateField({className, config}: Props) {
  const {tmdb_is_setup} = useSettings();

  const providers = useMemo(() => {
    const providers = [{label: message('Local database'), value: 'local'}];
    if (tmdb_is_setup) {
      providers.push({label: message('TheMovieDB'), value: 'tmdb'});
    }
    return providers;
  }, [tmdb_is_setup]);

  return (
    <ChannelAutoUpdateField
      config={config}
      providers={providers}
      className={className}
    />
  );
}
