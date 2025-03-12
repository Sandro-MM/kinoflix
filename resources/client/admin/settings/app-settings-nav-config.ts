import {SettingsNavItem} from '@common/admin/settings/settings-nav-config';
import {message} from '@ui/i18n/message';

export const AppSettingsNavConfig: SettingsNavItem[] = [
  {label: message('Local search'), to: 'search'},
  {label: message('Content'), to: 'content'},
  {label: message('Videos'), to: 'videos'},
];
