import {createBrowserRouter} from 'react-router';
import {authGuard} from '@common/auth/guards/auth-route';
import React from 'react';
import {RootErrorElement, RootRoute} from '@common/core/common-provider';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';
import {authRoutes} from '@common/auth/auth-routes';
import {notificationRoutes} from '@common/notifications/notification-routes';
import {adminRoutes} from '@common/admin/routes/admin-routes';
import {checkoutRoutes} from '@common/billing/checkout/routes/checkout-routes';
import {billingPageRoutes} from '@common/billing/billing-page/routes/billing-page-routes';
import {commonRoutes} from '@common/core/common-routes';
import {siteRoutes} from '@app/routes/site-routes';
import {FullPageLoader} from '@ui/progress/full-page-loader';

export const appRouter = createBrowserRouter(
  [
    {
      id: 'root',
      element: <RootRoute />,
      errorElement: <RootErrorElement />,
      hydrateFallbackElement: <FullPageLoader screen />,
      children: [
        ...authRoutes,
        ...notificationRoutes,
        ...adminRoutes,
        ...checkoutRoutes,
        ...billingPageRoutes,
        ...commonRoutes,
        ...siteRoutes,
        {
          path: 'api-docs',
          loader: () =>
            authGuard({permission: 'api.access', requireLogin: false}),
          lazy: () => import('@common/swagger/swagger-api-docs-page'),
        },
      ],
    },
  ],
  {
    basename: getBootstrapData().settings.html_base_uri,
  },
);
