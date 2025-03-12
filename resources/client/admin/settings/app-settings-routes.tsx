import {RouteObject} from 'react-router';
import {lazyAdminRoute} from '@common/admin/routes/lazy-admin-route';

export const appSettingsRoutes: RouteObject[] = [
  {
    path: 'search',
    lazy: () => lazyAdminRoute('SearchSettings'),
  },
  {
    path: 'videos',
    lazy: () => lazyAdminRoute('VideoSettings'),
  },
  {
    path: 'content',
    lazy: () => lazyAdminRoute('ContentSettings'),
  },
];
