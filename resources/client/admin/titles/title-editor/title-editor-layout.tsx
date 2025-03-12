import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router';
import clsx from 'clsx';
import {Trans} from '@ui/i18n/trans';
import {message} from '@ui/i18n/message';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {Option, Select} from '@ui/forms/select/select';
import React, {Fragment, ReactNode, useRef} from 'react';
import {useStickySentinel} from '@ui/utils/hooks/sticky-sentinel';
import {getTitleLink} from '@app/titles/title-link';
import {IconButton} from '@ui/buttons/icon-button';
import {OpenInNewIcon} from '@ui/icons/material/OpenInNew';
import {Title} from '@app/titles/models/title';
import {useScrollToTop} from '@common/ui/navigation/use-scroll-to-top';
import {InfoDialogTriggerIcon} from '@ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger-icon';

const allMenuItems = [
  {to: 'primary-facts', label: message('Primary Facts')},
  {to: 'seasons', label: message('Seasons'), hideIfMovie: true},
  {to: 'images', label: message('Images')},
  {to: 'videos', label: message('Videos')},
  {to: 'cast', label: message('Cast')},
  {to: 'crew', label: message('Crew')},
  {to: 'genres', label: message('Genres')},
  {to: 'keywords', label: message('Keywords')},
  {to: 'countries', label: message('Countries')},
  {to: 'reviews', label: message('Reviews')},
  {to: 'comments', label: message('Comments')},
];
function useFilteredMenuItems() {
  const title = useOutletContext<Title>();
  const isMovie = !title?.is_series;

  return allMenuItems.filter(item => !isMovie || !item.hideIfMovie);
}

interface Props {
  children: ReactNode;
  actions?: ReactNode;
}
export function TitleEditorLayout({children, actions}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const {isSticky, sentinelRef} = useStickySentinel();
  const title = useOutletContext<Title>();
  const {season, episode} = useParams();
  const link = title ? getTitleLink(title, {season, episode}) : null;
  const ref = useRef<HTMLDivElement>(null);

  const heading = title ? (
    <Trans values={{name: title.name}} message="Edit “:name“" />
  ) : (
    <Trans message="New title" />
  );

  useScrollToTop(ref);

  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message="Edit title" />
      </StaticPageTitle>
      <div ref={sentinelRef} />
      <div
        ref={ref}
        className={clsx(
          'sticky top-0 z-10 my-12 transition-shadow md:my-24',
          isSticky && 'bg-paper shadow',
        )}
      >
        <div
          className={clsx(
            'container mx-auto flex items-center gap-24 px-24 py-14 md:items-start',
          )}
        >
          <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl md:mr-64 md:text-3xl">
            {heading}
          </h1>
          <div className="mr-auto"></div>
          {link ? (
            <IconButton size="sm" elementType={Link} to={link} target="_blank">
              <OpenInNewIcon />
            </IconButton>
          ) : null}
          {actions}
        </div>
      </div>
      <div className="container mx-auto items-stretch gap-30 px-24 pb-24 md:flex">
        {isMobile ? <MobileNav /> : <DesktopNav />}
        <div className="relative flex-auto md:pl-30">{children}</div>
      </div>
    </Fragment>
  );
}

function MobileNav() {
  const {titleId} = useParams();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const value = titleId ? pathname.split('/').pop() : 'primary-facts';
  const menuItems = useFilteredMenuItems();

  return (
    <Select
      disabled={!titleId}
      minWidth="min-w-none"
      className="mb-24 w-full bg-paper"
      selectionMode="single"
      selectedValue={value}
      onSelectionChange={newPage => {
        if (titleId) {
          navigate(itemLink(titleId, newPage as string));
        }
      }}
    >
      {menuItems.map(item => (
        <Option key={item.to} value={item.to}>
          <Trans {...item.label} />
        </Option>
      ))}
    </Select>
  );
}

function DesktopNav() {
  const {titleId} = useParams();
  const menuItems = useFilteredMenuItems();
  return (
    <div className="sticky top-24 w-240 flex-shrink-0">
      {menuItems.map(item => {
        const link = titleId ? itemLink(titleId, item.to) : '';
        return (
          <NavLink
            key={item.to}
            to={link}
            aria-disabled={!titleId}
            className={({isActive}) =>
              clsx(
                'mb-8 block whitespace-nowrap rounded border-l-4 p-14 text-sm transition-bg-color',
                !link && 'pointer-events-none text-muted',
                (isActive && link) || (item.to === 'primary-facts' && !link)
                  ? 'border-l-primary bg-primary/selected font-medium'
                  : 'border-l-transparent hover:bg-hover',
              )
            }
          >
            <Trans {...item.label} />
          </NavLink>
        );
      })}
      {!titleId ? (
        <div className="mt-24 flex items-center gap-8 text-xs text-muted">
          <InfoDialogTriggerIcon viewBox="0 0 16 16" size="xs" />
          <Trans message="Create title to enable menu items." />
        </div>
      ) : null}
    </div>
  );
}

const itemLink = (titleId: string | number, to: string) =>
  `/admin/titles/${titleId}/edit/${to}`;
