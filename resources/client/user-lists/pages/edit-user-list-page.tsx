import React, {Fragment, ReactNode} from 'react';
import {PageStatus} from '@common/http/page-status';
import {useForm} from 'react-hook-form';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@ui/i18n/trans';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {useUpdateList} from '@app/user-lists/requests/use-update-list';
import {CrupdateUserListForm} from '@app/user-lists/pages/crupdate-user-list-form';
import {IconButton} from '@ui/buttons/icon-button';
import {ArrowBackIcon} from '@ui/icons/material/ArrowBack';
import {Link} from 'react-router';
import {CreateChannelPayload} from '@common/admin/channels/requests/use-create-channel';
import {useChannel} from '@common/channels/requests/use-channel';
import {Channel} from '@common/channels/channel';
import {ChannelContentEditor} from '@common/admin/channels/channel-editor/channel-content-editor';
import {
  ChannelContentSearchField,
  ChannelContentSearchFieldProps,
} from '@common/admin/channels/channel-editor/channel-content-search-field';
import {ChannelContentItemImage} from '@app/admin/channels/channel-content-item-image';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import playlist from '@common/admin/channels/playlist.svg';
import {SvgImage} from '@ui/images/svg-image';
import {SitePageLayout} from '@app/site-page-layout';

export function EditUserListPage() {
  const query = useChannel(undefined, 'editUserListPage');
  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message="Edit list" />
      </StaticPageTitle>
      {query.data ? (
        <PageContent list={query.data.channel}>
          <CrupdateUserListForm
            isWatchlist={
              query.data.channel.internal &&
              query.data.channel.name === 'watchlist'
            }
          />
          <ChannelContentEditor
            title={<Trans message="List content" />}
            searchField={<SearchField />}
            noResultsMessage={<NoResultsMessage />}
          />
        </PageContent>
      ) : (
        <PageStatus query={query} loaderClassName="absolute m-auto inset-0" />
      )}
    </Fragment>
  );
}

interface PageContentProps {
  list: Channel;
  children: ReactNode;
}
function PageContent({list, children}: PageContentProps) {
  const form = useForm<CreateChannelPayload>({
    // @ts-ignore
    defaultValues: {
      ...list,
    },
  });
  const updateList = useUpdateList(form);

  return (
    <CrupdateResourceLayout
      backButton={
        <IconButton elementType={Link} relative="path" to="../../">
          <ArrowBackIcon />
        </IconButton>
      }
      form={form}
      onSubmit={values => {
        updateList.mutate(values);
      }}
      title={<Trans message="Edit “:name“ List" values={{name: list.name}} />}
      isLoading={updateList.isPending}
    >
      {children}
    </CrupdateResourceLayout>
  );
}

function SearchField(props: ChannelContentSearchFieldProps) {
  return (
    <ChannelContentSearchField
      {...props}
      imgRenderer={item => <ChannelContentItemImage item={item} />}
    />
  );
}

function NoResultsMessage() {
  return (
    <IllustratedMessage
      title={<Trans message="List is empty" />}
      description={<Trans message="No content is attached to this list yet." />}
      image={<SvgImage src={playlist} />}
    />
  );
}

export function SiteEditUserListPage() {
  return (
    <SitePageLayout>
      <EditUserListPage />
    </SitePageLayout>
  );
}
