var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import process$1 from "process";
import { createServer } from "http";
import { create } from "zustand";
import { StaticRouter } from "react-router-dom/server.mjs";
import React, { useState, useEffect, useCallback, useContext, useMemo, Children, isValidElement, cloneElement, forwardRef, memo, Fragment, useRef, useId, createContext, StrictMode } from "react";
import { QueryClient, useQuery, useMutation, QueryClientProvider, keepPreviousData } from "@tanstack/react-query";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import axios from "axios";
import slugify from "slugify";
import deepMerge from "deepmerge";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { mergeProps, useObjectRef, useViewportSize, useLayoutEffect } from "@react-aria/utils";
import memoize from "nano-memoize";
import { useFocusManager, FocusScope } from "@react-aria/focus";
import { createPortal } from "react-dom";
import { offset, shift, flip, size, arrow, useFloating, autoUpdate } from "@floating-ui/react-dom";
import { mergeRefs } from "react-merge-refs";
import { getLocalTimeZone, parseAbsoluteToLocal, DateFormatter } from "@internationalized/date";
import { useNavigate as useNavigate$1, useLocation, createPath, resolvePath, Link, NavLink, Navigate, Outlet, useParams, useSearchParams, Route, Routes } from "react-router-dom";
import { NumberFormatter } from "@internationalized/number";
import { FormProvider, useController, useForm } from "react-hook-form";
import dot from "dot-object";
import { useControlledState } from "@react-stately/utils";
import { useIsSSR } from "@react-aria/ssr";
import { enableMapSet, produce } from "immer";
import axiosRetry from "axios-retry";
import { Upload } from "tus-js-client";
import { getCookie as getCookie$1 } from "react-use-cookie";
import match from "mime-match";
import { useStoreWithEqualityFn } from "zustand/traditional";
import useClipboard from "react-use-clipboard";
const useBootstrapDataStore = create()((set) => ({
  // set bootstrap data that was provided with initial request from backend
  data: typeof window !== "undefined" && window.bootstrapData ? decodeBootstrapData(window.bootstrapData) : null,
  setData: (data) => {
    const decodedData = typeof data === "string" ? decodeBootstrapData(data) : data;
    set({ data: decodedData });
  },
  mergeData: (partial) => {
    set((state) => ({ data: { ...state.data, ...partial } }));
  }
}));
const getBootstrapData = () => useBootstrapDataStore.getState().data;
const setBootstrapData = useBootstrapDataStore.getState().setData;
const mergeBootstrapData = useBootstrapDataStore.getState().mergeData;
function decodeBootstrapData(data) {
  return typeof data === "string" ? JSON.parse(data) : data;
}
let activeWorkspaceId = 0;
function getActiveWorkspaceId() {
  return activeWorkspaceId;
}
function setActiveWorkspaceId(id) {
  activeWorkspaceId = id;
}
function isAbsoluteUrl(url) {
  if (!url)
    return false;
  return /^[a-zA-Z][a-zA-Z\d+\-.]*?:/.test(url);
}
function errorStatusIs(err, status) {
  var _a;
  return axios.isAxiosError(err) && ((_a = err.response) == null ? void 0 : _a.status) == status;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3e4,
      retry: (failureCount, err) => {
        return !errorStatusIs(err, 401) && !errorStatusIs(err, 403) && !errorStatusIs(err, 404) && failureCount < 2;
      }
    }
  }
});
const apiClient = axios.create();
apiClient.defaults.withCredentials = true;
apiClient.defaults.responseType = "json";
apiClient.defaults.headers = {
  common: {
    Accept: "application/json"
  }
};
const internalEndpoints = ["auth", "secure", "log-viewer", "horizon"];
apiClient.interceptors.request.use((config) => {
  var _a, _b, _c, _d, _e;
  if (!internalEndpoints.some((endpoint2) => {
    var _a2;
    return (_a2 = config.url) == null ? void 0 : _a2.startsWith(endpoint2);
  }) && !isAbsoluteUrl(config == null ? void 0 : config.url)) {
    config.url = `api/v1/${config.url}`;
  }
  const method = (_a = config.method) == null ? void 0 : _a.toUpperCase();
  if (method === "GET" && Array.isArray((_b = config.params) == null ? void 0 : _b.with)) {
    config.params.with = config.params.with.join(",");
  }
  if (method === "GET" && Array.isArray((_c = config.params) == null ? void 0 : _c.load)) {
    config.params.load = config.params.load.join(",");
  }
  if (method === "GET" && Array.isArray((_d = config.params) == null ? void 0 : _d.loadCount)) {
    config.params.loadCount = config.params.loadCount.join(",");
  }
  const workspaceId = getActiveWorkspaceId();
  if (workspaceId) {
    const method2 = (_e = config.method) == null ? void 0 : _e.toLowerCase();
    if (["get", "post", "put"].includes(method2)) {
      config.params = { ...config.params, workspaceId };
    }
  }
  if (method === "PUT" || method === "DELETE" || method === "PATCH") {
    config.headers = {
      ...config.headers,
      "X-HTTP-Method-Override": method
    };
    config.method = "POST";
    config.params = {
      ...config.params,
      _method: method
    };
  }
  {
    config.headers = {
      ...config.headers,
      referer: "http://localhost"
    };
  }
  return config;
});
const SiteConfigContext = React.createContext(
  null
);
function message(msg, props) {
  return { ...props, message: msg };
}
const generalTopImage = "/assets/general_top-26f8c7f2.jpg";
const titleTopImage = "/assets/title_top-10fd7c9b.jpg";
const personTopImage = "/assets/person_top-57e57d80.jpg";
const generalBottomImage = "/assets/general_bottom-e27cf306.jpg";
const watchTop = "/assets/watch_top-6272eec3.jpg";
function slugifyString(text2, replacement = "-", strict = false) {
  if (!text2)
    return text2;
  let slugified = slugify(text2, {
    lower: true,
    replacement,
    strict,
    remove: /[*+~.()'"!:@?\|/\\#]/g
  });
  if (!slugified) {
    slugified = text2.replace(/\s+/g, "-").toLowerCase();
  }
  return slugified;
}
function getUserProfileLink(user) {
  return `/user/${user.id}/${slugifyString(user.display_name)}`;
}
const SiteConfig = {
  homepage: {
    options: [{ label: message("Landing page"), value: "landingPage" }]
  },
  auth: {
    redirectUri: "/",
    adminRedirectUri: "/admin",
    getUserProfileLink
  },
  admin: {
    channelsDocsLink: "https://support.vebto.com/hc/articles/35/38/220/channels",
    ads: [
      {
        image: generalTopImage,
        slot: "ads.general_top",
        description: message(
          "Appears at the top of most pages. Best size <= 150px height or responsive."
        )
      },
      {
        image: generalBottomImage,
        slot: "ads.general_bottom",
        description: message(
          "Appears at the bottom of most pages. Best size <= 150px height or responsive."
        )
      },
      {
        image: titleTopImage,
        slot: "ads.title_top",
        description: message(
          "Appears in title page only (after plot summary). Best size <= 850px width or responsive."
        )
      },
      {
        image: personTopImage,
        slot: "ads.person_top",
        description: message(
          "Appears in person page only (after biography). Best size <= 850px width or responsive."
        )
      },
      {
        image: watchTop,
        slot: "ads.watch_top",
        description: message(
          "Appears in watch page only (below video player). Best size is as wide as possible or responsive."
        )
      }
    ]
  }
};
class ToastTimer {
  constructor(callback, remaining) {
    __publicField(this, "timerId");
    __publicField(this, "createdAt", 0);
    this.callback = callback;
    this.remaining = remaining;
    this.resume();
  }
  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.createdAt;
  }
  resume() {
    this.createdAt = Date.now();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(this.callback, this.remaining);
  }
  clear() {
    clearTimeout(this.timerId);
  }
}
const maximumVisible = 1;
function getDefaultDuration(type) {
  switch (type) {
    case "danger":
      return 8e3;
    case "loading":
      return 0;
    default:
      return 3e3;
  }
}
const useToastStore = create()(
  immer((set, get) => ({
    toasts: [],
    add: (message2, opts) => {
      const amountToRemove = get().toasts.length + 1 - maximumVisible;
      if (amountToRemove > 0) {
        set((state) => {
          state.toasts.splice(0, amountToRemove);
        });
      }
      const toastId = (opts == null ? void 0 : opts.id) || nanoid(6);
      const toastType = (opts == null ? void 0 : opts.type) || "positive";
      const duration = (opts == null ? void 0 : opts.duration) ?? getDefaultDuration(toastType);
      const toast2 = {
        timer: duration > 0 ? new ToastTimer(() => get().remove(toastId), duration) : null,
        message: message2,
        ...opts,
        id: toastId,
        type: toastType,
        position: (opts == null ? void 0 : opts.position) || "bottom-center",
        duration,
        disableExitAnimation: opts == null ? void 0 : opts.disableExitAnimation,
        disableEnterAnimation: opts == null ? void 0 : opts.disableEnterAnimation
      };
      const toastIndex = get().toasts.findIndex((t) => t.id === toast2.id);
      if (toastIndex > -1) {
        set((state) => {
          state.toasts[toastIndex] = toast2;
        });
      } else {
        set((state) => {
          state.toasts.push(toast2);
        });
      }
    },
    remove: (toastId) => {
      const newToasts = get().toasts.filter((toast2) => {
        var _a;
        if (toastId === toast2.id) {
          (_a = toast2.timer) == null ? void 0 : _a.clear();
          return false;
        }
        return true;
      });
      set((state) => {
        state.toasts = newToasts;
      });
    }
  }))
);
function toastState() {
  return useToastStore.getState();
}
function toast(message2, opts) {
  toastState().add(message2, opts);
}
toast.danger = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "danger" });
};
toast.positive = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "positive" });
};
toast.loading = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "loading" });
};
const WorkspaceQueryKeys = {
  fetchUserWorkspaces: ["user-workspaces"],
  workspaceWithMembers: (id) => ["workspace-with-members", id]
};
const PersonalWorkspace = {
  name: "Default",
  default: true,
  id: 0,
  members_count: 1
};
function isSsr() {
  return true;
}
const listenForCookieChange = (name, callback) => {
  return () => {
  };
};
function getCookie(name, initialValue = "") {
  return initialValue;
}
function useCookie(key, initialValue) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });
  useEffect(() => {
    return listenForCookieChange();
  }, [key]);
  const updateItem = useCallback(
    (value, options) => {
      setItem(value);
    },
    [key]
  );
  return [item, updateItem];
}
const ActiveWorkspaceIdContext = React.createContext({
  // set default as null, so it's not sent via query params in admin and
  // other places if component is not wrapped in workspace context explicitly
  workspaceId: null,
  setWorkspaceId: () => {
  }
});
function useActiveWorkspaceId() {
  return useContext(ActiveWorkspaceIdContext);
}
function ActiveWorkspaceProvider({
  children
}) {
  const [workspaceId, setCookieId] = useCookie(
    "activeWorkspaceId",
    `${PersonalWorkspace.id}`
  );
  useEffect(() => {
    setActiveWorkspaceId(parseInt(workspaceId));
    return () => {
      setActiveWorkspaceId(0);
    };
  }, [workspaceId]);
  const contextValue = useMemo(() => {
    return {
      workspaceId: parseInt(workspaceId),
      setWorkspaceId: (id) => {
        setCookieId(`${id}`);
      }
    };
  }, [workspaceId, setCookieId]);
  return /* @__PURE__ */ jsx(ActiveWorkspaceIdContext.Provider, { value: contextValue, children });
}
const Endpoint = "notifications";
function useUserNotifications(payload) {
  return useQuery({
    queryKey: useUserNotifications.key,
    queryFn: () => fetchUserNotifications(payload)
  });
}
function fetchUserNotifications(payload) {
  return apiClient.get(Endpoint, { params: payload }).then((response) => response.data);
}
useUserNotifications.key = [Endpoint];
function getAxiosErrorMessage(err, field) {
  var _a;
  if (axios.isAxiosError(err) && err.response) {
    const response = err.response.data;
    if (field != null) {
      const fieldMessage = (_a = response.errors) == null ? void 0 : _a[field];
      return Array.isArray(fieldMessage) ? fieldMessage[0] : fieldMessage;
    }
    return response == null ? void 0 : response.message;
  }
}
const DialogContext = React.createContext(null);
function useDialogContext() {
  return useContext(DialogContext);
}
function useSelectedLocale() {
  var _a, _b;
  const data = useBootstrapDataStore((s) => s.data);
  return {
    locale: data == null ? void 0 : data.i18n,
    localeCode: ((_a = data == null ? void 0 : data.i18n) == null ? void 0 : _a.language) || "en",
    lines: (_b = data == null ? void 0 : data.i18n) == null ? void 0 : _b.lines
  };
}
function handlePluralMessage(localeCode, { message: message2, values }) {
  const match2 = message2.match(/\[(.+?)]/);
  const count = values == null ? void 0 : values.count;
  if (match2 && match2[1] && !Number.isNaN(count)) {
    const [pluralPlaceholder, pluralConfig] = match2;
    const choices = pluralConfig.split("|");
    if (!choices.length)
      return message2;
    const rules = getRules(localeCode);
    const choiceName = rules.select(count);
    let choiceConfig = choices.find((c) => {
      return c.startsWith(choiceName);
    });
    if (!choiceConfig) {
      choiceConfig = choices[0];
    }
    const choice = choiceConfig.substring(choiceConfig.indexOf(" ") + 1);
    return message2.replace(pluralPlaceholder, choice);
  }
  return message2;
}
const getRules = memoize((localeCode) => {
  return new Intl.PluralRules(localeCode);
});
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  return true;
}
function useTrans() {
  const { lines, localeCode } = useSelectedLocale();
  const trans = useCallback(
    (props) => {
      return translate({ ...props, lines, localeCode });
    },
    [lines, localeCode]
  );
  return { trans };
}
const translate = memoize(
  (props) => {
    let { lines, message: message2, values, localeCode } = props;
    if (message2 == null) {
      return "";
    }
    message2 = (lines == null ? void 0 : lines[message2]) || (lines == null ? void 0 : lines[message2.toLowerCase()]) || message2;
    if (!values) {
      return message2;
    }
    message2 = handlePluralMessage(localeCode, props);
    Object.entries(values).forEach(([key, value]) => {
      message2 = message2.replace(`:${key}`, `${value}`);
    });
    return message2;
  },
  { equals: shallowEqual, callTimeout: 0 }
);
function DismissButton({ onDismiss }) {
  const { trans } = useTrans();
  const onClick = () => {
    if (onDismiss) {
      onDismiss();
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "sr-only",
      "aria-label": trans(message("Dismiss")),
      tabIndex: -1,
      onClick
    }
  );
}
function Dialog(props) {
  const {
    type = "modal",
    dialogProps,
    ...contextProps
  } = useContext(DialogContext);
  const {
    children,
    className,
    size: size2 = "md",
    background,
    radius = "rounded",
    maxWidth = "max-w-dialog",
    maxHeight = "max-h-dialog",
    shadow = "shadow-2xl",
    ...domProps
  } = props;
  let dismissButton = null;
  if (type === "popover" || type === "tray") {
    dismissButton = /* @__PURE__ */ jsx(DismissButton, { onDismiss: contextProps.close });
  }
  const isTrayOrFullScreen = size2 === "fullscreenTakeover" || type === "tray";
  const mergedClassName = clsx(
    "mx-auto pointer-events-auto outline-none flex flex-col overflow-hidden",
    background || "bg",
    type !== "tray" && sizeStyle(size2),
    type === "tray" && "rounded-t border-b-bg",
    size2 !== "fullscreenTakeover" && `${shadow} border ${maxHeight}`,
    !isTrayOrFullScreen && `${radius} ${maxWidth}`,
    className
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps({ role: "dialog", tabIndex: -1 }, dialogProps, domProps),
      style: { ...props.style, "--be-dialog-padding": "24px" },
      "aria-modal": true,
      className: mergedClassName,
      children: [
        Children.toArray(children).map((child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              size: child.props.size ?? size2
            });
          }
          return child;
        }),
        dismissButton
      ]
    }
  );
}
function sizeStyle(dialogSize) {
  switch (dialogSize) {
    case "2xs":
      return "w-256";
    case "xs":
      return "w-320";
    case "sm":
      return "w-384";
    case "md":
      return "w-440";
    case "lg":
      return "w-620";
    case "xl":
      return "w-780";
    case "2xl":
      return "w-850";
    case "fullscreen":
      return "w-1280";
    case "fullscreenTakeover":
      return "w-full h-full";
    default:
      return dialogSize;
  }
}
function getButtonSizeStyle(size2, { padding, equalWidth, variant } = {}) {
  switch (size2) {
    case "2xs":
      if (variant === "link")
        return "text-xs";
      return `text-xs h-24 ${equalWidth ? "w-24" : padding || "px-10"}`;
    case "xs":
      if (variant === "link")
        return "text-xs";
      return `text-xs h-30 ${equalWidth ? "w-30" : padding || "px-14"}`;
    case "sm":
      if (variant === "link")
        return "text-sm";
      return `text-sm h-36 ${equalWidth ? "w-36" : padding || "px-18"}`;
    case "md":
      if (variant === "link")
        return "text-base";
      return `text-base h-42 ${equalWidth ? "w-42" : padding || "px-22"}`;
    case "lg":
      if (variant === "link")
        return "text-lg";
      return `text-base h-50 ${equalWidth ? "w-50" : padding || "px-26"}`;
    case "xl":
      if (variant === "link")
        return "text-xl";
      return `text-lg h-60 ${equalWidth ? "w-60" : padding || "px-32"}`;
    default:
      return size2 || "";
  }
}
function getSharedButtonStyle(props) {
  const {
    variant,
    shadow,
    whitespace = "whitespace-nowrap",
    display = "inline-flex"
  } = props;
  const variantProps = { ...props, border: props.border || "border" };
  let style = [];
  if (variant === "outline") {
    style = outline(variantProps);
  } else if (variant === "text") {
    style = text(variantProps);
  } else if (variant === "flat" || variant === "raised") {
    style = contained(variantProps);
  } else if (variant === "link") {
    style = link(variantProps);
  }
  return [
    ...style,
    shadow || variant === "raised" && "shadow-md",
    whitespace,
    display,
    variant && "align-middle flex-shrink-0 items-center transition-button duration-200",
    "select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default"
  ];
}
function outline({ color, border }) {
  const disabled = "disabled:text-disabled disabled:bg-transparent disabled:border-disabled-bg";
  switch (color) {
    case "primary":
      return [
        `text-primary bg-transparent ${border} border-primary/50`,
        "hover:bg-primary/hover hover:border-primary",
        disabled
      ];
    case "danger":
      return [
        `text-danger bg-transparent ${border} border-danger/50`,
        "hover:bg-danger/4 hover:border-danger",
        disabled
      ];
    case "positive":
      return [
        `text-positive bg-transparent ${border} border-positive/50`,
        "hover:bg-positive/4 hover:border-positive",
        disabled
      ];
    case "paper":
      return [`text bg-paper ${border}`, "hover:bg-hover", disabled];
    case "white":
      return [
        "text-white bg-transparent border border-white",
        "hover:bg-white/20",
        "disabled:text-white/70 disabled:border-white/70 disabled:bg-transparent"
      ];
    default:
      return [`bg-transparent ${border}`, "hover:bg-hover", disabled];
  }
}
function text({ color }) {
  const disabled = "disabled:text-disabled disabled:bg-transparent";
  switch (color) {
    case "primary":
      return [
        "text-primary bg-transparent border-transparent",
        "hover:bg-primary/4",
        disabled
      ];
    case "danger":
      return [
        "text-danger bg-transparent border-transparent",
        "hover:bg-danger/4",
        disabled
      ];
    case "positive":
      return [
        "text-positive bg-transparent border-transparent",
        "hover:bg-positive/4",
        disabled
      ];
    case "white":
      return [
        "text-white bg-transparent border-transparent",
        "hover:bg-white/20",
        "disabled:text-white/70 disabled:bg-transparent"
      ];
    default:
      return ["bg-transparent border-transparent", "hover:bg-hover", disabled];
  }
}
function link({ color }) {
  switch (color) {
    case "primary":
      return ["text-primary", "hover:underline", "disabled:text-disabled"];
    case "danger":
      return ["text-danger", "hover:underline", "disabled:text-disabled"];
    default:
      return ["text-main", "hover:underline", "disabled:text-disabled"];
  }
}
function contained({ color, border }) {
  const disabled = "disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none";
  switch (color) {
    case "primary":
      return [
        `text-on-primary bg-primary ${border} border-primary`,
        "hover:bg-primary-dark hover:border-primary-dark",
        disabled
      ];
    case "danger":
      return [
        `text-white bg-danger ${border} border-danger`,
        "hover:bg-danger/90 hover:border-danger/90",
        disabled
      ];
    case "chip":
      return [
        `text-main bg-chip ${border} border-chip`,
        "hover:bg-chip/90 hover:border-chip/90",
        disabled
      ];
    case "paper":
      return [
        `text-main bg-paper ${border} border-paper`,
        "hover:bg-paper/90 hover:border-paper/90",
        disabled
      ];
    case "white":
      return [
        `text-black bg-white ${border} border-white`,
        "hover:bg-white",
        disabled
      ];
    default:
      return [`bg ${border} border-background`, "hover:bg-hover", disabled];
  }
}
function createEventHandler(handler) {
  if (!handler)
    return handler;
  return (e) => {
    if (e.currentTarget.contains(e.target)) {
      handler(e);
    }
  };
}
const ButtonBase = forwardRef((props, ref) => {
  const {
    children,
    color = null,
    variant,
    radius,
    shadow,
    whitespace,
    justify = "justify-center",
    className,
    href,
    form,
    border,
    elementType,
    to,
    relative,
    replace,
    end,
    display,
    type = "button",
    onClick,
    onPointerDown,
    onPointerUp,
    onKeyDown,
    ...domProps
  } = props;
  const Element = elementType || (href ? "a" : "button");
  const isLink = Element === "a";
  return /* @__PURE__ */ jsx(
    Element,
    {
      ref,
      form: isLink ? void 0 : form,
      href,
      to,
      relative,
      type: isLink ? void 0 : type,
      replace,
      end,
      onPointerDown: createEventHandler(onPointerDown),
      onPointerUp: createEventHandler(onPointerUp),
      onClick: createEventHandler(onClick),
      onKeyDown: createEventHandler(onKeyDown),
      className: clsx(
        "focus-visible:ring",
        getSharedButtonStyle({ variant, color, border, whitespace, display }),
        radius,
        justify,
        className
      ),
      ...domProps,
      children
    }
  );
});
const IconButton = forwardRef(
  ({
    children,
    size: size2 = "md",
    // only set icon size based on button size if "ButtonSize" is passed in and not custom className
    iconSize = size2 && size2.length <= 3 ? size2 : "md",
    variant = "text",
    radius = "rounded-button",
    className,
    padding,
    equalWidth = true,
    badge,
    ...other
  }, ref) => {
    const mergedClassName = clsx(
      getButtonSizeStyle(size2, { padding, equalWidth, variant }),
      className,
      badge && "relative"
    );
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ...other,
        ref,
        radius,
        variant,
        className: mergedClassName,
        children: [
          cloneElement(children, { size: iconSize }),
          badge
        ]
      }
    );
  }
);
const SvgIcon = forwardRef(
  (props, ref) => {
    const {
      attr,
      size: size2,
      title,
      className,
      color,
      style,
      children,
      viewBox,
      width,
      height,
      ...svgProps
    } = props;
    return /* @__PURE__ */ jsxs(
      "svg",
      {
        "aria-hidden": !title,
        focusable: false,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: viewBox || "0 0 24 24",
        ...attr,
        ...svgProps,
        className: clsx("svg-icon", className, getSizeClassName$1(size2)),
        style: {
          color,
          ...style
        },
        ref,
        height: height || "1em",
        width: width || "1em",
        children: [
          title && /* @__PURE__ */ jsx("title", { children: title }),
          children
        ]
      }
    );
  }
);
function getSizeClassName$1(size2) {
  switch (size2) {
    case "2xs":
      return "icon-2xs";
    case "xs":
      return "icon-xs";
    case "sm":
      return "icon-sm";
    case "md":
      return "icon-md";
    case "lg":
      return "icon-lg";
    case "xl":
      return "icon-xl";
    default:
      return size2;
  }
}
function createSvgIcon(path, displayName = "", viewBox) {
  const Component = (props, ref) => /* @__PURE__ */ jsx(
    SvgIcon,
    {
      "data-testid": `${displayName}Icon`,
      ref,
      viewBox,
      ...props,
      size: props.size || "md",
      children: path
    }
  );
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }
  return React.memo(React.forwardRef(Component));
}
function createSvgIconFromTree(data, displayName = "") {
  const path = treeToElement(data);
  return createSvgIcon(path, displayName);
}
function treeToElement(tree) {
  return (tree == null ? void 0 : tree.map) && tree.map((node, i) => {
    return React.createElement(
      node.tag,
      { key: i, ...node.attr },
      treeToElement(node.child)
    );
  });
}
function elementToTree(el) {
  const attributes = {};
  const tree = { tag: el.tagName, attr: attributes };
  Array.from(el.attributes).forEach((attribute) => {
    attributes[attribute.name] = attribute.value;
  });
  if (el.children.length) {
    tree.child = Array.from(el.children).map(
      (child) => elementToTree(child)
    );
  }
  return tree;
}
const CloseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" }),
  "CloseOutlined"
);
function DialogHeader(props) {
  const {
    children,
    className,
    color,
    onDismiss,
    leftAdornment,
    rightAdornment,
    hideDismissButton = false,
    size: size2,
    showDivider,
    justify = "justify-between",
    titleFontWeight = "font-semibold",
    titleTextSize = size2 === "xs" ? "text-xs" : "text-sm",
    closeButtonSize = size2 === "xs" ? "xs" : "sm",
    actions,
    closeButtonIcon
  } = props;
  const { labelId, isDismissable, close } = useContext(DialogContext);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "flex flex-shrink-0 items-center gap-10",
        titleFontWeight,
        showDivider && "border-b",
        getPadding$2(props),
        color || "text-main",
        justify
      ),
      children: [
        leftAdornment,
        /* @__PURE__ */ jsx(
          "h3",
          {
            id: labelId,
            className: clsx(titleTextSize, "mr-auto leading-5 opacity-90"),
            children
          }
        ),
        rightAdornment,
        actions,
        isDismissable && !hideDismissButton && /* @__PURE__ */ jsx(
          IconButton,
          {
            "aria-label": "Dismiss",
            onClick: () => {
              if (onDismiss) {
                onDismiss();
              } else {
                close();
              }
            },
            size: closeButtonSize,
            className: clsx("-mr-8 text-muted", rightAdornment && "sr-only"),
            children: closeButtonIcon || /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ]
    }
  );
}
function getPadding$2({ size: size2, padding }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "2xs":
    case "xs":
      return "px-14 py-4";
    case "sm":
      return "px-18 py-4";
    default:
      return "px-24 py-6";
  }
}
function hasOwn(obj, key) {
  if (obj == null) {
    return false;
  }
  if (Object.hasOwn !== void 0) {
    return Object.hasOwn(obj, key);
  }
  return Object.hasOwnProperty(key);
}
const Trans = memo((props) => {
  const { message: initialMessage, values } = props;
  const { lines, localeCode } = useSelectedLocale();
  let translatedMessage;
  if (hasOwn(lines, initialMessage)) {
    translatedMessage = lines == null ? void 0 : lines[initialMessage];
  } else if (hasOwn(lines, initialMessage == null ? void 0 : initialMessage.toLowerCase())) {
    translatedMessage = lines == null ? void 0 : lines[initialMessage == null ? void 0 : initialMessage.toLowerCase()];
  } else {
    translatedMessage = initialMessage;
  }
  if (!values || !translatedMessage) {
    return /* @__PURE__ */ jsx(Fragment, { children: translatedMessage });
  }
  translatedMessage = handlePluralMessage(localeCode, {
    message: translatedMessage,
    values
  });
  const nodePlaceholders = [];
  const tagNames = [];
  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "function") {
      tagNames.push(key);
    } else if (isValidElement(value)) {
      nodePlaceholders.push(key);
    } else if (value != void 0) {
      translatedMessage = translatedMessage == null ? void 0 : translatedMessage.replace(`:${key}`, `${value}`);
    }
  });
  if (tagNames.length || nodePlaceholders.length) {
    const regexArray = [];
    if (tagNames.length) {
      const tagNameMatchers = tagNames.join("");
      regexArray.push(`(<[${tagNameMatchers}]>.+?<\\/[${tagNameMatchers}]>)`);
    }
    if (nodePlaceholders.length) {
      const nodePlaceholderMatchers = nodePlaceholders.join("|");
      regexArray.push(`(:(?:${nodePlaceholderMatchers}))`);
    }
    const regex = new RegExp(regexArray.join("|"), "gm");
    const parts = translatedMessage.split(regex);
    const compiledMessage = parts.filter(Boolean).map((part, i) => {
      if (part.startsWith("<") && part.endsWith(">")) {
        const matches = part.match(/<([a-z]+)>(.+?)<\/([a-z]+)>/);
        if (matches) {
          const [, tagName, content] = matches;
          const renderFn = values == null ? void 0 : values[tagName];
          if (typeof renderFn === "function") {
            const node = renderFn(content);
            return cloneElement(node, { key: i });
          }
        }
      }
      if (part.startsWith(":")) {
        const key = part.replace(":", "");
        const node = values == null ? void 0 : values[key];
        if (isValidElement(node)) {
          return cloneElement(node, { key: i });
        }
      }
      return part;
    });
    return /* @__PURE__ */ jsx(Fragment, { children: compiledMessage });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: translatedMessage });
}, areEqual);
function areEqual(prevProps, nextProps) {
  const { values, ...otherProps } = prevProps;
  const { values: nextValues, ...nextOtherProps } = nextProps;
  return shallowEqual(nextValues, values) && shallowEqual(otherProps, nextOtherProps);
}
const DialogBody = forwardRef(
  (props, ref) => {
    const { children, className, padding, size: size2, ...domProps } = props;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...domProps,
        ref,
        className: clsx(
          className,
          getPadding$1(props),
          "overflow-y-auto overflow-x-hidden overscroll-contain text-sm flex-auto"
        ),
        children
      }
    );
  }
);
function getPadding$1({ size: size2, padding }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "xs":
      return "p-14";
    case "sm":
      return "p-18";
    default:
      return "px-24 py-20";
  }
}
const CancelFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
);
const WarningIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }),
  "WarningOutlined"
);
function useFloatingPosition({
  floatingWidth,
  ref,
  disablePositioning = false,
  placement = "bottom",
  offset: offset$1 = 2,
  showArrow = false,
  maxHeight,
  shiftCrossAxis = true,
  fallbackPlacements
}) {
  const arrowRef = useRef(null);
  const floatingConfig = { placement, strategy: "fixed" };
  if (!disablePositioning) {
    floatingConfig.whileElementsMounted = autoUpdate;
    floatingConfig.middleware = [
      offset(offset$1),
      shift({ padding: 16, crossAxis: shiftCrossAxis, mainAxis: true }),
      flip({
        padding: 16,
        fallbackPlacements
      }),
      size({
        apply({ rects, availableHeight, availableWidth, elements }) {
          if (floatingWidth === "matchTrigger" && maxHeight != null) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              maxWidth: `${availableWidth}`,
              maxHeight: `${Math.min(availableHeight, maxHeight)}px`
            });
          } else if (maxHeight != null) {
            Object.assign(elements.floating.style, {
              maxHeight: `${Math.min(availableHeight, maxHeight)}px`
            });
          }
        },
        padding: 16
      })
    ];
    if (showArrow) {
      floatingConfig.middleware.push(arrow({ element: arrowRef }));
    }
  }
  const floatingProps = useFloating(floatingConfig);
  const mergedReferenceRef = useMemo(
    () => mergeRefs([ref, floatingProps.refs.setReference]),
    [floatingProps.refs.setReference, ref]
  );
  const { x: arrowX, y: arrowY } = floatingProps.middlewareData.arrow || {};
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[floatingProps.placement.split("-")[0]];
  const arrowStyle = {
    left: arrowX,
    top: arrowY,
    right: "",
    bottom: "",
    [staticSide]: "-4px"
  };
  return {
    ...floatingProps,
    reference: mergedReferenceRef,
    arrowRef,
    arrowStyle
  };
}
const PopoverAnimation = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
  transition: { type: "tween", duration: 0.125 }
};
let rootEl = typeof document !== "undefined" ? document.getElementById("root") ?? document.body : void 0;
let themeEl = typeof document !== "undefined" ? document.documentElement : void 0;
const TOOLTIP_COOLDOWN = 500;
const tooltips = {};
let globalWarmedUp = false;
let globalWarmUpTimeout = null;
let globalCooldownTimeout = null;
const closeOpenTooltips = (tooltipId) => {
  var _a;
  for (const hideTooltipId in tooltips) {
    if (hideTooltipId !== tooltipId) {
      (_a = tooltips[hideTooltipId]) == null ? void 0 : _a.call(tooltips, true);
      delete tooltips[hideTooltipId];
    }
  }
};
const Tooltip = forwardRef(
  ({
    children,
    label,
    placement = "top",
    offset: offset2 = 10,
    variant = "neutral",
    delay = 1500,
    isDisabled,
    usePortal = true,
    ...domProps
  }, ref) => {
    const { x, y, reference, strategy, arrowRef, arrowStyle, refs } = useFloatingPosition({
      placement,
      offset: offset2,
      ref,
      showArrow: true
    });
    const [isOpen, setIsOpen] = useState(false);
    const tooltipId = useId();
    const closeTimeout = useRef();
    const showTooltip = () => {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = void 0;
      closeOpenTooltips(tooltipId);
      tooltips[tooltipId] = hideTooltip;
      globalWarmedUp = true;
      setIsOpen(true);
      if (globalWarmUpTimeout) {
        clearTimeout(globalWarmUpTimeout);
        globalWarmUpTimeout = null;
      }
      if (globalCooldownTimeout) {
        clearTimeout(globalCooldownTimeout);
        globalCooldownTimeout = null;
      }
    };
    const hideTooltip = useCallback(
      (immediate) => {
        if (immediate) {
          clearTimeout(closeTimeout.current);
          closeTimeout.current = void 0;
          setIsOpen(false);
        } else if (!closeTimeout.current) {
          closeTimeout.current = setTimeout(() => {
            closeTimeout.current = void 0;
            setIsOpen(false);
          }, TOOLTIP_COOLDOWN);
        }
        if (globalWarmUpTimeout) {
          clearTimeout(globalWarmUpTimeout);
          globalWarmUpTimeout = null;
        }
        if (globalWarmedUp) {
          if (globalCooldownTimeout) {
            clearTimeout(globalCooldownTimeout);
          }
          globalCooldownTimeout = setTimeout(() => {
            delete tooltips[tooltipId];
            globalCooldownTimeout = null;
            globalWarmedUp = false;
          }, TOOLTIP_COOLDOWN);
        }
      },
      [tooltipId]
    );
    const warmupTooltip = () => {
      closeOpenTooltips(tooltipId);
      tooltips[tooltipId] = hideTooltip;
      if (!isOpen && !globalWarmUpTimeout && !globalWarmedUp) {
        globalWarmUpTimeout = setTimeout(() => {
          globalWarmUpTimeout = null;
          globalWarmedUp = true;
          showTooltip();
        }, delay);
      } else if (!isOpen) {
        showTooltip();
      }
    };
    const showTooltipWithWarmup = (immediate) => {
      if (!immediate && delay > 0 && !closeTimeout.current) {
        warmupTooltip();
      } else {
        showTooltip();
      }
    };
    useEffect(() => {
      return () => {
        clearTimeout(closeTimeout.current);
        const tooltip = tooltips[tooltipId];
        if (tooltip) {
          delete tooltips[tooltipId];
        }
      };
    }, [tooltipId]);
    useEffect(() => {
      const onKeyDown = (e) => {
        if (e.key === "Escape") {
          hideTooltip(true);
        }
      };
      if (isOpen) {
        document.addEventListener("keydown", onKeyDown, true);
        return () => {
          document.removeEventListener("keydown", onKeyDown, true);
        };
      }
    }, [isOpen, hideTooltip]);
    const tooltipContent = /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      m.div,
      {
        ...PopoverAnimation,
        ref: refs.setFloating,
        id: tooltipId,
        role: "tooltip",
        onPointerEnter: () => {
          showTooltipWithWarmup(true);
        },
        onPointerLeave: () => {
          hideTooltip();
        },
        className: clsx(
          "z-tooltip my-4 max-w-240 break-words rounded px-8 py-4 text-xs text-white shadow",
          variant === "positive" && "bg-positive",
          variant === "danger" && "bg-danger",
          variant === "neutral" && "bg-toast"
        ),
        style: {
          position: strategy,
          top: y ?? "",
          left: x ?? ""
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: arrowRef,
              className: "absolute h-8 w-8 rotate-45 bg-inherit",
              style: arrowStyle
            }
          ),
          label
        ]
      }
    ) });
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      cloneElement(
        children,
        // pass dom props down to child element, in case tooltip is wrapped in menu trigger
        mergeProps(
          {
            "aria-describedby": isOpen ? tooltipId : void 0,
            ref: reference,
            onPointerEnter: (e) => {
              if (e.pointerType === "mouse") {
                showTooltipWithWarmup();
              }
            },
            onFocus: (e) => {
              if (e.target.matches(":focus-visible")) {
                showTooltipWithWarmup(true);
              }
            },
            onPointerLeave: (e) => {
              if (e.pointerType === "mouse") {
                hideTooltip();
              }
            },
            onPointerDown: () => {
              hideTooltip(true);
            },
            onBlur: () => {
              hideTooltip();
            },
            "aria-label": typeof label === "string" ? label : label.props.message
          },
          domProps
        )
      ),
      usePortal ? rootEl && createPortal(tooltipContent, rootEl) : tooltipContent
    ] });
  }
);
function Chip(props) {
  const {
    onRemove,
    disabled,
    invalid,
    errorMessage,
    children,
    className,
    selectable = false,
    radius = "rounded-full",
    elementType = "div",
    to,
    onClick
  } = props;
  const chipRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const focusManager = useFocusManager();
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext({ tabbable: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious({ tabbable: true });
        break;
      case "Backspace":
      case "Delete":
        if (chipRef.current === document.activeElement) {
          onRemove == null ? void 0 : onRemove();
        }
        break;
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    } else {
      chipRef.current.focus();
    }
  };
  const sizeStyle2 = sizeClassNames(props);
  let adornment = invalid || errorMessage != null ? /* @__PURE__ */ jsx(WarningIcon, { className: "text-danger", size: "sm" }) : props.adornment && cloneElement(props.adornment, {
    size: sizeStyle2.adornment.size,
    circle: true,
    className: clsx(
      props.adornment.props.className,
      sizeStyle2.adornment.margin
    )
  });
  if (errorMessage && adornment) {
    adornment = /* @__PURE__ */ jsx(Tooltip, { label: errorMessage, variant: "danger", children: adornment });
  }
  const Element = elementType;
  return /* @__PURE__ */ jsxs(
    Element,
    {
      tabIndex: selectable ? 0 : void 0,
      ref: chipRef,
      to,
      onKeyDown: selectable ? handleKeyDown : void 0,
      onClick: selectable ? handleClick : void 0,
      className: clsx(
        "relative flex flex-shrink-0 items-center justify-center gap-10 overflow-hidden whitespace-nowrap outline-none",
        "min-w-0 max-w-full after:pointer-events-none after:absolute after:inset-0",
        onClick && "cursor-pointer",
        radius,
        colorClassName(props),
        sizeStyle2.chip,
        !disabled && selectable && "hover:after:bg-black/5 focus:after:bg-black/10",
        className
      ),
      children: [
        adornment,
        /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-hidden overflow-ellipsis", children }),
        onRemove && /* @__PURE__ */ jsx(
          ButtonBase,
          {
            ref: deleteButtonRef,
            className: clsx(
              "text-black/30 dark:text-white/50",
              sizeStyle2.closeButton
            ),
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            tabIndex: -1,
            children: /* @__PURE__ */ jsx(CancelFilledIcon, { className: "block", width: "100%", height: "100%" })
          }
        )
      ]
    }
  );
}
function sizeClassNames({ size: size2, onRemove }) {
  switch (size2) {
    case "xs":
      return {
        adornment: { size: "xs", margin: "-ml-3" },
        chip: clsx("pl-8 h-20 text-xs font-medium w-max", !onRemove && "pr-8"),
        closeButton: "mr-4 w-14 h-14"
      };
    case "sm":
      return {
        adornment: { size: "xs", margin: "-ml-3" },
        chip: clsx("pl-8 h-26 text-xs", !onRemove && "pr-8"),
        closeButton: "mr-4 w-18 h-18"
      };
    case "lg":
      return {
        adornment: { size: "md", margin: "-ml-12" },
        chip: clsx("pl-18 h-38 text-base", !onRemove && "pr-18"),
        closeButton: "mr-6 w-24 h-24"
      };
    default:
      return {
        adornment: { size: "sm", margin: "-ml-6" },
        chip: clsx("pl-12 h-32 text-sm", !onRemove && "pr-12"),
        closeButton: "mr-6 w-22 h-22"
      };
  }
}
function colorClassName({ color }) {
  switch (color) {
    case "primary":
      return `bg-primary text-on-primary`;
    case "positive":
      return `bg-positive-lighter text-positive-darker`;
    case "danger":
      return `bg-danger-lighter text-danger-darker`;
    default:
      return `bg-chip text-main`;
  }
}
const ErrorIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }),
  "ErrorOutlined"
);
function highlightAllCode(el, themeMode = "dark") {
  el.querySelectorAll("pre code").forEach((e) => {
    highlightCode(e, themeMode);
  });
}
async function highlightCode(el, themeMode = "dark") {
  const { hljs } = await import("./assets/highlight-31acaf62.mjs");
  if (!el.dataset.highlighted) {
    el.classList.add(themeMode === "dark" ? "hljs-dark" : "hljs-light");
    hljs.highlightElement(el);
  }
}
const KeyboardArrowDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }),
  "KeyboardArrowDownOutlined"
);
const Button = React.forwardRef(
  ({
    children,
    startIcon,
    endIcon,
    size: size2 = "sm",
    sizeClassName,
    className,
    equalWidth = false,
    radius = "rounded-button",
    variant = "text",
    disabled,
    elementType,
    to,
    replace,
    href,
    download,
    ...other
  }, ref) => {
    const mergedClassName = clsx(
      "font-semibold",
      sizeClassName || getButtonSizeStyle(size2, { equalWidth, variant }),
      className
    );
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        className: mergedClassName,
        ref,
        radius,
        variant,
        disabled,
        to: disabled ? void 0 : to,
        href: disabled ? void 0 : href,
        download: disabled ? void 0 : download,
        elementType: disabled ? void 0 : elementType,
        replace: disabled ? void 0 : replace,
        ...other,
        children: [
          startIcon && /* @__PURE__ */ jsx(InlineIcon, { position: "start", icon: startIcon, size: size2 }),
          children,
          endIcon && /* @__PURE__ */ jsx(InlineIcon, { position: "end", icon: endIcon, size: size2 })
        ]
      }
    );
  }
);
function InlineIcon({ icon, position, size: size2 }) {
  const className = clsx(
    "m-auto",
    {
      "-ml-4 mr-8": position === "start",
      "-mr-4 ml-8": position === "end"
    },
    icon.props.className
  );
  return React.cloneElement(icon, { className, size: icon.props.size ?? size2 });
}
const UnfoldMoreIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" }),
  "UnfoldMoreOutlined"
);
const UnfoldLessIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z" }),
  "UnfoldLessOutlined"
);
function IgnitionStackTrace({
  trace,
  onSelectedIndexChange,
  selectedIndex,
  totalVendorGroups
}) {
  const [expandedVendorGroups, setExpandedVendorGroups] = useState(
    []
  );
  const allVendorGroupsExpanded = expandedVendorGroups.length === totalVendorGroups;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-440 border-r text-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b px-30 py-16", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "2xs",
        startIcon: allVendorGroupsExpanded ? /* @__PURE__ */ jsx(UnfoldLessIcon, {}) : /* @__PURE__ */ jsx(UnfoldMoreIcon, {}),
        onClick: () => {
          if (allVendorGroupsExpanded) {
            setExpandedVendorGroups([]);
          } else {
            setExpandedVendorGroups(
              trace.map((frame, index) => "vendorGroup" in frame ? index : -1).filter((index) => index !== -1)
            );
          }
        },
        children: allVendorGroupsExpanded ? /* @__PURE__ */ jsx(Trans, { message: "Collapse vendor frames" }) : /* @__PURE__ */ jsx(Trans, { message: "Expand vendor frames" })
      }
    ) }),
    trace.map((frame, index) => {
      if ("vendorGroup" in frame) {
        if (expandedVendorGroups.includes(index)) {
          return /* @__PURE__ */ jsx(Fragment, { children: frame.items.map((vendorFrame, index2) => /* @__PURE__ */ jsx(
            StackTrackItem,
            {
              frame: vendorFrame,
              onClick: () => onSelectedIndexChange(vendorFrame.flatIndex),
              isSelected: selectedIndex === vendorFrame.flatIndex
            },
            `vendor-${index2}`
          )) }, index);
        }
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex cursor-pointer items-center gap-4 border-b px-30 py-16 hover:bg-hover",
            onClick: () => setExpandedVendorGroups((prev) => [...prev, index]),
            children: [
              /* @__PURE__ */ jsx(
                Trans,
                {
                  message: ":count vendor [one frame|other frames]",
                  values: { count: frame.items.length }
                }
              ),
              /* @__PURE__ */ jsx(KeyboardArrowDownIcon, { className: "text-muted" })
            ]
          },
          index
        );
      }
      return /* @__PURE__ */ jsx(
        StackTrackItem,
        {
          frame,
          onClick: () => onSelectedIndexChange(frame.flatIndex),
          isSelected: selectedIndex === frame.flatIndex
        },
        index
      );
    })
  ] });
}
function StackTrackItem({ frame, onClick, isSelected }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick,
      className: clsx(
        "cursor-pointer border-b px-30 py-16",
        isSelected ? "bg-danger text-on-primary" : "hover:bg-danger/10"
      ),
      children: [
        /* @__PURE__ */ jsx(IgnitionFilePath, { frame }),
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: frame.method })
      ]
    }
  );
}
function IgnitionFilePath({ frame }) {
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-wrap items-baseline", children: [
    frame.path.map(
      (part, index) => frame.path.length - 1 === index ? /* @__PURE__ */ jsx("div", { className: "font-semibold", children: part }, index) : /* @__PURE__ */ jsxs("div", { children: [
        part,
        "/"
      ] }, index)
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      ":",
      frame.lineNumber
    ] })
  ] });
}
function IgnitionErrorDialog({ error }) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    for (const frame of error.trace) {
      if (!("vendorGroup" in frame)) {
        return frame.flatIndex;
      }
    }
    return 0;
  });
  const selectedFrame = useMemo(() => {
    for (const frame of error.trace) {
      if ("vendorGroup" in frame) {
        for (const vendorFrame of frame.items) {
          if (vendorFrame.flatIndex === selectedIndex) {
            return vendorFrame;
          }
        }
      } else if (frame.flatIndex === selectedIndex) {
        return frame;
      }
    }
  }, [error, selectedIndex]);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        showDivider: true,
        leftAdornment: /* @__PURE__ */ jsx(ErrorIcon, {}),
        color: "text-danger",
        actions: /* @__PURE__ */ jsx(DownloadButton, {}),
        children: /* @__PURE__ */ jsx(Trans, { message: "An error occured" })
      }
    ),
    /* @__PURE__ */ jsxs(DialogBody, { padding: "p-0 stack", children: [
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 border-b bg p-24", children: [
        /* @__PURE__ */ jsx(Chip, { className: "w-max", radius: "rounded-panel", children: error.exception }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 line-clamp-2 text-lg font-semibold leading-snug", children: error.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-10", children: [
        /* @__PURE__ */ jsx(
          IgnitionStackTrace,
          {
            trace: error.trace,
            onSelectedIndexChange: setSelectedIndex,
            selectedIndex,
            totalVendorGroups: error.totalVendorGroups
          }
        ),
        selectedFrame && /* @__PURE__ */ jsx(CodeSnippet, { frame: selectedFrame })
      ] })
    ] })
  ] });
}
function CodeSnippet({ frame }) {
  const codeRef = useRef(null);
  const lineNumbers = Object.keys(frame.codeSnippet).map(Number);
  const highlightedIndex = lineNumbers.indexOf(frame.lineNumber);
  const lines = Object.values(frame.codeSnippet);
  return /* @__PURE__ */ jsxs("div", { className: "sticky top-120 flex-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "px-30 py-16 text-right text-muted", children: /* @__PURE__ */ jsx(IgnitionFilePath, { frame }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "mr-8 select-none text-right", children: lineNumbers.map((lineNumber, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "px-8 font-mono leading-loose text-muted",
            index == highlightedIndex && "bg-danger/30"
          ),
          children: lineNumber
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "compact-scrollbar flex-grow overflow-x-auto", children: /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { className: "language-php", ref: codeRef, children: lines.map((line, index) => /* @__PURE__ */ jsx(
        CodeSnippetLine,
        {
          isHighlighted: highlightedIndex === index,
          line
        },
        `${frame.path}.${index}`
      )) }) }) })
    ] })
  ] });
}
const CodeSnippetLine = memo(({ line, isHighlighted }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    highlightCode(el, "light");
    return () => {
      delete el.dataset.highlighted;
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx("block leading-loose", isHighlighted && "bg-danger/20"),
      children: /* @__PURE__ */ jsx("span", { className: "language-php", ref, children: line + "\n" })
    }
  );
});
function DownloadButton() {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      className: "text-main",
      elementType: "a",
      download: true,
      href: "api/v1/logs/error/download-latest",
      size: "2xs",
      children: /* @__PURE__ */ jsx(Trans, { message: "Download log" })
    }
  );
}
const useDialogStore = create()(
  immer((set, get) => ({
    dialog: null,
    data: void 0,
    resolveClosePromise: null,
    openDialog: (dialog, data) => {
      return new Promise((resolve) => {
        set((state) => {
          state.dialog = dialog;
          state.data = data;
          state.resolveClosePromise = resolve;
        });
      });
    },
    closeActiveDialog: (value) => {
      var _a, _b;
      (_b = (_a = get()).resolveClosePromise) == null ? void 0 : _b.call(_a, value);
      set((state) => {
        state.dialog = null;
        state.data = void 0;
        state.resolveClosePromise = null;
      });
    }
  }))
);
const openDialog = useDialogStore.getState().openDialog;
const closeDialog = (value) => {
  useDialogStore.getState().closeActiveDialog(value);
};
const defaultErrorMessage = message("There was an issue. Please try again.");
function showHttpErrorToast(err, defaultMessage = defaultErrorMessage, field, toastOptions) {
  var _a, _b, _c, _d;
  if (axios.isAxiosError(err) && ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.ignitionTrace)) {
    openDialog(IgnitionErrorDialog, { error: err.response.data });
  } else {
    toast.danger(getAxiosErrorMessage(err, field) || defaultMessage, {
      action: (_d = (_c = err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.action,
      ...toastOptions
    });
  }
}
function useJoinWorkspace() {
  const { setWorkspaceId } = useActiveWorkspaceId() || {};
  return useMutation({
    mutationFn: (props) => joinWorkspace(props),
    onSuccess: (response) => {
      toast(message("Joined workspace"));
      setWorkspaceId(response.workspace.id);
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && e.response.status === 404) {
        queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
        toast.danger(message("This invite is no longer valid"));
      } else {
        showHttpErrorToast(e);
      }
    }
  });
}
function joinWorkspace({ inviteId }) {
  return apiClient.get(`workspace/join/${inviteId}`).then((r) => r.data);
}
const GroupAddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22 9V7h-2v2h-2v2h2v2h2v-2h2V9zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2v1zM12.51 4.05C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95zm4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17z" }),
  "GroupAddOutlined"
);
const PeopleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" }),
  "PeopleOutlined"
);
const FileDownloadDoneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20.13 5.41 18.72 4l-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66zM5 18h14v2H5z" }),
  "FileDownloadDoneOutlined"
);
const SvgImage = memo(({ src, className, height = "h-full" }) => {
  const svgString = useSvgImageContent(src);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "svg-image-container inline-block bg-no-repeat",
        height,
        className
      ),
      dangerouslySetInnerHTML: svgString ? { __html: svgString } : void 0
    }
  );
});
const svgCache = /* @__PURE__ */ new Map();
function useSvgImageContent(src) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const cached = svgCache.get(src);
    if (cached) {
      if (typeof cached === "string") {
        setImage(cached);
      } else {
        cached.then(setImage);
      }
    } else {
      const promise = fetchSvgImageContent(src);
      svgCache.set(src, promise);
      promise.then((svg) => {
        svgCache.set(src, svg);
        setImage(svg);
      });
    }
  }, [src]);
  return image;
}
function fetchSvgImageContent(src) {
  return fetch(src).then((response) => response.text());
}
const MixedImage = memo(({ src, className, ...domProps }) => {
  let type = null;
  if (!src) {
    type = null;
  } else if (typeof src === "object") {
    type = "icon";
  } else if (src.endsWith(".svg") && !isAbsoluteUrl(src)) {
    type = "svg";
  } else {
    type = "image";
  }
  if (type === "svg") {
    return /* @__PURE__ */ jsx(
      SvgImage,
      {
        ...domProps,
        className,
        src,
        height: false
      }
    );
  }
  if (type === "image") {
    return /* @__PURE__ */ jsx("img", { ...domProps, className, src, alt: "" });
  }
  if (type === "icon") {
    const Icon = src;
    return /* @__PURE__ */ jsx(
      Icon,
      {
        ...domProps,
        className
      }
    );
  }
  return null;
});
function useUserTimezone() {
  const { user, settings } = useBootstrapDataStore((s) => s.data);
  const defaultTimezone = settings.dates.default_timezone;
  const preferredTimezone = (user == null ? void 0 : user.timezone) || defaultTimezone || "auto";
  return useMemo(() => {
    return !preferredTimezone || preferredTimezone === "auto" ? getLocalTimeZone() : preferredTimezone;
  }, [preferredTimezone]);
}
const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" }
];
const FormattedRelativeTime = memo(
  ({ date, style }) => {
    const { localeCode } = useSelectedLocale();
    const timezone = useUserTimezone();
    const formatter = useMemo(
      () => new Intl.RelativeTimeFormat(localeCode, {
        numeric: "auto",
        style
      }),
      [localeCode, style]
    );
    if (!date) {
      return null;
    }
    try {
      if (typeof date === "string") {
        date = parseAbsoluteToLocal(date).toDate();
      } else if ("toDate" in date) {
        date = date.toDate(timezone);
      }
    } catch (e) {
      return null;
    }
    let duration = (date.getTime() - Date.now()) / 1e3;
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        if (division.name === "seconds") {
          return /* @__PURE__ */ jsx(Trans, { message: "a few seconds ago" });
        }
        return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(Math.round(duration), division.name) });
      }
      duration /= division.amount;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(Math.round(duration), "day") });
  },
  shallowEqual
);
function Line({ notification, line, index, iconRenderer }) {
  var _a, _b;
  const isPrimary = line.type === "primary" || index === 0;
  const Icon = iconRenderer || DefaultIconRenderer;
  const Element = line.action ? "a" : "div";
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      Element,
      {
        className: clsx(
          "flex items-center gap-8",
          line.action && "hover:underline",
          isPrimary ? "mnarktext-main whitespace-nowrap text-sm" : "mt-6 text-xs text-muted"
        ),
        href: (_a = line.action) == null ? void 0 : _a.action,
        title: (_b = line.action) == null ? void 0 : _b.label,
        children: [
          line.icon && /* @__PURE__ */ jsx(Icon, { icon: line.icon }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-hidden text-ellipsis",
              dangerouslySetInnerHTML: { __html: line.content }
            }
          )
        ]
      },
      index
    ),
    index === 0 && /* @__PURE__ */ jsx("time", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: notification.created_at }) })
  ] });
}
function DefaultIconRenderer({ icon }) {
  return /* @__PURE__ */ jsx(MixedImage, { src: icon });
}
function useMarkNotificationsAsRead() {
  const data = useBootstrapDataStore((s) => s.data);
  return useMutation({
    mutationFn: (props) => UseMarkNotificationsAsRead(props),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
      if (response.unreadCount === 0) {
        mergeBootstrapData({
          user: { ...data.user, unread_notifications_count: 0 }
        });
      }
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function UseMarkNotificationsAsRead(payload) {
  return apiClient.post("notifications/mark-as-read", payload).then((r) => r.data);
}
function useNavigate() {
  const routerNavigate = useNavigate$1();
  const location = useLocation();
  return useCallback(
    (to, options) => {
      const replace = createPath(location) === createPath(resolvePath(to, location.pathname));
      routerNavigate(to, {
        ...options,
        replace: (options == null ? void 0 : options.replace) !== false && replace
      });
    },
    [routerNavigate, location]
  );
}
function useSettings() {
  return useBootstrapDataStore((s) => s.data.settings);
}
const iconMap = {
  "group-add": GroupAddIcon,
  people: PeopleIcon,
  "export-csv": FileDownloadDoneIcon
};
function NotificationList({
  notifications,
  className
}) {
  const { notifications: config } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsx("div", { className, children: notifications.map((notification, index) => {
    var _a;
    const isLast = notifications.length - 1 === index;
    const Renderer = ((_a = config == null ? void 0 : config.renderMap) == null ? void 0 : _a[notification.type]) || NotificationListItem;
    return /* @__PURE__ */ jsx(
      Renderer,
      {
        notification,
        isLast
      },
      notification.id
    );
  }) });
}
function NotificationListItem({
  notification,
  onActionButtonClick,
  lineIconRenderer,
  isLast
}) {
  const markAsRead = useMarkNotificationsAsRead();
  const navigate = useNavigate();
  const mainAction = notification.data.mainAction;
  const showUnreadIndicator = !notification.data.image && !notification.read_at;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => {
        var _a;
        if (!markAsRead.isPending && !notification.read_at) {
          markAsRead.mutate({ ids: [notification.id] });
        }
        if (mainAction == null ? void 0 : mainAction.action) {
          if (isAbsoluteUrl(mainAction.action)) {
            (_a = window.open(mainAction.action, "_blank")) == null ? void 0 : _a.focus();
          } else {
            navigate(mainAction.action);
          }
        }
      },
      className: clsx(
        "relative flex items-start gap-14 bg-alt px-32 py-20",
        !isLast && "border-b",
        (mainAction == null ? void 0 : mainAction.action) && "cursor-pointer",
        !notification.read_at ? "bg-paper hover:bg-primary/10" : "hover:bg-hover"
      ),
      title: (mainAction == null ? void 0 : mainAction.label) ? mainAction.label : void 0,
      children: [
        showUnreadIndicator && /* @__PURE__ */ jsx("div", { className: "absolute left-16 top-26 h-8 w-8 flex-shrink-0 rounded-full bg-primary shadow" }),
        notification.data.image && /* @__PURE__ */ jsx(
          MixedImage,
          {
            className: "h-24 w-24 flex-shrink-0 text-muted",
            src: iconMap[notification.data.image] || notification.data.image
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          notification.data.lines.map((line, index) => /* @__PURE__ */ jsx(
            Line,
            {
              iconRenderer: lineIconRenderer,
              notification,
              line,
              index
            },
            index
          )),
          /* @__PURE__ */ jsx(
            ButtonActions,
            {
              onActionClick: onActionButtonClick,
              notification
            }
          )
        ] })
      ]
    }
  );
}
function ButtonActions({ notification, onActionClick }) {
  const { base_url } = useSettings();
  if (!notification.data.buttonActions)
    return null;
  return /* @__PURE__ */ jsx("div", { className: "mt-12 flex items-center gap-12", children: notification.data.buttonActions.map((action, index) => /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: index === 0 ? "flat" : "outline",
      color: index === 0 ? "primary" : null,
      elementType: !onActionClick ? Link : void 0,
      to: !onActionClick ? action.action.replace(base_url, "") : void 0,
      onClick: (e) => {
        onActionClick == null ? void 0 : onActionClick(e, action);
      },
      children: action.label
    },
    index
  )) });
}
function deleteInvite({ inviteId }) {
  return apiClient.delete(`workspace/invite/${inviteId}`).then((r) => r.data);
}
function useDeleteInvite() {
  return useMutation({
    mutationFn: (props) => deleteInvite(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
      toast(message("Declined workspace invitation"));
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && e.response.status === 404) {
        queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
        toast.danger(message("This invite is no longer valid"));
      } else {
        showHttpErrorToast(e);
      }
    }
  });
}
function WorkspaceInviteNotificationRenderer(props) {
  const { notification } = props;
  const joinWorkspace2 = useJoinWorkspace();
  const deleteInvite2 = useDeleteInvite();
  const dialogContextValue = useDialogContext();
  return /* @__PURE__ */ jsx(
    NotificationListItem,
    {
      ...props,
      onActionButtonClick: (e, { action }) => {
        const data = notification.data;
        if (action === "join") {
          joinWorkspace2.mutate({
            inviteId: data.inviteId
          });
        }
        if (action === "decline") {
          deleteInvite2.mutate({
            inviteId: data.inviteId
          });
        }
        dialogContextValue == null ? void 0 : dialogContextValue.close();
      }
    }
  );
}
const workspaceInviteNotif = "Common\\Workspaces\\Notifications\\WorkspaceInvitation";
const BaseSiteConfig = {
  auth: {
    redirectUri: "/",
    adminRedirectUri: "/admin"
  },
  tags: {
    types: [{ name: "custom" }]
  },
  customPages: {
    types: [{ type: "default", label: message("Default") }]
  },
  notifications: {
    renderMap: {
      [workspaceInviteNotif]: WorkspaceInviteNotificationRenderer
    }
  },
  admin: {
    ads: []
  },
  demo: {
    loginPageDefaults: "singleAccount"
  },
  homepage: {
    options: [
      { label: message("Login page"), value: "loginPage" },
      { label: message("Registration page"), value: "registerPage" }
    ]
  }
};
function setThemeValue(key, value) {
  themeEl == null ? void 0 : themeEl.style.setProperty(key, value);
}
function removeThemeValue(key) {
  themeEl == null ? void 0 : themeEl.style.removeProperty(key);
}
function applyThemeToDom(theme) {
  Object.entries(theme.values).forEach(([key, value]) => {
    setThemeValue(key, value);
  });
  if (theme.is_dark) {
    themeEl.classList.add("dark");
  } else {
    themeEl.classList.remove("dark");
  }
}
const ThemeSelectorContext = createContext(
  null
);
function useThemeSelector() {
  return useContext(ThemeSelectorContext);
}
const STORAGE_KEY = "be-active-theme";
function ThemeProvider({ children }) {
  const { themes } = useSettings();
  const canChangeTheme = themes == null ? void 0 : themes.user_change;
  const data = useBootstrapDataStore((s) => s.data);
  const allThemes = useMemo(() => data.themes.all || [], [data.themes.all]);
  const initialThemeId = data.themes.selectedThemeId || void 0;
  const [selectedThemeId, setSelectedThemeId] = useCookie(
    STORAGE_KEY,
    `${initialThemeId}`
  );
  let selectedTheme = canChangeTheme ? allThemes.find((t) => t.id == selectedThemeId) : allThemes.find((t) => t.id == (themes == null ? void 0 : themes.default_id));
  if (!selectedTheme) {
    selectedTheme = allThemes[0];
  }
  const contextValue = useMemo(() => {
    return {
      allThemes,
      selectedTheme,
      selectTheme: (id) => {
        if (!canChangeTheme)
          return;
        const theme = findTheme(allThemes, id);
        if (theme) {
          setSelectedThemeId(`${theme.id}`);
          applyThemeToDom(theme);
        }
      }
    };
  }, [allThemes, selectedTheme, setSelectedThemeId, canChangeTheme]);
  return /* @__PURE__ */ jsx(ThemeSelectorContext.Provider, { value: contextValue, children });
}
function findTheme(themes, id) {
  return themes.find((t) => {
    if (id === "light") {
      return t.default_light === true;
    }
    if (id === "dark") {
      return t.default_dark === true;
    }
    return t.id === id;
  });
}
const mergedConfig = deepMerge(BaseSiteConfig, SiteConfig);
function CommonProvider({ children }) {
  return /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(SiteConfigContext.Provider, { value: mergedConfig, children: /* @__PURE__ */ jsx(ThemeProvider, { children }) }) }) }) });
}
function useAppearanceEditorMode() {
  return {
    isAppearanceEditorActive: !isSsr()
  };
}
function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    return getFromLocalStorage(key, initialValue);
  });
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setInLocalStorage(key, valueToStore);
  };
  useEffect(() => {
    const handleStorageChange = (event) => {
      var _a;
      if (((_a = event.detail) == null ? void 0 : _a.key) === key) {
        setStoredValue(event.detail.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);
  return [storedValue, setValue];
}
function getFromLocalStorage(key, initialValue = null) {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item != null ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
}
function setInLocalStorage(key, value) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(
        new CustomEvent("storage", {
          detail: { key, newValue: value }
        })
      );
    }
  } catch (error) {
  }
}
function removeFromLocalStorage(key) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
  }
}
function useAuth() {
  var _a;
  const { user, guest_role } = useBootstrapDataStore((s) => s.data);
  const {
    auth: { redirectUri = "/" }
  } = useContext(SiteConfigContext);
  const getPermission = useCallback(
    (name) => {
      const permissions = (user == null ? void 0 : user.permissions) || (guest_role == null ? void 0 : guest_role.permissions);
      if (!permissions)
        return;
      return permissions.find((p) => p.name === name);
    },
    [user == null ? void 0 : user.permissions, guest_role == null ? void 0 : guest_role.permissions]
  );
  const getRestrictionValue = useCallback(
    (permissionName, restrictionName) => {
      const permission = getPermission(permissionName);
      let restrictionValue = null;
      if (permission) {
        const restriction = permission.restrictions.find(
          (r) => r.name === restrictionName
        );
        restrictionValue = restriction ? restriction.value : void 0;
      }
      return restrictionValue;
    },
    [getPermission]
  );
  const hasPermission = useCallback(
    (name) => {
      const permissions = (user == null ? void 0 : user.permissions) || (guest_role == null ? void 0 : guest_role.permissions);
      const isAdmin = (permissions == null ? void 0 : permissions.find((p) => p.name === "admin")) != null;
      return isAdmin || getPermission(name) != null;
    },
    [user == null ? void 0 : user.permissions, guest_role == null ? void 0 : guest_role.permissions, getPermission]
  );
  const checkOverQuotaOrNoPermission = useCallback(
    (permission, restrictionName, currentCount) => {
      const noPermission = !hasPermission(permission);
      const maxCount = getRestrictionValue(permission, restrictionName);
      const overQuota = maxCount != null && currentCount >= maxCount;
      return {
        overQuota: maxCount != null && currentCount >= maxCount,
        noPermission,
        overQuotaOrNoPermission: overQuota || noPermission
      };
    },
    [getRestrictionValue, hasPermission]
  );
  const isSubscribed = ((_a = user == null ? void 0 : user.subscriptions) == null ? void 0 : _a.find((sub) => sub.valid)) != null;
  const getRedirectUri = useCallback(() => {
    const onboarding = getFromLocalStorage("be.onboarding.selected");
    if (onboarding) {
      return `/checkout/${onboarding.productId}/${onboarding.priceId}`;
    }
    return redirectUri;
  }, [redirectUri]);
  const hasRole = useCallback(
    (roleId) => {
      var _a2;
      return ((_a2 = user == null ? void 0 : user.roles) == null ? void 0 : _a2.find((role) => role.id === roleId)) != null;
    },
    [user]
  );
  return {
    user,
    hasPermission,
    getPermission,
    getRestrictionValue,
    checkOverQuotaOrNoPermission,
    isLoggedIn: !!user,
    isSubscribed,
    hasRole,
    // where to redirect user after successful login
    getRedirectUri
  };
}
function MixedText({ value }) {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    return /* @__PURE__ */ jsx(Trans, { message: value });
  }
  return /* @__PURE__ */ jsx(Trans, { ...value });
}
const ErrorOutlineIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }),
  "ErrorOutlineOutlined"
);
const CheckCircleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" }),
  "CheckCircleOutlined"
);
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function useNumberFormatter(options = {}) {
  const { localeCode } = useSelectedLocale();
  return useMemo(
    () => new NumberFormatter(localeCode, options),
    [localeCode, options]
  );
}
const ProgressCircle = React.forwardRef((props, ref) => {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    size: size2 = "md",
    isIndeterminate = false,
    className,
    position = "relative",
    trackColor,
    fillColor = "border-primary",
    ...domProps
  } = props;
  value = clamp(value, minValue, maxValue);
  const circleSize = getCircleStyle(size2);
  const percentage = (value - minValue) / (maxValue - minValue);
  const formatter = useNumberFormatter({ style: "percent" });
  let valueLabel = "";
  if (!isIndeterminate && !valueLabel) {
    valueLabel = formatter.format(percentage);
  }
  const subMask1Style = {};
  const subMask2Style = {};
  if (!isIndeterminate) {
    const percentage2 = (value - minValue) / (maxValue - minValue) * 100;
    let angle;
    if (percentage2 > 0 && percentage2 <= 50) {
      angle = -180 + percentage2 / 50 * 180;
      subMask1Style.transform = `rotate(${angle}deg)`;
      subMask2Style.transform = "rotate(-180deg)";
    } else if (percentage2 > 50) {
      angle = -180 + (percentage2 - 50) / 50 * 180;
      subMask1Style.transform = "rotate(0deg)";
      subMask2Style.transform = `rotate(${angle}deg)`;
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...domProps,
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? void 0 : valueLabel,
      role: "progressbar",
      ref,
      className: clsx(
        "progress-circle",
        position,
        circleSize,
        isIndeterminate && "indeterminate",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: clsx(circleSize, trackColor, "rounded-full border-4") }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "fills absolute left-0 top-0 h-full w-full",
              isIndeterminate && "progress-circle-fills-animate"
            ),
            children: [
              /* @__PURE__ */ jsx(
                FillMask,
                {
                  circleSize,
                  subMaskStyle: subMask1Style,
                  isIndeterminate,
                  className: "rotate-180",
                  fillColor,
                  subMaskClassName: clsx(
                    isIndeterminate && "progress-circle-fill-submask-1-animate"
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FillMask,
                {
                  circleSize,
                  subMaskStyle: subMask2Style,
                  isIndeterminate,
                  fillColor,
                  subMaskClassName: clsx(
                    isIndeterminate && "progress-circle-fill-submask-2-animate"
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
});
function FillMask({
  subMaskStyle,
  subMaskClassName,
  className,
  circleSize,
  isIndeterminate,
  fillColor
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute h-full w-1/2 origin-[100%] overflow-hidden",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "h-full w-full origin-[100%] rotate-180 overflow-hidden",
            !isIndeterminate && "transition-transform duration-100",
            subMaskClassName
          ),
          style: subMaskStyle,
          children: /* @__PURE__ */ jsx("div", { className: clsx(circleSize, fillColor, "rounded-full border-4") })
        }
      )
    }
  );
}
function getCircleStyle(size2) {
  switch (size2) {
    case "xs":
      return "w-20 h-20";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-42 h-42";
    default:
      return size2;
  }
}
const initial = { opacity: 0, y: 50, scale: 0.3 };
const animate = { opacity: 1, y: 0, scale: 1 };
const exit = {
  opacity: 0,
  scale: 0.5
};
function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none relative", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: toasts.map((toast2) => /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "fixed z-toast mx-auto p-20",
        toast2.position === "bottom-center" ? "bottom-0 left-0 right-0" : "bottom-0 right-0"
      ),
      children: /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: toast2.disableEnterAnimation ? void 0 : initial,
          animate: toast2.disableEnterAnimation ? void 0 : animate,
          exit: toast2.disableExitAnimation ? void 0 : exit,
          className: clsx(
            "pointer-events-auto mx-auto flex max-h-100 min-h-50 w-min min-w-288 max-w-500 items-center gap-10 rounded-lg border bg-paper bg-paper py-6 pl-16 pr-6 text-sm text-main shadow-lg"
          ),
          onPointerEnter: () => {
            var _a;
            return (_a = toast2.timer) == null ? void 0 : _a.pause();
          },
          onPointerLeave: () => {
            var _a;
            return (_a = toast2.timer) == null ? void 0 : _a.resume();
          },
          role: "alert",
          "aria-live": toast2.type === "danger" ? "assertive" : "polite",
          children: [
            toast2.type === "danger" && /* @__PURE__ */ jsx(
              ErrorOutlineIcon,
              {
                className: "flex-shrink-0 text-danger",
                size: "md"
              }
            ),
            toast2.type === "loading" && /* @__PURE__ */ jsx(
              ProgressCircle,
              {
                size: "sm",
                className: "flex-shrink-0",
                isIndeterminate: true
              }
            ),
            toast2.type === "positive" && /* @__PURE__ */ jsx(
              CheckCircleIcon,
              {
                className: "flex-shrink-0 text-positive",
                size: "md"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "mr-auto w-max overflow-hidden overflow-ellipsis",
                "data-testid": "toast-message",
                children: /* @__PURE__ */ jsx(MixedText, { value: toast2.message })
              }
            ),
            toast2.action && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "text",
                color: "primary",
                size: "sm",
                className: "flex-shrink-0",
                onFocus: () => {
                  var _a;
                  return (_a = toast2.timer) == null ? void 0 : _a.pause();
                },
                onBlur: () => {
                  var _a;
                  return (_a = toast2.timer) == null ? void 0 : _a.resume();
                },
                onClick: () => toastState().remove(toast2.id),
                elementType: Link,
                to: toast2.action.action,
                children: /* @__PURE__ */ jsx(MixedText, { value: toast2.action.label })
              }
            ),
            toast2.type !== "loading" && /* @__PURE__ */ jsx(
              IconButton,
              {
                onFocus: () => {
                  var _a;
                  return (_a = toast2.timer) == null ? void 0 : _a.pause();
                },
                onBlur: () => {
                  var _a;
                  return (_a = toast2.timer) == null ? void 0 : _a.resume();
                },
                type: "button",
                className: "flex-shrink-0",
                onClick: () => {
                  toastState().remove(toast2.id);
                },
                size: "sm",
                children: /* @__PURE__ */ jsx(CloseIcon, {})
              }
            )
          ]
        }
      )
    },
    toast2.id
  )) }) });
}
const queryKey = (id, params) => {
  const key = ["users", `${id}`];
  if (params) {
    key.push(params);
  }
  return key;
};
function useUser(id, params) {
  return useQuery({
    queryKey: queryKey(id, params),
    queryFn: () => fetchUser(id, params)
  });
}
function fetchUser(id, params) {
  return apiClient.get(`users/${id}`, { params }).then((response) => response.data);
}
function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (payload) => resendEmail(payload),
    onSuccess: () => {
      toast(message("Email sent"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function resendEmail(payload) {
  return apiClient.post("resend-email-verification", payload).then((response) => response.data);
}
function useIsDarkMode() {
  const { selectedTheme } = useThemeSelector();
  return selectedTheme.is_dark ?? false;
}
const appearanceMessage = "Can't logout while in appearance editor.";
function useLogout() {
  const navigate = useNavigate();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  return useMutation({
    mutationFn: () => isAppearanceEditorActive ? noopLogout() : logout(),
    onSuccess: (response) => {
      setBootstrapData(response.bootstrapData);
      queryClient.clear();
      navigate("/login");
      queryClient.clear();
      setBootstrapData(response.bootstrapData);
    },
    onError: (err) => showHttpErrorToast(
      err,
      isAppearanceEditorActive ? message(appearanceMessage) : void 0
    )
  });
}
function logout() {
  return apiClient.post("auth/logout").then((r) => r.data);
}
function noopLogout() {
  return Promise.reject(appearanceMessage);
}
function Form({
  children,
  onBeforeSubmit,
  onSubmit,
  form,
  className,
  id,
  onBlur
}) {
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
    "form",
    {
      id,
      onBlur,
      className,
      onSubmit: (e) => {
        e.stopPropagation();
        onBeforeSubmit == null ? void 0 : onBeforeSubmit();
        form.handleSubmit(onSubmit)(e);
      },
      children
    }
  ) });
}
function getInputFieldClassNames(props = {}) {
  const {
    size: size2 = "md",
    startAppend,
    endAppend,
    className,
    labelPosition,
    labelDisplay = "block",
    inputClassName,
    inputWrapperClassName,
    unstyled,
    invalid,
    disabled,
    background = "bg-transparent",
    flexibleHeight,
    inputShadow = "shadow-sm",
    descriptionPosition = "bottom",
    inputRing,
    inputFontSize,
    labelSuffix
  } = { ...props };
  if (unstyled) {
    return {
      label: "",
      input: inputClassName || "",
      wrapper: className || "",
      inputWrapper: inputWrapperClassName || "",
      adornment: "",
      append: { size: "", radius: "" },
      size: { font: "", height: "" },
      description: "",
      error: ""
    };
  }
  const sizeClass = inputSizeClass({
    size: props.size,
    flexibleHeight
  });
  if (inputFontSize) {
    sizeClass.font = inputFontSize;
  }
  const isInputGroup = startAppend || endAppend;
  const ringColor = invalid ? "focus:ring-danger/focus focus:border-danger/60" : "focus:ring-primary/focus focus:border-primary/60";
  const ringClassName = inputRing || `focus:ring ${ringColor}`;
  const radius = getRadius(props);
  return {
    label: clsx(
      labelDisplay,
      "first-letter:capitalize text-left whitespace-nowrap",
      disabled && "text-disabled",
      sizeClass.font,
      labelSuffix ? "" : labelPosition === "side" ? "mr-16" : "mb-4"
    ),
    input: clsx(
      "block text-left relative w-full appearance-none transition-shadow text",
      background,
      // radius
      radius.input,
      getInputBorder(props),
      !disabled && `${ringClassName} focus:outline-none ${inputShadow}`,
      disabled && "text-disabled cursor-not-allowed",
      inputClassName,
      sizeClass.font,
      sizeClass.height,
      getInputPadding(props)
    ),
    adornment: iconSizeClass(size2),
    append: {
      size: getButtonSizeStyle(size2),
      radius: radius.append
    },
    wrapper: clsx(className, sizeClass.font, {
      "flex items-center": labelPosition === "side"
    }),
    inputWrapper: clsx(
      "isolate relative",
      inputWrapperClassName,
      isInputGroup && "flex items-stretch"
    ),
    size: sizeClass,
    description: `text-muted ${descriptionPosition === "bottom" ? "pt-10" : "pb-10"} text-xs`,
    error: "text-danger pt-10 text-xs"
  };
}
function getInputBorder({
  startAppend,
  endAppend,
  inputBorder,
  invalid
}) {
  if (inputBorder)
    return inputBorder;
  const isInputGroup = startAppend || endAppend;
  const borderColor = invalid ? "border-danger" : "border-divider";
  if (!isInputGroup) {
    return `${borderColor} border`;
  }
  if (startAppend) {
    return `${borderColor} border-y border-r`;
  }
  return `${borderColor} border-y border-l`;
}
function getInputPadding({
  startAdornment,
  endAdornment,
  inputRadius
}) {
  if (inputRadius === "rounded-full") {
    return clsx(
      startAdornment ? "pl-54" : "pl-28",
      endAdornment ? "pr-54" : "pr-28"
    );
  }
  return clsx(
    startAdornment ? "pl-46" : "pl-12",
    endAdornment ? "pr-46" : "pr-12"
  );
}
function getRadius(props) {
  const { startAppend, endAppend, inputRadius } = props;
  const isInputGroup = startAppend || endAppend;
  if (inputRadius === "rounded-full") {
    return {
      input: clsx(
        !isInputGroup && "rounded-full",
        startAppend && "rounded-r-full rounded-l-none",
        endAppend && "rounded-l-full rounded-r-none"
      ),
      append: startAppend ? "rounded-l-full" : "rounded-r-full"
    };
  } else if (inputRadius === "rounded-none") {
    return {
      input: "",
      append: ""
    };
  } else if (inputRadius) {
    return {
      input: inputRadius,
      append: inputRadius
    };
  }
  return {
    input: clsx(
      !isInputGroup && "rounded-input",
      startAppend && "rounded-r-input rounded-l-none",
      endAppend && "rounded-l-input rounded-r-none"
    ),
    append: startAppend ? "rounded-l-input" : "rounded-r-input"
  };
}
function inputSizeClass({ size: size2, flexibleHeight }) {
  switch (size2) {
    case "2xs":
      return { font: "text-xs", height: flexibleHeight ? "min-h-24" : "h-24" };
    case "xs":
      return { font: "text-xs", height: flexibleHeight ? "min-h-30" : "h-30" };
    case "sm":
      return { font: "text-sm", height: flexibleHeight ? "min-h-36" : "h-36" };
    case "lg":
      return {
        font: "text-md md:text-lg",
        height: flexibleHeight ? "min-h-50" : "h-50"
      };
    case "xl":
      return { font: "text-xl", height: flexibleHeight ? "min-h-60" : "h-60" };
    default:
      return { font: "text-sm", height: flexibleHeight ? "min-h-42" : "h-42" };
  }
}
function iconSizeClass(size2) {
  switch (size2) {
    case "2xs":
      return "icon-2xs";
    case "xs":
      return "icon-xs";
    case "sm":
      return "icon-sm";
    case "md":
      return "icon-sm";
    case "lg":
      return "icon-lg";
    case "xl":
      return "icon-xl";
    default:
      return "";
  }
}
function Adornment({
  children,
  direction,
  className,
  position = direction === "start" ? "left-0" : "right-0"
}) {
  if (!children)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "pointer-events-none absolute top-0 z-10 flex h-full min-w-42 items-center justify-center text-muted",
        position,
        className
      ),
      children
    }
  );
}
function removeEmptyValuesFromObject(obj, options) {
  const shouldCopy = (options == null ? void 0 : options.copy) ?? true;
  const newObj = shouldCopy ? { ...obj } : obj;
  Object.keys(newObj).forEach((_key) => {
    const key = _key;
    if ((options == null ? void 0 : options.arrays) && Array.isArray(newObj[key]) && newObj[key].length === 0) {
      delete newObj[key];
    } else if ((options == null ? void 0 : options.deep) && newObj[key] && typeof newObj[key] === "object") {
      newObj[key] = removeEmptyValuesFromObject(newObj[key], options);
      if (Object.keys(newObj[key]).length === 0) {
        delete newObj[key];
      }
    } else if (newObj[key] == null || newObj[key] === "") {
      delete newObj[key];
    }
  });
  return shouldCopy ? newObj : obj;
}
const Field = React.forwardRef(
  (props, ref) => {
    const {
      children,
      // Not every component that uses <Field> supports help text.
      description,
      errorMessage,
      descriptionProps = {},
      errorMessageProps = {},
      startAdornment,
      endAdornment,
      adornmentPosition,
      startAppend,
      endAppend,
      fieldClassNames,
      disabled,
      wrapperProps
    } = props;
    return /* @__PURE__ */ jsxs("div", { className: fieldClassNames.wrapper, ref, ...wrapperProps, children: [
      /* @__PURE__ */ jsx(Label, { ...props }),
      /* @__PURE__ */ jsxs("div", { className: fieldClassNames.inputWrapper, children: [
        /* @__PURE__ */ jsx(
          Adornment,
          {
            direction: "start",
            className: fieldClassNames.adornment,
            position: adornmentPosition,
            children: startAdornment
          }
        ),
        startAppend && /* @__PURE__ */ jsx(Append, { style: fieldClassNames.append, disabled, children: startAppend }),
        children,
        endAppend && /* @__PURE__ */ jsx(Append, { style: fieldClassNames.append, disabled, children: endAppend }),
        /* @__PURE__ */ jsx(
          Adornment,
          {
            direction: "end",
            className: fieldClassNames.adornment,
            position: adornmentPosition,
            children: endAdornment
          }
        )
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, ...descriptionProps, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, ...errorMessageProps, children: errorMessage })
    ] });
  }
);
function Label({
  labelElementType,
  fieldClassNames,
  labelProps,
  label,
  labelSuffix,
  labelSuffixPosition = "spaced",
  required
}) {
  if (!label) {
    return null;
  }
  const ElementType = labelElementType || "label";
  const labelNode = /* @__PURE__ */ jsxs(ElementType, { className: fieldClassNames.label, ...labelProps, children: [
    label,
    required && /* @__PURE__ */ jsx("span", { className: "text-danger", children: " *" })
  ] });
  if (labelSuffix) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "mb-4 flex w-full gap-4",
          labelSuffixPosition === "spaced" ? "items-end" : "items-center"
        ),
        children: [
          labelNode,
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "text-xs text-muted",
                labelSuffixPosition === "spaced" ? "ml-auto" : ""
              ),
              children: labelSuffix
            }
          )
        ]
      }
    );
  }
  return labelNode;
}
function Append({ children, style, disabled }) {
  return React.cloneElement(children, {
    ...children.props,
    disabled: children.props.disabled || disabled,
    // make sure append styles are not overwritten with empty values
    ...removeEmptyValuesFromObject(style)
  });
}
function useAutoFocus({ autoFocus, autoSelectText }, ref) {
  const autoFocusRef = useRef(autoFocus);
  useEffect(() => {
    if (autoFocusRef.current && ref.current) {
      requestAnimationFrame(() => {
        var _a, _b;
        (_a = ref.current) == null ? void 0 : _a.focus();
        if (autoSelectText && ((_b = ref.current) == null ? void 0 : _b.nodeName.toLowerCase()) === "input") {
          ref.current.select();
        }
      });
    }
    autoFocusRef.current = false;
  }, [ref, autoSelectText]);
}
function useField(props) {
  const {
    focusRef,
    labelElementType = "label",
    label,
    labelSuffix,
    labelSuffixPosition,
    autoFocus,
    autoSelectText,
    labelPosition,
    descriptionPosition,
    size: size2,
    errorMessage,
    description,
    flexibleHeight,
    startAdornment,
    endAdornment,
    startAppend,
    adornmentPosition,
    endAppend,
    className,
    inputClassName,
    inputWrapperClassName,
    unstyled,
    background,
    invalid,
    disabled,
    id,
    inputRadius,
    inputBorder,
    inputShadow,
    inputRing,
    inputFontSize,
    ...inputDomProps
  } = props;
  useAutoFocus(props, focusRef);
  const defaultId = useId();
  const inputId = id || defaultId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const labelProps = {
    id: labelId,
    htmlFor: labelElementType === "label" ? inputId : void 0
  };
  const descriptionProps = {
    id: descriptionId
  };
  const errorMessageProps = {
    id: errorId
  };
  const ariaLabel = !props.label && !props["aria-label"] && props.placeholder ? props.placeholder : props["aria-label"];
  const inputProps = {
    "aria-label": ariaLabel,
    "aria-invalid": invalid || void 0,
    id: inputId,
    disabled,
    ...inputDomProps
  };
  const labelledBy = [];
  if (label) {
    labelledBy.push(labelProps.id);
  }
  if (inputProps["aria-labelledby"]) {
    labelledBy.push(inputProps["aria-labelledby"]);
  }
  inputProps["aria-labelledby"] = labelledBy.length ? labelledBy.join(" ") : void 0;
  const describedBy = [];
  if (description) {
    describedBy.push(descriptionProps.id);
  }
  if (errorMessage) {
    describedBy.push(errorMessageProps.id);
  }
  if (inputProps["aria-describedby"]) {
    describedBy.push(inputProps["aria-describedby"]);
  }
  inputProps["aria-describedby"] = describedBy.length ? describedBy.join(" ") : void 0;
  return {
    fieldProps: {
      errorMessageProps,
      descriptionProps,
      labelProps,
      disabled,
      label,
      labelSuffix,
      labelSuffixPosition,
      autoFocus,
      autoSelectText,
      labelPosition,
      descriptionPosition,
      size: size2,
      errorMessage,
      description,
      flexibleHeight,
      startAdornment,
      endAdornment,
      startAppend,
      adornmentPosition,
      endAppend,
      className,
      inputClassName,
      inputWrapperClassName,
      unstyled,
      background,
      invalid
    },
    inputProps
  };
}
const TextField = forwardRef(
  ({
    inputElementType = "input",
    flexibleHeight,
    inputRef,
    inputTestId,
    ...props
  }, ref) => {
    const inputObjRef = useObjectRef(inputRef);
    const { fieldProps, inputProps } = useField({
      ...props,
      focusRef: inputObjRef
    });
    const isTextArea = inputElementType === "textarea";
    const ElementType = isTextArea ? "textarea" : "input";
    const inputFieldClassNames = getInputFieldClassNames({
      ...props,
      flexibleHeight: flexibleHeight || inputElementType === "textarea"
    });
    if (inputElementType === "textarea" && !props.unstyled) {
      inputFieldClassNames.input = `${inputFieldClassNames.input} py-12`;
    }
    return /* @__PURE__ */ jsx(Field, { ref, fieldClassNames: inputFieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsx(
      ElementType,
      {
        "data-testid": inputTestId,
        ref: inputObjRef,
        ...inputProps,
        rows: isTextArea ? inputProps.rows || 4 : void 0,
        className: inputFieldClassNames.input
      }
    ) });
  }
);
const FormTextField = React.forwardRef(({ name, ...props }, ref) => {
  const {
    field: { onChange, onBlur, value = "", ref: inputRef },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const formProps = {
    onChange,
    onBlur,
    // avoid `value` prop on `input` should not be null error when setting form defaults from backend model
    value: value == null ? "" : value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef,
    name
  };
  return /* @__PURE__ */ jsx(TextField, { ref, ...mergeProps(formProps, props) });
});
const KeyboardArrowLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }),
  "KeyboardArrowLeftOutlined"
);
function onFormQueryError(r, form) {
  if (form && axios.isAxiosError(r) && r.response) {
    const response = r.response.data;
    if (!response.errors) {
      showHttpErrorToast(r);
    } else {
      Object.entries(response.errors || {}).forEach(([key, errors], index) => {
        if (typeof errors === "string") {
          form.setError(key, { message: errors }, { shouldFocus: index === 0 });
        } else {
          errors.forEach((message2, subIndex) => {
            form.setError(
              key,
              { message: message2 },
              { shouldFocus: index === 0 && subIndex === 0 }
            );
          });
        }
      });
    }
  }
}
function useValidateEmailVerificationOtp(form) {
  return useMutation({
    mutationFn: (payload) => validate(payload),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function validate(payload) {
  return apiClient.post("validate-email-verification-otp", payload).then((response) => response.data);
}
function EmailVerificationPage() {
  const { trans } = useTrans();
  const { data } = useUser("me");
  const resendEmail2 = useResendVerificationEmail();
  const {
    branding: { logo_light, logo_dark }
  } = useSettings();
  const isDarkMode = useIsDarkMode();
  const logoSrc = isDarkMode ? logo_light : logo_dark;
  const logout2 = useLogout();
  const form = useForm();
  const validateOtp = useValidateEmailVerificationOtp(form);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-screen bg-alt p-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-40 max-w-440", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        onClick: () => logout2.mutate(),
        startIcon: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {}),
        size: "xs",
        className: "mb-54 mr-auto",
        children: /* @__PURE__ */ jsx(Trans, { message: "Logout" })
      }
    ),
    logoSrc && /* @__PURE__ */ jsx(
      "img",
      {
        src: logoSrc,
        alt: "Site logo",
        className: "mx-auto mb-44 block h-42 w-auto"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Verify your email" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Enter the verification code we sent to :email",
          values: { email: maskEmailAddress(data == null ? void 0 : data.user.email) }
        }
      ) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          onSubmit: (values) => validateOtp.mutate(values),
          className: "my-16",
          children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "code",
                label: /* @__PURE__ */ jsx(Trans, { message: "Code" }),
                placeholder: trans(message("Enter your verification code")),
                autoFocus: true,
                autoComplete: "one-time-code",
                autoCorrect: "off",
                autoCapitalize: "off",
                maxLength: 6,
                inputMode: "numeric",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "flat",
                color: "primary",
                size: "md",
                className: "mt-24 w-full",
                disabled: validateOtp.isPending,
                children: /* @__PURE__ */ jsx(Trans, { message: "Next" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mb-24 text-sm", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "If you don't see the email in your inbox, check your spam folder and promotions tab. If you still don't see it, <a>request a resend</a>.",
          values: {
            a: (text2) => /* @__PURE__ */ jsx(
              Button,
              {
                variant: "link",
                color: "primary",
                disabled: resendEmail2.isPending || !(data == null ? void 0 : data.user.email),
                onClick: () => {
                  resendEmail2.mutate({ email: data.user.email });
                },
                children: text2
              }
            )
          }
        }
      ) })
    ] })
  ] }) });
}
function maskEmailAddress(email) {
  if (!email)
    return "*******************";
  const [username, domain] = email.split("@");
  return `${username.slice(0, 2)}****@${domain}`;
}
class LazyLoader {
  constructor() {
    __publicField(this, "loadedAssets", {});
  }
  loadAsset(url, params = { type: "js" }) {
    var _a;
    url = url.startsWith("//") ? `${window.location.protocol}${url}` : url;
    const currentState = (_a = this.loadedAssets[url]) == null ? void 0 : _a.state;
    if (currentState === "loaded" && !params.force) {
      return new Promise((resolve) => resolve());
    }
    const neverLoaded = !currentState || this.loadedAssets[url].doc !== params.document;
    if (neverLoaded || params.force && currentState === "loaded") {
      this.loadedAssets[url] = {
        state: new Promise((resolve) => {
          const finalUrl = isAbsoluteUrl(url) ? url : `assets/${url}`;
          const finalId = buildId(url, params.id);
          const assetOptions = {
            url: finalUrl,
            id: finalId,
            resolve,
            parentEl: params.parentEl,
            document: params.document
          };
          if (params.type === "css") {
            this.loadStyleAsset(assetOptions);
          } else {
            this.loadScriptAsset(assetOptions);
          }
        }),
        doc: params.document
      };
      return this.loadedAssets[url].state;
    }
    return this.loadedAssets[url].state;
  }
  /**
   * Check whether asset is loading or has already loaded.
   */
  isLoadingOrLoaded(url) {
    return this.loadedAssets[url] != null;
  }
  loadStyleAsset(options) {
    var _a;
    const doc = options.document || document;
    const parentEl = options.parentEl || doc.head;
    const style = doc.createElement("link");
    const prefixedId = buildId(options.url, options.id);
    style.rel = "stylesheet";
    style.id = prefixedId;
    style.href = options.url;
    try {
      if (parentEl.querySelector(`#${prefixedId}`)) {
        (_a = parentEl.querySelector(`#${prefixedId}`)) == null ? void 0 : _a.remove();
      }
    } catch (e) {
    }
    style.onload = () => {
      this.loadedAssets[options.url].state = "loaded";
      options.resolve();
    };
    parentEl.appendChild(style);
  }
  loadScriptAsset(options) {
    var _a;
    const doc = options.document || document;
    const parentEl = options.parentEl || doc.body;
    const script = doc.createElement("script");
    const prefixedId = buildId(options.url, options.id);
    script.async = true;
    script.id = prefixedId;
    script.src = options.url;
    try {
      if (parentEl.querySelector(`#${prefixedId}`)) {
        (_a = parentEl.querySelector(`#${prefixedId}`)) == null ? void 0 : _a.remove();
      }
    } catch (e) {
    }
    script.onload = () => {
      this.loadedAssets[options.url].state = "loaded";
      options.resolve();
    };
    (parentEl || parentEl).appendChild(script);
  }
}
function buildId(url, id) {
  if (id)
    return id;
  return btoa(url.split("/").pop());
}
const lazyLoader = new LazyLoader();
function prefixId(id) {
  return `be-fonts-${id}`;
}
function loadFonts(fonts, options) {
  const doc = options.document || document;
  const googleFonts = [];
  const customFonts = [];
  let promises = [];
  fonts.forEach((font) => {
    if ("google" in font && font.google) {
      googleFonts.push(font);
    } else if ("src" in font) {
      customFonts.push(font);
    }
  });
  if (googleFonts == null ? void 0 : googleFonts.length) {
    const weights = options.weights || [400];
    const families = fonts.map((f) => `${f.family}:${weights.join(",")}`).join("|");
    const googlePromise = lazyLoader.loadAsset(
      `https://fonts.googleapis.com/css?family=${families}&display=swap`,
      {
        type: "css",
        id: prefixId(options.id),
        force: options.forceAssetLoad,
        document: doc
      }
    );
    promises.push(googlePromise);
  }
  if (customFonts == null ? void 0 : customFonts.length) {
    const customFontPromises = customFonts.map(async (fontConfig) => {
      const loadedFont = Array.from(doc.fonts.values()).find((current) => {
        return current.family === fontConfig.family;
      });
      if (loadedFont) {
        return loadedFont.loaded;
      }
      const fontFace = new FontFace(
        fontConfig.family,
        `url(${(options == null ? void 0 : options.prefixSrc) ? options.prefixSrc(fontConfig.src) : fontConfig.src})`,
        fontConfig.descriptors
      );
      doc.fonts.add(fontFace);
      return fontFace.load();
    });
    promises = promises.concat(customFontPromises);
  }
  return Promise.all(promises);
}
function AppearanceListener() {
  const navigate = useNavigate$1();
  const currentData = useBootstrapDataStore((s) => s.data);
  const handleCommand = useCallback(
    (command) => {
      switch (command.type) {
        case "navigate":
          return navigate(command.to);
        case "setValues":
          return mergeBootstrapData({
            themes: {
              ...currentData.themes,
              all: command.values.appearance.themes.all
            },
            settings: {
              ...currentData.settings,
              ...command.values.settings
            }
          });
        case "setThemeFont":
          if (command.value) {
            setThemeValue("--be-font-family", command.value.family);
            loadFonts([command.value], {
              id: "be-primary-font",
              forceAssetLoad: true
            });
          } else {
            removeThemeValue("--be-font-family");
          }
          return;
        case "setThemeValue":
          return setThemeValue(command.name, command.value);
        case "setActiveTheme":
          const theme = currentData.themes.all.find(
            (t) => t.id === command.themeId
          );
          if (theme) {
            applyThemeToDom(theme);
          }
          return;
        case "setCustomCode":
          return renderCustomCode(command.mode, command.value);
      }
    },
    [currentData, navigate]
  );
  useEffect(() => {
    const handleMessage = (e) => {
      if (isAppearanceEvent(e) && eventIsTrusted(e)) {
        handleCommand(e.data);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate, handleCommand]);
  return null;
}
function isAppearanceEvent(e) {
  var _a;
  return ((_a = e.data) == null ? void 0 : _a.source) === "be-appearance-editor";
}
function eventIsTrusted(e) {
  return new URL(e.origin).hostname === window.location.hostname;
}
function renderCustomCode(mode, value) {
  const parent = mode === "html" ? document.body : document.head;
  const nodeType = mode === "html" ? "div" : "style";
  let customNode = parent.querySelector("#be-custom-code");
  if (!value) {
    if (customNode) {
      customNode.remove();
    }
  } else {
    if (!customNode) {
      customNode = document.createElement(nodeType);
      customNode.id = "be-custom-code";
      parent.appendChild(customNode);
    }
    customNode.innerHTML = value;
  }
}
function useCustomMenu(menuOrPosition) {
  const settings = useSettings();
  const { user, hasPermission } = useAuth();
  return useMemo(() => {
    var _a;
    if (!menuOrPosition) {
      return null;
    }
    const menu = typeof menuOrPosition === "string" ? (_a = settings.menus) == null ? void 0 : _a.find((s) => {
      var _a2;
      return (_a2 = s.positions) == null ? void 0 : _a2.includes(menuOrPosition);
    }) : menuOrPosition;
    const menuItems = [];
    if (menu) {
      for (const item of menu.items) {
        const hasRoles = (item.roles || []).every(
          (a) => user == null ? void 0 : user.roles.find((b) => b.id === a)
        );
        const hasPermissions = (item.permissions || []).every(
          (a) => hasPermission(a)
        );
        const hasSettings = !item.settings || Object.entries(item.settings).every(([key, value]) => {
          return dot.pick(key, settings) == value;
        });
        if (!item.action || !hasRoles || !hasPermissions || !hasSettings || !subscriptionStatusMatches(item, user)) {
          continue;
        }
        if (user == null ? void 0 : user.id) {
          item.action = item.action.replace(/{currentUser}/g, `${user.id}`);
        }
        menuItems.push(item);
      }
      menu.items = menuItems;
    }
    return menu;
  }, [hasPermission, settings, menuOrPosition, user]);
}
function subscriptionStatusMatches(item, user) {
  var _a;
  if (!item.subscriptionStatus) {
    return true;
  }
  const hasActiveSubscription = !!((_a = user == null ? void 0 : user.subscriptions) == null ? void 0 : _a.find((sub) => sub.active));
  if (item.subscriptionStatus === "subscribed") {
    return hasActiveSubscription;
  }
  return !hasActiveSubscription;
}
function CustomMenu({
  className,
  iconClassName,
  itemClassName: itemClassName2,
  gap = "gap-30",
  menu: menuOrPosition,
  orientation = "horizontal",
  children,
  matchDescendants,
  onlyShowIcons,
  iconSize,
  unstyled = false
}) {
  const menu = useCustomMenu(menuOrPosition);
  if (!menu)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex",
        gap,
        orientation === "vertical" ? "flex-col items-start" : "items-center",
        className
      ),
      "data-menu-id": menu.id,
      children: menu.items.map((item) => {
        if (children) {
          return children(item);
        }
        return /* @__PURE__ */ jsx(
          CustomMenuItem,
          {
            unstyled,
            onlyShowIcon: onlyShowIcons,
            matchDescendants,
            iconClassName,
            iconSize,
            className: (props) => {
              return typeof itemClassName2 === "function" ? itemClassName2({ ...props, item }) : itemClassName2;
            },
            item
          },
          item.id
        );
      })
    }
  );
}
const CustomMenuItem = forwardRef(
  ({
    item,
    className,
    matchDescendants,
    unstyled,
    onlyShowIcon,
    iconClassName,
    iconSize = "sm",
    ...linkProps
  }, ref) => {
    const label = /* @__PURE__ */ jsx(Trans, { message: item.label });
    const IconCmp = item.icon && createSvgIconFromTree(item.icon);
    let icon = IconCmp ? /* @__PURE__ */ jsx(IconCmp, { size: iconSize, className: iconClassName }) : null;
    if (icon && onlyShowIcon && label) {
      icon = /* @__PURE__ */ jsx(Tooltip, { label, placement: "right", children: icon });
    }
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      icon,
      (!icon || !onlyShowIcon) && label
    ] });
    const baseClassName = !unstyled && "whitespace-nowrap flex items-center justify-start gap-10";
    const focusClassNames = !unstyled && "outline-none focus-visible:ring-2";
    if (item.type === "link") {
      return /* @__PURE__ */ jsx(
        "a",
        {
          className: clsx(
            baseClassName,
            className == null ? void 0 : className({ isActive: false }),
            focusClassNames
          ),
          href: item.action,
          target: item.target,
          "data-menu-item-id": item.id,
          ref,
          ...linkProps,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx(
      NavLink,
      {
        end: typeof matchDescendants === "function" ? matchDescendants(item.action) : matchDescendants,
        className: (props) => clsx(baseClassName, className == null ? void 0 : className(props), focusClassNames),
        to: item.action,
        target: item.target,
        "data-menu-item-id": item.id,
        ref,
        ...linkProps,
        children: content
      }
    );
  }
);
function CookieNotice() {
  const { cookie_notice } = useSettings();
  const [, setCookie] = useCookie("cookie_notice");
  const [alreadyAccepted, setAlreadyAccepted] = useState(() => {
    return !getBootstrapData().show_cookie_notice;
  });
  if (!(cookie_notice == null ? void 0 : cookie_notice.enable) || alreadyAccepted) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "fixed z-50 flex w-full justify-center gap-14 bg-toast p-14 text-sm text-white shadow max-md:flex-col md:items-center md:gap-30",
        (cookie_notice == null ? void 0 : cookie_notice.position) == "top" ? "top-0" : "bottom-0"
      ),
      children: [
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "We use cookies to optimize site functionality and provide you with the\n      best possible experience."
          }
        ),
        /* @__PURE__ */ jsx(InfoLink, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            className: "max-w-100",
            onClick: () => {
              setCookie("true", { days: 30, path: "/" });
              setAlreadyAccepted(true);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "OK" })
          }
        )
      ]
    }
  );
}
function InfoLink() {
  var _a;
  const { cookie_notice } = useSettings();
  if (!((_a = cookie_notice == null ? void 0 : cookie_notice.button) == null ? void 0 : _a.label)) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    CustomMenuItem,
    {
      className: () => "text-primary-light hover:underline",
      item: cookie_notice == null ? void 0 : cookie_notice.button
    }
  );
}
const imgUrl1 = "/assets/404-1-176145e9.png";
const imgUrl2 = "/assets/404-2-14c4a897.png";
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse items-center justify-center gap-64 px-16 py-96 md:gap-112 md:px-176 md:py-80 lg:flex-row lg:px-96 lg:py-96", children: [
    /* @__PURE__ */ jsx("div", { className: "relative w-full pb-48 lg:pb-0 xl:w-1/2 xl:pt-96", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "my-8 text-2xl font-bold text-main", children: /* @__PURE__ */ jsx(Trans, { message: "Looks like you've found the doorway to the great nothing" }) }),
        /* @__PURE__ */ jsx("p", { className: "my-16 text-main", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Sorry about that! Please visit our homepage to get where you need\n                to go."
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "my-8",
            elementType: Link,
            size: "lg",
            to: "/",
            variant: "flat",
            color: "primary",
            children: /* @__PURE__ */ jsx(Trans, { message: "Take me there!" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "dark:opacity-5", children: /* @__PURE__ */ jsx("img", { src: imgUrl2, alt: "" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "dark:opacity-80", children: /* @__PURE__ */ jsx("img", { src: imgUrl1, alt: "" }) })
  ] });
}
function AuthRoute({ children, permission, requireLogin = true }) {
  const { isLoggedIn, hasPermission, isSubscribed } = useAuth();
  const { billing } = useSettings();
  if (requireLogin && !isLoggedIn || permission && !hasPermission(permission)) {
    if (isLoggedIn) {
      return billing.enable && !isSubscribed ? /* @__PURE__ */ jsx(Navigate, { to: "/pricing", replace: true }) : /* @__PURE__ */ jsx(NotFoundPage, {});
    }
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  return children || /* @__PURE__ */ jsx(Outlet, {});
}
function FullPageLoader({ className, screen }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center justify-center flex-auto",
        screen ? "h-screen w-screen" : "h-full w-full",
        className
      ),
      children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading page..." })
    }
  );
}
function useValueLists(names, params, options = {}) {
  return useQuery({
    queryKey: ["value-lists", names, params],
    queryFn: () => fetchValueLists(names, params),
    // if there are params, make sure we update lists when they change
    staleTime: !params ? Infinity : void 0,
    placeholderData: keepPreviousData,
    enabled: !options.disabled,
    initialData: () => {
      const previousData = queryClient.getQueriesData({ queryKey: ["ValueLists"] }).find(([, response]) => {
        if (response && names.every((n) => response[n])) {
          return response;
        }
        return null;
      });
      if (previousData) {
        return previousData[1];
      }
    }
  });
}
function fetchValueLists(names, params) {
  return apiClient.get(`value-lists/${names}`, { params }).then((response) => response.data);
}
const LanguageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" }),
  "LanguageOutlined"
);
function Section({ children, label, index }) {
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "group",
      className: clsx(index !== 0 && "border-t my-4"),
      "aria-labelledby": label ? `be-select-${id}` : void 0,
      children: [
        label && /* @__PURE__ */ jsx(
          "div",
          {
            className: "block uppercase text-muted text-xs px-16 py-10",
            role: "presentation",
            id: `be-select-${id}`,
            "aria-hidden": "true",
            children: label
          }
        ),
        children
      ]
    }
  );
}
const buildListboxCollection = memoize(
  ({ maxItems, children, items, inputValue }) => {
    let collection = childrenToCollection({ children, items });
    let filteredCollection = filterCollection({ collection, inputValue });
    if (maxItems) {
      collection = new Map([...collection.entries()].slice(0, maxItems));
      filteredCollection = new Map(
        [...filteredCollection.entries()].slice(0, maxItems)
      );
    }
    return { collection, filteredCollection };
  }
);
const filterCollection = memoize(
  ({ collection, inputValue }) => {
    let filteredCollection = /* @__PURE__ */ new Map();
    const query = inputValue ? `${inputValue}`.toLowerCase().trim() : "";
    if (!query) {
      filteredCollection = collection;
    } else {
      let filterIndex = 0;
      collection.forEach((meta, value) => {
        const haystack = meta.item ? JSON.stringify(meta.item) : meta.textLabel;
        if (haystack.toLowerCase().trim().includes(query)) {
          filteredCollection.set(value, { ...meta, index: filterIndex++ });
        }
      });
    }
    return filteredCollection;
  }
);
const childrenToCollection = memoize(
  ({ children, items }) => {
    let reactChildren;
    if (items && typeof children === "function") {
      reactChildren = items.map((item) => children(item));
    } else {
      reactChildren = children;
    }
    const collection = /* @__PURE__ */ new Map();
    let optionIndex = 0;
    const setOption = (element, section, sectionIndex, sectionItemIndex) => {
      const index = optionIndex++;
      const item = section ? (
        // get item from nested array
        items == null ? void 0 : items[sectionIndex].items[sectionItemIndex]
      ) : (
        // get item from flat array
        items == null ? void 0 : items[index]
      );
      collection.set(element.props.value, {
        index,
        element,
        textLabel: getTextLabel(element),
        item,
        section,
        isDisabled: element.props.isDisabled,
        value: element.props.value
      });
    };
    Children.forEach(reactChildren, (child, childIndex) => {
      if (!isValidElement(child))
        return;
      if (child.type === Section) {
        Children.forEach(
          child.props.children,
          (nestedChild, nestedChildIndex) => {
            setOption(nestedChild, child, childIndex, nestedChildIndex);
          }
        );
      } else {
        setOption(child);
      }
    });
    return collection;
  }
);
function getTextLabel(item) {
  var _a;
  const content = item.props.children;
  if (item.props.textLabel) {
    return item.props.textLabel;
  }
  if ((_a = content == null ? void 0 : content.props) == null ? void 0 : _a.message) {
    return content.props.message;
  }
  return `${content}` || "";
}
function useListbox(props, ref) {
  const {
    children,
    items,
    role = "listbox",
    virtualFocus,
    focusLoopingMode = "stay",
    autoFocusFirstItem = true,
    onItemSelected,
    clearInputOnItemSelection,
    blurReferenceOnItemSelection,
    floatingWidth = "matchTrigger",
    floatingMinWidth,
    floatingMaxHeight,
    offset: offset2,
    placement,
    showCheckmark,
    showEmptyMessage,
    maxItems,
    isAsync,
    allowCustomValue,
    clearSelectionOnInputClear
  } = props;
  const selectionMode = props.selectionMode || "none";
  const id = useId();
  const listboxId = `${id}-listbox`;
  const [inputValue, setInputValue] = useControlledState(
    props.inputValue,
    props.defaultInputValue || "",
    props.onInputValueChange
  );
  const [activeCollection, setActiveCollection] = useState(
    "all"
  );
  const collections = buildListboxCollection({
    children,
    items,
    // don't filter on client side if async, it will already be filtered on server
    inputValue: isAsync ? void 0 : inputValue,
    maxItems
  });
  const collection = activeCollection === "all" ? collections.collection : collections.filteredCollection;
  const listItemsRef = useRef([]);
  const listContent = useMemo(() => {
    return [...collection.values()].map(
      (o) => o.isDisabled ? null : o.textLabel
    );
  }, [collection]);
  const { selectedValues, selectValues } = useControlledSelection(props);
  const [isOpen, setIsOpen] = useControlledState(
    props.isOpen,
    props.defaultIsOpen,
    props.onOpenChange
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const floatingProps = useFloatingPosition({
    floatingWidth,
    ref,
    placement,
    offset: offset2,
    maxHeight: floatingMaxHeight ?? 420,
    // don't shift floating menu on the sides of combobox, otherwise input might get obscured
    shiftCrossAxis: !virtualFocus
  });
  const { refs, strategy, x, y } = floatingProps;
  const selectedOption = selectionMode === "none" ? void 0 : collection.get(selectedValues[0]);
  const selectedIndex = selectionMode === "none" ? void 0 : selectedOption == null ? void 0 : selectedOption.index;
  const setSelectedIndex = (index) => {
    if (selectionMode !== "none") {
      const item = [...collection.values()][index];
      if (item) {
        selectValues(item.value);
      }
    }
  };
  const focusItem = useCallback(
    (fallbackOperation, newIndex) => {
      var _a, _b;
      const items2 = [...collection.values()];
      const allItemsDisabled = !items2.find((i) => !i.isDisabled);
      const lastIndex = collection.size - 1;
      if (newIndex == null || !collection.size || newIndex > lastIndex || newIndex < 0 || allItemsDisabled) {
        setActiveIndex(null);
        return;
      }
      newIndex = getNonDisabledIndex(
        items2,
        newIndex,
        focusLoopingMode,
        fallbackOperation
      );
      setActiveIndex(newIndex);
      if (newIndex == null) {
        return;
      }
      if (virtualFocus) {
        (_a = listItemsRef.current[newIndex]) == null ? void 0 : _a.scrollIntoView({
          block: "nearest"
        });
      } else {
        (_b = listItemsRef.current[newIndex]) == null ? void 0 : _b.focus();
      }
    },
    [collection, virtualFocus, focusLoopingMode]
  );
  const onInputChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
      setActiveCollection(e.target.value.trim() ? "filtered" : "all");
      if (e.target.value) {
        setIsOpen(true);
      } else if (clearSelectionOnInputClear) {
        selectValues("");
      }
      if (autoFocusFirstItem && activeIndex == null) {
        focusItem("increment", 0);
      } else {
        setActiveIndex(null);
      }
    },
    [
      setInputValue,
      setIsOpen,
      setActiveCollection,
      selectValues,
      clearSelectionOnInputClear,
      focusItem,
      autoFocusFirstItem,
      activeIndex
    ]
  );
  const handleItemSelection = (value) => {
    const reference = refs.reference.current;
    if (selectionMode !== "none") {
      selectValues(value);
    } else {
      if (reference && "focus" in reference) {
        reference.focus();
      }
    }
    if (virtualFocus) {
      setInputValue(clearInputOnItemSelection ? "" : `${value}`);
      if (blurReferenceOnItemSelection && reference && "blur" in reference) {
        reference.blur();
      }
    }
    setActiveCollection("all");
    setIsOpen(false);
    onItemSelected == null ? void 0 : onItemSelected(value);
    setActiveIndex(null);
  };
  return {
    // even handlers
    handleItemSelection,
    onInputChange,
    focusLoopingMode,
    // config
    floatingWidth,
    floatingMinWidth,
    floatingMaxHeight,
    showCheckmark,
    collection,
    collections,
    virtualFocus,
    focusItem,
    showEmptyMessage: showEmptyMessage && !!inputValue,
    allowCustomValue,
    // floating ui
    refs,
    reference: floatingProps.reference,
    floating: refs.setFloating,
    positionStyle: {
      position: strategy,
      top: y ?? "",
      left: x ?? ""
    },
    listContent,
    listItemsRef,
    listboxId,
    role,
    state: {
      // currently focused or active (if virtual focus) option
      activeIndex,
      setActiveIndex,
      selectedIndex,
      setSelectedIndex,
      selectionMode,
      selectedValues,
      selectValues,
      inputValue,
      setInputValue,
      isOpen,
      setIsOpen,
      setActiveCollection
    }
  };
}
function getNonDisabledIndex(items, newIndex, focusLoopingMode, operation) {
  var _a;
  const lastIndex = items.length - 1;
  while ((_a = items[newIndex]) == null ? void 0 : _a.isDisabled) {
    if (operation === "increment") {
      newIndex++;
      if (newIndex >= lastIndex) {
        if (focusLoopingMode === "loop") {
          newIndex = 0;
        } else if (focusLoopingMode === "stay") {
          return newIndex - 1;
        } else {
          return null;
        }
      }
    } else {
      newIndex--;
      if (newIndex < 0) {
        if (focusLoopingMode === "loop") {
          newIndex = lastIndex;
        } else if (focusLoopingMode === "stay") {
          return newIndex + 1;
        } else {
          return null;
        }
      }
    }
  }
  return newIndex;
}
function useControlledSelection(props) {
  const { selectionMode, allowEmptySelection } = props;
  const selectionEnabled = selectionMode === "single" || selectionMode === "multiple";
  const [stateValues, setStateValues] = useControlledState(
    !selectionEnabled ? void 0 : props.selectedValue,
    !selectionEnabled ? void 0 : props.defaultSelectedValue,
    !selectionEnabled ? void 0 : props.onSelectionChange
  );
  const selectedValues = useMemo(() => {
    if (typeof stateValues === "undefined") {
      return [];
    }
    return Array.isArray(stateValues) ? stateValues : [stateValues];
  }, [stateValues]);
  const selectValues = useCallback(
    (mixedValue) => {
      const newValues = Array.isArray(mixedValue) ? mixedValue : [mixedValue];
      if (selectionMode === "single") {
        setStateValues(newValues[0]);
      } else {
        newValues.forEach((newValue) => {
          const index = selectedValues.indexOf(newValue);
          if (index === -1) {
            selectedValues.push(newValue);
            setStateValues([...selectedValues]);
          } else if (selectedValues.length > 1 || allowEmptySelection) {
            selectedValues.splice(index, 1);
            setStateValues([...selectedValues]);
          }
        });
      }
    },
    [allowEmptySelection, selectedValues, selectionMode, setStateValues]
  );
  return {
    selectedValues,
    selectValues
  };
}
const ListBoxContext = createContext(null);
function useListboxContext() {
  return useContext(ListBoxContext);
}
const CheckIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }),
  "CheckOutlined"
);
const ListItemBase = React.forwardRef(
  (props, ref) => {
    let {
      startIcon,
      capitalizeFirst,
      children,
      description,
      endIcon,
      endSection,
      isDisabled,
      isActive,
      isSelected,
      showCheckmark,
      elementType = "div",
      radius,
      padding,
      ...domProps
    } = props;
    if (!startIcon && showCheckmark) {
      startIcon = /* @__PURE__ */ jsx(
        CheckIcon,
        {
          size: "sm",
          className: clsx("text-primary", !isSelected && "invisible")
        }
      );
    }
    const iconClassName = clsx(
      "icon-sm rounded overflow-hidden flex-shrink-0",
      !isDisabled && "text-muted"
    );
    const endSectionClassName = clsx(!isDisabled && "text-muted");
    const Element = elementType;
    return /* @__PURE__ */ jsxs(
      Element,
      {
        ...domProps,
        "aria-disabled": isDisabled,
        className: itemClassName(props),
        ref,
        children: [
          startIcon && /* @__PURE__ */ jsx("div", { className: iconClassName, children: startIcon }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "min-w-auto mr-auto w-full overflow-hidden overflow-ellipsis",
                capitalizeFirst && "first-letter:capitalize"
              ),
              children: [
                children,
                description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "mt-4 whitespace-normal text-xs",
                      isDisabled ? "text-disabled" : "text-muted"
                    ),
                    children: description
                  }
                )
              ]
            }
          ),
          (endIcon || endSection) && /* @__PURE__ */ jsx("div", { className: endIcon ? iconClassName : endSectionClassName, children: endIcon || endSection })
        ]
      }
    );
  }
);
function itemClassName({
  className,
  isSelected,
  isActive,
  isDisabled,
  showCheckmark,
  endIcon,
  endSection,
  radius,
  padding: userPadding
}) {
  let state = "";
  if (isDisabled) {
    state = "text-disabled pointer-events-none";
  } else if (isSelected) {
    if (isActive) {
      state = "bg-primary/focus";
    } else {
      state = "bg-primary/selected hover:bg-primary/focus";
    }
  } else if (isActive) {
    state = "hover:bg-fg-base/15 bg-focus";
  } else {
    state = "hover:bg-hover";
  }
  let padding;
  if (userPadding) {
    padding = userPadding;
  } else if (showCheckmark) {
    if (endIcon || endSection) {
      padding = "pl-8 pr-8 py-8";
    } else {
      padding = "pl-8 pr-24 py-8";
    }
  } else {
    padding = "px-20 py-8";
  }
  return clsx(
    "w-full select-none outline-none cursor-pointer",
    "text-sm truncate flex items-center gap-10",
    !isDisabled && "text-main",
    padding,
    state,
    className,
    radius
  );
}
function Item$1({
  children,
  value,
  startIcon,
  endIcon,
  endSection,
  description,
  capitalizeFirst,
  textLabel,
  isDisabled,
  onSelected,
  onClick,
  ...domProps
}) {
  var _a;
  const {
    collection,
    showCheckmark,
    virtualFocus,
    listboxId,
    role,
    listItemsRef,
    handleItemSelection,
    state: { selectedValues, activeIndex, setActiveIndex }
  } = useListboxContext();
  const isSelected = selectedValues.includes(value);
  const index = (_a = collection.get(value)) == null ? void 0 : _a.index;
  const isActive = activeIndex === index;
  if (index == null) {
    return null;
  }
  const tabIndex = isActive && !isDisabled ? -1 : 0;
  return /* @__PURE__ */ jsx(
    ListItemBase,
    {
      ...domProps,
      onFocus: () => {
        if (!virtualFocus) {
          setActiveIndex(index);
        }
      },
      onPointerEnter: (e) => {
        setActiveIndex(index);
        if (!virtualFocus) {
          e.currentTarget.focus();
        }
      },
      onPointerDown: (e) => {
        if (virtualFocus) {
          e.preventDefault();
        }
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleItemSelection(value);
          onSelected == null ? void 0 : onSelected();
        }
      },
      onClick: (e) => {
        handleItemSelection(value);
        onSelected == null ? void 0 : onSelected();
        onClick == null ? void 0 : onClick(e);
      },
      ref: (node) => listItemsRef.current[index] = node,
      id: `${listboxId}-${index}`,
      role: role === "menu" ? "menuitem" : "option",
      tabIndex: virtualFocus ? void 0 : tabIndex,
      "aria-selected": isActive && isSelected,
      showCheckmark,
      isDisabled,
      isActive,
      isSelected,
      startIcon,
      description,
      endIcon,
      endSection,
      capitalizeFirst,
      "data-value": value,
      children
    }
  );
}
const MOBILE_SCREEN_WIDTH = 768;
function useIsMobileDevice() {
  const isSSR = useIsSSR();
  if (isSSR || typeof window === "undefined") {
    return getBootstrapData().is_mobile_device ?? false;
  }
  return window.screen.width <= MOBILE_SCREEN_WIDTH;
}
function useOverlayViewport() {
  const { width, height } = useViewportSize();
  return {
    "--be-viewport-height": `${height}px`,
    "--be-viewport-width": `${width}px`
  };
}
const Popover = forwardRef(
  ({
    children,
    style,
    autoFocus = false,
    restoreFocus = true,
    isDismissable,
    isContextMenu,
    isOpen,
    onClose,
    triggerRef,
    arrowRef,
    arrowStyle,
    onPointerLeave,
    onPointerEnter
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    const { domProps } = useCloseOnInteractOutside(
      {
        isDismissable,
        isOpen,
        onClose,
        triggerRef,
        isContextMenu
      },
      objRef
    );
    return /* @__PURE__ */ jsx(
      m.div,
      {
        className: "isolate z-popover",
        role: "presentation",
        ref: objRef,
        style: { ...viewPortStyle, ...style, position: "fixed" },
        ...PopoverAnimation,
        ...mergeProps(domProps, { onPointerLeave, onPointerEnter }),
        children: /* @__PURE__ */ jsx(
          FocusScope,
          {
            restoreFocus,
            autoFocus,
            contain: false,
            children
          }
        )
      }
    );
  }
);
const visibleOverlays = [];
function useCloseOnInteractOutside({
  onClose,
  isDismissable = true,
  triggerRef,
  isContextMenu = false
}, ref) {
  const stateRef = useRef({
    isPointerDown: false,
    isContextMenu,
    onClose
  });
  const state = stateRef.current;
  state.isContextMenu = isContextMenu;
  state.onClose = onClose;
  const isValidEvent = useCallback(
    (e) => {
      const target = e.target;
      if (target) {
        const ownerDocument = target.ownerDocument;
        if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
          return false;
        }
      }
      return ref.current && !ref.current.contains(target);
    },
    [ref]
  );
  const isTopMostPopover = useCallback(() => {
    return visibleOverlays[visibleOverlays.length - 1] === ref;
  }, [ref]);
  const hideOverlay = useCallback(() => {
    if (isTopMostPopover()) {
      state.onClose();
    }
  }, [isTopMostPopover, state]);
  const clickedOnTriggerElement = useCallback(
    (el) => {
      var _a, _b;
      if (triggerRef.current && "contains" in triggerRef.current) {
        return (_b = (_a = triggerRef.current).contains) == null ? void 0 : _b.call(_a, el);
      }
      return false;
    },
    [triggerRef]
  );
  const onInteractOutsideStart = useCallback(
    (e) => {
      if (!clickedOnTriggerElement(e.target)) {
        if (isTopMostPopover()) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },
    [clickedOnTriggerElement, isTopMostPopover]
  );
  const onInteractOutside = useCallback(
    (e) => {
      if (!clickedOnTriggerElement(e.target)) {
        if (isTopMostPopover()) {
          e.stopPropagation();
          e.preventDefault();
        }
        if (!state.isContextMenu || e.button !== 2) {
          hideOverlay();
        }
      }
    },
    [clickedOnTriggerElement, hideOverlay, state, isTopMostPopover]
  );
  useEffect(() => {
    visibleOverlays.push(ref);
    const onPointerDown = (e) => {
      if (isValidEvent(e)) {
        onInteractOutsideStart(e);
        stateRef.current.isPointerDown = true;
      }
    };
    const onPointerUp = (e) => {
      if (stateRef.current.isPointerDown && isValidEvent(e)) {
        stateRef.current.isPointerDown = false;
        onInteractOutside(e);
      }
    };
    const onContextMenu = (e) => {
      e.preventDefault();
      if (isValidEvent(e)) {
        hideOverlay();
      }
    };
    const onScroll = (e) => {
      if (!triggerRef.current) {
        return;
      }
      const scrollableRegion = e.target;
      let triggerEl;
      if (triggerRef.current instanceof Node) {
        triggerEl = triggerRef.current;
      } else if ("contextElement" in triggerRef.current) {
        triggerEl = triggerRef.current.contextElement;
      }
      if (!(scrollableRegion instanceof Node) || !triggerEl || scrollableRegion.contains(triggerEl)) {
        state.onClose();
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("scroll", onScroll, true);
    return () => {
      const index = visibleOverlays.indexOf(ref);
      if (index >= 0) {
        visibleOverlays.splice(index, 1);
      }
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [
    ref,
    isValidEvent,
    state,
    onInteractOutside,
    onInteractOutsideStart,
    triggerRef,
    clickedOnTriggerElement,
    hideOverlay
  ]);
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      e.preventDefault();
      hideOverlay();
    }
  };
  return {
    domProps: {
      onKeyDown
    }
  };
}
const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};
function Underlay({
  position = "absolute",
  className,
  isTransparent = false,
  disableInitialTransition,
  ...domProps
}) {
  return /* @__PURE__ */ jsx(
    m.div,
    {
      ...domProps,
      className: clsx(
        className,
        !isTransparent && "bg-background/80",
        "inset-0 z-10 h-full w-full",
        position,
        "backdrop-blur-sm"
      ),
      "aria-hidden": true,
      initial: disableInitialTransition ? void 0 : { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      ...opacityAnimation,
      transition: { duration: 0.15 }
    }
  );
}
const Tray = forwardRef(
  ({
    children,
    autoFocus = false,
    restoreFocus = true,
    isDismissable,
    isOpen,
    onClose
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 isolate z-tray", style: viewPortStyle, children: [
      /* @__PURE__ */ jsx(
        Underlay,
        {
          onClick: () => {
            if (isDismissable) {
              onClose();
            }
          }
        },
        "tray-underlay"
      ),
      /* @__PURE__ */ jsx(
        m.div,
        {
          ref: objRef,
          className: "absolute bottom-0 left-0 right-0 z-20 mx-auto max-h-tray w-full max-w-375 overflow-hidden rounded-t pb-safe-area",
          role: "presentation",
          initial: { opacity: 0, y: "100%" },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: "100%" },
          transition: { type: "tween", duration: 0.2 },
          children: /* @__PURE__ */ jsx(FocusScope, { restoreFocus, autoFocus, contain: true, children })
        }
      )
    ] });
  }
);
function Listbox({
  listbox,
  children: trigger,
  isLoading,
  mobileOverlay = Tray,
  searchField,
  onClose,
  prepend,
  className: listboxClassName,
  ...domProps
}) {
  const isMobile = useIsMobileDevice();
  const {
    floatingWidth,
    floatingMinWidth = "min-w-180",
    collection,
    showEmptyMessage,
    state: { isOpen, setIsOpen },
    positionStyle,
    floating,
    refs
  } = listbox;
  const Overlay = !prepend && isMobile ? mobileOverlay : Popover;
  const className = clsx(
    "text-base sm:text-sm outline-none bg max-h-inherit flex flex-col",
    !prepend && "shadow-xl border py-4",
    listboxClassName,
    // tray will apply its own rounding and max width
    Overlay === Popover && "rounded-panel",
    Overlay === Popover && floatingWidth === "auto" ? `max-w-288 ${floatingMinWidth}` : ""
  );
  const children = useMemo(() => {
    let sectionIndex = 0;
    const renderedSections = [];
    return [...collection.values()].reduce((prev, curr) => {
      if (!curr.section) {
        prev.push(
          cloneElement(curr.element, {
            key: curr.element.key || curr.element.props.value
          })
        );
      } else if (!renderedSections.includes(curr.section)) {
        const section = cloneElement(curr.section, {
          key: curr.section.key || sectionIndex,
          index: sectionIndex
        });
        prev.push(section);
        renderedSections.push(curr.section);
        sectionIndex++;
      }
      return prev;
    }, []);
  }, [collection]);
  const showContent = children.length > 0 || showEmptyMessage && !isLoading;
  const innerContent = showContent ? /* @__PURE__ */ jsxs("div", { className, role: "presentation", children: [
    searchField,
    /* @__PURE__ */ jsx(FocusContainer, { isLoading, ...domProps, children })
  ] }) : null;
  return /* @__PURE__ */ jsxs(ListBoxContext.Provider, { value: listbox, children: [
    trigger,
    prepend ? innerContent : rootEl && createPortal(
      /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && showContent && /* @__PURE__ */ jsx(
        Overlay,
        {
          triggerRef: refs.reference,
          restoreFocus: true,
          isOpen,
          onClose: () => {
            onClose == null ? void 0 : onClose();
            setIsOpen(false);
          },
          isDismissable: true,
          style: positionStyle,
          ref: floating,
          children: innerContent
        }
      ) }),
      rootEl
    )
  ] });
}
function FocusContainer({
  className,
  children,
  isLoading,
  ...domProps
}) {
  const {
    role,
    listboxId,
    virtualFocus,
    focusItem,
    state: { activeIndex, setActiveIndex, selectedIndex }
  } = useListboxContext();
  const autoFocusRef = useRef(true);
  const domRef = useRef(null);
  useEffect(() => {
    return () => setActiveIndex(null);
  }, [setActiveIndex]);
  useEffect(() => {
    if (autoFocusRef.current) {
      const indexToFocus = activeIndex ?? selectedIndex;
      if (indexToFocus == null && !virtualFocus) {
        requestAnimationFrame(() => {
          var _a;
          (_a = domRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      } else if (indexToFocus != null) {
        requestAnimationFrame(() => {
          focusItem("increment", indexToFocus);
        });
      }
    }
    autoFocusRef.current = false;
  }, [activeIndex, selectedIndex, focusItem, virtualFocus]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: virtualFocus ? void 0 : -1,
      role,
      id: listboxId,
      className: "flex-auto overflow-y-auto overscroll-contain outline-none",
      ref: domRef,
      ...domProps,
      children: children.length ? children : /* @__PURE__ */ jsx(EmptyMessage, {})
    }
  );
}
function EmptyMessage() {
  return /* @__PURE__ */ jsx("div", { className: "px-8 py-4 text-sm italic text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "There are no items matching your query" }) });
}
function useListboxKeyboardNavigation({
  state: {
    isOpen,
    setIsOpen,
    selectedIndex,
    activeIndex,
    setInputValue,
    setActiveIndex
  },
  focusLoopingMode,
  collection,
  focusItem,
  handleItemSelection,
  allowCustomValue
}) {
  const handleTriggerKeyDown = (e) => {
    if (isOpen || !e.currentTarget.contains(e.target))
      return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      focusItem("increment", selectedIndex != null ? selectedIndex : 0);
      return true;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      focusItem(
        "decrement",
        selectedIndex != null ? selectedIndex : collection.size - 1
      );
      return true;
    } else if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      setIsOpen(true);
      focusItem("increment", selectedIndex != null ? selectedIndex : 0);
      return true;
    }
  };
  const handleListboxKeyboardNavigation = (e) => {
    const lastIndex = Math.max(0, collection.size - 1);
    if (!isOpen || !e.currentTarget.contains(e.target))
      return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (activeIndex == null) {
          focusItem("increment", 0);
        } else if (activeIndex >= lastIndex) {
          if (focusLoopingMode === "loop") {
            focusItem("increment", 0);
          } else if (focusLoopingMode === "deselect") {
            setActiveIndex(null);
          }
        } else {
          focusItem("increment", activeIndex + 1);
        }
        return true;
      case "ArrowUp":
        e.preventDefault();
        if (activeIndex == null) {
          focusItem("decrement", lastIndex);
        } else if (activeIndex <= 0) {
          if (focusLoopingMode === "loop") {
            focusItem("decrement", lastIndex);
          } else if (focusLoopingMode === "deselect") {
            setActiveIndex(null);
          }
        } else {
          focusItem("decrement", activeIndex - 1);
        }
        return true;
      case "Home":
        e.preventDefault();
        focusItem("increment", 0);
        return true;
      case "End":
        e.preventDefault();
        focusItem("decrement", lastIndex);
        return true;
      case "Tab":
        setIsOpen(false);
        return true;
    }
  };
  const handleListboxSearchFieldKeydown = (e) => {
    var _a, _b;
    if (e.key === "Enter" && activeIndex != null && collection.size) {
      e.preventDefault();
      const [value, obj] = [...collection.entries()][activeIndex];
      if (value) {
        handleItemSelection(value);
        (_b = (_a = obj.element.props).onSelected) == null ? void 0 : _b.call(_a);
      }
      return;
    }
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      if (!allowCustomValue) {
        setInputValue("");
      }
    }
    const handled = handleTriggerKeyDown(e);
    if (!handled) {
      handleListboxKeyboardNavigation(e);
    }
  };
  return {
    handleTriggerKeyDown,
    handleListboxKeyboardNavigation,
    handleListboxSearchFieldKeydown
  };
}
const cache = /* @__PURE__ */ new Map();
function useCollator(options) {
  const { localeCode } = useSelectedLocale();
  const cacheKey = localeCode + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const formatter = new Intl.Collator(localeCode, options);
  cache.set(cacheKey, formatter);
  return formatter;
}
function useTypeSelect() {
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const state = useRef({
    search: "",
    timeout: void 0
  }).current;
  const getMatchingIndex = (listContent, fromIndex) => {
    let index = fromIndex ?? 0;
    while (index != null) {
      const item = listContent[index];
      const substring = item == null ? void 0 : item.slice(0, state.search.length);
      if (substring && collator.compare(substring, state.search) === 0) {
        return index;
      }
      if (index < listContent.length - 1) {
        index++;
      } else {
        return null;
      }
    }
    return null;
  };
  const findMatchingItem = (e, listContent, fromIndex = 0) => {
    const character = getStringForKey(e.key);
    if (!character || e.ctrlKey || e.metaKey) {
      return null;
    }
    if (character === " " && state.search.trim().length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    state.search += character;
    let index = getMatchingIndex(listContent, fromIndex);
    if (index == null) {
      index = getMatchingIndex(listContent, 0);
    }
    clearTimeout(state.timeout);
    state.timeout = setTimeout(() => {
      state.search = "";
    }, 500);
    return index ?? null;
  };
  return { findMatchingItem };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
function useMediaQuery(query, { noSSR } = { noSSR: true }) {
  const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
  const [matches, setMatches] = useState(
    noSSR ? () => supportsMatchMedia ? window.matchMedia(query).matches : false : null
  );
  useEffect(() => {
    if (!supportsMatchMedia) {
      return;
    }
    const mq = window.matchMedia(query);
    const onChange = () => {
      setMatches(mq.matches);
    };
    mq.addEventListener("change", onChange);
    if (!noSSR) {
      onChange();
    }
    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, [supportsMatchMedia, query, noSSR]);
  return typeof window === "undefined" ? null : matches;
}
function useIsMobileMediaQuery(options) {
  return useMediaQuery("(max-width: 768px)", options);
}
const SearchIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
  "SearchOutlined"
);
const MenuTrigger = forwardRef(
  (props, ref) => {
    const {
      placement,
      offset: offset2,
      searchPlaceholder,
      showSearchField,
      children: [menuTrigger, menu],
      floatingWidth = "auto",
      isLoading
    } = props;
    const id = useId();
    const isMobile = useIsMobileMediaQuery();
    const listbox = useListbox(
      {
        ...props,
        clearInputOnItemSelection: true,
        showEmptyMessage: showSearchField,
        // on mobile menu will be shown as bottom drawer, so make it fullscreen width always
        floatingWidth: isMobile ? "auto" : floatingWidth,
        virtualFocus: showSearchField,
        role: showSearchField ? "listbox" : "menu",
        focusLoopingMode: showSearchField ? "stay" : "loop",
        children: menu.props.children,
        placement,
        offset: offset2
      },
      ref
    );
    const {
      state: { isOpen, setIsOpen, activeIndex, inputValue, setInputValue },
      listboxId,
      focusItem,
      listContent,
      reference,
      onInputChange
    } = listbox;
    const {
      handleTriggerKeyDown,
      handleListboxKeyboardNavigation,
      handleListboxSearchFieldKeydown
    } = useListboxKeyboardNavigation(listbox);
    const { findMatchingItem } = useTypeSelect();
    const handleListboxTypeSelect = (e) => {
      if (!isOpen)
        return;
      const i = findMatchingItem(e, listContent, activeIndex);
      if (i != null) {
        focusItem("increment", i);
      }
    };
    return /* @__PURE__ */ jsx(
      Listbox,
      {
        onClick: (e) => e.stopPropagation(),
        listbox,
        onKeyDownCapture: !showSearchField ? handleListboxTypeSelect : void 0,
        onKeyDown: handleListboxKeyboardNavigation,
        onClose: showSearchField ? () => setInputValue("") : void 0,
        "aria-labelledby": id,
        isLoading,
        searchField: showSearchField ? /* @__PURE__ */ jsx(
          TextField,
          {
            size: "sm",
            placeholder: searchPlaceholder,
            startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
            className: "flex-shrink-0 px-8 pb-8 pt-4",
            autoFocus: true,
            "aria-expanded": isOpen ? "true" : "false",
            "aria-haspopup": "listbox",
            "aria-controls": isOpen ? listboxId : void 0,
            "aria-autocomplete": "list",
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            value: inputValue,
            onChange: onInputChange,
            onKeyDown: (e) => {
              handleListboxSearchFieldKeydown(e);
            }
          }
        ) : null,
        children: cloneElement(menuTrigger, {
          id,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "menu",
          "aria-controls": isOpen ? listboxId : void 0,
          ref: reference,
          onKeyDown: handleTriggerKeyDown,
          onClick: createEventHandler((e) => {
            var _a, _b;
            (_b = (_a = menuTrigger.props) == null ? void 0 : _a.onClick) == null ? void 0 : _b.call(_a, e);
            setIsOpen(!isOpen);
          })
        })
      }
    );
  }
);
function Menu({ children }) {
  return children;
}
function useChangeLocale() {
  return useMutation({
    mutationFn: (props) => changeLocale(props),
    onSuccess: (response) => {
      mergeBootstrapData({
        i18n: response.locale
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function changeLocale(props) {
  return apiClient.post(`users/me/locale`, props).then((r) => r.data);
}
function LocaleSwitcher() {
  const { locale } = useSelectedLocale();
  const changeLocale2 = useChangeLocale();
  const { data } = useValueLists(["localizations"]);
  const { i18n } = useSettings();
  if (!(data == null ? void 0 : data.localizations) || !locale || !i18n.enable)
    return null;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingWidth: "matchTrigger",
      selectionMode: "single",
      selectedValue: locale.language,
      onSelectionChange: (value) => {
        const newLocale = value;
        if (newLocale !== (locale == null ? void 0 : locale.language)) {
          changeLocale2.mutate({ locale: newLocale });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: changeLocale2.isPending,
            className: "capitalize",
            startIcon: /* @__PURE__ */ jsx(LanguageIcon, {}),
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            children: locale.name
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data.localizations.map((localization) => /* @__PURE__ */ jsx(
          Item$1,
          {
            value: localization.language,
            className: "capitalize",
            children: localization.name
          },
          localization.language
        )) })
      ]
    }
  );
}
const DarkModeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" }),
  "DarkModeOutlined"
);
const LightbulbIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" }),
  "LightbulbOutlined"
);
function Footer({ className, padding }) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { branding } = useSettings();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: clsx(
        "text-sm",
        padding ? padding : "pb-28 pt-54 md:pb-54",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Menus, {}),
        /* @__PURE__ */ jsxs("div", { className: "items-center justify-between gap-30 text-center text-muted md:flex md:text-left", children: [
          /* @__PURE__ */ jsx(
            Trans,
            {
              message: "Copyright © :year :name, All Rights Reserved",
              values: { year, name: branding.site_name }
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(ThemeSwitcher, {}),
            /* @__PURE__ */ jsx(LocaleSwitcher, {})
          ] })
        ] })
      ]
    }
  );
}
function Menus() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find((m2) => {
    var _a;
    return (_a = m2.positions) == null ? void 0 : _a.includes("footer");
  });
  const secondaryMenu = settings.menus.find(
    (m2) => {
      var _a;
      return (_a = m2.positions) == null ? void 0 : _a.includes("footer-secondary");
    }
  );
  if (!primaryMenu && !secondaryMenu)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 items-center justify-between gap-30 overflow-x-auto border-b pb-14 md:flex", children: [
    primaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: primaryMenu, className: "text-primary" }),
    secondaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: secondaryMenu, className: "mb:mt-0 mt-14 text-muted" })
  ] });
}
function ThemeSwitcher() {
  const { themes } = useSettings();
  const { selectedTheme, selectTheme } = useThemeSelector();
  if (!selectedTheme || !(themes == null ? void 0 : themes.user_change))
    return null;
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "text",
      startIcon: selectedTheme.is_dark ? /* @__PURE__ */ jsx(DarkModeIcon, {}) : /* @__PURE__ */ jsx(LightbulbIcon, {}),
      onClick: () => {
        if (selectedTheme.is_dark) {
          selectTheme("light");
        } else {
          selectTheme("dark");
        }
      },
      children: selectedTheme.is_dark ? /* @__PURE__ */ jsx(Trans, { message: "Light mode" }) : /* @__PURE__ */ jsx(Trans, { message: "Dark mode" })
    }
  );
}
const Helmet = memo(({ children, tags }) => {
  useTrans();
  return null;
}, shallowEqual);
function DefaultMetaTags() {
  const { default_meta_tags } = useBootstrapDataStore((s) => s.data);
  return /* @__PURE__ */ jsx(Helmet, { tags: default_meta_tags });
}
function Skeleton({
  variant = "text",
  animation = "wave",
  size: size2,
  className,
  display = "block",
  radius = "rounded",
  style
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style,
      className: clsx(
        "skeleton relative overflow-hidden bg-fg-base/4 bg-no-repeat will-change-transform",
        radius,
        skeletonSize({ variant, size: size2 }),
        display,
        variant === "text" && "origin-[0_55%] scale-y-[0.6]",
        variant === "avatar" && "flex-shrink-0",
        variant === "icon" && "mx-8 flex-shrink-0",
        animation === "wave" && "skeleton-wave",
        animation === "pulsate" && "skeleton-pulsate",
        className
      ),
      "aria-busy": true,
      "aria-live": "polite"
    }
  );
}
function skeletonSize({ variant, size: size2 }) {
  if (size2) {
    return size2;
  }
  switch (variant) {
    case "avatar":
      return "h-40 w-40";
    case "icon":
      return "h-24 h-24";
    case "rect":
      return "h-full w-full";
    default:
      return "w-full";
  }
}
const endpoint$1 = "billing/products";
function useProducts(loader) {
  return useQuery({
    queryKey: [endpoint$1],
    queryFn: () => fetchProducts(),
    initialData: () => {
      var _a;
      if (loader) {
        return (_a = getBootstrapData().loaders) == null ? void 0 : _a[loader];
      }
    }
  });
}
function fetchProducts() {
  return apiClient.get(endpoint$1).then((response) => {
    return { products: response.data.pagination.data };
  });
}
function findBestPrice(token, prices) {
  if (token === "monthly") {
    const match2 = findMonthlyPrice(prices);
    if (match2)
      return match2;
  }
  if (token === "yearly") {
    const match2 = findYearlyPrice(prices);
    if (match2)
      return match2;
  }
  return prices[0];
}
function findYearlyPrice(prices) {
  return prices.find((price) => {
    if (price.interval === "month" && price.interval_count >= 12) {
      return price;
    }
    if (price.interval === "year" && price.interval_count >= 1) {
      return price;
    }
  });
}
function findMonthlyPrice(prices) {
  return prices.find((price) => {
    if (price.interval === "day" && price.interval_count >= 30) {
      return price;
    }
    if (price.interval === "month" && price.interval_count >= 1) {
      return price;
    }
  });
}
const FormattedCurrency = memo(
  ({ value, currency }) => {
    const formatter = useNumberFormatter({
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol"
    });
    if (isNaN(value)) {
      value = 0;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(value) });
  }
);
function FormattedPrice({
  price,
  variant = "slash",
  className,
  priceClassName,
  periodClassName
}) {
  if (!price)
    return null;
  const translatedInterval = /* @__PURE__ */ jsx(Trans, { message: price.interval });
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-6", className), children: [
    /* @__PURE__ */ jsx("div", { className: priceClassName, children: /* @__PURE__ */ jsx(
      FormattedCurrency,
      {
        value: price.amount / (price.interval_count ?? 1),
        currency: price.currency
      }
    ) }),
    variant === "slash" ? /* @__PURE__ */ jsxs("div", { className: periodClassName, children: [
      " / ",
      translatedInterval
    ] }) : /* @__PURE__ */ jsxs("div", { className: periodClassName, children: [
      /* @__PURE__ */ jsx(Trans, { message: "per" }),
      " ",
      /* @__PURE__ */ jsx("br", {}),
      " ",
      translatedInterval
    ] })
  ] });
}
function ProductFeatureList({ product }) {
  if (!product.feature_list.length)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mt-32 border-t pt-24", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "What's included" }) }),
    product.feature_list.map((feature) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 py-6 text-sm", children: [
      /* @__PURE__ */ jsx(CheckIcon, { className: "text-primary", size: "sm" }),
      /* @__PURE__ */ jsx(Trans, { message: feature })
    ] }, feature))
  ] });
}
function PricingTable({
  selectedCycle,
  className,
  productLoader
}) {
  const query = useProducts(productLoader);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex flex-col items-stretch gap-24 overflow-x-auto overflow-y-visible pb-20 md:flex-row md:justify-center",
        className
      ),
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.data ? /* @__PURE__ */ jsx(
        PlanList,
        {
          plans: query.data.products,
          selectedPeriod: selectedCycle
        },
        "plan-list"
      ) : /* @__PURE__ */ jsx(SkeletonLoader, {}, "skeleton-loader") })
    }
  );
}
function PlanList({ plans, selectedPeriod }) {
  const { isLoggedIn, isSubscribed } = useAuth();
  const filteredPlans = plans.filter((plan) => !plan.hidden);
  return /* @__PURE__ */ jsx(Fragment, { children: filteredPlans.map((plan, index) => {
    const isFirst = index === 0;
    const isLast = index === filteredPlans.length - 1;
    const price = findBestPrice(selectedPeriod, plan.prices);
    let upgradeRoute;
    if (!isLoggedIn) {
      upgradeRoute = `/register?redirectFrom=pricing`;
    }
    if (isSubscribed) {
      upgradeRoute = `/change-plan/${plan.id}/${price == null ? void 0 : price.id}/confirm`;
    }
    if (isLoggedIn && !plan.free) {
      upgradeRoute = `/checkout/${plan.id}/${price == null ? void 0 : price.id}`;
    }
    return /* @__PURE__ */ jsxs(
      m.div,
      {
        ...opacityAnimation,
        className: clsx(
          "w-full rounded-panel border bg px-28 py-28 shadow-lg md:min-w-240 md:max-w-350",
          isFirst && "ml-auto",
          isLast && "mr-auto"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-32", children: [
            /* @__PURE__ */ jsx(
              Chip,
              {
                radius: "rounded",
                size: "sm",
                className: clsx(
                  "mb-20 w-min",
                  !plan.recommended && "invisible"
                ),
                children: /* @__PURE__ */ jsx(Trans, { message: "Most popular" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mb-12 text-xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: plan.name }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: plan.description }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            price ? /* @__PURE__ */ jsx(
              FormattedPrice,
              {
                priceClassName: "font-bold text-4xl",
                periodClassName: "text-muted text-xs",
                variant: "separateLine",
                price
              }
            ) : /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx(Trans, { message: "Free" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-60", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: plan.recommended ? "flat" : "outline",
                color: "primary",
                className: "w-full",
                size: "md",
                elementType: upgradeRoute ? Link : void 0,
                disabled: !upgradeRoute,
                onClick: () => {
                  if (isLoggedIn || !price || !plan)
                    return;
                  setInLocalStorage("be.onboarding.selected", {
                    productId: plan.id,
                    priceId: price.id
                  });
                },
                to: upgradeRoute,
                children: plan.free ? /* @__PURE__ */ jsx(Trans, { message: "Get started" }) : /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
              }
            ) }),
            /* @__PURE__ */ jsx(ProductFeatureList, { product: plan })
          ] })
        ]
      },
      plan.id
    );
  }) });
}
function SkeletonLoader() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-1"),
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-2"),
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-3")
  ] });
}
function PlanSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      ...opacityAnimation,
      className: "w-full rounded-lg border px-28 py-90 shadow-lg md:max-w-350",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "my-10" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40 h-30" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40 h-40" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-20" }),
        /* @__PURE__ */ jsx(Skeleton, {}),
        /* @__PURE__ */ jsx(Skeleton, {})
      ]
    }
  );
}
const Radio = forwardRef((props, ref) => {
  const {
    children,
    autoFocus,
    size: size2,
    invalid,
    isFirst,
    display = "inline-flex",
    ...domProps
  } = props;
  const inputRef = useObjectRef(ref);
  useAutoFocus({ autoFocus }, inputRef);
  const sizeClassNames2 = getSizeClassNames(size2);
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: clsx(
        "select-none items-center gap-8 whitespace-nowrap align-middle",
        display,
        sizeClassNames2.label,
        props.disabled && "pointer-events-none text-disabled",
        props.invalid && "text-danger"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            className: clsx(
              "outline-none focus-visible:ring",
              "appearance-none rounded-full border-2 transition-button",
              "border-text-muted checked:border-primary checked:hover:border-primary-dark disabled:border-disabled-fg",
              "before:bg-primary before:hover:bg-primary-dark disabled:before:bg-disabled-fg",
              "before:block before:h-full before:w-full before:scale-10 before:rounded-full before:opacity-0 before:transition before:duration-200",
              "checked:before:scale-[.65] checked:before:opacity-100",
              sizeClassNames2.circle
            ),
            ref: inputRef,
            ...domProps
          }
        ),
        children && /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
});
function FormRadio(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    checked: props.value === value,
    invalid: props.invalid || invalid
  };
  return /* @__PURE__ */ jsx(Radio, { ref, ...mergeProps(formProps, props) });
}
function getSizeClassNames(size2) {
  switch (size2) {
    case "xs":
      return { circle: "h-12 w-12", label: "text-xs" };
    case "sm":
      return { circle: "h-16 w-16", label: "text-sm" };
    case "lg":
      return { circle: "h-24 w-24", label: "text-lg" };
    default:
      return { circle: "h-20 w-20", label: "text-base" };
  }
}
const RadioGroup = forwardRef(
  (props, ref) => {
    const style = getInputFieldClassNames(props);
    const {
      label,
      children,
      size: size2,
      className,
      orientation = "horizontal",
      disabled,
      required,
      invalid,
      errorMessage,
      description
    } = props;
    const labelProps = {};
    const id = useId();
    const name = props.name || id;
    return /* @__PURE__ */ jsxs(
      "fieldset",
      {
        "aria-describedby": description ? `${id}-description` : void 0,
        ref,
        className: clsx("text-left", className),
        children: [
          label && /* @__PURE__ */ jsx("legend", { className: style.label, ...labelProps, children: label }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "flex",
                label ? "mt-6" : "mt-0",
                orientation === "vertical" ? "flex-col gap-10" : "flex-row gap-16"
              ),
              children: Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, {
                    name,
                    size: size2,
                    invalid: child.props.invalid || invalid || void 0,
                    disabled: child.props.disabled || disabled,
                    required: child.props.required || required
                  });
                }
              })
            }
          ),
          description && !errorMessage && /* @__PURE__ */ jsx("div", { className: style.description, id: `${id}-description`, children: description }),
          errorMessage && /* @__PURE__ */ jsx("div", { className: style.error, children: errorMessage })
        ]
      }
    );
  }
);
function FormRadioGroup({ children, ...props }) {
  const {
    fieldState: { error }
  } = useController({
    name: props.name
  });
  return /* @__PURE__ */ jsx(RadioGroup, { errorMessage: error == null ? void 0 : error.message, ...props, children });
}
const UpsellLabel = memo(({ products }) => {
  const upsellPercentage = calcHighestUpsellPercentage(products);
  if (upsellPercentage <= 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-positive-darker", children: [
    " ",
    "(",
    /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Save up to :percentage%",
        values: { percentage: upsellPercentage }
      }
    ),
    ")"
  ] }) });
});
function calcHighestUpsellPercentage(products) {
  if (!(products == null ? void 0 : products.length))
    return 0;
  const decreases = products.map((product) => {
    if (product.hidden)
      return 0;
    const monthly = findBestPrice("monthly", product.prices);
    const yearly = findBestPrice("yearly", product.prices);
    if (!monthly || !yearly)
      return 0;
    const monthlyAmount = monthly.amount * 12;
    const yearlyAmount = yearly.amount;
    const savingsPercentage = Math.round(
      (monthlyAmount - yearlyAmount) / monthlyAmount * 100
    );
    if (savingsPercentage > 0 && savingsPercentage <= 200) {
      return savingsPercentage;
    }
    return 0;
  });
  return Math.max(Math.max(...decreases), 0);
}
function BillingCycleRadio({
  selectedCycle,
  onChange,
  products,
  ...radioGroupProps
}) {
  return /* @__PURE__ */ jsxs(RadioGroup, { ...radioGroupProps, children: [
    /* @__PURE__ */ jsxs(
      Radio,
      {
        value: "yearly",
        checked: selectedCycle === "yearly",
        onChange: (e) => {
          onChange(e.target.value);
        },
        children: [
          /* @__PURE__ */ jsx(Trans, { message: "Annual" }),
          /* @__PURE__ */ jsx(UpsellLabel, { products })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Radio,
      {
        value: "monthly",
        checked: selectedCycle === "monthly",
        onChange: (e) => {
          onChange(e.target.value);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Monthly" })
      }
    )
  ] });
}
function getAssetUrl(url) {
  if (isAbsoluteUrl(url)) {
    return url;
  }
  const assetUrl = getBootstrapData().settings.asset_url || getBootstrapData().settings.base_url;
  url = url.replace(/^\/+/g, "");
  if (url.startsWith("assets/")) {
    return `${assetUrl}/build/${url}`;
  }
  return `${assetUrl}/${url}`;
}
function useImageSrc(src, { size: size2 } = {}) {
  if (!src)
    return;
  if (!size2)
    size2 = "original";
  if (src.includes("image.tmdb")) {
    return getTmdbSrc(src, size2);
  }
  return `${getLocalSrc(getAssetUrl(src), size2)}`;
}
function useImageSrcSet(src) {
  if (!src)
    return;
  if (src.includes("image.tmdb") || src.includes("themoviedb")) {
    return `${src.replace(/original|w1280/, "w300")} 768w, ${src.replace(
      /original|w1280/,
      "w780"
    )} 1024w, ${src.replace(/original|w1280/, "w1280")} 1280w`;
  }
  return `${src.replace(/original/, "small")} 768w, ${src.replace(
    /original/,
    "medium"
  )} 1024w, ${src.replace(/original/, "large")} 1280w`;
}
function getTmdbSrc(initialSrc, size2) {
  switch (size2) {
    case "sm":
      return initialSrc.replace(/original|w1280/, "w92");
    case "md":
      return initialSrc.replace(/original|w1280/, "w300");
    case "lg":
      return initialSrc.replace(/original|w1280/, "w500");
    default:
      return initialSrc;
  }
}
function getLocalSrc(initialSrc, size2) {
  switch (size2) {
    case "sm":
      return initialSrc.replace("original", "small");
    case "md":
      return initialSrc.replace("original", "medium");
    case "lg":
      return initialSrc.replace("original", "large");
    default:
      return initialSrc;
  }
}
const MovieIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z" }),
  "MovieOutlined"
);
function LandingPageTrendingTitles() {
  var _a, _b;
  const titles = (_b = (_a = getBootstrapData().loaders) == null ? void 0 : _a.landingPage) == null ? void 0 : _b.trendingTitles;
  if (!(titles == null ? void 0 : titles.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "landing-container mb-48 md:mb-80", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-48 mt-14 h-1 bg-divider md:mb-80" }),
    /* @__PURE__ */ jsx("h2", { className: "mb-34 text-center text-4xl", children: /* @__PURE__ */ jsx(Trans, { message: "See what's currently trending." }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-24", children: titles.map((title) => /* @__PURE__ */ jsx(TitleItem, { title }, title.id)) })
  ] });
}
function TitleItem({ title }) {
  const src = useImageSrc(title == null ? void 0 : title.backdrop, { size: "lg" });
  const { trans } = useTrans();
  const imageClassName = clsx(
    "h-full w-full rounded bg-fg-base/4 object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      draggable: false,
      loading: "lazy",
      src,
      alt: trans(message("Poster for :name", { values: { name: title.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(MovieIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: image }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 text-center text-base font-medium", children: title.name })
  ] });
}
const NotificationsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" }),
  "NotificationsOutlined"
);
const Modal = forwardRef(
  ({
    children,
    autoFocus = false,
    restoreFocus = true,
    isDismissable = true,
    isOpen = false,
    placement = "center",
    onClose
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 isolate z-modal",
        style: viewPortStyle,
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
            onClose();
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Underlay,
            {
              onClick: () => {
                if (isDismissable) {
                  onClose();
                }
              }
            },
            "modal-underlay"
          ),
          /* @__PURE__ */ jsx(
            m.div,
            {
              ref: objRef,
              className: clsx(
                "pointer-events-none absolute inset-0 z-20 flex h-full w-full",
                placement === "center" && "items-center justify-center",
                placement === "top" && "items-start justify-center pt-40"
              ),
              role: "presentation",
              initial: { opacity: 0, scale: placement === "top" ? 1 : 0.7 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 1 },
              transition: { duration: 0.1 },
              children: /* @__PURE__ */ jsx(FocusScope, { restoreFocus, autoFocus, contain: true, children })
            }
          )
        ]
      }
    );
  }
);
function pointToVirtualElement({ x, y }, contextElement) {
  return {
    getBoundingClientRect() {
      return {
        x,
        y,
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x
      };
    },
    contextElement
  };
}
function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}
function DialogTrigger(props) {
  let {
    children,
    type,
    disableInitialTransition,
    isDismissable = true,
    moveFocusToDialog = true,
    returnFocusToTrigger = true,
    triggerOnHover = false,
    triggerOnContextMenu = false,
    handleTriggerClick = true,
    usePortal = true,
    mobileType,
    alwaysReturnCurrentValueOnClose
  } = props;
  const contextMenuTriggerRef = useRef(null);
  const triggerRef = triggerOnContextMenu && !props.triggerRef ? contextMenuTriggerRef : props.triggerRef;
  const initialValueRef = useRef(props.value);
  const [isOpen, setIsOpen] = useControlledState(
    props.isOpen,
    props.defaultIsOpen,
    props.onOpenChange
  );
  const [value, setValue] = useControlledState(
    props.value,
    props.defaultValue,
    props.onValueChange
  );
  const isMobile = useIsMobileMediaQuery();
  if (isMobile && type === "popover") {
    type = mobileType || "modal";
  }
  const hoverTimeoutRef = useRef(null);
  const { x, y, reference, strategy, refs } = useFloatingPosition({
    ...props,
    disablePositioning: type === "modal"
  });
  const floatingStyle = type === "popover" ? {
    position: strategy,
    top: y ?? "",
    left: x ?? ""
  } : {};
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const formId = `${id}-form`;
  const onClose = useCallbackRef(props.onClose);
  const close = useCallback(
    (closeValue) => {
      if (typeof closeValue === "undefined" && alwaysReturnCurrentValueOnClose) {
        closeValue = value;
      }
      const finalValue = typeof closeValue !== "undefined" ? closeValue : initialValueRef.current;
      onClose == null ? void 0 : onClose(finalValue, {
        initialValue: initialValueRef.current,
        valueChanged: finalValue !== initialValueRef.current
      });
      setIsOpen(false);
    },
    [onClose, setIsOpen, value, alwaysReturnCurrentValueOnClose]
  );
  const open = useCallback(() => {
    setIsOpen(true);
    initialValueRef.current = props.value;
  }, [props.value, setIsOpen]);
  useLayoutEffect(() => {
    if ((triggerRef == null ? void 0 : triggerRef.current) && refs.reference.current !== triggerRef.current) {
      reference(triggerRef.current);
    }
  }, [reference, triggerRef == null ? void 0 : triggerRef.current, refs]);
  const dialogProps = useMemo(() => {
    return {
      "aria-labelledby": labelId,
      "aria-describedby": descriptionId
    };
  }, [labelId, descriptionId]);
  let Overlay;
  if (type === "modal") {
    Overlay = Modal;
  } else if (type === "tray") {
    Overlay = Tray;
  } else {
    Overlay = Popover;
  }
  const contextValue = useMemo(() => {
    return {
      dialogProps,
      type,
      labelId,
      descriptionId,
      isDismissable,
      close,
      value,
      initialValue: initialValueRef.current,
      setValue,
      formId
    };
  }, [
    close,
    descriptionId,
    dialogProps,
    formId,
    labelId,
    type,
    isDismissable,
    value,
    setValue
  ]);
  triggerOnHover = triggerOnHover && type === "popover";
  const handleTriggerHover = {
    onPointerEnter: createEventHandler((e) => {
      open();
    }),
    onPointerLeave: createEventHandler((e) => {
      hoverTimeoutRef.current = setTimeout(() => {
        close();
      }, 150);
    })
  };
  const handleFloatingHover = {
    onPointerEnter: createEventHandler((e) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }),
    onPointerLeave: createEventHandler((e) => {
      close();
    })
  };
  const handleTriggerContextMenu = {
    onContextMenu: createEventHandler((e) => {
      e.preventDefault();
      contextMenuTriggerRef.current = pointToVirtualElement(
        { x: e.clientX, y: e.clientY },
        e.currentTarget
      );
      open();
    })
  };
  const triggerClickHandler = {
    onClick: createEventHandler((e) => {
      e.stopPropagation();
      if (isOpen) {
        close();
      } else {
        open();
      }
    })
  };
  const { dialogTrigger, dialog } = extractChildren(children, contextValue);
  const dialogContent = /* @__PURE__ */ jsx(AnimatePresence, { initial: !disableInitialTransition, children: isOpen && /* @__PURE__ */ jsx(DialogContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    Overlay,
    {
      ...triggerOnHover ? handleFloatingHover : {},
      ref: refs.setFloating,
      triggerRef: refs.reference,
      style: floatingStyle,
      restoreFocus: returnFocusToTrigger,
      autoFocus: moveFocusToDialog,
      isOpen,
      onClose: close,
      isDismissable,
      isContextMenu: triggerOnContextMenu,
      placement: props.placement,
      children: dialog
    }
  ) }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    dialogTrigger && cloneElement(
      dialogTrigger,
      mergeProps(
        {
          // make sure ref specified on trigger element is not overwritten
          ...!triggerRef && !triggerOnContextMenu ? { ref: reference } : {},
          ...!triggerOnContextMenu && handleTriggerClick ? triggerClickHandler : {},
          ...triggerOnHover ? handleTriggerHover : {},
          ...triggerOnContextMenu ? handleTriggerContextMenu : {}
        },
        {
          ...dialogTrigger.props
        }
      )
    ),
    usePortal ? rootEl && createPortal(dialogContent, rootEl) : dialogContent
  ] });
}
function extractChildren(rawChildren, ctx) {
  const children = Array.isArray(rawChildren) ? rawChildren : Children.toArray(rawChildren);
  let dialog = children.length === 2 ? children[1] : children[0];
  dialog = typeof dialog === "function" ? dialog(ctx) : dialog;
  if (children.length === 2) {
    return {
      dialogTrigger: children[0],
      dialog
    };
  }
  return { dialog };
}
function Badge({
  children,
  className,
  withBorder = true,
  top = "top-2",
  right = "right-4",
  color = "bg-warning text-white"
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "absolute flex items-center justify-center whitespace-nowrap rounded-full text-[11px] font-bold shadow",
        withBorder && "border-2 border-white",
        color,
        children ? "w-max p-4 leading-[0.6]" : "h-12 w-12",
        className,
        top,
        right
      ),
      children
    }
  );
}
const DoneAllIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z" }),
  "DoneAllOutlined"
);
function IllustratedMessage({
  image,
  title,
  description,
  action,
  className,
  size: size2 = "md",
  imageHeight,
  imageMargin = "mb-24"
}) {
  const style = getSizeClassName(size2, imageHeight);
  return /* @__PURE__ */ jsxs("div", { className: clsx("text-center", className), children: [
    image && /* @__PURE__ */ jsx("div", { className: clsx(style.image, imageMargin), children: image }),
    title && /* @__PURE__ */ jsx("div", { className: clsx(style.title, "mb-2 text-main"), children: title }),
    description && /* @__PURE__ */ jsx("div", { className: clsx(style.description, "text-muted"), children: description }),
    action && /* @__PURE__ */ jsx("div", { className: "mt-20", children: action })
  ] });
}
function getSizeClassName(size2, imageHeight) {
  switch (size2) {
    case "xs":
      return {
        image: imageHeight || "h-60",
        title: "text-sm",
        description: "text-xs"
      };
    case "sm":
      return {
        image: imageHeight || "h-80",
        title: "text-base",
        description: "text-sm"
      };
    default:
      return {
        image: imageHeight || "h-128",
        title: "text-lg",
        description: "text-base"
      };
  }
}
const notifySvg = "/assets/notify-d1de4ec3.svg";
function NotificationEmptyStateMessage() {
  const { notif } = useSettings();
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      size: "sm",
      image: /* @__PURE__ */ jsx(SvgImage, { src: notifySvg }),
      title: /* @__PURE__ */ jsx(Trans, { message: "Hang tight!" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Notifications will start showing up here soon." }),
      action: notif.subs.integrated && /* @__PURE__ */ jsx(
        Button,
        {
          elementType: Link,
          variant: "outline",
          to: "/notifications/settings",
          size: "xs",
          color: "primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Notification settings" })
        }
      )
    }
  );
}
const SettingsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" }),
  "SettingsOutlined"
);
function NotificationDialogTrigger({
  className
}) {
  const { user } = useAuth();
  const { notif } = useSettings();
  const query = useUserNotifications();
  const markAsRead = useMarkNotificationsAsRead();
  const hasUnread = !!(user == null ? void 0 : user.unread_notifications_count);
  const handleMarkAsRead = () => {
    if (!query.data)
      return;
    markAsRead.mutate({
      markAllAsUnread: true
    });
  };
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className,
        badge: hasUnread ? /* @__PURE__ */ jsx(Badge, { className: "max-md:hidden", children: user == null ? void 0 : user.unread_notifications_count }) : void 0,
        children: /* @__PURE__ */ jsx(NotificationsIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { children: [
      /* @__PURE__ */ jsx(
        DialogHeader,
        {
          showDivider: true,
          actions: !hasUnread && notif.subs.integrated && /* @__PURE__ */ jsx(
            IconButton,
            {
              className: "text-muted",
              size: "sm",
              elementType: Link,
              to: "/notifications/settings",
              target: "_blank",
              children: /* @__PURE__ */ jsx(SettingsIcon, {})
            }
          ),
          rightAdornment: hasUnread && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              color: "primary",
              size: "xs",
              startIcon: /* @__PURE__ */ jsx(DoneAllIcon, {}),
              onClick: handleMarkAsRead,
              disabled: markAsRead.isPending,
              className: "max-md:hidden",
              children: /* @__PURE__ */ jsx(Trans, { message: "Mark all as read" })
            }
          ),
          children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" })
        }
      ),
      /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(DialogContent, {}) })
    ] })
  ] });
}
function DialogContent() {
  const { data, isLoading } = useUserNotifications();
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-24 py-20", children: /* @__PURE__ */ jsx(ProgressCircle, { "aria-label": "Loading notifications...", isIndeterminate: true }) });
  }
  if (!(data == null ? void 0 : data.pagination.data.length)) {
    return /* @__PURE__ */ jsx("div", { className: "px-24 py-20", children: /* @__PURE__ */ jsx(NotificationEmptyStateMessage, {}) });
  }
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NotificationList, { notifications: data.pagination.data }) });
}
const MenuIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }),
  "MenuOutlined"
);
const PersonIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }),
  "PersonOutlined"
);
const ArrowDropDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m7 10 5 5 5-5H7z" }),
  "ArrowDropDownOutlined"
);
const PaymentsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" }),
  "PaymentsOutlined"
);
const AccountCircleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" }),
  "AccountCircleOutlined"
);
const LightModeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" }),
  "LightModeOutlined"
);
const ExitToAppIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }),
  "ExitToAppOutlined"
);
function NavbarAuthMenu({ children, items }) {
  const { auth } = useContext(SiteConfigContext);
  const logout2 = useLogout();
  const menu = useCustomMenu("auth-dropdown");
  const { notifications, themes } = useSettings();
  const { user, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const { selectedTheme, selectTheme } = useThemeSelector();
  if (!selectedTheme || !user)
    return null;
  const hasUnreadNotif = !!user.unread_notifications_count;
  const notifMenuItem = /* @__PURE__ */ jsxs(
    Item$1,
    {
      className: "md:hidden",
      value: "notifications",
      startIcon: /* @__PURE__ */ jsx(NotificationsIcon, {}),
      onSelected: () => {
        navigate("/notifications");
      },
      children: [
        /* @__PURE__ */ jsx(Trans, { message: "Notifications" }),
        hasUnreadNotif ? ` (${user.unread_notifications_count})` : void 0
      ]
    }
  );
  const billingMenuItem = /* @__PURE__ */ jsx(
    Item$1,
    {
      value: "billing",
      startIcon: /* @__PURE__ */ jsx(PaymentsIcon, {}),
      onSelected: () => {
        navigate("/billing");
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Billing" })
    }
  );
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    children,
    /* @__PURE__ */ jsxs(Menu, { children: [
      menu && menu.items.map((item) => {
        const Icon = item.icon && createSvgIconFromTree(item.icon);
        return /* @__PURE__ */ jsx(
          Item$1,
          {
            value: item.id,
            startIcon: Icon && /* @__PURE__ */ jsx(Icon, {}),
            onSelected: () => {
              if (item.type === "link") {
                window.open(item.action, "_blank");
              } else {
                navigate(item.action);
              }
            },
            children: /* @__PURE__ */ jsx(Trans, { message: item.label })
          },
          item.id
        );
      }),
      auth.getUserProfileLink && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "profile",
          startIcon: /* @__PURE__ */ jsx(AccountCircleIcon, {}),
          onSelected: () => {
            navigate(auth.getUserProfileLink(user));
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Profile page" })
        }
      ),
      items == null ? void 0 : items.map((item) => item),
      (notifications == null ? void 0 : notifications.integrated) ? notifMenuItem : void 0,
      isSubscribed && billingMenuItem,
      (themes == null ? void 0 : themes.user_change) && !selectedTheme.is_dark && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "light",
          startIcon: /* @__PURE__ */ jsx(DarkModeIcon, {}),
          onSelected: () => {
            selectTheme("dark");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Dark mode" })
        }
      ),
      (themes == null ? void 0 : themes.user_change) && selectedTheme.is_dark && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "dark",
          startIcon: /* @__PURE__ */ jsx(LightModeIcon, {}),
          onSelected: () => {
            selectTheme("light");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Light mode" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "logout",
          startIcon: /* @__PURE__ */ jsx(ExitToAppIcon, {}),
          onSelected: () => {
            logout2.mutate();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Log out" })
        }
      )
    ] })
  ] });
}
function NavbarAuthUser({ items = [] }) {
  const { user } = useAuth();
  const { selectedTheme } = useThemeSelector();
  if (!selectedTheme || !user)
    return null;
  const hasUnreadNotif = !!user.unread_notifications_count;
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "md",
      className: "md:hidden",
      role: "presentation",
      "aria-label": "toggle authentication menu",
      badge: hasUnreadNotif ? /* @__PURE__ */ jsx(Badge, { children: user.unread_notifications_count }) : void 0,
      children: /* @__PURE__ */ jsx(PersonIcon, {})
    }
  );
  const desktopButton = /* @__PURE__ */ jsxs(ButtonBase, { className: "flex items-center max-md:hidden", role: "presentation", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "mr-12 h-32 w-32 flex-shrink-0 rounded object-cover",
        src: user.avatar,
        alt: ""
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "mr-2 block max-w-124 overflow-x-hidden overflow-ellipsis text-sm", children: user.display_name }),
    /* @__PURE__ */ jsx(ArrowDropDownIcon, { className: "block icon-sm" })
  ] });
  return /* @__PURE__ */ jsx(NavbarAuthMenu, { items, children: /* @__PURE__ */ jsxs("span", { role: "button", children: [
    mobileButton,
    desktopButton
  ] }) });
}
function NavbarAuthButtons({
  primaryButtonColor,
  navbarColor
}) {
  if (!primaryButtonColor) {
    primaryButtonColor = navbarColor === "primary" ? "paper" : "primary";
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MobileButtons, {}),
    /* @__PURE__ */ jsx(DesktopButtons, { primaryButtonColor })
  ] });
}
function DesktopButtons({ primaryButtonColor }) {
  const { registration } = useSettings();
  return /* @__PURE__ */ jsxs("div", { className: "text-sm max-md:hidden", children: [
    !registration.disable && /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: "/register",
        variant: "text",
        className: "mr-10",
        children: /* @__PURE__ */ jsx(Trans, { message: "Register" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: "/login",
        variant: "raised",
        color: primaryButtonColor,
        children: /* @__PURE__ */ jsx(Trans, { message: "Login" })
      }
    )
  ] });
}
function MobileButtons() {
  const { registration } = useSettings();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { size: "md", className: "md:hidden", children: /* @__PURE__ */ jsx(PersonIcon, {}) }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(Item$1, { value: "login", onSelected: () => navigate("/login"), children: /* @__PURE__ */ jsx(Trans, { message: "Login" }) }),
      !registration.disable && /* @__PURE__ */ jsx(Item$1, { value: "register", onSelected: () => navigate("/register"), children: /* @__PURE__ */ jsx(Trans, { message: "Register" }) })
    ] })
  ] });
}
function useDarkThemeVariables() {
  var _a;
  const data = useBootstrapDataStore((s) => s.data);
  const isDarkMode = useIsDarkMode();
  if (isDarkMode) {
    return void 0;
  }
  return (_a = data.themes.all.find((theme) => theme.is_dark && theme.default_dark)) == null ? void 0 : _a.values;
}
function Logo({ color, logoColor, isDarkMode, className }) {
  const { trans } = useTrans();
  const { branding } = useSettings();
  let desktopLogo;
  let mobileLogo;
  if (isDarkMode || !branding.logo_dark || logoColor !== "dark" && color !== "bg" && color !== "bg-alt") {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }
  if (!mobileLogo && !desktopLogo) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: clsx(
        "mr-4 block h-full max-h-26 flex-shrink-0 md:mr-24 md:max-h-36",
        className
      ),
      "aria-label": trans({ message: "Go to homepage" }),
      children: /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx("source", { srcSet: mobileLogo || desktopLogo, media: "(max-width: 768px)" }),
        /* @__PURE__ */ jsx("source", { srcSet: desktopLogo, media: "(min-width: 768px)" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "block h-full max-h-26 w-auto md:max-h-36",
            alt: trans({ message: "Site logo" })
          }
        )
      ] })
    }
  );
}
function useLightThemeVariables() {
  var _a;
  const data = useBootstrapDataStore((s) => s.data);
  return (_a = data.themes.all.find((theme) => !theme.is_dark && theme.default_light)) == null ? void 0 : _a.values;
}
function Navbar(props) {
  let {
    hideLogo,
    toggleButton,
    children,
    className,
    border,
    size: size2 = "md",
    color,
    textColor,
    darkModeColor,
    rightChildren,
    menuPosition,
    logoColor,
    primaryButtonColor,
    authMenuItems,
    alwaysDarkMode = false,
    wrapInContainer = false
  } = props;
  const isDarkMode = useIsDarkMode() || alwaysDarkMode;
  const { notifications } = useSettings();
  const { isLoggedIn } = useAuth();
  const darkThemeVars = useDarkThemeVariables();
  const lightThemeVars = useLightThemeVariables();
  const showNotifButton = isLoggedIn && (notifications == null ? void 0 : notifications.integrated);
  color = color ?? (lightThemeVars == null ? void 0 : lightThemeVars["--be-navbar-color"]) ?? "primary";
  darkModeColor = darkModeColor ?? (darkThemeVars == null ? void 0 : darkThemeVars["--be-navbar-color"]) ?? "bg-alt";
  if (isDarkMode) {
    color = darkModeColor;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: alwaysDarkMode ? darkThemeVars : void 0,
      className: clsx(
        getColorStyle(color, textColor),
        size2 === "md" && "h-64 py-8",
        size2 === "sm" && "h-54 py-4",
        size2 === "xs" && "h-48 py-4",
        border,
        className
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "flex h-full items-center justify-end gap-10 pl-14 pr-8 md:pl-20 md:pr-20",
            wrapInContainer && "container mx-auto"
          ),
          children: [
            !hideLogo && /* @__PURE__ */ jsx(Logo, { isDarkMode, color, logoColor }),
            toggleButton,
            children,
            /* @__PURE__ */ jsx(MobileMenu, { position: menuPosition }),
            /* @__PURE__ */ jsx(DesktopMenu, { position: menuPosition }),
            /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-4 md:gap-14", children: [
              rightChildren,
              showNotifButton && /* @__PURE__ */ jsx(NotificationDialogTrigger, {}),
              isLoggedIn ? /* @__PURE__ */ jsx(NavbarAuthUser, { items: authMenuItems }) : /* @__PURE__ */ jsx(
                NavbarAuthButtons,
                {
                  navbarColor: color,
                  primaryButtonColor
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function DesktopMenu({ position }) {
  return /* @__PURE__ */ jsx(
    CustomMenu,
    {
      className: "mx-14 text-sm max-md:hidden",
      itemClassName: (isActive) => clsx(
        "opacity-90 hover:underline hover:opacity-100",
        isActive && "opacity-100"
      ),
      menu: position
    }
  );
}
function MobileMenu({ position }) {
  const navigate = useNavigate();
  const menu = useCustomMenu(position);
  if (!(menu == null ? void 0 : menu.items.length)) {
    return null;
  }
  const handleItemClick = (item) => {
    var _a;
    if (isAbsoluteUrl(item.action)) {
      (_a = window.open(item.action, item.target)) == null ? void 0 : _a.focus();
    } else {
      navigate(item.action);
    }
  };
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { className: "md:hidden", "aria-label": "Toggle menu", children: /* @__PURE__ */ jsx(MenuIcon, {}) }),
    /* @__PURE__ */ jsx(Menu, { children: menu.items.map((item) => {
      const Icon = item.icon && createSvgIconFromTree(item.icon);
      return /* @__PURE__ */ jsx(
        Item$1,
        {
          value: item.action,
          onSelected: () => handleItemClick(item),
          startIcon: Icon && /* @__PURE__ */ jsx(Icon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: item.label })
        },
        item.id
      );
    }) })
  ] });
}
function getColorStyle(color, textColor) {
  switch (color) {
    case "primary":
      return `bg-primary ${textColor || "text-on-primary"} border-b-primary`;
    case "bg":
      return `bg ${textColor || "text-main"} border-b`;
    case "bg-alt":
      return `bg-alt ${textColor || "text-main"} border-b`;
    case "transparent":
      return `bg-transparent ${textColor || "text-white"}`;
    default:
      return `${color} ${textColor}`;
  }
}
function LandingPage() {
  var _a, _b, _c;
  const settings = useSettings();
  const appearance = (_a = settings.homepage) == null ? void 0 : _a.appearance;
  const showPricing = ((_b = settings.homepage) == null ? void 0 : _b.pricing) && settings.billing.enable;
  const showTrending = (_c = settings.homepage) == null ? void 0 : _c.trending;
  if (!appearance) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DefaultMetaTags, {}),
    /* @__PURE__ */ jsx(HeroHeader, { content: appearance }),
    /* @__PURE__ */ jsx(PrimaryFeatures, { content: appearance }),
    /* @__PURE__ */ jsx(SecondaryFeatures, { content: appearance }),
    showTrending && /* @__PURE__ */ jsx(LandingPageTrendingTitles, {}),
    /* @__PURE__ */ jsx(BottomCta, { content: appearance }),
    showPricing && /* @__PURE__ */ jsx(PricingSection, { content: appearance }),
    /* @__PURE__ */ jsx(Footer, { className: "landing-container" })
  ] });
}
function HeroHeader({ content }) {
  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2,
    blurHeaderImage
  } = content;
  let overlayBackground = void 0;
  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }
  return /* @__PURE__ */ jsxs("header", { className: "relative isolate mb-14 overflow-hidden md:mb-60", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: headerImage,
        style: {
          opacity: headerImageOpacity
        },
        alt: "",
        width: "2347",
        height: "1244",
        decoding: "async",
        loading: "lazy",
        className: clsx(
          "absolute left-1/2 top-1/2 z-20 max-w-none -translate-x-1/2 -translate-y-1/2",
          blurHeaderImage && "blur-sm"
        )
      }
    ),
    overlayBackground && /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute z-10 h-full w-full bg-alt",
        style: { background: overlayBackground }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "gradient absolute inset-0 z-30 m-auto" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-30 flex h-full flex-col", children: [
      /* @__PURE__ */ jsx(
        Navbar,
        {
          color: "transparent",
          darkModeColor: "transparent",
          className: "flex-shrink-0",
          menuPosition: "landing-page-navbar",
          primaryButtonColor: "white"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-850 flex-auto flex-col items-center justify-center px-14 py-50 text-center text-white lg:py-140", children: [
        headerTitle && /* @__PURE__ */ jsx(
          "h1",
          {
            className: "text-3xl font-normal md:text-5xl",
            "data-testid": "headerTitle",
            children: /* @__PURE__ */ jsx(Trans, { message: headerTitle })
          }
        ),
        headerSubtitle && /* @__PURE__ */ jsx(
          "div",
          {
            className: "max-auto mt-24 max-w-640 text-lg tracking-tight md:text-xl",
            "data-testid": "headerSubtitle",
            children: /* @__PURE__ */ jsx(Trans, { message: headerSubtitle })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex min-h-50 gap-20 pb-30 pt-40 empty:min-h-0 md:pb-50 md:pt-60", children: [
          /* @__PURE__ */ jsx(
            CtaButton,
            {
              item: actions.cta1,
              variant: "raised",
              color: "white",
              size: "lg",
              radius: "rounded-full",
              className: "min-w-180"
            }
          ),
          /* @__PURE__ */ jsx(
            CtaButton,
            {
              item: actions.cta2,
              variant: "text",
              color: "paper",
              size: "lg",
              radius: "rounded-full"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 z-20 h-[6vw] w-full translate-y-1/2 -skew-y-3 transform bg" })
  ] });
}
function CtaButton({ item, ...buttonProps }) {
  if (!(item == null ? void 0 : item.label) || !(item == null ? void 0 : item.action))
    return null;
  const Icon = item.icon ? createSvgIconFromTree(item.icon) : void 0;
  return /* @__PURE__ */ jsx(
    Button,
    {
      elementType: item.type === "route" ? Link : "a",
      href: item.action,
      to: item.action,
      startIcon: Icon ? /* @__PURE__ */ jsx(Icon, {}) : void 0,
      ...buttonProps,
      children: /* @__PURE__ */ jsx(Trans, { message: item.label })
    }
  );
}
function PrimaryFeatures({ content }) {
  var _a;
  if (!((_a = content.primaryFeatures) == null ? void 0 : _a.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "landing-container z-20 items-stretch gap-26 md:flex",
        id: "primary-features",
        children: content.primaryFeatures.map((feature, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "mb-14 flex-1 rounded-2xl px-24 py-36 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:bg-alt md:mb-0",
            "data-testid": `primary-root-${index}`,
            children: [
              /* @__PURE__ */ jsx(
                MixedImage,
                {
                  className: "mx-auto mb-30 h-128",
                  "data-testid": `primary-image-${index}`,
                  src: feature.image
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "my-16 text-lg font-medium",
                  "data-testid": `primary-title-${index}`,
                  children: /* @__PURE__ */ jsx(Trans, { message: feature.title })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-md text-[0.938rem]",
                  "data-testid": `primary-subtitle-${index}`,
                  children: /* @__PURE__ */ jsx(Trans, { message: feature.subtitle })
                }
              )
            ]
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-100 h-1 bg-divider" })
  ] });
}
function SecondaryFeatures({ content }) {
  var _a;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "relative overflow-hidden",
        ((_a = content.primaryFeatures) == null ? void 0 : _a.length) && "pt-100"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "landing-container relative", id: "features", children: content.secondaryFeatures.map((feature, index) => {
        const isEven = index % 2 === 0;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            "data-testid": `secondary-root-${index}`,
            className: clsx(
              "relative z-20 mb-14 py-16 md:mb-80 md:flex",
              isEven && "flex-row-reverse"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: feature.image,
                  className: "mr-auto aspect-[600/382] w-580 max-w-full rounded-lg shadow-lg dark:border",
                  alt: ""
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "ml-30 mr-auto max-w-350 pt-30", children: [
                /* @__PURE__ */ jsx(
                  "small",
                  {
                    className: "mb-16 text-xs font-medium uppercase tracking-widest text-muted",
                    "data-testid": `secondary-subtitle-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.subtitle })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: "py-16 text-3xl",
                    "data-testid": `secondary-title-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.title })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "h-2 w-50 bg-black/90 dark:bg-divider" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "my-20 text-[0.938rem]",
                    "data-testid": `secondary-description-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.description })
                  }
                )
              ] })
            ]
          },
          index
        );
      }) })
    }
  );
}
function PricingSection({ content }) {
  var _a;
  const query = useProducts("landingPage");
  const [selectedCycle, setSelectedCycle] = useState("yearly");
  return /* @__PURE__ */ jsx("div", { className: "py-80 sm:py-128", id: "pricing", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-1280 px-24 lg:px-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      content.pricingTitle && /* @__PURE__ */ jsx(
        "h2",
        {
          className: "font-display text-3xl tracking-tight sm:text-4xl",
          "data-testid": "pricingTitle",
          children: /* @__PURE__ */ jsx(Trans, { message: content.pricingTitle })
        }
      ),
      content.pricingSubtitle && /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-16 text-lg text-muted",
          "data-testid": "pricingSubtitle",
          children: /* @__PURE__ */ jsx(Trans, { message: content.pricingSubtitle })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      BillingCycleRadio,
      {
        products: (_a = query.data) == null ? void 0 : _a.products,
        selectedCycle,
        onChange: setSelectedCycle,
        className: "my-50 flex justify-center",
        size: "lg"
      }
    ),
    /* @__PURE__ */ jsx(
      PricingTable,
      {
        selectedCycle,
        productLoader: "landingPage"
      }
    )
  ] }) });
}
function BottomCta({
  content: { footerSubtitle, footerImage, footerTitle, actions }
}) {
  if (!footerTitle && !footerSubtitle) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative overflow-hidden bg-black py-90 text-white before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black before:to-transparent md:py-128",
      "data-testid": "footerImage",
      children: [
        footerImage && /* @__PURE__ */ jsx(
          "img",
          {
            draggable: false,
            src: footerImage,
            alt: "",
            width: "2347",
            height: "1244",
            decoding: "async",
            loading: "lazy",
            className: "absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur-sm"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-20 mx-auto max-w-1280 px-24 text-center sm:px-16 lg:px-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-512 text-center", children: [
          footerTitle && /* @__PURE__ */ jsx(
            "h2",
            {
              className: " font-display text-3xl tracking-tight sm:text-4xl",
              "data-testid": "footerTitle",
              children: /* @__PURE__ */ jsx(Trans, { message: footerTitle })
            }
          ),
          footerSubtitle && /* @__PURE__ */ jsx(
            "p",
            {
              className: "mt-16 text-lg tracking-tight",
              "data-testid": "footerSubtitle",
              children: /* @__PURE__ */ jsx(Trans, { message: footerSubtitle })
            }
          ),
          /* @__PURE__ */ jsx(
            CtaButton,
            {
              item: actions.cta3,
              size: "lg",
              radius: "rounded-full",
              variant: "flat",
              color: "white",
              className: "mt-40 block",
              "data-testid": "cta3"
            }
          )
        ] }) })
      ]
    }
  );
}
const LinkStyle = "text-link hover:underline hover:text-primary-dark focus-visible:ring focus-visible:ring-2 focus-visible:ring-offset-2 outline-none rounded transition-colors";
function ExternalLink({
  children,
  className,
  target = "_blank",
  ...domProps
}) {
  return /* @__PURE__ */ jsx("a", { className: LinkStyle, target, ...domProps, children });
}
function useRegister(form) {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { inviteId } = useParams();
  return useMutation({
    mutationFn: (payload) => {
      return register({
        invite_id: inviteId,
        ...payload
      });
    },
    onSuccess: (response) => {
      setBootstrapData(response.bootstrapData);
      if (response.status === "needs_email_verification") {
        navigate("/");
      } else {
        navigate(getRedirectUri(), { replace: true });
      }
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function register(payload) {
  return apiClient.post("auth/register", payload).then((response) => response.data);
}
function useConnectSocialWithPassword(form) {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useMutation({
    mutationFn: connect,
    onSuccess: (response) => {
      setBootstrapData(response.bootstrapData);
      navigate(getRedirectUri(), { replace: true });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function connect(payload) {
  return apiClient.post("secure/auth/social/connect", payload).then((response) => response.data);
}
function DialogFooter(props) {
  const { children, startAction, className, dividerTop, padding, size: size2 } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        dividerTop && "border-t",
        getPadding(props),
        "flex items-center gap-10 flex-shrink-0"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { children: startAction }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-10", children })
      ]
    }
  );
}
function getPadding({ padding, size: size2 }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "xs":
      return "p-14";
    case "sm":
      return "p-18";
    default:
      return "px-24 py-20";
  }
}
const EnvatoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 23.898438 47 C 13.65625 47 5.003906 38.355469 5.003906 28.125 L 5.003906 28 C 4.929688 23.074219 6.558594 19.714844 7.261719 18.5 C 8.621094 16.152344 10.296875 14.410156 10.8125 14.136719 C 11.566406 13.734375 12.121094 14.332031 12.363281 14.585938 C 12.832031 15.085938 12.597656 15.695313 12.507813 15.925781 C 11.613281 18.265625 10.929688 20.28125 11.003906 23.097656 C 11.097656 26.90625 12.488281 28.699219 13.085938 29.292969 C 13.460938 29.671875 13.769531 29.847656 14.015625 29.933594 C 14.054688 28.671875 14.203125 26.148438 14.773438 23.304688 C 15.113281 21.589844 16.28125 17.085938 19.6875 12.296875 C 23.714844 6.632813 28.449219 4.273438 29.214844 4.042969 C 30.570313 3.636719 33.535156 3.128906 35.957031 3.019531 C 38.53125 2.910156 39.160156 3.574219 39.921875 5.035156 L 40.046875 5.277344 C 41.820313 8.613281 45.03125 18.832031 43.65625 29.132813 C 42.011719 39.992188 34.257813 47 23.898438 47 Z M 14.648438 30 C 14.640625 30 14.632813 30 14.628906 30 L 14.652344 30 C 14.648438 30 14.648438 30 14.648438 30 Z " })
);
function useAllSocialLoginsDisabled() {
  var _a, _b, _c, _d;
  const { social } = useSettings();
  return !((_a = social == null ? void 0 : social.google) == null ? void 0 : _a.enable) && !((_b = social == null ? void 0 : social.facebook) == null ? void 0 : _b.enable) && !((_c = social == null ? void 0 : social.twitter) == null ? void 0 : _c.enable) && !((_d = social == null ? void 0 : social.envato) == null ? void 0 : _d.enable);
}
function useDisconnectSocial() {
  return useMutation({
    mutationFn: disconnect,
    onError: (err) => showHttpErrorToast(err)
  });
}
function disconnect(payload) {
  return apiClient.post(`secure/auth/social/${payload.service}/disconnect`, payload).then((response) => response.data);
}
function useSocialLogin() {
  const { trans } = useTrans();
  const disconnectSocial = useDisconnectSocial();
  const [requestingPassword, setIsRequestingPassword] = useState(false);
  const handleSocialLoginCallback = useCallback(
    (e) => {
      const { status, callbackData } = e;
      if (!status)
        return;
      switch (status.toUpperCase()) {
        case "SUCCESS":
          if (callbackData == null ? void 0 : callbackData.bootstrapData) {
            setBootstrapData(callbackData.bootstrapData);
          }
          return e;
        case "REQUEST_PASSWORD":
          setIsRequestingPassword(true);
          return e;
        case "ERROR":
          const message2 = (callbackData == null ? void 0 : callbackData.errorMessage) || trans({
            message: "An error occurred. Please try again later"
          });
          toast.danger(message2);
          return e;
        default:
          return e;
      }
    },
    [trans, setBootstrapData]
  );
  return {
    requestingPassword,
    setIsRequestingPassword,
    loginWithSocial: async (serviceName) => {
      const event = await openNewSocialAuthWindow(
        `secure/auth/social/${serviceName}/login`
      );
      return handleSocialLoginCallback(event);
    },
    connectSocial: async (serviceNameOrUrl) => {
      const url = serviceNameOrUrl.includes("/") ? serviceNameOrUrl : `secure/auth/social/${serviceNameOrUrl}/connect`;
      const event = await openNewSocialAuthWindow(url);
      return handleSocialLoginCallback(event);
    },
    disconnectSocial
  };
}
const windowHeight = 550;
const windowWidth = 650;
let win;
function openNewSocialAuthWindow(url) {
  const left = window.screen.width / 2 - windowWidth / 2;
  const top = window.screen.height / 2 - windowHeight / 2;
  return new Promise((resolve) => {
    win = window.open(
      url,
      "Authenticate Account",
      `menubar=0, location=0, toolbar=0, titlebar=0, status=0, scrollbars=1, width=${windowWidth}, height=${windowHeight}, left=${left}, top=${top}`
    );
    const messageListener = (e) => {
      const baseUrl = getBootstrapData().settings.base_url;
      if (e.data.type === "social-auth" && baseUrl.indexOf(e.origin) > -1) {
        resolve(e.data);
        window.removeEventListener("message", messageListener);
      }
    };
    window.addEventListener("message", messageListener);
    const timer = setInterval(() => {
      if (!win || win.closed) {
        clearInterval(timer);
        resolve({});
        window.removeEventListener("message", messageListener);
      }
    }, 1e3);
  });
}
const GoogleIcon = createSvgIcon(
  /* @__PURE__ */ jsxs("g", { children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#EA4335",
        d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#4285F4",
        d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#FBBC05",
        d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#34A853",
        d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      }
    ),
    /* @__PURE__ */ jsx("path", { fill: "none", d: "M0 0h48v48H0z" })
  ] })
);
const FacebookIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" }),
  "FacebookIcon",
  "0 0 48 48"
);
const TwitterIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" }),
  "TwitterIcon"
);
const googleLabel = message("Continue with google");
const facebookLabel = message("Continue with facebook");
const twitterLabel = message("Continue with twitter");
const envatoLabel = message("Continue with envato");
function SocialAuthSection({ dividerMessage }) {
  var _a, _b, _c, _d;
  const { social } = useSettings();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { loginWithSocial, requestingPassword, setIsRequestingPassword } = useSocialLogin();
  if (useAllSocialLoginsDisabled()) {
    return null;
  }
  const handleSocialLogin = async (service) => {
    const e = await loginWithSocial(service);
    if ((e == null ? void 0 : e.status) === "SUCCESS" || (e == null ? void 0 : e.status) === "ALREADY_LOGGED_IN") {
      navigate(getRedirectUri(), { replace: true });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "relative my-20 text-center before:absolute before:left-0 before:top-1/2 before:h-1 before:w-full before:-translate-y-1/2 before:bg-divider", children: /* @__PURE__ */ jsx("span", { className: "relative z-10 bg-paper px-10 text-sm text-muted", children: dividerMessage }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "flex items-center justify-center gap-14",
          !social.compact_buttons && "flex-col"
        ),
        children: [
          ((_a = social == null ? void 0 : social.google) == null ? void 0 : _a.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: googleLabel,
              icon: /* @__PURE__ */ jsx(GoogleIcon, { viewBox: "0 0 48 48" }),
              onClick: () => handleSocialLogin("google")
            }
          ) : null,
          ((_b = social == null ? void 0 : social.facebook) == null ? void 0 : _b.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: facebookLabel,
              icon: /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
              onClick: () => handleSocialLogin("facebook")
            }
          ) : null,
          ((_c = social == null ? void 0 : social.twitter) == null ? void 0 : _c.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: twitterLabel,
              icon: /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }),
              onClick: () => handleSocialLogin("twitter")
            }
          ) : null,
          ((_d = social == null ? void 0 : social.envato) == null ? void 0 : _d.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: envatoLabel,
              icon: /* @__PURE__ */ jsx(EnvatoIcon, { viewBox: "0 0 50 50", className: "text-envato" }),
              onClick: () => handleSocialLogin("envato")
            }
          ) : null
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: requestingPassword,
        onOpenChange: setIsRequestingPassword,
        children: /* @__PURE__ */ jsx(RequestPasswordDialog, {})
      }
    )
  ] });
}
function RequestPasswordDialog() {
  const form = useForm();
  const { formId } = useDialogContext();
  const connect2 = useConnectSocialWithPassword(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Password required" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-30 text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "An account with this email address already exists. If you want to connect the two accounts, enter existing account password." }) }),
      /* @__PURE__ */ jsx(
        Form,
        {
          form,
          id: formId,
          onSubmit: (payload) => {
            connect2.mutate(payload);
          },
          children: /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              name: "password",
              type: "password",
              required: true,
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" })
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: connect2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Connect" })
        }
      )
    ] })
  ] });
}
function SocialLoginButton({ onClick, label, icon }) {
  const { trans } = useTrans();
  const {
    social: { compact_buttons }
  } = useSettings();
  if (compact_buttons) {
    return /* @__PURE__ */ jsx(IconButton, { variant: "outline", "aria-label": trans(label), onClick, children: icon });
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      startIcon: icon,
      onClick,
      className: "min-h-42 w-full",
      children: /* @__PURE__ */ jsx("span", { className: "min-w-160 text-start", children: /* @__PURE__ */ jsx(Trans, { ...label }) })
    }
  );
}
function AuthLayoutFooter() {
  const { branding } = useSettings();
  return /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-30 pb-32 pt-42 text-sm text-muted", children: [
    /* @__PURE__ */ jsxs(Link, { className: "transition-colors hover:text-fg-base", to: "/", children: [
      "© ",
      branding.site_name
    ] }),
    /* @__PURE__ */ jsx(
      CustomMenu,
      {
        menu: "auth-page-footer",
        orientation: "horizontal",
        itemClassName: "hover:text-fg-base transition-colors"
      }
    )
  ] });
}
const authBgSvg = "/assets/auth-bg-8529ec0e.svg";
function AuthLayout({ heading, children, message: message2 }) {
  const { branding } = useSettings();
  const isDarkMode = useIsDarkMode();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    "main",
    {
      className: "flex h-screen flex-col items-center overflow-y-auto bg-alt px-14 pt-70 dark:bg-none md:px-10vw",
      style: { backgroundImage: isDarkMode ? void 0 : `url("${authBgSvg}")` },
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "mb-40 block flex-shrink-0",
            "aria-label": trans({ message: "Go to homepage" }),
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: isDarkMode ? branding.logo_light : branding == null ? void 0 : branding.logo_dark,
                className: "m-auto block h-42 w-auto",
                alt: ""
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-440 rounded-lg bg px-40 pb-32 pt-40 shadow md:shadow-xl", children: [
          heading && /* @__PURE__ */ jsx("h1", { className: "mb-20 text-xl", children: heading }),
          children
        ] }),
        message2 && /* @__PURE__ */ jsx("div", { className: "mt-36 text-sm", children: message2 }),
        /* @__PURE__ */ jsx(AuthLayoutFooter, {})
      ]
    }
  );
}
const CheckBoxOutlineBlankIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }),
  "CheckBoxOutlineBlankOutlined"
);
const CheckboxFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }),
  "CheckBox"
);
const IndeterminateCheckboxFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z" }),
  "CheckBox"
);
const Checkbox = forwardRef(
  (props, ref) => {
    const {
      size: size2 = "md",
      children,
      className,
      icon,
      checkedIcon,
      disabled,
      isIndeterminate,
      errorMessage,
      invalid,
      orientation = "horizontal",
      onChange,
      autoFocus,
      required,
      value,
      name,
      inputTestId
    } = props;
    const style = getInputFieldClassNames({ ...props, label: children });
    const Icon = icon || CheckBoxOutlineBlankIcon;
    const CheckedIcon = checkedIcon || (isIndeterminate ? IndeterminateCheckboxFilledIcon : CheckboxFilledIcon);
    const inputObjRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputObjRef);
    useEffect(() => {
      if (inputObjRef.current) {
        inputObjRef.current.indeterminate = isIndeterminate || false;
      }
    });
    const [isSelected, setSelected] = useControlledState(
      props.checked,
      props.defaultChecked || false
    );
    const updateChecked = useCallback(
      (e) => {
        onChange == null ? void 0 : onChange(e);
        setSelected(e.target.checked);
      },
      [onChange, setSelected]
    );
    const mergedClassName = clsx(
      "select-none",
      className,
      invalid && "text-danger",
      !invalid && disabled && "text-disabled"
    );
    let CheckboxIcon;
    let checkboxColor = invalid ? "text-danger" : null;
    if (isIndeterminate) {
      CheckboxIcon = IndeterminateCheckboxFilledIcon;
      checkboxColor = checkboxColor || "text-primary";
    } else if (isSelected) {
      CheckboxIcon = CheckedIcon;
      checkboxColor = checkboxColor || "text-primary";
    } else {
      CheckboxIcon = Icon;
      checkboxColor = checkboxColor || "text-muted";
    }
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: mergedClassName, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "relative flex items-center",
            orientation === "vertical" && "flex-col flex-col-reverse"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "absolute left-0 top-0 h-24 w-24 appearance-none overflow-hidden rounded outline-none ring-inset transition-shadow focus-visible:ring",
                type: "checkbox",
                "aria-checked": isIndeterminate ? "mixed" : isSelected,
                "aria-invalid": invalid || void 0,
                onChange: updateChecked,
                ref: inputObjRef,
                required,
                disabled,
                value,
                name,
                "data-testid": inputTestId
              }
            ),
            /* @__PURE__ */ jsx(
              CheckboxIcon,
              {
                size: size2,
                className: clsx(
                  "pointer-events-none",
                  disabled ? "text-disabled" : checkboxColor
                )
              }
            ),
            children && /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "first-letter:capitalize",
                  style.size.font,
                  orientation === "vertical" ? "mb-6" : "ml-6"
                ),
                children
              }
            )
          ]
        }
      ) }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: style.error, children: errorMessage })
    ] });
  }
);
function FormCheckbox(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    checked: value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Checkbox, { ref, ...mergeProps(formProps, props) });
}
function useRecaptcha(action) {
  const { recaptcha: { site_key, enable: enable2 } = {} } = useSettings();
  const enabled = site_key && (enable2 == null ? void 0 : enable2[action]);
  const [isVerifying, setIsVerifying] = useState(false);
  useEffect(() => {
    if (enabled) {
      load(site_key);
    }
  }, [enabled, site_key]);
  const verify = useCallback(async () => {
    if (!enabled)
      return true;
    setIsVerifying(true);
    const isValid = await execute(site_key, action);
    if (!isValid) {
      toast.danger(message("Could not verify you are human."));
    }
    setIsVerifying(false);
    return isValid;
  }, [enabled, site_key, action]);
  return { verify, isVerifying };
}
async function execute(siteKey, action) {
  await load(siteKey);
  return new Promise((resolve) => {
    var _a;
    (_a = window.grecaptcha) == null ? void 0 : _a.ready(async () => {
      var _a2;
      const token = await ((_a2 = window.grecaptcha) == null ? void 0 : _a2.execute(siteKey, { action }));
      const result = apiClient.post("recaptcha/verify", { token }).then((r) => r.data.success).catch(() => false);
      resolve(result ?? false);
    });
  });
}
function load(siteKey) {
  return lazyLoader.loadAsset(
    `https://www.google.com/recaptcha/api.js?render=${siteKey}`,
    { id: "recaptcha-js" }
  );
}
function StaticPageTitle({ children }) {
  const {
    branding: { site_name }
  } = useSettings();
  return /* @__PURE__ */ jsx(Helmet, { children: children ? (
    // @ts-ignore
    /* @__PURE__ */ jsxs("title", { children: [
      children,
      " - ",
      site_name
    ] })
  ) : void 0 });
}
function RegisterPage({ inviteType }) {
  const {
    branding,
    registration: { disable: disable2 },
    social
  } = useSettings();
  const { auth } = useContext(SiteConfigContext);
  const { verify, isVerifying } = useRecaptcha("register");
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isRegisteringUsingInvite = pathname.includes("workspace") || !!inviteType;
  const isBillingRegister = searchParams.get("redirectFrom") === "pricing";
  const searchParamsEmail = searchParams.get("email") || void 0;
  const form = useForm({
    defaultValues: { email: searchParamsEmail }
  });
  const register2 = useRegister(form);
  if (disable2 && !isRegisteringUsingInvite) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  let heading = /* @__PURE__ */ jsx(Trans, { message: "Create a new account" });
  if (isRegisteringUsingInvite) {
    heading = /* @__PURE__ */ jsx(
      Trans,
      {
        values: { siteName: branding == null ? void 0 : branding.site_name },
        message: "To join your team on :siteName, create an account"
      }
    );
  } else if (isBillingRegister) {
    heading = /* @__PURE__ */ jsx(Trans, { message: "First, let's create your account" });
  }
  const message2 = /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/login", children: parts })
      },
      message: "Already have an account? <a>Sign in.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Register" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: async (payload) => {
          const isValid = await verify();
          if (isValid) {
            register2.mutate({
              ...payload,
              invite_type: inviteType
            });
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              disabled: !!searchParamsEmail,
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password_confirmation",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
              required: true
            }
          ),
          (auth == null ? void 0 : auth.registerFields) ? /* @__PURE__ */ jsx(auth.registerFields, {}) : null,
          /* @__PURE__ */ jsx(PolicyCheckboxes, {}),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: register2.isPending || isVerifying,
              children: /* @__PURE__ */ jsx(Trans, { message: "Create account" })
            }
          ),
          /* @__PURE__ */ jsx(
            SocialAuthSection,
            {
              dividerMessage: social.compact_buttons ? /* @__PURE__ */ jsx(Trans, { message: "Or sign up with" }) : /* @__PURE__ */ jsx(Trans, { message: "OR" })
            }
          )
        ]
      }
    )
  ] });
}
function PolicyCheckboxes() {
  const {
    registration: { policies }
  } = useSettings();
  if (!policies)
    return null;
  return /* @__PURE__ */ jsx("div", { className: "mb-32", children: policies.map((policy) => /* @__PURE__ */ jsx(
    FormCheckbox,
    {
      name: policy.id,
      className: "mb-4 block",
      required: true,
      children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "I accept the :name",
          values: {
            name: /* @__PURE__ */ jsx(
              CustomMenuItem,
              {
                unstyled: true,
                className: () => LinkStyle,
                item: policy
              }
            )
          }
        }
      )
    },
    policy.id
  )) });
}
function AccountSettingsPanel({
  id,
  title,
  titleSuffix,
  children,
  actions
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id,
      className: "mb-24 w-full rounded-panel border bg px-24 py-20",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 border-b pb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-light", children: title }),
          titleSuffix && /* @__PURE__ */ jsx("div", { className: "ml-auto", children: titleSuffix })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-24", children }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-36 flex justify-end border-t pt-10", children: actions })
      ]
    }
  );
}
function List({ children, className, padding, dataTestId }) {
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsx(
    "ul",
    {
      "data-testid": dataTestId,
      className: clsx(
        "text-base outline-none sm:text-sm",
        className,
        padding ?? "py-4"
      ),
      children
    }
  ) });
}
const ListItem = forwardRef(
  ({
    children,
    onSelected,
    borderRadius = "rounded",
    className,
    ...listItemProps
  }, ref) => {
    const focusManager = useFocusManager();
    const isSelectable = !!onSelected;
    const [isActive, setIsActive] = useState(false);
    const onKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusPrevious();
          break;
        case "Home":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusFirst();
          break;
        case "End":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusLast();
          break;
        case "Enter":
        case "Space":
          e.preventDefault();
          onSelected == null ? void 0 : onSelected();
          break;
      }
    };
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      ListItemBase,
      {
        className: clsx(className, borderRadius),
        isActive,
        isDisabled: listItemProps.isDisabled,
        ...listItemProps,
        onFocus: (e) => {
          setIsActive(e.target.matches(":focus-visible"));
        },
        onBlur: () => {
          setIsActive(false);
        },
        onClick: () => {
          onSelected == null ? void 0 : onSelected();
        },
        ref,
        role: isSelectable ? "button" : void 0,
        onKeyDown: isSelectable ? onKeyDown : void 0,
        tabIndex: isSelectable && !listItemProps.isDisabled ? 0 : void 0,
        children
      }
    ) });
  }
);
const LoginIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" }),
  "LoginOutlined"
);
const LockIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" }),
  "LockOutlined"
);
const PhonelinkLockIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 1H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-8.2 10V9.5C10.8 8.1 9.4 7 8 7S5.2 8.1 5.2 9.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3zm-1.3 0h-3V9.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3V11z" }),
  "PhonelinkLockOutlined"
);
const ApiIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m14 12-2 2-2-2 2-2 2 2zm-2-6 2.12 2.12 2.5-2.5L12 1 7.38 5.62l2.5 2.5L12 6zm-6 6 2.12-2.12-2.5-2.5L1 12l4.62 4.62 2.5-2.5L6 12zm12 0-2.12 2.12 2.5 2.5L23 12l-4.62-4.62-2.5 2.5L18 12zm-6 6-2.12-2.12-2.5 2.5L12 23l4.62-4.62-2.5-2.5L12 18z" }),
  "ApiOutlined"
);
const DangerousIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8zm-4.17-7.14L12 10.59 9.17 7.76 7.76 9.17 10.59 12l-2.83 2.83 1.41 1.41L12 13.41l2.83 2.83 1.41-1.41L13.41 12l2.83-2.83-1.41-1.41z" }),
  "DangerousOutlined"
);
const DevicesIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" }),
  "DevicesOutlined"
);
var AccountSettingsId = /* @__PURE__ */ ((AccountSettingsId2) => {
  AccountSettingsId2["AccountDetails"] = "account-details";
  AccountSettingsId2["SocialLogin"] = "social-login";
  AccountSettingsId2["Password"] = "password";
  AccountSettingsId2["TwoFactor"] = "two-factor";
  AccountSettingsId2["LocationAndLanguage"] = "location-and-language";
  AccountSettingsId2["Developers"] = "developers";
  AccountSettingsId2["DeleteAccount"] = "delete-account";
  AccountSettingsId2["Sessions"] = "sessions";
  return AccountSettingsId2;
})(AccountSettingsId || {});
function AccountSettingsSidenav() {
  var _a;
  const p = AccountSettingsId;
  const { hasPermission } = useAuth();
  const { api } = useSettings();
  const { auth } = useContext(SiteConfigContext);
  const allSocialsDisabled = useAllSocialLoginsDisabled();
  return /* @__PURE__ */ jsx("aside", { className: "sticky top-10 hidden flex-shrink-0 lg:block", children: /* @__PURE__ */ jsxs(List, { padding: "p-0", children: [
    (_a = auth.accountSettingsPanels) == null ? void 0 : _a.map((panel) => /* @__PURE__ */ jsx(
      Item,
      {
        icon: /* @__PURE__ */ jsx(panel.icon, { viewBox: "0 0 50 50" }),
        panel: panel.id,
        children: /* @__PURE__ */ jsx(Trans, { ...panel.label })
      },
      panel.id
    )),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(PersonIcon, {}), panel: p.AccountDetails, children: /* @__PURE__ */ jsx(Trans, { message: "Account details" }) }),
    !allSocialsDisabled && /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LoginIcon, {}), panel: p.SocialLogin, children: /* @__PURE__ */ jsx(Trans, { message: "Social login" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LockIcon, {}), panel: p.Password, children: /* @__PURE__ */ jsx(Trans, { message: "Password" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(PhonelinkLockIcon, {}), panel: p.TwoFactor, children: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(DevicesIcon, {}), panel: p.Sessions, children: /* @__PURE__ */ jsx(Trans, { message: "Active sessions" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LanguageIcon, {}), panel: p.LocationAndLanguage, children: /* @__PURE__ */ jsx(Trans, { message: "Location and language" }) }),
    (api == null ? void 0 : api.integrated) && hasPermission("api.access") ? /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(ApiIcon, {}), panel: p.Developers, children: /* @__PURE__ */ jsx(Trans, { message: "Developers" }) }) : null,
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(DangerousIcon, {}), panel: p.DeleteAccount, children: /* @__PURE__ */ jsx(Trans, { message: "Delete account" }) })
  ] }) });
}
function Item({ children, icon, isLast, panel }) {
  return /* @__PURE__ */ jsx(
    ListItem,
    {
      startIcon: icon,
      className: isLast ? void 0 : "mb-10",
      onSelected: () => {
        const panelEl = document.querySelector(`#${panel}`);
        if (panelEl) {
          panelEl.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      },
      children
    }
  );
}
function SocialLoginPanel({ user }) {
  if (useAllSocialLoginsDisabled()) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.SocialLogin,
      title: /* @__PURE__ */ jsx(Trans, { message: "Manage social login" }),
      children: [
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(
              EnvatoIcon,
              {
                viewBox: "0 0 50 50",
                className: "border-envato bg-envato text-white"
              }
            ),
            service: "envato",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(GoogleIcon, { viewBox: "0 0 48 48" }),
            service: "google",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
            service: "facebook",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }),
            service: "twitter",
            user
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pb-6 pt-16 text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "If you disable social logins, you'll still be able to log in using your email and password." }) })
      ]
    }
  );
}
function SocialLoginPanelRow({
  service,
  user,
  className,
  icon
}) {
  var _a, _b, _c;
  const { social } = useSettings();
  const { connectSocial, disconnectSocial } = useSocialLogin();
  const username = (_b = (_a = user == null ? void 0 : user.social_profiles) == null ? void 0 : _a.find((s) => s.service_name === service)) == null ? void 0 : _b.username;
  if (!((_c = social == null ? void 0 : social[service]) == null ? void 0 : _c.enable)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center gap-14 border-b px-10 py-20",
        className
      ),
      children: [
        cloneElement(icon, {
          size: "xl",
          className: clsx(icon.props.className, "border p-8 rounded")
        }),
        /* @__PURE__ */ jsxs("div", { className: "mr-auto overflow-hidden text-ellipsis whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis text-sm font-bold first-letter:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: ":service account", values: { service } }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs", children: username || /* @__PURE__ */ jsx(Trans, { message: "Disabled" }) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: disconnectSocial.isPending,
            size: "xs",
            variant: "outline",
            color: username ? "danger" : "primary",
            onClick: async () => {
              if (username) {
                disconnectSocial.mutate(
                  { service },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["users"] });
                      toast(
                        message("Disabled :service account", { values: { service } })
                      );
                    }
                  }
                );
              } else {
                const e = await connectSocial(service);
                if ((e == null ? void 0 : e.status) === "SUCCESS") {
                  queryClient.invalidateQueries({ queryKey: ["users"] });
                  toast(message("Enabled :service account", { values: { service } }));
                }
              }
            },
            children: username ? /* @__PURE__ */ jsx(Trans, { message: "Disable" }) : /* @__PURE__ */ jsx(Trans, { message: "Enable" })
          }
        )
      ]
    }
  );
}
function useUpdateAccountDetails(userId, form) {
  return useMutation({
    mutationFn: (props) => updateAccountDetails(userId, props),
    onSuccess: () => {
      toast(message("Updated account details"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateAccountDetails(userId, payload) {
  return apiClient.put(`users/${userId}`, payload).then((r) => r.data);
}
function UploadAvatar({ file, url }, user) {
  const payload = new FormData();
  if (file) {
    payload.set("file", file.native);
  } else {
    payload.set("url", url);
  }
  return apiClient.post(`users/${user.id}/avatar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((r) => r.data);
}
function useUploadAvatar({ user }) {
  return useMutation({
    mutationFn: (payload) => UploadAvatar(payload, user),
    onSuccess: () => {
      toast(message("Uploaded avatar"));
    },
    onError: (err) => {
      const message2 = getAxiosErrorMessage(err, "file");
      if (message2) {
        toast.danger(message2);
      } else {
        showHttpErrorToast(err);
      }
    }
  });
}
function removeAvatar(user) {
  return apiClient.delete(`users/${user.id}/avatar`).then((r) => r.data);
}
function useRemoveAvatar({ user }) {
  return useMutation({
    mutationFn: () => removeAvatar(user),
    onSuccess: () => {
      toast(message("Removed avatar"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
const oneMB = 1024 * 1024;
const desiredChunkSize = 20 * oneMB;
const batchSize = 10;
const concurrency = 5;
class S3MultipartUpload {
  constructor(file, config) {
    __publicField(this, "abortController");
    __publicField(this, "chunks", []);
    __publicField(this, "uploadId");
    __publicField(this, "fileKey");
    __publicField(this, "chunkAxios");
    __publicField(this, "abortedByUser", false);
    __publicField(this, "uploadedParts");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
    this.chunkAxios = axios.create();
    axiosRetry(this.chunkAxios, { retries: 3 });
  }
  get storageKey() {
    return `s3-multipart::${this.file.fingerprint}`;
  }
  async start() {
    var _a, _b, _c, _d, _e;
    const storedUrl = getFromLocalStorage(this.storageKey);
    if (storedUrl) {
      await this.getUploadedParts(storedUrl);
    }
    if (!((_a = this.uploadedParts) == null ? void 0 : _a.length)) {
      await this.createMultipartUpload();
      if (!this.uploadId)
        return;
    }
    this.prepareChunks();
    const result = await this.uploadParts();
    if (result === "done") {
      const isCompleted = await this.completeMultipartUpload();
      if (!isCompleted)
        return;
      try {
        const response = await this.createFileEntry();
        if (response == null ? void 0 : response.fileEntry) {
          (_c = (_b = this.config).onSuccess) == null ? void 0 : _c.call(_b, response == null ? void 0 : response.fileEntry, this.file);
          removeFromLocalStorage(this.storageKey);
          return;
        }
      } catch {
      }
    }
    if (!this.abortController.signal.aborted) {
      this.abortController.abort();
    }
    if (!this.abortedByUser) {
      (_e = (_d = this.config).onError) == null ? void 0 : _e.call(_d, null, this.file);
    }
  }
  async abort() {
    this.abortedByUser = true;
    this.abortController.abort();
    await this.abortUploadOnS3();
  }
  async uploadParts() {
    const pendingChunks = this.chunks.filter((c) => !c.done);
    if (!pendingChunks.length) {
      return Promise.resolve("done");
    }
    const signedUrls = await this.batchSignUrls(
      pendingChunks.slice(0, batchSize)
    );
    if (!signedUrls)
      return;
    while (signedUrls.length) {
      const batch = signedUrls.splice(0, concurrency);
      const pendingUploads = batch.map((item) => {
        return this.uploadPartToS3(item);
      });
      const result = await Promise.all(pendingUploads);
      if (!result.every((r) => r))
        return;
    }
    return await this.uploadParts();
  }
  async batchSignUrls(batch) {
    const response = await this.chunkAxios.post(
      "api/v1/s3/multipart/batch-sign-part-urls",
      {
        partNumbers: batch.map((i) => i.partNumber),
        uploadId: this.uploadId,
        key: this.fileKey
      },
      { signal: this.abortController.signal }
    ).then((r) => r.data).catch((err) => {
      if (!this.abortController.signal.aborted) {
        this.abortController.abort();
      }
    });
    return response == null ? void 0 : response.urls;
  }
  async uploadPartToS3({
    url,
    partNumber
  }) {
    const chunk = this.chunks.find((c) => c.partNumber === partNumber);
    if (!chunk)
      return;
    return this.chunkAxios.put(url, chunk.blob, {
      withCredentials: false,
      signal: this.abortController.signal,
      onUploadProgress: (e) => {
        var _a, _b;
        if (!e.event.lengthComputable)
          return;
        chunk.bytesUploaded = e.loaded;
        const totalUploaded = this.chunks.reduce(
          (n, c) => n + c.bytesUploaded,
          0
        );
        (_b = (_a = this.config).onProgress) == null ? void 0 : _b.call(_a, {
          bytesUploaded: totalUploaded,
          bytesTotal: this.file.size
        });
      }
    }).then((r) => {
      const etag = r.headers.etag;
      if (etag) {
        chunk.done = true;
        chunk.etag = etag;
        return true;
      }
    }).catch((err) => {
      if (!this.abortController.signal.aborted && err !== void 0) {
        this.abortController.abort();
      }
    });
  }
  async createMultipartUpload() {
    const response = await apiClient.post("s3/multipart/create", {
      filename: this.file.name,
      mime: this.file.mime,
      size: this.file.size,
      extension: this.file.extension,
      ...this.config.metadata
    }).then((r) => r.data).catch((err) => {
      var _a, _b;
      if (err.code !== "ERR_CANCELED") {
        (_b = (_a = this.config).onError) == null ? void 0 : _b.call(_a, getAxiosErrorMessage(err), this.file);
      }
    });
    if (response) {
      this.uploadId = response.uploadId;
      this.fileKey = response.key;
      setInLocalStorage(this.storageKey, {
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        fileKey: this.fileKey,
        uploadId: this.uploadId
      });
    }
  }
  async getUploadedParts({ fileKey, uploadId }) {
    var _a;
    const response = await apiClient.post("s3/multipart/get-uploaded-parts", {
      key: fileKey,
      uploadId
    }).then((r) => r.data).catch(() => {
      removeFromLocalStorage(this.storageKey);
      return null;
    });
    if ((_a = response == null ? void 0 : response.parts) == null ? void 0 : _a.length) {
      this.uploadedParts = response.parts;
      this.uploadId = uploadId;
      this.fileKey = fileKey;
    }
  }
  async completeMultipartUpload() {
    return apiClient.post("s3/multipart/complete", {
      key: this.fileKey,
      uploadId: this.uploadId,
      parts: this.chunks.map((c) => {
        return {
          ETag: c.etag,
          PartNumber: c.partNumber
        };
      })
    }).then((r) => r.data).catch(() => {
      var _a, _b;
      (_b = (_a = this.config).onError) == null ? void 0 : _b.call(_a, null, this.file);
      this.abortUploadOnS3();
    }).finally(() => {
      removeFromLocalStorage(this.storageKey);
    });
  }
  async createFileEntry() {
    return await apiClient.post("s3/entries", {
      ...this.config.metadata,
      clientMime: this.file.mime,
      clientName: this.file.name,
      filename: this.fileKey.split("/").pop(),
      size: this.file.size,
      clientExtension: this.file.extension
    }).then((r) => r.data).catch();
  }
  prepareChunks() {
    var _a;
    this.chunks = [];
    const minChunkSize = Math.max(5 * oneMB, Math.ceil(this.file.size / 1e4));
    const chunkSize = Math.max(desiredChunkSize, minChunkSize);
    if (this.file.size === 0) {
      this.chunks.push({
        blob: this.file.native,
        done: false,
        partNumber: 1,
        bytesUploaded: 0
      });
    } else {
      let partNumber = 1;
      for (let i = 0; i < this.file.size; i += chunkSize) {
        const end = Math.min(this.file.size, i + chunkSize);
        const previouslyUploaded = (_a = this.uploadedParts) == null ? void 0 : _a.find(
          (p) => p.PartNumber === partNumber
        );
        this.chunks.push({
          blob: this.file.native.slice(i, end),
          done: !!previouslyUploaded,
          partNumber,
          etag: previouslyUploaded ? previouslyUploaded.ETag : void 0,
          bytesUploaded: (previouslyUploaded == null ? void 0 : previouslyUploaded.Size) ? parseInt(previouslyUploaded == null ? void 0 : previouslyUploaded.Size) : 0
        });
        partNumber++;
      }
    }
  }
  abortUploadOnS3() {
    return apiClient.post("s3/multipart/abort", {
      key: this.fileKey,
      uploadId: this.uploadId
    });
  }
  static async create(file, config) {
    return new S3MultipartUpload(file, config);
  }
}
class TusUpload {
  constructor(upload) {
    this.upload = upload;
  }
  start() {
    this.upload.start();
  }
  abort() {
    return this.upload.abort(true);
  }
  static async create(file, {
    onProgress,
    onSuccess,
    onError,
    metadata,
    chunkSize,
    baseUrl
  }) {
    const tusFingerprint = ["tus", file.fingerprint, "drive"].join("-");
    const upload = new Upload(file.native, {
      fingerprint: () => Promise.resolve(tusFingerprint),
      removeFingerprintOnSuccess: true,
      endpoint: `${baseUrl}/api/v1/tus/upload`,
      chunkSize,
      retryDelays: [0, 3e3, 5e3, 1e4, 2e4],
      overridePatchMethod: true,
      metadata: {
        name: window.btoa(file.id),
        clientName: file.name,
        clientExtension: file.extension,
        clientMime: file.mime || "",
        clientSize: `${file.size}`,
        ...metadata
      },
      headers: {
        "X-XSRF-TOKEN": getCookie$1("XSRF-TOKEN")
      },
      onError: (err) => {
        var _a;
        if ("originalResponse" in err && err.originalResponse) {
          try {
            const message2 = (_a = JSON.parse(err.originalResponse.getBody())) == null ? void 0 : _a.message;
            onError == null ? void 0 : onError(message2, file);
          } catch (e) {
            onError == null ? void 0 : onError(null, file);
          }
        } else {
          onError == null ? void 0 : onError(null, file);
        }
      },
      onProgress(bytesUploaded, bytesTotal) {
        onProgress == null ? void 0 : onProgress({ bytesUploaded, bytesTotal });
      },
      onSuccess: async () => {
        var _a;
        const uploadKey = (_a = upload.url) == null ? void 0 : _a.split("/").pop();
        try {
          if (uploadKey) {
            const response = await createFileEntry(uploadKey);
            onSuccess == null ? void 0 : onSuccess(response.fileEntry, file);
          }
        } catch (err) {
          localStorage.removeItem(tusFingerprint);
          onError == null ? void 0 : onError(getAxiosErrorMessage(err), file);
        }
      }
    });
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    return new TusUpload(upload);
  }
}
function createFileEntry(uploadKey) {
  return apiClient.post("tus/entries", { uploadKey }).then((r) => r.data);
}
var Disk = /* @__PURE__ */ ((Disk2) => {
  Disk2["public"] = "public";
  Disk2["uploads"] = "uploads";
  return Disk2;
})(Disk || {});
class S3Upload {
  constructor(file, config) {
    __publicField(this, "abortController");
    __publicField(this, "presignedRequest");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
  }
  async start() {
    var _a, _b, _c, _d;
    this.presignedRequest = await this.presignPostUrl();
    if (!this.presignedRequest)
      return;
    const result = await this.uploadFileToS3();
    if (result !== "uploaded")
      return;
    const response = await this.createFileEntry();
    if (response == null ? void 0 : response.fileEntry) {
      (_b = (_a = this.config).onSuccess) == null ? void 0 : _b.call(_a, response.fileEntry, this.file);
    } else if (!this.abortController.signal) {
      (_d = (_c = this.config).onError) == null ? void 0 : _d.call(_c, null, this.file);
    }
  }
  abort() {
    this.abortController.abort();
    return Promise.resolve();
  }
  presignPostUrl() {
    var _a;
    return apiClient.post(
      "s3/simple/presign",
      {
        filename: this.file.name,
        mime: this.file.mime,
        disk: (_a = this.config.metadata) == null ? void 0 : _a.disk,
        size: this.file.size,
        extension: this.file.extension,
        ...this.config.metadata
      },
      { signal: this.abortController.signal }
    ).then((r) => r.data).catch((err) => {
      var _a2, _b;
      if (err.code !== "ERR_CANCELED") {
        (_b = (_a2 = this.config).onError) == null ? void 0 : _b.call(_a2, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  uploadFileToS3() {
    const { url, acl } = this.presignedRequest;
    return axios.put(url, this.file.native, {
      signal: this.abortController.signal,
      withCredentials: false,
      headers: {
        "Content-Type": this.file.mime,
        "x-amz-acl": acl
      },
      onUploadProgress: (e) => {
        var _a, _b;
        if (e.event.lengthComputable) {
          (_b = (_a = this.config).onProgress) == null ? void 0 : _b.call(_a, {
            bytesUploaded: e.loaded,
            bytesTotal: e.total || 0
          });
        }
      }
    }).then(() => "uploaded").catch((err) => {
      var _a, _b;
      if (err.code !== "ERR_CANCELED") {
        (_b = (_a = this.config).onError) == null ? void 0 : _b.call(_a, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  async createFileEntry() {
    return await apiClient.post("s3/entries", {
      ...this.config.metadata,
      clientMime: this.file.mime,
      clientName: this.file.name,
      filename: this.presignedRequest.key.split("/").pop(),
      size: this.file.size,
      clientExtension: this.file.extension
    }).then((r) => {
      return r.data;
    }).catch((err) => {
      var _a, _b;
      if (err.code !== "ERR_CANCELED") {
        (_b = (_a = this.config).onError) == null ? void 0 : _b.call(_a, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  static async create(file, config) {
    return new S3Upload(file, config);
  }
}
class AxiosUpload {
  constructor(file, config) {
    __publicField(this, "abortController");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
  }
  async start() {
    const formData = new FormData();
    const { onSuccess, onError, onProgress, metadata } = this.config;
    formData.set("file", this.file.native);
    formData.set("clientMime", this.file.mime);
    formData.set("clientExtension", this.file.extension);
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.set(key, `${value}`);
      });
    }
    const response = await apiClient.post("file-entries", formData, {
      onUploadProgress: (e) => {
        if (e.event.lengthComputable) {
          onProgress == null ? void 0 : onProgress({
            bytesUploaded: e.loaded,
            bytesTotal: e.total || 0
          });
        }
      },
      signal: this.abortController.signal,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).catch((err) => {
      if (err.code !== "ERR_CANCELED") {
        onError == null ? void 0 : onError(getAxiosErrorMessage(err), this.file);
      }
    });
    if (this.abortController.signal.aborted) {
      return;
    }
    if (response && response.data.fileEntry) {
      onSuccess == null ? void 0 : onSuccess(response.data.fileEntry, this.file);
    }
  }
  abort() {
    this.abortController.abort();
    return Promise.resolve();
  }
  static async create(file, config) {
    return new AxiosUpload(file, config);
  }
}
function prettyBytes(num, fractionDigits = 1) {
  if (num == null || Number.isNaN(num))
    return "";
  const neg = num < 0;
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (neg) {
    num = -num;
  }
  if (num < 1) {
    return `${(neg ? "-" : "") + num} B`;
  }
  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1024)),
    units.length - 1
  );
  num = Number(num / Math.pow(1024, exponent));
  const unit = units[exponent];
  if (num >= 10 || num % 1 === 0) {
    return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
  }
  return `${(neg ? "-" : "") + num.toFixed(fractionDigits)} ${unit}`;
}
function validateFile(file, restrictions) {
  if (!restrictions)
    return;
  const { maxFileSize, allowedFileTypes, blockedFileTypes } = restrictions;
  if (maxFileSize && file.size != null && file.size > maxFileSize) {
    return message("`:file` exceeds maximum allowed size of :size", {
      values: { file: file.name, size: prettyBytes(maxFileSize) }
    });
  }
  if (allowedFileTypes == null ? void 0 : allowedFileTypes.length) {
    if (!fileMatchesTypes(file, allowedFileTypes)) {
      return message("This file type is not allowed");
    }
  }
  if (blockedFileTypes == null ? void 0 : blockedFileTypes.length) {
    if (fileMatchesTypes(file, blockedFileTypes)) {
      return message("This file type is not allowed");
    }
  }
}
function fileMatchesTypes(file, types) {
  return types.map((type) => type.split(",")).flat().some((type) => {
    if (type.includes("/")) {
      if (!file.mime)
        return false;
      return match(file.mime.replace(/;.*?$/, ""), type);
    }
    const extension = type.replace(".", "").toLowerCase();
    if (extension && file.extension) {
      return file.extension.toLowerCase() === extension;
    }
    return false;
  });
}
class ProgressTimeout {
  constructor() {
    __publicField(this, "aliveTimer");
    __publicField(this, "isDone", false);
    __publicField(this, "timeout", 3e4);
    __publicField(this, "timeoutHandler", null);
  }
  progress() {
    if (this.isDone || !this.timeoutHandler)
      return;
    if (this.timeout > 0) {
      clearTimeout(this.aliveTimer);
      this.aliveTimer = setTimeout(this.timeoutHandler, this.timeout);
    }
  }
  done() {
    if (!this.isDone) {
      clearTimeout(this.aliveTimer);
      this.aliveTimer = null;
      this.isDone = true;
    }
  }
}
async function startUploading(upload, state) {
  var _a, _b;
  const settings = getBootstrapData().settings;
  const options = upload.options;
  const file = upload.file;
  if (options == null ? void 0 : options.restrictions) {
    const errorMessage = validateFile(file, options.restrictions);
    if (errorMessage) {
      state.updateFileUpload(file.id, {
        errorMessage,
        status: "failed",
        request: void 0,
        timer: void 0
      });
      if (options.showToastOnRestrictionFail) {
        toast.danger(errorMessage);
      }
      state.runQueue();
      return null;
    }
  }
  const timer = new ProgressTimeout();
  const config = {
    metadata: {
      ...options == null ? void 0 : options.metadata,
      relativePath: file.relativePath,
      disk: ((_a = options == null ? void 0 : options.metadata) == null ? void 0 : _a.disk) || Disk.uploads,
      parentId: ((_b = options == null ? void 0 : options.metadata) == null ? void 0 : _b.parentId) || ""
    },
    chunkSize: settings.uploads.chunk_size,
    baseUrl: settings.base_url,
    onError: (errorMessage) => {
      var _a2;
      state.updateFileUpload(file.id, {
        errorMessage,
        status: "failed"
      });
      state.runQueue();
      timer.done();
      (_a2 = options == null ? void 0 : options.onError) == null ? void 0 : _a2.call(options, errorMessage, file);
      if (options.showToastOnBackendError && errorMessage) {
        toast.danger(errorMessage);
      }
    },
    onSuccess: (entry) => {
      var _a2;
      state.updateFileUpload(file.id, {
        status: "completed",
        entry
      });
      state.runQueue();
      timer.done();
      (_a2 = options == null ? void 0 : options.onSuccess) == null ? void 0 : _a2.call(options, entry, file);
    },
    onProgress: ({ bytesUploaded, bytesTotal }) => {
      var _a2;
      const percentage = bytesUploaded / bytesTotal * 100;
      state.updateFileUpload(file.id, {
        percentage,
        bytesUploaded
      });
      timer.progress();
      (_a2 = options == null ? void 0 : options.onProgress) == null ? void 0 : _a2.call(options, { bytesUploaded, bytesTotal });
    }
  };
  const strategy = chooseUploadStrategy(file, config);
  const request = await strategy.create(file, config);
  timer.timeoutHandler = () => {
    request.abort();
    state.updateFileUpload(file.id, {
      status: "failed",
      errorMessage: message("Upload timed out")
    });
    state.runQueue();
  };
  state.updateFileUpload(file.id, {
    status: "inProgress",
    request
  });
  request.start();
  return request;
}
const OneMB = 1024 * 1024;
const FourMB = 4 * OneMB;
const HundredMB = 100 * OneMB;
const chooseUploadStrategy = (file, config) => {
  var _a;
  const settings = getBootstrapData().settings;
  const disk = ((_a = config.metadata) == null ? void 0 : _a.disk) || Disk.uploads;
  const driver = disk === Disk.uploads ? settings.uploads.uploads_driver : settings.uploads.public_driver;
  if ((driver == null ? void 0 : driver.endsWith("s3")) && settings.uploads.s3_direct_upload) {
    return file.size >= HundredMB ? S3MultipartUpload : S3Upload;
  } else {
    return file.size >= FourMB && !settings.uploads.disable_tus ? TusUpload : AxiosUpload;
  }
};
function extensionFromFilename(fullFileName) {
  var _a;
  const re = /(?:\.([^.]+))?$/;
  return ((_a = re.exec(fullFileName)) == null ? void 0 : _a[1]) || "";
}
function getFileMime(file) {
  const extensionsToMime = {
    md: "text/markdown",
    markdown: "text/markdown",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    yaml: "text/yaml",
    yml: "text/yaml",
    log: "text/plain"
  };
  const fileExtension = file.name ? extensionFromFilename(file.name) : null;
  if (file.type) {
    return file.type;
  }
  if (fileExtension && fileExtension in extensionsToMime) {
    return extensionsToMime[fileExtension];
  }
  return "application/octet-stream";
}
class UploadedFile {
  constructor(file, relativePath) {
    __publicField(this, "id");
    __publicField(this, "fingerprint");
    __publicField(this, "name");
    __publicField(this, "relativePath", "");
    __publicField(this, "size");
    __publicField(this, "mime", "");
    __publicField(this, "extension", "");
    __publicField(this, "native");
    __publicField(this, "lastModified");
    __publicField(this, "cachedData");
    this.id = nanoid();
    this.name = file.name;
    this.size = file.size;
    this.mime = getFileMime(file);
    this.lastModified = file.lastModified;
    this.extension = extensionFromFilename(file.name) || "bin";
    this.native = file;
    relativePath = relativePath || file.webkitRelativePath || "";
    relativePath = relativePath.replace(/^\/+/g, "");
    if (relativePath && relativePath.split("/").length > 1) {
      this.relativePath = relativePath;
    }
    this.fingerprint = generateFingerprint({
      name: this.name,
      size: this.size,
      mime: this.mime,
      lastModified: this.lastModified
    });
  }
  get data() {
    return new Promise((resolve) => {
      if (this.cachedData) {
        resolve(this.cachedData);
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.cachedData = reader.result;
        resolve(this.cachedData);
      });
      if (this.extension === "json") {
        reader.readAsText(this.native);
      } else {
        reader.readAsDataURL(this.native);
      }
    });
  }
}
function generateFingerprint({
  name,
  mime,
  size: size2,
  relativePath,
  lastModified
}) {
  let id = "be";
  if (typeof name === "string") {
    id += `-${encodeFilename(name.toLowerCase())}`;
  }
  if (mime) {
    id += `-${mime}`;
  }
  if (typeof relativePath === "string") {
    id += `-${encodeFilename(relativePath.toLowerCase())}`;
  }
  if (size2 !== void 0) {
    id += `-${size2}`;
  }
  if (lastModified !== void 0) {
    id += `-${lastModified}`;
  }
  return id;
}
function encodeCharacter(character) {
  return character.charCodeAt(0).toString(32);
}
function encodeFilename(name) {
  let suffix = "";
  return name.replace(/[^A-Z0-9]/gi, (character) => {
    suffix += `-${encodeCharacter(character)}`;
    return "/";
  }) + suffix;
}
function createUpload(file, strategyConfig, storeOptions) {
  let uploadedFile = file instanceof UploadedFile ? file : new UploadedFile(file);
  if (storeOptions == null ? void 0 : storeOptions.modifyUploadedFile) {
    uploadedFile = storeOptions.modifyUploadedFile(uploadedFile);
  }
  return {
    file: uploadedFile,
    percentage: 0,
    bytesUploaded: 0,
    status: "pending",
    options: strategyConfig || {}
  };
}
enableMapSet();
const initialState = {
  concurrency: 3,
  fileUploads: /* @__PURE__ */ new Map(),
  activeUploadsCount: 0,
  completedUploadsCount: 0
};
const createFileUploadStore = ({ settings, options }) => create()(
  immer((set, get) => {
    return {
      ...initialState,
      reset: () => {
        set(initialState);
      },
      getUpload: (uploadId) => {
        return get().fileUploads.get(uploadId);
      },
      getCompletedFileEntries: () => {
        return [...get().fileUploads.values()].filter((u) => !!u.entry).map((u) => u.entry);
      },
      clearInactive: () => {
        set((state) => {
          state.fileUploads.forEach((upload, key) => {
            if (upload.status !== "inProgress") {
              state.fileUploads.delete(key);
            }
          });
        });
        get().runQueue();
      },
      abortUpload: (id) => {
        var _a;
        const upload = get().fileUploads.get(id);
        if (upload) {
          (_a = upload.request) == null ? void 0 : _a.abort();
          get().updateFileUpload(id, { status: "aborted", percentage: 0 });
          get().runQueue();
        }
      },
      updateFileUpload: (id, newUploadState) => {
        set((state) => {
          const fileUpload = state.fileUploads.get(id);
          if (fileUpload) {
            state.fileUploads.set(id, {
              ...fileUpload,
              ...newUploadState
            });
            if ("status" in newUploadState) {
              updateTotals(state);
            }
          }
        });
      },
      uploadSingle: (file, userOptions) => {
        const upload = createUpload(file, userOptions, options);
        const fileUploads = new Map(get().fileUploads);
        fileUploads.set(upload.file.id, upload);
        set((state) => {
          updateTotals(state);
          state.fileUploads = fileUploads;
        });
        get().runQueue();
        return upload.file.id;
      },
      removeUpload: (id) => {
        set((state) => {
          state.fileUploads.delete(id);
          updateTotals(state);
        });
      },
      uploadMultiple: (files, strategyConfig) => {
        const uploads = new Map(get().fileUploads);
        [...files].forEach((file) => {
          const upload = createUpload(file, strategyConfig, options);
          uploads.set(upload.file.id, upload);
        });
        set((state) => {
          updateTotals(state);
          state.fileUploads = uploads;
        });
        get().runQueue();
        return [...uploads.keys()];
      },
      runQueue: async () => {
        const uploads = [...get().fileUploads.values()];
        const activeUploads = uploads.filter((u) => u.status === "inProgress");
        let concurrency2 = get().concurrency;
        if (activeUploads.filter(
          (activeUpload) => (
            // only upload one file from folder at a time to avoid creating duplicate folders
            activeUpload.file.relativePath || // only allow one s3 multipart upload at a time, it will already upload multiple parts in parallel
            activeUpload.request instanceof S3MultipartUpload || // only allow one tus upload if file is larger than chunk size, tus will have parallel uploads already in that case
            activeUpload.request instanceof TusUpload && settings.uploads.chunk_size && activeUpload.file.size > settings.uploads.chunk_size
          )
        ).length) {
          concurrency2 = 1;
        }
        if (activeUploads.length < concurrency2) {
          const next = uploads.find((u) => u.status === "pending");
          if (next) {
            await startUploading(next, get());
          }
        }
      }
    };
  })
);
const updateTotals = (state) => {
  state.completedUploadsCount = [...state.fileUploads.values()].filter(
    (u) => u.status === "completed"
  ).length;
  state.activeUploadsCount = [...state.fileUploads.values()].filter(
    (u) => u.status === "inProgress" || u.status === "pending"
  ).length;
};
const FileUploadContext = createContext(null);
function useFileUploadStore(selector, equalityFn) {
  const store = useContext(FileUploadContext);
  return useStoreWithEqualityFn(store, selector, equalityFn);
}
function FileUploadProvider({
  children,
  options
}) {
  const settings = useSettings();
  const [store] = useState(() => {
    return createFileUploadStore({ settings, options });
  });
  return /* @__PURE__ */ jsx(FileUploadContext.Provider, { value: store, children });
}
function createUploadInput(config = {}) {
  const old = document.querySelector("#hidden-file-upload-input");
  if (old)
    old.remove();
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = config.multiple ?? false;
  input.classList.add("hidden");
  input.style.display = "none";
  input.style.visibility = "hidden";
  input.id = "hidden-file-upload-input";
  input.accept = buildUploadInputAccept(config);
  if (config.directory) {
    input.webkitdirectory = true;
  }
  document.body.appendChild(input);
  return input;
}
function buildUploadInputAccept({
  extensions = [],
  types = []
}) {
  const accept = [];
  if (extensions == null ? void 0 : extensions.length) {
    extensions = extensions.map((e) => {
      return e.startsWith(".") ? e : `.${e}`;
    });
    accept.push(extensions.join(","));
  }
  if (types == null ? void 0 : types.length) {
    accept.push(types.join(","));
  }
  return accept.join(",");
}
function openUploadWindow(config = {}) {
  return new Promise((resolve) => {
    const input = createUploadInput(config);
    input.onchange = (e) => {
      const fileList = e.target.files;
      if (!fileList) {
        return resolve([]);
      }
      const uploads = Array.from(fileList).filter((f) => f.name !== ".DS_Store").map((file) => new UploadedFile(file));
      resolve(uploads);
      input.remove();
    };
    document.body.appendChild(input);
    input.click();
  });
}
function deleteFileEntries(payload) {
  return apiClient.post("file-entries/delete", payload).then((r) => r.data);
}
function useDeleteFileEntries() {
  return useMutation({
    mutationFn: (props) => deleteFileEntries(props),
    onError: (err) => showHttpErrorToast(err)
  });
}
function useActiveUpload() {
  const deleteFileEntries2 = useDeleteFileEntries();
  const uploadIdRef = useRef();
  const uploadSingle = useFileUploadStore((s) => s.uploadSingle);
  const _abortUpload = useFileUploadStore((s) => s.abortUpload);
  const updateFileUpload = useFileUploadStore((s) => s.updateFileUpload);
  const activeUpload = useFileUploadStore(
    (s) => uploadIdRef.current ? s.fileUploads.get(uploadIdRef.current) : null
  );
  const uploadFile = useCallback(
    (file, config) => {
      uploadIdRef.current = uploadSingle(file, config);
    },
    [uploadSingle]
  );
  const selectAndUploadFile = useCallback(
    async (config) => {
      var _a;
      const files = await openUploadWindow({
        types: (_a = config == null ? void 0 : config.restrictions) == null ? void 0 : _a.allowedFileTypes
      });
      uploadFile(files[0], config);
      return files[0];
    },
    [uploadFile]
  );
  const deleteEntry = useCallback(
    ({ onSuccess, entryPath }) => {
      var _a, _b, _c;
      const handleSuccess = () => {
        if (activeUpload) {
          updateFileUpload(activeUpload.file.id, {
            ...activeUpload,
            entry: void 0
          });
        }
        onSuccess();
      };
      if (!entryPath && !((_a = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _a.id)) {
        handleSuccess();
        return;
      }
      deleteFileEntries2.mutate(
        {
          paths: entryPath ? [entryPath] : void 0,
          entryIds: ((_b = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _b.id) ? [(_c = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _c.id] : void 0,
          deleteForever: true
        },
        { onSuccess: handleSuccess }
      );
    },
    [deleteFileEntries2, activeUpload, updateFileUpload]
  );
  const abortUpload = useCallback(() => {
    if (activeUpload) {
      _abortUpload(activeUpload.file.id);
    }
  }, [activeUpload, _abortUpload]);
  return {
    uploadFile,
    selectAndUploadFile,
    percentage: (activeUpload == null ? void 0 : activeUpload.percentage) || 0,
    uploadStatus: activeUpload == null ? void 0 : activeUpload.status,
    entry: activeUpload == null ? void 0 : activeUpload.entry,
    deleteEntry,
    isDeletingEntry: deleteFileEntries2.isPending,
    activeUpload,
    abortUpload
  };
}
function ProgressBarBase(props) {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    size: size2 = "md",
    label,
    showValueLabel = !!label,
    isIndeterminate = false,
    labelPosition = "top",
    className,
    role,
    formatOptions = {
      style: "percent"
    },
    radius = "rounded",
    trackColor = "bg-primary-light",
    progressColor = "bg-primary",
    trackHeight = getSize(size2)
  } = props;
  const id = useId();
  value = clamp(value, minValue, maxValue);
  const percentage = (value - minValue) / (maxValue - minValue);
  const formatter = useNumberFormatter(formatOptions);
  let valueLabel = "";
  if (!isIndeterminate && showValueLabel) {
    const valueToFormat = formatOptions.style === "percent" ? percentage : value;
    valueLabel = formatter.format(valueToFormat);
  }
  const barStyle = {};
  if (!isIndeterminate) {
    barStyle.width = `${Math.round(percentage * 100)}%`;
  }
  const style = getInputFieldClassNames({ size: size2 });
  const labelEl = (label || valueLabel) && /* @__PURE__ */ jsxs("div", { className: clsx("my-4 flex justify-between gap-10", style.label), children: [
    label && /* @__PURE__ */ jsx("span", { id, children: label }),
    valueLabel && /* @__PURE__ */ jsx("div", { children: valueLabel })
  ] });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? void 0 : valueLabel,
      "aria-labelledby": label ? id : void 0,
      role: role || "progressbar",
      className: clsx(className, "min-w-42"),
      children: [
        labelPosition === "top" && labelEl,
        /* @__PURE__ */ jsx("div", { className: `${trackHeight} ${radius} ${trackColor} overflow-hidden`, children: /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              progressColor,
              "fill h-full rounded-l transition-width duration-200",
              isIndeterminate && "progress-bar-indeterminate-animate"
            ),
            style: barStyle
          }
        ) }),
        labelPosition === "bottom" && labelEl
      ]
    }
  );
}
function getSize(size2) {
  switch (size2) {
    case "sm":
      return "h-6";
    case "xs":
      return "h-4";
    default:
      return "h-8";
  }
}
function ProgressBar(props) {
  return /* @__PURE__ */ jsx(ProgressBarBase, { ...props });
}
const AddAPhotoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z" }),
  "AddAPhotoOutlined"
);
const AvatarPlaceholderIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M24,12 C28.418278,12 32,15.581722 32,20 L32,22 C32,26.418278 28.418278,30 24,30 C19.581722,30 16,26.418278 16,22 L16,20 C16,15.581722 19.581722,12 24,12 Z M24,32 C33.8734019,32 42.1092023,38.8710577 44,48 L4,48 C5.89079771,38.8710577 14.1265981,32 24,32 Z" })
);
var FileInputType = /* @__PURE__ */ ((FileInputType2) => {
  FileInputType2["image"] = "image/*";
  FileInputType2["audio"] = "audio/*";
  FileInputType2["text"] = "text/*";
  FileInputType2["json"] = "application/json";
  FileInputType2["video"] = "video/mp4,video/mpeg,video/x-m4v,video/*";
  return FileInputType2;
})(FileInputType || {});
const TwoMB = 2 * 1024 * 1024;
function ImageSelector({
  className,
  label,
  description,
  value,
  onChange,
  defaultValue,
  diskPrefix,
  showRemoveButton,
  showEditButtonOnHover = false,
  invalid,
  errorMessage,
  required,
  autoFocus,
  variant = "input",
  previewSize = "h-80",
  placeholderIcon,
  stretchPreview = false,
  previewRadius,
  disabled
}) {
  const {
    uploadFile,
    entry,
    uploadStatus,
    deleteEntry,
    isDeletingEntry,
    percentage
  } = useActiveUpload();
  const inputRef = useRef(null);
  useAutoFocus({ autoFocus }, inputRef);
  const fieldId = useId();
  const labelId = label ? `${fieldId}-label` : void 0;
  const descriptionId = description ? `${fieldId}-description` : void 0;
  const imageUrl = value || (entry == null ? void 0 : entry.url);
  const uploadOptions = {
    showToastOnRestrictionFail: true,
    restrictions: {
      allowedFileTypes: [FileInputType.image],
      maxFileSize: TwoMB
    },
    metadata: {
      diskPrefix,
      disk: Disk.public
    },
    onSuccess: (entry2) => {
      onChange == null ? void 0 : onChange(entry2.url);
    },
    onError: (message2) => {
      if (message2) {
        toast.danger(message2);
      }
    }
  };
  const inputFieldClassNames = getInputFieldClassNames({
    description,
    descriptionPosition: "top",
    invalid
  });
  let VariantElement;
  if (variant === "avatar") {
    VariantElement = AvatarVariant;
  } else if (variant === "square") {
    VariantElement = SquareVariant;
  } else {
    VariantElement = InputVariant;
  }
  const removeButton = showRemoveButton ? /* @__PURE__ */ jsx(
    Button,
    {
      variant: "link",
      color: "danger",
      size: "xs",
      disabled: isDeletingEntry || !imageUrl || disabled,
      onClick: () => {
        deleteEntry({
          onSuccess: () => onChange == null ? void 0 : onChange("")
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Remove image" })
    }
  ) : null;
  const useDefaultButton = defaultValue != null && value !== defaultValue ? /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      size: "xs",
      disabled,
      onClick: () => {
        onChange == null ? void 0 : onChange(defaultValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Use default" })
    }
  ) : null;
  const handleUpload = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.click();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: clsx("text-sm", className), children: [
    label && /* @__PURE__ */ jsx("div", { id: labelId, className: inputFieldClassNames.label, children: label }),
    description && /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.description, children: description }),
    /* @__PURE__ */ jsx("div", { "aria-labelledby": labelId, "aria-describedby": descriptionId, children: /* @__PURE__ */ jsxs(
      Field,
      {
        fieldClassNames: inputFieldClassNames,
        errorMessage,
        invalid,
        children: [
          /* @__PURE__ */ jsx(
            VariantElement,
            {
              inputFieldClassNames,
              placeholderIcon,
              previewSize,
              isLoading: uploadStatus === "inProgress",
              imageUrl,
              removeButton,
              useDefaultButton,
              showEditButtonOnHover,
              stretchPreview,
              previewRadius,
              handleUpload,
              disabled,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  "aria-labelledby": labelId,
                  "aria-describedby": descriptionId,
                  required: imageUrl ? false : required,
                  accept: FileInputType.image,
                  type: "file",
                  disabled: uploadStatus === "inProgress",
                  className: "sr-only",
                  onChange: (e) => {
                    var _a;
                    if ((_a = e.target.files) == null ? void 0 : _a.length) {
                      uploadFile(e.target.files[0], uploadOptions);
                    }
                  }
                }
              )
            }
          ),
          uploadStatus === "inProgress" && /* @__PURE__ */ jsx(
            ProgressBar,
            {
              className: "absolute left-0 right-0 top-0",
              size: "xs",
              value: percentage
            }
          )
        ]
      }
    ) })
  ] });
}
function InputVariant({
  children,
  inputFieldClassNames,
  imageUrl,
  previewSize,
  stretchPreview,
  isLoading,
  handleUpload,
  removeButton,
  useDefaultButton,
  disabled
}) {
  if (imageUrl) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `${previewSize} relative mb-10 overflow-hidden rounded border bg-fg-base/8 p-6`,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: clsx(
                  "mx-auto h-full rounded",
                  stretchPreview ? "object-cover" : "object-contain"
                ),
                onClick: () => handleUpload(),
                src: imageUrl,
                alt: ""
              }
            ),
            children
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => handleUpload(),
          disabled: isLoading || disabled,
          className: "mr-10",
          variant: "outline",
          color: "primary",
          size: "xs",
          children: /* @__PURE__ */ jsx(Trans, { message: "Replace" })
        }
      ),
      removeButton && cloneElement(removeButton, { variant: "outline" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "outline" })
    ] });
  }
  return cloneElement(children, {
    className: clsx(
      inputFieldClassNames.input,
      "py-8",
      "file:bg-primary file:text-on-primary file:border-none file:rounded file:text-sm file:font-semibold file:px-10 file:h-24 file:mr-10"
    )
  });
}
function SquareVariant({
  children,
  placeholderIcon,
  previewSize,
  imageUrl,
  stretchPreview,
  handleUpload,
  removeButton,
  useDefaultButton,
  previewRadius = "rounded",
  showEditButtonOnHover = false,
  disabled
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          previewSize,
          previewRadius,
          !imageUrl && "border",
          "group z-20 flex flex-col items-center justify-center gap-14 bg-fg-base/8 bg-center bg-no-repeat",
          stretchPreview ? "bg-cover" : "bg-contain p-6"
        ),
        style: imageUrl ? { backgroundImage: `url(${imageUrl})` } : void 0,
        onClick: () => handleUpload(),
        children: [
          placeholderIcon && !imageUrl && cloneElement(placeholderIcon, { size: "lg" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "raised",
              color: "white",
              size: "xs",
              className: clsx(
                showEditButtonOnHover && "invisible group-hover:visible"
              ),
              disabled,
              children: imageUrl ? /* @__PURE__ */ jsx(Trans, { message: "Replace image" }) : /* @__PURE__ */ jsx(Trans, { message: "Upload image" })
            }
          )
        ]
      }
    ),
    children,
    (removeButton || useDefaultButton) && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      removeButton && cloneElement(removeButton, { variant: "link" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "link" })
    ] })
  ] });
}
function AvatarVariant({
  children,
  placeholderIcon,
  previewSize,
  isLoading,
  imageUrl,
  removeButton,
  useDefaultButton,
  handleUpload,
  previewRadius = "rounded-full",
  disabled
}) {
  if (!placeholderIcon) {
    placeholderIcon = /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: clsx(
          "h-full w-full bg-primary-light/40 text-primary/40",
          previewRadius
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx("relative", previewSize),
        onClick: () => handleUpload(),
        children: [
          imageUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl,
              className: clsx("h-full w-full object-cover", previewRadius),
              alt: ""
            }
          ) : placeholderIcon,
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 rounded-full bg-paper shadow-xl", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: isLoading || disabled,
              type: "button",
              variant: "outline",
              size: "sm",
              color: "primary",
              radius: "rounded-full",
              children: /* @__PURE__ */ jsx(AddAPhotoIcon, {})
            }
          ) })
        ]
      }
    ),
    children,
    (removeButton || useDefaultButton) && /* @__PURE__ */ jsxs("div", { className: "mt-14", children: [
      removeButton && cloneElement(removeButton, { variant: "link" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "link" })
    ] })
  ] });
}
function FormImageSelector(props) {
  const {
    field: { onChange, value = null },
    fieldState: { error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    value,
    invalid: error != null,
    errorMessage: error ? /* @__PURE__ */ jsx(Trans, { message: "Please select an image." }) : null
  };
  return /* @__PURE__ */ jsx(ImageSelector, { ...mergeProps(formProps, props) });
}
function BasicInfoPanel({ user }) {
  const uploadAvatar = useUploadAvatar({ user });
  const removeAvatar2 = useRemoveAvatar({ user });
  const formId = useId();
  const form = useForm({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      avatar: user.avatar
    }
  });
  const updateDetails = useUpdateAccountDetails(user.id, form);
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.AccountDetails,
      title: /* @__PURE__ */ jsx(Trans, { message: "Update name and profile image" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: updateDetails.isPending || !form.formState.isValid,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          className: "flex flex-col items-center gap-40 md:flex-row md:gap-80",
          onSubmit: (newDetails) => {
            updateDetails.mutate(newDetails);
          },
          id: formId,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full flex-auto", children: [
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  className: "mb-24",
                  name: "first_name",
                  label: /* @__PURE__ */ jsx(Trans, { message: "First name" })
                }
              ),
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  name: "last_name",
                  label: /* @__PURE__ */ jsx(Trans, { message: "Last name" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
              FormImageSelector,
              {
                className: "md:mr-80",
                variant: "avatar",
                previewSize: "w-90 h-90",
                showRemoveButton: true,
                name: "avatar",
                diskPrefix: "avatars",
                label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
                onChange: (url) => {
                  if (url) {
                    uploadAvatar.mutate({ url });
                  } else {
                    removeAvatar2.mutate();
                  }
                }
              }
            ) })
          ]
        }
      )
    }
  );
}
function useUpdatePassword(form) {
  return useMutation({
    mutationFn: (props) => updatePassword(props),
    onSuccess: () => {
      toast(message("Password changed"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updatePassword(payload) {
  return apiClient.put("auth/user/password", payload).then((r) => r.data);
}
function ChangePasswordPanel() {
  const form = useForm();
  const formId = useId();
  const updatePassword2 = useUpdatePassword(form);
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Password,
      title: /* @__PURE__ */ jsx(Trans, { message: "Update password" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: !form.formState.isValid || updatePassword2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update password" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          id: formId,
          onSubmit: (newValues) => {
            updatePassword2.mutate(newValues, {
              onSuccess: () => {
                form.reset();
              }
            });
          },
          children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-24",
                name: "current_password",
                label: /* @__PURE__ */ jsx(Trans, { message: "Current password" }),
                type: "password",
                autoComplete: "current-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-24",
                name: "password",
                label: /* @__PURE__ */ jsx(Trans, { message: "New password" }),
                type: "password",
                autoComplete: "new-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "password_confirmation",
                label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
                type: "password",
                autoComplete: "new-password",
                required: true
              }
            )
          ]
        }
      )
    }
  );
}
function ComboboxEndAdornment({ isLoading, icon }) {
  const timeout = useRef(null);
  const { trans } = useTrans();
  const [showLoading, setShowLoading] = useState(false);
  const {
    state: { isOpen, inputValue }
  } = useListboxContext();
  const lastInputValue = useRef(inputValue);
  useEffect(() => {
    if (isLoading && !showLoading) {
      if (timeout.current === null) {
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
    } else if (!isLoading) {
      setShowLoading(false);
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    lastInputValue.current = inputValue;
  }, [isLoading, showLoading, inputValue]);
  const showLoadingIndicator = showLoading && (isOpen || isLoading);
  if (showLoadingIndicator) {
    return /* @__PURE__ */ jsx(
      ProgressCircle,
      {
        "aria-label": trans({ message: "Loading" }),
        size: "sm",
        isIndeterminate: true
      }
    );
  }
  return icon || /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {});
}
function Select(props, ref) {
  const isMobile = useIsMobileMediaQuery();
  const {
    hideCaret,
    placeholder = /* @__PURE__ */ jsx(Trans, { message: "Select an option..." }),
    selectedValue,
    onItemSelected,
    onOpenChange,
    onInputValueChange,
    onSelectionChange,
    selectionMode,
    minWidth = "min-w-128",
    children,
    searchPlaceholder,
    showEmptyMessage,
    showSearchField,
    defaultInputValue,
    inputValue: userInputValue,
    isLoading,
    isAsync,
    valueClassName,
    floatingWidth = isMobile ? "auto" : "matchTrigger",
    ...inputFieldProps
  } = props;
  const listbox = useListbox(
    {
      ...props,
      clearInputOnItemSelection: true,
      showEmptyMessage: showEmptyMessage || showSearchField,
      floatingWidth,
      selectionMode: "single",
      role: "listbox",
      virtualFocus: showSearchField
    },
    ref
  );
  const {
    state: {
      selectedValues,
      isOpen,
      setIsOpen,
      activeIndex,
      setSelectedIndex,
      inputValue,
      setInputValue
    },
    collections,
    focusItem,
    listboxId,
    reference,
    refs,
    listContent,
    onInputChange
  } = listbox;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: refs.reference
  });
  const selectedOption = collections.collection.get(selectedValues[0]);
  const content = selectedOption ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-10", children: [
    selectedOption.element.props.startIcon,
    /* @__PURE__ */ jsx(
      "span",
      {
        className: clsx(
          "overflow-hidden overflow-ellipsis whitespace-nowrap",
          valueClassName
        ),
        children: selectedOption.element.props.children
      }
    )
  ] }) : /* @__PURE__ */ jsx("span", { className: "italic", children: placeholder });
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    endAdornment: true
  });
  const {
    handleTriggerKeyDown,
    handleListboxKeyboardNavigation,
    handleListboxSearchFieldKeydown
  } = useListboxKeyboardNavigation(listbox);
  const { findMatchingItem } = useTypeSelect();
  const handleListboxTypeSelect = (e) => {
    if (!isOpen)
      return;
    const i = findMatchingItem(e, listContent, activeIndex);
    if (i != null) {
      focusItem("increment", i);
    }
  };
  const handleTriggerTypeSelect = (e) => {
    if (isOpen)
      return void 0;
    const i = findMatchingItem(e, listContent, activeIndex);
    if (i != null) {
      setSelectedIndex(i);
    }
  };
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      onKeyDownCapture: !showSearchField ? handleListboxTypeSelect : void 0,
      onKeyDown: handleListboxKeyboardNavigation,
      onClose: showSearchField ? () => setInputValue("") : void 0,
      isLoading,
      searchField: showSearchField && /* @__PURE__ */ jsx(
        TextField,
        {
          size: props.size === "xs" || props.size === "sm" ? "xs" : "sm",
          placeholder: searchPlaceholder,
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          className: "flex-shrink-0 px-8 pb-8 pt-4",
          autoFocus: true,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "listbox",
          "aria-controls": isOpen ? listboxId : void 0,
          "aria-autocomplete": "list",
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "false",
          value: inputValue,
          onChange: onInputChange,
          onKeyDown: (e) => {
            handleListboxSearchFieldKeydown(e);
          }
        }
      ),
      children: /* @__PURE__ */ jsx(
        Field,
        {
          fieldClassNames,
          ...fieldProps,
          endAdornment: !hideCaret && /* @__PURE__ */ jsx(ComboboxEndAdornment, { isLoading }),
          children: /* @__PURE__ */ jsx(
            "button",
            {
              ...inputProps,
              type: "button",
              "data-selected-value": selectedOption == null ? void 0 : selectedOption.value,
              "aria-expanded": isOpen ? "true" : "false",
              "aria-haspopup": "listbox",
              "aria-controls": isOpen ? listboxId : void 0,
              ref: reference,
              onKeyDown: handleTriggerKeyDown,
              onKeyDownCapture: !showSearchField ? handleTriggerTypeSelect : void 0,
              disabled: inputFieldProps.disabled,
              onClick: () => {
                setIsOpen(!isOpen);
              },
              className: clsx(
                fieldClassNames.input,
                !fieldProps.unstyled && minWidth
              ),
              children: content
            }
          )
        }
      )
    }
  );
}
const SelectForwardRef = React.forwardRef(Select);
function FormSelect({
  children,
  ...props
}) {
  const {
    field: { onChange, onBlur, value = null, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onSelectionChange: onChange,
    onBlur,
    selectedValue: value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  const errorMessage = props.errorMessage || (error == null ? void 0 : error.message);
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      ref,
      ...mergeProps(formProps, props, { errorMessage }),
      children
    }
  );
}
function ComboBox(props, ref) {
  var _a;
  const {
    children,
    items,
    isAsync,
    isLoading,
    openMenuOnFocus = true,
    endAdornmentIcon,
    onItemSelected,
    maxItems,
    clearInputOnItemSelection,
    inputValue: userInputValue,
    selectedValue,
    onSelectionChange,
    allowCustomValue = false,
    onInputValueChange,
    defaultInputValue,
    selectionMode = "single",
    useOptionLabelAsInputValue,
    showEmptyMessage,
    floatingMaxHeight,
    hideEndAdornment = false,
    blurReferenceOnItemSelection,
    isOpen: propsIsOpen,
    onOpenChange: propsOnOpenChange,
    prependListbox,
    listboxClassName,
    onEndAdornmentClick,
    autoFocusFirstItem = true,
    focusLoopingMode,
    ...textFieldProps
  } = props;
  const listbox = useListbox(
    {
      ...props,
      floatingMaxHeight,
      blurReferenceOnItemSelection,
      selectionMode,
      role: "listbox",
      virtualFocus: true,
      clearSelectionOnInputClear: true
    },
    ref
  );
  const {
    reference,
    listboxId,
    onInputChange,
    state: {
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue,
      selectValues,
      selectedValues,
      setActiveCollection
    },
    collection
  } = listbox;
  const textLabel = selectedValues[0] ? (_a = collection.get(selectedValues[0])) == null ? void 0 : _a.textLabel : void 0;
  const { handleListboxSearchFieldKeydown } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(
    (e) => {
      if (openMenuOnFocus && !isOpen) {
        setIsOpen(true);
      }
      e.target.select();
    }
  );
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      prepend: prependListbox,
      className: listboxClassName,
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        TextField,
        {
          inputRef: reference,
          ...textFieldProps,
          endAdornment: !hideEndAdornment ? /* @__PURE__ */ jsx(
            IconButton,
            {
              size: "md",
              tabIndex: -1,
              disabled: textFieldProps.disabled,
              className: "pointer-events-auto",
              onPointerDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEndAdornmentClick) {
                  onEndAdornmentClick();
                } else {
                  setActiveCollection("all");
                  setIsOpen(!isOpen);
                }
              },
              children: /* @__PURE__ */ jsx(
                ComboboxEndAdornment,
                {
                  isLoading,
                  icon: endAdornmentIcon
                }
              )
            }
          ) : null,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "listbox",
          "aria-controls": isOpen ? listboxId : void 0,
          "aria-autocomplete": "list",
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "false",
          onChange: onInputChange,
          value: useOptionLabelAsInputValue && textLabel ? textLabel : inputValue,
          onBlur: (e) => {
            if (allowCustomValue) {
              selectValues(e.target.value);
            } else if (!clearInputOnItemSelection) {
              const val = selectedValues[0];
              setInputValue(selectValues.length && val != null ? `${val}` : "");
            }
          },
          onFocus: handleFocusAndClick,
          onClick: handleFocusAndClick,
          onKeyDown: (e) => handleListboxSearchFieldKeydown(e)
        }
      )
    }
  );
}
const ComboBoxForwardRef = React.forwardRef(ComboBox);
function TimezoneSelect({
  name,
  size: size2,
  timezones,
  label,
  ...selectProps
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      selectionMode: "single",
      name,
      size: size2,
      label,
      showSearchField: true,
      searchPlaceholder: trans(message("Search timezones")),
      ...selectProps,
      children: Object.entries(timezones).map(([sectionName, sectionItems]) => /* @__PURE__ */ jsx(Section, { label: sectionName, children: sectionItems.map((timezone) => /* @__PURE__ */ jsx(Item$1, { value: timezone.value, children: timezone.text }, timezone.value)) }, sectionName))
    }
  );
}
function LocalizationPanel({ user }) {
  const formId = useId();
  const { trans } = useTrans();
  const form = useForm({
    defaultValues: {
      language: user.language || "",
      country: user.country || "",
      timezone: user.timezone || getLocalTimeZone()
    }
  });
  const updateDetails = useUpdateAccountDetails(user.id, form);
  const changeLocale2 = useChangeLocale();
  const { data } = useValueLists(["timezones", "countries", "localizations"]);
  const countries = (data == null ? void 0 : data.countries) || [];
  const localizations = (data == null ? void 0 : data.localizations) || [];
  const timezones = (data == null ? void 0 : data.timezones) || {};
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.LocationAndLanguage,
      title: /* @__PURE__ */ jsx(Trans, { message: "Date, time and language" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: updateDetails.isPending || !form.formState.isValid,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          onSubmit: (newDetails) => {
            updateDetails.mutate(newDetails);
            changeLocale2.mutate({ locale: newDetails.language });
          },
          id: formId,
          children: [
            /* @__PURE__ */ jsx(
              FormSelect,
              {
                className: "mb-24",
                selectionMode: "single",
                name: "language",
                label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
                children: localizations.map((localization) => /* @__PURE__ */ jsx(Item$1, { value: localization.language, children: localization.name }, localization.language))
              }
            ),
            /* @__PURE__ */ jsx(
              FormSelect,
              {
                className: "mb-24",
                selectionMode: "single",
                name: "country",
                label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
                showSearchField: true,
                searchPlaceholder: trans(message("Search countries")),
                children: countries.map((country) => /* @__PURE__ */ jsx(Item$1, { value: country.code, children: country.name }, country.code))
              }
            ),
            /* @__PURE__ */ jsx(
              TimezoneSelect,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Timezone" }),
                name: "timezone",
                timezones
              }
            )
          ]
        }
      )
    }
  );
}
function useDateFormatter(options) {
  const lastOptions = useRef(
    null
  );
  if (options && lastOptions.current && shallowEqual(options, lastOptions.current)) {
    options = lastOptions.current;
  }
  lastOptions.current = options;
  const { localeCode } = useSelectedLocale();
  return useMemo(
    () => new DateFormatter(localeCode, options),
    [localeCode, options]
  );
}
const DateFormatPresets = {
  numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
  short: { year: "numeric", month: "short", day: "2-digit" },
  long: { month: "long", day: "2-digit", year: "numeric" },
  timestamp: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  },
  time: {
    hour: "2-digit",
    minute: "2-digit"
  }
};
const FormattedDate = memo(
  ({ date, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!date) {
      return null;
    }
    try {
      if (typeof date === "string") {
        date = parseAbsoluteToLocal(date).toDate();
      } else if ("toDate" in date) {
        date = date.toDate(timezone);
      }
    } catch (e) {
      return null;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(date) });
  },
  shallowEqual
);
function ConfirmationDialog({
  className,
  title,
  body,
  confirm: confirm2,
  isDanger,
  isLoading,
  onConfirm
}) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { className, size: "sm", role: "alertdialog", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        color: isDanger ? "text-danger" : null,
        leftAdornment: /* @__PURE__ */ jsx(ErrorOutlineIcon, { className: "icon-sm" }),
        children: title
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { children: body }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close(false);
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: isLoading,
          variant: "flat",
          color: isDanger ? "danger" : "primary",
          onClick: () => {
            onConfirm == null ? void 0 : onConfirm();
            if (!onConfirm) {
              close(true);
            }
          },
          children: confirm2
        }
      )
    ] })
  ] });
}
function deleteAccessToken({ id }) {
  return apiClient.delete(`access-tokens/${id}`).then((r) => r.data);
}
function useDeleteAccessToken() {
  return useMutation({
    mutationFn: (props) => deleteAccessToken(props),
    onSuccess: () => {
      toast(message("Token deleted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function createAccessToken(payload) {
  return apiClient.post(`access-tokens`, payload).then((r) => r.data);
}
function useCreateAccessToken(form) {
  return useMutation({
    mutationFn: (props) => createAccessToken(props),
    onSuccess: () => {
      toast(message("Token create"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function CreateNewTokenDialog() {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const createToken = useCreateAccessToken(form);
  const [plainTextToken, setPlainTextToken] = useState();
  const formNode = /* @__PURE__ */ jsx(
    Form,
    {
      form,
      id: formId,
      onSubmit: (values) => {
        createToken.mutate(values, {
          onSuccess: (response) => {
            setPlainTextToken(response.plainTextToken);
            queryClient.invalidateQueries({ queryKey: ["users"] });
          }
        });
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "tokenName",
          label: /* @__PURE__ */ jsx(Trans, { message: "Token name" }),
          required: true,
          autoFocus: true
        }
      )
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create new token" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: plainTextToken ? /* @__PURE__ */ jsx(PlainTextPreview, { plainTextToken }) : formNode }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Done" }) }),
      !plainTextToken && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createToken.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function PlainTextPreview({ plainTextToken }) {
  const [isCopied, copyToClipboard] = useClipboard(plainTextToken || "", {
    successDuration: 1e3
  });
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        readOnly: true,
        value: plainTextToken,
        autoFocus: true,
        onClick: (e) => {
          e.currentTarget.focus();
          e.currentTarget.select();
        },
        endAppend: /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", onClick: copyToClipboard, children: isCopied ? /* @__PURE__ */ jsx(Trans, { message: "Copied!" }) : /* @__PURE__ */ jsx(Trans, { message: "Copy" }) })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 flex items-center gap-10 text-sm", children: [
      /* @__PURE__ */ jsx(ErrorIcon, { size: "sm", className: "text-danger" }),
      /* @__PURE__ */ jsx(Trans, { message: "Make sure to store the token in a safe place. After this dialog is closed, token will not be viewable anymore." })
    ] })
  ] });
}
const secureFilesSvg = "/assets/secure-files-17b4728d.svg";
function AccessTokenPanel({ user }) {
  const tokens = user.tokens || [];
  const { hasPermission, user: authUser } = useAuth();
  const { api } = useSettings();
  if (!(api == null ? void 0 : api.integrated) || !hasPermission("api.access"))
    return null;
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Developers,
      title: /* @__PURE__ */ jsx(Trans, { message: "API access tokens" }),
      titleSuffix: /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/api-docs", target: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "Documentation" }) }),
      actions: /* @__PURE__ */ jsx(CreateNewTokenButton, {}),
      children: !tokens.length ? /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          className: "py-40",
          image: /* @__PURE__ */ jsx(SvgImage, { src: secureFilesSvg }),
          title: user.id === (authUser == null ? void 0 : authUser.id) ? /* @__PURE__ */ jsx(Trans, { message: "You have no personal access tokens yet" }) : /* @__PURE__ */ jsx(Trans, { message: "User has not created any access tokens yet" })
        }
      ) : tokens.map((token, index) => /* @__PURE__ */ jsx(
        TokenLine,
        {
          token,
          isLast: index === tokens.length - 1
        },
        token.id
      ))
    }
  );
}
function TokenLine({ token, isLast }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center gap-24",
        !isLast && "mb-12 border-b pb-12"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Name" }) }),
          /* @__PURE__ */ jsx("div", { children: token.name }),
          /* @__PURE__ */ jsx("div", { className: "mt-10 font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Last used" }) }),
          /* @__PURE__ */ jsx("div", { children: token.last_used_at ? /* @__PURE__ */ jsx(FormattedDate, { date: token.last_used_at }) : /* @__PURE__ */ jsx(Trans, { message: "Never" }) })
        ] }),
        /* @__PURE__ */ jsx(DeleteTokenButton, { token })
      ]
    }
  );
}
function CreateNewTokenButton() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Create token" }) }),
    /* @__PURE__ */ jsx(CreateNewTokenDialog, {})
  ] });
}
function DeleteTokenButton({ token }) {
  const deleteToken = useDeleteAccessToken();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          deleteToken.mutate(
            { id: token.id },
            {
              onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            color: "danger",
            className: "ml-auto flex-shrink-0",
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete token?" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "This token will be deleted immediately and permanently. Once deleted, it can no longer be used to make API requests." }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function useDeleteAccount() {
  const { user } = useAuth();
  const logout2 = useLogout();
  return useMutation({
    mutationFn: () => deleteAccount(user.id),
    onSuccess: () => {
      toast("Account deleted");
      logout2.mutate();
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteAccount(userId) {
  return apiClient.delete(`users/${userId}`, { params: { deleteCurrentUser: true } }).then((r) => r.data);
}
function usePasswordConfirmationStatus() {
  return useQuery({
    queryKey: ["password-confirmation-status"],
    queryFn: () => fetchStatus()
  });
}
function fetchStatus() {
  return apiClient.get("auth/user/confirmed-password-status", { params: { seconds: 9e3 } }).then((response) => response.data);
}
function setPasswordConfirmationStatus(confirmed) {
  queryClient.setQueryData(["password-confirmation-status"], { confirmed });
}
function useConfirmPassword(form) {
  return useMutation({
    mutationFn: (payload) => confirm$1(payload),
    onError: (r) => onFormQueryError(r, form)
  });
}
function confirm$1(payload) {
  return apiClient.post("auth/user/confirm-password", payload).then((response) => response.data);
}
function ConfirmPasswordDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm();
  const confirmPassword = useConfirmPassword(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-16 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "For your security, please confirm your password to continue." }) }),
      /* @__PURE__ */ jsx(
        Form,
        {
          id: formId,
          form,
          onSubmit: (values) => confirmPassword.mutate(values, {
            onSuccess: () => close(values.password)
          }),
          children: /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              type: "password",
              required: true,
              autoFocus: true
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: confirmPassword.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
        }
      )
    ] })
  ] });
}
function usePasswordConfirmedAction({ needsPassword } = {}) {
  const { data, isLoading } = usePasswordConfirmationStatus();
  const passwordRef = useRef();
  const withConfirmedPassword = useCallback(
    async (action) => {
      if ((data == null ? void 0 : data.confirmed) && (passwordRef.current || !needsPassword)) {
        action(passwordRef.current);
      } else {
        const password = await openDialog(ConfirmPasswordDialog);
        if (password) {
          passwordRef.current = password;
          setPasswordConfirmationStatus(true);
          action(passwordRef.current);
        }
      }
    },
    [data == null ? void 0 : data.confirmed, needsPassword]
  );
  return {
    isLoading,
    withConfirmedPassword
  };
}
function DangerZonePanel() {
  const deleteAccount2 = useDeleteAccount();
  const { withConfirmedPassword, isLoading: confirmingPassword } = usePasswordConfirmedAction();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.DeleteAccount,
      title: /* @__PURE__ */ jsx(Trans, { message: "Danger zone" }),
      children: [
        /* @__PURE__ */ jsx(
          DialogTrigger,
          {
            type: "modal",
            isOpen: confirmDialogOpen,
            onOpenChange: setConfirmDialogOpen,
            onClose: (isConfirmed) => {
              if (isConfirmed) {
                deleteAccount2.mutate();
              }
            },
            children: /* @__PURE__ */ jsx(
              ConfirmationDialog,
              {
                isDanger: true,
                title: /* @__PURE__ */ jsx(Trans, { message: "Delete account?" }),
                body: /* @__PURE__ */ jsx(Trans, { message: "Your account will be deleted immediately and permanently. Once deleted, accounts can not be restored." }),
                confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "danger",
            disabled: confirmingPassword || deleteAccount2.isPending,
            onClick: () => {
              withConfirmedPassword(() => {
                setConfirmDialogOpen(true);
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete account" })
          }
        )
      ]
    }
  );
}
function useUserSessions() {
  return useQuery({
    queryKey: ["user-sessions"],
    queryFn: () => fetchUserSessions()
  });
}
function fetchUserSessions() {
  return apiClient.get(`user-sessions`).then((response) => response.data);
}
const ComputerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" }),
  "ComputerOutlined"
);
const SmartphoneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" }),
  "SmartphoneOutlined"
);
const TabletIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" }),
  "TabletOutlined"
);
function useLogoutOtherSessions() {
  return useMutation({
    mutationFn: (payload) => logoutOther(payload),
    onError: (r) => showHttpErrorToast(r)
  });
}
function logoutOther(payload) {
  return apiClient.post("user-sessions/logout-other", payload).then((response) => response.data);
}
function SessionsPanel() {
  var _a;
  const { data, isLoading } = useUserSessions();
  const logoutOther2 = useLogoutOtherSessions();
  const { withConfirmedPassword, isLoading: checkingPasswordStatus } = usePasswordConfirmedAction({ needsPassword: true });
  const sessionList = /* @__PURE__ */ jsx("div", { className: "max-h-400 overflow-y-auto", children: (_a = data == null ? void 0 : data.sessions) == null ? void 0 : _a.map((session) => /* @__PURE__ */ jsx(SessionItem, { session }, session.id)) });
  return /* @__PURE__ */ jsxs(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Sessions,
      title: /* @__PURE__ */ jsx(Trans, { message: "Active sessions" }),
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "If necessary, you may log out of all of your other browser sessions across all of your devices. Your recent sessions are listed below. If you feel your account has been compromised, you should also update your password." }) }),
        /* @__PURE__ */ jsx("div", { className: "my-30", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "min-h-60", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true }) }) : sessionList }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "primary",
            disabled: checkingPasswordStatus || logoutOther2.isPending,
            onClick: () => {
              withConfirmedPassword((password) => {
                logoutOther2.mutate(
                  { password },
                  {
                    onSuccess: () => {
                      toast(message("Logged out other sessions."));
                    }
                  }
                );
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Logout other sessions" })
          }
        )
      ]
    }
  );
}
function SessionItem({ session }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-start gap-14 text-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-muted", children: /* @__PURE__ */ jsx(DeviceIcon, { device: session.device_type, size: "lg" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ValueOrUnknown, { children: session.platform }),
        " -",
        " ",
        /* @__PURE__ */ jsx(ValueOrUnknown, { children: session.browser })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-4 text-xs", children: [
        session.city,
        ", ",
        session.country
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ jsx(IpAddress, { session }),
        " - ",
        /* @__PURE__ */ jsx(LastActive, { session })
      ] })
    ] })
  ] });
}
function DeviceIcon({ device, size: size2 }) {
  switch (device) {
    case "mobile":
      return /* @__PURE__ */ jsx(SmartphoneIcon, { size: size2 });
    case "tablet":
      return /* @__PURE__ */ jsx(TabletIcon, { size: size2 });
    default:
      return /* @__PURE__ */ jsx(ComputerIcon, { size: size2 });
  }
}
function LastActive({ session }) {
  if (session.is_current_device) {
    return /* @__PURE__ */ jsx("span", { className: "text-positive", children: /* @__PURE__ */ jsx(Trans, { message: "This device" }) });
  }
  return /* @__PURE__ */ jsx(FormattedRelativeTime, { date: session.last_active });
}
function IpAddress({ session }) {
  if (session.ip_address) {
    return /* @__PURE__ */ jsx("span", { children: session.ip_address });
  } else if (session.token) {
    return /* @__PURE__ */ jsx(Trans, { message: "API Token" });
  }
  return /* @__PURE__ */ jsx(Trans, { message: "Unknown IP" });
}
function ValueOrUnknown({ children }) {
  return children ? /* @__PURE__ */ jsx(Fragment, { children }) : /* @__PURE__ */ jsx(Trans, { message: "Unknown" });
}
function useEnableTwoFactor() {
  return useMutation({
    mutationFn: enable,
    onError: (r) => showHttpErrorToast(r)
  });
}
function enable() {
  return apiClient.post("auth/user/two-factor-authentication").then((response) => response.data);
}
function TwoFactorStepperLayout({
  title,
  subtitle,
  description,
  actions,
  children
}) {
  if (!subtitle) {
    subtitle = /* @__PURE__ */ jsx(Trans, { message: "When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application." });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-16 text-base font-medium", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mb-24 text-sm", children: subtitle }),
    /* @__PURE__ */ jsx("p", { className: "my-16 text-sm font-medium", children: description }),
    children,
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-12", children: actions })
  ] });
}
function TwoFactorDisabledStep({ onEnabled }) {
  const enableTwoFactor = useEnableTwoFactor();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = enableTwoFactor.isPending || confirmPasswordIsLoading;
  return /* @__PURE__ */ jsx(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "You have not enabled two factor authentication." }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          disabled: isLoading,
          onClick: () => {
            withConfirmedPassword(() => {
              enableTwoFactor.mutate(void 0, {
                onSuccess: onEnabled
              });
            });
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Enable" })
        }
      )
    }
  );
}
function useTwoFactorQrCode() {
  return useQuery({
    queryKey: ["two-factor-qr-code"],
    queryFn: () => fetchCode()
  });
}
function fetchCode() {
  return apiClient.get("auth/user/two-factor/qr-code").then((response) => response.data);
}
function useConfirmTwoFactor(form) {
  return useMutation({
    mutationFn: (payload) => confirm(payload),
    onError: (r) => onFormQueryError(r, form)
  });
}
function confirm(payload) {
  return apiClient.post("auth/user/confirmed-two-factor-authentication", payload).then((response) => response.data);
}
function useDisableTwoFactor() {
  return useMutation({
    mutationFn: disable,
    onError: (r) => showHttpErrorToast(r)
  });
}
function disable() {
  return apiClient.delete("auth/user/two-factor-authentication").then((response) => response.data);
}
function TwoFactorConfirmationStep(props) {
  const { data } = useTwoFactorQrCode();
  return /* @__PURE__ */ jsxs(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Finish enabling two factor authentication." }),
      description: /* @__PURE__ */ jsx(Trans, { message: "To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code." }),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: !data ? /* @__PURE__ */ jsx(
          QrCodeLayout,
          {
            animationKey: "svg-skeleton",
            svg: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-full h-full" }),
            secret: /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "max-w-224" })
          }
        ) : /* @__PURE__ */ jsx(
          QrCodeLayout,
          {
            animationKey: "real-svg",
            svg: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: data.svg } }),
            secret: /* @__PURE__ */ jsx(Trans, { message: "Setup key: :key", values: { key: data.secret } })
          }
        ) }),
        /* @__PURE__ */ jsx(CodeForm, { ...props })
      ]
    }
  );
}
function CodeForm({ onCancel, onConfirmed }) {
  const form = useForm();
  const confirmTwoFactor = useConfirmTwoFactor(form);
  const disableTwoFactor = useDisableTwoFactor();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = confirmTwoFactor.isPending || disableTwoFactor.isPending || confirmPasswordIsLoading;
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: (values) => withConfirmedPassword(() => {
        confirmTwoFactor.mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onConfirmed();
          }
        });
      }),
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            name: "code",
            label: /* @__PURE__ */ jsx(Trans, { message: "Code" }),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-24 flex items-center gap-12", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              disabled: isLoading,
              onClick: () => {
                withConfirmedPassword(() => {
                  disableTwoFactor.mutate(void 0, { onSuccess: onCancel });
                });
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
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
            }
          )
        ] })
      ]
    }
  );
}
function QrCodeLayout({ animationKey, svg, secret }) {
  return /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-16 h-192 w-192", children: svg }),
    /* @__PURE__ */ jsx("div", { className: "mb-16 text-sm font-medium", children: secret })
  ] }, animationKey);
}
function useRegenerateTwoFactorCodes() {
  return useMutation({
    mutationFn: () => regenerate(),
    onError: (r) => showHttpErrorToast(r)
  });
}
function regenerate() {
  return apiClient.post("auth/user/two-factor-recovery-codes").then((response) => response.data);
}
function TwoFactorEnabledStep({ user, onDisabled }) {
  var _a;
  const disableTwoFactor = useDisableTwoFactor();
  const regenerateCodes = useRegenerateTwoFactorCodes();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = disableTwoFactor.isPending || regenerateCodes.isPending || confirmPasswordIsLoading;
  const actions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        onClick: () => withConfirmedPassword(() => {
          regenerateCodes.mutate(void 0, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
            }
          });
        }),
        variant: "outline",
        disabled: isLoading,
        className: "mr-12",
        children: /* @__PURE__ */ jsx(Trans, { message: "Regenerate recovery codes" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        variant: "flat",
        color: "danger",
        disabled: isLoading,
        onClick: () => {
          withConfirmedPassword(() => {
            disableTwoFactor.mutate(void 0, {
              onSuccess: () => {
                toast(message("Two factor authentication has been disabled."));
                onDisabled();
              }
            });
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Disable" })
      }
    )
  ] });
  return /* @__PURE__ */ jsx(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "You have enabled two factor authentication." }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost." }),
      actions,
      children: /* @__PURE__ */ jsx("div", { className: "mb-16 rounded bg-alt p-14 font-mono text-sm", children: (_a = user.two_factor_recovery_codes) == null ? void 0 : _a.map((code) => /* @__PURE__ */ jsx("div", { className: "mb-4", children: code }, code)) })
    }
  );
}
function TwoFactorStepper({ user }) {
  const [status, setStatus] = useState(getStatus(user));
  switch (status) {
    case 0:
      return /* @__PURE__ */ jsx(
        TwoFactorDisabledStep,
        {
          onEnabled: () => setStatus(
            1
            /* WaitingForConfirmation */
          )
        }
      );
    case 1:
      return /* @__PURE__ */ jsx(
        TwoFactorConfirmationStep,
        {
          onCancel: () => {
            setStatus(
              0
              /* Disabled */
            );
          },
          onConfirmed: () => {
            setStatus(
              2
              /* Enabled */
            );
          }
        }
      );
    case 2:
      return /* @__PURE__ */ jsx(
        TwoFactorEnabledStep,
        {
          user,
          onDisabled: () => setStatus(
            0
            /* Disabled */
          )
        }
      );
  }
}
function getStatus(user) {
  if (user.two_factor_confirmed_at) {
    return 2;
  } else if (user.two_factor_recovery_codes) {
    return 1;
  }
  return 0;
}
function TwoFactorPanel({ user }) {
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.TwoFactor,
      title: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }),
      children: /* @__PURE__ */ jsx("div", { className: "max-w-580", children: /* @__PURE__ */ jsx(TwoFactorStepper, { user }) })
    }
  );
}
function AccountSettingsPage() {
  var _a;
  const { auth } = useContext(SiteConfigContext);
  const { data, isLoading } = useUser("me", {
    with: ["roles", "social_profiles", "tokens"]
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-alt", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Account Settings" }) }),
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "account-settings-page" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-24 py-24", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Account settings" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-40 text-base text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "View and update your account details, profile and more." }) }),
      isLoading || !data ? /* @__PURE__ */ jsx(
        ProgressCircle,
        {
          className: "my-80",
          "aria-label": "Loading user..",
          isIndeterminate: true
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-24", children: [
        /* @__PURE__ */ jsx(AccountSettingsSidenav, {}),
        /* @__PURE__ */ jsxs("main", { className: "flex-auto", children: [
          (_a = auth.accountSettingsPanels) == null ? void 0 : _a.map((panel) => /* @__PURE__ */ jsx(panel.component, { user: data.user }, panel.id)),
          /* @__PURE__ */ jsx(BasicInfoPanel, { user: data.user }),
          /* @__PURE__ */ jsx(SocialLoginPanel, { user: data.user }),
          /* @__PURE__ */ jsx(ChangePasswordPanel, {}),
          /* @__PURE__ */ jsx(TwoFactorPanel, { user: data.user }),
          /* @__PURE__ */ jsx(SessionsPanel, {}),
          /* @__PURE__ */ jsx(LocalizationPanel, { user: data.user }),
          /* @__PURE__ */ jsx(AccessTokenPanel, { user: data.user }),
          /* @__PURE__ */ jsx(DangerZonePanel, {})
        ] })
      ] })
    ] }) })
  ] });
}
function GuestRoute({ children }) {
  const { isLoggedIn, getRedirectUri } = useAuth();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const redirectUri = getRedirectUri();
  const { auth } = useContext(SiteConfigContext);
  const { pathname } = useLocation();
  if (isLoggedIn && !isAppearanceEditorActive) {
    if (redirectUri !== pathname) {
      return /* @__PURE__ */ jsx(Navigate, { to: redirectUri, replace: true });
    } else if (auth.secondaryRedirectUri) {
      return /* @__PURE__ */ jsx(Navigate, { to: auth.secondaryRedirectUri, replace: true });
    }
  }
  return children || /* @__PURE__ */ jsx(Outlet, {});
}
function useSendPasswordResetEmail(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: (response) => {
      toast(response.message);
      navigate("/login");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function sendResetPasswordEmail(payload) {
  return apiClient.post("auth/forgot-password", payload).then((response) => response.data);
}
function ForgotPasswordPage() {
  const { registration } = useSettings();
  const [searchParams] = useSearchParams();
  const searchParamsEmail = searchParams.get("email") || void 0;
  const form = useForm({
    defaultValues: { email: searchParamsEmail }
  });
  const sendEmail = useSendPasswordResetEmail(form);
  const message2 = !registration.disable && /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Forgot Password" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          sendEmail.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-32 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Enter your email address below and we will send you a link to reset or create your password." }) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              disabled: !!searchParamsEmail,
              className: "mb-32",
              name: "email",
              type: "email",
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: sendEmail.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    )
  ] });
}
function reset(payload) {
  return apiClient.post("auth/reset-password", payload).then((response) => response.data);
}
function useResetPassword(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reset,
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast(message("Your password has been reset!"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function ResetPasswordPage() {
  const { token } = useParams();
  const form = useForm({ defaultValues: { token } });
  const resetPassword = useResetPassword(form);
  const heading = /* @__PURE__ */ jsx(Trans, { message: "Reset your account password" });
  const message2 = /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Reset Password" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          resetPassword.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "New password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password_confirmation",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: resetPassword.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Reset password" })
            }
          )
        ]
      }
    )
  ] });
}
function useLogin(form) {
  const handleSuccess = useHandleLoginSuccess();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (!response.two_factor) {
        handleSuccess(response);
      }
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function useHandleLoginSuccess() {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useCallback(
    (response) => {
      setBootstrapData(response.bootstrapData);
      navigate(getRedirectUri(), { replace: true });
    },
    [navigate, getRedirectUri]
  );
}
function login(payload) {
  return apiClient.post("auth/login", payload).then((response) => response.data);
}
function useTwoFactorChallenge(form) {
  const handleSuccess = useHandleLoginSuccess();
  return useMutation({
    mutationFn: (payload) => completeChallenge(payload),
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function completeChallenge(payload) {
  return apiClient.post("auth/two-factor-challenge", payload).then((response) => response.data);
}
function TwoFactorChallengePage() {
  const [usingRecoveryCode, setUsingRecoveryCode] = useState(false);
  const form = useForm();
  const completeChallenge2 = useTwoFactorChallenge(form);
  return /* @__PURE__ */ jsxs(AuthLayout, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          completeChallenge2.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-32 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Confirm access to your account by entering the authentication code provided by your authenticator application." }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: usingRecoveryCode ? /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "recovery_code",
              minLength: 21,
              maxLength: 21,
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recovery code" }),
              autoFocus: true,
              required: true
            }
          ) : /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "code",
              minLength: 6,
              maxLength: 6,
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Code" }),
              autoFocus: true,
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mb-32", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "link",
              color: "primary",
              size: "sm",
              onClick: () => setUsingRecoveryCode(!usingRecoveryCode),
              children: /* @__PURE__ */ jsx(Trans, { message: "Use recovery code instead" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: completeChallenge2.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    )
  ] });
}
function LoginPage({ onTwoFactorChallenge }) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const isWorkspaceLogin = pathname.includes("workspace");
  const searchParamsEmail = searchParams.get("email") || void 0;
  const { branding, registration, site, social } = useSettings();
  const siteConfig = useContext(SiteConfigContext);
  const demoDefaults = site.demo && !searchParamsEmail ? getDemoFormDefaults(siteConfig) : {};
  const form = useForm({
    defaultValues: { remember: true, email: searchParamsEmail, ...demoDefaults }
  });
  const login2 = useLogin(form);
  const heading = isWorkspaceLogin ? /* @__PURE__ */ jsx(
    Trans,
    {
      values: { siteName: branding == null ? void 0 : branding.site_name },
      message: "To join your team on :siteName, login to your account"
    }
  ) : /* @__PURE__ */ jsx(Trans, { message: "Sign in to your account" });
  const message2 = !registration.disable && /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  const isInvalid = !!Object.keys(form.formState.errors).length;
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Login" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          login2.mutate(payload, {
            onSuccess: (response) => {
              if (response.two_factor) {
                onTwoFactorChallenge();
              }
            }
          });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              disabled: !!searchParamsEmail,
              invalid: isInvalid,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-12",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              invalid: isInvalid,
              labelSuffix: /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/forgot-password", tabIndex: -1, children: /* @__PURE__ */ jsx(Trans, { message: "Forgot your password?" }) }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(FormCheckbox, { name: "remember", className: "mb-32 block", children: /* @__PURE__ */ jsx(Trans, { message: "Stay signed in for a month" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: login2.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      SocialAuthSection,
      {
        dividerMessage: social.compact_buttons ? /* @__PURE__ */ jsx(Trans, { message: "Or sign in with" }) : /* @__PURE__ */ jsx(Trans, { message: "OR" })
      }
    )
  ] });
}
function getDemoFormDefaults(siteConfig) {
  if (siteConfig.demo.loginPageDefaults === "randomAccount") {
    const number = Math.floor(Math.random() * 100) + 1;
    const paddedNumber = String(number).padStart(3, "0");
    return {
      email: `admin@demo${paddedNumber}.com`,
      password: "admin"
    };
  } else {
    return {
      email: siteConfig.demo.email ?? "admin@admin.com",
      password: siteConfig.demo.password ?? "admin"
    };
  }
}
function LoginPageWrapper() {
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  if (isTwoFactor) {
    return /* @__PURE__ */ jsx(TwoFactorChallengePage, {});
  } else {
    return /* @__PURE__ */ jsx(LoginPage, { onTwoFactorChallenge: () => setIsTwoFactor(true) });
  }
}
const AuthRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) }),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/account-settings",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(AccountSettingsPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "login",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/workspace/join/register",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(RegisterPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/workspace/join/login",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "forgot-password",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(ForgotPasswordPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/password/reset/:token",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(ResetPasswordPage, {}) })
    }
  )
] });
const ForumIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" }),
  "ForumOutlined"
);
function PricingPage() {
  var _a;
  const query = useProducts("pricingPage");
  const [selectedCycle, setSelectedCycle] = useState("yearly");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Pricing" }) }),
    /* @__PURE__ */ jsx(
      Navbar,
      {
        color: "bg",
        darkModeColor: "transparent",
        border: "border-b",
        menuPosition: "pricing-table-page"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-24", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-30 mt-30 text-center text-3xl font-normal md:mt-60 md:text-4xl md:font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "Choose the right plan for you" }) }),
      /* @__PURE__ */ jsx(
        BillingCycleRadio,
        {
          products: (_a = query.data) == null ? void 0 : _a.products,
          selectedCycle,
          onChange: setSelectedCycle,
          className: "mb-40 flex justify-center md:mb-70",
          size: "lg"
        }
      ),
      /* @__PURE__ */ jsx(
        PricingTable,
        {
          selectedCycle,
          productLoader: "pricingPage"
        }
      ),
      /* @__PURE__ */ jsx(ContactSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, { className: "container mx-auto flex-shrink-0 px-24" })
  ] });
}
function ContactSection() {
  return /* @__PURE__ */ jsxs("div", { className: "my-20 p-24 text-center md:my-80", children: [
    /* @__PURE__ */ jsx(ForumIcon, { size: "xl", className: "text-muted" }),
    /* @__PURE__ */ jsx("div", { className: "my-8 md:text-lg", children: /* @__PURE__ */ jsx(Trans, { message: "Do you have any questions about PRO accounts?" }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-24 mt-20 text-sm md:mt-0 md:text-base", children: /* @__PURE__ */ jsx(Trans, { message: "Our support team will be happy to assist you." }) }),
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", elementType: Link, to: "/contact", children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) })
  ] });
}
const BillingPageRoutes = React.lazy(
  () => import("./assets/billing-page-routes-51ad32c8.mjs")
);
const CheckoutRoutes = React.lazy(() => import("./assets/checkout-routes-1737f439.mjs"));
const BillingRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/pricing", element: /* @__PURE__ */ jsx(PricingPage, {}) }),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "checkout/*",
      element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(CheckoutRoutes, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "billing/*",
      element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(BillingPageRoutes, {}) })
    }
  )
] });
function NotificationsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useUserNotifications({ perPage: 30 });
  const hasUnread = !!(user == null ? void 0 : user.unread_notifications_count);
  const markAsRead = useMarkNotificationsAsRead();
  const { notif } = useSettings();
  const handleMarkAsRead = () => {
    if (!data)
      return;
    markAsRead.mutate({
      markAllAsUnread: true
    });
  };
  const markAsReadButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      size: "xs",
      startIcon: /* @__PURE__ */ jsx(DoneAllIcon, {}),
      onClick: handleMarkAsRead,
      disabled: markAsRead.isPending || isLoading,
      className: "ml-auto",
      children: /* @__PURE__ */ jsx(Trans, { message: "Mark all as read" })
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" }) }),
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "notifications-page" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto min-h-[1000px] p-16 md:p-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-30 flex items-center gap-24", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" }) }),
        hasUnread && markAsReadButton,
        notif.subs.integrated && /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-auto text-muted",
            elementType: Link,
            to: "/notifications/settings",
            target: "_blank",
            children: /* @__PURE__ */ jsx(SettingsIcon, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx(PageContent, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, { className: "container mx-auto mt-48 p-16 md:p-24" })
  ] });
}
function PageContent() {
  const { data, isLoading } = useUserNotifications({ perPage: 30 });
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-10", children: /* @__PURE__ */ jsx(ProgressCircle, { "aria-label": "Loading notifications...", isIndeterminate: true }) });
  }
  if (!(data == null ? void 0 : data.pagination.data.length)) {
    return /* @__PURE__ */ jsx(NotificationEmptyStateMessage, {});
  }
  return /* @__PURE__ */ jsx(
    NotificationList,
    {
      className: "rounded border",
      notifications: data.pagination.data
    }
  );
}
function fetchNotificationSubscriptions() {
  return apiClient.get("notifications/me/subscriptions").then((response) => response.data);
}
function useNotificationSubscriptions() {
  return useQuery({
    queryKey: ["notification-subscriptions"],
    queryFn: () => fetchNotificationSubscriptions(),
    staleTime: Infinity
  });
}
function UpdateNotificationSettings(payload) {
  return apiClient.put("notifications/me/subscriptions", { selections: payload }).then((r) => r.data);
}
function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn: (payload) => UpdateNotificationSettings(payload),
    onSuccess: () => {
      toast(message("Updated preferences"));
      queryClient.invalidateQueries({ queryKey: ["notification-subscriptions"] });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function NotificationSettingsPage() {
  const { notif } = useSettings();
  const updateSettings = useUpdateNotificationSettings();
  const { data, isFetched } = useNotificationSubscriptions();
  const [selection, setSelection] = useState();
  useEffect(() => {
    if (data && !selection) {
      const initialSelection = {};
      const initialValue = {};
      data.available_channels.forEach((channel) => {
        initialValue[channel] = false;
      });
      data.subscriptions.forEach((group) => {
        group.subscriptions.forEach((subscription) => {
          const backendValue = data.user_selections.find(
            (s) => s.notif_id === subscription.notif_id
          );
          initialSelection[subscription.notif_id] = (backendValue == null ? void 0 : backendValue.channels) || {
            ...initialValue
          };
        });
      });
      setSelection(initialSelection);
    }
  }, [data, selection]);
  if (!notif.subs.integrated || data && data.subscriptions.length === 0) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-alt", children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "notifications-page" }),
    !isFetched || !data || !selection ? /* @__PURE__ */ jsx("div", { className: "container mx-auto my-100 flex justify-center", children: /* @__PURE__ */ jsx(
      ProgressCircle,
      {
        size: "md",
        isIndeterminate: true,
        "aria-label": "Loading subscriptions..."
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: "container mx-auto my-20 px-10 md:my-40 md:px-20", children: /* @__PURE__ */ jsxs("div", { className: "rounded border bg-paper px-20 pb-30 pt-20", children: [
      data.subscriptions.map((group) => /* @__PURE__ */ jsxs("div", { className: "mb-10 text-sm", children: [
        /* @__PURE__ */ jsx(
          GroupRow,
          {
            group,
            allChannels: data == null ? void 0 : data.available_channels,
            selection,
            setSelection
          },
          group.group_name
        ),
        group.subscriptions.map((subscription) => /* @__PURE__ */ jsx(
          SubscriptionRow,
          {
            subscription,
            selection,
            setSelection,
            allChannels: data == null ? void 0 : data.available_channels
          },
          subscription.notif_id
        ))
      ] }, group.group_name)),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "ml-10 mt-20",
          variant: "flat",
          color: "primary",
          disabled: updateSettings.isPending,
          onClick: () => {
            updateSettings.mutate(
              Object.entries(selection).map(([notifId, channels]) => {
                return { notif_id: notifId, channels };
              })
            );
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Update preferences" })
        }
      )
    ] }) })
  ] });
}
function GroupRow({
  group,
  allChannels,
  selection,
  setSelection
}) {
  const toggleAll = (channelName, value) => {
    const nextState = produce(selection, (draftState) => {
      Object.keys(selection).forEach((notifId) => {
        draftState[notifId][channelName] = value;
      });
    });
    setSelection(nextState);
  };
  const checkboxes = /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-40 max-md:hidden", children: allChannels.map((channelName) => {
    const allSelected = Object.values(selection).every((s) => s[channelName]);
    const someSelected = !allSelected && Object.values(selection).some((s) => s[channelName]);
    return /* @__PURE__ */ jsx(
      Checkbox,
      {
        orientation: "vertical",
        isIndeterminate: someSelected,
        checked: allSelected,
        onChange: async (e) => {
          if (channelName === "browser") {
            const granted = await requestBrowserPermission();
            toggleAll(channelName, !granted ? false : !allSelected);
          } else {
            toggleAll(channelName, !allSelected);
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: channelName })
      },
      channelName
    );
  }) });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b p-10", children: [
    /* @__PURE__ */ jsx("div", { className: "font-medium", children: /* @__PURE__ */ jsx(Trans, { message: group.group_name }) }),
    checkboxes
  ] });
}
function SubscriptionRow({
  subscription,
  allChannels,
  selection,
  setSelection
}) {
  const notifId = subscription.notif_id;
  const toggleChannel = (channelName, value) => {
    const nextState = produce(selection, (draftState) => {
      draftState[subscription.notif_id][channelName] = value;
    });
    setSelection(nextState);
  };
  return /* @__PURE__ */ jsxs("div", { className: "items-center border-b py-10 pl-8 pr-10 md:flex md:pl-20", children: [
    /* @__PURE__ */ jsx("div", { className: "pb-14 font-semibold md:pb-0 md:font-normal", children: /* @__PURE__ */ jsx(Trans, { message: subscription.name }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-40", children: allChannels.map((channelName) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        orientation: "vertical",
        checked: selection[notifId][channelName],
        onChange: async (e) => {
          const newValue = !selection[notifId][channelName];
          if (channelName === "browser") {
            const granted = await requestBrowserPermission();
            toggleChannel(channelName, !granted ? false : newValue);
          } else {
            toggleChannel(channelName, newValue);
          }
        },
        "aria-label": channelName,
        children: /* @__PURE__ */ jsx("div", { className: "md:invisible md:h-0", children: /* @__PURE__ */ jsx(Trans, { message: channelName }) })
      },
      channelName
    )) })
  ] });
}
function requestBrowserPermission() {
  if (Notification.permission === "granted") {
    return Promise.resolve(true);
  }
  if (Notification.permission === "denied") {
    toast.danger(
      message(
        "Notifications blocked. Please enable them for this site from browser settings."
      )
    );
    return Promise.resolve(false);
  }
  return Notification.requestPermission().then((permission) => {
    return permission === "granted";
  });
}
const NotificationRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/notifications",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(ActiveWorkspaceProvider, { children: /* @__PURE__ */ jsx(NotificationsPage, {}) }) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/notifications/settings",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(NotificationSettingsPage, {}) })
    }
  )
] });
function useSubmitContactForm(form) {
  const { trans } = useTrans();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props) => submitContactForm(props),
    onSuccess: () => {
      toast(trans(message("Your message has been submitted.")));
      navigate("/");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function submitContactForm(payload) {
  return apiClient.post("contact-page", payload).then((r) => r.data);
}
function ContactUsPage() {
  const form = useForm();
  const submitForm = useSubmitContactForm(form);
  const { verify, isVerifying } = useRecaptcha("contact");
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-alt", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) }),
    /* @__PURE__ */ jsx(
      Navbar,
      {
        className: "sticky top-0 flex-shrink-0",
        menuPosition: "contact-us-page"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto flex flex-auto items-center justify-center p-24 md:p-40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-620 rounded border bg-paper p-24", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) }),
      /* @__PURE__ */ jsx("p", { className: "mb-30 mt-4 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Please use the form below to send us a message and we'll get back to you as soon as possible." }) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          onSubmit: async (value) => {
            const isValid = await verify();
            if (isValid) {
              submitForm.mutate(value);
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
                name: "name",
                required: true,
                className: "mb-20"
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
                name: "email",
                required: true,
                type: "email",
                className: "mb-20"
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Message" }),
                name: "message",
                required: true,
                inputElementType: "textarea",
                className: "mb-20",
                rows: 8
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "flat",
                color: "primary",
                disabled: submitForm.isPending || isVerifying,
                children: /* @__PURE__ */ jsx(Trans, { message: "Send" })
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, { className: "container mx-auto flex-shrink-0 px-24" })
  ] });
}
const endpoint = (slugOrId) => `custom-pages/${slugOrId}`;
function useCustomPage(pageId) {
  const params = useParams();
  if (!pageId) {
    pageId = params.pageId;
  }
  return useQuery({
    queryKey: [endpoint(pageId)],
    queryFn: () => fetchCustomPage(pageId),
    initialData: () => {
      var _a;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a.customPage;
      if ((data == null ? void 0 : data.page) && (data.page.id == pageId || data.page.slug == pageId)) {
        return data;
      }
    }
  });
}
function fetchCustomPage(slugOrId) {
  return apiClient.get(endpoint(slugOrId)).then((response) => response.data);
}
function CustomPageBody({ page }) {
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      highlightAllCode(bodyRef.current);
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "px-16 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "custom-page-body prose mx-auto my-50 dark:prose-invert", children: [
    /* @__PURE__ */ jsx("h1", { children: page.title }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: bodyRef,
        className: "whitespace-pre-wrap break-words",
        dangerouslySetInnerHTML: { __html: page.body }
      }
    )
  ] }) });
}
function PageMetaTags({ query }) {
  var _a, _b;
  if ((_a = query.data) == null ? void 0 : _a.set_seo) {
    return null;
  }
  return ((_b = query.data) == null ? void 0 : _b.seo) ? /* @__PURE__ */ jsx(Helmet, { tags: query.data.seo }) : /* @__PURE__ */ jsx(DefaultMetaTags, {});
}
function PageErrorMessage() {
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "mt-40",
      image: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorIcon, { size: "xl" }) }),
      imageHeight: "h-auto",
      title: /* @__PURE__ */ jsx(Trans, { message: "There was an issue loading this page" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Please try again later" })
    }
  );
}
const defaultOptions = {
  delay: 500,
  minDuration: 200
};
function useSpinDelay(loading, options) {
  options = Object.assign({}, defaultOptions, options);
  const [state, setState] = useState("IDLE");
  const timeout = useRef(null);
  useEffect(() => {
    if (loading && state === "IDLE") {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(
        () => {
          if (!loading) {
            return setState("IDLE");
          }
          timeout.current = setTimeout(
            () => {
              setState("EXPIRE");
            },
            options == null ? void 0 : options.minDuration
          );
          setState("DISPLAY");
        },
        options == null ? void 0 : options.delay
      );
      setState("DELAY");
    }
    if (!loading && state !== "DISPLAY") {
      clearTimeout(timeout.current);
      setState("IDLE");
    }
  }, [loading, state, options.delay, options.minDuration]);
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);
  return state === "DISPLAY" || state === "EXPIRE";
}
function PageStatus({
  query,
  show404 = true,
  loader,
  loaderClassName,
  loaderIsScreen = true,
  delayedSpinner = true,
  redirectOn404
}) {
  const { isLoggedIn } = useAuth();
  const showSpinner = useSpinDelay(query.isLoading, {
    delay: 500,
    minDuration: 200
  });
  if (query.isLoading) {
    if (!showSpinner && delayedSpinner) {
      return null;
    }
    return loader || /* @__PURE__ */ jsx(FullPageLoader, { className: loaderClassName, screen: loaderIsScreen });
  }
  if (query.isError && (errorStatusIs(query.error, 401) || errorStatusIs(query.error, 403)) && !isLoggedIn) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  if (show404 && query.isError && errorStatusIs(query.error, 404)) {
    if (redirectOn404) {
      return /* @__PURE__ */ jsx(Navigate, { to: redirectOn404, replace: true });
    }
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  return /* @__PURE__ */ jsx(PageErrorMessage, {});
}
function CustomPageLayout({ slug }) {
  const { pageSlug } = useParams();
  const query = useCustomPage(slug || pageSlug);
  useEffect(() => {
    var _a;
    if ((_a = query.data) == null ? void 0 : _a.page) {
      window.scrollTo(0, 0);
    }
  }, [query]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg", children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(
      Navbar,
      {
        menuPosition: "custom-page-navbar",
        className: "flex-shrink-0 sticky top-0"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-auto", children: query.data ? /* @__PURE__ */ jsx(CustomPageBody, { page: query.data.page }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "mt-80" }) }),
    /* @__PURE__ */ jsx(Footer, { className: "mx-14 md:mx-40" })
  ] });
}
function DialogStoreOutlet() {
  const { dialog: DialogElement, data } = useDialogStore();
  return /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      type: "modal",
      isOpen: DialogElement != null,
      onClose: (value) => {
        closeDialog(value);
      },
      children: DialogElement ? /* @__PURE__ */ jsx(DialogElement, { ...data }) : null
    }
  );
}
function DynamicHomepage({ homepageResolver }) {
  const { homepage } = useSettings();
  if ((homepage == null ? void 0 : homepage.type) === "loginPage") {
    return /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) });
  }
  if ((homepage == null ? void 0 : homepage.type) === "registerPage") {
    return /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(RegisterPage, {}) });
  }
  if ((homepage == null ? void 0 : homepage.type) === "customPage") {
    return /* @__PURE__ */ jsx(CustomPageLayout, { slug: homepage.value });
  }
  return (homepageResolver == null ? void 0 : homepageResolver(homepage == null ? void 0 : homepage.type)) || null;
}
const AdminRoutes = React.lazy(() => import("./assets/admin-routes-2a8495f2.mjs").then((n) => n.a0));
const SwaggerApiDocs = React.lazy(
  () => import("./assets/swagger-api-docs-page-ee4a92e8.mjs")
);
const SiteRoutes = React.lazy(() => import("./assets/site-routes-5a646ccf.mjs"));
function AppRoutes() {
  var _a;
  const { homepage, billing, notifications, require_email_confirmation, api } = useSettings();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const { user, hasPermission } = useAuth();
  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ToastContainer, {}),
      /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(EmailVerificationPage, {}) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AppearanceListener, {}),
    /* @__PURE__ */ jsx(CookieNotice, {}),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/*",
          element: /* @__PURE__ */ jsx(AuthRoute, { requireLogin: false, permission: "titles.view", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(SiteRoutes, {}) }) })
        }
      ),
      !((_a = homepage == null ? void 0 : homepage.type) == null ? void 0 : _a.startsWith("channel")) && (user == null || isAppearanceEditorActive) && /* @__PURE__ */ jsx(
        Route,
        {
          path: "/",
          element: /* @__PURE__ */ jsx(DynamicHomepage, { homepageResolver: () => /* @__PURE__ */ jsx(LandingPage, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/*",
          element: /* @__PURE__ */ jsx(AuthRoute, { permission: "admin.access", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(AdminRoutes, {}) }) })
        }
      ),
      AuthRoutes,
      billing.enable && BillingRoutes,
      notifications.integrated && NotificationRoutes,
      (api == null ? void 0 : api.integrated) && hasPermission("api.access") && /* @__PURE__ */ jsx(
        Route,
        {
          path: "api-docs",
          element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(SwaggerApiDocs, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "contact", element: /* @__PURE__ */ jsx(ContactUsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pages/:pageSlug", element: /* @__PURE__ */ jsx(CustomPageLayout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pages/:pageId/:pageSlug", element: /* @__PURE__ */ jsx(CustomPageLayout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] }),
    /* @__PURE__ */ jsx(DialogStoreOutlet, {})
  ] });
}
let port = 13714;
process$1.argv.forEach((value) => {
  if (value.startsWith("port=")) {
    port = parseInt(value.substring("port=".length));
  }
});
const readableToString = (readable) => {
  return new Promise((resolve, reject) => {
    let data = "";
    readable.on("data", (chunk) => data += chunk);
    readable.on("end", () => resolve(data));
    readable.on("error", (err) => reject(err));
  });
};
const getPayload = async (request) => {
  const payload = await readableToString(request);
  return payload ? JSON.parse(payload) : {};
};
createServer(async (request, response) => {
  if (request.url === "/render") {
    return render(request, response);
  } else {
    return handleOtherRoutes(request, response);
  }
}).listen(port, () => console.log("SSR server started."));
async function render(request, response) {
  const data = await getPayload(request);
  setBootstrapData(data.bootstrapData);
  const { pipe, abort } = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouter, { location: data.url, children: /* @__PURE__ */ jsx(CommonProvider, { children: /* @__PURE__ */ jsx(AppRoutes, {}) }) }),
    {
      onAllReady() {
        response.setHeader("content-type", "text/html");
        pipe(response);
        queryClient.clear();
        response.end();
      }
    }
  );
  setTimeout(() => {
    abort();
  }, 2e3);
}
function handleOtherRoutes(request, response) {
  if (request.url === "/screenshot") {
    takeScreenshot(request, response);
  } else if (request.url === "/health") {
    writeJsonResponse(response, { status: "OK", timestamp: Date.now() });
  } else if (request.url === "/shutdown") {
    response.end();
    process$1.exit();
  } else {
    writeJsonResponse(response, { status: "NOT_FOUND", timestamp: Date.now() });
  }
}
function writeJsonResponse(response, data) {
  try {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
  response.end();
}
async function takeScreenshot(request, response) {
  try {
    const payload = await getPayload(request);
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.launch({
      executablePath: "/snap/bin/chromium",
      headless: "new",
      defaultViewport: {
        width: 800,
        height: 600
      }
    });
    const page = await browser.newPage();
    await page.goto(payload.url);
    const image = await page.screenshot({
      type: "jpeg",
      optimizeForSpeed: true,
      quality: 40,
      encoding: "binary"
    });
    await browser.close();
    response.writeHead(200, {
      "Content-Type": "image/jpeg"
    });
    response.write(image);
    response.end();
  } catch (e) {
    console.error(e);
  }
  setTimeout(() => {
    response.end();
  }, 3e3);
}
console.log(`Starting SSR server on port ${port}...`);
export {
  getInputFieldClassNames as $,
  DialogBody as A,
  Button as B,
  CustomMenu as C,
  DialogTrigger as D,
  ErrorIcon as E,
  DialogFooter as F,
  onFormQueryError as G,
  useDateFormatter as H,
  IconButton as I,
  Form as J,
  KeyboardArrowLeftIcon as K,
  FormTextField as L,
  Chip as M,
  Navbar as N,
  CheckIcon as O,
  ProgressBar as P,
  CloseIcon as Q,
  FormattedDate as R,
  SelectForwardRef as S,
  Trans as T,
  Underlay as U,
  Tooltip as V,
  LoginIcon as W,
  useNavigate as X,
  FileUploadProvider as Y,
  FormImageSelector as Z,
  ButtonBase as _,
  useMediaQuery as a,
  useCollator as a$,
  useValueLists as a0,
  DoneAllIcon as a1,
  List as a2,
  ListItem as a3,
  Skeleton as a4,
  createSvgIconFromTree as a5,
  FormSelect as a6,
  Section as a7,
  MixedText as a8,
  useAppearanceEditorMode as a9,
  openUploadWindow as aA,
  FileInputType as aB,
  slugifyString as aC,
  isAbsoluteUrl as aD,
  useProducts as aE,
  FormattedPrice as aF,
  SettingsIcon as aG,
  FormattedRelativeTime as aH,
  useActiveUpload as aI,
  useAutoFocus as aJ,
  validateFile as aK,
  UploadedFile as aL,
  Disk as aM,
  RadioGroup as aN,
  Radio as aO,
  PageErrorMessage as aP,
  ComboBoxForwardRef as aQ,
  PageMetaTags as aR,
  WarningIcon as aS,
  UnfoldLessIcon as aT,
  UnfoldMoreIcon as aU,
  shallowEqual as aV,
  useSelectedLocale as aW,
  useThemeSelector as aX,
  lazyLoader as aY,
  AuthRoute as aZ,
  useCustomPage as a_,
  ProgressCircle as aa,
  useBootstrapDataStore as ab,
  FullPageLoader as ac,
  LinkStyle as ad,
  SiteConfigContext as ae,
  getBootstrapData as af,
  ExternalLink as ag,
  MenuTrigger as ah,
  Menu as ai,
  Checkbox as aj,
  FormRadioGroup as ak,
  FormRadio as al,
  DateFormatPresets as am,
  prettyBytes as an,
  useSocialLogin as ao,
  useField as ap,
  Field as aq,
  ErrorOutlineIcon as ar,
  useUploadAvatar as as,
  useRemoveAvatar as at,
  ImageSelector as au,
  useAuth as av,
  KeyboardArrowDownIcon as aw,
  openDialog as ax,
  useUser as ay,
  PageStatus as az,
  apiClient as b,
  loadFonts as b0,
  closeDialog as b1,
  useResendVerificationEmail as b2,
  LocalizationPanel as b3,
  AccessTokenPanel as b4,
  ChangePasswordPanel as b5,
  TwoFactorPanel as b6,
  SocialLoginPanel as b7,
  SessionsPanel as b8,
  NotFoundPage as b9,
  ProductFeatureList as bA,
  useCallbackRef as bB,
  AccountCircleIcon as bC,
  AddAPhotoIcon as bD,
  ApiIcon as bE,
  CheckBoxOutlineBlankIcon as bF,
  CheckCircleIcon as bG,
  ComputerIcon as bH,
  DangerousIcon as bI,
  DarkModeIcon as bJ,
  DevicesIcon as bK,
  ExitToAppIcon as bL,
  FileDownloadDoneIcon as bM,
  ForumIcon as bN,
  GroupAddIcon as bO,
  LanguageIcon as bP,
  LightModeIcon as bQ,
  LightbulbIcon as bR,
  MenuIcon as bS,
  NotificationsIcon as bT,
  PaymentsIcon as bU,
  PeopleIcon as bV,
  PhonelinkLockIcon as bW,
  SmartphoneIcon as bX,
  TabletIcon as bY,
  elementToTree as bZ,
  EnvatoIcon as b_,
  Footer as ba,
  useCookie as bb,
  FacebookIcon as bc,
  TwitterIcon as bd,
  LockIcon as be,
  useImageSrc as bf,
  FormattedCurrency as bg,
  useDarkThemeVariables as bh,
  useUserTimezone as bi,
  useIsDarkMode as bj,
  createEventHandler as bk,
  ArrowDropDownIcon as bl,
  AvatarPlaceholderIcon as bm,
  useListbox as bn,
  Listbox as bo,
  Popover as bp,
  useListboxKeyboardNavigation as bq,
  clamp as br,
  rootEl as bs,
  MovieIcon as bt,
  useImageSrcSet as bu,
  PersonIcon as bv,
  BillingCycleRadio as bw,
  findBestPrice as bx,
  removeFromLocalStorage as by,
  LocaleSwitcher as bz,
  createSvgIcon as c,
  useLocalStorage as d,
  useIsMobileMediaQuery as e,
  useNumberFormatter as f,
  getFromLocalStorage as g,
  Item$1 as h,
  useTrans as i,
  TextField as j,
  SearchIcon as k,
  StaticPageTitle as l,
  message as m,
  showHttpErrorToast as n,
  opacityAnimation as o,
  useDialogContext as p,
  queryClient as q,
  ConfirmationDialog as r,
  setInLocalStorage as s,
  toast as t,
  useSettings as u,
  errorStatusIs as v,
  IllustratedMessage as w,
  SvgImage as x,
  Dialog as y,
  DialogHeader as z
};
//# sourceMappingURL=server-entry.mjs.map
