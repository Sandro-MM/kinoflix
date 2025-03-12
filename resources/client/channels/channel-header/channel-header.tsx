import React, {Fragment, ReactNode} from 'react';
import clsx from 'clsx';
import {Channel} from '@common/channels/channel';
import {FilterList} from '@common/datatable/filters/filter-list/filter-list';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {useBackendFilterUrlParams} from '@common/datatable/filters/backend-filter-url-params';
import {MOVIE_MODEL, SERIES_MODEL, TITLE_MODEL} from '@app/titles/models/title';
import {ChannelSortButton} from '@app/channels/channel-header/channel-sort-button';
import {AddFilterButton} from '@common/datatable/filters/add-filter-button';
import {TuneIcon} from '@ui/icons/material/Tune';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {useParams} from 'react-router';
import {ChannelLayoutButton} from '@app/channels/channel-header/channel-layout-button';
import {useTitleIndexFilters} from '@app/titles/use-title-index-filters';
import {FilterListSkeleton} from '@common/datatable/filters/filter-list/filter-list-skeleton';
import {UserListByline} from '@app/user-lists/user-list-byline';
import {UserListDetails} from '@app/user-lists/user-list-details';

const FilterModelTypes = [TITLE_MODEL, MOVIE_MODEL, SERIES_MODEL];

interface Props {
  channel: Channel;
  margin?: string;
  isNested: boolean;
  actions?: ReactNode;
}
export function ChannelHeader({
  channel,
  isNested,
  actions,
  margin = isNested ? 'mb-16 md:mb-30' : 'mb-20 md:mb-40',
}: Props) {
  const shouldShowFilterButton =
    !isNested &&
    FilterModelTypes.includes(channel.config.contentModel) &&
    channel.config.contentType === 'listAll';

  const {encodedFilters} = useBackendFilterUrlParams();
  const {filters, filtersLoading} = useTitleIndexFilters({
    disabled: !shouldShowFilterButton,
  });

  if (channel.config.hideTitle) {
    return null;
  }

  return (
    <section className={clsx(margin)}>
      <ChannelTitle
        channel={channel}
        isNested={isNested}
        actions={
          <Fragment>
            {actions}
            {!isNested && <ChannelSortButton channel={channel} />}
            {shouldShowFilterButton && (
              <AddFilterButton
                icon={<TuneIcon />}
                color={null}
                variant="text"
                disabled={filtersLoading}
                filters={filters}
              />
            )}
            {!isNested && <ChannelLayoutButton channel={channel} />}
          </Fragment>
        }
      />
      {shouldShowFilterButton && (
        <div className="mt-14">
          <AnimatePresence initial={false} mode="wait">
            {filtersLoading && encodedFilters ? (
              <FilterListSkeleton />
            ) : (
              <m.div key="filter-list" {...opacityAnimation}>
                <FilterList filters={filters} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

interface ChannelTitleProps {
  channel: Channel;
  isNested: boolean;
  actions?: ReactNode;
}
function ChannelTitle({channel, isNested, actions}: ChannelTitleProps) {
  const {restriction: urlParam} = useParams();
  if (channel.config.hideTitle) {
    return null;
  }

  const link =
    channel.config.restriction && urlParam
      ? `/${channel.slug}/${urlParam}`
      : `/${channel.slug}`;

  return (
    <SiteSectionHeading
      className="flex-auto"
      margin="m-0"
      description={<ChannelDescription channel={channel} />}
      actions={actions}
      headingType={isNested ? 'h2' : 'h1'}
      descriptionFontSize={isNested ? 'text-sm' : undefined}
      fontWeight={isNested ? 'font-normal' : undefined}
      link={isNested ? link : undefined}
    >
      <Trans message={channel.name} />
    </SiteSectionHeading>
  );
}

interface ChannelDescriptionProps {
  channel: Channel;
}
function ChannelDescription({channel}: ChannelDescriptionProps) {
  if (channel.type === 'channel') {
    return <Fragment>{channel.description}</Fragment>;
  }

  return (
    <div className="mt-18 items-center text-sm md:flex">
      {channel.user && <UserListByline user={channel.user} />}
      <UserListDetails
        list={channel}
        className="ml-auto max-md:mt-14"
        showShareButton
        showEditButton
      />
    </div>
  );
}
