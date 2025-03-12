import { jsxs, jsx } from "react/jsx-runtime";
import { useSearchParams, Link, useParams, useLocation, Outlet, useRoutes } from "react-router-dom";
import { m as message, ah as MenuTrigger, I as IconButton, B as Button, T as Trans, ai as Menu, h as Item, bb as useCookie, ae as SiteConfigContext, c as createSvgIcon, i as useTrans, t as toast, bc as FacebookIcon, bd as TwitterIcon, av as useAuth, aH as FormattedRelativeTime, be as LockIcon, o as opacityAnimation, R as FormattedDate, K as KeyboardArrowLeftIcon, ad as LinkStyle, w as IllustratedMessage, x as SvgImage, af as getBootstrapData, b as apiClient, X as useNavigate, aQ as ComboBoxForwardRef, k as SearchIcon, N as Navbar, V as Tooltip, aY as lazyLoader, u as useSettings, ba as Footer, aR as PageMetaTags, az as PageStatus, e as useIsMobileMediaQuery, D as DialogTrigger, _ as ButtonBase, bf as useImageSrc, J as Form, L as FormTextField, n as showHttpErrorToast, r as ConfirmationDialog, a4 as Skeleton, d as useLocalStorage, M as Chip, q as queryClient, O as CheckIcon, bg as FormattedCurrency, j as TextField, bh as useDarkThemeVariables, aP as PageErrorMessage, p as useDialogContext, l as StaticPageTitle, Q as CloseIcon, G as onFormQueryError, a0 as useValueLists, y as Dialog, z as DialogHeader, A as DialogBody, Y as FileUploadProvider, Z as FormImageSelector, a6 as FormSelect, F as DialogFooter, aD as isAbsoluteUrl, aZ as AuthRoute, b9 as NotFoundPage } from "../server-entry.mjs";
import { bc as useChannelQueryParams, aM as useInfiniteData, bd as channelQueryKey, be as channelEndpoint, _ as channelContentConfig, bf as Sort, aL as SortIcon, K as KeyboardArrowRightIcon, bg as GridViewIcon, aa as UserAvatar, bh as BaseMediaLink, bi as getBaseMediaLink, u as useBackendFilterUrlParams, au as useTitleIndexFilters, A as AddFilterButton, x as TuneIcon, c as FilterListSkeleton, e as FilterList, af as TITLE_MODEL, a5 as MOVIE_MODEL, bj as SERIES_MODEL, b0 as FormattedDateTimeRange, a7 as NewsArticleImage, a8 as NewsArticleLink, ad as BulletSeparatedItems, ai as TitlePoster, as as TitleLink, ac as TitleRating, aJ as TitleBackdrop, bk as NEWS_ARTICLE_MODEL, aY as PERSON_MODEL, aS as PersonPoster, aW as PersonLink, aE as InfiniteScrollSentinel, bl as useChannelContent, bm as PaginationControls, W as ChevronLeftIcon, aN as MediaPlayIcon, aj as getWatchLink, aX as KnownForCompact, bn as FormattedDuration, bo as InteractableRating, bp as CHANNEL_MODEL, a$ as todoImage, bq as getPersonLink, ay as getTitleLink, az as useScrollToTop, Z as useChannel, R as ImageZoomDialog, br as ArrowForwardIcon, aG as useTitleSeasons, aH as SeasonPoster, aI as SeasonLink, bs as useCreateReview, O as Avatar, ae as StarSelector, bt as useAuthClickCapture, ab as useDeleteReviews, M as MoreVertIcon, bu as useReviews, ah as ReviewListSortButton, bv as getEpisodeLink, bw as VideoGrid, aC as useSeasonEpisodes, ak as CompactSeasonEpisode, b4 as EpisodePoster, o as ChipList, g as AddIcon, av as useTitle, aA as useSeason, aD as EpisodeListItem, bx as getSeasonLink, aR as useEpisode, al as FormattedNumber, a9 as useDeleteComments, b6 as EpisodeLink, by as VideoGridItemSkeleton, bz as VideoGridItem, bA as EpisodeSelector, bB as MediaEpisodesIcon, ar as SiteVideoPlayer, aq as VideoPlayerSkeleton, aO as VideoThumbnail, q as Accordion, r as AccordionItem, aZ as usePerson, a_ as useNewsArticle, I as Tabs, J as TabList, L as Tab, b7 as TitleLinkWithEpisodeNumber, bC as StarIcon, b5 as UserProfileLink, b8 as CreateUserListPage, b9 as EditUserListPage } from "./user-profile-link-f8f65fb7.mjs";
import { useContext, useMemo, Fragment, memo, useRef, useState, useCallback, useEffect, useId, forwardRef, useImperativeHandle, Children } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { L as LockOpenIcon, S as ShareIcon, E as ExpandMoreIcon, T as ThumbUpIcon, a as ThumbDownIcon, R as ReplyIcon, C as CommentIcon, F as FlagIcon, b as ListAltIcon, c as RateReviewIcon, B as BookmarkBorderIcon } from "./BookmarkBorder-2c120ae6.mjs";
import useClipboard from "react-use-clipboard";
import debounce from "just-debounce-it";
import { useLayoutEffect, getScrollParent, useObjectRef } from "@react-aria/utils";
import { C as ChevronRightIcon, O as OpenInNewIcon, E as EditIcon, B as Breadcrumb, a as BreadcrumbItem } from "./OpenInNew-08e8296f.mjs";
import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import dot from "dot-object";
import { useForm, useFieldArray } from "react-hook-form";
import linkifyStr from "linkify-string";
import memoize from "nano-memoize";
import "react-dom/server";
import "process";
import "http";
import "zustand";
import "react-router-dom/server.mjs";
import "axios";
import "slugify";
import "deepmerge";
import "zustand/middleware/immer";
import "nanoid";
import "@react-aria/focus";
import "react-dom";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@internationalized/date";
import "@internationalized/number";
import "@react-stately/utils";
import "@react-aria/ssr";
import "immer";
import "axios-retry";
import "tus-js-client";
import "react-use-cookie";
import "mime-match";
import "zustand/traditional";
import "fscreen";
import "zustand/middleware";
import "@react-aria/interactions";
function useInfiniteChannelContent(channel) {
  const queryParams = useChannelQueryParams(channel);
  return useInfiniteData({
    willSortOrFilter: true,
    initialPage: channel.content,
    queryKey: channelQueryKey(channel.id),
    endpoint: channelEndpoint(channel.id),
    queryParams: {
      returnContentOnly: "true",
      ...queryParams
    }
  });
}
function ChannelSortButton({
  channel
}) {
  var _a;
  const config = channelContentConfig.models[channel.config.contentModel];
  const sortMethods = (config == null ? void 0 : config.sortMethods.map((method) => ({
    key: method,
    label: channelContentConfig.sortingMethods[method].label
  }))) || [];
  if (channel.config.contentType === "manual") {
    sortMethods.unshift({
      key: Sort.curated,
      label: message("Default order")
    });
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get("order") || channel.config.contentOrder;
  if ((sortMethods == null ? void 0 : sortMethods.length) < 2) {
    return null;
  }
  const label = (_a = sortMethods == null ? void 0 : sortMethods.find(
    (method) => method.key === selectedValue
  )) == null ? void 0 : _a.label;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      showCheckmark: true,
      selectedValue,
      onSelectionChange: (newValue) => {
        if (newValue === Sort.recent && channel.config.contentType === "manual") {
          newValue = "channelables.created_at:desc";
        }
        setSearchParams(
          (prev) => {
            prev.set("order", newValue);
            return prev;
          },
          {
            replace: true
          }
        );
      },
      children: [
        /* @__PURE__ */ jsxs("span", { role: "button", "aria-label": "Toggle menu", children: [
          /* @__PURE__ */ jsx(IconButton, { className: "md:hidden", role: "presentation", children: /* @__PURE__ */ jsx(SortIcon, {}) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(SortIcon, {}),
              className: "max-md:hidden",
              role: "presentation",
              children: label ? /* @__PURE__ */ jsx(Trans, { ...label }) : /* @__PURE__ */ jsx(Trans, { message: "Popularity" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Menu, { children: sortMethods == null ? void 0 : sortMethods.map((method) => /* @__PURE__ */ jsx(Item, { value: method.key, children: /* @__PURE__ */ jsx(Trans, { ...method.label }) }, method.key)) })
      ]
    }
  );
}
function SiteSectionHeading({
  children,
  titleAppend,
  link,
  fontSize = "text-2xl md:text-3xl",
  fontWeight = "font-bold",
  margin = "mb-20",
  className: className2,
  headingType: HeadingType = "h2",
  description,
  descriptionFontSize = "text-base",
  actions,
  hideBorder,
  wrap = false
}) {
  const title = link ? /* @__PURE__ */ jsx(
    Link,
    {
      to: link,
      className: "rounded outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2",
      children
    }
  ) : children;
  return /* @__PURE__ */ jsxs("section", { className: clsx(className2, margin), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "flex items-center gap-x-44 gap-y-14 max-md:overflow-x-auto",
          wrap && "flex-wrap"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-auto", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "relative flex items-center gap-4",
                !hideBorder && "pl-14 before:absolute before:left-0 before:h-5/6 before:w-4 before:rounded before:bg-primary"
              ),
              children: [
                /* @__PURE__ */ jsx(HeadingType, { className: clsx(fontSize, fontWeight), children: title }),
                titleAppend && /* @__PURE__ */ jsx("span", { className: "pt-4 text-base text-muted", children: titleAppend }),
                link && /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    elementType: Link,
                    to: link,
                    size: "sm",
                    iconSize: "lg",
                    className: "mt-4 max-md:hidden",
                    children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
                  }
                )
              ]
            }
          ) }),
          actions && /* @__PURE__ */ jsx("div", { className: "flex flex-shrink-0 items-center gap-4", children: actions })
        ]
      }
    ),
    description && /* @__PURE__ */ jsx("div", { className: clsx("mt-6", descriptionFontSize), children: description })
  ] });
}
function useChannelLayouts(channel) {
  const config = channelContentConfig.models[channel.config.contentModel];
  const availableLayouts = config == null ? void 0 : config.layoutMethods.filter((m2) => channelContentConfig.userSelectableLayouts.includes(m2)).map((method) => ({
    key: method,
    label: channelContentConfig.layoutMethods[method].label,
    icon: channelContentConfig.layoutMethods[method].icon
  }));
  const [selectedLayout, setSelectedLayout] = useCookie(
    `channel-layout-${channel.config.contentModel}`,
    channel.config.selectedLayout || channel.config.layout
  );
  return { selectedLayout, setSelectedLayout, availableLayouts };
}
function ChannelLayoutButton({ channel }) {
  const { selectedLayout, setSelectedLayout, availableLayouts } = useChannelLayouts(channel);
  if ((availableLayouts == null ? void 0 : availableLayouts.length) < 2) {
    return null;
  }
  const layoutConfig = availableLayouts == null ? void 0 : availableLayouts.find(
    (method) => method.key === selectedLayout
  );
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      showCheckmark: true,
      selectedValue: selectedLayout,
      onSelectionChange: (newValue) => setSelectedLayout(newValue),
      children: [
        /* @__PURE__ */ jsxs("span", { role: "button", "aria-label": "Toggle menu", children: [
          /* @__PURE__ */ jsx(IconButton, { className: "md:hidden", role: "presentation", children: (layoutConfig == null ? void 0 : layoutConfig.icon) || /* @__PURE__ */ jsx(GridViewIcon, {}) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              role: "presentation",
              className: "max-md:hidden",
              startIcon: (layoutConfig == null ? void 0 : layoutConfig.icon) || /* @__PURE__ */ jsx(GridViewIcon, {}),
              children: (layoutConfig == null ? void 0 : layoutConfig.label) ? /* @__PURE__ */ jsx(Trans, { ...layoutConfig.label }) : /* @__PURE__ */ jsx(Trans, { message: "Popularity" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Menu, { children: availableLayouts == null ? void 0 : availableLayouts.map((method) => /* @__PURE__ */ jsx(Item, { value: method.key, children: /* @__PURE__ */ jsx(Trans, { ...method.label }) }, method.key)) })
      ]
    }
  );
}
function UserListByline({ user }) {
  const { auth } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsxs("div", { className: "mr-24 flex flex-shrink-0 items-center gap-8", children: [
    /* @__PURE__ */ jsx(UserAvatar, { user, circle: true, size: "sm" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "List by <a>:name</a>",
        values: {
          a: () => /* @__PURE__ */ jsx(
            Link,
            {
              to: auth.getUserProfileLink(user),
              className: "font-bold hover:underline",
              children: user.display_name
            }
          )
        }
      }
    ) })
  ] });
}
const CopyLinkIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z M 16 9.0058594 C 15.230215 9.0058594 14.460443 9.2973698 13.878906 9.8789062 L 12.607422 11.150391 L 14.021484 12.564453 L 12.556641 14.029297 L 11.142578 12.615234 L 9.8789062 13.878906 C 8.7158332 15.041979 8.7158332 16.958021 9.8789062 18.121094 C 10.460397 18.702585 11.234094 19 12 19 C 12.765906 19 13.539603 18.702585 14.121094 18.121094 L 15.384766 16.857422 L 13.970703 15.443359 L 15.457031 13.957031 L 14.042969 12.542969 L 15.292969 11.292969 C 15.691896 10.894042 16.308104 10.894042 16.707031 11.292969 C 17.105958 11.691896 17.105958 12.308104 16.707031 12.707031 L 15.464844 13.949219 L 16.878906 15.363281 L 18.121094 14.121094 C 19.284167 12.958021 19.284167 11.041979 18.121094 9.8789062 C 17.539557 9.2973698 16.769785 9.0058594 16 9.0058594 z M 12.542969 14.042969 L 13.957031 15.457031 L 12.707031 16.707031 C 12.506522 16.90754 12.258094 17 12 17 C 11.741906 17 11.493478 16.90754 11.292969 16.707031 C 10.894042 16.308104 10.894042 15.691896 11.292969 15.292969 L 12.542969 14.042969 z" })
);
function shareLinkSocially(network, link, name, image) {
  const url = generateShareUrl(network, link, name, image);
  if (network === "mail") {
    window.location.href = url;
  } else {
    openNewWindow(url);
  }
}
function openNewWindow(url) {
  const width = 575, height = 400, left = (window.innerWidth - width) / 2, top = (window.innerHeight - height) / 2, opts = "status=1, scrollbars=1,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
  window.open(url, "share", opts);
}
function generateShareUrl(type, link, name, image) {
  switch (type) {
    case "facebook":
      return "https://www.facebook.com/sharer/sharer.php?u=" + link;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${name}&url=${link}`;
    case "pinterest":
      return "https://pinterest.com/pin/create/button/?url=" + link + "&media=" + image;
    case "tumblr":
      const base = "https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&posttype=photo&title=&caption=";
      return base + name + "&content=" + image + "&url=" + link;
    case "blogger":
      return "https://www.blogger.com/blog_this.pyra?t&u=" + link + "&n=" + name;
    case "mail":
      return `mailto:?subject=Check out this link.&body=${link}`;
  }
}
function ShareMenuTrigger({ link, children }) {
  const { trans } = useTrans();
  const [, setUrlCopied] = useClipboard(link);
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    children,
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "clipboard",
          startIcon: /* @__PURE__ */ jsx(CopyLinkIcon, {}),
          onSelected: () => {
            setUrlCopied();
            toast.positive(message("Copied link to clipboard"));
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Copy to clipboard" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "facebook",
          startIcon: /* @__PURE__ */ jsx(FacebookIcon, {}),
          onClick: () => {
            shareLinkSocially(
              "facebook",
              link,
              trans(message("Check out this link"))
            );
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Share to facebook" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "twitter",
          startIcon: /* @__PURE__ */ jsx(TwitterIcon, {}),
          onClick: () => {
            shareLinkSocially(
              "twitter",
              link,
              trans(message("Check out this link"))
            );
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Share to twitter" })
        }
      )
    ] })
  ] });
}
function UserListLink({ list, children, ...linkProps }) {
  const link = useMemo(() => {
    return getUserListLink(list);
  }, [list]);
  let content2;
  if (children) {
    content2 = children;
  } else if (list.internal && list.name === "watchlist") {
    return /* @__PURE__ */ jsx(Trans, { message: "Watchlist" });
  } else {
    content2 = list.name;
  }
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...linkProps, link, children: content2 });
}
function getUserListLink(list, { absolute } = {}) {
  return getBaseMediaLink(`/lists/${list.id}`, {
    absolute
  });
}
function UserListDetails({
  list,
  className: className2,
  showShareButton,
  showVisibility = true,
  showEditButton = false
}) {
  const { user } = useAuth();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex flex-shrink-0 items-center gap-4 whitespace-nowrap text-muted",
        className2
      ),
      children: [
        showShareButton && list.public && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(ShareButton$4, { list }),
          /* @__PURE__ */ jsx(Divider, { marginLeft: "ml-2" })
        ] }),
        list.items_count ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Trans, { message: ":count items", values: { count: list.items_count } }),
          /* @__PURE__ */ jsx(Divider, {})
        ] }) : null,
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Updated :date",
            values: {
              date: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: list.updated_at })
            }
          }
        ) }),
        showVisibility && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Divider, {}),
          list.public ? /* @__PURE__ */ jsx(LockOpenIcon, { size: "sm" }) : /* @__PURE__ */ jsx(LockIcon, { size: "sm" }),
          /* @__PURE__ */ jsx("div", { children: list.public ? /* @__PURE__ */ jsx(Trans, { message: "Public" }) : /* @__PURE__ */ jsx(Trans, { message: "Private" }) })
        ] }),
        (user == null ? void 0 : user.id) === list.user_id && showEditButton && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Divider, { marginLeft: "ml-10" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              elementType: Link,
              to: `${getUserListLink(list)}/edit`,
              variant: "outline",
              size: "2xs",
              color: "primary",
              children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
            }
          )
        ] })
      ]
    }
  );
}
function ShareButton$4({ list }) {
  const link = getUserListLink(list, { absolute: true });
  return /* @__PURE__ */ jsx(ShareMenuTrigger, { link, children: /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(ShareIcon, {}), sizeClassName: "px-10 py-6", children: /* @__PURE__ */ jsx(Trans, { message: "Share" }) }) });
}
function Divider({ marginLeft = "ml-12" }) {
  return /* @__PURE__ */ jsx("div", { className: clsx("mr-10 h-20 w-1 bg-divider", marginLeft) });
}
const FilterModelTypes = [TITLE_MODEL, MOVIE_MODEL, SERIES_MODEL];
function ChannelHeader({
  channel,
  isNested,
  actions,
  margin = isNested ? "mb-16 md:mb-30" : "mb-20 md:mb-40"
}) {
  const shouldShowFilterButton = !isNested && FilterModelTypes.includes(channel.config.contentModel) && channel.config.contentType === "listAll";
  const { encodedFilters } = useBackendFilterUrlParams();
  const { filters, filtersLoading } = useTitleIndexFilters({
    disabled: !shouldShowFilterButton
  });
  if (channel.config.hideTitle) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: clsx(margin), children: [
    /* @__PURE__ */ jsx(
      ChannelTitle,
      {
        channel,
        isNested,
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          actions,
          !isNested && /* @__PURE__ */ jsx(ChannelSortButton, { channel }),
          shouldShowFilterButton && /* @__PURE__ */ jsx(
            AddFilterButton,
            {
              icon: /* @__PURE__ */ jsx(TuneIcon, {}),
              color: null,
              variant: "text",
              disabled: filtersLoading,
              filters
            }
          ),
          !isNested && /* @__PURE__ */ jsx(ChannelLayoutButton, { channel })
        ] })
      }
    ),
    shouldShowFilterButton && /* @__PURE__ */ jsx("div", { className: "mt-14", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: filtersLoading && encodedFilters ? /* @__PURE__ */ jsx(FilterListSkeleton, {}) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FilterList, { filters }) }, "filter-list") }) })
  ] });
}
function ChannelTitle({ channel, isNested, actions }) {
  const { restriction: urlParam } = useParams();
  if (channel.config.hideTitle) {
    return null;
  }
  const link = channel.config.restriction && urlParam ? `/${channel.slug}/${urlParam}` : `/${channel.slug}`;
  return /* @__PURE__ */ jsx(
    SiteSectionHeading,
    {
      className: "flex-auto",
      margin: "m-0",
      description: /* @__PURE__ */ jsx(ChannelDescription, { channel }),
      actions,
      headingType: isNested ? "h2" : "h1",
      descriptionFontSize: isNested ? "text-sm" : void 0,
      fontWeight: isNested ? "font-normal" : void 0,
      link: isNested ? link : void 0,
      children: /* @__PURE__ */ jsx(Trans, { message: channel.name })
    }
  );
}
function ChannelDescription({ channel }) {
  if (channel.type === "channel") {
    return /* @__PURE__ */ jsx(Fragment, { children: channel.description });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-18 items-center text-sm md:flex", children: [
    channel.user && /* @__PURE__ */ jsx(UserListByline, { user: channel.user }),
    /* @__PURE__ */ jsx(
      UserListDetails,
      {
        list: channel,
        className: "ml-auto max-md:mt-14",
        showShareButton: true,
        showEditButton: true
      }
    )
  ] });
}
function ContentGridLayout({
  children,
  className: className2,
  variant,
  gridCols = "grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))]"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "grid gap-24",
        gridCols,
        className2,
        variant === "landscape" ? "content-grid-landscape" : "content-grid-portrait"
      ),
      children
    }
  );
}
const PersonAge = memo(({ person, showRange }) => {
  if (showRange && person.birth_date && person.death_date) {
    return /* @__PURE__ */ jsx(
      FormattedDateTimeRange,
      {
        start: person.birth_date,
        end: person.death_date,
        options: { year: "numeric" }
      }
    );
  }
  if (person.birth_date) {
    return /* @__PURE__ */ jsx(Fragment, { children: calculateAgeFromBirthDate(person.birth_date, person.death_date) });
  }
  return null;
});
function calculateAgeFromBirthDate(_birthDate, _deathDate) {
  const until = _deathDate ? new Date(_deathDate) : /* @__PURE__ */ new Date();
  const birthDate = new Date(_birthDate);
  let age = until.getFullYear() - birthDate.getFullYear();
  const m2 = until.getMonth() - birthDate.getMonth();
  if (m2 < 0 || m2 === 0 && until.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
}
function NewsArticleGridItem({ article }) {
  return /* @__PURE__ */ jsxs("div", { className: "items-start gap-14 lg:flex", children: [
    /* @__PURE__ */ jsx(
      NewsArticleImage,
      {
        article,
        className: "aspect-poster max-w-90 max-md:hidden"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden overflow-ellipsis text-base md:mt-24 lg:mt-6", children: [
      /* @__PURE__ */ jsx(NewsArticleLink, { article, className: "font-medium" }),
      /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-10 min-w-0 overflow-hidden overflow-ellipsis text-xs", children: [
        /* @__PURE__ */ jsx(FormattedDate, { date: article.created_at }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap", children: article.source })
      ] })
    ] })
  ] });
}
function TitlePortraitGridItem({
  item,
  rating,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(TitlePoster, { title: item, srcSize: "md", showPlayButton: true }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 text-sm", children: [
      /* @__PURE__ */ jsx(RatingOrReleaseDate, { title: item, rating, className: "mb-4" }),
      /* @__PURE__ */ jsx(TitleLink, { title: item, className: "block text-base font-medium" }),
      description ? /* @__PURE__ */ jsx("div", { className: "mt-4", children: description }) : null
    ] })
  ] });
}
function TitleLandscapeGridItem({ item }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      TitleBackdrop,
      {
        title: item,
        srcSize: "lg",
        size: "w-full",
        className: "rounded",
        wrapWithLink: true,
        showPlayButton: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 text-sm", children: [
      /* @__PURE__ */ jsx(
        TitleLink,
        {
          title: item,
          className: "mb-4 block text-base font-semibold"
        }
      ),
      /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mb-4", children: [
        item.release_date && /* @__PURE__ */ jsx(FormattedDate, { date: item.release_date }),
        item.certification && /* @__PURE__ */ jsx("div", { className: "uppercase", children: item.certification })
      ] }),
      /* @__PURE__ */ jsx(TitleRating, { score: item.rating, className: "mb-4" })
    ] })
  ] });
}
function RatingOrReleaseDate({
  title,
  rating,
  className: className2
}) {
  if (!rating) {
    rating = title.rating;
  }
  if (rating) {
    return /* @__PURE__ */ jsx(TitleRating, { score: rating, className: className2 });
  }
  if (title.release_date) {
    return /* @__PURE__ */ jsx("div", { className: className2, children: /* @__PURE__ */ jsx(FormattedDate, { date: title.release_date }) });
  }
  return null;
}
function ChannelContentGridItem({ item, variant }) {
  switch (item.model_type) {
    case TITLE_MODEL:
      return variant === "landscape" ? /* @__PURE__ */ jsx(TitleLandscapeGridItem, { item }) : /* @__PURE__ */ jsx(TitlePortraitGridItem, { item });
    case PERSON_MODEL:
      return /* @__PURE__ */ jsx(PersonGridItem, { item });
    case NEWS_ARTICLE_MODEL:
      return /* @__PURE__ */ jsx(NewsArticleGridItem, { article: item });
    default:
      return null;
  }
}
function PersonGridItem({ item }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PersonPoster, { person: item, srcSize: "md", size: "w-full", rounded: true }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center text-sm", children: [
      /* @__PURE__ */ jsx(PersonLink, { person: item, className: "block text-base font-medium" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PersonAge, { person: item, showRange: true }) })
    ] })
  ] });
}
function ChannelContentGrid(props) {
  const isInfiniteScroll = !props.isNested && (!props.channel.config.paginationType || props.channel.config.paginationType === "infiniteScroll");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeader, { ...props }),
    isInfiniteScroll ? /* @__PURE__ */ jsx(InfiniteScrollGrid, { ...props }) : /* @__PURE__ */ jsx(PaginatedGrid, { ...props })
  ] });
}
function InfiniteScrollGrid({ channel, variant }) {
  const query = useInfiniteChannelContent(channel);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("transition-opacity", query.isReloading && "opacity-70"),
      children: [
        /* @__PURE__ */ jsx(ContentGrid, { content: query.items, variant }),
        /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
      ]
    }
  );
}
function PaginatedGrid({ channel, variant, isNested }) {
  var _a;
  const shouldPaginate = !isNested;
  const query = useChannelContent(channel, null, { paginate: shouldPaginate });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "transition-opacity",
        query.isPlaceholderData && "opacity-70"
      ),
      children: [
        shouldPaginate && /* @__PURE__ */ jsx(
          PaginationControls,
          {
            pagination: query.data,
            type: channel.config.paginationType,
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(ContentGrid, { content: (_a = query.data) == null ? void 0 : _a.data, variant }),
        shouldPaginate && /* @__PURE__ */ jsx(
          PaginationControls,
          {
            pagination: query.data,
            type: channel.config.paginationType,
            className: "mt-24",
            scrollToTop: true
          }
        )
      ]
    }
  );
}
function ContentGrid({ content: content2 = [], variant }) {
  return /* @__PURE__ */ jsx(ContentGridLayout, { variant, children: content2.map((item) => /* @__PURE__ */ jsx(
    ChannelContentGridItem,
    {
      item,
      variant
    },
    `${item.id}-${item.model_type}`
  )) });
}
const containerClassName = "content-carousel content-grid relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-24 snap-always snap-x snap-mandatory hidden-scrollbar scroll-smooth";
const itemClassName = "snap-start snap-normal";
function useCarousel({ rotate = false } = {}) {
  const scrollContainerRef = useRef(null);
  const itemWidth = useRef(0);
  const perPage = useRef(5);
  const [canScrollBackward, setCanScrollBackward] = useState(rotate);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const updateNavStatus = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el && itemWidth.current) {
      if (!rotate) {
        setCanScrollForward(
          el.scrollWidth - 1 > el.scrollLeft + el.clientWidth
        );
        setCanScrollBackward(el.scrollLeft > 0);
      }
      const pageWidth = el.clientWidth;
      const activePage2 = Math.round(el.scrollLeft / pageWidth);
      setActivePage(activePage2);
    }
  }, [rotate]);
  useEffect(() => {
    const el = scrollContainerRef.current;
    const handleScroll = debounce(() => updateNavStatus(), 100);
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => el == null ? void 0 : el.removeEventListener("scroll", handleScroll);
  }, [updateNavStatus]);
  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      perPage.current = Number(
        getComputedStyle(el).getPropertyValue("--nVisibleItems")
      );
      const firstGridItem = el.children.item(0);
      const observer = new ResizeObserver((entries) => {
        itemWidth.current = entries[0].contentRect.width;
        updateNavStatus();
      });
      if (firstGridItem) {
        observer.observe(firstGridItem);
      }
      return () => observer.unobserve(el);
    }
  }, [updateNavStatus]);
  const scrollToIndex = useCallback((index) => {
    if (scrollContainerRef.current) {
      setActivePage(index);
      const amount = itemWidth.current * index;
      scrollContainerRef.current.scrollTo({ left: amount });
    }
  }, []);
  const scrollToPreviousPage = useCallback(() => {
    if (scrollContainerRef.current) {
      const pageWidth = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollLeft = !currentScroll && rotate ? scrollContainerRef.current.scrollWidth - pageWidth : currentScroll - pageWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft
      });
    }
  }, [rotate]);
  const scrollToNextPage = useCallback(() => {
    if (scrollContainerRef.current) {
      const pageWidth = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollLeft = rotate && currentScroll + pageWidth >= scrollContainerRef.current.scrollWidth ? 0 : (activePage + 1) * pageWidth;
      scrollContainerRef.current.scrollTo({ left: scrollLeft });
    }
  }, [activePage, rotate]);
  return {
    scrollContainerRef,
    scrollToIndex,
    scrollToPreviousPage,
    scrollToNextPage,
    canScrollForward,
    canScrollBackward,
    activePage,
    containerClassName,
    itemClassName
  };
}
function ChannelContentCarousel(props) {
  var _a;
  const { channel, variant } = props;
  const {
    scrollContainerRef,
    canScrollForward,
    canScrollBackward,
    scrollToPreviousPage,
    scrollToNextPage,
    containerClassName: containerClassName2,
    itemClassName: itemClassName2
  } = useCarousel();
  const gridClassName = variant === "landscape" ? "content-grid-landscape" : "content-grid-portrait";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      ChannelHeader,
      {
        ...props,
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: !canScrollBackward,
              onClick: () => scrollToPreviousPage(),
              "aria-label": "Previous page",
              children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: !canScrollForward,
              onClick: () => scrollToNextPage(),
              "aria-label": "Next page",
              children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollContainerRef,
        className: clsx(containerClassName2, gridClassName),
        children: (_a = channel.content) == null ? void 0 : _a.data.map((item) => /* @__PURE__ */ jsx("div", { className: itemClassName2, children: /* @__PURE__ */ jsx(ChannelContentGridItem, { item, variant }) }, `${item.id}-${item.model_type}`))
      }
    )
  ] });
}
function ChannelContentSlider({
  channel,
  isNested
}) {
  const {
    scrollContainerRef,
    activePage,
    canScrollBackward,
    canScrollForward,
    scrollToNextPage,
    scrollToPreviousPage
  } = useCarousel({ rotate: true });
  const { data: pagination } = useChannelContent(channel);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ChannelHeader,
      {
        channel,
        isNested,
        margin: "mb-18"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "gap-24 md:flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-auto", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: scrollContainerRef,
            className: "hidden-scrollbar flex h-full select-none snap-x snap-mandatory snap-always items-center overflow-x-auto",
            children: pagination == null ? void 0 : pagination.data.map((item, index) => /* @__PURE__ */ jsx(Slide, { item, index }, item.id))
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-10 z-20 w-full md:top-[170px]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-8 hidden md:left-14 md:block", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              size: "lg",
              color: "white",
              disabled: !canScrollBackward,
              onClick: () => scrollToPreviousPage(),
              children: /* @__PURE__ */ jsx(ChevronLeftIcon, {})
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-8 hidden md:right-14 md:block", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              size: "lg",
              color: "white",
              disabled: !canScrollForward,
              onClick: () => scrollToNextPage(),
              children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(UpNext, { titles: (pagination == null ? void 0 : pagination.data) ?? [], activePage })
    ] })
  ] });
}
function Slide({ item, index }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full flex-shrink-0 snap-start snap-normal overflow-hidden rounded", children: [
    /* @__PURE__ */ jsx(
      TitleBackdrop,
      {
        title: item,
        lazy: index > 0,
        className: "min-h-240 md:min-h-0",
        wrapperClassName: "h-full"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 isolate flex h-full w-full items-center justify-start gap-24 rounded p-30 text-white md:items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 h-full w-full bg-gradient-to-b from-black/40 max-md:top-0 md:bottom-0 md:h-3/4 md:bg-gradient-to-t md:from-black/100" }),
      /* @__PURE__ */ jsx(
        TitlePoster,
        {
          title: item,
          size: "max-h-320",
          srcSize: "md",
          className: "z-10 shadow-md max-md:hidden"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "z-10 text-lg md:max-w-620", children: [
        /* @__PURE__ */ jsx(TitleRating, { score: item.rating }),
        /* @__PURE__ */ jsx("div", { className: "my-8 text-2xl md:text-5xl", children: /* @__PURE__ */ jsx(TitleLink, { title: item }) }),
        item.description && /* @__PURE__ */ jsx("p", { className: "max-md:hidden", children: item.description }),
        item.primary_video && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            startIcon: /* @__PURE__ */ jsx(MediaPlayIcon, {}),
            radius: "rounded-full",
            className: "mt-24 md:min-h-42 md:min-w-144",
            elementType: Link,
            to: getWatchLink(item.primary_video),
            children: item.primary_video.category === "full" ? /* @__PURE__ */ jsx(Trans, { message: "Watch now" }) : /* @__PURE__ */ jsx(Trans, { message: "Play trailer" })
          }
        )
      ] })
    ] })
  ] });
}
function UpNext({ titles, activePage }) {
  const itemCount = titles.length;
  const start = activePage + 1;
  const end = start + 3;
  const items = titles.slice(start, end);
  if (end > itemCount) {
    items.push(...titles.slice(0, end - itemCount));
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsxs("div", { className: "w-1/4 max-w-200 flex-shrink-0 max-md:hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-12 text-lg font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Up next" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-24", children: items.map((item) => /* @__PURE__ */ jsxs(
      m.div,
      {
        className: "relative flex-auto",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        children: [
          /* @__PURE__ */ jsx(
            TitleBackdrop,
            {
              title: item,
              className: "mb-6 rounded",
              size: "w-full",
              srcSize: "md",
              wrapWithLink: true,
              showPlayButton: true
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm", children: /* @__PURE__ */ jsx(TitleLink, { title: item, className: "text-base font-medium" }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TitleRating, { score: item.rating, className: "text-sm" }) })
        ]
      },
      item.id
    )) })
  ] }) });
}
function NewsArticleSourceLink({ article, className: className2 }) {
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-4 text-primary", className2), children: [
    /* @__PURE__ */ jsx(OpenInNewIcon, { size: "xs", className: "flex-shrink-0" }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: article.source_url,
        target: "_blank",
        rel: "noreferrer",
        className: clsx(
          LinkStyle,
          "overflow-hidden overflow-ellipsis whitespace-nowrap"
        ),
        children: article.source
      }
    )
  ] });
}
function NewsArticleByline({ article }) {
  return article.byline ? /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsx(Trans, { message: "By :name", values: { name: article.byline } }) }) : null;
}
function ChannelContentNews({
  channel,
  isNested
}) {
  var _a, _b;
  const shouldPaginate = !isNested;
  const query = useChannelContent(
    channel,
    null,
    {
      paginate: shouldPaginate
    }
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ChannelHeader, { channel, isNested }),
    shouldPaginate && /* @__PURE__ */ jsx(
      PaginationControls,
      {
        pagination: query.data,
        type: channel.config.paginationType,
        className: "mb-34"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-34", children: [
      /* @__PURE__ */ jsx("div", { className: "w-240 flex-shrink-0", children: (_a = query.data) == null ? void 0 : _a.data.slice(0, 3).map((article) => /* @__PURE__ */ jsx(
        LeftColArticle,
        {
          article,
          className: "mb-14"
        },
        article.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex-auto", children: (_b = query.data) == null ? void 0 : _b.data.slice(3, 12).map((article) => /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-14", children: [
        /* @__PURE__ */ jsx(NewsArticleImage, { article, size: "w-84 h-84" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx(NewsArticleLink, { article, className: "font-semibold" }),
          /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "text-sm", children: [
            /* @__PURE__ */ jsx(FormattedDate, { date: article.created_at }),
            /* @__PURE__ */ jsx(NewsArticleByline, { article }),
            /* @__PURE__ */ jsx(NewsArticleSourceLink, { article })
          ] })
        ] })
      ] }, article.id)) })
    ] }),
    shouldPaginate && /* @__PURE__ */ jsx(
      PaginationControls,
      {
        pagination: query.data,
        type: channel.config.paginationType,
        className: "mt-34",
        scrollToTop: true
      }
    )
  ] });
}
function LeftColArticle({ article, className: className2 }) {
  return /* @__PURE__ */ jsxs("div", { className: className2, children: [
    /* @__PURE__ */ jsx(NewsArticleImage, { article, size: "aspect-video w-full" }),
    /* @__PURE__ */ jsx(
      NewsArticleLink,
      {
        article,
        className: "mt-10 block text-sm font-semibold"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 text-xs text-muted", children: [
      /* @__PURE__ */ jsx(NewsArticleByline, { article }),
      /* @__PURE__ */ jsx(NewsArticleSourceLink, { article, className: "mt-4" })
    ] })
  ] });
}
function ChannelContentListItem({ item }) {
  switch (item.model_type) {
    case TITLE_MODEL:
      return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-start gap-24", children: [
        /* @__PURE__ */ jsx(TitlePoster, { title: item, srcSize: "md", size: "w-128", showPlayButton: true }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto pt-12", children: [
          /* @__PURE__ */ jsx(TitleLink, { title: item, className: "font-medium" }),
          /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-4 text-sm", children: [
            item.runtime ? /* @__PURE__ */ jsx(FormattedDuration, { minutes: item.runtime, verbose: true }) : null,
            item.certification && /* @__PURE__ */ jsx("span", { className: "uppercase", children: item.certification })
          ] }),
          item.rating && item.status !== "upcoming" ? /* @__PURE__ */ jsx(InteractableRating, { size: "md", title: item, className: "my-12" }) : /* @__PURE__ */ jsx("div", { className: "my-12", children: /* @__PURE__ */ jsx(FormattedDate, { date: item.release_date }) }),
          item.description ? /* @__PURE__ */ jsx("p", { className: "text-sm", children: item.description }) : null
        ] })
      ] });
    case PERSON_MODEL:
      return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-start gap-24", children: [
        /* @__PURE__ */ jsx(PersonPoster, { person: item, srcSize: "md", size: "w-128" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto pt-12", children: [
          /* @__PURE__ */ jsx(PersonLink, { person: item, className: "block text-lg font-medium" }),
          item.primary_credit ? /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm", children: /* @__PURE__ */ jsx(KnownForCompact, { person: item }) }) : null,
          /* @__PURE__ */ jsx("p", { className: "mt-12 text-sm", children: item.description })
        ] })
      ] });
    case NEWS_ARTICLE_MODEL:
      return /* @__PURE__ */ jsxs("div", { className: "mb-44 flex items-start gap-14", children: [
        /* @__PURE__ */ jsx(NewsArticleImage, { article: item, className: "aspect-poster max-w-90" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 text-base", children: [
          /* @__PURE__ */ jsx(NewsArticleLink, { article: item, className: "font-medium" }),
          /* @__PURE__ */ jsx("p", { className: "mt-10 text-sm", children: item.body }),
          /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-10 text-xs", children: [
            /* @__PURE__ */ jsx(FormattedDate, { date: item.created_at }),
            /* @__PURE__ */ jsx(NewsArticleSourceLink, { article: item })
          ] })
        ] })
      ] });
    default:
      return null;
  }
}
function ChannelContentList(props) {
  const isInfiniteScroll = !props.isNested && (!props.channel.config.paginationType || props.channel.config.paginationType === "infiniteScroll");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeader, { ...props }),
    isInfiniteScroll ? /* @__PURE__ */ jsx(InfiniteScrollList, { ...props }) : /* @__PURE__ */ jsx(PaginatedList, { ...props })
  ] });
}
function InfiniteScrollList({ channel }) {
  const query = useInfiniteChannelContent(channel);
  return /* @__PURE__ */ jsx(
    Content$1,
    {
      content: query.items,
      className: clsx("transition-opacity", query.isReloading && "opacity-70"),
      children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    }
  );
}
function PaginatedList({ channel, isNested }) {
  var _a;
  const shouldPaginate = !isNested;
  const query = useChannelContent(channel, null, { paginate: shouldPaginate });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "transition-opacity",
        query.isPlaceholderData && "opacity-70"
      ),
      children: [
        shouldPaginate && /* @__PURE__ */ jsx(
          PaginationControls,
          {
            pagination: query.data,
            type: channel.config.paginationType,
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(Content$1, { content: (_a = query.data) == null ? void 0 : _a.data }),
        shouldPaginate && /* @__PURE__ */ jsx(
          PaginationControls,
          {
            pagination: query.data,
            type: channel.config.paginationType,
            className: "mt-24",
            scrollToTop: true
          }
        )
      ]
    }
  );
}
function Content$1({ content: content2 = [], children, className: className2 }) {
  return /* @__PURE__ */ jsxs("div", { className: className2, children: [
    content2.map((item) => /* @__PURE__ */ jsx(
      ChannelContentListItem,
      {
        item
      },
      `${item.id}-${item.model_type}`
    )),
    children
  ] });
}
function ChannelContent(props) {
  var _a;
  if (props.isNested && !((_a = props.channel.content) == null ? void 0 : _a.data.length)) {
    return null;
  }
  if (props.channel.config.contentModel === CHANNEL_MODEL) {
    return /* @__PURE__ */ jsx(NestedChannels, { ...props });
  } else {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ChannelLayout, { ...props }),
      /* @__PURE__ */ jsx(NoResultsMessage, { channel: props.channel })
    ] });
  }
}
function NoResultsMessage({ channel }) {
  var _a;
  if (((_a = channel.content) == null ? void 0 : _a.data.length) === 0) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-60",
        image: /* @__PURE__ */ jsx(SvgImage, { src: todoImage }),
        title: channel.type === "list" ? /* @__PURE__ */ jsx(Trans, { message: "This list does not have any content yet." }) : /* @__PURE__ */ jsx(Trans, { message: "This channel does not have any content yet." })
      }
    );
  }
  return null;
}
function ChannelLayout(props) {
  const { channel, isNested } = props;
  const { selectedLayout } = useChannelLayouts(channel);
  const layout = isNested ? channel.config.nestedLayout : selectedLayout;
  switch (layout) {
    case "grid":
      return /* @__PURE__ */ jsx(ChannelContentGrid, { ...props, variant: "portrait" });
    case "landscapeGrid":
      return /* @__PURE__ */ jsx(ChannelContentGrid, { ...props, variant: "landscape" });
    case "list":
      return /* @__PURE__ */ jsx(ChannelContentList, { ...props });
    case "carousel":
      return /* @__PURE__ */ jsx(ChannelContentCarousel, { ...props, variant: "portrait" });
    case "landscapeCarousel":
      return /* @__PURE__ */ jsx(ChannelContentCarousel, { ...props, variant: "landscape" });
    case "slider":
      return /* @__PURE__ */ jsx(ChannelContentSlider, { ...props });
    case "news":
      return /* @__PURE__ */ jsx(ChannelContentNews, { ...props });
    default:
      return null;
  }
}
function NestedChannels({ channel, isNested }) {
  var _a;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeader, { channel, isNested }),
    (_a = channel.content) == null ? void 0 : _a.data.map((nestedChannel) => /* @__PURE__ */ jsx("div", { className: "mb-40 md:mb-50", children: /* @__PURE__ */ jsx(
      ChannelContent,
      {
        channel: nestedChannel,
        isNested: true
      }
    ) }, nestedChannel.id))
  ] });
}
function useSearchResults(loader, query = "") {
  query = query.trim();
  if (query === ".") {
    query = "";
  }
  return useQuery({
    queryKey: ["search", query, loader],
    queryFn: ({ signal }) => search(loader, query, signal),
    enabled: !!query,
    placeholderData: !!query ? keepPreviousData : void 0,
    initialData: () => {
      var _a;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[loader];
      if (query && (data == null ? void 0 : data.query) == query) {
        return data;
      }
    }
  });
}
async function search(loader, query, signal) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return apiClient.get(`search/${encodeURIComponent(query)}`, {
    params: { loader },
    signal
  }).then((response) => response.data);
}
function SearchAutocomplete({ className: className2 }) {
  var _a;
  const { searchQuery } = useParams();
  const { trans } = useTrans();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchQuery || "");
  const [isOpen, setIsOpen] = useState(false);
  const { isFetching, data } = useSearchResults("searchAutocomplete", query);
  return /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        if (query.trim().length) {
          setIsOpen(false);
          navigate(`/search/${encodeURIComponent(query.trim())}`);
        }
      },
      className: clsx(
        "flex max-w-580 flex-auto items-center rounded bg-chip/40 text",
        className2
      ),
      children: /* @__PURE__ */ jsx(
        ComboBoxForwardRef,
        {
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx("button", { type: "submit", "aria-label": trans(message("Search")), children: /* @__PURE__ */ jsx(SearchIcon, { className: "flex-shrink-0 text-muted" }) }),
          className: "w-full",
          offset: 6,
          inputClassName: "w-full outline-none text-sm placeholder:text-muted",
          isAsync: true,
          hideEndAdornment: true,
          placeholder: trans(
            message("Search for movies, tv shows and people...")
          ),
          isLoading: isFetching,
          inputValue: query,
          onInputValueChange: setQuery,
          clearInputOnItemSelection: true,
          blurReferenceOnItemSelection: true,
          selectionMode: "none",
          openMenuOnFocus: true,
          floatingMaxHeight: 670,
          isOpen,
          onOpenChange: setIsOpen,
          autoFocusFirstItem: false,
          focusLoopingMode: "deselect",
          children: (_a = data == null ? void 0 : data.results) == null ? void 0 : _a.map((result) => {
            switch (result.model_type) {
              case TITLE_MODEL:
                return /* @__PURE__ */ jsx(
                  Item,
                  {
                    value: result.id,
                    onSelected: () => {
                      navigate(getTitleLink(result));
                    },
                    startIcon: /* @__PURE__ */ jsx(TitlePoster, { title: result, srcSize: "sm", size: "w-46" }),
                    description: /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-4", children: result.year }),
                      /* @__PURE__ */ jsx("div", { children: result.is_series ? /* @__PURE__ */ jsx(Trans, { message: "Tv series" }) : /* @__PURE__ */ jsx(Trans, { message: "Movie" }) })
                    ] }),
                    textLabel: result.name,
                    children: result.name
                  },
                  result.id
                );
              case PERSON_MODEL:
                return /* @__PURE__ */ jsx(
                  Item,
                  {
                    value: result.id,
                    onSelected: () => {
                      navigate(getPersonLink(result));
                    },
                    startIcon: /* @__PURE__ */ jsx(
                      PersonPoster,
                      {
                        person: result,
                        srcSize: "sm",
                        className: "w-56"
                      }
                    ),
                    description: /* @__PURE__ */ jsx(KnownForCompact, { person: result }),
                    textLabel: result.name,
                    children: result.name
                  },
                  result.id
                );
            }
          })
        }
      )
    }
  );
}
function MainNavbar({ position = "relative" }) {
  return /* @__PURE__ */ jsxs(
    Navbar,
    {
      size: "md",
      menuPosition: "primary",
      className: clsx(position, "z-40 w-full flex-shrink-0"),
      border: "border-none",
      alwaysDarkMode: true,
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Search" }), children: /* @__PURE__ */ jsx(IconButton, { elementType: Link, to: "/search", className: "md:hidden", children: /* @__PURE__ */ jsx(SearchIcon, {}) }) }),
        /* @__PURE__ */ jsx(SearchAutocomplete, { className: "max-md:hidden" })
      ]
    }
  );
}
function AdHost({ slot, className: className2 }) {
  var _a;
  const settings = useSettings();
  const { isSubscribed } = useAuth();
  const adCode2 = useMemo(() => {
    return dot.pick(`ads.${slot}`, settings);
  }, [slot, settings]);
  if (((_a = settings.ads) == null ? void 0 : _a.disable) || isSubscribed || !adCode2)
    return null;
  return /* @__PURE__ */ jsx(InvariantAd, { className: className2, slot, adCode: adCode2 });
}
const InvariantAd = memo(
  ({ slot, adCode: adCode2, className: className2 }) => {
    const ref = useRef(null);
    const id2 = useId();
    useEffect(() => {
      if (ref.current) {
        loadAdScripts(adCode2, ref.current).then(() => {
          executeAdJavascript(adCode2, id2);
        });
      }
      return () => {
        delete window["google_ad_modifications"];
      };
    }, [adCode2, id2]);
    useEffect(() => {
      if (ref.current) {
        const scrollParent = getScrollParent(ref.current);
        if (scrollParent) {
          const observer = new MutationObserver(function() {
            scrollParent.style.height = "";
            scrollParent.style.minHeight = "";
          });
          observer.observe(scrollParent, {
            attributes: true,
            attributeFilter: ["style"]
          });
          return () => observer.disconnect();
        }
      }
    }, []);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        id: id2,
        className: clsx(
          "ad-host flex max-h-[600px] min-h-90 w-full max-w-full items-center justify-center overflow-hidden",
          `${slot.replace(/\./g, "-")}-host`,
          className2
        ),
        dangerouslySetInnerHTML: { __html: getAdHtml(adCode2) }
      }
    );
  },
  () => {
    return false;
  }
);
function getAdHtml(adCode2) {
  return adCode2 == null ? void 0 : adCode2.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").trim();
}
function loadAdScripts(adCode2, parentEl) {
  const promises = [];
  const pattern2 = /<script.*?src=['"](.*?)['"]/g;
  let match;
  while (match = pattern2.exec(adCode2)) {
    if (match[1]) {
      promises.push(lazyLoader.loadAsset(match[1], { type: "js", parentEl }));
    }
  }
  return Promise.all(promises);
}
function executeAdJavascript(adCode, id) {
  const pattern = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
  let content;
  while (content = pattern.exec(adCode)) {
    if (content[1]) {
      const r = `var d = document.createElement('div'); d.innerHTML = $1; document.getElementById('${id}').appendChild(d.firstChild);`;
      const toEval = content[1].replace(/document.write\((.+?)\);/, r);
      eval(toEval);
    }
  }
}
function SitePageLayout({ children }) {
  useScrollToTop();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(MainNavbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "py-24" }),
      /* @__PURE__ */ jsx("div", { className: "relative min-h-[1000px] overflow-hidden", children }),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "py-24" })
    ] }),
    /* @__PURE__ */ jsx(Footer, { className: "container mx-auto mt-48 flex-shrink-0 px-24" })
  ] });
}
function ChannelPage({ slugOrId, type = "channel" }) {
  const query = useChannel(slugOrId, "channelPage", { channelType: type });
  let content2 = null;
  if (query.data) {
    content2 = /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsx("div", { className: "pb-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto p-14 @container md:p-24", children: /* @__PURE__ */ jsx(
        ChannelContent,
        {
          channel: query.data.channel,
          isNested: false
        },
        query.data.channel.id
      ) }) })
    ] });
  } else {
    content2 = /* @__PURE__ */ jsx(
      PageStatus,
      {
        query,
        loaderClassName: "absolute inset-0 m-auto",
        loaderIsScreen: false
      }
    );
  }
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function TitlePageImageGrid({ images, count, heading, srcSize }) {
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  if (!(images == null ? void 0 : images.length))
    return null;
  if (!count) {
    count = isMobile ? 6 : 5;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    heading,
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-12 md:grid-cols-5 md:gap-24", children: images.slice(0, count).map((image, index) => /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(
        ButtonBase,
        {
          "aria-label": trans(message("Image :index", { values: { index } })),
          children: /* @__PURE__ */ jsx(ImageItem, { image, srcSize })
        }
      ),
      /* @__PURE__ */ jsx(
        ImageZoomDialog,
        {
          images: images.map((img) => img.url),
          defaultActiveIndex: index
        }
      )
    ] }, image.id)) })
  ] });
}
function ImageItem({ image, srcSize = "md" }) {
  const src = useImageSrc(image.url, { size: srcSize });
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: "aspect-square w-full cursor-pointer rounded object-cover",
      src,
      alt: ""
    }
  );
}
function TitleCreditsGrid({ credits, className: className2 }) {
  if (!credits.length) {
    return /* @__PURE__ */ jsx("div", { className: "italic text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "We've no cast information for this title yet." }) });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("title-credits-grid grid gap-14 md:gap-20", className2),
      children: credits.map((credit) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-14 md:gap-20",
          children: [
            /* @__PURE__ */ jsx(
              PersonPoster,
              {
                rounded: true,
                person: credit,
                size: "w-70 md:w-96",
                srcSize: "md"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "max-md:text-sm", children: [
              /* @__PURE__ */ jsx(PersonLink, { className: "block font-bold", person: credit }),
              /* @__PURE__ */ jsx("div", { className: "text-muted", children: /* @__PURE__ */ jsx(Description, { credit }) })
            ] })
          ]
        },
        credit.pivot.id
      ))
    }
  );
}
function Description({ credit }) {
  if (credit.pivot.department === "actors") {
    return /* @__PURE__ */ jsx(Fragment, { children: credit.pivot.character });
  }
  return /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: credit.pivot.job }) });
}
function TitlePageCast({ credits = [] }) {
  const cast = credits.filter((credit) => credit.pivot.department === "actors");
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(SiteSectionHeading, { children: /* @__PURE__ */ jsx(Trans, { message: "Cast" }) }),
    /* @__PURE__ */ jsx(TitleCreditsGrid, { credits: cast }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "mt-24",
        variant: "outline",
        color: "primary",
        elementType: Link,
        to: "full-credits",
        endIcon: /* @__PURE__ */ jsx(ArrowForwardIcon, {}),
        children: /* @__PURE__ */ jsx(Trans, { message: "All cast and crew" })
      }
    )
  ] });
}
function useRelatedTitles(titleId) {
  return useQuery({
    queryKey: ["titles", titleId, "related"],
    queryFn: () => fetchRelatedTitles(titleId)
  });
}
function fetchRelatedTitles(titleId) {
  return apiClient.get(`titles/${titleId}/related`).then((response) => response.data);
}
function RelatedTitlesPanel({ title }) {
  const { data } = useRelatedTitles(title.id);
  if (!data || data.titles.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(RelatedTitlesCarousel, { titles: data.titles });
}
function RelatedTitlesCarousel({ titles }) {
  const {
    scrollContainerRef,
    canScrollForward,
    canScrollBackward,
    scrollToPreviousPage,
    scrollToNextPage,
    containerClassName: containerClassName2,
    itemClassName: itemClassName2
  } = useCarousel();
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: !canScrollBackward,
              onClick: () => scrollToPreviousPage(),
              "aria-label": "Scroll left",
              children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: !canScrollForward,
              onClick: () => scrollToNextPage(),
              "aria-label": "Scroll right",
              children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "More like this" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollContainerRef,
        className: clsx(containerClassName2, "content-grid-portrait"),
        children: titles.map((item) => /* @__PURE__ */ jsx("div", { className: itemClassName2, children: /* @__PURE__ */ jsx(TitlePortraitGridItem, { item }) }, item.id))
      }
    )
  ] });
}
function TitlePageSeasonGrid({ data: { title, seasons } }) {
  const query = useTitleSeasons(title.id, seasons);
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        titleAppend: (seasons == null ? void 0 : seasons.total) ? `(${seasons.total})` : void 0,
        children: /* @__PURE__ */ jsx(Trans, { message: "Seasons" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-14 sm:grid-cols-6 lg:grid-cols-8", children: query.items.map((season) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          SeasonPoster,
          {
            title,
            season,
            srcSize: "sm",
            className: "aspect-poster flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx(
            SeasonLink,
            {
              className: "text-sm",
              title,
              seasonNumber: season.number,
              color: "primary"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
            FormattedDate,
            {
              date: season.release_date,
              options: { year: "numeric" }
            }
          ) })
        ] })
      ] }, season.id)) }),
      /* @__PURE__ */ jsx(
        InfiniteScrollSentinel,
        {
          query,
          variant: "loadMore",
          loaderMarginTop: "mt-14",
          size: "sm"
        }
      )
    ] })
  ] });
}
const CompactCredits = memo(({ credits = {} }) => {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-col gap-14 border-t pt-16", children: [
    ((_a = credits.creators) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx(PeopleDetail, { label: /* @__PURE__ */ jsx(Trans, { message: "Created by" }), children: /* @__PURE__ */ jsx(BulletSeparatedItems, { className: "hidden-scrollbar overflow-x-auto", children: credits.creators.slice(0, 3).map((creator) => /* @__PURE__ */ jsx(
      PersonLink,
      {
        person: creator,
        color: "primary",
        className: "whitespace-nowrap"
      },
      creator.id
    )) }) }) : null,
    ((_b = credits.directing) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx(
      PeopleDetail,
      {
        label: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "[one Director|other Directors]",
            values: { count: credits.directing.length }
          }
        ),
        children: /* @__PURE__ */ jsx(BulletSeparatedItems, { className: "hidden-scrollbar overflow-x-auto", children: credits.directing.slice(0, 3).map((director) => /* @__PURE__ */ jsx(
          PersonLink,
          {
            person: director,
            color: "primary",
            className: "whitespace-nowrap"
          },
          director.id
        )) })
      }
    ) : null,
    ((_c = credits.writing) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsx(
      PeopleDetail,
      {
        label: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "[one Writer|other Writers]",
            values: { count: credits.writing.length }
          }
        ),
        children: /* @__PURE__ */ jsx(BulletSeparatedItems, { className: "hidden-scrollbar overflow-x-auto", children: credits.writing.slice(0, 3).map((writer) => /* @__PURE__ */ jsx(
          PersonLink,
          {
            person: writer,
            color: "primary",
            className: "whitespace-nowrap"
          },
          writer.id
        )) })
      }
    ) : null,
    ((_d = credits.actors) == null ? void 0 : _d.length) ? /* @__PURE__ */ jsx(PeopleDetail, { label: /* @__PURE__ */ jsx(Trans, { message: "Stars" }), children: /* @__PURE__ */ jsx(BulletSeparatedItems, { className: "hidden-scrollbar overflow-x-auto", children: credits.actors.slice(0, 3).map((actor) => /* @__PURE__ */ jsx(
      PersonLink,
      {
        person: actor,
        color: "primary",
        className: "whitespace-nowrap"
      },
      actor.id
    )) }) }) : null
  ] });
});
function PeopleDetail({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 gap-24 md:flex", children: [
    /* @__PURE__ */ jsx("div", { className: "min-w-84 font-bold", children: label }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
}
function getGenreLink(genre, { absolute } = {}) {
  return getBaseMediaLink(`/genre/${genre.name}`, { absolute });
}
function useTitleNews(titleId) {
  return useQuery({
    queryKey: ["titles", `${titleId}`, "news"],
    queryFn: () => fetchNews(titleId)
  });
}
function fetchNews(titleId) {
  return apiClient.get(`titles/${titleId}/news`).then((response) => response.data);
}
function TitleNews({ title }) {
  const { data, isLoading } = useTitleNews(title.id);
  if (!isLoading && !(data == null ? void 0 : data.news_articles.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(SiteSectionHeading, { children: /* @__PURE__ */ jsx(Trans, { message: "Related news" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-24", children: data == null ? void 0 : data.news_articles.map((article) => /* @__PURE__ */ jsx(NewsArticleGridItem, { article }, article.id)) })
  ] });
}
const NewReviewForm = forwardRef(
  ({ reviewable, currentReview, className: className2, disabled }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useAuth();
    const form = useForm({
      defaultValues: {
        score: 8
      }
    });
    useEffect(() => {
      if (currentReview) {
        form.setValue("title", currentReview.title);
        form.setValue("body", currentReview.body);
        form.setValue("score", currentReview.score);
      }
    }, [form, currentReview]);
    const openReviewPanel = useCallback(() => {
      setIsExpanded(true);
    }, []);
    useImperativeHandle(
      ref,
      () => ({
        openReviewPanel
      }),
      [openReviewPanel]
    );
    const createReview = useCreateReview(form);
    return /* @__PURE__ */ jsxs(
      Form,
      {
        className: clsx("rounded border bg-alt p-14", className2),
        form,
        onSubmit: (newValues) => {
          if (disabled)
            return;
          createReview.mutate(
            {
              ...newValues,
              reviewable
            },
            {
              onSuccess: () => {
                toast(message("Review posted"));
                setIsExpanded(false);
              }
            }
          );
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "items-center gap-24 lg:flex", children: [
            /* @__PURE__ */ jsx(
              Avatar,
              {
                size: "xl",
                circle: true,
                src: user == null ? void 0 : user.avatar,
                label: user == null ? void 0 : user.display_name
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 text-xs text-muted max-md:mt-10", children: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: "Review as :name",
                  values: {
                    name: /* @__PURE__ */ jsx("span", { className: "font-medium text", children: user == null ? void 0 : user.display_name })
                  }
                }
              ) }),
              /* @__PURE__ */ jsx(
                StarSelector,
                {
                  readonly: disabled,
                  className: "-ml-8 max-lg:mb-12",
                  count: 10,
                  value: disabled ? 0 : form.watch("score"),
                  onValueChange: (newScore) => {
                    form.setValue("score", newScore);
                  }
                }
              )
            ] }),
            !isExpanded && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "flat",
                color: "primary",
                onClick: () => openReviewPanel(),
                disabled: !user || disabled,
                children: currentReview ? /* @__PURE__ */ jsx(Trans, { message: "Update review" }) : /* @__PURE__ */ jsx(Trans, { message: "Add review" })
              }
            )
          ] }),
          isExpanded && /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "title",
                className: "mb-24",
                label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
                labelSuffix: /* @__PURE__ */ jsx(Trans, { message: "10 character minimum" }),
                autoFocus: true,
                minLength: 10,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "body",
                label: /* @__PURE__ */ jsx(Trans, { message: "Review" }),
                labelSuffix: /* @__PURE__ */ jsx(Trans, { message: "100 character minimum" }),
                inputElementType: "textarea",
                rows: 5,
                minLength: 100,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-16 flex items-center justify-end gap-8", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  className: "min-w-100",
                  onClick: () => {
                    setIsExpanded(false);
                    form.reset(currentReview);
                  },
                  children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  variant: "flat",
                  color: "primary",
                  className: "min-w-100",
                  disabled: createReview.isPending,
                  children: /* @__PURE__ */ jsx(Trans, { message: "Post" })
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
);
function useSubmitReviewFeedback(review) {
  return useMutation({
    mutationFn: (payload) => submitFeedback(payload, review),
    onSuccess: () => {
      toast(message("Feedback submitted"));
    },
    onError: (r2) => showHttpErrorToast(r2)
  });
}
function submitFeedback(payload, review) {
  return apiClient.post(`reviews/${review.id}/feedback`, {
    is_helpful: payload.isHelpful
  }).then((r2) => r2.data);
}
function useSubmitReport(model) {
  return useMutation({
    mutationFn: (payload) => submitReport(model, payload),
    onSuccess: () => {
      toast(message("Thanks for reporting. We will review this content."));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function submitReport(model, payload) {
  return apiClient.post("report", {
    reason: payload.reason,
    model_id: model.id,
    model_type: model.model_type
  }).then((r2) => r2.data);
}
function useDeleteReport(model) {
  return useMutation({
    mutationFn: () => deleteReport(model),
    onSuccess: () => {
      toast(message("Report removed"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteReport(reportable) {
  return apiClient.delete(`report/${reportable.model_type}/${reportable.id}`).then((r2) => r2.data);
}
function ReviewListItem$1({
  review,
  isShared,
  hideShareButton,
  avatar
}) {
  const isMobile = useIsMobileMediaQuery();
  const ref = useRef(null);
  const scrolled = useRef(false);
  useEffect(() => {
    if (isShared && !scrolled.current) {
      setTimeout(() => {
        var _a;
        (_a = ref.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
        scrolled.current = true;
      }, 50);
    }
  }, [isShared]);
  return /* @__PURE__ */ jsxs("div", { ref, children: [
    isShared && /* @__PURE__ */ jsx("div", { className: "mb-8 mt-16 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Shared review" }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "group flex min-h-70 items-start gap-24 rounded py-18",
          isShared && "mb-34 border bg-alt pl-12"
        ),
        children: [
          !isMobile && (avatar || /* @__PURE__ */ jsx(UserAvatar, { user: review.user, size: "xl", circle: true })),
          /* @__PURE__ */ jsxs("div", { className: "flex-auto text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-8", children: [
              review.user && /* @__PURE__ */ jsx(UserDisplayName$1, { user: review.user }),
              /* @__PURE__ */ jsx("time", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: review.created_at }) })
            ] }),
            /* @__PURE__ */ jsx(TitleRating, { className: "mb-8 mt-10", score: review.score }),
            review.title && /* @__PURE__ */ jsx("div", { className: "mb-8 text-base font-medium", children: review.title }),
            /* @__PURE__ */ jsx("div", { className: "whitespace-break-spaces text-sm", children: review.body }),
            /* @__PURE__ */ jsxs("div", { className: "mt-16 items-center gap-8 md:flex", children: [
              /* @__PURE__ */ jsx(Feedback, { review }),
              !hideShareButton && /* @__PURE__ */ jsx(ShareButton$3, { review }),
              /* @__PURE__ */ jsx(ReviewOptionsTrigger, { review })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function ShareButton$3({ review }) {
  const { base_url } = useSettings();
  const location = useLocation();
  const url = `${base_url}${location.pathname}?reviewId=${review.id}`;
  const [, copyLink] = useClipboard(url);
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Share" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      className: "text-muted",
      onClick: () => {
        copyLink();
        toast(message("Review link copied to clipboard"));
      },
      children: /* @__PURE__ */ jsx(ShareIcon, {})
    }
  ) });
}
function Feedback({ review }) {
  const { user } = useAuth();
  const authHandler = useAuthClickCapture();
  const submitFeedback2 = useSubmitReviewFeedback(review);
  const isDisabled = submitFeedback2.isPending || user != null && user.id === review.user_id;
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count || 1);
  const [total, setTotal] = useState(
    review.helpful_count + review.not_helpful_count || 1
  );
  let initialFeedback;
  if (review.current_user_feedback != null) {
    initialFeedback = review.current_user_feedback ? "helpful" : "not_helpful";
  }
  const [currentFeedback, setCurrentFeedback] = useState(
    initialFeedback
  );
  return /* @__PURE__ */ jsxs("div", { className: "mr-auto flex flex-wrap items-center gap-6 max-md:mb-12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":helpfulCount out of :total people found this helpful. Was this review helpful?",
        values: { helpfulCount, total }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 pb-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "link",
          className: clsx(
            "uppercase",
            currentFeedback === "helpful" && "pointer-events-none"
          ),
          color: currentFeedback === "helpful" ? "primary" : void 0,
          disabled: isDisabled,
          onClickCapture: authHandler,
          onClick: () => submitFeedback2.mutate(
            { isHelpful: true },
            {
              onSuccess: () => {
                setHelpfulCount((count) => count + 1);
                setCurrentFeedback("helpful");
                if (!currentFeedback) {
                  setTotal((count) => count + 1);
                }
              }
            }
          ),
          children: /* @__PURE__ */ jsx(Trans, { message: "Yes" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-14 w-1 bg-divider" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "link",
          className: clsx(
            "uppercase",
            currentFeedback === "not_helpful" && "pointer-events-none"
          ),
          color: currentFeedback === "not_helpful" ? "primary" : void 0,
          disabled: isDisabled,
          onClickCapture: authHandler,
          onClick: () => submitFeedback2.mutate(
            { isHelpful: false },
            {
              onSuccess: () => {
                setHelpfulCount((count) => count - 1);
                setCurrentFeedback("not_helpful");
                if (!currentFeedback) {
                  setTotal((count) => count + 1);
                }
              }
            }
          ),
          children: /* @__PURE__ */ jsx(Trans, { message: "No" })
        }
      )
    ] })
  ] });
}
function ReviewOptionsTrigger({ review }) {
  const { user, hasPermission } = useAuth();
  const report = useSubmitReport(review);
  const deleteReport2 = useDeleteReport(review);
  const [isReported, setIsReported] = useState(review.current_user_reported);
  const handleReport = () => {
    if (isReported) {
      deleteReport2.mutate(void 0, {
        onSuccess: () => setIsReported(false)
      });
    } else {
      report.mutate({}, { onSuccess: () => setIsReported(true) });
    }
  };
  const deleteReview = useDeleteReviews();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const showDeleteButton = user && review.user_id === user.id || hasPermission("reviews.delete");
  const handleDelete = (isConfirmed) => {
    setIsDeleteDialogOpen(false);
    if (isConfirmed) {
      deleteReview.mutate({ reviewIds: [review.id] });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(IconButton, { className: "text-muted", "aria-label": "More options", children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(Item, { value: "report", onSelected: () => handleReport(), children: isReported ? /* @__PURE__ */ jsx(Trans, { message: "Remove report" }) : /* @__PURE__ */ jsx(Trans, { message: "Report review" }) }),
        showDeleteButton && /* @__PURE__ */ jsx(
          Item,
          {
            value: "delete",
            onSelected: () => setIsDeleteDialogOpen(true),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: isDeleteDialogOpen,
        onClose: (isConfirmed) => handleDelete(isConfirmed),
        children: /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete review?" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this review?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      }
    )
  ] });
}
function UserDisplayName$1({ user }) {
  const isMobile = useIsMobileMediaQuery();
  const { auth } = useContext(SiteConfigContext);
  const sharedClassName = "flex items-center gap-8 text-base font-medium";
  if (auth.getUserProfileLink) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      isMobile && /* @__PURE__ */ jsx(UserAvatar, { user, size: "sm", circle: true }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: auth.getUserProfileLink(user),
          className: clsx("hover:underline", sharedClassName),
          children: user.display_name
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: sharedClassName, children: [
    isMobile && /* @__PURE__ */ jsx(UserAvatar, { user, size: "sm", circle: true }),
    user.display_name
  ] });
}
function AccountRequiredCard({ message: message2 }) {
  const { user } = useAuth();
  if (user)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto my-40 max-w-850 rounded border border-dashed px-20 py-30 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 text-xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Account required" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-base text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        ...message2,
        values: {
          l: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/login", children: parts }),
          r: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
        }
      }
    ) })
  ] });
}
const accountRequiredMessage$1 = message(
  "Please <l>login</l> or <r>create account</r> to add a review"
);
function ReviewList({
  reviewable,
  disabled,
  noResultsMessage,
  showAccountRequiredMessage
}) {
  var _a, _b;
  const query = useReviews(reviewable);
  const actionsRef = useRef(null);
  const { user } = useAuth();
  const currentUserReview = (_a = query.data) == null ? void 0 : _a.pages[0].current_user_review;
  const sharedReview = (_b = query.data) == null ? void 0 : _b.pages[0].shared_review;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      NewReviewForm,
      {
        className: "mb-14 md:-mx-14",
        reviewable,
        currentReview: currentUserReview,
        ref: actionsRef,
        disabled
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      showAccountRequiredMessage && /* @__PURE__ */ jsx(AccountRequiredCard, { message: accountRequiredMessage$1 }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.isLoading ? /* @__PURE__ */ jsx(ReviewListSkeletons, { count: 4 }) : /* @__PURE__ */ jsx(
        ReviewListItems,
        {
          reviews: query.items,
          sharedReview,
          noResultsMessage
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "ml-84", children: /* @__PURE__ */ jsx(
        InfiniteScrollSentinel,
        {
          query,
          variant: "loadMore",
          loaderMarginTop: "mt-14",
          loadMoreExtraContent: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "flat",
              color: "primary",
              disabled: !user,
              onClick: () => {
                var _a2;
                (_a2 = actionsRef.current) == null ? void 0 : _a2.openReviewPanel();
              },
              children: /* @__PURE__ */ jsx(Trans, { message: "Add a review" })
            }
          )
        }
      ) })
    ] })
  ] });
}
function ReviewListItems({
  reviews,
  sharedReview,
  noResultsMessage
}) {
  const { user } = useAuth();
  let content2;
  if (!reviews.length) {
    content2 = user ? noResultsMessage || /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-24",
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "Seems a little quiet over here" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Be the first to leave a review" })
      }
    ) : null;
  } else {
    content2 = reviews.map((review) => /* @__PURE__ */ jsx(ReviewListItem$1, { review }, review.id));
  }
  return /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    sharedReview && /* @__PURE__ */ jsx(ReviewListItem$1, { review: sharedReview, isShared: true }),
    content2
  ] }, "reviews");
}
function ReviewListSkeletons({ count }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: [...new Array(count).keys()].map((index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group flex min-h-[212px] items-start gap-24 py-18",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", radius: "rounded-full", size: "w-60 h-60" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto text-sm", children: [
          /* @__PURE__ */ jsx(
            Skeleton,
            {
              className: "mb-4 max-w-200 text-base font-medium",
              variant: "text"
            }
          ),
          /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "mb-8 mt-10 max-w-60 text-lg" }),
          /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "mb-8 max-w-240 text-base" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "text-sm", variant: "text" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "text-sm", variant: "text" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "mt-16 text-xs", variant: "text" })
        ] })
      ]
    },
    index
  )) }, "loading-skeleton");
}
function TitlePageReviewList({ title }) {
  const [sort, setSort] = useLocalStorage(
    `reviewSort.${title.model_type}`,
    "created_at:desc"
  );
  const query = useReviews(title);
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        titleAppend: query.totalItems ? /* @__PURE__ */ jsxs("span", { children: [
          "(",
          query.totalItems,
          ")"
        ] }) : null,
        actions: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
          /* @__PURE__ */ jsx(TitleRating, { score: title.rating, className: "max-md:hidden" }),
          /* @__PURE__ */ jsx(
            ReviewListSortButton,
            {
              value: sort,
              onValueChange: (newValue) => setSort(newValue)
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Reviews" })
      }
    ),
    /* @__PURE__ */ jsx(
      ReviewList,
      {
        reviewable: title,
        showAccountRequiredMessage: title.status !== "upcoming",
        noResultsMessage: title.status === "upcoming" ? /* @__PURE__ */ jsx(
          IllustratedMessage,
          {
            className: "mt-24",
            size: "sm",
            title: /* @__PURE__ */ jsx(Trans, { message: "This title is not released yet" }),
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Come back after :date to see the reviews",
                values: { date: /* @__PURE__ */ jsx(FormattedDate, { date: title.release_date }) }
              }
            )
          }
        ) : void 0
      }
    )
  ] });
}
function TitlePageVideoGrid({ title, episode }) {
  const videos = episode ? episode.videos : title.videos;
  const link = episode ? `${getEpisodeLink(
    title,
    episode.season_number,
    episode.episode_number
  )}/episodes/${episode.id}/videos` : `${getTitleLink(title)}/videos`;
  return /* @__PURE__ */ jsx(
    VideoGrid,
    {
      videos,
      title,
      episode,
      heading: /* @__PURE__ */ jsx(SiteSectionHeading, { link, children: /* @__PURE__ */ jsx(Trans, { message: "Videos" }) })
    }
  );
}
function TitlePageEpisodeGrid({ data, label, showSeasonSelector }) {
  const { season } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(
    season ? parseInt(season) : 1
  );
  const query = useSeasonEpisodes(
    data.episodes,
    {
      perPage: 21,
      excludeDescription: "true"
    },
    {
      season: selectedSeason,
      willSortOrFilter: true,
      defaultOrderBy: "episode_number",
      defaultOrderDir: "asc",
      titleId: data.title.id
    }
  );
  const { isInitialLoading, items, sortDescriptor, setSortDescriptor } = query;
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        wrap: true,
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          showSeasonSelector && /* @__PURE__ */ jsx(
            SeasonSelector,
            {
              selectedSeason,
              onSeasonChange: setSelectedSeason,
              seasonCount: data.title.seasons_count
            }
          ),
          /* @__PURE__ */ jsx(
            SortButton,
            {
              value: `${sortDescriptor.orderBy}:${sortDescriptor == null ? void 0 : sortDescriptor.orderDir}`,
              onValueChange: (value) => {
                const [orderBy, orderDir] = value.split(":");
                setSortDescriptor({
                  orderBy,
                  orderDir
                });
              }
            }
          )
        ] }),
        children: label || /* @__PURE__ */ jsx(Trans, { message: "Episodes" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isInitialLoading ? /* @__PURE__ */ jsx(SkeletonGrid, {}) : /* @__PURE__ */ jsx(EpisodeGrid, { episodes: items, title: data.title, query }) })
  ] });
}
function GridItem({ episode, title }) {
  const runtime = episode.runtime || title.runtime;
  const name = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CompactSeasonEpisode, { className: "uppercase", episode }),
    " -",
    " ",
    episode.name
  ] });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
      EpisodePoster,
      {
        episode,
        title,
        srcSize: "md",
        showPlayButton: true,
        rightAction: runtime ? /* @__PURE__ */ jsx("span", { className: "rounded bg-black/50 p-4 text-xs font-medium text-white", children: /* @__PURE__ */ jsx(FormattedDuration, { minutes: runtime, verbose: true }) }) : null
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      episode.release_date && /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm text-muted", children: /* @__PURE__ */ jsx(FormattedDate, { date: episode.release_date }) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-base", children: episode.primary_video ? /* @__PURE__ */ jsx(
        Link,
        {
          className: "rounded outline-none hover:underline focus-visible:ring focus-visible:ring-offset-2",
          to: getWatchLink(episode.primary_video),
          children: name
        }
      ) : name })
    ] })
  ] });
}
function EpisodeGrid({ title, episodes, query }) {
  return /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(ContentGridLayout, { variant: "landscape", children: episodes.map((episode) => /* @__PURE__ */ jsx(GridItem, { episode, title }, episode.id)) }),
    /* @__PURE__ */ jsx(
      InfiniteScrollSentinel,
      {
        query,
        variant: "loadMore",
        size: "sm",
        loaderMarginTop: "mt-16"
      }
    )
  ] }, "episode-grid");
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(ContentGridLayout, { variant: "landscape", children: [...new Array(6).keys()].map((number) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "aspect-video", animation: "pulsate" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 min-h-44", children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "text" }),
      /* @__PURE__ */ jsx(Skeleton, { variant: "text" })
    ] })
  ] }, number)) }) }, "episode-grid");
}
function SeasonSelector({
  selectedSeason,
  onSeasonChange,
  seasonCount
}) {
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectedValue: selectedSeason,
      onSelectionChange: (newValue) => onSeasonChange(newValue),
      selectionMode: "single",
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", startIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}), className: "mr-4", children: /* @__PURE__ */ jsx(Trans, { message: "Season :number", values: { number: selectedSeason } }) }),
        /* @__PURE__ */ jsx(Menu, { children: [...new Array(seasonCount).keys()].map((number) => {
          const seasonNumber = number + 1;
          return /* @__PURE__ */ jsx(Item, { value: seasonNumber, children: /* @__PURE__ */ jsx(Trans, { message: "Season :number", values: { number: seasonNumber } }) }, seasonNumber);
        }) })
      ]
    }
  );
}
const SortOptions = [
  {
    value: "episode_number:desc",
    label: message("Newest")
  },
  {
    value: "episode_number:asc",
    label: message("Oldest")
  }
];
function SortButton({ value, onValueChange }) {
  let selectedOption = SortOptions.find((option) => option.value === value);
  if (!selectedOption) {
    selectedOption = SortOptions[0];
  }
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectedValue: value,
      onSelectionChange: (newValue) => onValueChange(newValue),
      selectionMode: "single",
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", startIcon: /* @__PURE__ */ jsx(SortIcon, {}), children: /* @__PURE__ */ jsx(Trans, { ...selectedOption.label }) }),
        /* @__PURE__ */ jsx(Menu, { children: SortOptions.map((option) => /* @__PURE__ */ jsx(Item, { value: option.value, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.value)) })
      ]
    }
  );
}
function useLinkifiedString(text) {
  return useMemo(() => {
    if (!text) {
      return text;
    }
    return linkifyStr(text, {
      nl2br: true,
      attributes: { rel: "nofollow" }
    });
  }, [text]);
}
function TruncatedDescription({
  description,
  className: className2
}) {
  const linkifiedDescription = useLinkifiedString(description);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isShowingAll, setIsShowingAll] = useState(false);
  useLayoutEffect(() => {
    var _a, _b;
    const wrapperHeight = ((_a = wrapperRef.current) == null ? void 0 : _a.getBoundingClientRect().height) || 0;
    const contentHeight = ((_b = wrapperRef.current) == null ? void 0 : _b.scrollHeight) || 0;
    if (contentHeight > wrapperHeight) {
      setIsOverflowing(true);
    }
  }, []);
  if (!linkifiedDescription)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: wrapperRef,
        className: clsx(
          "relative",
          className2,
          !isShowingAll && "max-h-160 overflow-hidden",
          !isShowingAll && isOverflowing && "after:absolute after:bottom-0 after:left-0 after:h-20 after:w-full after:bg-gradient-to-b after:from-transparent after:to-background"
        ),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            dangerouslySetInnerHTML: { __html: linkifiedDescription }
          }
        )
      }
    ),
    isOverflowing && /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        className: "mt-20",
        variant: "outline",
        onClick: () => setIsShowingAll(!isShowingAll),
        children: isShowingAll ? /* @__PURE__ */ jsx(Trans, { message: "Show less" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
      }
    )
  ] });
}
function TitlePageMainContent({ data, className: className2 }) {
  var _a, _b;
  const { title, credits } = data;
  const { title_page } = useSettings();
  return /* @__PURE__ */ jsxs("main", { className: clsx(className2, "@container"), children: [
    ((_a = title.genres) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx(ChipList, { children: title.genres.map((genre) => /* @__PURE__ */ jsx(
      Chip,
      {
        className: "capitalize",
        elementType: Link,
        to: getGenreLink(genre),
        children: /* @__PURE__ */ jsx(Trans, { message: genre.display_name || genre.name })
      },
      genre.id
    )) }) : null,
    title.tagline && /* @__PURE__ */ jsxs("blockquote", { className: "mt-16", children: [
      "“",
      title.tagline,
      "”"
    ] }),
    /* @__PURE__ */ jsx(TruncatedDescription, { className: "mt-16", description: title.description }),
    /* @__PURE__ */ jsx(CompactCredits, { credits }),
    /* @__PURE__ */ jsx(AdHost, { slot: "title_top", className: "pt-48" }),
    (_b = title_page == null ? void 0 : title_page.sections) == null ? void 0 : _b.map((name) => /* @__PURE__ */ jsx(TitlePageSection, { name, title, data }, name))
  ] });
}
function TitlePageSection({ name, title, data }) {
  var _a;
  const { titles } = useSettings();
  const { hasPermission } = useAuth();
  switch (name) {
    case "episodes":
      return title.is_series ? /* @__PURE__ */ jsx(TitlePageEpisodeGrid, { data, showSeasonSelector: true }) : null;
    case "seasons":
      return title.is_series ? /* @__PURE__ */ jsx(TitlePageSeasonGrid, { data }) : null;
    case "videos":
      return /* @__PURE__ */ jsx(TitlePageVideoGrid, { title });
    case "images":
      return /* @__PURE__ */ jsx(
        TitlePageImageGrid,
        {
          images: title.images,
          heading: /* @__PURE__ */ jsx(SiteSectionHeading, { link: `${getTitleLink(title)}/images`, children: /* @__PURE__ */ jsx(Trans, { message: "Images" }) })
        }
      );
    case "reviews":
      return titles.enable_reviews && hasPermission("reviews.view") ? /* @__PURE__ */ jsx(TitlePageReviewList, { title }) : null;
    case "cast":
      return /* @__PURE__ */ jsx(TitlePageCast, { credits: (_a = data.credits) == null ? void 0 : _a.actors });
    case "news":
      return /* @__PURE__ */ jsx(TitleNews, { title });
    case "related":
      return /* @__PURE__ */ jsx(RelatedTitlesPanel, { title });
  }
}
function TitlePageHeaderLayout({
  name,
  description,
  children,
  right,
  poster
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center justify-between gap-24 lg:flex", children: [
    poster,
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      children,
      /* @__PURE__ */ jsx("h1", { className: "mb-12 text-4xl md:mb-8 md:text-5xl", children: name }),
      description && /* @__PURE__ */ jsx("div", { className: "text-base font-normal", children: description })
    ] }),
    right
  ] });
}
function useCurrentUserWatchlist() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["channel", "watchlist", "compact"],
    queryFn: () => fetchWatchlist(),
    enabled: !!user
  });
}
function useIsItemWatchlisted(item) {
  var _a, _b, _c;
  const query = useCurrentUserWatchlist();
  return {
    isLoading: query.isLoading && query.fetchStatus !== "idle",
    isWatchlisted: !!((_c = (_b = (_a = query.data) == null ? void 0 : _a.watchlist) == null ? void 0 : _b.items[item.model_type]) == null ? void 0 : _c[item.id])
  };
}
function fetchWatchlist() {
  return apiClient.get(`users/me/watchlist`).then((response) => response.data);
}
function useAddToWatchlist() {
  const { data } = useCurrentUserWatchlist();
  return useMutation({
    mutationFn: (payload) => addToWatchlist(data.watchlist.id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["channel", "watchlist"]
      });
      toast(message("Added to your watchlist"));
    },
    onError: (r2) => showHttpErrorToast(r2)
  });
}
function addToWatchlist(listId, payload) {
  return apiClient.post(`channel/${listId}/add`, {
    itemId: payload.id,
    itemType: payload.model_type
  }).then((r2) => r2.data);
}
function useRemoveFromWatchlist() {
  const { data } = useCurrentUserWatchlist();
  return useMutation({
    mutationFn: (payload) => removeFromWatchlist(data.watchlist.id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["channel", "watchlist"]
      });
      toast(message("Removed from your watchlist"));
    },
    onError: (r2) => showHttpErrorToast(r2)
  });
}
function removeFromWatchlist(listId, payload) {
  return apiClient.post(`channel/${listId}/remove`, {
    itemId: payload.id,
    itemType: payload.model_type
  }).then((r2) => r2.data);
}
function WatchlistButton({
  item,
  variant = "flat",
  color = "primary",
  size = "lg",
  className: className2
}) {
  const { isLoading, isWatchlisted } = useIsItemWatchlisted(item);
  const addToWatchlist2 = useAddToWatchlist();
  const removeFromWatchlist2 = useRemoveFromWatchlist();
  const authHandler = useAuthClickCapture();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      color,
      size: size === "sm" ? "xs" : void 0,
      className: clsx(size === "lg" && "mt-14 min-h-40 w-full", className2),
      startIcon: isWatchlisted ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(AddIcon, {}),
      disabled: addToWatchlist2.isPending || removeFromWatchlist2.isPending || isLoading,
      onClickCapture: authHandler,
      onClick: () => {
        if (isWatchlisted) {
          removeFromWatchlist2.mutate(item);
        } else {
          addToWatchlist2.mutate(item);
        }
      },
      children: isWatchlisted ? /* @__PURE__ */ jsx(Trans, { message: "In watchlist" }) : size === "sm" ? /* @__PURE__ */ jsx(Trans, { message: "Watchlist" }) : /* @__PURE__ */ jsx(Trans, { message: "Add to watchlist" })
    }
  );
}
function TitlePageHeader({ title, showPoster = false }) {
  return /* @__PURE__ */ jsx(
    TitlePageHeaderLayout,
    {
      name: /* @__PURE__ */ jsx(TitleLink, { title }),
      poster: showPoster ? /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-80", srcSize: "sm" }) : null,
      description: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(BulletSeparatedItems, { children: [
        /* @__PURE__ */ jsx(FormattedDate, { date: title.release_date }),
        title.certification && /* @__PURE__ */ jsx("div", { className: "uppercase", children: title.certification }),
        title.runtime && /* @__PURE__ */ jsx(FormattedDuration, { minutes: title.runtime, verbose: true })
      ] }) }),
      right: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-10 max-md:mt-10 max-md:flex-wrap", children: [
        /* @__PURE__ */ jsx(InteractableRating, { title }),
        /* @__PURE__ */ jsx(WatchlistButton, { item: title, size: "sm", className: "md:hidden" })
      ] })
    }
  );
}
function TitlePageHeaderImage({ title, season, episode }) {
  const { streaming } = useSettings();
  const watchItem = episode || season || title;
  const backdropUrl = (episode == null ? void 0 : episode.poster) || title.backdrop;
  if (!backdropUrl) {
    return null;
  }
  const backdrop = /* @__PURE__ */ jsx(
    TitleBackdrop,
    {
      title,
      episode,
      size: "w-full h-full",
      className: "object-top",
      lazy: false
    }
  );
  return /* @__PURE__ */ jsxs("header", { className: "relative isolate max-h-320 overflow-hidden bg-black md:max-h-400 lg:max-h-450", children: [
    /* @__PURE__ */ jsx("div", { className: "container relative left-0 right-0 top-0 z-20 mx-auto h-full w-full px-24", children: backdrop }),
    /* @__PURE__ */ jsx("div", { className: "h-[calc(100% + 20px)] absolute left-1/2 top-1/2 z-10 w-[calc(100%+100px)] -translate-x-1/2 -translate-y-1/2 bg-black opacity-50 blur-md", children: backdrop }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-b from-black/20 md:from-black/40" }),
    (streaming == null ? void 0 : streaming.show_header_play) && (watchItem == null ? void 0 : watchItem.primary_video) ? /* @__PURE__ */ jsx(PlayButton, { item: watchItem }) : null
  ] });
}
function PlayButton({ item }) {
  const link = getWatchLink(item.primary_video);
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      radius: "rounded-full",
      color: "white",
      variant: "raised",
      size: "lg",
      className: "absolute inset-0 z-40 m-auto",
      elementType: Link,
      to: link,
      children: /* @__PURE__ */ jsx(MediaPlayIcon, {})
    }
  );
}
function TitlePageAsideLayout({ poster, children, className: className2 }) {
  return /* @__PURE__ */ jsxs("div", { className: clsx("top-40 flex-shrink-0 md:sticky md:w-1/4", className2), children: [
    poster,
    /* @__PURE__ */ jsx("div", { className: "flex-auto max-md:ml-16 max-md:text-sm", children })
  ] });
}
function DetailItem({ label, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("dt", { className: "font-semibold", children: label }),
    /* @__PURE__ */ jsx("dl", { className: "mb-12 md:mb-24", children })
  ] });
}
function KeywordLink({ keyword, children, ...otherProps }) {
  const link = useMemo(() => getKeywordLink$1(keyword), [keyword]);
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...otherProps, link, children: children ?? /* @__PURE__ */ jsx(Trans, { message: keyword.display_name || keyword.name }) });
}
function getKeywordLink$1(keyword, { absolute } = {}) {
  return getBaseMediaLink(`/keyword/${keyword.name}`, { absolute });
}
function ProductionCountryLink({
  country,
  children,
  ...otherProps
}) {
  const link = useMemo(() => getKeywordLink(country), [country]);
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...otherProps, link, children: children ?? (country.display_name || country.name) });
}
function getKeywordLink(country, { absolute } = {}) {
  return getBaseMediaLink(`/production-countries/${country.name}`, { absolute });
}
function WatchNowButton({
  video,
  variant = "outline",
  color = "primary",
  size = "w-full min-h-40 mt-14",
  defaultLabel
}) {
  const label = video.episode_num && !defaultLabel ? /* @__PURE__ */ jsxs("span", { className: "inline-flex gap-4", children: [
    /* @__PURE__ */ jsx(Trans, { message: "Start watching" }),
    /* @__PURE__ */ jsx(
      CompactSeasonEpisode,
      {
        seasonNum: video.season_num,
        episodeNum: video.episode_num
      }
    )
  ] }) : /* @__PURE__ */ jsx(Trans, { message: "Watch now" });
  return /* @__PURE__ */ jsx(
    Button,
    {
      to: getWatchLink(video),
      elementType: Link,
      startIcon: /* @__PURE__ */ jsx(MediaPlayIcon, {}),
      color,
      variant,
      className: size,
      children: label
    }
  );
}
function useIsStreamingMode() {
  const { streaming } = useSettings();
  return (streaming == null ? void 0 : streaming.prefer_full) || false;
}
function TitlePageAside({ data: { title, language }, className: className2 }) {
  var _a, _b;
  const isStreamingMode = useIsStreamingMode();
  const { hasPermission } = useAuth();
  return /* @__PURE__ */ jsxs(
    TitlePageAsideLayout,
    {
      className: className2,
      poster: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-full", srcSize: "lg" }),
        hasPermission("titles.update") && /* @__PURE__ */ jsx(
          IconButton,
          {
            elementType: Link,
            to: `/admin/titles/${title.id}/edit`,
            className: "absolute bottom-6 right-4",
            color: "white",
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        )
      ] }),
      children: [
        isStreamingMode && title.primary_video && /* @__PURE__ */ jsx(WatchNowButton, { video: title.primary_video, variant: "flat" }),
        /* @__PURE__ */ jsx(
          WatchlistButton,
          {
            item: title,
            variant: isStreamingMode ? "outline" : "flat"
          }
        ),
        /* @__PURE__ */ jsx(ShareButton$2, { title }),
        /* @__PURE__ */ jsxs("dl", { className: "mt-14", children: [
          language && /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Original language" }), children: /* @__PURE__ */ jsx(Trans, { message: language }) }),
          title.original_title !== title.name && /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Original title" }), children: title.original_title }),
          title.budget ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Budget" }), children: /* @__PURE__ */ jsx(FormattedCurrency, { value: title.budget, currency: "usd" }) }) : null,
          title.revenue ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Revenue" }), children: /* @__PURE__ */ jsx(FormattedCurrency, { value: title.revenue, currency: "usd" }) }) : null,
          ((_a = title.production_countries) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Production countries" }), children: /* @__PURE__ */ jsx("ul", { className: "mt-12 flex flex-wrap gap-8", children: title.production_countries.map((country) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "w-max rounded-full border px-10 py-4 text-xs",
              children: /* @__PURE__ */ jsx(ProductionCountryLink, { country })
            },
            country.id
          )) }) }) : null,
          ((_b = title.keywords) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Keywords" }), children: /* @__PURE__ */ jsx("ul", { className: "mt-12 flex flex-wrap gap-8", children: title.keywords.map((keyword) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "w-max rounded-full border px-10 py-4 text-xs",
              children: /* @__PURE__ */ jsx(KeywordLink, { keyword })
            },
            keyword.id
          )) }) }) : null
        ] })
      ]
    }
  );
}
function ShareButton$2({ title }) {
  const link = getTitleLink(title, { absolute: true });
  return /* @__PURE__ */ jsx(ShareMenuTrigger, { link, children: /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(ShareIcon, {}),
      className: "mt-14 min-h-40 w-full",
      children: /* @__PURE__ */ jsx(Trans, { message: "Share" })
    }
  ) });
}
function TitlePage() {
  const query = useTitle("titlePage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$b, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$b({ data }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title: data.title }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "items-start gap-54 md:flex", children: [
      /* @__PURE__ */ jsx(TitlePageAside, { data, className: "max-lg:hidden" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx(TitlePageHeader, { title: data.title }),
        /* @__PURE__ */ jsx(TitlePageMainContent, { data })
      ] })
    ] }) })
  ] });
}
function SeasonPage() {
  const query = useSeason("seasonPage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$a, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$a({ data }) {
  const { title, season } = data;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title, season }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-center gap-12", children: [
        /* @__PURE__ */ jsx(TitlePoster, { size: "w-70", srcSize: "sm", title }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(TitleLink, { title, color: "primary", className: "text-xl" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg", children: /* @__PURE__ */ jsx(Trans, { message: "Episode list" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(SeasonList, { title }),
      /* @__PURE__ */ jsx(EpisodeList$1, { data }),
      /* @__PURE__ */ jsx(SeasonList, { title })
    ] })
  ] });
}
function SeasonList({ title }) {
  const { season } = useParams();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 text-base font-semibold", children: [
      /* @__PURE__ */ jsx(Trans, { message: "Seasons" }),
      ":"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-34 flex flex-wrap items-center gap-10", children: [...new Array(title.seasons_count).keys()].map((index) => {
      const number = index + 1;
      const isActive = season === `${number}`;
      return /* @__PURE__ */ jsx(
        SeasonLink,
        {
          title,
          seasonNumber: number,
          className: clsx(
            "flex h-30 w-30 flex-shrink-0 items-center justify-center rounded border text-base",
            isActive ? "pointer-events-none bg-primary text-white" : "text-primary"
          ),
          children: number
        },
        number
      );
    }) })
  ] });
}
function EpisodeList$1({ data: { episodes, title } }) {
  const query = useSeasonEpisodes(episodes);
  return /* @__PURE__ */ jsxs("main", { children: [
    query.items.map((episode) => /* @__PURE__ */ jsx(
      EpisodeListItem,
      {
        episode,
        title,
        allowRating: true,
        showPlayButton: true,
        className: "mb-34"
      },
      episode.id
    )),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function EpisodePageHeader({ title, episode, showPoster }) {
  const navigate = useNavigate();
  const runtime = episode.runtime || title.runtime;
  return /* @__PURE__ */ jsx(
    TitlePageHeaderLayout,
    {
      poster: showPoster ? /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-80", srcSize: "sm" }) : void 0,
      name: episode.name,
      description: /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "my-10 md:my-0", children: [
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Aired :date",
            values: {
              date: /* @__PURE__ */ jsx(FormattedDate, { date: episode.release_date })
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: title.certification }),
        runtime ? /* @__PURE__ */ jsx(FormattedDuration, { minutes: runtime, verbose: true }) : null
      ] }),
      right: /* @__PURE__ */ jsx(InteractableRating, { title, episode }),
      children: /* @__PURE__ */ jsxs(Breadcrumb, { isNavigation: true, children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(getTitleLink(title)), children: title.name }),
        /* @__PURE__ */ jsx(
          BreadcrumbItem,
          {
            onSelected: () => navigate(getSeasonLink(title, episode.season_number)),
            children: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Season :number",
                values: { number: episode.season_number }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Episode :number",
            values: { number: episode.episode_number }
          }
        ) })
      ] })
    }
  );
}
function EpisodePage() {
  const query = useEpisode("episodePage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$9, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$9({ data }) {
  const { episode, title } = data;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title, episode }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto mt-12 px-14 md:mt-40 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "items-start gap-54 md:flex", children: [
      /* @__PURE__ */ jsx(Aside, { title, episode }),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx(EpisodePageHeader, { title, episode }),
        /* @__PURE__ */ jsx(MainContent, { data })
      ] })
    ] }) })
  ] });
}
function MainContent({ data }) {
  var _a;
  const { episode, title, credits } = data;
  const { title_page } = useSettings();
  return /* @__PURE__ */ jsxs("main", { className: "@container", children: [
    ((_a = title.genres) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx(ChipList, { children: title.genres.map((genre) => /* @__PURE__ */ jsx(
      Chip,
      {
        className: "capitalize",
        elementType: Link,
        to: getGenreLink(genre),
        children: genre.display_name || genre.name
      },
      genre.id
    )) }) : null,
    /* @__PURE__ */ jsx(
      TruncatedDescription,
      {
        className: "mt-16",
        description: episode.description
      }
    ),
    /* @__PURE__ */ jsx(CompactCredits, { credits }),
    title_page == null ? void 0 : title_page.sections.map((name) => /* @__PURE__ */ jsx(EpisodePageSection, { name, data }, name))
  ] });
}
function EpisodePageSection({ name, data }) {
  var _a;
  switch (name) {
    case "videos":
      return /* @__PURE__ */ jsx(TitlePageVideoGrid, { title: data.title, episode: data.episode });
    case "cast":
      return /* @__PURE__ */ jsx(TitlePageCast, { credits: (_a = data.credits) == null ? void 0 : _a.actors });
    case "related":
      return /* @__PURE__ */ jsx(RelatedTitlesPanel, { title: data.title });
    case "episodes":
      return /* @__PURE__ */ jsx(
        TitlePageEpisodeGrid,
        {
          data,
          label: /* @__PURE__ */ jsx(Trans, { message: "Other episodes" })
        }
      );
    default:
      return null;
  }
}
function Aside({ title, episode }) {
  const isStreamingMode = useIsStreamingMode();
  return /* @__PURE__ */ jsxs(
    TitlePageAsideLayout,
    {
      className: "max-md:hidden",
      poster: /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-full", srcSize: "lg" }),
      children: [
        isStreamingMode && episode.primary_video && /* @__PURE__ */ jsx(
          WatchNowButton,
          {
            video: episode.primary_video,
            variant: "flat",
            defaultLabel: true
          }
        ),
        /* @__PURE__ */ jsx(
          WatchlistButton,
          {
            item: title,
            variant: isStreamingMode ? "outline" : "flat"
          }
        )
      ]
    }
  );
}
function useWatchPageVideo() {
  const { videoId } = useParams();
  return useQuery({
    queryKey: ["video", "watch-page", videoId],
    queryFn: () => fetchVideo(videoId),
    placeholderData: keepPreviousData,
    initialData: () => {
      var _a;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a.watchPage;
      if (data && `${data.video.id}` === videoId) {
        return data;
      }
    }
  });
}
function fetchVideo(videoId) {
  return apiClient.get(`watch/${videoId}`).then((response) => response.data);
}
function commentsQueryKey(commentable, params = {}) {
  return ["comment", `${commentable.id}-${commentable.model_type}`, params];
}
function useComments(commentable, params = {}) {
  return useInfiniteData({
    queryKey: commentsQueryKey(commentable, params),
    endpoint: "commentable/comments",
    //paginate: 'cursor',
    queryParams: {
      commentable_type: commentable.model_type,
      commentable_id: commentable.id,
      ...params
    }
  });
}
function useCreateComment() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (props) => createComment(props),
    onSuccess: async (response, props) => {
      await queryClient2.invalidateQueries({
        queryKey: [
          "comment",
          `${props.commentable.id}-${props.commentable.model_type}`
        ]
      });
      toast(message("Comment posted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function createComment({
  commentable,
  content: content2,
  inReplyTo,
  ...other
}) {
  const payload = {
    commentable_id: commentable.id,
    commentable_type: commentable.model_type,
    content: content2,
    inReplyTo,
    ...other
  };
  return apiClient.post("comment", payload).then((r2) => r2.data);
}
function NewCommentForm({
  commentable,
  inReplyTo,
  onSuccess,
  className: className2,
  autoFocus,
  payload,
  ...props
}) {
  const { trans } = useTrans();
  const { user } = useAuth();
  const createComment2 = useCreateComment();
  const isMobile = useIsMobileMediaQuery();
  const inputRef = useObjectRef(props.inputRef);
  const [inputIsExpanded, setInputIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const clearInput = () => {
    setInputIsExpanded(false);
    if (inputRef.current) {
      inputRef.current.blur();
      setInputValue("");
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: clsx("flex gap-24 py-6", className2),
      onSubmit: (e) => {
        e.preventDefault();
        if (inputValue && !createComment2.isPending) {
          createComment2.mutate(
            {
              ...payload,
              commentable,
              content: inputValue,
              inReplyTo
            },
            {
              onSuccess: () => {
                clearInput();
                onSuccess == null ? void 0 : onSuccess();
              }
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Avatar,
          {
            size: isMobile ? "lg" : "xl",
            circle: true,
            src: user == null ? void 0 : user.avatar,
            label: user == null ? void 0 : user.display_name
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "Comment as :name",
              values: {
                name: /* @__PURE__ */ jsx("span", { className: "font-medium text", children: user == null ? void 0 : user.display_name })
              }
            }
          ) }),
          /* @__PURE__ */ jsx(
            TextField,
            {
              inputRef,
              autoFocus,
              inputElementType: "textarea",
              inputClassName: "resize-none",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              onFocus: () => setInputIsExpanded(true),
              onBlur: () => {
                if (!inputValue) {
                  setInputIsExpanded(false);
                }
              },
              minLength: 3,
              rows: inputIsExpanded ? 3 : 1,
              placeholder: inReplyTo ? trans(message("Write a reply")) : trans(message("Leave a comment"))
            }
          ),
          inputIsExpanded && /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-center justify-end gap-12", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => clearInput(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                type: "submit",
                disabled: createComment2.isPending || inputValue.length < 3,
                children: /* @__PURE__ */ jsx(Trans, { message: "Comment" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function useStoreVote(model) {
  return useMutation({
    mutationFn: (payload) => changeVote(model, payload),
    onSuccess: (response) => {
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function changeVote(model, payload) {
  return apiClient.post("vote", {
    vote_type: payload.voteType,
    model_id: model.id,
    model_type: model.model_type
  }).then((r2) => r2.data);
}
function ThumbButtons({ model, className: className2, showUpvotesOnly }) {
  const changeVote2 = useStoreVote(model);
  const [upvotes, setUpvotes] = useState(model.upvotes || 0);
  const [downvotes, setDownvotes] = useState(model.downvotes || 0);
  const [currentVote, setCurrentVote] = useState(model.current_vote);
  const syncLocalState = (model2) => {
    setUpvotes(model2.upvotes);
    setDownvotes(model2.downvotes);
    setCurrentVote(model2.current_vote);
  };
  return /* @__PURE__ */ jsxs("div", { className: clsx(className2, "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        className: "gap-6",
        sizeClassName: "px-8 py-4",
        color: currentVote === "upvote" ? "primary" : void 0,
        disabled: changeVote2.isPending,
        "aria-label": "Upvote",
        onClick: () => {
          changeVote2.mutate(
            { voteType: "upvote" },
            {
              onSuccess: (response) => syncLocalState(response.model)
            }
          );
        },
        children: [
          /* @__PURE__ */ jsx(ThumbUpIcon, {}),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormattedNumber, { value: upvotes }) })
        ]
      }
    ),
    !showUpvotesOnly && /* @__PURE__ */ jsxs(
      Button,
      {
        className: "gap-6",
        sizeClassName: "px-8 py-4",
        color: currentVote === "downvote" ? "primary" : void 0,
        disabled: changeVote2.isPending,
        "aria-label": "Downvote",
        onClick: () => {
          changeVote2.mutate(
            { voteType: "downvote" },
            {
              onSuccess: (response) => syncLocalState(response.model)
            }
          );
        },
        children: [
          /* @__PURE__ */ jsx(ThumbDownIcon, {}),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormattedNumber, { value: downvotes }) })
        ]
      }
    )
  ] });
}
function CommentListItem$1({
  comment,
  commentable,
  // user can delete comment if they have created it, or they have relevant permissions on commentable
  canDelete
}) {
  const isMobile = useIsMobileMediaQuery();
  const { user, hasPermission } = useAuth();
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const showReplyButton = user != null && !comment.deleted && comment.depth < 5 && hasPermission("comments.create");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { paddingLeft: `${comment.depth * 20}px` },
      onClick: () => {
        if (isMobile) {
          setReplyFormVisible(!replyFormVisible);
        }
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "group flex min-h-70 items-start gap-24 py-18", children: [
          /* @__PURE__ */ jsx(UserAvatar, { user: comment.user, size: isMobile ? "lg" : "xl", circle: true }),
          /* @__PURE__ */ jsxs("div", { className: "flex-auto text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-8", children: [
              comment.user && /* @__PURE__ */ jsx(UserDisplayName, { user: comment.user }),
              /* @__PURE__ */ jsx("time", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: comment.created_at }) }),
              comment.position ? /* @__PURE__ */ jsx(Position, { commentable, position: comment.position }) : null
            ] }),
            /* @__PURE__ */ jsx("div", { className: "whitespace-pre-line", children: comment.deleted ? /* @__PURE__ */ jsx("span", { className: "italic text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "[COMMENT DELETED]" }) }) : comment.content }),
            !comment.deleted && /* @__PURE__ */ jsxs("div", { className: "-ml-8 mt-10 flex items-center gap-8", children: [
              showReplyButton && /* @__PURE__ */ jsxs("div", { className: "contents", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    className: "max-md:hidden",
                    sizeClassName: "text-sm px-8 py-4",
                    startIcon: /* @__PURE__ */ jsx(ReplyIcon, {}),
                    onClick: () => setReplyFormVisible(!replyFormVisible),
                    children: /* @__PURE__ */ jsx(Trans, { message: "Reply" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    className: "md:hidden",
                    onClick: () => setReplyFormVisible(!replyFormVisible),
                    children: /* @__PURE__ */ jsx(ReplyIcon, {})
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ThumbButtons, { model: comment, showUpvotesOnly: true }),
              /* @__PURE__ */ jsx(
                CommentOptionsTrigger,
                {
                  comment,
                  canDelete,
                  user
                }
              )
            ] })
          ] })
        ] }),
        replyFormVisible ? /* @__PURE__ */ jsx(
          NewCommentForm,
          {
            className: !(comment == null ? void 0 : comment.depth) ? "pl-20" : void 0,
            commentable,
            inReplyTo: comment,
            autoFocus: true,
            onSuccess: () => {
              setReplyFormVisible(false);
            }
          }
        ) : null
      ]
    }
  );
}
const Position = memo(({ commentable, position }) => {
  if (!commentable.duration)
    return null;
  const seconds = position / 100 * (commentable.duration / 1e3);
  return /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "at :position",
      values: {
        position: /* @__PURE__ */ jsx(FormattedDuration, { seconds })
      }
    }
  ) });
});
function CommentOptionsTrigger({
  comment,
  canDelete,
  user
}) {
  const deleteComments = useDeleteComments();
  const reportComment = useSubmitReport(comment);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const showDeleteButton = (comment.user_id === (user == null ? void 0 : user.id) || canDelete) && !comment.deleted;
  const handleReport = () => {
    reportComment.mutate({});
  };
  const handleDelete = (isConfirmed) => {
    setIsDeleteDialogOpen(false);
    if (isConfirmed) {
      deleteComments.mutate(
        { commentIds: [comment.id] },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
          }
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(MoreVertIcon, {}), sizeClassName: "text-sm px-8 py-4", children: /* @__PURE__ */ jsx(Trans, { message: "More" }) }),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(Item, { value: "report", onSelected: () => handleReport(), children: /* @__PURE__ */ jsx(Trans, { message: "Report comment" }) }),
        showDeleteButton && /* @__PURE__ */ jsx(
          Item,
          {
            value: "delete",
            onSelected: () => setIsDeleteDialogOpen(true),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: isDeleteDialogOpen,
        onClose: (isConfirmed) => handleDelete(isConfirmed),
        children: /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete comment?" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this comment?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      }
    )
  ] });
}
function UserDisplayName({ user }) {
  const { auth } = useContext(SiteConfigContext);
  if (auth.getUserProfileLink) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: auth.getUserProfileLink(user),
        className: "text-base font-medium hover:underline",
        children: user.display_name
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: user.display_name });
}
const accountRequiredMessage = message(
  "Please <l>login</l> or <r>create account</r> to comment"
);
function CommentList({
  className: className2,
  commentable,
  canDeleteAllComments = false,
  children,
  perPage = 25
}) {
  const { items, totalItems, ...query } = useComments(commentable, { perPage });
  if (query.isError) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: className2, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-8 border-b pb-8", children: [
      /* @__PURE__ */ jsx(CommentIcon, { size: "sm", className: "text-muted" }),
      query.isInitialLoading ? /* @__PURE__ */ jsx(Trans, { message: "Loading comments..." }) : /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":count comments",
          values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: totalItems || 0 }) }
        }
      )
    ] }),
    children,
    /* @__PURE__ */ jsx(AccountRequiredCard, { message: accountRequiredMessage }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.isInitialLoading ? /* @__PURE__ */ jsx(CommentSkeletons, { count: 4 }) : /* @__PURE__ */ jsx(
      CommentListItems,
      {
        comments: items,
        canDeleteAllComments,
        commentable
      }
    ) }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query, variant: "loadMore" })
  ] });
}
function CommentListItems({
  comments,
  commentable,
  canDeleteAllComments
}) {
  if (!comments.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-24",
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "Seems a little quiet over here" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Be the first to comment" })
      }
    );
  }
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: comments.map((comment) => /* @__PURE__ */ jsx(
    CommentListItem$1,
    {
      comment,
      commentable,
      canDelete: canDeleteAllComments
    },
    comment.id
  )) }, "comments");
}
function CommentSkeletons({ count }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: [...new Array(count).keys()].map((index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group flex min-h-70 items-start gap-24 py-18",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", radius: "rounded-full", size: "w-60 h-60" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto text-sm", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "mb-4 max-w-184 text-base" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "text-sm" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center gap-8", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "max-w-70 text-sm" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "max-w-40 text-sm" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "max-w-60 text-sm" })
          ] })
        ] })
      ]
    },
    index
  )) }, "loading-skeleton");
}
function WatchPageTitleDetails() {
  var _a;
  const { data } = useWatchPageVideo();
  const isStreamingMode = useIsStreamingMode();
  const content2 = !data ? /* @__PURE__ */ jsx(
    Layout,
    {
      poster: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-132 aspect-poster" }),
      titleLink: /* @__PURE__ */ jsx(Skeleton, { className: "max-w-144" }),
      videoName: /* @__PURE__ */ jsx(Skeleton, { className: "max-w-240" }),
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Skeleton, {}),
        /* @__PURE__ */ jsx(Skeleton, {})
      ] }),
      rate: /* @__PURE__ */ jsxs("div", { className: "flex h-32 items-center gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-56 h-24", className: "mr-10" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-56 h-24" })
      ] })
    },
    "skeleton"
  ) : /* @__PURE__ */ jsx(
    Layout,
    {
      poster: /* @__PURE__ */ jsx(
        TitlePoster,
        {
          size: "w-132",
          srcSize: "md",
          title: data.title,
          showPlayButton: true,
          className: "max-md:hidden"
        }
      ),
      titleLink: /* @__PURE__ */ jsx(TitleLink, { title: data.title }),
      videoName: !isStreamingMode ? data.video.name : void 0,
      episodeName: data.episode ? /* @__PURE__ */ jsxs(EpisodeLink, { title: data.title, episode: data.episode, children: [
        data.episode.name,
        " (",
        /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode: data.episode }),
        ")"
      ] }) : void 0,
      description: ((_a = data.episode) == null ? void 0 : _a.description) || data.title.description,
      rate: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ThumbButtons, { model: data.video, className: "mr-auto" }),
        /* @__PURE__ */ jsx(ReportButton, { video: data.video }),
        /* @__PURE__ */ jsx(ShareButton$1, { video: data.video })
      ] })
    },
    "loaded"
  );
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: content2 });
}
function ShareButton$1({ video }) {
  const link = getWatchLink(video, { absolute: true });
  return /* @__PURE__ */ jsx(ShareMenuTrigger, { link, children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Share" }), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(ShareIcon, {}) }) }) });
}
function ReportButton({ video }) {
  const report = useSubmitReport(video);
  const deleteReport2 = useDeleteReport(video);
  const [isReported, setIsReported] = useState(video.current_user_reported);
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Report" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      onClick: () => {
        if (isReported) {
          deleteReport2.mutate();
        } else {
          report.mutate({});
        }
        setIsReported(!isReported);
      },
      children: /* @__PURE__ */ jsx(FlagIcon, {})
    }
  ) });
}
function Layout({
  poster,
  titleLink,
  videoName,
  episodeName,
  description,
  rate
}) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: "flex items-start gap-16 overflow-hidden rounded pr-6",
      ...opacityAnimation,
      children: [
        poster,
        /* @__PURE__ */ jsxs("div", { className: "flex-auto py-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-6 text-2xl font-medium", children: titleLink }),
          episodeName && /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: episodeName }),
          videoName && /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: videoName }),
          /* @__PURE__ */ jsx("div", { className: "my-12", children: rate }),
          description && /* @__PURE__ */ jsx("p", { className: "max-w-780 text-sm text-muted", children: description })
        ] })
      ]
    }
  );
}
function WatchPageAside() {
  const { data } = useWatchPageVideo();
  const content2 = !data ? /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(VideoGridItemSkeleton, { className: "mb-34" }),
    /* @__PURE__ */ jsx(VideoGridItemSkeleton, { className: "mb-34" }),
    /* @__PURE__ */ jsx(VideoGridItemSkeleton, { className: "mb-34" })
  ] }, "skeleton") : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: data.related_videos.map((video) => /* @__PURE__ */ jsx(RelatedVideo, { video, activeVideo: data.video }, video.id)) }, "loaded");
  return /* @__PURE__ */ jsxs("aside", { className: "w-350 flex-shrink-0 max-lg:mt-54", children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        fontWeight: "font-medium",
        fontSize: "text-2xl",
        margin: "mb-28",
        children: /* @__PURE__ */ jsx(Header, {})
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: content2 })
  ] });
}
function Header() {
  const { data } = useWatchPageVideo();
  const isStreamingMode = useIsStreamingMode();
  if (!(data == null ? void 0 : data.video)) {
    return /* @__PURE__ */ jsx("div", { className: "h-32" });
  }
  return isStreamingMode ? /* @__PURE__ */ jsx(Trans, { message: "Related movies & series" }) : /* @__PURE__ */ jsx(Trans, { message: "Related videos" });
}
function RelatedVideo({ video, activeVideo }) {
  const isStreamingMode = useIsStreamingMode();
  let name = video.name;
  if (isStreamingMode) {
    if (video.episode) {
      name = /* @__PURE__ */ jsxs("span", { children: [
        video.episode.name,
        " (",
        /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode: video.episode }),
        ")"
      ] });
    } else {
      name = video.title.name;
    }
  }
  return /* @__PURE__ */ jsx(
    VideoGridItem,
    {
      video,
      title: video.title,
      episode: video.episode,
      forceTitleBackdrop: isStreamingMode,
      className: clsx(
        "mb-24 text-sm",
        activeVideo.id === video.id && "text-primary"
      ),
      showCategory: !isStreamingMode,
      name
    }
  );
}
const className = "flex items-center flex-wrap gap-14";
function WatchPageAlternativeVideos({ data }) {
  const navigate = useNavigate();
  const { streaming } = useSettings();
  const title = data == null ? void 0 : data.title;
  const episode = data == null ? void 0 : data.episode;
  const video = data == null ? void 0 : data.video;
  const showEpisodeSelector = title && episode && video && (video.type === "embed" || video.type === "external");
  if (!showEpisodeSelector && !streaming.show_video_selector) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-14 flex items-start justify-between gap-48", children: [
    streaming.show_video_selector && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        VideoDropdown,
        {
          className: "lg:hidden",
          videos: (data == null ? void 0 : data.alternative_videos) || []
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-lg:hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: data ? /* @__PURE__ */ jsx(VideoList, { videos: data.alternative_videos }) : /* @__PURE__ */ jsx(Skeletons, {}) }) })
    ] }),
    showEpisodeSelector && /* @__PURE__ */ jsx(
      EpisodeSelector,
      {
        title,
        currentEpisode: episode,
        onSelected: (episode2) => {
          navigate(getWatchLink(episode2.primary_video));
        },
        trigger: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "min-h-40",
            startIcon: /* @__PURE__ */ jsx(MediaEpisodesIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "All episodes" })
          }
        )
      }
    )
  ] });
}
function VideoDropdown({ videos, className: className2 }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        className: clsx("min-h-40", className2),
        startIcon: /* @__PURE__ */ jsx(MediaPlayIcon, {}),
        children: /* @__PURE__ */ jsx(Trans, { message: "Other sources" })
      }
    ),
    /* @__PURE__ */ jsx(Menu, { children: videos.map((video) => /* @__PURE__ */ jsx(
      Item,
      {
        value: video.id,
        startIcon: /* @__PURE__ */ jsx(MediaPlayIcon, {}),
        endSection: /* @__PURE__ */ jsx(QualityBadge, { video }),
        onSelected: () => navigate(getWatchLink(video)),
        children: video.name
      },
      video.id
    )) })
  ] });
}
function VideoList({ videos }) {
  const { videoId } = useParams();
  if (videos.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    m.div,
    {
      className,
      ...opacityAnimation,
      children: videos.map((video) => /* @__PURE__ */ jsxs(
        Button,
        {
          elementType: Link,
          to: getWatchLink(video),
          variant: "outline",
          color: videoId === `${video.id}` ? "primary" : "chip",
          startIcon: /* @__PURE__ */ jsx(MediaPlayIcon, { "aria-hidden": true }),
          className: "min-h-40 gap-10",
          children: [
            video.name,
            /* @__PURE__ */ jsx(QualityBadge, { video })
          ]
        },
        video.id
      ))
    },
    "alternative-sources"
  );
}
function QualityBadge({ video }) {
  if (!video.quality || video.quality === "default") {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { className: "rounded border px-6 text-xs font-bold uppercase", children: video.quality });
}
function Skeletons() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: clsx(className, "h-40"),
      ...opacityAnimation,
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-[116px]" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-[116px]" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-[116px]" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-[116px]" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-[116px]" })
      ]
    },
    "skeletons"
  );
}
function WatchPage() {
  const darkThemeVars = useDarkThemeVariables();
  useScrollToTop();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MainNavbar, {}),
    /* @__PURE__ */ jsx("div", { style: darkThemeVars, className: "dark min-h-screen bg text", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-14 md:p-24", children: [
      /* @__PURE__ */ jsx(Content, {}),
      /* @__PURE__ */ jsx(Footer, { className: "mt-48" })
    ] }) })
  ] });
}
function Content() {
  const { titles, comments } = useSettings();
  const { isLoggedIn, hasPermission } = useAuth();
  const query = useWatchPageVideo();
  const { data, isLoading } = query;
  const title = data == null ? void 0 : data.title;
  const episode = data == null ? void 0 : data.episode;
  const video = data == null ? void 0 : data.video;
  let commentable = video;
  if (!(comments == null ? void 0 : comments.per_video)) {
    commentable = episode || title;
  }
  const shouldShowComments = title && video && titles.enable_comments && hasPermission("comments.view");
  if (data || isLoading) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsx(VideoWrapper, { data }),
      /* @__PURE__ */ jsx(WatchPageAlternativeVideos, { data }),
      /* @__PURE__ */ jsx(AdHost, { slot: "watch_top", className: "pt-48" }),
      /* @__PURE__ */ jsxs("section", { className: "mt-42 items-start gap-56 lg:flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx(WatchPageTitleDetails, {}),
          shouldShowComments && /* @__PURE__ */ jsx(
            CommentList,
            {
              commentable,
              className: "mt-44",
              perPage: 20,
              children: isLoggedIn && hasPermission("comments.create") && /* @__PURE__ */ jsx(
                NewCommentForm,
                {
                  commentable,
                  className: "mb-14 mt-24"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx(WatchPageAside, {})
      ] })
    ] }, (video == null ? void 0 : video.id) || "loading");
  }
  return /* @__PURE__ */ jsx(PageErrorMessage, {});
}
function VideoWrapper({ data }) {
  const isStreamingMode = useIsStreamingMode();
  const { hasPermission } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  useLayoutEffect(() => {
    setIsVisible(true);
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: (data == null ? void 0 : data.video) && isVisible ? /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: hasPermission("videos.play") ? /* @__PURE__ */ jsx(
    SiteVideoPlayer,
    {
      title: data.title,
      episode: data.episode,
      video: data.video,
      relatedVideos: data.related_videos,
      autoPlay: true,
      logPlays: true,
      showEpisodeSelector: isStreamingMode
    }
  ) : /* @__PURE__ */ jsx(UpgradeMessage, { video: data.video }) }, "player") : /* @__PURE__ */ jsx(m.div, { className: "relative", ...opacityAnimation, children: /* @__PURE__ */ jsx(VideoPlayerSkeleton, { animate: true }) }, "skeleton") });
}
function UpgradeMessage({ video }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex aspect-video items-center justify-center bg-alt", children: [
    /* @__PURE__ */ jsx("div", { className: "blur", children: /* @__PURE__ */ jsx(VideoThumbnail, { video }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute h-max w-max max-w-full rounded-lg bg-black/60 p-24 text-lg font-medium", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Your current plan does not allow watching videos. Upgrade to unlock this feature." }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 text-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          elementType: Link,
          to: "/pricing",
          children: /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
        }
      ) })
    ] })
  ] });
}
function TitleVideosPage() {
  const query = useTitle("titlePage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$8, { title: query.data.title }),
    ";"
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$8({ title }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
      /* @__PURE__ */ jsx(TitlePageHeader, { title, showPoster: true }),
      /* @__PURE__ */ jsx(
        VideoGrid,
        {
          videos: title.videos,
          title,
          count: 24,
          heading: /* @__PURE__ */ jsx(SiteSectionHeading, { children: /* @__PURE__ */ jsx(Trans, { message: "Video gallery" }) })
        }
      )
    ] })
  ] });
}
function TitleImagesPage() {
  const query = useTitle("titlePage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$7, { title: query.data.title }),
    ";"
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$7({ title }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
      /* @__PURE__ */ jsx(TitlePageHeader, { title, showPoster: true }),
      /* @__PURE__ */ jsx(
        TitlePageImageGrid,
        {
          images: title.images,
          srcSize: "lg",
          count: 24,
          heading: /* @__PURE__ */ jsx(SiteSectionHeading, { children: /* @__PURE__ */ jsx(Trans, { message: "Image gallery" }) })
        }
      )
    ] })
  ] });
}
function PersonPageAside({ data: { person, total_credits_count } }) {
  const { hasPermission } = useAuth();
  const age = /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":count years old",
      values: { count: /* @__PURE__ */ jsx(PersonAge, { person }) }
    }
  );
  return /* @__PURE__ */ jsx(
    TitlePageAsideLayout,
    {
      className: "max-md:flex",
      poster: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(PersonPoster, { person, size: "w-140 md:w-full", srcSize: "lg" }),
          hasPermission("titles.update") && /* @__PURE__ */ jsx(
            IconButton,
            {
              elementType: Link,
              to: `/admin/people/${person.id}/edit`,
              className: "absolute bottom-6 right-4",
              color: "white",
              children: /* @__PURE__ */ jsx(EditIcon, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ShareButton, { person })
      ] }),
      children: /* @__PURE__ */ jsxs("dl", { className: "mt-12 md:mt-24", children: [
        person.known_for && /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Known for" }), children: /* @__PURE__ */ jsx(Trans, { message: person.known_for }) }),
        person.gender && /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Gender" }), children: /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: person.gender }) }) }),
        total_credits_count ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Known credits" }), children: total_credits_count }) : null,
        person.birth_date ? /* @__PURE__ */ jsxs(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Born" }), children: [
          /* @__PURE__ */ jsx(FormattedDate, { date: person.birth_date }),
          " ",
          !person.death_date && age
        ] }) : null,
        person.birth_place ? /* @__PURE__ */ jsx(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Birthplace" }), children: person.birth_place }) : null,
        person.death_date ? /* @__PURE__ */ jsxs(DetailItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Died" }), children: [
          /* @__PURE__ */ jsx(FormattedDate, { date: person.death_date }),
          " (",
          age,
          ")"
        ] }) : null
      ] })
    }
  );
}
function ShareButton({ person }) {
  const link = getPersonLink(person, { absolute: true });
  return /* @__PURE__ */ jsx(ShareMenuTrigger, { link, children: /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(ShareIcon, {}),
      className: "mt-14 md:min-h-40 md:w-full",
      children: /* @__PURE__ */ jsx(Trans, { message: "Share" })
    }
  ) });
}
function useFullPersonCreditsForTitle({ person, credit, department }, options) {
  return useQuery({
    queryKey: [
      "people",
      `${person.id}`,
      "full-credits",
      `${credit.id}`,
      `${department}`
    ],
    queryFn: () => fetchCredits(person.id, credit.id, department),
    enabled: options.enabled
  });
}
function fetchCredits(personId, titleId, department) {
  return apiClient.get(
    `people/${personId}/full-credits/${titleId}/${department}`
  ).then((response) => response.data);
}
function CharacterOrJob({ credit, className: className2 }) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsx("div", { className: className2, children: ((_a = credit.pivot) == null ? void 0 : _a.department) === "actors" ? ((_b = credit.pivot) == null ? void 0 : _b.character) ?? /* @__PURE__ */ jsx(Trans, { message: "Unknown" }) : /* @__PURE__ */ jsx("span", { className: "capitalize", children: ((_c = credit.pivot) == null ? void 0 : _c.job) ? /* @__PURE__ */ jsx(Trans, { message: (_d = credit.pivot) == null ? void 0 : _d.job }) : /* @__PURE__ */ jsx(Trans, { message: "Unknown" }) }) });
}
function PersonPageCredits({ data: { credits, person } }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-34", children: [
    /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-xl", children: /* @__PURE__ */ jsx(Trans, { message: "Credits" }) }),
    /* @__PURE__ */ jsx(Accordion, { mode: "multiple", defaultExpandedValues: [0], isLazy: true, children: Object.entries(credits).map(([department, credits2]) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        labelClassName: "font-semibold text-base",
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "(:count credits)",
            values: { count: credits2.length }
          }
        ),
        label: /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: department === "actors" ? "Acting" : department
          }
        ) }),
        children: credits2.map((credit, index) => {
          var _a;
          const isLast = credit === credits2[credits2.length - 1];
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start py-6", children: [
              /* @__PURE__ */ jsx(
                TitlePoster,
                {
                  title: credit,
                  size: "w-40",
                  className: "mr-12",
                  lazy: true,
                  srcSize: "sm"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "mr-24 pt-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-semibold", children: /* @__PURE__ */ jsx(TitleLink, { title: credit }) }),
                /* @__PURE__ */ jsx(
                  CharacterOrJob,
                  {
                    className: "text-sm text-muted",
                    credit
                  }
                ),
                credit.credited_episode_count ? /* @__PURE__ */ jsx(
                  EpisodeList,
                  {
                    credit,
                    department,
                    person
                  }
                ) : null
              ] }),
              /* @__PURE__ */ jsx("div", { className: "ml-auto text-sm text-muted", children: credit.year })
            ] }),
            !isLast && credit.year !== ((_a = credits2[index + 1]) == null ? void 0 : _a.year) && /* @__PURE__ */ jsx("div", { className: "my-8 h-1 w-full bg-divider" })
          ] }, credit.id);
        })
      },
      department
    )) })
  ] });
}
function EpisodeList({ credit, department, person }) {
  var _a;
  const [loadMoreEpisodes, setLoadMoreEpisodes] = useState(false);
  const query = useFullPersonCreditsForTitle(
    { person, department, credit },
    {
      enabled: loadMoreEpisodes
    }
  );
  const allEpisodesLoaded = credit.episodes.length === credit.credited_episode_count || query.data != null;
  const isLoadingMore = query.isLoading && query.fetchStatus !== "idle";
  const shouldShowLoadMoreBtn = isLoadingMore || !allEpisodesLoaded;
  const episodeCredits = ((_a = query.data) == null ? void 0 : _a.credits.length) ? query.data.credits : credit.episodes;
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("div", { children: episodeCredits.map((episodeCredit) => /* @__PURE__ */ jsx("div", { className: "mb-4 pl-10 text-xs", children: /* @__PURE__ */ jsxs(BulletSeparatedItems, { children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "-",
        " ",
        /* @__PURE__ */ jsx(
          EpisodeLink,
          {
            title: credit,
            episode: episodeCredit,
            seasonNumber: episodeCredit.season_number
          }
        ),
        " ",
        "(",
        episodeCredit.year,
        ")"
      ] }),
      /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode: episodeCredit }),
      /* @__PURE__ */ jsx(CharacterOrJob, { credit: episodeCredit })
    ] }) }, episodeCredit.id)) }),
    shouldShowLoadMoreBtn && /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        disabled: isLoadingMore,
        onClick: () => {
          setLoadMoreEpisodes(true);
        },
        children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Show all :count episodes",
            values: { count: credit.credited_episode_count }
          }
        )
      }
    ) })
  ] });
}
function PersonPage() {
  const query = usePerson("personPage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$6, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$6({ data }) {
  const { person, knownFor } = data;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto mt-14 px-14 md:mt-40 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "items-start gap-54 md:flex", children: [
    /* @__PURE__ */ jsx(PersonPageAside, { data }),
    /* @__PURE__ */ jsxs("main", { className: "flex-auto @container max-md:mt-34", children: [
      /* @__PURE__ */ jsx(TitlePageHeaderLayout, { name: person.name }),
      /* @__PURE__ */ jsx(Biography, { person }),
      /* @__PURE__ */ jsx(AdHost, { slot: "person_top", className: "pt-48" }),
      /* @__PURE__ */ jsx(KnowForList, { items: knownFor }),
      /* @__PURE__ */ jsx(PersonPageCredits, { data })
    ] })
  ] }) }) });
}
function Biography({ person }) {
  if (!person.description)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-xl", children: /* @__PURE__ */ jsx(Trans, { message: "Biography" }) }),
    /* @__PURE__ */ jsx(
      TruncatedDescription,
      {
        className: "text-sm",
        description: person.description
      }
    )
  ] });
}
function KnowForList({ items }) {
  if (!(items == null ? void 0 : items.length))
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mt-34", children: [
    /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-xl", children: /* @__PURE__ */ jsx(Trans, { message: "Known for" }) }),
    /* @__PURE__ */ jsx(ContentGridLayout, { variant: "portrait", children: items.slice(0, 4).map((item) => /* @__PURE__ */ jsx(
      TitlePortraitGridItem,
      {
        item,
        description: /* @__PURE__ */ jsx(CharacterOrJob, { className: "text-muted", credit: item })
      },
      item.id
    )) })
  ] });
}
function TitleFullCreditsPage() {
  const query = useTitle("titleCreditsPage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$5, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$5({
  data: { title, credits: groupedCredits = {} }
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
      /* @__PURE__ */ jsx(TitlePageHeader, { title, showPoster: true }),
      /* @__PURE__ */ jsxs("div", { className: "mt-48 @container", children: [
        /* @__PURE__ */ jsx(SiteSectionHeading, { headingType: "h2", className: "mb-40", children: /* @__PURE__ */ jsx(Trans, { message: "Full cast and crew" }) }),
        Object.entries(groupedCredits).map(([department, credits]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-16 text-2xl font-bold capitalize", children: /* @__PURE__ */ jsx(Trans, { message: department }) }),
          /* @__PURE__ */ jsx(TitleCreditsGrid, { credits, className: "mb-68" })
        ] }, department))
      ] })
    ] })
  ] });
}
function EpisodeFullCreditsPage() {
  const query = useEpisode("episodeCreditsPage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$4, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$4({
  data: { title, episode, credits: groupedCredits }
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TitlePageHeaderImage, { title, episode }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
      /* @__PURE__ */ jsx(EpisodePageHeader, { title, episode, showPoster: true }),
      /* @__PURE__ */ jsxs("div", { className: "mt-48 @container", children: [
        /* @__PURE__ */ jsx(SiteSectionHeading, { headingType: "h2", className: "mb-40", children: /* @__PURE__ */ jsx(Trans, { message: "Full cast and crew" }) }),
        groupedCredits && Object.entries(groupedCredits).map(([department, credits]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-16 text-2xl font-bold capitalize", children: /* @__PURE__ */ jsx(Trans, { message: department }) }),
          /* @__PURE__ */ jsx(TitleCreditsGrid, { credits, className: "mb-68" })
        ] }, department))
      ] })
    ] })
  ] });
}
function NewsArticlePage() {
  const query = useNewsArticle("newsArticlePage");
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$3, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$3({ data: { article, related } }) {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-14 items-start gap-40 px-14 md:mt-40 md:px-24 lg:flex", children: [
    /* @__PURE__ */ jsxs("main", { className: "mb-24 flex-auto rounded border p-16", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl md:text-4xl", children: article.title }),
      /* @__PURE__ */ jsxs("div", { className: "items-start gap-16 md:flex", children: [
        /* @__PURE__ */ jsx(
          NewsArticleImage,
          {
            article,
            size: "w-184 h-184",
            className: "max-md:mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "prose text dark:prose-invert",
            dangerouslySetInnerHTML: { __html: article.body }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-24 text-sm text-muted", children: [
        /* @__PURE__ */ jsx(FormattedDate, { date: article.created_at }),
        article.byline ? /* @__PURE__ */ jsx(NewsArticleByline, { article }) : null,
        article.source ? /* @__PURE__ */ jsx(NewsArticleSourceLink, { article }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx(OtherNews, { articles: related })
  ] });
}
function OtherNews({ articles }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-full flex-shrink-0 lg:w-400", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-14 text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Other news" }) }),
    articles.map((article) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mb-14 flex items-center gap-14 rounded border pr-14",
        children: [
          /* @__PURE__ */ jsx(NewsArticleImage, { article, size: "w-80 h-80", lazy: false }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "line-clamp-2 text-sm font-semibold", children: /* @__PURE__ */ jsx(NewsArticleLink, { article }) }),
            /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-6 text-sm text-muted", children: [
              /* @__PURE__ */ jsx(FormattedDate, { date: article.created_at }),
              /* @__PURE__ */ jsx(NewsArticleByline, { article })
            ] })
          ] })
        ]
      },
      article.id
    ))
  ] });
}
function useDeleteList() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => deleteList(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["channel"] });
      toast(trans(message("List deleted")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteList(payload) {
  return apiClient.delete(`channel/${payload.listId}`).then((r2) => r2.data);
}
function UserListIndexItem({
  list,
  user,
  showVisibility = true
}) {
  const { user: authUser } = useAuth();
  const canEdit = authUser && authUser.id === user.id;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 border-b py-24", children: [
    /* @__PURE__ */ jsx(
      ItemsPreview,
      {
        className: "max-md:hidden",
        list
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "flex-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsx(
          UserListLink,
          {
            list,
            className: "mr-auto block text-lg font-semibold capitalize"
          }
        ),
        !list.config.preventDeletion && !list.internal && canEdit && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              elementType: Link,
              to: `${getUserListLink(list)}/edit`,
              variant: "outline",
              size: "2xs",
              color: "primary",
              children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
            }
          ),
          /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                color: "danger",
                variant: "outline",
                radius: "rounded",
                size: "2xs",
                children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
              }
            ),
            /* @__PURE__ */ jsx(DeleteListDialog, { list })
          ] })
        ] })
      ] }),
      list.description && /* @__PURE__ */ jsx("p", { className: "mt-8 whitespace-nowrap text-sm text-muted", children: list.description }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 text-sm", children: /* @__PURE__ */ jsxs("div", { className: "items-center justify-between gap-24 md:flex", children: [
        user && /* @__PURE__ */ jsx(UserListByline, { user }),
        /* @__PURE__ */ jsx(
          UserListDetails,
          {
            list,
            showVisibility,
            className: "max-md:mt-12"
          }
        )
      ] }) })
    ] })
  ] });
}
function ItemsPreview({ list, className: className2 }) {
  var _a, _b;
  if (!((_a = list.items) == null ? void 0 : _a.length))
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("flex items-center overflow-hidden rounded", className2),
      children: (_b = list.items) == null ? void 0 : _b.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          style: { zIndex: 100 - index },
          className: clsx(
            "relative overflow-hidden rounded shadow-[2px_0_7px_#000]",
            index !== 0 && "-ml-30"
          ),
          children: [
            item.model_type === "title" ? /* @__PURE__ */ jsx(TitlePoster, { title: item, size: "w-70", srcSize: "sm" }) : /* @__PURE__ */ jsx(PersonPoster, { person: item, size: "w-70", srcSize: "sm" }),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(221,238,255,.35)]" })
          ]
        },
        item.id
      ))
    }
  );
}
function DeleteListDialog({ list }) {
  const deleteList2 = useDeleteList();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete list" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this list?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      isLoading: deleteList2.isPending,
      onConfirm: () => deleteList2.mutate({ listId: list.id }, { onSuccess: close })
    }
  );
}
function useProfileLists() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `user-profile/${userId}/lists`,
    queryKey: ["channel", "profile-lists", userId],
    paginate: "simple"
  });
}
function UserListsIndexPage() {
  const query = useProfileLists();
  const content2 = query.data ? /* @__PURE__ */ jsx(PageContent$2, { query }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsxs(SitePageLayout, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your lists" }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-48 px-24", children: [
      /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(
        SiteSectionHeading,
        {
          headingType: "h1",
          margin: "mb-34",
          actions: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "flat",
              color: "primary",
              elementType: Link,
              to: "new",
              children: /* @__PURE__ */ jsx(Trans, { message: "New list" })
            }
          ),
          children: /* @__PURE__ */ jsx(Trans, { message: "My lists" })
        }
      ) }),
      content2
    ] })
  ] });
}
function PageContent$2({ query }) {
  const { user } = useAuth();
  if (query.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-80",
        image: /* @__PURE__ */ jsx(SvgImage, { src: todoImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "You have not created any lists yet." })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    query.items.map((list) => /* @__PURE__ */ jsx(UserListIndexItem, { list, user }, list.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
const userProfileQueryKey = (userId) => [
  "users",
  `${userId}`,
  "profile"
];
function useUserProfile() {
  const { userId } = useParams();
  return useQuery({
    queryKey: userProfileQueryKey(userId),
    queryFn: () => fetchProfile(userId)
  });
}
function fetchProfile(userId) {
  return apiClient.get(`user-profile/${userId}`).then((response) => response.data);
}
function ProfileDescription({ profile, className: className2 }) {
  if (!profile)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: clsx("text-sm", className2), children: [
    profile.description && /* @__PURE__ */ jsx("p", { className: "rounded text-secondary whitespace-nowrap overflow-hidden overflow-ellipsis", children: profile.description }),
    profile.city || profile.country ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-24 justify-between mt-4", children: (profile.city || profile.country) && /* @__PURE__ */ jsxs("div", { className: "rounded text-secondary w-max", children: [
      profile.city,
      profile.city && ",",
      " ",
      profile.country
    ] }) }) : null
  ] });
}
function useFollowedUsers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["users", "followed", "ids"],
    queryFn: () => fetchIds(),
    enabled: !!user
  });
}
function useIsUserFollowing(user) {
  const { data, isLoading } = useFollowedUsers();
  return {
    isLoading,
    isFollowing: !!(data == null ? void 0 : data.ids.includes(user.id))
  };
}
function fetchIds() {
  return apiClient.get(`users/me/followed-users/ids`).then((response) => response.data);
}
function useFollowUser() {
  return useMutation({
    mutationFn: (payload) => followUser(payload),
    onSuccess: async (response, { user }) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(message("Following :name", { values: { name: user.display_name } }));
    },
    onError: (r2) => showHttpErrorToast(r2)
  });
}
function followUser({ user }) {
  return apiClient.post(`users/${user.id}/follow`).then((r2) => r2.data);
}
function useUnfollowUser() {
  return useMutation({
    mutationFn: (payload) => unfollowUser(payload),
    onSuccess: async (response, { user }) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(
        message("Stopped following :name", { values: { name: user.display_name } })
      );
    },
    onError: (r2) => showHttpErrorToast(r2)
  });
}
function unfollowUser({ user }) {
  return apiClient.post(`users/${user.id}/unfollow`).then((r2) => r2.data);
}
function FollowButton({
  user,
  className: className2,
  minWidth = "min-w-82",
  ...buttonProps
}) {
  const { user: currentUser } = useAuth();
  const { isFollowing, isLoading } = useIsUserFollowing(user);
  const followUser2 = useFollowUser();
  const unfollowUser2 = useUnfollowUser();
  const mergedClassName = clsx(className2, minWidth);
  if (isFollowing) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        ...buttonProps,
        className: mergedClassName,
        onClick: () => unfollowUser2.mutate({ user }),
        disabled: !currentUser || (currentUser == null ? void 0 : currentUser.id) === user.id || unfollowUser2.isPending || isLoading,
        children: /* @__PURE__ */ jsx(Trans, { message: "Unfollow" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...buttonProps,
      className: mergedClassName,
      onClick: () => followUser2.mutate({ user }),
      disabled: !currentUser || (currentUser == null ? void 0 : currentUser.id) === user.id || followUser2.isPending || isLoading,
      children: /* @__PURE__ */ jsx(Trans, { message: "Follow" })
    }
  );
}
function ProfileLinksForm() {
  const { fields, append, remove } = useFieldArray({
    name: "links"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    fields.map((field, index) => {
      return /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-end gap-10", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            type: "url",
            label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
            name: `links.${index}.url`,
            size: "sm",
            className: "flex-auto"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Short title" }),
            name: `links.${index}.title`,
            size: "sm",
            className: "flex-auto"
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "sm",
            color: "primary",
            className: "flex-shrink-0",
            onClick: () => {
              remove(index);
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ] }, field.id);
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          append({ url: "", title: "" });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another link" })
      }
    )
  ] });
}
function useUpdateUserProfile(form) {
  const { user } = useAuth();
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: userProfileQueryKey(user.id)
        });
      }
      toast(trans(message("Profile updated")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateProfile(payload) {
  return apiClient.put("user-profile/me", payload).then((r2) => r2.data);
}
function EditUserProfileDialog({ user }) {
  var _a, _b, _c, _d;
  const { close, formId } = useDialogContext();
  const { data } = useValueLists(["countries"]);
  const form = useForm({
    defaultValues: {
      user: {
        username: user.username,
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name
      },
      profile: {
        city: (_a = user.profile) == null ? void 0 : _a.city,
        country: (_b = user.profile) == null ? void 0 : _b.country,
        description: (_c = user.profile) == null ? void 0 : _c.description
      },
      links: user.links
    }
  });
  const updateProfile2 = useUpdateUserProfile(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Edit your profile" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => updateProfile2.mutate(values, { onSuccess: () => close() }),
        children: /* @__PURE__ */ jsxs(FileUploadProvider, { children: [
          /* @__PURE__ */ jsxs("div", { className: "items-start gap-30 md:flex", children: [
            /* @__PURE__ */ jsx(
              FormImageSelector,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Avatar" }),
                name: "user.avatar",
                diskPrefix: "avatars",
                variant: "avatar",
                previewSize: "w-200 h-200",
                className: "max-md:mb-20"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  name: "user.username",
                  label: /* @__PURE__ */ jsx(Trans, { message: "Username" }),
                  className: "mb-24"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "user.first_name",
                    label: /* @__PURE__ */ jsx(Trans, { message: "First name" }),
                    className: "mb-24 flex-1"
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "user.last_name",
                    label: /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
                    className: "mb-24 flex-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "profile.city",
                    label: /* @__PURE__ */ jsx(Trans, { message: "City" }),
                    className: "mb-24 flex-1"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  FormSelect,
                  {
                    showSearchField: true,
                    className: "mb-24 flex-1",
                    selectionMode: "single",
                    name: "profile.country",
                    label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
                    children: [
                      /* @__PURE__ */ jsx(Item, { value: void 0, children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }, "none"),
                      (_d = data == null ? void 0 : data.countries) == null ? void 0 : _d.map((country) => /* @__PURE__ */ jsx(Item, { value: country.name, children: country.name }, country.code))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  name: "profile.description",
                  label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
                  inputElementType: "textarea",
                  rows: 4
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-16 border-b pb-16", children: /* @__PURE__ */ jsx(Trans, { message: "Your links" }) }),
            /* @__PURE__ */ jsx(ProfileLinksForm, {})
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          type: "submit",
          variant: "flat",
          color: "primary",
          disabled: updateProfile2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function ProfileStatsList({ user }) {
  const {
    auth: { getUserProfileLink }
  } = useContext(SiteConfigContext);
  const profileLink = getUserProfileLink(user);
  return /* @__PURE__ */ jsxs(StatsItems, { children: [
    /* @__PURE__ */ jsx(
      StatsItem,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Followers" }),
        value: user.followers_count || 0,
        link: `${profileLink}/followers`
      }
    ),
    /* @__PURE__ */ jsx(
      StatsItem,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Following" }),
        value: user.followed_users_count || 0,
        link: `${profileLink}/followed-users`
      }
    ),
    /* @__PURE__ */ jsx(
      StatsItem,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Lists" }),
        value: user.lists_count || 0,
        link: `${profileLink}/lists`
      }
    )
  ] });
}
function StatsItems(props) {
  const children = Children.toArray(props.children);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: children.map((child, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    child,
    index < children.length - 1 && /* @__PURE__ */ jsx("div", { className: "mx-10 h-34 w-1 bg-divider" })
  ] }, index)) });
}
function StatsItem({ label, value, link }) {
  return /* @__PURE__ */ jsxs(Link, { to: link, className: "group block text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: /* @__PURE__ */ jsx(FormattedNumber, { value }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase text-muted transition-colors group-hover:text-primary", children: label })
  ] });
}
function RemoteFavicon({
  url,
  className: className2,
  size = "w-16 h-16",
  alt
}) {
  if (!url) {
    return null;
  }
  const src = getFaviconSrc(url);
  if (!src) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: clsx(size, className2),
      src,
      alt: alt || `${src} favicon`
    }
  );
}
const getFaviconSrc = memoize((url) => {
  if (url.includes("youtube")) {
    return "https://www.youtube.com/s/desktop/ca54e1bd/img/favicon.ico";
  }
  if (!isAbsoluteUrl(url)) {
    url = `${window.location.protocol}//${window.location.host}`;
  }
  try {
    const domain = new URL(url).origin;
    return "https://www.google.com/s2/favicons?domain=" + domain;
  } catch (e) {
  }
  return null;
});
function ProfileLinks({ links, className: className2 }) {
  if (!(links == null ? void 0 : links.length))
    return null;
  if (links.length === 1) {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        className: "mt-24 flex items-center gap-6 transition-colors hover:text-primary max-md:justify-center md:mt-12",
        href: links[0].url,
        children: [
          /* @__PURE__ */ jsx(OpenInNewIcon, { className: "text-muted", size: "sm" }),
          /* @__PURE__ */ jsx("span", { className: "capitalize", children: links[0].title })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center", className2), children: links.map((link) => /* @__PURE__ */ jsx(Tooltip, { label: link.title, children: /* @__PURE__ */ jsx(
    ButtonBase,
    {
      elementType: "a",
      href: link.url,
      target: "_blank",
      rel: "noreferrer",
      children: /* @__PURE__ */ jsx(RemoteFavicon, { url: link.url, alt: link.title, size: "w-20 h-20" })
    }
  ) }, link.url)) });
}
function ProfilePageHeader({ user }) {
  const { user: currentUser } = useAuth();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-24 md:flex-row", children: [
    /* @__PURE__ */ jsx(UserAvatar, { user, circle: true, size: "w-140 h-140" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: user.display_name }),
        user.is_pro && /* @__PURE__ */ jsx(Chip, { size: "xs", color: "primary", radius: "rounded", className: "mt-2", children: /* @__PURE__ */ jsx(Trans, { message: "PRO" }) })
      ] }),
      /* @__PURE__ */ jsx(ProfileDescription, { profile: user.profile }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-center gap-14", children: [
        (currentUser == null ? void 0 : currentUser.id) !== user.id && /* @__PURE__ */ jsx(
          FollowButton,
          {
            variant: "outline",
            color: "primary",
            size: "xs",
            user
          }
        ),
        (currentUser == null ? void 0 : currentUser.id) === user.id && /* @__PURE__ */ jsx(EditButton, { user })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ProfileStatsList, { user }),
      /* @__PURE__ */ jsx(
        ProfileLinks,
        {
          links: user.links,
          className: "ml-auto mt-12 flex-shrink-0"
        }
      )
    ] })
  ] });
}
function EditButton({ user }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xs", startIcon: /* @__PURE__ */ jsx(EditIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Edit profile" }) }),
    /* @__PURE__ */ jsx(EditUserProfileDialog, { user })
  ] });
}
const PageTabs = [
  { uri: "lists", label: message("Lists") },
  { uri: "ratings", label: message("Ratings") },
  { uri: "reviews", label: message("Reviews") },
  { uri: "comments", label: message("Comments") },
  { uri: "followers", label: message("Followers") },
  { uri: "followed-users", label: message("Following") }
];
function UserProfilePage() {
  const query = useUserProfile();
  const content2 = query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$1, { user: query.data.user })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
  return /* @__PURE__ */ jsx(SitePageLayout, { children: content2 });
}
function PageContent$1({ user }) {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: [
    /* @__PURE__ */ jsx(ProfilePageHeader, { user }),
    /* @__PURE__ */ jsx(ProfileTabs, { user })
  ] });
}
function ProfileTabs({ user }) {
  const {
    auth: { getUserProfileLink }
  } = useContext(SiteConfigContext);
  const profileLink = getUserProfileLink(user);
  const { pathname } = useLocation();
  const tabName = pathname.split("/").pop();
  let selectedTab = PageTabs.findIndex((tab) => tab.uri === tabName);
  if (selectedTab === -1) {
    selectedTab = 0;
  }
  return /* @__PURE__ */ jsxs(Tabs, { className: "mt-34", selectedTab, children: [
    /* @__PURE__ */ jsx(TabList, { children: PageTabs.map((tab) => /* @__PURE__ */ jsx(
      Tab,
      {
        width: "min-w-132",
        elementType: Link,
        to: `${profileLink}/${tab.uri}`,
        replace: true,
        children: /* @__PURE__ */ jsx(Trans, { ...tab.label })
      },
      tab.uri
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
function ProfileListsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const listsQuery = useProfileLists();
  if (listsQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(ListAltIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "No lists yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on lists they create in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (listsQuery.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      listsQuery.items.map((list) => /* @__PURE__ */ jsx(
        UserListIndexItem,
        {
          list,
          user,
          showVisibility: false
        },
        list.id
      )),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: listsQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: listsQuery });
}
function useProfileRatings() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `user-profile/${userId}/ratings`,
    queryKey: ["reviews", "profile-page-ratings", userId],
    paginate: "simple"
  });
}
function EpisodePortraitGridItem({
  item,
  title,
  rating
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      EpisodePoster,
      {
        episode: item,
        title,
        srcSize: "lg",
        aspect: "aspect-poster",
        showPlayButton: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 text-sm", children: [
      /* @__PURE__ */ jsx(TitleRating, { score: rating ?? item.rating, className: "mb-4" }),
      /* @__PURE__ */ jsx(
        TitleLinkWithEpisodeNumber,
        {
          title,
          episode: item,
          className: "block font-medium text-base"
        }
      )
    ] })
  ] });
}
function ProfileRatingsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const ratingsQuery = useProfileRatings();
  if (ratingsQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(StarIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "No ratings yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on titles they rate in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (ratingsQuery.data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ContentGridLayout, { variant: "portrait", children: ratingsQuery.items.map((review) => {
        const reviewable = review.reviewable;
        if (reviewable.model_type === "episode") {
          return /* @__PURE__ */ jsx(
            EpisodePortraitGridItem,
            {
              item: reviewable,
              title: reviewable.title,
              rating: review.score
            },
            review.id
          );
        }
        return /* @__PURE__ */ jsx(
          TitlePortraitGridItem,
          {
            item: review.reviewable,
            rating: review.score
          },
          review.id
        );
      }) }),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: ratingsQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: ratingsQuery });
}
function useProfileReviews() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `user-profile/${userId}/reviews`,
    queryKey: ["reviews", "profile-page-reviews", userId],
    paginate: "simple"
  });
}
function ProfileReviewsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const reviewsQuery = useProfileReviews();
  if (reviewsQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(RateReviewIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "No reviews yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on titles they review in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (reviewsQuery.data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      reviewsQuery.items.map((review) => /* @__PURE__ */ jsx(ReviewListItem, { review }, review.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: reviewsQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: reviewsQuery });
}
function ReviewListItem({ review }) {
  const totalVotes = review.helpful_count + review.not_helpful_count;
  const reviewable = review.reviewable;
  const title = reviewable.model_type === "episode" ? reviewable.title : reviewable;
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-start gap-24 border-b pb-24", children: [
    /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-90", srcSize: "sm" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: reviewable.model_type === "episode" ? /* @__PURE__ */ jsx(
        TitleLinkWithEpisodeNumber,
        {
          title,
          episode: reviewable,
          target: "_blank"
        }
      ) : /* @__PURE__ */ jsx(TitleLink, { title, target: "_blank" }) }),
      /* @__PURE__ */ jsx(TitleRating, { className: "mb-8 mt-14", score: review.score }),
      /* @__PURE__ */ jsx("div", { className: "text-base font-semibold", children: review.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-10 whitespace-pre-line text-sm", children: review.body }),
      totalVotes ? /* @__PURE__ */ jsx("div", { className: "mt-12 text-xs text-muted", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":helpfulCount out of :total people found this helpful.",
          values: {
            helpfulCount: review.helpful_count,
            total: review.helpful_count + review.not_helpful_count
          }
        }
      ) }) : null
    ] })
  ] });
}
function useProfileComments() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `user-profile/${userId}/comments`,
    queryKey: ["comment", "profile-page-comments", userId],
    paginate: "simple"
  });
}
function ProfileCommentsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const commentsQuery = useProfileComments();
  if (commentsQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(RateReviewIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "No comments yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on comments they post in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (commentsQuery.data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      commentsQuery.items.map((comment) => /* @__PURE__ */ jsx(CommentListItem, { comment }, comment.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: commentsQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: commentsQuery });
}
function CommentListItem({ comment }) {
  const commentable = comment.commentable;
  const title = commentable.model_type === "episode" ? commentable.title : commentable;
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-start gap-24 border-b pb-24", children: [
    /* @__PURE__ */ jsx(TitlePoster, { title, size: "w-90", srcSize: "sm" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: commentable.model_type === "episode" ? /* @__PURE__ */ jsx(
        TitleLinkWithEpisodeNumber,
        {
          title,
          episode: commentable,
          target: "_blank"
        }
      ) : /* @__PURE__ */ jsx(TitleLink, { title, target: "_blank" }) }),
      /* @__PURE__ */ jsx("time", { className: "mt-12 block text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: comment.created_at }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 whitespace-pre-line text-sm", children: comment.content }),
      comment.upvotes ? /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-center gap-8 text-muted", children: [
        /* @__PURE__ */ jsx(ThumbUpIcon, { size: "sm" }),
        /* @__PURE__ */ jsx("div", { children: comment.upvotes })
      ] }) : null
    ] })
  ] });
}
function useProfileFollowers() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `users/${userId}/followers`,
    queryKey: ["users", "profile-page-followers", userId],
    paginate: "simple"
  });
}
function FollowerListItem({ follower }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "mb-16 flex items-center gap-16 border-b pb-16",
      children: [
        /* @__PURE__ */ jsx(UserAvatar, { user: follower, size: "lg" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx(UserProfileLink, { user: follower }),
          follower.followers_count && follower.followers_count > 0 ? /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "[one 1 followers|other :count followers]",
              values: { count: follower.followers_count }
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ jsx(
          FollowButton,
          {
            variant: "outline",
            size: "xs",
            className: "ml-auto",
            user: follower
          }
        )
      ]
    },
    follower.id
  );
}
function ProfileFollowersPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const followersQuery = useProfileFollowers();
  if (followersQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(BookmarkBorderIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "No followers yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Be the first to follow :name.",
            values: { name: user.display_name }
          }
        )
      }
    );
  }
  if (followersQuery.data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      followersQuery.items.map((follower) => /* @__PURE__ */ jsx(FollowerListItem, { follower }, follower.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: followersQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: followersQuery });
}
function useProfileFollowedUsers() {
  const { userId = "me" } = useParams();
  return useInfiniteData({
    endpoint: `users/${userId}/followed-users`,
    queryKey: ["users", "profile-page-followed-users", userId],
    paginate: "simple"
  });
}
function ProfileFollowedUsersPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data.user;
  const followedUsersQuery = useProfileFollowedUsers();
  if (followedUsersQuery.noResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(BookmarkBorderIcon, { className: "text-muted" }),
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "Not following anyone yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Check back later to see users :user is following.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (followedUsersQuery.data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      followedUsersQuery.items.map((followedUser) => /* @__PURE__ */ jsx(FollowerListItem, { follower: followedUser }, followedUser.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query: followedUsersQuery })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query: followedUsersQuery });
}
function SearchPage() {
  const { query: searchTerm } = useParams();
  const query = useSearchResults("searchPage", searchTerm);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(SitePageLayout, { children: /* @__PURE__ */ jsx("section", { className: "container mx-auto mt-24 px-14 md:mt-40 md:px-24", children: /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(MobileSearchBar, {}),
      /* @__PURE__ */ jsx(PageContent, { query })
    ] }) }) })
  ] });
}
function MobileSearchBar() {
  const { searchQuery = "" } = useParams();
  const navigate = useNavigate();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    TextField,
    {
      defaultValue: searchQuery,
      onChange: (e) => {
        navigate(`/search/${e.target.value}`, { replace: true });
      },
      autoFocus: true,
      className: "w-full md:hidden",
      size: "lg",
      placeholder: trans(message("Search..."))
    }
  );
}
function PageContent({ query }) {
  const { branding } = useSettings();
  if (query.data) {
    if (query.data.results.length === 0) {
      return /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          className: "mt-40",
          image: /* @__PURE__ */ jsx(SearchIcon, { size: "xl" }),
          imageHeight: "h-auto",
          imageMargin: "mb-12",
          title: /* @__PURE__ */ jsx(
            Trans,
            {
              message: `Could not find any results for “:query”`,
              values: { query: query.data.query }
            }
          ),
          description: /* @__PURE__ */ jsx(Trans, { message: "Try a different search query." })
        }
      );
    }
    return /* @__PURE__ */ jsx(SearchResults, { query });
  }
  if (query.fetchStatus === "idle") {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-40",
        image: /* @__PURE__ */ jsx(SearchIcon, { size: "xl" }),
        imageHeight: "h-auto",
        imageMargin: "mb-12",
        title: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Search :siteName",
            values: { siteName: branding.site_name }
          }
        ),
        description: /* @__PURE__ */ jsx(Trans, { message: "Find movies, tv series, people and more." })
      }
    );
  }
  return /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
}
function SearchResults({ query }) {
  const { query: searchTerm } = useParams();
  const { movies, series, people } = useMemo(() => {
    var _a;
    const movies2 = [];
    const series2 = [];
    const people2 = [];
    (_a = query.data) == null ? void 0 : _a.results.forEach((result) => {
      if (result.model_type === TITLE_MODEL && result.is_series) {
        series2.push(result);
      } else if (result.model_type === TITLE_MODEL && !result.is_series) {
        movies2.push(result);
      } else if (result.model_type === PERSON_MODEL) {
        people2.push(result);
      }
    });
    return { movies: movies2, series: series2, people: people2 };
  }, [query]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SiteSectionHeading,
      {
        className: "my-24 md:mb-48",
        headingType: "h1",
        fontSize: "text-xl md:text-3xl",
        hideBorder: true,
        children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Search results for: “:query“",
            values: { query: searchTerm }
          }
        )
      }
    ),
    movies.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-48", children: [
      /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Movies" }) }),
      /* @__PURE__ */ jsx(ContentGrid, { content: movies, variant: "portrait" })
    ] }),
    series.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-48", children: [
      /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Series" }) }),
      /* @__PURE__ */ jsx(ContentGrid, { content: series, variant: "portrait" })
    ] }),
    people.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-48", children: [
      /* @__PURE__ */ jsx(SiteSectionHeading, { fontSize: "text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "People" }) }),
      /* @__PURE__ */ jsx(ContentGrid, { content: people, variant: "portrait" })
    ] })
  ] });
}
const RouteConfig = [
  {
    index: true,
    element: /* @__PURE__ */ jsx(HomepageChannelPage, {})
  },
  {
    path: "search",
    element: /* @__PURE__ */ jsx(SearchPage, {})
  },
  {
    path: "search/:query",
    element: /* @__PURE__ */ jsx(SearchPage, {})
  },
  // Watch
  {
    path: "watch/:videoId",
    element: /* @__PURE__ */ jsx(WatchPage, {})
  },
  // Titles
  {
    path: "/titles/:titleId/:titleSlug",
    element: /* @__PURE__ */ jsx(TitlePage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/videos",
    element: /* @__PURE__ */ jsx(TitleVideosPage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/images",
    element: /* @__PURE__ */ jsx(TitleImagesPage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/full-credits",
    element: /* @__PURE__ */ jsx(TitleFullCreditsPage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/season/:season",
    element: /* @__PURE__ */ jsx(SeasonPage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/season/:season/episode/:episode",
    element: /* @__PURE__ */ jsx(EpisodePage, {})
  },
  {
    path: "/titles/:titleId/:titleSlug/season/:season/episode/:episode/full-credits",
    element: /* @__PURE__ */ jsx(EpisodeFullCreditsPage, {})
  },
  // People
  {
    path: "/people/:personId",
    element: /* @__PURE__ */ jsx(PersonPage, {})
  },
  {
    path: "/people/:personId/:personSlug",
    element: /* @__PURE__ */ jsx(PersonPage, {})
  },
  // News
  {
    path: "/news/:articleId",
    element: /* @__PURE__ */ jsx(NewsArticlePage, {})
  },
  // Profile page
  {
    path: "user/:userId/:slug",
    element: /* @__PURE__ */ jsx(UserProfilePage, {}),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(ProfileListsPanel, {})
      },
      {
        path: "lists",
        element: /* @__PURE__ */ jsx(ProfileListsPanel, {})
      },
      {
        path: "ratings",
        element: /* @__PURE__ */ jsx(ProfileRatingsPanel, {})
      },
      {
        path: "reviews",
        element: /* @__PURE__ */ jsx(ProfileReviewsPanel, {})
      },
      {
        path: "comments",
        element: /* @__PURE__ */ jsx(ProfileCommentsPanel, {})
      },
      {
        path: "followers",
        element: /* @__PURE__ */ jsx(ProfileFollowersPanel, {})
      },
      {
        path: "followed-users",
        element: /* @__PURE__ */ jsx(ProfileFollowedUsersPanel, {})
      }
    ]
  },
  {
    path: "user/:userId/:slug/:tab",
    element: /* @__PURE__ */ jsx(UserProfilePage, {})
  },
  // User Lists
  {
    path: "/lists",
    element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(UserListsIndexPage, {}) })
  },
  {
    path: "/lists/new",
    element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(SitePageLayout, { children: /* @__PURE__ */ jsx(CreateUserListPage, {}) }) })
  },
  {
    path: "/lists/:slugOrId",
    element: /* @__PURE__ */ jsx(ChannelPage, { type: "list" })
  },
  {
    path: "/lists/:slugOrId/edit",
    element: /* @__PURE__ */ jsx(SitePageLayout, { children: /* @__PURE__ */ jsx(EditUserListPage, {}) })
  },
  // Channels
  {
    path: ":slugOrId",
    element: /* @__PURE__ */ jsx(ChannelPage, {})
  },
  {
    path: "channel/:slugOrId",
    element: /* @__PURE__ */ jsx(ChannelPage, {})
  },
  {
    path: ":slugOrId/:restriction",
    element: /* @__PURE__ */ jsx(ChannelPage, {})
  },
  {
    path: "channel/:slugOrId/:restriction",
    element: /* @__PURE__ */ jsx(ChannelPage, {})
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(NotFoundPage, {})
  }
];
function HomepageChannelPage() {
  const { homepage } = useSettings();
  let slugOrId = "homepage";
  if ((homepage == null ? void 0 : homepage.type) === "channel" && homepage.value) {
    slugOrId = homepage.value;
  }
  return /* @__PURE__ */ jsx(ChannelPage, { slugOrId });
}
function SiteRoutes() {
  return useRoutes(RouteConfig);
}
export {
  SiteRoutes as default
};
//# sourceMappingURL=site-routes-5a646ccf.mjs.map
