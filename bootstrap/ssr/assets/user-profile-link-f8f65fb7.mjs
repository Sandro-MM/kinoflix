var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c, _d;
import { jsx, jsxs } from "react/jsx-runtime";
import { af as getBootstrapData, bi as useUserTimezone, m as message, c as createSvgIcon, $ as getInputFieldClassNames, ap as useField, aq as Field, e as useIsMobileMediaQuery, aW as useSelectedLocale, H as useDateFormatter, I as IconButton, K as KeyboardArrowLeftIcon, u as useSettings, am as DateFormatPresets, aV as shallowEqual, a2 as List, a3 as ListItem, T as Trans, a as useMediaQuery, aJ as useAutoFocus, p as useDialogContext, F as DialogFooter, B as Button, y as Dialog, A as DialogBody, D as DialogTrigger, b as apiClient, bj as useIsDarkMode, bk as createEventHandler, a4 as Skeleton, aj as Checkbox, i as useTrans, bl as ArrowDropDownIcon, a6 as FormSelect, h as Item, bm as AvatarPlaceholderIcon, V as Tooltip, S as SelectForwardRef, o as opacityAnimation, L as FormTextField, M as Chip, bn as useListbox, bo as Listbox, bp as Popover, aa as ProgressCircle, aw as KeyboardArrowDownIcon, bq as useListboxKeyboardNavigation, z as DialogHeader, J as Form, f as useNumberFormatter, Q as CloseIcon, br as clamp, aL as UploadedFile, bs as rootEl, q as queryClient, t as toast, n as showHttpErrorToast, w as IllustratedMessage, x as SvgImage, aS as WarningIcon, aQ as ComboBoxForwardRef, k as SearchIcon, bf as useImageSrc, ae as SiteConfigContext, d as useLocalStorage, ah as MenuTrigger, ai as Menu, aC as slugifyString, bt as MovieIcon, g as getFromLocalStorage, s as setInLocalStorage, bh as useDarkThemeVariables, bu as useImageSrcSet, ac as FullPageLoader, X as useNavigate$1, a0 as useValueLists, G as onFormQueryError, av as useAuth, R as FormattedDate, bv as PersonIcon, l as StaticPageTitle, az as PageStatus } from "../server-entry.mjs";
import React, { useMemo, useState, useCallback, useRef, Fragment, memo, useId, createContext, useContext, cloneElement, isValidElement, forwardRef, Children, useEffect, useLayoutEffect as useLayoutEffect$1, useImperativeHandle, Suspense } from "react";
import { useController, useFormContext, useForm } from "react-hook-form";
import clsx from "clsx";
import { useControlledState } from "@react-stately/utils";
import { useQuery, keepPreviousData, useMutation, hashKey, useInfiniteQuery } from "@tanstack/react-query";
import { m, AnimatePresence } from "framer-motion";
import { E as EditIcon } from "./OpenInNew-08e8296f.mjs";
import { useObjectRef, mergeProps, isMac, focusWithoutScrolling, useGlobalListeners, useLayoutEffect, snapValueToStep, getScrollParent } from "@react-aria/utils";
import { FocusScope, createFocusManager, useFocusManager, getFocusableTreeWalker } from "@react-aria/focus";
import { useSearchParams, useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import deepMerge from "deepmerge";
import fscreen from "fscreen";
import { subscribeWithSelector } from "zustand/middleware";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { getCookie } from "react-use-cookie";
import { getLocalTimeZone, now, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, CalendarDate, toZoned, maxDate, minDate, isSameDay, toCalendarDate, isSameMonth, today, getMinimumDayInMonth, getMinimumMonthInYear, getDayOfWeek, isToday, getWeeksInMonth, parseAbsolute, parseAbsoluteToLocal, parseDateTime } from "@internationalized/date";
import { NumberParser } from "@internationalized/number";
import { useInteractOutside } from "@react-aria/interactions";
import { flushSync, createPortal } from "react-dom";
import memoize from "nano-memoize";
var FilterControlType = /* @__PURE__ */ ((FilterControlType2) => {
  FilterControlType2["Select"] = "select";
  FilterControlType2["DateRangePicker"] = "dateRangePicker";
  FilterControlType2["SelectModel"] = "selectModel";
  FilterControlType2["Input"] = "input";
  FilterControlType2["BooleanToggle"] = "booleanToggle";
  FilterControlType2["ChipField"] = "chipField";
  FilterControlType2["Custom"] = "custom";
  return FilterControlType2;
})(FilterControlType || {});
var FilterOperator = /* @__PURE__ */ ((FilterOperator2) => {
  FilterOperator2["eq"] = "=";
  FilterOperator2["ne"] = "!=";
  FilterOperator2["gt"] = ">";
  FilterOperator2["gte"] = ">=";
  FilterOperator2["lt"] = "<";
  FilterOperator2["lte"] = "<=";
  FilterOperator2["has"] = "has";
  FilterOperator2["hasAll"] = "hasAll";
  FilterOperator2["doesntHave"] = "doesntHave";
  FilterOperator2["between"] = "between";
  return FilterOperator2;
})(FilterOperator || {});
const ALL_PRIMITIVE_OPERATORS = [
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<="
  /* lte */
];
function startOfDay(date) {
  return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}
function endOfDay(date) {
  return date.set({
    hour: 24 - 1,
    minute: 60 - 1,
    second: 60 - 1,
    millisecond: 1e3 - 1
  });
}
function getUserTimezone() {
  var _a2, _b2, _c2;
  const defaultTimezone = (_a2 = getBootstrapData()) == null ? void 0 : _a2.settings.dates.default_timezone;
  const preferredTimezone = ((_c2 = (_b2 = getBootstrapData()) == null ? void 0 : _b2.user) == null ? void 0 : _c2.timezone) || defaultTimezone || "auto";
  if (!preferredTimezone || preferredTimezone === "auto") {
    return getLocalTimeZone();
  }
  return preferredTimezone;
}
function useCurrentDateTime() {
  const timezone = useUserTimezone();
  return useMemo(() => {
    try {
      return now(timezone);
    } catch (e) {
      return now("UTC");
    }
  }, [timezone]);
}
function getCurrentDateTime() {
  const timezone = getUserTimezone();
  try {
    return now(timezone);
  } catch (e) {
    return now("UTC");
  }
}
const Now = startOfDay(getCurrentDateTime());
const locale = ((_b = (_a = getBootstrapData()) == null ? void 0 : _a.i18n) == null ? void 0 : _b.language) || "en";
const DateRangePresets = [
  {
    key: 0,
    label: message("Today"),
    getRangeValue: () => ({
      preset: 0,
      start: Now,
      end: endOfDay(Now)
    })
  },
  {
    key: 1,
    label: message("Yesterday"),
    getRangeValue: () => ({
      preset: 1,
      start: Now.subtract({ days: 1 }),
      end: endOfDay(Now).subtract({ days: 1 })
    })
  },
  {
    key: 2,
    label: message("This week"),
    getRangeValue: () => ({
      preset: 2,
      start: startOfWeek(Now, locale),
      end: endOfWeek(endOfDay(Now), locale)
    })
  },
  {
    key: 3,
    label: message("Last week"),
    getRangeValue: () => {
      const start = startOfWeek(Now, locale).subtract({ days: 7 });
      return {
        preset: 3,
        start,
        end: start.add({ days: 6 })
      };
    }
  },
  {
    key: 4,
    label: message("Last 7 days"),
    getRangeValue: () => ({
      preset: 4,
      start: Now.subtract({ days: 7 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 6,
    label: message("Last 30 days"),
    getRangeValue: () => ({
      preset: 6,
      start: Now.subtract({ days: 30 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 7,
    label: message("Last 3 months"),
    getRangeValue: () => ({
      preset: 7,
      start: Now.subtract({ months: 3 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 8,
    label: message("Last 12 months"),
    getRangeValue: () => ({
      preset: 8,
      start: Now.subtract({ months: 12 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 9,
    label: message("This month"),
    getRangeValue: () => ({
      preset: 9,
      start: startOfMonth(Now),
      end: endOfMonth(endOfDay(Now))
    })
  },
  {
    key: 10,
    label: message("This year"),
    getRangeValue: () => ({
      preset: 10,
      start: startOfYear(Now),
      end: endOfYear(endOfDay(Now))
    })
  },
  {
    key: 11,
    label: message("Last year"),
    getRangeValue: () => ({
      preset: 11,
      start: startOfYear(Now).subtract({ years: 1 }),
      end: endOfYear(endOfDay(Now)).subtract({ years: 1 })
    })
  }
];
const DateRangeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" }),
  "DateRangeOutlined"
);
const Input = React.forwardRef(
  (props, ref) => {
    const {
      children,
      inputProps,
      wrapperProps,
      className,
      autoFocus,
      style,
      onClick
    } = props;
    return /* @__PURE__ */ jsx("div", { ...wrapperProps, onClick, children: /* @__PURE__ */ jsx(
      "div",
      {
        ...inputProps,
        role: "group",
        className: clsx(
          className,
          "flex items-center focus-within:ring focus-within:ring-primary/focus focus-within:border-primary/60"
        ),
        ref,
        style,
        children: /* @__PURE__ */ jsx(FocusScope, { autoFocus, children })
      }
    ) });
  }
);
const DatePickerField = React.forwardRef(({ inputRef, wrapperProps, children, onBlur, ...other }, ref) => {
  const fieldClassNames = getInputFieldClassNames(other);
  const objRef = useObjectRef(ref);
  const { fieldProps, inputProps } = useField({
    ...other,
    focusRef: objRef,
    labelElementType: "span"
  });
  fieldClassNames.wrapper = clsx(
    fieldClassNames.wrapper,
    other.disabled && "pointer-events-none"
  );
  return /* @__PURE__ */ jsx(
    Field,
    {
      wrapperProps: mergeProps(
        wrapperProps,
        {
          onBlur: (e) => {
            var _a2;
            if (!((_a2 = objRef.current) == null ? void 0 : _a2.contains(e.relatedTarget))) {
              onBlur == null ? void 0 : onBlur(e);
            }
          },
          onClick: () => {
            const focusManager = createFocusManager(objRef);
            focusManager == null ? void 0 : focusManager.focusFirst();
          }
        }
      ),
      fieldClassNames,
      ref: objRef,
      ...fieldProps,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          inputProps,
          className: clsx(fieldClassNames.input, "gap-10"),
          ref: inputRef,
          children
        }
      )
    }
  );
});
function getDefaultGranularity(date) {
  if (date instanceof CalendarDate) {
    return "day";
  }
  return "minute";
}
function dateIsInvalid(date, min, max) {
  return min != null && date.compare(min) < 0 || max != null && date.compare(max) > 0;
}
function toSafeZoned(date, timeZone, disambiguation) {
  try {
    return toZoned(date, timeZone, disambiguation);
  } catch (e) {
    return toZoned(date, "UTC", disambiguation);
  }
}
function useBaseDatePickerState(selectedDate, props) {
  const timezone = useUserTimezone();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const closeDialogOnSelection = props.closeDialogOnSelection ?? true;
  const granularity = props.granularity || getDefaultGranularity(selectedDate);
  const min = props.min ? toSafeZoned(props.min, timezone) : void 0;
  const max = props.max ? toSafeZoned(props.max, timezone) : void 0;
  return {
    timezone,
    granularity,
    min,
    max,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  };
}
function useDateRangePickerState(props) {
  var _a2, _b2;
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState({
    start: (!props.value || !props.value.start) && !((_a2 = props.defaultValue) == null ? void 0 : _a2.start),
    end: (!props.value || !props.value.end) && !((_b2 = props.defaultValue) == null ? void 0 : _b2.end)
  });
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value ? completeRange(props.value, now2) : void 0,
    !props.value ? completeRange(props.defaultValue, now2) : void 0,
    (value) => {
      setIsPlaceholder({ start: false, end: false });
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue.start, props);
  const clear = useCallback(() => {
    setIsPlaceholder({ start: true, end: true });
    setInternalValue(completeRange(null, now2));
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [anchorDate, setAnchorDate] = useState(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState(internalValue);
  const [calendarDates, setCalendarDates] = useState(() => {
    return rangeToCalendarDates(internalValue, max);
  });
  const constrainRange = useCallback(
    (range) => {
      let start = range.start;
      let end = range.end;
      if (min) {
        start = maxDate(start, min);
      }
      const startMax = max ? minDate(max, end) : end;
      start = minDate(start, startMax);
      const endMin = min ? maxDate(min, start) : start;
      end = maxDate(end, endMin);
      if (max) {
        end = minDate(end, max);
      }
      return {
        start: toSafeZoned(start, timezone),
        end: toSafeZoned(end, timezone)
      };
    },
    [min, max, timezone]
  );
  const setSelectedValue = useCallback(
    (newRange) => {
      const value = {
        ...constrainRange(newRange),
        preset: newRange.preset
      };
      setInternalValue(value);
      setHighlightedRange(value);
      setCalendarDates(rangeToCalendarDates(value, max));
      setIsPlaceholder({ start: false, end: false });
    },
    [setInternalValue, constrainRange, max]
  );
  const dayIsActive = useCallback(
    (day) => {
      return !isPlaceholder.start && isSameDay(day, highlightedRange.start) || !isPlaceholder.end && isSameDay(day, highlightedRange.end);
    },
    [highlightedRange, isPlaceholder]
  );
  const dayIsHighlighted = useCallback(
    (day) => {
      return (isHighlighting || !isPlaceholder.start && !isPlaceholder.end) && day.compare(highlightedRange.start) >= 0 && day.compare(highlightedRange.end) <= 0;
    },
    [highlightedRange, isPlaceholder, isHighlighting]
  );
  const dayIsRangeStart = useCallback(
    (day) => isSameDay(day, highlightedRange.start),
    [highlightedRange]
  );
  const dayIsRangeEnd = useCallback(
    (day) => isSameDay(day, highlightedRange.end),
    [highlightedRange]
  );
  const getCellProps = useCallback(
    (date, isSameMonth2) => {
      return {
        onPointerEnter: () => {
          if (isHighlighting && isSameMonth2) {
            setHighlightedRange(
              makeRange({ start: anchorDate, end: date, timezone })
            );
          }
        },
        onClick: () => {
          if (!isHighlighting) {
            setIsHighlighting(true);
            setAnchorDate(date);
            setHighlightedRange(makeRange({ start: date, end: date, timezone }));
          } else {
            const finalRange = makeRange({
              start: anchorDate,
              end: date,
              timezone
            });
            finalRange.start = startOfDay(finalRange.start);
            finalRange.end = endOfDay(finalRange.end);
            setIsHighlighting(false);
            setAnchorDate(null);
            setSelectedValue == null ? void 0 : setSelectedValue(finalRange);
            if (closeDialogOnSelection) {
              setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
            }
          }
        }
      };
    },
    [
      anchorDate,
      isHighlighting,
      setSelectedValue,
      setCalendarIsOpen,
      closeDialogOnSelection,
      timezone
    ]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    calendarDates,
    setIsPlaceholder,
    isPlaceholder,
    clear,
    setCalendarDates,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function rangeToCalendarDates(range, max) {
  let start = toCalendarDate(startOfMonth(range.start));
  let end = toCalendarDate(endOfMonth(range.end));
  if (isSameMonth(start, end)) {
    end = endOfMonth(end.add({ months: 1 }));
  }
  if (max && end.compare(max) > 0) {
    end = start;
    start = startOfMonth(start.subtract({ months: 1 }));
  }
  return [start, end];
}
function makeRange(props) {
  const start = toSafeZoned(props.start, props.timezone);
  const end = toSafeZoned(props.end, props.timezone);
  if (start.compare(end) > 0) {
    return { start: end, end: start };
  }
  return { start, end };
}
function completeRange(range, now2) {
  if ((range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    return range;
  } else if (!(range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    range.start = range.end.subtract({ months: 1 });
    return range;
  } else if (!(range == null ? void 0 : range.end) && (range == null ? void 0 : range.start)) {
    range.end = range.start.add({ months: 1 });
    return range;
  }
  return { start: now2, end: now2.add({ months: 1 }) };
}
const ArrowRightAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" }),
  "ArrowRightAltOutlined"
);
function adjustSegment(value, part, amount, options) {
  switch (part) {
    case "era":
    case "year":
    case "month":
    case "day":
      return value.cycle(part, amount, { round: part === "year" });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const isPM = hours >= 12;
        return value.set({ hour: isPM ? hours - 12 : hours + 12 });
      }
      case "hour":
      case "minute":
      case "second":
        return value.cycle(part, amount, {
          round: part !== "hour",
          hourCycle: options.hour12 ? 12 : 24
        });
    }
  }
  return value;
}
function setSegment(value, part, segmentValue, options) {
  switch (part) {
    case "day":
    case "month":
    case "year":
      return value.set({ [part]: segmentValue });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const wasPM = hours >= 12;
        const isPM = segmentValue >= 12;
        if (isPM === wasPM) {
          return value;
        }
        return value.set({ hour: wasPM ? hours - 12 : hours + 12 });
      }
      case "hour":
        if (options.hour12) {
          const hours = value.hour;
          const wasPM = hours >= 12;
          if (!wasPM && segmentValue === 12) {
            segmentValue = 0;
          }
          if (wasPM && segmentValue < 12) {
            segmentValue += 12;
          }
        }
      case "minute":
      case "second":
        return value.set({ [part]: segmentValue });
    }
  }
  return value;
}
const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
  dayPeriod: 1
};
function EditableDateSegment({
  segment,
  domProps,
  value,
  onChange,
  isPlaceholder,
  state: { timezone, calendarIsOpen, setCalendarIsOpen }
}) {
  const isMobile = useIsMobileMediaQuery();
  const enteredKeys = useRef("");
  const { localeCode } = useSelectedLocale();
  const focusManager = useFocusManager();
  const formatter = useDateFormatter({ timeZone: timezone });
  const parser = useMemo(
    () => new NumberParser(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const setSegmentValue = (newValue) => {
    onChange(
      setSegment(value, segment.type, newValue, formatter.resolvedOptions())
    );
  };
  const adjustSegmentValue = (amount) => {
    onChange(
      adjustSegment(value, segment.type, amount, formatter.resolvedOptions())
    );
  };
  const backspace = () => {
    if (parser.isValidPartialNumber(segment.text)) {
      const newValue = segment.text.slice(0, -1);
      const parsed = parser.parse(newValue);
      if (newValue.length === 0 || parsed === 0) {
        const now2 = today(timezone);
        if (segment.type in now2) {
          setSegmentValue(now2[segment.type]);
        }
      } else {
        setSegmentValue(parsed);
      }
      enteredKeys.current = newValue;
    } else if (segment.type === "dayPeriod") {
      adjustSegmentValue(-1);
    }
  };
  const onKeyDown = (e) => {
    var _a2;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Enter":
        (_a2 = e.target.closest("form")) == null ? void 0 : _a2.requestSubmit();
        setCalendarIsOpen(!calendarIsOpen);
        break;
      case "Tab":
        break;
      case "Backspace":
      case "Delete": {
        e.preventDefault();
        e.stopPropagation();
        backspace();
        break;
      }
      case "ArrowUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(1);
        break;
      case "ArrowDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-1);
        break;
      case "PageUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(PAGE_STEP[segment.type] || 1);
        break;
      case "PageDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-(PAGE_STEP[segment.type] || 1));
        break;
      case "Home":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.maxValue);
        break;
      case "End":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.minValue);
        break;
    }
    onInput(e.key);
  };
  const amPmFormatter = useDateFormatter({ hour: "numeric", hour12: true });
  const am = useMemo(() => {
    const amDate = /* @__PURE__ */ new Date();
    amDate.setHours(0);
    return amPmFormatter.formatToParts(amDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const pm = useMemo(() => {
    const pmDate = /* @__PURE__ */ new Date();
    pmDate.setHours(12);
    return amPmFormatter.formatToParts(pmDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const onInput = (key) => {
    const newValue = enteredKeys.current + key;
    switch (segment.type) {
      case "dayPeriod":
        if (am.toLowerCase().startsWith(key)) {
          setSegmentValue(0);
        } else if (pm.toLowerCase().startsWith(key)) {
          setSegmentValue(12);
        } else {
          break;
        }
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "day":
      case "hour":
      case "minute":
      case "second":
      case "month":
      case "year": {
        if (!parser.isValidPartialNumber(newValue)) {
          return;
        }
        let numberValue = parser.parse(newValue);
        let segmentValue = numberValue;
        let allowsZero = segment.minValue === 0;
        if (segment.type === "hour" && formatter.resolvedOptions().hour12) {
          switch (formatter.resolvedOptions().hourCycle) {
            case "h11":
              if (numberValue > 11) {
                segmentValue = parser.parse(key);
              }
              break;
            case "h12":
              allowsZero = false;
              if (numberValue > 12) {
                segmentValue = parser.parse(key);
              }
              break;
          }
          if (segment.value >= 12 && numberValue > 1) {
            numberValue += 12;
          }
        } else if (numberValue > segment.maxValue) {
          segmentValue = parser.parse(key);
        }
        if (Number.isNaN(numberValue)) {
          return;
        }
        const shouldSetValue = segmentValue !== 0 || allowsZero;
        if (shouldSetValue) {
          setSegmentValue(segmentValue);
        }
        if (Number(`${numberValue}0`) > segment.maxValue || newValue.length >= String(segment.maxValue).length) {
          enteredKeys.current = "";
          if (shouldSetValue) {
            focusManager == null ? void 0 : focusManager.focusNext();
          }
        } else {
          enteredKeys.current = newValue;
        }
        break;
      }
    }
  };
  const spinButtonProps = isMobile ? {} : {
    "aria-label": segment.type,
    "aria-valuetext": isPlaceholder ? void 0 : `${segment.value}`,
    "aria-valuemin": segment.minValue,
    "aria-valuemax": segment.maxValue,
    "aria-valuenow": isPlaceholder ? void 0 : segment.value,
    tabIndex: 0,
    onKeyDown
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...mergeProps(domProps, {
        ...spinButtonProps,
        onFocus: (e) => {
          enteredKeys.current = "";
          e.target.scrollIntoView({ block: "nearest" });
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }),
      className: "box-content cursor-default select-none whitespace-nowrap rounded p-2 text-center tabular-nums caret-transparent outline-none focus:bg-primary focus:text-on-primary",
      children: segment.text.padStart(segment.minLength, "0")
    }
  );
}
function LiteralDateSegment({ segment, domProps }) {
  const focusManager = useFocusManager();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      onPointerDown: (e) => {
        if (e.pointerType === "mouse") {
          e.preventDefault();
          const res = focusManager == null ? void 0 : focusManager.focusNext({ from: e.target });
          if (!res) {
            focusManager == null ? void 0 : focusManager.focusPrevious({ from: e.target });
          }
        }
      },
      "aria-hidden": true,
      className: "min-w-4 cursor-default select-none",
      children: segment.text
    }
  );
}
function getSegmentLimits(date, type, options) {
  switch (type) {
    case "year":
      return {
        value: date.year,
        placeholder: "yyyy",
        minValue: 1,
        maxValue: date.calendar.getYearsInEra(date)
      };
    case "month":
      return {
        value: date.month,
        placeholder: "mm",
        minValue: getMinimumMonthInYear(date),
        maxValue: date.calendar.getMonthsInYear(date)
      };
    case "day":
      return {
        value: date.day,
        minValue: getMinimumDayInMonth(date),
        maxValue: date.calendar.getDaysInMonth(date),
        placeholder: "dd"
      };
  }
  if ("hour" in date) {
    switch (type) {
      case "dayPeriod":
        return {
          value: date.hour >= 12 ? 12 : 0,
          minValue: 0,
          maxValue: 12,
          placeholder: "--"
        };
      case "hour":
        if (options.hour12) {
          const isPM = date.hour >= 12;
          return {
            value: date.hour,
            minValue: isPM ? 12 : 0,
            maxValue: isPM ? 23 : 11,
            placeholder: "--"
          };
        }
        return {
          value: date.hour,
          minValue: 0,
          maxValue: 23,
          placeholder: "--"
        };
      case "minute":
        return {
          value: date.minute,
          minValue: 0,
          maxValue: 59,
          placeholder: "--"
        };
    }
  }
  return {};
}
function DateSegmentList({
  segmentProps,
  state,
  value,
  onChange,
  isPlaceholder
}) {
  const { granularity } = state;
  const options = useMemo(() => {
    const memoOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    if (granularity === "minute") {
      memoOptions.hour = "numeric";
      memoOptions.minute = "numeric";
    }
    return memoOptions;
  }, [granularity]);
  const formatter = useDateFormatter(options);
  const dateValue = useMemo(() => value.toDate(), [value]);
  const segments = useMemo(() => {
    return formatter.formatToParts(dateValue).map((segment) => {
      const limits = getSegmentLimits(
        value,
        segment.type,
        formatter.resolvedOptions()
      );
      const textValue = isPlaceholder && segment.type !== "literal" ? limits.placeholder : segment.value;
      return {
        type: segment.type,
        text: segment.value === ", " ? " " : textValue,
        ...limits,
        minLength: segment.type !== "literal" ? String(limits.maxValue).length : 1
      };
    });
  }, [dateValue, formatter, isPlaceholder, value]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: segments.map((segment, index) => {
    if (segment.type === "literal") {
      return /* @__PURE__ */ jsx(
        LiteralDateSegment,
        {
          domProps: segmentProps,
          segment
        },
        index
      );
    }
    return /* @__PURE__ */ jsx(
      EditableDateSegment,
      {
        isPlaceholder,
        domProps: segmentProps,
        state,
        value,
        onChange,
        segment
      },
      index
    );
  }) });
}
const KeyboardArrowRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }),
  "KeyboardArrowRightOutlined"
);
function CalendarCell({
  date,
  currentMonth,
  state: {
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    timezone,
    min,
    max
  }
}) {
  const { localeCode } = useSelectedLocale();
  const dayOfWeek = getDayOfWeek(date, localeCode);
  const isActive = dayIsActive(date);
  const isHighlighted = dayIsHighlighted(date);
  const isRangeStart = dayIsRangeStart(date);
  const isRangeEnd = dayIsRangeEnd(date);
  const dayIsToday = isToday(date, timezone);
  const sameMonth = isSameMonth(date, currentMonth);
  const isDisabled = dateIsInvalid(date, min, max);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      "aria-disabled": isDisabled,
      className: clsx(
        "relative isolate h-40 w-40 flex-shrink-0 text-sm",
        isDisabled && "pointer-events-none text-disabled",
        !sameMonth && "pointer-events-none invisible"
      ),
      ...getCellProps(date, sameMonth),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute inset-0 z-10 flex h-full w-full cursor-pointer select-none items-center justify-center rounded-full",
              !isActive && !dayIsToday && "hover:bg-hover",
              isActive && "bg-primary font-semibold text-on-primary",
              dayIsToday && !isActive && "bg-chip"
            ),
            children: date.day
          }
        ),
        isHighlighted && sameMonth && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute inset-0 h-full w-full bg-primary/focus",
              (isRangeStart || dayOfWeek === 0 || date.day === 1) && "rounded-l-full",
              (isRangeEnd || dayOfWeek === 6 || date.day === currentMonth.calendar.getDaysInMonth(currentMonth)) && "rounded-r-full"
            )
          }
        )
      ]
    }
  );
}
function CalendarMonth({
  startDate,
  state,
  isFirst,
  isLast
}) {
  const { localeCode } = useSelectedLocale();
  const weeksInMonth = getWeeksInMonth(startDate, localeCode);
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsxs("div", { className: "w-280 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      CalendarMonthHeader,
      {
        isFirst,
        isLast,
        state,
        currentMonth: startDate
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "block", role: "grid", children: [
      /* @__PURE__ */ jsx(WeekdayHeader, { state, startDate }),
      [...new Array(weeksInMonth).keys()].map((weekIndex) => /* @__PURE__ */ jsx(m.div, { className: "mb-6 flex", children: [...new Array(7).keys()].map((dayIndex) => /* @__PURE__ */ jsx(
        CalendarCell,
        {
          date: monthStart.add({ weeks: weekIndex, days: dayIndex }),
          currentMonth: startDate,
          state
        },
        dayIndex
      )) }, weekIndex))
    ] })
  ] });
}
function CalendarMonthHeader({
  currentMonth,
  isFirst,
  isLast,
  state: { calendarDates, setCalendarDates, timezone, min, max }
}) {
  const shiftCalendars = (direction) => {
    const count = calendarDates.length;
    let newDates;
    if (direction === "forward") {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.add({ months: count }))
      );
    } else {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.subtract({ months: count }))
      );
    }
    setCalendarDates(newDates);
  };
  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era: currentMonth.calendar.identifier !== "gregory" ? "long" : void 0,
    calendar: currentMonth.calendar.identifier
  });
  const isBackwardDisabled = dateIsInvalid(
    currentMonth.subtract({ days: 1 }),
    min,
    max
  );
  const isForwardDisabled = dateIsInvalid(
    startOfMonth(currentMonth.add({ months: 1 })),
    min,
    max
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isFirst && "invisible"),
        disabled: !isFirst || isBackwardDisabled,
        "aria-hidden": !isFirst,
        onClick: () => {
          shiftCalendars("backward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "select-none text-sm font-semibold", children: monthFormatter.format(currentMonth.toDate(timezone)) }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isLast && "invisible"),
        disabled: !isLast || isForwardDisabled,
        "aria-hidden": !isLast,
        onClick: () => {
          shiftCalendars("forward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
      }
    )
  ] });
}
function WeekdayHeader({ state: { timezone }, startDate }) {
  const { localeCode } = useSelectedLocale();
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsx("div", { className: "flex", children: [...new Array(7).keys()].map((index) => {
    const date = monthStart.add({ days: index });
    const dateDay = date.toDate(timezone);
    const weekday = dayFormatter.format(dateDay);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative h-40 w-40 flex-shrink-0 text-sm font-semibold",
        children: /* @__PURE__ */ jsx("div", { className: "absolute flex h-full w-full select-none items-center justify-center", children: weekday })
      },
      index
    );
  }) });
}
function Calendar({ state, visibleMonths = 1 }) {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    visibleMonths = 1;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: [...new Array(visibleMonths).keys()].map((index) => {
    const startDate = toCalendarDate(
      startOfMonth(state.calendarDates[index])
    );
    const isFirst = index === 0;
    const isLast = index === visibleMonths - 1;
    return /* @__PURE__ */ jsx(
      CalendarMonth,
      {
        state,
        startDate,
        isFirst,
        isLast
      },
      index
    );
  }) });
}
const FormattedDateTimeRange = memo(
  ({ start, end, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!start || !end) {
      return null;
    }
    let value;
    try {
      value = formatter.formatRange(
        castToDate(start, timezone),
        castToDate(end, timezone)
      );
    } catch (e) {
      value = "";
    }
    return /* @__PURE__ */ jsx(Fragment, { children: value });
  },
  shallowEqual
);
function castToDate(date, timezone) {
  if (typeof date === "string") {
    return parseAbsolute(date, timezone).toDate();
  }
  if ("toDate" in date) {
    return date.toDate(timezone);
  }
  return date;
}
function DatePresetList({
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue();
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function useIsTabletMediaQuery(options) {
  return useMediaQuery("(max-width: 1024px)", options);
}
const Switch = React.forwardRef(
  (props, ref) => {
    const {
      children,
      size = "sm",
      description,
      className,
      invalid,
      autoFocus,
      errorMessage,
      iconRight,
      ...domProps
    } = props;
    const inputRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputRef);
    const style = getSizeClassName$2(size);
    const fieldClassNames = getInputFieldClassNames(props);
    const descriptionId = useId();
    return /* @__PURE__ */ jsxs("div", { className: clsx(className, "isolate"), children: [
      /* @__PURE__ */ jsxs("label", { className: "flex select-none items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...domProps,
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid || void 0,
            "aria-describedby": description ? descriptionId : void 0,
            ref: inputRef,
            "aria-checked": domProps.checked,
            className: clsx(
              style,
              !invalid && "checked:border-primary checked:bg-primary dark:checked:border-primary-dark dark:checked:bg-primary-dark",
              invalid && "checked:border-danger checked:bg-danger",
              "relative flex flex-shrink-0 cursor-pointer appearance-none items-center overflow-hidden rounded-3xl border border-chip bg-chip p-0 outline-none transition-colors checked:border-primary checked:bg-primary",
              "before:z-10 before:block before:translate-x-2 before:rounded-3xl before:border before:bg-white before:transition-transform",
              "checked:before:border-white",
              "focus-visible:ring",
              props.disabled && "cursor-not-allowed opacity-80"
            )
          }
        ),
        children && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              fieldClassNames.size.font,
              "ml-12",
              invalid && "text-danger",
              props.disabled && "text-disabled"
            ),
            children
          }
        ),
        iconRight
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.error, children: errorMessage })
    ] });
  }
);
function FormSwitch(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      if (e.target.value && e.target.value !== "on") {
        onChange(e.target.checked ? e.target.value : false);
      } else {
        onChange(e);
      }
    },
    onBlur,
    checked: !!value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Switch, { ref, ...mergeProps(props, formProps) });
}
function getSizeClassName$2(size) {
  switch (size) {
    case "xl":
      return "w-68 h-36 before:w-28 before:h-28 checked:before:translate-x-36";
    case "lg":
      return "w-56 h-30 before:w-22 before:h-22 checked:before:translate-x-30";
    case "md":
      return "w-46 h-24 before:w-18 before:h-18 checked:before:translate-x-24";
    case "xs":
      return "w-30 h-18 before:w-12 before:h-12 checked:before:translate-x-14";
    default:
      return "w-38 h-20 before:w-14 before:h-14 checked:before:translate-x-20";
  }
}
const DateRangeComparePresets = [
  {
    key: 0,
    label: message("Preceding period"),
    getRangeValue: (range) => {
      const startDate = range.start;
      const endDate = range.end;
      const diffInMilliseconds = endDate.toDate().getTime() - startDate.toDate().getTime();
      const diffInMinutes = diffInMilliseconds / (1e3 * 60);
      const newStart = startDate.subtract({ minutes: diffInMinutes });
      return {
        preset: 0,
        start: newStart,
        end: startDate
      };
    }
  },
  {
    key: 1,
    label: message("Same period last year"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ years: 1 }),
        end: range.end.subtract({ years: 1 }),
        preset: 1
      };
    }
  },
  {
    key: 2,
    label: message("Custom"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ weeks: 1 }),
        end: range.end.subtract({ weeks: 1 }),
        preset: 2
      };
    }
  }
];
function DateRangeComparePresetList({
  originalRangeValue,
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangeComparePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue(originalRangeValue);
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function DateRangeDialog({
  state,
  compareState,
  showInlineDatePickerField = false,
  compareVisibleDefault = false
}) {
  const isTablet = useIsTabletMediaQuery();
  const { close } = useDialogContext();
  const initialStateRef = useRef(state);
  const hasPlaceholder = state.isPlaceholder.start || state.isPlaceholder.end;
  const [compareVisible, setCompareVisible] = useState(compareVisibleDefault);
  const footer = /* @__PURE__ */ jsxs(
    DialogFooter,
    {
      dividerTop: true,
      startAction: !hasPlaceholder && !isTablet ? /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(
        FormattedDateTimeRange,
        {
          start: state.selectedValue.start.toDate(),
          end: state.selectedValue.end.toDate(),
          options: { dateStyle: "medium" }
        }
      ) }) : void 0,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            size: "xs",
            onClick: () => {
              state.setSelectedValue(initialStateRef.current.selectedValue);
              state.setIsPlaceholder(initialStateRef.current.isPlaceholder);
              close();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            onClick: () => {
              const value = state.selectedValue;
              if (compareState && compareVisible) {
                value.compareStart = compareState.selectedValue.start;
                value.compareEnd = compareState.selectedValue.end;
              }
              close(value);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Select" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
    /* @__PURE__ */ jsxs(DialogBody, { className: "flex", padding: "p-0", children: [
      !isTablet && /* @__PURE__ */ jsxs("div", { className: "min-w-192 py-14", children: [
        /* @__PURE__ */ jsx(
          DatePresetList,
          {
            selectedValue: state.selectedValue,
            onPresetSelected: (preset) => {
              state.setSelectedValue(preset);
              if (state.closeDialogOnSelection) {
                close(preset);
              }
            }
          }
        ),
        !!compareState && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              className: "mx-20 mb-10 mt-14",
              checked: compareVisible,
              onChange: (e) => setCompareVisible(e.target.checked),
              children: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          ),
          compareVisible && /* @__PURE__ */ jsx(
            DateRangeComparePresetList,
            {
              originalRangeValue: state.selectedValue,
              selectedValue: compareState.selectedValue,
              onPresetSelected: (preset) => {
                compareState.setSelectedValue(preset);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        Calendars,
        {
          state,
          compareState,
          showInlineDatePickerField,
          compareVisible
        }
      ) })
    ] }),
    !state.closeDialogOnSelection && footer
  ] });
}
function Calendars({
  state,
  compareState,
  showInlineDatePickerField,
  compareVisible
}) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { width: 0, overflow: "hidden" },
      animate: { width: "auto" },
      exit: { width: 0, overflow: "hidden" },
      transition: { type: "tween", duration: 0.125 },
      className: "border-l px-20 pb-20 pt-10",
      children: [
        showInlineDatePickerField && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InlineDatePickerField, { state }),
          !!compareState && compareVisible && /* @__PURE__ */ jsx(
            InlineDatePickerField,
            {
              state: compareState,
              label: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start gap-36", children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 2 }) })
      ]
    }
  );
}
function InlineDatePickerField({ state, label }) {
  const { selectedValue, setSelectedValue } = state;
  return /* @__PURE__ */ jsxs(DatePickerField, { className: "mb-20 mt-10", label, children: [
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.start,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, start: newValue });
        }
      }
    ),
    /* @__PURE__ */ jsx(ArrowRightAltIcon, { className: "block flex-shrink-0 text-muted", size: "md" }),
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.end,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, end: newValue });
        }
      }
    )
  ] });
}
function DateRangePicker(props) {
  var _a2, _b2;
  const { granularity, closeDialogOnSelection, ...fieldProps } = props;
  const state = useDateRangePickerState(props);
  const inputRef = useRef(null);
  const isMobile = useIsMobileMediaQuery();
  const hideCalendarIcon = isMobile && granularity !== "day";
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsx(DateRangeDialog, { state })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  const value = state.selectedValue;
  const onChange = state.setSelectedValue;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: !hideCalendarIcon ? /* @__PURE__ */ jsx(DateRangeIcon, {}) : void 0,
        ...fieldProps,
        children: [
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_a2 = state.isPlaceholder) == null ? void 0 : _a2.start,
              state,
              segmentProps: openOnClick,
              value: value.start,
              onChange: (newValue) => {
                onChange({ start: newValue, end: value.end });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ArrowRightAltIcon,
            {
              className: "block flex-shrink-0 text-muted",
              size: "md"
            }
          ),
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_b2 = state.isPlaceholder) == null ? void 0 : _b2.end,
              state,
              segmentProps: openOnClick,
              value: value.end,
              onChange: (newValue) => {
                onChange({ start: value.start, end: newValue });
              }
            }
          )
        ]
      }
    ),
    dialog
  ] });
}
function isHourSegment(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function FormDateRangePicker(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      onChange(e ? dateRangeToAbsoluteRange(e) : null);
    },
    onBlur,
    value: absoluteRangeToDateRange(value),
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DateRangePicker, { ...mergeProps(formProps, props) });
}
function absoluteRangeToDateRange(props) {
  const { start, end, preset } = props || {};
  const dateRange = { preset };
  try {
    if (start) {
      dateRange.start = typeof start === "string" ? parseAbsoluteToLocal(start) : start;
    }
    if (end) {
      dateRange.end = typeof end === "string" ? parseAbsoluteToLocal(end) : end;
    }
  } catch (e) {
  }
  return dateRange;
}
function dateRangeToAbsoluteRange({
  start,
  end,
  preset
} = {}) {
  const absoluteRange = {
    preset
  };
  if (start) {
    absoluteRange.start = start.toAbsoluteString();
  }
  if (end) {
    absoluteRange.end = end.toAbsoluteString();
  }
  return absoluteRange;
}
const BackendFiltersUrlKey = "filters";
function decodeBackendFilters(encodedFilters) {
  if (!encodedFilters)
    return [];
  let filtersFromQuery = [];
  try {
    filtersFromQuery = JSON.parse(atob(decodeURIComponent(encodedFilters)));
    filtersFromQuery.map((filterValue) => {
      if (filterValue.valueKey != null) {
        filterValue.value = filterValue.valueKey;
      }
      return filterValue;
    });
  } catch (e) {
  }
  return filtersFromQuery;
}
function encodeBackendFilters(filterValues, filters) {
  if (!filterValues)
    return "";
  filterValues = !filters ? filterValues : filterValues.filter((item) => item.value !== "").map((item) => transformValue(item, filters));
  filterValues = filterValues.filter((fm) => !fm.isInactive);
  if (!filterValues.length) {
    return "";
  }
  return encodeURIComponent(btoa(JSON.stringify(filterValues)));
}
function transformValue(filterValue, filters) {
  var _a2;
  const filterConfig = filters.find((f) => f.key === filterValue.key);
  if ((filterConfig == null ? void 0 : filterConfig.control.type) === "select") {
    const option = (filterConfig.control.options || []).find(
      (o) => o.key === filterValue.value
    );
    if (option) {
      return { ...filterValue, value: option.value, valueKey: option.key };
    }
  }
  if ((_a2 = filterConfig == null ? void 0 : filterConfig.extraFilters) == null ? void 0 : _a2.length) {
    filterValue["extraFilters"] = filterConfig.extraFilters;
  }
  return filterValue;
}
function useBackendFilterUrlParams(filters, pinnedFilters) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedFilters = searchParams.get(BackendFiltersUrlKey);
  const decodedFilters = useMemo(() => {
    if (!filters)
      return [];
    const decoded = decodeBackendFilters(encodedFilters);
    (pinnedFilters || []).forEach((key) => {
      if (!decoded.find((f) => f.key === key)) {
        const config = filters.find((f) => f.key === key);
        decoded.push({
          key,
          value: config.control.defaultValue,
          operator: config.defaultOperator,
          isInactive: true
        });
      }
    });
    decoded.sort(
      (a, b) => filters.findIndex((f) => f.key === a.key) - filters.findIndex((f) => f.key === b.key)
    );
    return decoded;
  }, [encodedFilters, pinnedFilters, filters]);
  const getDecodedWithoutKeys = useCallback(
    (values) => {
      const newFilters = [...decodedFilters];
      values.forEach((value) => {
        const key = typeof value === "object" ? value.key : value;
        const index = newFilters.findIndex((f) => f.key === key);
        if (index > -1) {
          newFilters.splice(index, 1);
        }
      });
      return newFilters;
    },
    [decodedFilters]
  );
  const replaceAll = useCallback(
    (filterValues) => {
      const encodedFilters2 = encodeBackendFilters(filterValues, filters);
      if (encodedFilters2) {
        searchParams.set(BackendFiltersUrlKey, encodedFilters2);
      } else {
        searchParams.delete(BackendFiltersUrlKey);
      }
      navigate({ search: `?${searchParams}` }, { replace: true });
    },
    [filters, navigate, searchParams]
  );
  const add = useCallback(
    (filterValues) => {
      const existing = getDecodedWithoutKeys(filterValues);
      const decodedFilters2 = [...existing, ...filterValues];
      replaceAll(decodedFilters2);
    },
    [getDecodedWithoutKeys, replaceAll]
  );
  const remove = useCallback(
    (key) => replaceAll(getDecodedWithoutKeys([key])),
    [getDecodedWithoutKeys, replaceAll]
  );
  return {
    add,
    remove,
    replaceAll,
    decodedFilters,
    encodedFilters
  };
}
const DatatableDataQueryKey = (endpoint, params) => {
  const key = endpoint.split("/");
  if (params) {
    key.push(params);
  }
  return key;
};
function useDatatableData(endpoint, params, options, onLoad) {
  if (!params.paginate) {
    params.paginate = "preferLengthAware";
  }
  return useQuery({
    queryKey: DatatableDataQueryKey(endpoint, params),
    queryFn: ({ signal }) => paginate(endpoint, params, onLoad, signal),
    placeholderData: keepPreviousData,
    ...options
  });
}
async function paginate(endpoint, params, onLoad, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  const response = await apiClient.get(endpoint, { params, signal: params.query ? signal : void 0 }).then((response2) => response2.data);
  onLoad == null ? void 0 : onLoad(response);
  return response;
}
function isCtrlKeyPressed(e) {
  if (isMac()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}
function useGridNavigation(props) {
  const { cellCount, rowCount } = props;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusSiblingCell(e, { cell: { op: "decrement" } }, props);
        break;
      case "ArrowRight":
        focusSiblingCell(e, { cell: { op: "increment" } }, props);
        break;
      case "ArrowUp":
        focusSiblingCell(e, { row: { op: "decrement" } }, props);
        break;
      case "ArrowDown":
        focusSiblingCell(e, { row: { op: "increment" } }, props);
        break;
      case "PageUp":
        focusSiblingCell(e, { row: { op: "decrement", count: 5 } }, props);
        break;
      case "PageDown":
        focusSiblingCell(e, { row: { op: "increment", count: 5 } }, props);
        break;
      case "Tab":
        focusFirstElementAfterGrid(e);
        break;
      case "Home":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "decrement", count: rowCount },
              cell: { op: "decrement", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "decrement", count: cellCount } },
            props
          );
        }
        break;
      case "End":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "increment", count: rowCount },
              cell: { op: "increment", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "increment", count: cellCount } },
            props
          );
        }
        break;
    }
  };
  return { onKeyDown };
}
function focusSiblingCell(e, operations, { cellCount, rowCount }) {
  var _a2, _b2, _c2, _d2, _e, _f, _g;
  if (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "input")
    return;
  e.preventDefault();
  const grid = e.currentTarget;
  const currentCell = e.target.closest("[aria-colindex]");
  if (!currentCell || !grid)
    return;
  const row = currentCell.closest("[aria-rowindex]");
  if (!row)
    return;
  let rowIndex = parseInt(row.getAttribute("aria-rowindex"));
  let cellIndex = parseInt(currentCell.getAttribute("aria-colindex"));
  if (Number.isNaN(rowIndex) || Number.isNaN(cellIndex))
    return;
  const rowOpCount = ((_b2 = operations.row) == null ? void 0 : _b2.count) ?? 1;
  if (((_c2 = operations.row) == null ? void 0 : _c2.op) === "increment") {
    rowIndex = Math.min(rowCount, rowIndex + rowOpCount);
  } else if (((_d2 = operations.row) == null ? void 0 : _d2.op) === "decrement") {
    rowIndex = Math.max(1, rowIndex - rowOpCount);
  }
  const cellOpCount = ((_e = operations.cell) == null ? void 0 : _e.count) ?? 1;
  if (((_f = operations.cell) == null ? void 0 : _f.op) === "increment") {
    cellIndex = Math.min(cellCount, cellIndex + cellOpCount);
  } else if (((_g = operations.cell) == null ? void 0 : _g.op) === "decrement") {
    cellIndex = Math.max(1, cellIndex - cellOpCount);
  }
  const nextCell = grid.querySelector(
    `[aria-rowindex="${rowIndex}"] [aria-colindex="${cellIndex}"]`
  );
  if (!nextCell)
    return;
  const walker = getFocusableTreeWalker(nextCell);
  const nextFocusableElement = walker.nextNode() || nextCell;
  currentCell.setAttribute("tabindex", "-1");
  nextFocusableElement.setAttribute("tabindex", "0");
  nextFocusableElement.focus();
}
function focusFirstElementAfterGrid(e) {
  const grid = e.currentTarget;
  if (e.shiftKey) {
    grid.focus();
  } else {
    const walker = getFocusableTreeWalker(grid, { tabbable: true });
    let next;
    let last;
    do {
      last = walker.lastChild();
      if (last) {
        next = last;
      }
    } while (last);
    if (next && !next.contains(document.activeElement)) {
      focusWithoutScrolling(next);
    }
  }
}
const TableContext = createContext(null);
function useTableCellStyle({ index, isHeader }) {
  const {
    columns,
    cellHeight = "h-46",
    headerCellHeight = "h-46"
  } = useContext(TableContext);
  const column = columns[index];
  const userPadding = column == null ? void 0 : column.padding;
  let justify = "justify-start";
  if ((column == null ? void 0 : column.align) === "center") {
    justify = "justify-center";
  } else if ((column == null ? void 0 : column.align) === "end") {
    justify = "justify-end";
  }
  return clsx(
    "flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis outline-none focus-visible:outline focus-visible:outline-offset-2",
    isHeader ? headerCellHeight : cellHeight,
    (column == null ? void 0 : column.width) ?? "flex-1",
    column == null ? void 0 : column.maxWidth,
    column == null ? void 0 : column.minWidth,
    justify,
    userPadding,
    column == null ? void 0 : column.className
  );
}
function TableCell({
  rowIndex,
  rowIsHovered,
  index,
  item,
  id
}) {
  const { columns } = useContext(TableContext);
  const column = columns[index];
  const rowContext = useMemo(() => {
    return {
      index: rowIndex,
      isHovered: rowIsHovered,
      isPlaceholder: item.isPlaceholder
    };
  }, [rowIndex, rowIsHovered, item.isPlaceholder]);
  const style = useTableCellStyle({
    index,
    isHeader: false
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: -1,
      role: "gridcell",
      "aria-colindex": index + 1,
      id,
      className: style,
      children: /* @__PURE__ */ jsx("div", { className: "w-full min-w-0 overflow-hidden overflow-ellipsis", children: column.body(item, rowContext) })
    }
  );
}
function isCtrlOrShiftPressed(e) {
  return e.shiftKey || isCtrlKeyPressed(e);
}
function useTableRowStyle({ index, isSelected, isHeader }) {
  const isDarkMode = useIsDarkMode();
  const isMobile = useIsMobileMediaQuery();
  const { hideBorder, enableSelection, collapseOnMobile, onAction } = useContext(TableContext);
  const isFirst = index === 0;
  return clsx(
    "flex gap-x-16 break-inside-avoid outline-none border border-transparent",
    onAction && "cursor-pointer",
    isMobile && collapseOnMobile && hideBorder ? "mb-8 pl-8 pr-0 rounded" : "px-16",
    !hideBorder && "border-b-divider",
    !hideBorder && isFirst && "border-t-divider",
    isSelected && !isDarkMode && "bg-primary/selected hover:bg-primary/focus focus-visible:bg-primary/focus",
    isSelected && isDarkMode && "bg-selected hover:bg-focus focus-visible:bg-focus",
    !isSelected && !isHeader && (enableSelection || onAction) && "focus-visible:bg-focus hover:bg-hover"
  );
}
function usePointerEvents({
  onMoveStart,
  onMove,
  onMoveEnd,
  minimumMovement = 0,
  preventDefault,
  stopPropagation = true,
  onPress,
  onLongPress,
  ...props
}) {
  const stateRef = useRef({
    lastPosition: { x: 0, y: 0 },
    started: false,
    longPressTriggered: false
  });
  const state = stateRef.current;
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const start = (e) => {
    if (!state.el)
      return;
    const result = onMoveStart == null ? void 0 : onMoveStart(e, state.el);
    if (result === false)
      return;
    state.originalTouchAction = state.el.style.touchAction;
    state.el.style.touchAction = "none";
    state.originalUserSelect = document.documentElement.style.userSelect;
    document.documentElement.style.userSelect = "none";
    state.started = true;
  };
  const onPointerDown = (e) => {
    var _a2;
    if (e.button === 0 && state.id == null) {
      state.started = false;
      const result = (_a2 = props.onPointerDown) == null ? void 0 : _a2.call(props, e);
      if (result === false)
        return;
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (preventDefault) {
        e.preventDefault();
      }
      state.id = e.pointerId;
      state.el = e.currentTarget;
      state.lastPosition = { x: e.clientX, y: e.clientY };
      if (onLongPress) {
        state.longPressTimer = setTimeout(() => {
          onLongPress(e, state.el);
          state.longPressTriggered = true;
        }, 400);
      }
      if (onMoveStart || onMove) {
        addGlobalListener(window, "pointermove", onPointerMove, false);
      }
      addGlobalListener(window, "pointerup", onPointerUp, false);
      addGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  const onPointerMove = (e) => {
    if (e.pointerId === state.id) {
      const deltaX = e.clientX - state.lastPosition.x;
      const deltaY = e.clientY - state.lastPosition.y;
      if ((Math.abs(deltaX) >= minimumMovement || Math.abs(deltaY) >= minimumMovement) && !state.started) {
        start(e);
      }
      if (state.started) {
        onMove == null ? void 0 : onMove(e, deltaX, deltaY);
        state.lastPosition = { x: e.clientX, y: e.clientY };
      }
    }
  };
  const onPointerUp = (e) => {
    var _a2;
    if (e.pointerId === state.id) {
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
      }
      const longPressTriggered = state.longPressTriggered;
      state.longPressTriggered = false;
      if (state.started) {
        onMoveEnd == null ? void 0 : onMoveEnd(e);
      }
      if (state.el) {
        if (e.type !== "pointercancel") {
          (_a2 = props.onPointerUp) == null ? void 0 : _a2.call(props, e, state.el);
          if (e.target && state.el.contains(e.target)) {
            if (longPressTriggered) {
              onLongPress == null ? void 0 : onLongPress(e, state.el);
            } else {
              onPress == null ? void 0 : onPress(e, state.el);
            }
          }
        }
        document.documentElement.style.userSelect = state.originalUserSelect || "";
        state.el.style.touchAction = state.originalTouchAction || "";
      }
      state.id = void 0;
      state.started = false;
      removeGlobalListener(window, "pointermove", onPointerMove, false);
      removeGlobalListener(window, "pointerup", onPointerUp, false);
      removeGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  return {
    domProps: {
      onPointerDown: createEventHandler(onPointerDown)
    }
  };
}
const interactableElements = ["button", "a", "input", "select", "textarea"];
function TableRow({
  item,
  index,
  renderAs,
  className,
  style
}) {
  const {
    selectedRows,
    columns,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    enableSelection,
    selectionStyle,
    hideHeaderRow
  } = useContext(TableContext);
  const isTouchDevice = useRef(false);
  const isSelected = selectedRows.includes(item.id);
  const [isHovered, setIsHovered] = useState(false);
  const clickedOnInteractable = (e) => {
    return e.target.closest(interactableElements.join(","));
  };
  const doubleClickHandler = (e) => {
    if (selectionStyle === "highlight" && onAction && !isTouchDevice.current && !clickedOnInteractable(e)) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const anyRowsSelected = !!selectedRows.length;
  const handleRowTap = (e) => {
    if (clickedOnInteractable(e))
      return;
    if (selectionStyle === "checkbox") {
      if (enableSelection && (anyRowsSelected || !onAction)) {
        toggleRow(item);
      } else if (onAction) {
        onAction(item, index);
      }
    } else if (selectionStyle === "highlight") {
      if (isTouchDevice.current) {
        if (enableSelection && anyRowsSelected) {
          toggleRow(item);
        } else {
          onAction == null ? void 0 : onAction(item, index);
        }
      } else if (enableSelection) {
        selectRow(item, isCtrlOrShiftPressed(e));
      }
    }
  };
  const { domProps } = usePointerEvents({
    onPointerDown: (e) => {
      isTouchDevice.current = e.pointerType === "touch";
    },
    onPress: handleRowTap,
    onLongPress: enableSelection ? () => {
      if (isTouchDevice.current) {
        toggleRow(item);
      }
    } : void 0
  });
  const keyboardHandler = (e) => {
    if (enableSelection && e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (selectionStyle === "checkbox") {
        toggleRow(item);
      } else {
        selectRow(item);
      }
    } else if (e.key === "Enter" && !selectedRows.length && onAction) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const contextMenuHandler = (e) => {
    if (selectRowOnContextMenu && enableSelection) {
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    }
    if (isTouchDevice.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const styleClassName = useTableRowStyle({ index, isSelected });
  const RowElement = renderAs || "div";
  return /* @__PURE__ */ jsx(
    RowElement,
    {
      role: "row",
      "aria-rowindex": index + 1 + (hideHeaderRow ? 0 : 1),
      "aria-selected": isSelected,
      tabIndex: -1,
      className: clsx(className, styleClassName),
      item: RowElement === "div" ? void 0 : item,
      onDoubleClick: createEventHandler(doubleClickHandler),
      onKeyDown: createEventHandler(keyboardHandler),
      onContextMenu: createEventHandler(contextMenuHandler),
      onPointerEnter: createEventHandler(() => setIsHovered(true)),
      onPointerLeave: createEventHandler(() => setIsHovered(false)),
      style,
      ...domProps,
      children: columns.map((column, cellIndex) => /* @__PURE__ */ jsx(
        TableCell,
        {
          rowIndex: index,
          rowIsHovered: isHovered,
          index: cellIndex,
          item
        },
        `${item.id}-${column.key}`
      ))
    }
  );
}
const CheckboxColumnConfig = {
  key: "checkbox",
  header: () => /* @__PURE__ */ jsx(SelectAllCheckbox, {}),
  align: "center",
  width: "w-24 flex-shrink-0",
  body: (item, row) => {
    if (row.isPlaceholder) {
      return /* @__PURE__ */ jsx(Skeleton, { size: "w-24 h-24", variant: "rect" });
    }
    return /* @__PURE__ */ jsx(SelectRowCheckbox, { item });
  }
};
function SelectRowCheckbox({ item }) {
  const { selectedRows, toggleRow } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      checked: selectedRows.includes(item.id),
      onChange: () => toggleRow(item)
    }
  );
}
function SelectAllCheckbox() {
  const { trans } = useTrans();
  const { data, selectedRows, onSelectionChange } = useContext(TableContext);
  const allRowsSelected = !!data.length && data.length === selectedRows.length;
  const someRowsSelected = !allRowsSelected && !!selectedRows.length;
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      "aria-label": trans({ message: "Select all" }),
      isIndeterminate: someRowsSelected,
      checked: allRowsSelected,
      onChange: () => {
        if (allRowsSelected) {
          onSelectionChange([]);
        } else {
          onSelectionChange(data.map((d) => d.id));
        }
      }
    }
  );
}
const ArrowDownwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" }),
  "ArrowDownwardOutlined"
);
function HeaderCell({ index }) {
  const { columns, sortDescriptor, onSortChange, enableSorting } = useContext(TableContext);
  const column = columns[index];
  const style = useTableCellStyle({
    index,
    isHeader: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const sortingKey = column.sortingKey || column.key;
  const allowSorting = column.allowsSorting && enableSorting;
  const { orderBy, orderDir } = sortDescriptor || {};
  const sortActive = allowSorting && orderBy === sortingKey;
  let ariaSort;
  if (sortActive && orderDir === "asc") {
    ariaSort = "ascending";
  } else if (sortActive && orderDir === "desc") {
    ariaSort = "descending";
  } else if (allowSorting) {
    ariaSort = "none";
  }
  const toggleSorting = () => {
    if (!allowSorting)
      return;
    let newSort;
    if (sortActive && orderDir === "desc") {
      newSort = { orderDir: "asc", orderBy: sortingKey };
    } else if (sortActive && orderDir === "asc") {
      newSort = { orderBy: void 0, orderDir: void 0 };
    } else {
      newSort = { orderDir: "desc", orderBy: sortingKey };
    }
    onSortChange == null ? void 0 : onSortChange(newSort);
  };
  const sortVisible = sortActive || isHovered;
  const sortVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-25%" }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "columnheader",
      tabIndex: -1,
      "aria-colindex": index + 1,
      "aria-sort": ariaSort,
      className: clsx(
        style,
        "text-xs font-medium text-muted",
        allowSorting && "cursor-pointer"
      ),
      onMouseEnter: () => {
        setIsHovered(true);
      },
      onMouseLeave: () => {
        setIsHovered(false);
      },
      onKeyDown: (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleSorting();
        }
      },
      onClick: toggleSorting,
      children: [
        column.hideHeader ? /* @__PURE__ */ jsx("div", { className: "opacity-0", children: column.header() }) : column.header(),
        /* @__PURE__ */ jsx(AnimatePresence, { children: allowSorting && /* @__PURE__ */ jsx(
          m.span,
          {
            variants: sortVariants,
            animate: sortVisible ? "visible" : "hidden",
            initial: false,
            transition: { type: "tween" },
            className: "-mt-2 ml-6 inline-block",
            "data-testid": "table-sort-button",
            "aria-hidden": !sortVisible,
            children: /* @__PURE__ */ jsx(
              ArrowDownwardIcon,
              {
                size: "xs",
                className: clsx(
                  "text-muted",
                  orderDir === "asc" && orderBy === sortingKey && "rotate-180 transition-transform"
                )
              }
            )
          },
          "sort-icon"
        ) })
      ]
    }
  );
}
function TableHeaderRow() {
  const { columns } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "row",
      "aria-rowindex": 1,
      tabIndex: -1,
      className: "flex gap-x-16 px-16",
      children: columns.map((column, columnIndex) => /* @__PURE__ */ jsx(HeaderCell, { index: columnIndex }, column.key))
    }
  );
}
function Table({
  className,
  columns: userColumns,
  collapseOnMobile = true,
  hideHeaderRow = false,
  hideBorder = false,
  data,
  selectedRows: propsSelectedRows,
  defaultSelectedRows: propsDefaultSelectedRows,
  onSelectionChange: propsOnSelectionChange,
  sortDescriptor: propsSortDescriptor,
  onSortChange: propsOnSortChange,
  enableSorting = true,
  onDelete,
  enableSelection = true,
  selectionStyle = "checkbox",
  ariaLabelledBy,
  selectRowOnContextMenu,
  onAction,
  renderRowAs,
  tableBody,
  meta,
  tableRef: propsTableRef,
  closeOnInteractOutside = false,
  cellHeight,
  headerCellHeight,
  ...domProps
}) {
  const isMobile = useIsMobileMediaQuery();
  const isCollapsedMode = !!isMobile && collapseOnMobile;
  if (isCollapsedMode) {
    hideHeaderRow = true;
    hideBorder = true;
  }
  const [selectedRows, onSelectionChange] = useControlledState(
    propsSelectedRows,
    propsDefaultSelectedRows || [],
    propsOnSelectionChange
  );
  const [sortDescriptor, onSortChange] = useControlledState(
    propsSortDescriptor,
    void 0,
    propsOnSortChange
  );
  const toggleRow = useCallback(
    (item) => {
      const newValues = [...selectedRows];
      if (!newValues.includes(item.id)) {
        newValues.push(item.id);
      } else {
        const index = newValues.indexOf(item.id);
        newValues.splice(index, 1);
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const selectRow = useCallback(
    // allow deselecting all rows by passing in null
    (item, merge) => {
      let newValues = [];
      if (item) {
        newValues = merge ? [...selectedRows == null ? void 0 : selectedRows.filter((id) => id !== item.id), item.id] : [item.id];
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const columns = useMemo(() => {
    const filteredColumns = userColumns.filter((c) => {
      const visibleInMode = c.visibleInMode || "regular";
      if (visibleInMode === "all") {
        return true;
      }
      if (visibleInMode === "compact" && isCollapsedMode) {
        return true;
      }
      if (visibleInMode === "regular" && !isCollapsedMode) {
        return true;
      }
    });
    const showCheckboxCell = enableSelection && selectionStyle !== "highlight" && !isMobile;
    if (showCheckboxCell) {
      filteredColumns.unshift(CheckboxColumnConfig);
    }
    return filteredColumns;
  }, [isMobile, userColumns, enableSelection, selectionStyle, isCollapsedMode]);
  const contextValue = {
    isCollapsedMode,
    cellHeight,
    headerCellHeight,
    hideBorder,
    hideHeaderRow,
    selectedRows,
    onSelectionChange,
    enableSorting,
    enableSelection,
    selectionStyle,
    data,
    columns,
    sortDescriptor,
    onSortChange,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    meta,
    collapseOnMobile
  };
  const navProps = useGridNavigation({
    cellCount: enableSelection ? columns.length + 1 : columns.length,
    rowCount: data.length + 1
  });
  const tableBodyProps = {
    renderRowAs
  };
  if (!tableBody) {
    tableBody = /* @__PURE__ */ jsx(BasicTableBody, { ...tableBodyProps });
  } else {
    tableBody = cloneElement(tableBody, tableBodyProps);
  }
  const tableRef = useObjectRef(propsTableRef);
  useInteractOutside({
    ref: tableRef,
    onInteractOutside: (e) => {
      if (closeOnInteractOutside && enableSelection && (selectedRows == null ? void 0 : selectedRows.length) && // don't deselect if clicking on a dialog (for example is table row has a context menu)
      !e.target.closest('[role="dialog"]')) {
        onSelectionChange([]);
      }
    }
  });
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps(domProps, navProps, {
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onSelectionChange([]);
            }
          } else if (e.key === "Delete") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onDelete == null ? void 0 : onDelete(
                data.filter((item) => selectedRows == null ? void 0 : selectedRows.includes(item.id))
              );
            }
          } else if (isCtrlKeyPressed(e) && e.key === "a") {
            e.preventDefault();
            e.stopPropagation();
            if (enableSelection) {
              onSelectionChange(data.map((item) => item.id));
            }
          }
        }
      }),
      role: "grid",
      tabIndex: 0,
      "aria-rowcount": data.length + 1,
      "aria-colcount": columns.length + 1,
      ref: tableRef,
      "aria-multiselectable": enableSelection ? true : void 0,
      "aria-labelledby": ariaLabelledBy,
      className: clsx(
        className,
        "isolate select-none text-sm outline-none focus-visible:ring-2"
      ),
      children: [
        !hideHeaderRow && /* @__PURE__ */ jsx(TableHeaderRow, {}),
        tableBody
      ]
    }
  ) });
}
function BasicTableBody({ renderRowAs }) {
  const { data } = useContext(TableContext);
  return /* @__PURE__ */ jsx(Fragment, { children: data.map((item, rowIndex) => /* @__PURE__ */ jsx(
    TableRow,
    {
      item,
      index: rowIndex,
      renderAs: renderRowAs
    },
    item.id
  )) });
}
const EMPTY_PAGINATION_RESPONSE = {
  pagination: { data: [], from: 0, to: 0, per_page: 15, current_page: 1 }
};
function hasPreviousPage(pagination) {
  if ("prev_cursor" in pagination) {
    return pagination.prev_cursor != null;
  }
  if ("prev_page" in pagination) {
    return pagination.prev_page != null;
  }
  return pagination.current_page > 1;
}
function hasNextPage(pagination) {
  if ("next_cursor" in pagination) {
    return pagination.next_cursor != null;
  }
  if ("last_page" in pagination) {
    return pagination.current_page < pagination.last_page;
  }
  if ("next_page" in pagination) {
    return pagination.next_page != null;
  }
  return pagination.data.length > 0 && pagination.data.length >= pagination.per_page;
}
const FilterAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" }),
  "FilterAltOutlined"
);
const AccordionAnimation = {
  variants: {
    open: {
      height: "auto",
      visibility: "visible",
      transitionEnd: {
        overflow: "auto"
      }
    },
    closed: {
      height: 0,
      overflow: "hidden",
      transitionEnd: {
        visibility: "hidden"
      }
    }
  },
  transition: { type: "tween", duration: 0.2 }
};
const Accordion = React.forwardRef(
  ({
    variant = "default",
    mode = "single",
    children,
    className,
    isLazy,
    ...other
  }, ref) => {
    const [expandedValues, setExpandedValues] = useControlledState(
      other.expandedValues,
      other.defaultExpandedValues || [],
      other.onExpandedChange
    );
    const itemsCount = React.Children.count(children);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(variant === "outline" && "space-y-10", className),
        ref,
        role: "presentation",
        children: /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(FocusScope, { children: React.Children.map(children, (child, index) => {
          if (!isValidElement(child))
            return null;
          return cloneElement(child, {
            key: child.key || index,
            value: child.props.value || index,
            isFirst: index === 0,
            isLast: index === itemsCount - 1,
            mode,
            variant,
            expandedValues,
            setExpandedValues,
            isLazy
          });
        }) }) })
      }
    );
  }
);
function AccordionItem(props) {
  const {
    children,
    label,
    disabled,
    bodyClassName,
    bodyPadding = "p-16",
    labelClassName,
    buttonPadding = "py-10 pl-14 pr-10",
    startIcon,
    description,
    endAppend,
    chevronPosition = "right",
    isFirst,
    mode,
    isLazy,
    variant,
    footerContent,
    onHeaderMouseEnter,
    onHeaderMouseLeave
  } = props;
  const expandedValues = props.expandedValues || [];
  const value = props.value || 0;
  const setExpandedValues = props.setExpandedValues || (() => {
  });
  const ref = useRef(null);
  const isExpanded = !disabled && expandedValues.includes(value);
  const wasExpandedOnce = useRef(false);
  if (isExpanded) {
    wasExpandedOnce.current = true;
  }
  const focusManager = useFocusManager();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const toggle = () => {
    const i = expandedValues.indexOf(value);
    if (i > -1) {
      const newKeys = [...expandedValues];
      newKeys.splice(i, 1);
      setExpandedValues(newKeys);
    } else if (mode === "single") {
      setExpandedValues([value]);
    } else {
      setExpandedValues([...expandedValues, value]);
    }
  };
  const chevron = /* @__PURE__ */ jsx("div", { className: clsx(variant === "minimal" && ""), children: /* @__PURE__ */ jsx(
    ArrowDropDownIcon,
    {
      "aria-hidden": "true",
      size: "md",
      className: clsx(
        disabled ? "text-disabled" : "text-muted",
        isExpanded && "rotate-180 transition-transform"
      )
    }
  ) });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        variant === "default" && "border-b",
        variant === "outline" && "rounded-panel border",
        disabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "h3",
          {
            className: clsx(
              "flex w-full items-center justify-between text-sm",
              disabled && "pointer-events-none",
              isFirst && variant === "default" && "border-t",
              isExpanded && variant !== "minimal" ? "border-b" : "border-b border-b-transparent",
              variant === "outline" ? isExpanded ? "rounded-panel-t" : "rounded-panel" : void 0
            ),
            onMouseEnter: onHeaderMouseEnter,
            onMouseLeave: onHeaderMouseLeave,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled,
                  "aria-expanded": isExpanded,
                  id: buttonId,
                  "aria-controls": panelId,
                  type: "button",
                  ref,
                  onKeyDown,
                  onClick: () => {
                    if (!disabled) {
                      toggle();
                    }
                  },
                  className: clsx(
                    "flex flex-auto items-center gap-10 text-left outline-none hover:bg-hover focus-visible:bg-primary/focus",
                    buttonPadding
                  ),
                  children: [
                    chevronPosition === "left" && chevron,
                    startIcon && cloneElement(startIcon, {
                      size: "md",
                      className: clsx(
                        startIcon.props.className,
                        disabled ? "text-disabled" : "text-muted"
                      )
                    }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-auto overflow-hidden overflow-ellipsis", children: [
                      /* @__PURE__ */ jsx("div", { className: labelClassName, "data-testid": "accordion-label", children: label }),
                      description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: description })
                    ] }),
                    chevronPosition === "right" && chevron
                  ]
                }
              ),
              endAppend && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 px-4 text-sm text-muted", children: endAppend })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          m.div,
          {
            "aria-labelledby": id,
            role: "region",
            variants: AccordionAnimation.variants,
            transition: AccordionAnimation.transition,
            initial: false,
            animate: isExpanded ? "open" : "closed",
            children: [
              /* @__PURE__ */ jsx("div", { className: clsx(bodyPadding, bodyClassName), children: !isLazy || wasExpandedOnce ? children : null }),
              footerContent
            ]
          }
        )
      ]
    }
  );
}
function SelectFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      size: "sm",
      name: `${filter.key}.value`,
      selectionMode: "single",
      showSearchField: filter.control.showSearchField,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      searchPlaceholder: filter.control.searchPlaceholder ? trans(filter.control.searchPlaceholder) : void 0,
      children: filter.control.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.key))
    }
  );
}
function DateRangeFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormDateRangePicker,
    {
      min: filter.control.min,
      max: filter.control.max,
      size: "sm",
      name: `${filter.key}.value`,
      granularity: "day",
      closeDialogOnSelection: true
    }
  );
}
const colors = [
  "#3b82f6",
  "#6366f1",
  "#0284c7",
  "#9333ea",
  "#059669",
  "#ea580c",
  "#dc2626",
  "#06b6d4",
  "#e11d48"
];
const AvatarInitialsFallback = forwardRef(
  ({ size, label, color }, ref) => {
    const { initial, bgColor } = useMemo(() => {
      const hash = (label || "").split("").reduce((accum, val) => val.charCodeAt(0) + accum, (label == null ? void 0 : label.length) || 0);
      return {
        initial: label.slice(0, 1).toUpperCase(),
        bgColor: colors[hash % colors.length]
      };
    }, [label]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        style: !color ? { backgroundColor: bgColor } : void 0,
        className: clsx(
          "flex h-full w-full items-center justify-center font-semibold leading-normal text-on-primary",
          color,
          getTextFallbackFontSize(size)
        ),
        children: initial
      }
    );
  }
);
function getTextFallbackFontSize(size) {
  switch (size) {
    case "xs":
      return "text-xs";
    case "sm":
      return "text-xs";
    case "xl":
      return "text-xl";
    case "md":
      return "text-base";
    default:
      return "";
  }
}
const Avatar = forwardRef(
  ({
    className,
    circle,
    size = "md",
    src,
    link,
    label,
    fallback = "initials",
    fallbackColor,
    lazy = true,
    ...domProps
  }, ref) => {
    let renderedAvatar = src ? /* @__PURE__ */ jsx(
      "img",
      {
        ref,
        src,
        alt: label,
        loading: lazy ? "lazy" : void 0,
        className: "block h-full w-full object-cover"
      }
    ) : fallback === "initials" && label ? /* @__PURE__ */ jsx(AvatarInitialsFallback, { size, label, color: fallbackColor }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-alt dark:bg-chip", children: /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: "h-full w-full text-muted"
      }
    ) });
    if (label) {
      renderedAvatar = /* @__PURE__ */ jsx(Tooltip, { label, children: renderedAvatar });
    }
    const wrapperProps = {
      ...domProps,
      className: clsx(
        className,
        "relative block overflow-hidden select-none flex-shrink-0",
        getSizeClassName$1(size),
        circle ? "rounded-full" : "rounded"
      )
    };
    return link ? /* @__PURE__ */ jsx(Link, { ...wrapperProps, to: link, children: renderedAvatar }) : /* @__PURE__ */ jsx("div", { ...wrapperProps, children: renderedAvatar });
  }
);
function getSizeClassName$1(size) {
  switch (size) {
    case "xs":
      return "w-18 h-18";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-40 h-40";
    case "xl":
      return "w-60 h-60";
    default:
      return size;
  }
}
function useNormalizedModels(endpoint, queryParams, queryOptions) {
  return useQuery({
    queryKey: [...endpoint.split("/"), queryParams],
    queryFn: () => fetchModels(endpoint, queryParams),
    placeholderData: keepPreviousData,
    ...queryOptions
  });
}
async function fetchModels(endpoint, params) {
  return apiClient.get(endpoint, { params }).then((r) => {
    if ("results" in r.data) {
      return r.data;
    } else {
      const results = Object.values(r.data).find((v) => Array.isArray(v));
      return { results };
    }
  });
}
function useNormalizedModel(endpoint, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint, queryParams],
    queryFn: () => fetchModel(endpoint, queryParams),
    ...queryOptions
  });
}
async function fetchModel(endpoint, params) {
  return apiClient.get(endpoint, { params }).then((r) => r.data);
}
function NormalizedModelField({
  label,
  className,
  background,
  value,
  defaultValue = "",
  placeholder = message("Select item..."),
  searchPlaceholder = message("Find an item..."),
  onChange,
  description,
  errorMessage,
  invalid,
  autoFocus,
  queryParams,
  endpoint,
  disabled,
  required
}) {
  var _a2;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useControlledState(
    value,
    defaultValue,
    onChange
  );
  const query = useNormalizedModels(endpoint, {
    query: inputValue,
    ...queryParams
  });
  const { trans } = useTrans();
  const fieldClassNames = getInputFieldClassNames({ size: "md" });
  if (selectedValue) {
    return /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsx("div", { className: fieldClassNames.label, children: label }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "rounded-input border p-8",
            background,
            invalid && "border-danger"
          ),
          children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(
            SelectedModelPreview,
            {
              disabled,
              endpoint,
              modelId: selectedValue,
              queryParams,
              onEditClick: () => {
                setSelectedValue("");
                setInputValue("");
                requestAnimationFrame(() => {
                  var _a3, _b2;
                  (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
                  (_b2 = inputRef.current) == null ? void 0 : _b2.click();
                });
              }
            }
          ) })
        }
      ),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, children: errorMessage })
    ] });
  }
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      className,
      showSearchField: true,
      invalid,
      errorMessage,
      description,
      color: "white",
      isAsync: true,
      background,
      placeholder: trans(placeholder),
      searchPlaceholder: trans(searchPlaceholder),
      label,
      isLoading: query.isFetching,
      items: (_a2 = query.data) == null ? void 0 : _a2.results,
      inputValue,
      onInputValueChange: setInputValue,
      selectionMode: "single",
      selectedValue,
      onSelectionChange: setSelectedValue,
      ref: inputRef,
      autoFocus,
      disabled,
      required,
      children: (model) => /* @__PURE__ */ jsx(
        Item,
        {
          value: model.id,
          description: model.description,
          startIcon: /* @__PURE__ */ jsx(Avatar, { src: model.image }),
          children: model.name
        },
        model.id
      )
    }
  );
}
function SelectedModelPreview({
  modelId,
  onEditClick,
  endpoint,
  disabled,
  queryParams
}) {
  const { data, isLoading } = useNormalizedModel(
    `${endpoint}/${modelId}`,
    queryParams
  );
  if (isLoading || !(data == null ? void 0 : data.model)) {
    return /* @__PURE__ */ jsx(LoadingSkeleton, {}, "skeleton");
  }
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: clsx(
        "flex items-center gap-10",
        disabled && "pointer-events-none cursor-not-allowed text-disabled"
      ),
      ...opacityAnimation,
      children: [
        data.model.image && /* @__PURE__ */ jsx(Avatar, { src: data.model.image }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm leading-4", children: data.model.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: data.model.description })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Change item" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-auto text-muted",
            size: "sm",
            onClick: onEditClick,
            disabled,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ) })
      ]
    },
    "preview"
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxs(m.div, { className: "flex items-center gap-10", ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-32 h-32" }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-[36px] flex-auto", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "text-xs" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "max-h-8 text-xs" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "icon", size: "w-24 h-24" })
  ] });
}
function FormNormalizedModelField({
  name,
  ...fieldProps
}) {
  const { clearErrors } = useFormContext();
  const {
    field: { onChange, value = "" },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  return /* @__PURE__ */ jsx(
    NormalizedModelField,
    {
      value,
      onChange: (value2) => {
        onChange(value2);
        clearErrors(name);
      },
      invalid,
      errorMessage: error == null ? void 0 : error.message,
      ...fieldProps
    }
  );
}
function NormalizedModelFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormNormalizedModelField,
    {
      name: `${filter.key}.value`,
      endpoint: `normalized-models/${filter.control.model}`
    }
  );
}
const FilterOperatorNames = {
  "=": message("is"),
  "!=": message("is not"),
  ">": message("is greater than"),
  ">=": message("is greater than or equal to"),
  "<": message("is less than"),
  "<=": message("is less than or equal to"),
  has: message("Include"),
  doesntHave: message("Do not include"),
  between: message("Is between"),
  hasAll: message("Include all")
};
function InputFilterPanel({
  filter
}) {
  var _a2;
  const control = filter.control;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        name: `${filter.key}.operator`,
        className: "mb-14",
        size: "sm",
        required: true,
        children: (_a2 = filter.operators) == null ? void 0 : _a2.map((operator) => /* @__PURE__ */ jsx(Item, { value: operator, children: /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) }, operator))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        size: "sm",
        name: `${filter.key}.value`,
        type: filter.control.inputType,
        min: "minValue" in control ? control.minValue : void 0,
        max: "maxValue" in control ? control.maxValue : void 0,
        minLength: "minLength" in control ? control.minLength : void 0,
        maxLength: "maxLength" in control ? control.maxLength : void 0,
        required: true
      }
    )
  ] });
}
function BooleanFilterPanel({
  filter
}) {
  return null;
}
function ChipList({
  className,
  children,
  size,
  color,
  radius,
  selectable,
  wrap = true
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center gap-8",
        wrap && "flex-wrap",
        className
      ),
      children: Children.map(children, (chip) => {
        if (isValidElement(chip)) {
          return cloneElement(chip, {
            size,
            color,
            selectable,
            radius
          });
        }
      })
    }
  );
}
function stringToChipValue(value) {
  return { id: value, name: `${value}`, description: `${value}` };
}
function ChipFieldInner(props, ref) {
  const fieldRef = useRef(null);
  const inputRef = useObjectRef(ref);
  const {
    displayWith = (v) => v.name,
    validateWith,
    children,
    suggestions,
    isLoading,
    inputValue,
    onInputValueChange,
    onItemSelected,
    placeholder,
    onOpenChange,
    chipSize = "sm",
    openMenuOnFocus = true,
    showEmptyMessage,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange,
    valueKey,
    isAsync,
    allowCustomValue = true,
    showDropdownArrow,
    onChipClick,
    alwaysShowAvatar = false,
    readOnly,
    ...inputFieldProps
  } = props;
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    flexibleHeight: true
  });
  const [value, onChange] = useChipFieldValueState(props);
  const [listboxIsOpen, setListboxIsOpen] = useState(false);
  const loadingIndicator = /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm", "aria-label": "loading..." });
  const dropdownArrow = showDropdownArrow ? /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}) : null;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: inputRef,
    endAdornment: isLoading && listboxIsOpen ? loadingIndicator : dropdownArrow
  });
  return /* @__PURE__ */ jsx(Field, { fieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsxs(
    Input,
    {
      ref: fieldRef,
      className: clsx("flex flex-wrap items-center", fieldClassNames.input),
      onClick: () => {
        var _a2;
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      },
      children: [
        /* @__PURE__ */ jsx(
          ListWrapper,
          {
            displayChipUsing: displayWith,
            onChipClick,
            items: value,
            setItems: onChange,
            chipSize,
            alwaysShowAvatar,
            readOnly
          }
        ),
        /* @__PURE__ */ jsx(
          ChipInput,
          {
            size: props.size,
            showEmptyMessage,
            inputProps,
            inputValue,
            onInputValueChange,
            fieldRef,
            inputRef,
            chips: value,
            setChips: onChange,
            validateWith,
            isLoading,
            suggestions,
            placeholder,
            openMenuOnFocus,
            listboxIsOpen,
            setListboxIsOpen,
            allowCustomValue,
            readOnly,
            children
          }
        )
      ]
    }
  ) });
}
function ListWrapper({
  items,
  setItems,
  displayChipUsing,
  chipSize,
  onChipClick,
  alwaysShowAvatar,
  readOnly
}) {
  const manager = useFocusManager();
  const removeItem = useCallback(
    (key) => {
      const i = items.findIndex((cr) => cr.id === key);
      const newItems = [...items];
      if (i > -1) {
        newItems.splice(i, 1);
        setItems(newItems);
      }
      return newItems;
    },
    [items, setItems]
  );
  return /* @__PURE__ */ jsx(
    ChipList,
    {
      className: clsx(
        "max-w-full flex-shrink-0 flex-wrap",
        chipSize === "xs" ? "my-6" : "my-8"
      ),
      size: chipSize,
      selectable: true,
      children: items.map((item) => /* @__PURE__ */ jsx(
        Chip,
        {
          errorMessage: item.errorMessage,
          adornment: item.image || alwaysShowAvatar ? /* @__PURE__ */ jsx(
            Avatar,
            {
              circle: true,
              src: item.image,
              fallback: "initials",
              label: item.name
            }
          ) : null,
          onClick: () => onChipClick == null ? void 0 : onChipClick(item),
          onRemove: readOnly ? void 0 : () => {
            const newItems = removeItem(item.id);
            if (newItems.length) {
              manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
            } else {
              manager == null ? void 0 : manager.focusLast();
            }
          },
          children: displayChipUsing(item)
        },
        item.id
      ))
    }
  );
}
function ChipInput(props) {
  const {
    inputRef,
    fieldRef,
    validateWith,
    setChips,
    chips,
    suggestions,
    inputProps,
    placeholder,
    openMenuOnFocus,
    listboxIsOpen,
    setListboxIsOpen,
    allowCustomValue,
    isLoading,
    size,
    readOnly
  } = props;
  const manager = useFocusManager();
  const addItems = useCallback(
    (items) => {
      items = (items || []).filter((item) => {
        const invalid = !item || !item.id || !item.name;
        const alreadyExists = chips.findIndex((cr) => cr.id === (item == null ? void 0 : item.id)) > -1;
        return !alreadyExists && !invalid;
      });
      if (!items.length)
        return;
      if (validateWith) {
        items = items.map((item) => validateWith(item));
      }
      setChips([...chips, ...items]);
    },
    [chips, setChips, validateWith]
  );
  const listbox = useListbox({
    ...props,
    clearInputOnItemSelection: true,
    isOpen: listboxIsOpen,
    onOpenChange: setListboxIsOpen,
    items: suggestions,
    selectionMode: "none",
    role: "listbox",
    virtualFocus: true,
    onItemSelected: (value) => {
      handleItemSelection(value);
    }
  });
  const {
    state: {
      activeIndex,
      setActiveIndex,
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue
    },
    refs,
    listboxId,
    collection,
    onInputChange
  } = listbox;
  const handleItemSelection = (textValue) => {
    const option = collection.size && activeIndex != null ? [...collection.values()][activeIndex] : null;
    if (option == null ? void 0 : option.item) {
      addItems([option.item]);
    } else if (allowCustomValue) {
      addItems([stringToChipValue(option ? option.value : textValue)]);
    }
    setInputValue("");
    setActiveIndex(null);
    setIsOpen(false);
  };
  useLayoutEffect(() => {
    if (fieldRef.current && refs.reference.current !== fieldRef.current) {
      listbox.reference(fieldRef.current);
    }
  }, [fieldRef, listbox, refs]);
  const { handleTriggerKeyDown, handleListboxKeyboardNavigation } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(() => {
    if (openMenuOnFocus && !isOpen) {
      setIsOpen(true);
    }
  });
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          readOnly,
          type: "text",
          className: clsx(
            "mx-8 my-4 min-w-30 flex-[1_1_60px] bg-transparent text-sm outline-none",
            size === "xs" ? "h-20" : "h-30"
          ),
          placeholder,
          ...mergeProps(inputProps, {
            ref: inputRef,
            value: inputValue,
            onChange: onInputChange,
            onPaste: (e) => {
              const paste = e.clipboardData.getData("text");
              const emails = paste.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
              );
              if (emails) {
                e.preventDefault();
                const selection = window.getSelection();
                if (selection == null ? void 0 : selection.rangeCount) {
                  selection.deleteFromDocument();
                  addItems(emails.map((email) => stringToChipValue(email)));
                }
              }
            },
            "aria-autocomplete": "list",
            "aria-controls": isOpen ? listboxId : void 0,
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            onKeyDown: (e) => {
              if (readOnly)
                return;
              const input = e.target;
              if (e.key === "Enter") {
                e.preventDefault();
                handleItemSelection(input.value);
                return;
              }
              if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                setInputValue("");
              }
              if (e.key === "ArrowUp" && isOpen && (activeIndex === 0 || activeIndex == null)) {
                setActiveIndex(null);
                return;
              }
              if (activeIndex != null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                e.preventDefault();
                return;
              }
              if ((e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "Delete") && input.selectionStart === 0 && activeIndex == null && chips.length) {
                manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
                return;
              }
              const handled = handleTriggerKeyDown(e);
              if (!handled) {
                handleListboxKeyboardNavigation(e);
              }
            },
            onFocus: readOnly ? void 0 : handleFocusAndClick,
            onClick: readOnly ? void 0 : handleFocusAndClick
          })
        }
      )
    }
  );
}
function useChipFieldValueState({
  onChange,
  value,
  defaultValue,
  valueKey
}) {
  const propsValue = useMemo(() => {
    return mixedValueToChipValue(value);
  }, [value]);
  const propsDefaultValue = useMemo(() => {
    return mixedValueToChipValue(defaultValue);
  }, [defaultValue]);
  const handleChange = useCallback(
    (value2) => {
      const newValue = valueKey ? value2.map((v) => v[valueKey]) : value2;
      onChange == null ? void 0 : onChange(newValue);
    },
    [onChange, valueKey]
  );
  return useControlledState(
    !propsValue ? void 0 : propsValue,
    propsDefaultValue || [],
    handleChange
  );
}
function mixedValueToChipValue(value) {
  if (value == null) {
    return void 0;
  }
  return value.map((v) => {
    return typeof v !== "object" ? stringToChipValue(v) : v;
  });
}
const ChipField = React.forwardRef(ChipFieldInner);
function FormChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props), children });
}
function ChipFieldFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      size: "sm",
      name: `${filter.key}.value`,
      valueKey: "id",
      allowCustomValue: false,
      showDropdownArrow: true,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      displayWith: (chip) => {
        var _a2;
        return (_a2 = filter.control.options.find((o) => o.key === chip.id)) == null ? void 0 : _a2.label.message;
      },
      suggestions: filter.control.options.map((o) => ({
        id: o.key,
        name: o.label.message
      })),
      children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: /* @__PURE__ */ jsx(Trans, { message: chip.name }) }, chip.id)
    }
  );
}
function AddFilterDialog({ filters }) {
  const { decodedFilters } = useBackendFilterUrlParams(filters);
  const { formId } = useDialogContext();
  const [expandedFilters, setExpandedFilters] = useState(
    () => {
      return decodedFilters.map((f) => f.key);
    }
  );
  const clearButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      className: "mr-auto",
      onClick: () => {
        setExpandedFilters([]);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
    }
  );
  const applyButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "flat",
      color: "primary",
      className: "ml-auto",
      type: "submit",
      form: formId,
      children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { className: "min-w-[300px]", maxWidth: "max-w-400", size: "auto", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        padding: "px-14 py-10",
        leftAdornment: clearButton,
        rightAdornment: applyButton,
        children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(
      FilterList$1,
      {
        filters,
        expandedFilters,
        setExpandedFilters
      }
    ) })
  ] });
}
function FilterList$1({
  filters,
  expandedFilters,
  setExpandedFilters
}) {
  const { decodedFilters, replaceAll } = useBackendFilterUrlParams(filters);
  const defaultValues = {};
  filters.forEach((filter) => {
    const appliedFilter = decodedFilters.find((f) => f.key === filter.key);
    defaultValues[filter.key] = (appliedFilter == null ? void 0 : appliedFilter.value) !== void 0 ? (
      // there might be some extra keys set on filter besides
      // "value" and "operator", so add the whole object to form
      appliedFilter
    ) : {
      value: filter.control.defaultValue,
      operator: filter.defaultOperator
    };
  });
  const form = useForm({ defaultValues });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    Form,
    {
      form,
      id: formId,
      onSubmit: (formValue) => {
        const filterValue = Object.entries(formValue).filter(
          ([key, fieldValue]) => expandedFilters.includes(key) && fieldValue !== void 0
        ).map(([key, fieldValue]) => ({
          key,
          ...fieldValue
          // value and operator from form
        }));
        replaceAll(filterValue);
        close();
      },
      children: /* @__PURE__ */ jsx(
        Accordion,
        {
          mode: "multiple",
          expandedValues: expandedFilters,
          onExpandedChange: setExpandedFilters,
          children: filters.map((filter) => /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              startIcon: /* @__PURE__ */ jsx(Checkbox, { checked: expandedFilters.includes(filter.key) }),
              value: filter.key,
              label: /* @__PURE__ */ jsx(Trans, { ...filter.label }),
              bodyClassName: "max-h-288 overflow-y-auto compact-scrollbar",
              children: [
                filter.description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "text-xs text-muted",
                      // boolean filter will have nothing in the panel, no need to add margin
                      filter.control.type !== FilterControlType.BooleanToggle && "mb-14"
                    ),
                    children: /* @__PURE__ */ jsx(Trans, { ...filter.description })
                  }
                ),
                /* @__PURE__ */ jsx(AddFilterDialogPanel, { filter })
              ]
            },
            filter.key
          ))
        }
      )
    }
  );
}
function AddFilterDialogPanel({ filter }) {
  switch (filter.control.type) {
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(
        SelectFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(
        ChipFieldFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(
        DateRangeFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(
        NormalizedModelFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(
        InputFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(
        BooleanFilterPanel,
        {
          filter
        }
      );
    case "custom":
      const CustomComponent = filter.control.panel;
      return /* @__PURE__ */ jsx(
        CustomComponent,
        {
          filter
        }
      );
    default:
      return null;
  }
}
function AddFilterButton({
  filters,
  icon = /* @__PURE__ */ jsx(FilterAltIcon, {}),
  color = "primary",
  variant = "outline",
  size = "sm",
  disabled,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  const desktopButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      color,
      startIcon: icon,
      disabled,
      size,
      className,
      children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
    }
  );
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size: "sm",
      variant,
      disabled,
      className,
      children: icon
    }
  );
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    isMobile ? mobileButton : desktopButton,
    /* @__PURE__ */ jsx(AddFilterDialog, { filters })
  ] });
}
const FilterListTriggerButton = forwardRef((props, ref) => {
  const { isInactive, filter, ...domProps } = props;
  if (isInactive) {
    return /* @__PURE__ */ jsx(InactiveFilterButton, { filter, ...domProps, ref });
  }
  return /* @__PURE__ */ jsx(ActiveFilterButton, { filter, ...domProps, ref });
});
const InactiveFilterButton = forwardRef(({ filter, ...domProps }, ref) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "paper",
      radius: "rounded-md",
      border: "border",
      ref,
      endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ...domProps,
      children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
    }
  );
});
const ActiveFilterButton = forwardRef(({ filter, children, ...domProps }, ref) => {
  const isBoolean = filter.control.type === FilterControlType.BooleanToggle;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "primary",
      radius: "rounded-r-md",
      border: "border-y border-r",
      endIcon: !isBoolean && /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ref,
      ...domProps,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              !isBoolean && "mr-8 border-r border-r-primary-light pr-8"
            ),
            children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
          }
        ),
        children
      ]
    }
  );
});
function FilterListItemDialogTrigger(props) {
  const { onValueChange, isInactive, filter, label } = props;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      offset: 10,
      type: "popover",
      onClose: (value) => {
        if (value !== void 0) {
          onValueChange(value);
        }
      },
      children: [
        /* @__PURE__ */ jsx(FilterListTriggerButton, { isInactive, filter, children: label }),
        /* @__PURE__ */ jsx(FilterListControlDialog, { ...props })
      ]
    }
  );
}
function FilterListControlDialog({
  filter,
  panel,
  value,
  operator
}) {
  const form = useForm({
    defaultValues: {
      [filter.key]: { value, operator }
    }
  });
  const { close, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xs", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { ...filter.label }) }),
    /* @__PURE__ */ jsx(DialogBody, { padding: "px-14 pt-14 pb-4 max-h-288", children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onSubmit: (formValue) => {
          close(formValue[filter.key]);
        },
        children: [
          filter.description && /* @__PURE__ */ jsx("div", { className: "mb-14 text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { ...filter.description }) }),
          panel
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        form: formId,
        type: "submit",
        variant: "flat",
        color: "primary",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
      }
    ) })
  ] });
}
const FormattedNumber = memo(
  ({ value, ...options }) => {
    const formatter = useNumberFormatter(options);
    if (isNaN(value)) {
      value = 0;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(value) });
  },
  shallowEqual
);
function FilterListControl(props) {
  switch (props.filter.control.type) {
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(DatePickerControl, { ...props });
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(BooleanToggleControl, { ...props });
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(SelectControl, { ...props });
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(ChipFieldControl, { ...props });
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(InputControl, { ...props });
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(SelectModelControl, { ...props });
    case FilterControlType.Custom:
      const Control = props.filter.control.listItem;
      return /* @__PURE__ */ jsx(Control, { ...props });
    default:
      return null;
  }
}
function DatePickerControl(props) {
  const { value, filter } = props;
  let valueLabel;
  if (value.preset !== void 0) {
    valueLabel = /* @__PURE__ */ jsx(Trans, { ...DateRangePresets[value.preset].label });
  } else {
    valueLabel = /* @__PURE__ */ jsx(
      FormattedDateTimeRange,
      {
        start: new Date(value.start),
        end: new Date(value.end),
        options: { dateStyle: "medium" }
      }
    );
  }
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: valueLabel,
      panel: /* @__PURE__ */ jsx(DateRangeFilterPanel, { filter })
    }
  );
}
function BooleanToggleControl({
  filter,
  isInactive,
  onValueChange
}) {
  return /* @__PURE__ */ jsx(
    FilterListTriggerButton,
    {
      onClick: () => {
        onValueChange({ value: filter.control.defaultValue });
      },
      filter,
      isInactive
    }
  );
}
function SelectControl(props) {
  const { filter, value } = props;
  const option = filter.control.options.find((o) => o.key === value);
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: option ? /* @__PURE__ */ jsx(Trans, { ...option.label }) : null,
      panel: /* @__PURE__ */ jsx(SelectFilterPanel, { filter })
    }
  );
}
function ChipFieldControl(props) {
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsx(MultipleValues, { ...props }),
      panel: /* @__PURE__ */ jsx(ChipFieldFilterPanel, { filter: props.filter })
    }
  );
}
function MultipleValues(props) {
  const { trans } = useTrans();
  const { filter, value } = props;
  const options = value.map((v) => filter.control.options.find((o) => o.key === v));
  const maxShownCount = 3;
  const notShownCount = value.length - maxShownCount;
  const names = /* @__PURE__ */ jsx(Fragment, { children: options.filter(Boolean).slice(0, maxShownCount).map((o, i) => {
    let name = "";
    if (i !== 0) {
      name += ", ";
    }
    name += trans(o.label);
    return name;
  }) });
  return notShownCount > 0 ? /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":names + :count more",
      values: { names, count: notShownCount }
    }
  ) : names;
}
function InputControl(props) {
  const { filter, value, operator } = props;
  const operatorLabel = operator ? /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) : null;
  const formattedValue = filter.control.inputType === "number" ? /* @__PURE__ */ jsx(FormattedNumber, { value }) : value;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsxs(Fragment, { children: [
        operatorLabel,
        " ",
        formattedValue
      ] }),
      panel: /* @__PURE__ */ jsx(InputFilterPanel, { filter })
    }
  );
}
function SelectModelControl(props) {
  const { value, filter } = props;
  const { isLoading, data } = useNormalizedModel(
    `normalized-models/${filter.control.model}/${value}`,
    void 0,
    { enabled: !!value }
  );
  const skeleton = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", size: "w-18 h-18 mr-6" }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-50" })
  ] });
  const modelPreview = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Avatar, { size: "xs", src: data == null ? void 0 : data.model.image, className: "mr-6" }),
    data == null ? void 0 : data.model.name
  ] });
  const label = isLoading || !data ? skeleton : modelPreview;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label,
      panel: /* @__PURE__ */ jsx(NormalizedModelFilterPanel, { filter })
    }
  );
}
function FilterList({
  filters,
  pinnedFilters,
  className
}) {
  const { decodedFilters, remove, replaceAll } = useBackendFilterUrlParams(
    filters,
    pinnedFilters
  );
  if (!decodedFilters.length)
    return null;
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-6 overflow-x-auto", className), children: decodedFilters.map((field, index) => {
    const filter = filters.find((f) => f.key === field.key);
    if (!filter)
      return null;
    const handleValueChange = (payload) => {
      const newFilters = [...decodedFilters];
      newFilters.splice(index, 1, {
        key: filter.key,
        value: payload.value,
        isInactive: false,
        operator: payload.operator || filter.defaultOperator
      });
      replaceAll(newFilters);
    };
    return /* @__PURE__ */ jsxs("div", { children: [
      !field.isInactive && /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "xs",
          radius: "rounded-l-md",
          onClick: () => {
            remove(field.key);
          },
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        FilterListControl,
        {
          filter,
          isInactive: field.isInactive,
          value: field.valueKey != null ? field.valueKey : field.value,
          operator: field.operator,
          onValueChange: handleValueChange
        }
      )
    ] }, field.key);
  }) });
}
function FilterListSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: "flex h-30 items-center gap-6",
      ...opacityAnimation,
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-144", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-112", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-172", radius: "rounded-md" })
      ]
    },
    "filter-list-skeleton"
  );
}
const AddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }),
  "AddOutlined"
);
function NameWithAvatar({
  image,
  label,
  description,
  className,
  labelClassName,
  avatarSize = "md",
  alwaysShowAvatar,
  avatarLabel,
  avatarCircle
}) {
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-12", className), children: [
    (image || alwaysShowAvatar) && /* @__PURE__ */ jsx(
      Avatar,
      {
        size: avatarSize,
        className: "flex-shrink-0",
        src: image,
        label: avatarLabel ?? label,
        fallback: "initials",
        circle: avatarCircle
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(labelClassName, "overflow-hidden overflow-ellipsis"),
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-xs text-muted", children: description })
    ] })
  ] });
}
function BaseSlider(props) {
  const {
    size = "md",
    inline,
    label,
    showValueLabel = !!label,
    className,
    width = "w-full",
    slider,
    children,
    trackColor = "primary",
    fillColor = "primary"
  } = props;
  const {
    domProps,
    trackRef,
    getThumbPercent,
    getThumbValueLabel,
    labelId,
    groupId,
    thumbIds,
    isDisabled,
    numberFormatter,
    minValue,
    maxValue,
    step,
    values,
    getValueLabel
  } = slider;
  let outputValue = "";
  let maxLabelLength = Math.max(
    [...numberFormatter.format(minValue)].length,
    [...numberFormatter.format(maxValue)].length,
    [...numberFormatter.format(step)].length
  );
  if (getValueLabel) {
    outputValue = getValueLabel(values[0]);
  } else if (values.length === 1) {
    outputValue = getThumbValueLabel(0);
  } else if (values.length === 2) {
    outputValue = `${getThumbValueLabel(0)} – ${getThumbValueLabel(1)}`;
    maxLabelLength = 3 + 2 * Math.max(
      maxLabelLength,
      [...numberFormatter.format(minValue)].length,
      [...numberFormatter.format(maxValue)].length
    );
  }
  const style = getInputFieldClassNames({
    size,
    disabled: isDisabled,
    labelDisplay: "flex"
  });
  const wrapperClassname = clsx("touch-none", className, width, {
    "flex items-center": inline
  });
  return /* @__PURE__ */ jsxs("div", { className: wrapperClassname, role: "group", id: groupId, children: [
    (label || showValueLabel) && /* @__PURE__ */ jsxs("div", { className: clsx(style.label, "select-none"), children: [
      label && /* @__PURE__ */ jsx(
        "label",
        {
          onClick: () => {
            var _a2;
            (_a2 = document.getElementById(thumbIds[0])) == null ? void 0 : _a2.focus();
          },
          id: labelId,
          htmlFor: groupId,
          children: label
        }
      ),
      showValueLabel && /* @__PURE__ */ jsx(
        "output",
        {
          htmlFor: thumbIds[0],
          className: "ml-auto text-right",
          "aria-live": "off",
          style: !maxLabelLength ? void 0 : {
            width: `${maxLabelLength}ch`,
            minWidth: `${maxLabelLength}ch`
          },
          children: outputValue
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        className: clsx("relative", getWrapperHeight(props)),
        ...domProps,
        role: "presentation",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute inset-0 m-auto rounded",
                getTrackColor(trackColor, isDisabled),
                getTrackHeight(size)
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute inset-0 my-auto rounded",
                getFillColor(fillColor, isDisabled),
                getTrackHeight(size)
              ),
              style: { width: `${Math.max(getThumbPercent(0) * 100, 0)}%` }
            }
          ),
          children
        ]
      }
    )
  ] });
}
function getWrapperHeight({ size, wrapperHeight }) {
  if (wrapperHeight)
    return wrapperHeight;
  switch (size) {
    case "xs":
      return "h-14";
    case "sm":
      return "h-20";
    default:
      return "h-30";
  }
}
function getTrackHeight(size) {
  switch (size) {
    case "xs":
      return "h-2";
    case "sm":
      return "h-3";
    default:
      return "h-4";
  }
}
function getTrackColor(color, isDisabled) {
  if (isDisabled) {
    color = "disabled";
  }
  switch (color) {
    case "disabled":
      return "bg-slider-disabled/60";
    case "primary":
      return "bg-primary-light";
    case "neutral":
      return "bg-divider";
    default:
      return color;
  }
}
function getFillColor(color, isDisabled) {
  if (isDisabled) {
    color = "disabled";
  }
  switch (color) {
    case "disabled":
      return "bg-slider-disabled";
    case "primary":
      return "bg-primary";
    default:
      return color;
  }
}
function useSlider({
  minValue = 0,
  maxValue = 100,
  isDisabled = false,
  step = 1,
  formatOptions,
  onChangeEnd,
  onPointerDown,
  label,
  getValueLabel,
  showThumbOnHoverOnly,
  thumbSize,
  onPointerMove,
  ...props
}) {
  const [isPointerOver, setIsPointerOver] = useState(false);
  const numberFormatter = useNumberFormatter(formatOptions);
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const trackRef = useRef(null);
  const [values, setValues] = useControlledState(
    props.value ? props.value : void 0,
    props.defaultValue ?? [minValue],
    props.onChange
  );
  const valuesRef = useRef(null);
  valuesRef.current = values;
  const [draggedThumbs, setDraggedThumbs] = useState(
    new Array(values.length).fill(false)
  );
  const draggedThumbsRef = useRef(null);
  draggedThumbsRef.current = draggedThumbs;
  function getFormattedValue(value) {
    return numberFormatter.format(value);
  }
  const isThumbDragging = (index) => {
    var _a2;
    return ((_a2 = draggedThumbsRef.current) == null ? void 0 : _a2[index]) || false;
  };
  const getThumbValueLabel = (index) => getFormattedValue(values[index]);
  const getThumbMinValue = (index) => index === 0 ? minValue : values[index - 1];
  const getThumbMaxValue = (index) => index === values.length - 1 ? maxValue : values[index + 1];
  const setThumbValue = (index, value) => {
    if (isDisabled || !isThumbEditable(index) || !valuesRef.current) {
      return;
    }
    const thisMin = getThumbMinValue(index);
    const thisMax = getThumbMaxValue(index);
    value = snapValueToStep(value, thisMin, thisMax, step);
    valuesRef.current = replaceIndex(valuesRef.current, index, value);
    setValues(valuesRef.current);
  };
  const updateDraggedThumbs = (index, dragging) => {
    var _a2;
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }
    const wasDragging = (_a2 = draggedThumbsRef.current) == null ? void 0 : _a2[index];
    draggedThumbsRef.current = replaceIndex(
      draggedThumbsRef.current || [],
      index,
      dragging
    );
    setDraggedThumbs(draggedThumbsRef.current);
    if (onChangeEnd && wasDragging && !draggedThumbsRef.current.some(Boolean)) {
      onChangeEnd(valuesRef.current || []);
    }
  };
  const [focusedThumb, setFocusedThumb] = useState(
    void 0
  );
  const getValuePercent = (value) => {
    const x = Math.min(1, (value - minValue) / (maxValue - minValue));
    if (isNaN(x)) {
      return 0;
    }
    return x;
  };
  const getThumbPercent = (index) => getValuePercent(valuesRef.current[index]);
  const setThumbPercent = (index, percent) => {
    setThumbValue(index, getPercentValue(percent));
  };
  const getRoundedValue = (value) => Math.round((value - minValue) / step) * step + minValue;
  const getPercentValue = (percent) => {
    const val = percent * (maxValue - minValue) + minValue;
    return clamp(getRoundedValue(val), minValue, maxValue);
  };
  const editableThumbsRef = useRef(
    new Array(values.length).fill(true)
  );
  const isThumbEditable = (index) => editableThumbsRef.current[index];
  const setThumbEditable = (index, editable) => {
    editableThumbsRef.current[index] = editable;
  };
  const realTimeTrackDraggingIndex = useRef(null);
  const currentPointer = useRef(void 0);
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)) {
      return;
    }
    onPointerDown == null ? void 0 : onPointerDown();
    if (trackRef.current && !isDisabled && values.every((_, i) => !draggedThumbs[i])) {
      const size = trackRef.current.offsetWidth;
      const trackPosition = trackRef.current.getBoundingClientRect().left;
      const offset = e.clientX - trackPosition;
      const percent = offset / size;
      const value = getPercentValue(percent);
      let closestThumb;
      const split = values.findIndex((v) => value - v < 0);
      if (split === 0) {
        closestThumb = split;
      } else if (split === -1) {
        closestThumb = values.length - 1;
      } else {
        const lastLeft = values[split - 1];
        const firstRight = values[split];
        if (Math.abs(lastLeft - value) < Math.abs(firstRight - value)) {
          closestThumb = split - 1;
        } else {
          closestThumb = split;
        }
      }
      if (closestThumb >= 0 && isThumbEditable(closestThumb)) {
        e.preventDefault();
        realTimeTrackDraggingIndex.current = closestThumb;
        setFocusedThumb(closestThumb);
        currentPointer.current = e.pointerId;
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, true);
        setThumbValue(closestThumb, value);
        addGlobalListener(window, "pointerup", onUpTrack, false);
      } else {
        realTimeTrackDraggingIndex.current = null;
      }
    }
  };
  const currentPosition = useRef(null);
  const { domProps: moveDomProps } = usePointerEvents({
    onPointerDown: handlePointerDown,
    onMoveStart() {
      currentPosition.current = null;
    },
    onMove(e, deltaX) {
      var _a2;
      const size = ((_a2 = trackRef.current) == null ? void 0 : _a2.offsetWidth) || 0;
      if (currentPosition.current == null) {
        currentPosition.current = getThumbPercent(realTimeTrackDraggingIndex.current || 0) * size;
      }
      currentPosition.current += deltaX;
      if (realTimeTrackDraggingIndex.current != null && trackRef.current) {
        const percent = clamp(currentPosition.current / size, 0, 1);
        setThumbPercent(realTimeTrackDraggingIndex.current, percent);
      }
    },
    onMoveEnd() {
      if (realTimeTrackDraggingIndex.current != null) {
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, false);
        realTimeTrackDraggingIndex.current = null;
      }
    }
  });
  const domProps = mergeProps(moveDomProps, {
    onPointerEnter: () => {
      setIsPointerOver(true);
    },
    onPointerLeave: () => {
      setIsPointerOver(false);
    },
    onPointerMove: (e) => {
      onPointerMove == null ? void 0 : onPointerMove(e);
    }
  });
  const onUpTrack = (e) => {
    const id2 = e.pointerId;
    if (id2 === currentPointer.current) {
      if (realTimeTrackDraggingIndex.current != null) {
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, false);
        realTimeTrackDraggingIndex.current = null;
      }
      removeGlobalListener(window, "pointerup", onUpTrack, false);
    }
  };
  const id = useId();
  const labelId = label ? `${id}-label` : void 0;
  const groupId = `${id}-group`;
  const thumbIds = [...Array(values.length)].map((v, i) => {
    return `${id}-thumb-${i}`;
  });
  return {
    domProps,
    trackRef,
    isDisabled,
    step,
    values,
    minValue,
    maxValue,
    focusedThumb,
    labelId,
    groupId,
    thumbIds,
    numberFormatter,
    getThumbPercent,
    getThumbMinValue,
    getThumbMaxValue,
    getThumbValueLabel,
    isThumbDragging,
    setThumbValue,
    updateDraggedThumbs,
    setThumbEditable,
    setFocusedThumb,
    getValueLabel,
    isPointerOver,
    showThumbOnHoverOnly,
    thumbSize
  };
}
function replaceIndex(array, index, value) {
  if (array[index] === value) {
    return array;
  }
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
function SliderThumb({
  index,
  slider,
  isDisabled: isThumbDisabled,
  ariaLabel,
  inputRef,
  onBlur,
  fillColor = "primary"
}) {
  const inputObjRef = useObjectRef(inputRef);
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const {
    step,
    values,
    focusedThumb,
    labelId,
    thumbIds,
    isDisabled: isSliderDisabled,
    getThumbPercent,
    getThumbMinValue,
    getThumbMaxValue,
    getThumbValueLabel,
    setThumbValue,
    updateDraggedThumbs,
    isThumbDragging,
    setThumbEditable,
    setFocusedThumb,
    isPointerOver,
    showThumbOnHoverOnly,
    thumbSize = "w-18 h-18"
  } = slider;
  const isDragging = isThumbDragging(index);
  const value = values[index];
  setThumbEditable(index, !isThumbDisabled);
  const isDisabled = isThumbDisabled || isSliderDisabled;
  const focusInput = useCallback(() => {
    if (inputObjRef.current) {
      inputObjRef.current.focus({ preventScroll: true });
    }
  }, [inputObjRef]);
  const isFocused = focusedThumb === index;
  useEffect(() => {
    if (isFocused) {
      focusInput();
    }
  }, [isFocused, focusInput]);
  const currentPointer = useRef(void 0);
  const handlePointerUp = (e) => {
    if (e.pointerId === currentPointer.current) {
      focusInput();
      updateDraggedThumbs(index, false);
      removeGlobalListener(window, "pointerup", handlePointerUp, false);
    }
  };
  const className = clsx(
    "outline-none rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 absolute inset-0 transition-button duration-200",
    thumbSize,
    !isDisabled && "shadow-md",
    thumbColor({ fillColor, isDisabled, isDragging }),
    // show thumb on hover and while dragging, otherwise "blur" event will fire on thumb and dragging will stop
    !showThumbOnHoverOnly || showThumbOnHoverOnly && isDragging || isPointerOver ? "visible" : "invisible"
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "presentation",
      className,
      style: {
        left: `${Math.max(getThumbPercent(index) * 100, 0)}%`
      },
      onPointerDown: (e) => {
        if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
          return;
        }
        focusInput();
        currentPointer.current = e.pointerId;
        updateDraggedThumbs(index, true);
        addGlobalListener(window, "pointerup", handlePointerUp, false);
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          id: thumbIds[index],
          onKeyDown: createEventHandler(() => {
            updateDraggedThumbs(index, true);
          }),
          onKeyUp: createEventHandler(() => {
            updateDraggedThumbs(index, false);
          }),
          ref: inputObjRef,
          tabIndex: !isDisabled ? 0 : void 0,
          min: getThumbMinValue(index),
          max: getThumbMaxValue(index),
          step,
          value,
          disabled: isDisabled,
          "aria-label": ariaLabel,
          "aria-labelledby": labelId,
          "aria-orientation": "horizontal",
          "aria-valuetext": getThumbValueLabel(index),
          onFocus: () => {
            setFocusedThumb(index);
          },
          onBlur: (e) => {
            setFocusedThumb(void 0);
            updateDraggedThumbs(index, false);
            onBlur == null ? void 0 : onBlur(e);
          },
          onChange: (e) => {
            setThumbValue(index, parseFloat(e.target.value));
          },
          type: "range",
          className: "sr-only"
        }
      )
    }
  );
}
function thumbColor({
  isDisabled,
  isDragging,
  fillColor
}) {
  if (isDisabled) {
    return "bg-slider-disabled cursor-default";
  }
  if (fillColor && fillColor !== "primary") {
    return fillColor;
  }
  return clsx(
    "hover:bg-primary-dark",
    isDragging ? "bg-primary-dark" : "bg-primary"
  );
}
function Slider({ inputRef, onBlur, ...props }) {
  const { onChange, onChangeEnd, value, defaultValue, ...otherProps } = props;
  const baseProps = {
    ...otherProps,
    // Normalize `value: number[]` to `value: number`
    value: value != null ? [value] : void 0,
    defaultValue: defaultValue != null ? [defaultValue] : void 0,
    onChange: (v) => {
      onChange == null ? void 0 : onChange(v[0]);
    },
    onChangeEnd: (v) => {
      onChangeEnd == null ? void 0 : onChangeEnd(v[0]);
    }
  };
  const slider = useSlider(baseProps);
  return /* @__PURE__ */ jsx(BaseSlider, { ...baseProps, slider, children: /* @__PURE__ */ jsx(
    SliderThumb,
    {
      fillColor: props.fillColor,
      index: 0,
      slider,
      inputRef,
      onBlur
    }
  ) });
}
function FormSlider({ name, ...props }) {
  const {
    field: { onChange, onBlur, value = "", ref }
  } = useController({
    name
  });
  const formProps = {
    onChange,
    onBlur,
    value: value || ""
    // avoid issues with "null" value when setting form defaults from backend model
  };
  return /* @__PURE__ */ jsx(Slider, { inputRef: ref, ...mergeProps(formProps, props) });
}
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const draggables = /* @__PURE__ */ new Map();
const droppables = /* @__PURE__ */ new Map();
const dragMonitors = /* @__PURE__ */ new Map();
const dragSession = {
  status: "inactive"
};
function interactableEvent({
  e,
  rect,
  deltaX,
  deltaY
}) {
  return {
    rect,
    x: e.clientX,
    y: e.clientY,
    deltaX: deltaX ?? 0,
    deltaY: deltaY ?? 0,
    nativeEvent: e
  };
}
let activeInteraction = null;
function setActiveInteraction(name) {
  activeInteraction = name;
}
function domRectToObj(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}
function updateRects(targets) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { width, height, left, top } = entry.boundingClientRect;
      const [id, target] = [...targets].find(
        ([, target2]) => target2.ref.current === entry.target
      ) || [];
      if (id == null || target == null)
        return;
      const rect = {
        width,
        height,
        left,
        top
      };
      targets.set(id, { ...target, rect });
    });
    observer.disconnect();
  });
  [...targets.values()].forEach((target) => {
    if (target.ref.current) {
      observer.observe(target.ref.current);
    }
  });
}
function useDraggable({
  id,
  disabled,
  ref,
  preview,
  hidePreview,
  ...options
}) {
  const dragHandleRef = useRef(null);
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const state = useRef({
    lastPosition: { x: 0, y: 0 }
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect$1(() => {
    if (!disabled) {
      draggables.set(id, {
        ...draggables.get(id),
        id,
        ref,
        type: optionsRef.current.type,
        getData: optionsRef.current.getData
      });
    } else {
      draggables.delete(id);
    }
    return () => {
      draggables.delete(id);
    };
  }, [id, disabled, optionsRef, ref]);
  const notifyMonitors = (callback) => {
    dragMonitors.forEach((monitor) => {
      var _a2;
      if (monitor.type === ((_a2 = draggables.get(id)) == null ? void 0 : _a2.type)) {
        callback(monitor);
      }
    });
  };
  const onDragStart = (e) => {
    var _a2, _b2;
    const draggable = draggables.get(id);
    const el = ref.current;
    const clickedOnHandle = !dragHandleRef.current || !state.clickedEl || dragHandleRef.current.contains(state.clickedEl);
    if (activeInteraction || !el || !draggable || !clickedOnHandle) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    updateRects(droppables);
    setActiveInteraction("drag");
    if (hidePreview) {
      hideNativeGhostImage(e);
    }
    e.dataTransfer.effectAllowed = "move";
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = domRectToObj(el.getBoundingClientRect());
    const ie = interactableEvent({ rect: state.currentRect, e });
    if (preview == null ? void 0 : preview.current) {
      preview.current(draggable, (node) => {
        e.dataTransfer.setDragImage(node, 0, 0);
      });
    }
    dragSession.status = "dragging";
    dragSession.dragTargetId = id;
    if (ref.current) {
      ref.current.dataset.dragging = "true";
    }
    (_b2 = (_a2 = optionsRef.current).onDragStart) == null ? void 0 : _b2.call(_a2, ie, draggable);
    requestAnimationFrame(() => {
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragStart) == null ? void 0 : _a3.call(m2, ie, draggable);
      });
    });
    addGlobalListener(window, "dragover", onDragOver, true);
  };
  const onDragOver = (e) => {
    var _a2, _b2;
    e.preventDefault();
    if (!state.currentRect)
      return;
    const deltaX = e.clientX - state.lastPosition.x;
    const deltaY = e.clientY - state.lastPosition.y;
    const newRect = {
      ...state.currentRect,
      left: state.currentRect.left + deltaX,
      top: state.currentRect.top + deltaY
    };
    const ie = interactableEvent({ rect: newRect, e, deltaX, deltaY });
    const target = draggables.get(id);
    if (target) {
      (_b2 = (_a2 = optionsRef.current).onDragMove) == null ? void 0 : _b2.call(_a2, ie, target);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragMove) == null ? void 0 : _a3.call(m2, ie, target);
      });
    }
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = newRect;
  };
  const onDragEnd = (e) => {
    var _a2, _b2;
    removeAllGlobalListeners();
    if (!state.currentRect)
      return;
    setActiveInteraction(null);
    if (emptyImage) {
      emptyImage.remove();
    }
    const ie = interactableEvent({ rect: state.currentRect, e });
    const draggable = draggables.get(id);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragEnd) == null ? void 0 : _b2.call(_a2, ie, draggable);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragEnd) == null ? void 0 : _a3.call(m2, ie, draggable, dragSession.status);
      });
    }
    requestAnimationFrame(() => {
      dragSession.dragTargetId = void 0;
      dragSession.status = "inactive";
      if (ref.current) {
        delete ref.current.dataset.dragging;
      }
    });
  };
  const draggableProps = {
    draggable: !disabled,
    onDragStart,
    onDragEnd,
    onPointerDown: (e) => {
      state.clickedEl = e.target;
    }
  };
  return { draggableProps, dragHandleRef };
}
let emptyImage;
function hideNativeGhostImage(e) {
  if (!emptyImage) {
    emptyImage = new Image();
    document.body.append(emptyImage);
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  e.dataTransfer.setDragImage(emptyImage, 0, 0);
}
async function* readFilesFromDataTransfer(dataTransfer) {
  const entries = [];
  for (const item of dataTransfer.items) {
    if (item.kind === "file") {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(entry);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isFile) {
      if (entry.name === ".DS_Store")
        continue;
      const file = await getEntryFile(entry);
      yield new UploadedFile(file, entry.fullPath);
    } else if (entry.isDirectory) {
      yield* getEntriesFromDirectory(entry);
    }
  }
}
async function* getEntriesFromDirectory(item) {
  const reader = item.createReader();
  let entries;
  do {
    entries = await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
    for (const entry of entries) {
      if (entry.isFile) {
        if (entry.name === ".DS_Store")
          continue;
        const file = await getEntryFile(entry);
        yield new UploadedFile(file, entry.fullPath);
      } else if (entry.isDirectory) {
        yield* getEntriesFromDirectory(entry);
      }
    }
  } while (entries.length > 0);
}
function getEntryFile(entry) {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}
async function asyncIterableToArray(iterator) {
  const items = [];
  for await (const item of iterator) {
    items.push(item);
  }
  return items;
}
const DROP_ACTIVATE_TIMEOUT = 400;
function useDroppable({
  id,
  disabled,
  ref,
  ...options
}) {
  const state = useRef({
    dragOverElements: /* @__PURE__ */ new Set(),
    dropActivateTimer: void 0
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect$1(() => {
    droppables.set(id, {
      ...droppables.get(id),
      disabled,
      id,
      ref
    });
    return () => {
      droppables.delete(id);
    };
  }, [id, optionsRef, disabled, ref]);
  const canDrop = (draggable) => {
    var _a2;
    const options2 = optionsRef.current;
    const allowEventsOnSelf = options2.allowDragEventsFromItself || ref.current !== ((_a2 = draggable.ref) == null ? void 0 : _a2.current);
    return !!((draggable == null ? void 0 : draggable.type) && allowEventsOnSelf && options2.types.includes(draggable.type) && (!options2.acceptsDrop || options2.acceptsDrop(draggable)));
  };
  const fireDragLeave = (e) => {
    var _a2, _b2;
    const draggable = getDraggable(e);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragLeave) == null ? void 0 : _b2.call(_a2, draggable);
    }
  };
  const onDragEnter = (e) => {
    var _a2, _b2;
    e.stopPropagation();
    state.dragOverElements.add(e.target);
    if (state.dragOverElements.size > 1) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      (_b2 = (_a2 = optionsRef.current).onDragEnter) == null ? void 0 : _b2.call(_a2, draggable);
      clearTimeout(state.dropActivateTimer);
      if (typeof optionsRef.current.onDropActivate === "function") {
        state.dropActivateTimer = setTimeout(() => {
          var _a3, _b3;
          if (draggable) {
            (_b3 = (_a3 = optionsRef.current).onDropActivate) == null ? void 0 : _b3.call(_a3, draggable);
          }
        }, DROP_ACTIVATE_TIMEOUT);
      }
    }
  };
  const onDragLeave = (e) => {
    e.stopPropagation();
    state.dragOverElements.delete(e.target);
    for (const element of state.dragOverElements) {
      if (!e.currentTarget.contains(element)) {
        state.dragOverElements.delete(element);
      }
    }
    if (state.dragOverElements.size > 0) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      fireDragLeave(e);
      clearTimeout(state.dropActivateTimer);
    }
  };
  const onDrop = async (e) => {
    var _a2, _b2, _c2, _d2;
    e.preventDefault();
    e.stopPropagation();
    state.dragOverElements.clear();
    fireDragLeave(e);
    clearTimeout(state.dropActivateTimer);
    const draggable = getDraggable(e);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragLeave) == null ? void 0 : _b2.call(_a2, draggable);
      if (!canDrop(draggable)) {
        if (dragSession.status !== "inactive") {
          dragSession.status = "dropFail";
        }
      } else {
        const dropResult = (_d2 = (_c2 = optionsRef.current).onDrop) == null ? void 0 : _d2.call(_c2, draggable);
        if (dragSession.status !== "inactive") {
          dragSession.status = dropResult === false ? "dropFail" : "dropSuccess";
        }
      }
    }
  };
  const droppableProps = {
    onDragOver: (e) => {
      var _a2, _b2;
      e.preventDefault();
      e.stopPropagation();
      const draggable = getDraggable(e);
      if (draggable && canDrop(draggable)) {
        (_b2 = (_a2 = optionsRef.current).onDragOver) == null ? void 0 : _b2.call(_a2, draggable, e);
      }
    },
    onDragEnter,
    onDragLeave,
    onDrop
  };
  return {
    droppableProps: disabled ? {} : droppableProps
  };
}
function getDraggable(e) {
  if (dragSession.dragTargetId != null) {
    return draggables.get(dragSession.dragTargetId);
  } else if (e.dataTransfer.types.includes("Files")) {
    return {
      type: "nativeFile",
      el: null,
      ref: null,
      getData: () => {
        return asyncIterableToArray(readFilesFromDataTransfer(e.dataTransfer));
      }
    };
  }
}
const sortableLineStrategy = {
  onDragStart: () => {
  },
  onDragEnter: () => {
  },
  onDragOver: ({ e, ref, item, sortSession: sortSession2, onDropPositionChange }) => {
    var _a2;
    const previousPosition = sortSession2.dropPosition;
    let newPosition = null;
    const rect = (_a2 = droppables.get(item)) == null ? void 0 : _a2.rect;
    if (rect) {
      const midY = rect.top + rect.height / 2;
      if (e.clientY <= midY) {
        newPosition = "before";
      } else if (e.clientY >= midY) {
        newPosition = "after";
      }
    }
    if (newPosition !== previousPosition) {
      const overIndex = sortSession2.sortables.indexOf(item);
      sortSession2.dropPosition = newPosition;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession2.dropPosition);
      clearLinePreview(sortSession2);
      if (ref.current) {
        if (sortSession2.dropPosition === "after") {
          addLinePreview(ref.current, "bottom", sortSession2);
        } else {
          if (overIndex === 0) {
            addLinePreview(ref.current, "top", sortSession2);
          } else {
            const droppableId = sortSession2.sortables[overIndex - 1];
            const droppable = droppables.get(droppableId);
            if (droppable == null ? void 0 : droppable.ref.current) {
              addLinePreview(droppable.ref.current, "bottom", sortSession2);
            }
          }
        }
      }
      const itemIndex = sortSession2.sortables.indexOf(item);
      if (sortSession2.activeIndex === itemIndex) {
        sortSession2.finalIndex = sortSession2.activeIndex;
        return;
      }
      const dragDirection = overIndex > sortSession2.activeIndex ? "after" : "before";
      if (dragDirection === "after") {
        sortSession2.finalIndex = sortSession2.dropPosition === "before" ? itemIndex - 1 : itemIndex;
      } else {
        sortSession2.finalIndex = sortSession2.dropPosition === "after" ? itemIndex + 1 : itemIndex;
      }
    }
  },
  onDragEnd: (sortSession2) => {
    clearLinePreview(sortSession2);
  }
};
function clearLinePreview(sortSession2) {
  if (sortSession2 == null ? void 0 : sortSession2.linePreviewEl) {
    sortSession2.linePreviewEl.style.borderBottomColor = "";
    sortSession2.linePreviewEl.style.borderTopColor = "";
    sortSession2.linePreviewEl = void 0;
  }
}
function addLinePreview(el, side, sortSession2) {
  const color = "rgb(var(--be-primary))";
  if (side === "top") {
    el.style.borderTopColor = color;
  } else {
    el.style.borderBottomColor = color;
  }
  if (sortSession2) {
    sortSession2.linePreviewEl = el;
  }
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, 0, array.length - 1);
  const to = clamp(toIndex, 0, array.length - 1);
  if (from === to) {
    return array;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
  return array;
}
function moveItemInNewArray(array, from, to) {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
}
const transition = "transform 0.2s cubic-bezier(0.2, 0, 0, 1)";
const sortableTransformStrategy = {
  onDragStart: (sortSession2) => {
    sortSession2.sortables.forEach((sortable, index) => {
      const droppable = droppables.get(sortable);
      if (!(droppable == null ? void 0 : droppable.ref.current))
        return;
      droppable.ref.current.style.transition = transition;
      if ((sortSession2 == null ? void 0 : sortSession2.activeIndex) === index) {
        droppable.ref.current.style.opacity = "0.4";
      }
    });
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
    const rects = sortSession2.sortables.map((s) => {
      var _a2;
      return (_a2 = droppables.get(s)) == null ? void 0 : _a2.rect;
    });
    sortSession2.sortables.forEach((sortable, index) => {
      if (!sortSession2)
        return;
      const newRects = moveItemInNewArray(
        rects,
        overIndex,
        sortSession2.activeIndex
      );
      const oldRect = rects[index];
      const newRect = newRects[index];
      const sortableTarget = droppables.get(sortable);
      if ((sortableTarget == null ? void 0 : sortableTarget.ref.current) && newRect && oldRect) {
        const x = newRect.left - oldRect.left;
        const y = newRect.top - oldRect.top;
        sortableTarget.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
    sortSession2.finalIndex = overIndex;
  },
  onDragOver: () => {
  },
  onDragEnd: (sortSession2) => {
    sortSession2.sortables.forEach((sortable) => {
      const droppable = droppables.get(sortable);
      if (droppable == null ? void 0 : droppable.ref.current) {
        droppable.ref.current.style.transform = "";
        droppable.ref.current.style.transition = "";
        droppable.ref.current.style.opacity = "";
        droppable.ref.current.style.zIndex = "";
      }
    });
  }
};
const sortableMoveNodeStrategy = {
  onDragStart: () => {
  },
  onDragOver: () => {
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    var _a2;
    const node = (_a2 = droppables.get(sortSession2.sortables[currentIndex])) == null ? void 0 : _a2.ref.current;
    if (node) {
      moveNode(node, currentIndex, overIndex);
      moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
      sortSession2.finalIndex = overIndex;
    }
  },
  onDragEnd: () => {
  }
};
function moveNode(el, currentIndex, newIndex) {
  const parentEl = el.parentElement;
  if (newIndex < 0) {
    parentEl.prepend(el);
  } else {
    if (currentIndex > -1 && currentIndex <= newIndex) {
      newIndex++;
    }
    const ref = parentEl.children.item(newIndex);
    if (ref) {
      ref.before(el);
    } else {
      parentEl.append(el);
    }
  }
}
let sortSession = null;
const strategies = {
  line: sortableLineStrategy,
  liveSort: sortableTransformStrategy,
  moveNode: sortableMoveNodeStrategy
};
function useSortable({
  item,
  items,
  type,
  ref,
  onSortEnd,
  onSortStart,
  onDragEnd,
  preview,
  disabled,
  onDropPositionChange,
  strategy = "liveSort"
}) {
  useEffect(() => {
    if (sortSession && sortSession.sortables.length !== items.length) {
      sortSession.sortables = [...items];
      sortSession.activeIndex = items.indexOf(item);
    }
  }, [items, item]);
  const { draggableProps, dragHandleRef } = useDraggable({
    id: item,
    ref,
    type,
    preview,
    disabled,
    onDragStart: () => {
      var _a2;
      sortSession = {
        sortables: [...items],
        activeSortable: item,
        activeIndex: items.indexOf(item),
        finalIndex: items.indexOf(item),
        dropPosition: null,
        ref,
        scrollParent: ref.current ? getScrollParent(ref.current) : void 0,
        scrollListener: () => {
          updateRects(droppables);
        }
      };
      strategies[strategy].onDragStart(sortSession);
      onSortStart == null ? void 0 : onSortStart();
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.addEventListener(
        "scroll",
        sortSession.scrollListener
      );
    },
    onDragEnd: () => {
      var _a2;
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
      if (sortSession.activeIndex !== sortSession.finalIndex) {
        onSortEnd == null ? void 0 : onSortEnd(sortSession.activeIndex, sortSession.finalIndex);
      }
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.removeEventListener(
        "scroll",
        sortSession.scrollListener
      );
      strategies[strategy].onDragEnd(sortSession);
      onDragEnd == null ? void 0 : onDragEnd();
      sortSession = null;
    },
    getData: () => {
    }
  });
  const { droppableProps } = useDroppable({
    id: item,
    ref,
    types: [type],
    disabled,
    allowDragEventsFromItself: true,
    onDragOver: (target, e) => {
      if (!sortSession)
        return;
      strategies[strategy].onDragOver({
        e,
        ref,
        item,
        sortSession,
        onDropPositionChange
      });
    },
    onDragEnter: () => {
      if (!sortSession)
        return;
      const overIndex = sortSession.sortables.indexOf(item);
      const oldIndex = sortSession.sortables.indexOf(
        sortSession.activeSortable
      );
      strategies[strategy].onDragEnter(sortSession, overIndex, oldIndex);
    },
    onDragLeave: () => {
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
    }
  });
  return {
    sortableProps: { ...mergeProps(draggableProps, droppableProps) },
    dragHandleRef
  };
}
const TuneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" }),
  "TuneOutlined"
);
const MoreVertIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "MoreVertOutlined"
);
const TabContext = React.createContext(null);
function Tabs(props) {
  const {
    size = "md",
    children,
    className,
    isLazy,
    overflow = "overflow-hidden"
  } = props;
  const tabsRef = useRef([]);
  const id = useId();
  const [selectedTab, setSelectedTab] = useControlledState(
    props.selectedTab,
    props.defaultSelectedTab || 0,
    props.onTabChange
  );
  const ContextValue = useMemo(() => {
    return {
      selectedTab,
      setSelectedTab,
      tabsRef,
      size,
      isLazy,
      id
    };
  }, [selectedTab, id, isLazy, setSelectedTab, size]);
  return /* @__PURE__ */ jsx(TabContext.Provider, { value: ContextValue, children: /* @__PURE__ */ jsx("div", { className: clsx(className, overflow, "max-w-full"), children }) });
}
function TabLine() {
  const { tabsRef, selectedTab } = useContext(TabContext);
  const [style, setStyle] = useState({
    width: void 0,
    transform: void 0,
    className: void 0
  });
  useLayoutEffect(() => {
    if (selectedTab != null && tabsRef.current) {
      const el = tabsRef.current[selectedTab];
      if (!el)
        return;
      setStyle((prevState) => {
        return {
          width: `${el.offsetWidth}px`,
          transform: `translateX(${el.offsetLeft}px)`,
          // disable initial transition for tabline
          className: prevState.width === void 0 ? "" : "transition-all"
        };
      });
    }
  }, [setStyle, selectedTab, tabsRef]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute bottom-0 left-0 h-2 bg-primary",
        style.className
      ),
      role: "presentation",
      style: { width: style.width, transform: style.transform }
    }
  );
}
function TabList({
  children,
  center,
  expand,
  className,
  border = "border-b"
}) {
  const childrenArray = Children.toArray(children);
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        // hide scrollbar completely on mobile, show compact one on desktop
        "max-sm:hidden-scrollbar md:compact-scrollbar relative flex max-w-full overflow-auto",
        border,
        className
      ),
      role: "tablist",
      "aria-orientation": "horizontal",
      children: [
        childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              index,
              className: clsx(
                child.props.className,
                expand && "flex-auto",
                center && index === 0 && "ml-auto",
                center && index === childrenArray.length - 1 && "mr-auto"
              )
            });
          }
          return null;
        }),
        /* @__PURE__ */ jsx(TabLine, {})
      ]
    }
  ) });
}
function Tab({
  index,
  className,
  isDisabled,
  children,
  padding: paddingProp,
  elementType = "button",
  to,
  relative,
  width = "min-w-min",
  height
}) {
  const {
    selectedTab,
    setSelectedTab,
    tabsRef,
    size = "md",
    id
  } = useContext(TabContext);
  const isSelected = index === selectedTab;
  const focusManager = useFocusManager();
  const padding = paddingProp || (size === "sm" ? "px-12" : "px-18");
  const mergedClassname = clsx(
    "tracking-wide overflow-hidden capitalize text-sm flex items-center justify-center outline-none transition-colors",
    "focus-visible:ring focus-visible:ring-2 ring-inset rounded whitespace-nowrap cursor-pointer",
    width,
    textColor({ isDisabled, isSelected }),
    className,
    size === "md" && `${padding} ${height || "h-48"}`,
    size === "sm" && `${padding} ${height || "h-32"}`,
    isDisabled && "pointer-events-none"
  );
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const tabIndex = isSelected ? 0 : -1;
  const Element = elementType;
  return /* @__PURE__ */ jsx(
    Element,
    {
      disabled: isDisabled,
      id: `${id}-${index}-tab`,
      "aria-controls": `${id}-${index}-tabpanel`,
      type: "button",
      role: "tab",
      "aria-selected": isSelected,
      tabIndex: isDisabled ? void 0 : tabIndex,
      onKeyDown,
      onClick: () => {
        setSelectedTab(index);
      },
      to,
      relative,
      className: mergedClassname,
      ref: (el) => {
        if (tabsRef.current && el) {
          tabsRef.current[index] = el;
        }
      },
      children
    }
  );
}
function textColor({ isDisabled, isSelected }) {
  if (isDisabled) {
    return "text-disabled cursor-default";
  }
  if (isSelected) {
    return "text-primary";
  }
  return "text-muted hover:text-main";
}
const DragHandleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" }),
  "DragHandleOutlined"
);
const DragPreview = React.forwardRef((props, ref) => {
  const render = props.children;
  const [children, setChildren] = useState(null);
  const domRef = useRef(null);
  useImperativeHandle(
    ref,
    () => (draggable, callback) => {
      flushSync(() => {
        setChildren(render(draggable));
      });
      callback(domRef.current);
      requestAnimationFrame(() => {
        setChildren(null);
      });
    },
    [render]
  );
  if (!children) {
    return null;
  }
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { zIndex: -100, position: "absolute", top: 0, left: -1e5 },
        ref: domRef,
        children
      }
    ),
    rootEl
  );
});
function useStickySentinel() {
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef();
  const sentinelRef = useCallback((sentinel) => {
    var _a2;
    if (sentinel) {
      const observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      );
      observerRef.current = observer;
      observer.observe(sentinel);
    } else if (observerRef.current) {
      (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    }
  }, []);
  return { isSticky, sentinelRef };
}
function CrupdateResourceLayout({
  onSubmit,
  form,
  title,
  subTitle,
  children,
  actions,
  backButton,
  isLoading = false,
  disableSaveWhenNotDirty = false,
  wrapInContainer = true,
  submitButtonText,
  variant = "sticky"
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isDirty = !disableSaveWhenNotDirty ? true : Object.keys(form.formState.dirtyFields).length;
  const saveButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "flat",
      color: "primary",
      type: "submit",
      disabled: isLoading || !isDirty,
      children: submitButtonText ?? /* @__PURE__ */ jsx(Trans, { message: "Save" })
    }
  );
  return /* @__PURE__ */ jsxs(
    Form,
    {
      onSubmit,
      onBeforeSubmit: () => form.clearErrors(),
      form,
      className: "relative",
      children: [
        variant === "sticky" && /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
        /* @__PURE__ */ jsx(
          CrupdateResourceHeader,
          {
            wrapInContainer,
            startActions: backButton,
            subTitle,
            endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
              actions,
              variant === "sticky" && saveButton
            ] }),
            className: clsx(
              isSticky && "bg shadow",
              variant === "sticky" && "sticky"
            ),
            children: title
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: wrapInContainer ? "container mx-auto px-24 pb-24" : void 0,
            children: /* @__PURE__ */ jsx("div", { className: "rounded", children })
          }
        ),
        variant === "popup" && /* @__PURE__ */ jsx(DirtyFormSaveDrawer, { saveButton, isLoading })
      ]
    }
  );
}
function CrupdateResourceHeader({
  className,
  wrapInContainer,
  children,
  subTitle,
  startActions,
  endActions
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("top-0 z-10 my-12 transition-shadow md:my-24", className),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "flex items-center gap-24 py-14 md:items-start",
            wrapInContainer && "container mx-auto px-24"
          ),
          children: [
            startActions,
            /* @__PURE__ */ jsxs("div", { className: "overflow-hidden overflow-ellipsis md:mr-64", children: [
              /* @__PURE__ */ jsx("h1", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-xl md:text-3xl", children }),
              subTitle && /* @__PURE__ */ jsx("div", { className: "mt-4", children: subTitle })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mr-auto" }),
            endActions
          ]
        }
      )
    }
  );
}
function CrupdateResourceSection({
  label,
  children,
  margin = "mb-48",
  labelMargin = "mb-16"
}) {
  return /* @__PURE__ */ jsxs("section", { className: clsx(margin), children: [
    /* @__PURE__ */ jsx("div", { className: clsx(labelMargin, "text-lg font-semibold"), children: label }),
    children
  ] });
}
function DirtyFormSaveDrawer({
  saveButton,
  isLoading
}) {
  const { formState, reset } = useFormContext();
  return /* @__PURE__ */ jsx(AnimatePresence, { children: formState.isDirty && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "invisible h-92" }),
    /* @__PURE__ */ jsxs(
      m.div,
      {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-16 border-t bg px-12 py-28 shadow-[rgba(0,0,0,0.2)_0px_0px_10px]",
        children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => reset(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
          saveButton ?? /* @__PURE__ */ jsx(
            Button,
            {
              variant: "flat",
              color: "primary",
              type: "submit",
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(Trans, { message: "Save changes" })
            }
          )
        ]
      },
      "dirty-panel"
    )
  ] }) });
}
const ArrowBackIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }),
  "ArrowBackOutlined"
);
function ImageZoomDialog(props) {
  const { close } = useDialogContext();
  const { image, images } = props;
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex,
    props.onActiveIndexChange
  );
  const src = image || (images == null ? void 0 : images[activeIndex]);
  return /* @__PURE__ */ jsx(Dialog, { size: "fullscreenTakeover", background: "bg-black/80", children: /* @__PURE__ */ jsxs(DialogBody, { padding: "p-0", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "lg",
        color: "paper",
        className: "absolute right-0 top-0 z-20 text-white",
        onClick: () => {
          close();
        },
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center p-40", children: [
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 left-20 top-0 my-auto",
          disabled: activeIndex < 1,
          onClick: () => {
            setActiveIndex(activeIndex - 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ) : null,
      /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          className: "max-h-full w-auto object-contain shadow"
        }
      ),
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 right-20 top-0 my-auto",
          disabled: activeIndex + 1 === (images == null ? void 0 : images.length),
          onClick: () => {
            setActiveIndex(activeIndex + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      ) : null
    ] })
  ] }) });
}
const ChevronLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" }),
  "ChevronLeftOutlined"
);
const playlist = "/assets/playlist-9920c7a8.svg";
function useChannelQueryParams(channel, userParams) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { encodedFilters } = useBackendFilterUrlParams();
  const queryParams = {
    ...userParams,
    restriction: params.restriction || "",
    order: searchParams.get("order"),
    [BackendFiltersUrlKey]: encodedFilters
  };
  if (!queryParams.order && channel) {
    queryParams.order = channel.config.contentOrder || "popularity:desc";
  }
  return queryParams;
}
function useChannel(slugOrId, loader, userParams) {
  const params = useParams();
  const channelId = slugOrId || params.slugOrId;
  const queryParams = useChannelQueryParams(void 0, userParams);
  return useQuery({
    // only refetch when channel ID or restriction changes and not query params.
    // content will be re-fetched in channel content components
    // on SSR use query params as well, to avoid caching wrong data when query params change
    queryKey: channelQueryKey(channelId, queryParams),
    queryFn: () => fetchChannel(channelId, { ...queryParams, loader }),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      const isSameChannel = (data == null ? void 0 : data.channel.id) == channelId || (data == null ? void 0 : data.channel.slug) == channelId;
      const isSameRestriction = !queryParams.restriction || ((_b2 = data == null ? void 0 : data.channel.restriction) == null ? void 0 : _b2.name) === queryParams.restriction;
      if (isSameChannel && isSameRestriction) {
        return data;
      }
    }
  });
}
function channelQueryKey(slugOrId, params) {
  const key = ["channel", `${slugOrId}`];
  if (params) {
    key.push(params);
  }
  return key;
}
function channelEndpoint(slugOrId) {
  return `channel/${slugOrId}`;
}
function fetchChannel(slugOrId, params = {}) {
  return apiClient.get(channelEndpoint(slugOrId), { params }).then((response) => response.data);
}
const TITLE_MODEL = "title";
const MOVIE_MODEL = "movie";
const SERIES_MODEL = "series";
const NEWS_ARTICLE_MODEL = "newsArticle";
const CHANNEL_MODEL = "channel";
const PERSON_MODEL = "person";
const GridViewIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" }),
  "GridViewOutlined"
);
const ViewWeekIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z" }),
  "ViewWeekOutlined"
);
const ViewListIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 5v14h18V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm14 2H9v-2h10v2zm0-4H9v-2h10v2zm0-4H9V7h10v2z" }),
  "ViewListOutlined"
);
var Sort = /* @__PURE__ */ ((Sort2) => {
  Sort2["popular"] = "popularity:desc";
  Sort2["recent"] = "created_at:desc";
  Sort2["attachDate"] = "channelables.created_at:desc";
  Sort2["rating"] = "rating:desc";
  Sort2["curated"] = "channelables.order:asc";
  Sort2["name"] = "name:asc";
  Sort2["birthdayDesc"] = "birth_date:desc";
  Sort2["birthdayAsc"] = "birth_date:asc";
  Sort2["budget"] = "budget:desc";
  Sort2["revenue"] = "revenue:desc";
  return Sort2;
})(Sort || {});
var Layout = /* @__PURE__ */ ((Layout2) => {
  Layout2["grid"] = "grid";
  Layout2["landscapeGrid"] = "landscapeGrid";
  Layout2["list"] = "list";
  Layout2["news"] = "news";
  Layout2["carousel"] = "carousel";
  Layout2["landscapeCarousel"] = "landscapeCarousel";
  Layout2["slider"] = "slider";
  return Layout2;
})(Layout || {});
const contentModels = {
  [MOVIE_MODEL]: {
    label: message("Movies"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc",
      "rating:desc",
      "budget:desc",
      "revenue:desc"
      /* revenue */
    ],
    layoutMethods: [
      "grid",
      "landscapeGrid",
      "list",
      "carousel",
      "landscapeCarousel",
      "slider"
      /* slider */
    ],
    autoUpdateMethods: [
      "latestVideos",
      "mostPopular",
      "topRated",
      "upcoming",
      "nowPlaying",
      "discover"
      /* discover */
    ],
    restrictions: [
      "genre",
      "keyword",
      "productionCountry"
      /* productionCountry */
    ]
  },
  [SERIES_MODEL]: {
    label: message("TV series"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc",
      "rating:desc",
      "budget:desc",
      "revenue:desc"
      /* revenue */
    ],
    layoutMethods: [
      "grid",
      "landscapeGrid",
      "list",
      "carousel",
      "landscapeCarousel",
      "slider"
      /* slider */
    ],
    autoUpdateMethods: [
      "latestVideos",
      "mostPopular",
      "topRated",
      "airingThisWeek",
      "airingToday",
      "discover"
      /* discover */
    ],
    restrictions: [
      "genre",
      "keyword",
      "productionCountry"
      /* productionCountry */
    ]
  },
  [TITLE_MODEL]: {
    label: message("Titles (movies and series)"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc",
      "rating:desc",
      "budget:desc",
      "revenue:desc"
      /* revenue */
    ],
    layoutMethods: [
      "grid",
      "landscapeGrid",
      "list",
      "carousel",
      "landscapeCarousel",
      "slider"
      /* slider */
    ],
    autoUpdateMethods: [
      "latestVideos"
      /* latestVideos */
    ],
    restrictions: [
      "genre",
      "keyword",
      "productionCountry"
      /* productionCountry */
    ]
  },
  [NEWS_ARTICLE_MODEL]: {
    label: message("News articles"),
    sortMethods: [
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "news",
      "landscapeCarousel",
      "list"
      /* list */
    ]
  },
  [PERSON_MODEL]: {
    label: message("People"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc",
      "name:asc",
      "birth_date:desc",
      "birth_date:asc"
      /* birthdayAsc */
    ],
    layoutMethods: [
      "grid",
      "list",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: [
      "trendingPeople"
      /* trendingPeople */
    ]
  },
  [CHANNEL_MODEL]: {
    label: message("Channels"),
    sortMethods: [],
    layoutMethods: [
      "list"
      /* list */
    ]
  }
};
const contentSortingMethods = {
  [
    "popularity:desc"
    /* popular */
  ]: {
    label: message("Most popular first")
  },
  [
    "created_at:desc"
    /* recent */
  ]: {
    label: message("Recently created items first")
  },
  [
    "rating:desc"
    /* rating */
  ]: {
    label: message("Highest rated first")
  },
  [
    "channelables.order:asc"
    /* curated */
  ]: {
    label: message("Curated (reorder below)"),
    contentTypes: ["manual"]
  },
  [
    "channelables.created_at:desc"
    /* attachDate */
  ]: {
    label: message("Items recently added to channel first"),
    contentTypes: ["manual"]
  },
  [
    "name:asc"
    /* name */
  ]: {
    label: message("Name (A-Z)"),
    contentTypes: ["manual"]
  },
  [
    "birth_date:desc"
    /* birthdayDesc */
  ]: {
    label: message("Youngest first")
  },
  [
    "birth_date:asc"
    /* birthdayAsc */
  ]: {
    label: message("Oldest first")
  },
  [
    "budget:desc"
    /* budget */
  ]: {
    label: message("Biggest budget first")
  },
  [
    "revenue:desc"
    /* revenue */
  ]: {
    label: message("Biggest revenue first")
  }
};
const contentLayoutMethods = {
  [
    "grid"
    /* grid */
  ]: {
    label: message("Grid"),
    icon: /* @__PURE__ */ jsx(GridViewIcon, {})
  },
  [
    "landscapeGrid"
    /* landscapeGrid */
  ]: {
    label: message("Landscape"),
    icon: /* @__PURE__ */ jsx(ViewWeekIcon, {})
  },
  [
    "list"
    /* list */
  ]: {
    label: message("List"),
    icon: /* @__PURE__ */ jsx(ViewListIcon, {})
  },
  [
    "carousel"
    /* carousel */
  ]: {
    label: message("Carousel (portrait)")
  },
  [
    "landscapeCarousel"
    /* landscapeCarousel */
  ]: {
    label: message("Carousel (landscape)")
  },
  [
    "slider"
    /* slider */
  ]: {
    label: message("Slider")
  },
  [
    "news"
    /* news */
  ]: {
    label: message("News")
  }
};
const contentAutoUpdateMethods = {
  [
    "discover"
    /* discover */
  ]: {
    label: message("Discover (TMDB only)"),
    providers: ["tmdb"]
  },
  [
    "mostPopular"
    /* mostPopular */
  ]: {
    label: message("Most popular"),
    providers: ["tmdb", "local"]
  },
  [
    "topRated"
    /* topRated */
  ]: {
    label: message("Top rated"),
    providers: ["tmdb", "local"]
  },
  [
    "upcoming"
    /* upcoming */
  ]: {
    label: message("Upcoming"),
    providers: ["tmdb", "local"]
  },
  [
    "nowPlaying"
    /* nowPlaying */
  ]: {
    label: message("In theaters"),
    providers: ["tmdb", "local"]
  },
  [
    "airingToday"
    /* airingToday */
  ]: {
    label: message("Airing today"),
    providers: ["tmdb", "local"]
  },
  [
    "airingThisWeek"
    /* airingThisWeek */
  ]: {
    label: message("Airing this week"),
    providers: ["tmdb", "local"]
  },
  [
    "trendingPeople"
    /* trendingPeople */
  ]: {
    label: message("Trending people"),
    providers: ["tmdb", "local"]
  },
  [
    "latestVideos"
    /* latestVideos */
  ]: {
    label: message("Most recently published videos"),
    providers: ["local"]
  }
};
const channelContentConfig = {
  models: contentModels,
  sortingMethods: contentSortingMethods,
  layoutMethods: contentLayoutMethods,
  autoUpdateMethods: contentAutoUpdateMethods,
  userSelectableLayouts: [
    "grid",
    "landscapeGrid",
    "list"
    /* list */
  ],
  restrictions: {
    [
      "genre"
      /* genre */
    ]: {
      label: message("Genre"),
      value: "genre"
      /* genre */
    },
    [
      "keyword"
      /* keyword */
    ]: {
      label: message("Keyword"),
      value: "keyword"
      /* keyword */
    },
    [
      "productionCountry"
      /* productionCountry */
    ]: {
      label: message("Production country"),
      value: "productionCountry"
      /* productionCountry */
    }
  }
};
function ContentModelField({ config, className, exclude }) {
  const { setValue, getValues } = useFormContext();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      className,
      selectionMode: "single",
      name: "config.contentModel",
      label: /* @__PURE__ */ jsx(Trans, { message: "Type of content" }),
      onSelectionChange: (newValue) => {
        var _a2, _b2, _c2;
        const modelConfig = config.models[newValue];
        if (getValues("config.contentType") === "autoUpdate" && !((_a2 = modelConfig.autoUpdateMethods) == null ? void 0 : _a2.length)) {
          setValue("config.contentType", "manual");
        }
        const firstAutoUpdateMethod = (_b2 = modelConfig.autoUpdateMethods) == null ? void 0 : _b2[0];
        setValue("config.autoUpdateMethod", firstAutoUpdateMethod);
        setValue(
          "config.autoUpdateProvider",
          firstAutoUpdateMethod ? (_c2 = config.autoUpdateMethods[firstAutoUpdateMethod]) == null ? void 0 : _c2.providers[0] : void 0
        );
        setValue("config.restriction", null);
        setValue("config.restrictionModelId", null);
        setValue(
          "config.contentOrder",
          modelConfig.sortMethods[0] || "channelables.order:asc"
        );
        setValue("config.layout", modelConfig.layoutMethods[0]);
      },
      children: Object.entries(config.models).filter(([model]) => !(exclude == null ? void 0 : exclude.includes(model))).map(([model, { label }]) => /* @__PURE__ */ jsx(Item, { value: model, children: /* @__PURE__ */ jsx(Trans, { ...label }) }, model))
    }
  );
}
function ContentOrderField({ config, className }) {
  const { watch } = useFormContext();
  const contentType = watch("config.contentType");
  const modelConfig = config.models[watch("config.contentModel")];
  const sortMethods = [
    ...modelConfig.sortMethods,
    "channelables.order:asc",
    "channelables.created_at:desc"
  ];
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      className,
      selectionMode: "single",
      name: "config.contentOrder",
      label: /* @__PURE__ */ jsx(Trans, { message: "How to order content" }),
      children: sortMethods.map((method) => {
        const sortConfig = config.sortingMethods[method];
        if (!sortConfig.contentTypes || sortConfig.contentTypes.includes(contentType)) {
          return /* @__PURE__ */ jsx(Item, { value: method, children: /* @__PURE__ */ jsx(Trans, { ...sortConfig.label }) }, method);
        }
      })
    }
  );
}
function useIsTouchDevice() {
  return useMediaQuery("((pointer: coarse))");
}
const RefreshIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }),
  "RefreshOutlined"
);
function useUpdateChannelContent(channelId) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateChannel(channelId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: channelQueryKey(channelId)
      });
      toast(trans(message("Channel content updated")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateChannel(channelId, payload) {
  return apiClient.post(`channel/${channelId}/update-content`, {
    ...payload,
    normalizeContent: true
  }).then((r) => r.data);
}
function useChannelContent(channel, params, options) {
  const [searchParams] = useSearchParams();
  const queryParams = useChannelQueryParams(channel, params);
  if (options == null ? void 0 : options.paginate) {
    queryParams.page = searchParams.get("page") || "1";
  }
  const queryKey = channelQueryKey(channel.id, queryParams);
  const initialQueryKey = useRef(hashKey(queryKey)).current;
  const query = useQuery({
    queryKey: channelQueryKey(channel.id, queryParams),
    queryFn: () => fetchChannelContent(channel, queryParams),
    placeholderData: keepPreviousData,
    initialData: () => {
      if (hashKey(queryKey) === initialQueryKey) {
        return channel.content;
      }
      return void 0;
    }
  });
  return {
    ...query,
    queryKey
  };
}
function fetchChannelContent(channel, params) {
  return apiClient.get(channelEndpoint(channel.id), {
    params: {
      ...params,
      paginate: channel.config.paginationType === "lengthAware" ? "lengthAware" : "simple",
      returnContentOnly: "true"
    }
  }).then((response) => response.data.pagination);
}
function useScrollToTop(ref) {
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);
  useEffect(() => {
    if (previousPathname !== pathname) {
      scrollToTop(ref);
    }
  }, [pathname, previousPathname, ref]);
}
function scrollToTop(ref) {
  const scrollParent = (ref == null ? void 0 : ref.current) ? getScrollParent(ref.current) : document.documentElement;
  scrollParent.scrollTo({
    top: 0,
    left: 0
  });
}
const FirstPageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" }),
  "FirstPageOutlined"
);
function PaginationControls({
  pagination,
  className,
  type,
  scrollToTop: scrollToTop2
}) {
  var _a2;
  if (!((_a2 = pagination == null ? void 0 : pagination.data) == null ? void 0 : _a2.length) || !hasNextPage(pagination) && !hasPreviousPage(pagination)) {
    return null;
  }
  const isLengthAware = (!type || type === "lengthAware") && "total" in pagination && pagination.total != null;
  if (isLengthAware) {
    return /* @__PURE__ */ jsx(
      LengthAwarePagination,
      {
        data: pagination,
        className,
        scrollToTop: scrollToTop2
      }
    );
  }
  return /* @__PURE__ */ jsx(
    SimplePagination,
    {
      data: pagination,
      className,
      scrollToTop: scrollToTop2
    }
  );
}
function LengthAwarePagination({
  data,
  className,
  scrollToTop: shouldScrollToTop
}) {
  const ref = useRef(null);
  const currentPage = data.current_page;
  const total = data.total;
  const perPage = data.per_page;
  const range = generatePaginationRangeWithDots(currentPage, total, perPage);
  return /* @__PURE__ */ jsx(
    "nav",
    {
      ref,
      className: clsx("flex flex-wrap items-center justify-center", className),
      children: /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-4", children: range.map((item, index) => {
        const isCurrentPage = item === currentPage;
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          PaginationButton,
          {
            page: !isCurrentPage ? item : void 0,
            elementType: isCurrentPage ? void 0 : Link,
            replace: true,
            variant: isCurrentPage ? "outline" : void 0,
            disabled: isCurrentPage || item === "...",
            onClick: shouldScrollToTop ? () => scrollToTop(ref) : void 0,
            children: item === "..." ? item : /* @__PURE__ */ jsx(FormattedNumber, { value: +item })
          }
        ) }, item === "..." ? `...-${index}` : item);
      }) })
    }
  );
}
function PaginationButton({ page, ...other }) {
  const [searchParams] = useSearchParams();
  const search2 = useMemo(() => {
    if (!page) {
      return null;
    }
    searchParams.set("page", `${page}`);
    return searchParams.toString();
  }, [page, searchParams]);
  return /* @__PURE__ */ jsx(Button, { to: search2 ? { search: search2 } : void 0, ...other });
}
function SimplePagination({
  data,
  className,
  scrollToTop: shouldScrollToTop
}) {
  const ref = useRef(null);
  const currentPage = data.current_page;
  const isLastPage = !hasNextPage(data);
  return /* @__PURE__ */ jsxs("div", { ref, className: clsx("flex items-center gap-12", className), children: [
    currentPage > 1 && /* @__PURE__ */ jsx(
      PaginationButton,
      {
        variant: "outline",
        elementType: Link,
        className: "min-w-110",
        page: 1,
        replace: true,
        startIcon: /* @__PURE__ */ jsx(FirstPageIcon, {}),
        onClick: shouldScrollToTop ? () => scrollToTop(ref) : void 0,
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "First" })
      }
    ),
    /* @__PURE__ */ jsx(
      PaginationButton,
      {
        variant: "outline",
        elementType: currentPage == 1 ? void 0 : Link,
        disabled: currentPage == 1,
        className: "mr-auto min-w-110",
        page: currentPage == 1 ? void 0 : currentPage - 1,
        replace: currentPage == 1 ? void 0 : true,
        startIcon: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {}),
        onClick: shouldScrollToTop ? () => scrollToTop(ref) : void 0,
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Previous" })
      }
    ),
    /* @__PURE__ */ jsx(
      PaginationButton,
      {
        variant: "outline",
        elementType: isLastPage ? void 0 : Link,
        disabled: isLastPage,
        className: "min-w-110",
        page: isLastPage ? void 0 : currentPage + 1,
        replace: isLastPage ? void 0 : true,
        endIcon: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {}),
        onClick: shouldScrollToTop ? () => scrollToTop(ref) : void 0,
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Next" })
      }
    )
  ] });
}
const generatePaginationRangeWithDots = memoize(
  (currentPage, total, perPage) => {
    const totalPages = Math.ceil(total / perPage);
    const delta = 3;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }
    range.unshift(1);
    range.push(totalPages);
    return range;
  }
);
function useReorderChannelContent() {
  return useMutation({
    mutationFn: (payload) => reorderContent(payload),
    onError: (err) => showHttpErrorToast(err)
  });
}
function reorderContent({ channelId, ids, modelType }) {
  return apiClient.post(`channel/${channelId}/reorder-content`, {
    modelType,
    ids
  }).then((r) => r.data);
}
function useAddToChannel() {
  return useMutation({
    mutationFn: (payload) => addToChannel(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: channelQueryKey(payload.channelId)
      });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function addToChannel({ channelId, item }) {
  return apiClient.post(`channel/${channelId}/add`, {
    itemId: item.id,
    itemType: item.model_type
  }).then((r) => r.data);
}
function useRemoveFromChannel() {
  return useMutation({
    mutationFn: (payload) => removeFromChannel(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: channelQueryKey(payload.channelId)
      });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function removeFromChannel({ channelId, item }) {
  return apiClient.post(`channel/${channelId}/remove`, {
    itemId: item.id,
    itemType: item.model_type
  }).then((r) => r.data);
}
const columnConfig = [
  {
    key: "dragHandle",
    width: "w-42 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Drag handle" }),
    hideHeader: true,
    body: () => /* @__PURE__ */ jsx(DragHandleIcon, { className: "cursor-pointer text-muted hover:text" })
  },
  {
    key: "name",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Content item" }),
    visibleInMode: "all",
    body: (item) => {
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: item.image,
          label: item.model_type === "channel" ? /* @__PURE__ */ jsx(
            Link,
            {
              className: "hover:underline",
              to: `/admin/channels/${item.id}/edit`,
              target: "_blank",
              children: item.name
            }
          ) : item.name,
          description: item.description
        }
      );
    }
  },
  {
    key: "type",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Content type" }),
    width: "w-100 flex-shrink-0",
    body: (item) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: item.model_type })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(RemoveItemColumn, { item })
  }
];
function ChannelContentEditor({
  searchField,
  title,
  noResultsMessage
}) {
  var _a2, _b2;
  const { watch, getValues } = useFormContext();
  const channel = getValues();
  const [perPage, setPerPage] = useState(
    ((_a2 = channel.content) == null ? void 0 : _a2.per_page) ?? 100
  );
  const contentType = watch("config.contentType");
  const contentOrder = watch("config.contentOrder");
  const addToChannel2 = useAddToChannel();
  const query = useChannelContent(
    channel,
    { loader: "editChannelPage", paginate: "simple", perPage: `${perPage}` },
    { paginate: true }
  );
  const pagination = query.data;
  const filteredColumns = columnConfig.filter((col) => {
    if (col.key === "actions" && contentType !== "manual") {
      return false;
    }
    if (col.key === "dragHandle" && (contentType !== "manual" || contentOrder !== "channelables.order:asc")) {
      return false;
    }
    return true;
  });
  return /* @__PURE__ */ jsxs("div", { className: "mt-40", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-10 text-2xl", children: title || /* @__PURE__ */ jsx(Trans, { message: "Channel content" }) }),
      /* @__PURE__ */ jsx(ContentNotEditableWarning, {}),
      /* @__PURE__ */ jsx(UpdateContentButton, {}),
      contentType === "manual" ? cloneElement(searchField, {
        onResultSelected: (result) => {
          addToChannel2.mutate({
            channelId: channel.id,
            item: result
          });
        }
      }) : null
    ] }),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        query,
        perPage,
        onPageChange: setPerPage,
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      Table,
      {
        className: "mt-24",
        columns: filteredColumns,
        data: (pagination == null ? void 0 : pagination.data) || [],
        meta: query.queryKey,
        renderRowAs: contentType === "manual" ? ContentTableRow : void 0,
        enableSelection: false,
        hideHeaderRow: true
      }
    ),
    !((_b2 = pagination == null ? void 0 : pagination.data) == null ? void 0 : _b2.length) ? noResultsMessage || /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        title: /* @__PURE__ */ jsx(Trans, { message: "Channel is empty" }),
        description: contentType === "manual" ? /* @__PURE__ */ jsx(Trans, { message: "No content is attached to this channel yet." }) : /* @__PURE__ */ jsx(Trans, { message: "No content to show for this channel yet." }),
        image: /* @__PURE__ */ jsx(SvgImage, { src: playlist })
      }
    ) : null,
    /* @__PURE__ */ jsx(
      Pagination,
      {
        query,
        perPage,
        onPageChange: setPerPage,
        className: "mt-24"
      }
    )
  ] });
}
function Pagination({
  query,
  perPage,
  onPageChange,
  className
}) {
  var _a2, _b2;
  if (!query.data)
    return;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("flex items-center justify-between gap-24", className),
      children: [
        /* @__PURE__ */ jsx(PaginationControls, { pagination: query.data, type: "simple" }),
        ((_a2 = query.data) == null ? void 0 : _a2.data.length) >= ((_b2 = query.data) == null ? void 0 : _b2.per_page) && /* @__PURE__ */ jsxs(
          SelectForwardRef,
          {
            minWidth: "min-w-auto",
            selectionMode: "single",
            disabled: query.isLoading,
            labelPosition: "side",
            size: "xs",
            label: /* @__PURE__ */ jsx(Trans, { message: "Per page" }),
            selectedValue: `${perPage}`,
            onSelectionChange: (value) => onPageChange(value),
            className: "ml-auto",
            children: [
              /* @__PURE__ */ jsx(Item, { value: "50", children: "50" }),
              /* @__PURE__ */ jsx(Item, { value: "100", children: "100" }),
              /* @__PURE__ */ jsx(Item, { value: "200", children: "200" }),
              /* @__PURE__ */ jsx(Item, { value: "500", children: "500" })
            ]
          }
        )
      ]
    }
  );
}
function ContentTableRow({
  item,
  children,
  className,
  ...domProps
}) {
  const isTouchDevice = useIsTouchDevice();
  const { data, meta } = useContext(TableContext);
  const { getValues } = useFormContext();
  const domRef = useRef(null);
  const reorderContent2 = useReorderChannelContent();
  const previewRef = useRef(null);
  const [dropPosition, setDropPosition] = useState(null);
  const { sortableProps } = useSortable({
    ref: domRef,
    disabled: isTouchDevice ?? false,
    item,
    items: data,
    type: "channelContentItem",
    preview: previewRef,
    strategy: "line",
    onDropPositionChange: (position) => {
      setDropPosition(position);
    },
    onSortEnd: (oldIndex, newIndex) => {
      const newPagination = queryClient.setQueryData(meta, (pagination) => {
        if (pagination) {
          pagination = {
            ...pagination,
            data: moveItemInNewArray(pagination.data, oldIndex, newIndex)
          };
        }
        return pagination;
      });
      if (newPagination) {
        reorderContent2.mutate({
          channelId: getValues("id"),
          modelType: item.model_type,
          ids: newPagination.data.map((item2) => item2.id)
        });
      }
    }
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        dropPosition === "before" && "sort-preview-before",
        dropPosition === "after" && "sort-preview-after"
      ),
      ref: domRef,
      ...mergeProps(sortableProps, domProps),
      children: [
        children,
        !item.isPlaceholder && /* @__PURE__ */ jsx(RowDragPreview, { item, ref: previewRef })
      ]
    }
  );
}
const RowDragPreview = React.forwardRef(({ item }, ref) => {
  return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-8 text-base shadow", children: item.name }) });
});
function RemoveItemColumn({ item }) {
  const removeFromChannel2 = useRemoveFromChannel();
  const { getValues } = useFormContext();
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "md",
      className: "text-muted",
      disabled: removeFromChannel2.isPending,
      onClick: () => {
        removeFromChannel2.mutate({
          channelId: getValues("id"),
          item
        });
      },
      children: /* @__PURE__ */ jsx(CloseIcon, {})
    }
  );
}
function ContentNotEditableWarning() {
  const { watch } = useFormContext();
  const contentType = watch("config.contentType");
  if (contentType === "manual") {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-20 mt-4 flex items-center gap-8", children: [
    /* @__PURE__ */ jsx(WarningIcon, { size: "xs" }),
    /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted", children: [
      contentType === "listAll" ? /* @__PURE__ */ jsx(Trans, { message: "This channel is listing all available content of specified type, and can't be curated manually." }) : null,
      contentType === "autoUpdate" ? /* @__PURE__ */ jsx(Trans, { message: "This channel content is set to update automatically and can't be curated manually." }) : null
    ] })
  ] });
}
function UpdateContentButton() {
  const { slugOrId } = useParams();
  const updateContent = useUpdateChannelContent(slugOrId);
  const { setValue, watch, getValues } = useFormContext();
  if (watch("config.contentType") !== "autoUpdate") {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(RefreshIcon, {}),
      onClick: () => {
        updateContent.mutate(
          {
            channelConfig: getValues("config")
          },
          {
            onSuccess: (response) => {
              if (response.channel.content) {
                setValue("content", response.channel.content);
              }
            }
          }
        );
      },
      disabled: updateContent.isPending || !watch("config.autoUpdateMethod") || !watch("id"),
      children: /* @__PURE__ */ jsx(Trans, { message: "Update content now" })
    }
  );
}
function useAddableContent(params) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => search(params),
    //enabled: !!params.query,
    placeholderData: params.query ? keepPreviousData : void 0
  });
}
function search(params) {
  return apiClient.get(`channel/search-for-addable-content`, { params }).then((response) => response.data);
}
function ChannelContentSearchField({
  onResultSelected,
  imgRenderer
}) {
  const { watch } = useFormContext();
  const contentModel = watch("config.contentModel");
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const { isFetching, data } = useAddableContent({
    query,
    modelType: contentModel,
    limit: 20
  });
  return /* @__PURE__ */ jsx(
    ComboBoxForwardRef,
    {
      isAsync: true,
      placeholder: trans(message("Search for content to add...")),
      isLoading: isFetching,
      inputValue: query,
      onInputValueChange: setQuery,
      clearInputOnItemSelection: true,
      blurReferenceOnItemSelection: true,
      selectionMode: "none",
      openMenuOnFocus: true,
      floatingMaxHeight: 670,
      startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
      hideEndAdornment: true,
      children: data == null ? void 0 : data.results.map((result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result.id,
          onSelected: () => onResultSelected == null ? void 0 : onResultSelected(result),
          startIcon: imgRenderer ? imgRenderer(result) : null,
          description: result.description,
          textLabel: result.name,
          children: result.name
        },
        result.id
      ))
    }
  );
}
const ImageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z" }),
  "ImageOutlined"
);
function ChannelContentItemImage({ item }) {
  const src = useImageSrc(item.image, { size: "sm" });
  const imageClassName = clsx(
    "aspect-square w-40 rounded object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  return src ? /* @__PURE__ */ jsx("img", { className: imageClassName, src, alt: "" }) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(ImageIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
}
function NewsArticleLink({
  article,
  className,
  children,
  color = "inherit",
  ...linkProps
}) {
  const finalUri = useMemo(() => {
    return getNewsArticleLink(article);
  }, [article]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        color === "primary" ? "text-primary hover:text-primary-dark" : "text-inherit",
        "overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline",
        className
      ),
      to: finalUri,
      children: children ?? article.title
    }
  );
}
function getNewsArticleLink(article, { absolute } = {}) {
  let link = `/news/${article.slug}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
const NewspaperIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z" }),
  "NewspaperOutlined"
);
function NewsArticleImage({
  article,
  className,
  size,
  lazy = true
}) {
  const { trans } = useTrans();
  const src = article.image;
  const imageClassName = clsx(
    className,
    size,
    "object-cover bg-fg-base/4 rounded",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      draggable: false,
      loading: lazy ? "lazy" : "eager",
      src,
      alt: trans(message("Image for :name", { values: { name: article.title } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(NewspaperIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  return /* @__PURE__ */ jsxs(NewsArticleLink, { article, className: "group relative flex-shrink-0", children: [
    image,
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" })
  ] });
}
function useDeleteComments() {
  return useMutation({
    mutationFn: (payload) => deleteComments(payload),
    onSuccess: (response, payload) => {
      toast(
        message("[one Comment deleted|other Deleted :count comments]", {
          values: { count: payload.commentIds.length }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteComments({ commentIds }) {
  return apiClient.delete(`comment/${commentIds.join(",")}`).then((r) => r.data);
}
function UserAvatar({ user, ...props }) {
  var _a2;
  const { auth } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsx(
    Avatar,
    {
      ...props,
      label: user == null ? void 0 : user.display_name,
      src: user == null ? void 0 : user.avatar,
      link: (user == null ? void 0 : user.id) && ((_a2 = auth.getUserProfileLink) == null ? void 0 : _a2.call(auth, user))
    }
  );
}
function buildQueryKey({
  queryKey,
  preserveQueryKey,
  defaultOrderDir,
  defaultOrderBy,
  queryParams
}, sortDescriptor, searchQuery = "") {
  if (preserveQueryKey) {
    return queryKey;
  }
  if (!sortDescriptor.orderBy) {
    sortDescriptor.orderBy = defaultOrderBy;
  }
  if (!sortDescriptor.orderDir) {
    sortDescriptor.orderDir = defaultOrderDir;
  }
  return [...queryKey, sortDescriptor, searchQuery, queryParams];
}
function useInfiniteData(props) {
  var _a2, _b2, _c2, _d2;
  const {
    initialPage,
    endpoint,
    defaultOrderBy,
    defaultOrderDir,
    queryParams,
    paginate: paginate2,
    transformResponse,
    willSortOrFilter = false,
    reverse = false,
    disabled = false,
    prefetchOnly = false
  } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    orderBy: defaultOrderBy,
    orderDir: defaultOrderDir
  });
  const queryKey = buildQueryKey(props, sortDescriptor, searchQuery);
  const initialQueryKey = useRef(hashKey(queryKey)).current;
  const query = useInfiniteQuery({
    enabled: !disabled,
    notifyOnChangeProps: prefetchOnly ? [] : void 0,
    placeholderData: willSortOrFilter ? keepPreviousData : void 0,
    queryKey,
    queryFn: ({ pageParam, signal }) => {
      const params = {
        ...queryParams,
        perPage: (initialPage == null ? void 0 : initialPage.per_page) || (queryParams == null ? void 0 : queryParams.perPage),
        query: (queryParams == null ? void 0 : queryParams.query) ?? searchQuery,
        paginate: paginate2,
        ...sortDescriptor
      };
      if (paginate2 === "cursor") {
        params.cursor = pageParam;
      } else {
        params.page = pageParam || 1;
      }
      return fetchData(endpoint, params, transformResponse, signal);
    },
    initialPageParam: paginate2 === "cursor" ? "" : 1,
    getNextPageParam: (lastResponse) => {
      if (!hasNextPage(lastResponse.pagination)) {
        return null;
      }
      if ("next_cursor" in lastResponse.pagination) {
        return lastResponse.pagination.next_cursor;
      }
      return lastResponse.pagination.current_page + 1;
    },
    initialData: () => {
      if (!initialPage || hashKey(queryKey) !== initialQueryKey) {
        return void 0;
      }
      return {
        pageParams: [void 0, 1],
        pages: [{ pagination: initialPage }]
      };
    },
    select: reverse ? (data) => {
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse()
      };
    } : void 0
  });
  const items = useMemo(() => {
    var _a3;
    return ((_a3 = query.data) == null ? void 0 : _a3.pages.flatMap((p) => p.pagination.data)) || [];
  }, [(_a2 = query.data) == null ? void 0 : _a2.pages]);
  const firstPage = (_b2 = query.data) == null ? void 0 : _b2.pages[0].pagination;
  const totalItems = firstPage && "total" in firstPage && firstPage.total ? firstPage.total : null;
  return {
    ...query,
    items,
    totalItems,
    noResults: ((_d2 = (_c2 = query.data) == null ? void 0 : _c2.pages) == null ? void 0 : _d2[0].pagination.data.length) === 0,
    // can't use "isRefetching", it's true for some reason when changing sorting or filters
    isReloading: query.isFetching && !query.isFetchingNextPage && query.isPlaceholderData,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery
  };
}
async function fetchData(endpoint, params, transformResponse, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return apiClient.get(endpoint, { params, signal: params.query ? signal : void 0 }).then((r) => {
    if (transformResponse) {
      return transformResponse(r.data);
    }
    return r.data;
  });
}
function reviewsQueryKey(reviewable, params) {
  const key = ["reviews"];
  if (reviewable) {
    key.push(`${reviewable.id}-${reviewable.model_type}`);
  }
  if (params) {
    key.push(params);
  }
  return key;
}
function useReviews(reviewable) {
  const [searchParams] = useSearchParams();
  const [sort] = useLocalStorage(
    `reviewSort.${reviewable.model_type}`,
    "created_at:desc"
  );
  const [defaultOrderBy, defaultOrderDir] = sort.split(":");
  return useInfiniteData({
    willSortOrFilter: true,
    queryKey: reviewsQueryKey(reviewable, { sort }),
    endpoint: "reviewable/reviews",
    defaultOrderBy,
    defaultOrderDir,
    queryParams: {
      reviewable_type: reviewable.model_type,
      reviewable_id: reviewable.id,
      perPage: 5,
      sharedReviewId: searchParams.get("reviewId")
    }
  });
}
function useDeleteReviews() {
  return useMutation({
    mutationFn: (payload) => deleteReviews(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reviewsQueryKey() });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deleteReviews({ reviewIds }) {
  return apiClient.delete(`reviews/${reviewIds.join(",")}`).then((r) => r.data);
}
const StarIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" }),
  "StarOutlined"
);
function TitleRating({ score, className }) {
  if (!score)
    return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex flex-shrink-0 items-center gap-4 whitespace-nowrap",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(StarIcon, { className: "text-primary" }),
        /* @__PURE__ */ jsxs("span", { children: [
          score,
          " / 10"
        ] })
      ]
    }
  );
}
const StarBorderIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" }),
  "StarBorderOutlined"
);
function StarSelector({
  count,
  value,
  onValueChange,
  className,
  readonly
}) {
  const isMobile = useIsMobileMediaQuery();
  const [hoverRating, setHoverRating] = useState(value);
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("flex items-center", className),
      onPointerLeave: () => {
        if (!readonly) {
          setHoverRating(value);
        }
      },
      children: Array.from({ length: count }).map((_, i) => {
        const number = i + 1;
        const isActive = hoverRating >= number;
        return /* @__PURE__ */ jsx(
          IconButton,
          {
            size: isMobile ? "xs" : "sm",
            "aria-label": trans(
              message("Rate :count stars", { values: { count: number } })
            ),
            iconSize: "md",
            color: isActive ? "primary" : void 0,
            disabled: readonly,
            onClick: () => {
              onValueChange == null ? void 0 : onValueChange(number);
            },
            onPointerEnter: () => {
              setHoverRating(number);
            },
            children: isActive ? /* @__PURE__ */ jsx(StarIcon, {}) : /* @__PURE__ */ jsx(StarBorderIcon, {})
          },
          i
        );
      })
    }
  );
}
function BulletSeparatedItems({
  children,
  className
}) {
  const items = Children.toArray(children);
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-4 overflow-hidden", className), children: items.map((child, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: child }),
    index < items.length - 1 ? /* @__PURE__ */ jsx("div", { children: "•" }) : null
  ] }, index)) });
}
const SortIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" }),
  "SortOutlined"
);
const SortOptions = [
  {
    value: "created_at:desc",
    label: message("Newest")
  },
  {
    value: "created_at:asc",
    label: message("Oldest")
  },
  {
    value: "mostHelpful",
    label: message("Most helpful")
  },
  {
    value: "reports_count:desc",
    label: message("Most reported")
  }
];
function ReviewListSortButton({
  value,
  onValueChange,
  color,
  showReportsItem
}) {
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
        /* @__PURE__ */ jsx(Button, { variant: "outline", startIcon: /* @__PURE__ */ jsx(SortIcon, {}), color, children: /* @__PURE__ */ jsx(Trans, { ...selectedOption.label }) }),
        /* @__PURE__ */ jsx(Menu, { children: SortOptions.filter(
          (option) => option.value !== "reports_count:desc" || showReportsItem
        ).map((option) => /* @__PURE__ */ jsx(Item, { value: option.value, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.value)) })
      ]
    }
  );
}
function BaseMediaLink({
  link,
  className,
  children,
  color = "inherit",
  displayContents,
  ...linkProps
}) {
  const baseClassName = displayContents ? "contents" : clsx(
    color === "primary" ? "text-primary hover:text-primary-dark" : "text-inherit",
    "hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors"
  );
  return /* @__PURE__ */ jsx(Link, { ...linkProps, className: clsx(baseClassName, className), to: link, children });
}
function getBaseMediaLink(link, { absolute } = {}) {
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
function SeasonLink({
  title,
  seasonNumber,
  children,
  color = "inherit",
  ...linkProps
}) {
  const link = useMemo(() => {
    return getSeasonLink(title, seasonNumber);
  }, [title, seasonNumber]);
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...linkProps, link, children: children ?? /* @__PURE__ */ jsx(Trans, { message: "Season :number", values: { number: seasonNumber } }) });
}
function getSeasonLink(title, seasonNumber, { absolute } = {}) {
  const titleLink = getTitleLink(title, { absolute });
  return `${titleLink}/season/${seasonNumber}`;
}
function EpisodeLink({
  title,
  seasonNumber,
  episodeNumber,
  episode,
  children,
  color = "inherit",
  ...linkProps
}) {
  const link = useMemo(() => {
    return getEpisodeLink(
      title,
      seasonNumber || (episode == null ? void 0 : episode.episode_number) || 1,
      episodeNumber || (episode == null ? void 0 : episode.episode_number) || 1
    );
  }, [title, seasonNumber, episodeNumber, episode]);
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...linkProps, link, children: children ?? /* @__PURE__ */ jsx("span", { children: episode == null ? void 0 : episode.name }) });
}
function getEpisodeLink(title, seasonNumber, episodeNumber, { absolute } = {}) {
  const seasonLink = getSeasonLink(title, seasonNumber, { absolute });
  return `${seasonLink}/episode/${episodeNumber}`;
}
function CompactSeasonEpisode({
  episode,
  seasonNum,
  episodeNum,
  className
}) {
  if (!seasonNum && episode) {
    seasonNum = episode.season_number;
  }
  if (!episodeNum && episode) {
    episodeNum = episode.episode_number;
  }
  if (seasonNum && episodeNum) {
    return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "s:seasone:episode",
        values: {
          season: prefixWithZero(seasonNum),
          episode: prefixWithZero(episodeNum)
        }
      }
    ) });
  }
  if (seasonNum) {
    return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "s:season",
        values: {
          season: prefixWithZero(seasonNum)
        }
      }
    ) });
  }
  if (episodeNum) {
    return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "e:episode",
        values: {
          episode: prefixWithZero(episodeNum)
        }
      }
    ) });
  }
  return null;
}
function prefixWithZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}
function TitleLink({ title, children, ...linkProps }) {
  const link = useMemo(() => {
    return getTitleLink(title);
  }, [title]);
  return /* @__PURE__ */ jsx(BaseMediaLink, { ...linkProps, link, children: children ?? title.name });
}
function TitleLinkWithEpisodeNumber({
  title,
  episode,
  children,
  ...linkProps
}) {
  const link = useMemo(() => {
    return getEpisodeLink(title, episode.season_number, episode.episode_number);
  }, [title, episode]);
  return /* @__PURE__ */ jsxs(BaseMediaLink, { ...linkProps, link, children: [
    title.name,
    " (",
    /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode }),
    ")"
  ] });
}
function getTitleLink(title, { absolute, season, episode } = {}) {
  if (episode && season) {
    return getEpisodeLink(title, season, episode, { absolute });
  } else if (season) {
    return getSeasonLink(title, season, { absolute });
  }
  return getBaseMediaLink(`/titles/${title.id}/${slugifyString(title.name)}`, {
    absolute
  });
}
function getWatchLink(video, { absolute } = {}) {
  let link = `/watch/${video.id}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
const MediaPlayIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10.6667 6.6548C10.6667 6.10764 11.2894 5.79346 11.7295 6.11862L24.377 15.4634C24.7377 15.7298 24.7377 16.2692 24.3771 16.5357L11.7295 25.8813C11.2895 26.2065 10.6667 25.8923 10.6667 25.3451L10.6667 6.6548Z" }),
  "MediaPlay",
  "0 0 32 32"
);
function TitlePoster({
  title,
  className,
  size = "w-full",
  srcSize,
  lazy = true,
  aspect = "aspect-poster",
  showPlayButton,
  link
}) {
  const { trans } = useTrans();
  const src = useImageSrc(title == null ? void 0 : title.poster, { size: srcSize });
  if (!title.primary_video) {
    showPlayButton = false;
  }
  const imageClassName = clsx(
    "h-full w-full rounded bg-fg-base/4 object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      decoding: "async",
      draggable: false,
      loading: lazy ? "lazy" : "eager",
      src,
      alt: trans(message("Poster for :name", { values: { name: title.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imageClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(MovieIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  const linkChildren = /* @__PURE__ */ jsxs(Fragment, { children: [
    image,
    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10" })
  ] });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(size, aspect, className, "group relative flex-shrink-0"),
      children: [
        link ? /* @__PURE__ */ jsx(Link, { to: link, className: "contents", children: linkChildren }) : /* @__PURE__ */ jsx(TitleLink, { title, displayContents: true, children: linkChildren }),
        showPlayButton ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-14 left-14", children: /* @__PURE__ */ jsx(
          IconButton,
          {
            color: "white",
            variant: "flat",
            className: "shadow-md",
            radius: "rounded-full",
            elementType: Link,
            to: getWatchLink(title.primary_video),
            "aria-label": `Play ${title.name}`,
            children: /* @__PURE__ */ jsx(MediaPlayIcon, {})
          }
        ) }) : null
      ]
    }
  );
}
function VideoPlayerSkeleton({ animate }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      Skeleton,
      {
        variant: "rect",
        className: "aspect-video",
        animation: animate ? "pulsate" : null
      }
    ),
    /* @__PURE__ */ jsx(
      MediaPlayIcon,
      {
        className: "absolute inset-0 m-auto text-fg-base/40",
        size: "w-80 h-80"
      }
    )
  ] });
}
const IS_CLIENT = typeof window !== "undefined";
const UA = IS_CLIENT ? (_c = window.navigator) == null ? void 0 : _c.userAgent.toLowerCase() : "";
const IS_IOS = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
const IS_IPHONE = IS_CLIENT && /(iPhone|iPod)/gi.test((_d = window.navigator) == null ? void 0 : _d.platform);
const hlsRegex = /\.(m3u8)($|\?)/i;
const dashRegex = /\.(mpd)($|\?)/i;
const audioRegex = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
const youtubeUrlRegex = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
const youtubeIdRegex = /^((?:\w|-){11})$/;
function guessPlayerProvider(src) {
  if (youtubeUrlRegex.test(src) || youtubeIdRegex.test(src)) {
    return "youtube";
  } else if (audioRegex.test(src)) {
    return "htmlAudio";
  } else if (hlsRegex.test(src)) {
    if (IS_IOS) {
      return "htmlVideo";
    } else {
      return "hls";
    }
  } else if (dashRegex.test(src)) {
    return "dash";
  } else {
    return "htmlVideo";
  }
}
function shuffleArray(items, keepFirst = false) {
  const first = keepFirst ? items.shift() : null;
  let currentIndex = items.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = items[currentIndex];
    items[currentIndex] = items[randomIndex];
    items[randomIndex] = temporaryValue;
  }
  if (first) {
    items.unshift(first);
  }
  return [...items];
}
function getPlayerStateFromLocalStorage(id, options) {
  const defaultVolume = (options == null ? void 0 : options.defaultVolume) || 30;
  return {
    state: {
      muted: getFromLocalStorage(`player.${id}.muted`) ?? false,
      repeat: getFromLocalStorage(`player.${id}.repeat`) ?? "all",
      shuffling: getFromLocalStorage(`player.${id}.shuffling`) ?? false,
      volume: getFromLocalStorage(`player.${id}.volume`) ?? defaultVolume
    },
    queue: getFromLocalStorage(`player.${id}.queue`, []),
    cuedMediaId: getFromLocalStorage(`player.${id}.cuedMediaId`)
  };
}
function prependToArrayAtIndex(array, toAdd, index = 0) {
  const copyOfArray = [...array];
  const tail = copyOfArray.splice(index + 1);
  return [...copyOfArray, ...toAdd, ...tail];
}
function resetMediaSession() {
  if ("mediaSession" in navigator) {
    const actionHandlers = [
      "play",
      "pause",
      "previoustrack",
      "nexttrack",
      "stop",
      "seekbackward",
      "seekforward",
      "seekto"
    ];
    actionHandlers.forEach(
      (action) => navigator.mediaSession.setActionHandler(action, null)
    );
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = "none";
  }
}
function playerQueue(state) {
  const getPointer = () => {
    if (state().cuedMedia) {
      return state().shuffledQueue.findIndex(
        (item) => {
          var _a2;
          return item.id === ((_a2 = state().cuedMedia) == null ? void 0 : _a2.id);
        }
      ) || 0;
    }
    return 0;
  };
  const getCurrent = () => {
    return state().shuffledQueue[getPointer()];
  };
  const getFirst = () => {
    return state().shuffledQueue[0];
  };
  const getLast = () => {
    return state().shuffledQueue[state().shuffledQueue.length - 1];
  };
  const getNext = () => {
    return state().shuffledQueue[getPointer() + 1];
  };
  const getPrevious = () => {
    return state().shuffledQueue[getPointer() - 1];
  };
  const isLast = () => {
    return getPointer() === state().originalQueue.length - 1;
  };
  return {
    getPointer,
    getCurrent,
    getFirst,
    getLast,
    getNext,
    getPrevious,
    isLast
  };
}
function handlePlayerKeybinds(e, state) {
  var _a2;
  if (["input", "textarea"].includes(
    (_a2 = e.target) == null ? void 0 : _a2.tagName.toLowerCase()
  ))
    return;
  if (e.key === " " || e.key === "k") {
    e.preventDefault();
    if (state().isPlaying) {
      state().pause();
    } else {
      state().play();
    }
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (isCtrlOrShiftPressed(e)) {
      state().playPrevious();
    } else {
      state().seek(state().getCurrentTime() - 10);
    }
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    if (isCtrlOrShiftPressed(e)) {
      state().playNext();
    } else {
      state().seek(state().getCurrentTime() + 10);
    }
  }
}
function initPlayerMediaSession(state, options) {
  var _a2;
  if ("mediaSession" in navigator) {
    const actionHandlers = {
      play: () => state().play(),
      pause: () => state().pause(),
      previoustrack: () => state().playPrevious(),
      nexttrack: () => state().playNext(),
      stop: () => state().stop(),
      seekbackward: () => state().seek(state().getCurrentTime() - 10),
      seekforward: () => state().seek(state().getCurrentTime() + 10),
      seekto: (details) => state().seek(details.seekTime || 0)
    };
    for (const key in actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(
          key,
          actionHandlers[key]
        );
      } catch (error) {
      }
    }
    const cuedMedia = state().cuedMedia;
    if (cuedMedia) {
      (_a2 = options.setMediaSessionMetadata) == null ? void 0 : _a2.call(options, cuedMedia);
    }
  }
}
function isSameMedia(a, b) {
  if (!a || !b)
    return false;
  return a.id === b.id && a.groupId === b.groupId;
}
class ScreenOrientation {
  constructor() {
    __publicField(this, "currentLock");
  }
  async lock(lockType = "landscape") {
    if (!this.canOrientScreen() || this.currentLock)
      return;
    try {
      await screen.orientation.lock(lockType);
      this.currentLock = lockType;
    } catch (e) {
    }
  }
  async unlock() {
    if (!this.canOrientScreen() || !this.currentLock)
      return;
    await screen.orientation.unlock();
  }
  canOrientScreen() {
    return screen.orientation != null && !!screen.orientation.lock && !!screen.orientation.unlock;
  }
}
function createNativeFullscreenAdapter(host, onChange) {
  host = host.closest(".fullscreen-host") ?? host;
  return {
    isFullscreen: () => {
      if (fscreen.fullscreenElement === host)
        return true;
      try {
        return host.matches(
          // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
          fscreen.fullscreenPseudoClass
        );
      } catch (error) {
        return false;
      }
    },
    canFullScreen: () => {
      return fscreen.fullscreenEnabled;
    },
    enter: () => {
      return fscreen.requestFullscreen(host);
    },
    exit: () => {
      return fscreen.exitFullscreen();
    },
    bindEvents: () => {
      fscreen.addEventListener("fullscreenchange", onChange);
      fscreen.addEventListener("fullscreenerror", onChange);
    },
    unbindEvents: () => {
      fscreen.removeEventListener("fullscreenchange", onChange);
      fscreen.removeEventListener("fullscreenerror", onChange);
    }
  };
}
function createIphoneFullscreenAdapter(host, onChange) {
  return {
    /**
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
     */
    isFullscreen: () => {
      return host.webkitPresentationMode === "fullscreen";
    },
    /**
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
     */
    canFullScreen: () => {
      return IS_IPHONE && typeof host.webkitSetPresentationMode === "function" && (host.webkitSupportsFullscreen ?? false);
    },
    enter: () => {
      var _a2;
      return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "fullscreen");
    },
    exit: () => {
      var _a2;
      return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "inline");
    },
    bindEvents: () => {
      host.removeEventListener("webkitpresentationmodechanged", onChange);
    },
    unbindEvents: () => {
      host.addEventListener("webkitpresentationmodechanged", onChange);
    }
  };
}
const iPhoneProviderBlacklist = ["youtube"];
const createFullscreenSlice = (set, get) => {
  let subscription;
  const orientation = new ScreenOrientation();
  let adapter;
  const onFullscreenChange = async () => {
    const isFullscreen = adapter == null ? void 0 : adapter.isFullscreen();
    if (isFullscreen) {
      orientation.lock();
    } else {
      orientation.unlock();
    }
    set({ isFullscreen });
  };
  const isSupported = () => {
    if (IS_IPHONE && iPhoneProviderBlacklist.includes(get().providerName)) {
      return false;
    }
    return (adapter == null ? void 0 : adapter.canFullScreen()) ?? false;
  };
  return {
    isFullscreen: false,
    canFullscreen: false,
    enterFullscreen: () => {
      if (!isSupported() || (adapter == null ? void 0 : adapter.isFullscreen()))
        return;
      if (get().isPip) {
        get().exitPip();
      }
      return adapter == null ? void 0 : adapter.enter();
    },
    exitFullscreen: () => {
      if (!(adapter == null ? void 0 : adapter.isFullscreen()))
        return;
      return adapter.exit();
    },
    toggleFullscreen: () => {
      if (get().isFullscreen) {
        get().exitFullscreen();
      } else {
        get().enterFullscreen();
      }
    },
    initFullscreen: () => {
      subscription = get().subscribe({
        providerReady: ({ el }) => {
          adapter == null ? void 0 : adapter.unbindEvents();
          if (get().isFullscreen) {
            adapter == null ? void 0 : adapter.exit();
          }
          adapter = IS_IPHONE ? createIphoneFullscreenAdapter(
            el,
            onFullscreenChange
          ) : createNativeFullscreenAdapter(el, onFullscreenChange);
          const canFullscreen = isSupported();
          set({ canFullscreen });
          if (canFullscreen) {
            adapter.bindEvents();
          }
        }
      });
    },
    destroyFullscreen: () => {
      get().exitFullscreen();
      subscription == null ? void 0 : subscription();
    }
  };
};
const createChromePipAdapter = (host, onChange) => {
  return {
    isSupported: () => canUsePiPInChrome(),
    isPip: () => {
      return host === document.pictureInPictureElement;
    },
    enter: () => {
      if (canUsePiPInChrome()) {
        return host.requestPictureInPicture();
      }
    },
    exit: () => {
      if (canUsePiPInChrome()) {
        return document.exitPictureInPicture();
      }
    },
    bindEvents: () => {
      if (canUsePiPInChrome()) {
        host.addEventListener("enterpictureinpicture", onChange);
        host.addEventListener("leavepictureinpicture", onChange);
      }
    },
    unbindEvents: () => {
      if (canUsePiPInChrome()) {
        host.removeEventListener("enterpictureinpicture", onChange);
        host.removeEventListener("leavepictureinpicture", onChange);
      }
    }
  };
};
let _canUsePiPInChrome;
const canUsePiPInChrome = () => {
  if (!IS_CLIENT)
    return false;
  if (_canUsePiPInChrome == null) {
    const video = document.createElement("video");
    _canUsePiPInChrome = !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
  }
  return _canUsePiPInChrome;
};
const createSafariPipAdapter = (host, onChange) => {
  return {
    isSupported: () => canUsePiPInSafari(),
    isPip: () => {
      return host.webkitPresentationMode === "picture-in-picture";
    },
    enter: () => {
      var _a2;
      if (canUsePiPInSafari()) {
        return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "picture-in-picture");
      }
    },
    exit: () => {
      var _a2;
      if (canUsePiPInSafari()) {
        return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "inline");
      }
    },
    bindEvents: () => {
      if (canUsePiPInSafari()) {
        host.addEventListener("webkitpresentationmodechanged", onChange);
      }
    },
    unbindEvents: () => {
      if (canUsePiPInSafari()) {
        host.removeEventListener("webkitpresentationmodechanged", onChange);
      }
    }
  };
};
let _canUsePiPInSafari;
const canUsePiPInSafari = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement("video");
  if (_canUsePiPInSafari == null) {
    _canUsePiPInSafari = // @ts-ignore
    !!video.webkitSupportsPresentationMode && // @ts-ignore
    !!video.webkitSetPresentationMode && !IS_IPHONE;
  }
  return _canUsePiPInSafari;
};
const adapterFactories = [createChromePipAdapter, createSafariPipAdapter];
const createPipSlice = (set, get) => {
  let subscription;
  let adapters = [];
  const onPipChange = () => {
    set({ isPip: adapters.some((a) => a.isPip()) });
  };
  const isSupported = () => {
    if (get().providerName !== "htmlVideo") {
      return false;
    }
    return adapters.some((adapter) => adapter.isSupported());
  };
  return {
    isPip: false,
    canPip: false,
    enterPip: async () => {
      var _a2;
      if (get().isPip || !isSupported())
        return;
      await ((_a2 = adapters.find((a) => a.isSupported())) == null ? void 0 : _a2.enter());
    },
    exitPip: async () => {
      var _a2;
      if (!get().isPip)
        return;
      await ((_a2 = adapters.find((a) => a.isSupported())) == null ? void 0 : _a2.exit());
    },
    togglePip: () => {
      if (get().isPip) {
        get().exitPip();
      } else {
        get().enterPip();
      }
    },
    initPip: () => {
      subscription = get().subscribe({
        providerReady: ({ el }) => {
          adapters.every((a) => a.unbindEvents());
          if (get().isPip) {
            adapters.every((a) => a.exit());
          }
          adapters = adapterFactories.map(
            (factory) => factory(el, onPipChange)
          );
          const canPip = isSupported();
          if (canPip) {
            adapters.every((a) => a.bindEvents());
          }
          set({ canPip });
        }
      });
    },
    destroyPip: () => {
      get().exitPip();
      subscription == null ? void 0 : subscription();
    }
  };
};
const createPlayerStore = (id, options) => {
  const initialData = deepMerge(
    getPlayerStateFromLocalStorage(id, options),
    options.initialData || {}
  );
  const setInLocalStorage$1 = (key, value) => {
    setInLocalStorage(`player.${id}.${key}`, value);
  };
  return createStore()(
    subscribeWithSelector(
      immer((set, get, store) => {
        var _a2, _b2, _c2, _d2, _e;
        const listeners = /* @__PURE__ */ new Set();
        const internalListeners = {
          play: () => {
            set((s) => {
              s.isPlaying = true;
              s.playbackStarted = true;
            });
          },
          pause: () => {
            set((s) => {
              s.isPlaying = false;
              s.controlsVisible = true;
            });
          },
          error: (e) => {
            set((s) => {
              if (e == null ? void 0 : e.fatal) {
                s.isPlaying = false;
              }
            });
          },
          durationChange: (payload) => {
            set({ mediaDuration: payload.duration });
          },
          streamTypeChange: (payload) => {
            set({ streamType: payload.streamType });
          },
          buffered: (payload) => {
          },
          playbackRateChange: (payload) => {
            set({ playbackRate: payload.rate });
          },
          playbackRates: ({ rates }) => {
            set({ playbackRates: rates });
          },
          playbackQualities: ({ qualities }) => {
            set({ playbackQualities: qualities });
          },
          audioTracks: ({ tracks }) => {
            set({ audioTracks: tracks });
          },
          currentAudioTrackChange: ({ trackId }) => {
            set({ currentAudioTrack: trackId });
          },
          playbackQualityChange: ({ quality }) => {
            set({ playbackQuality: quality });
          },
          textTracks: ({ tracks }) => {
            set({ textTracks: tracks });
          },
          currentTextTrackChange: ({ trackId }) => {
            set({ currentTextTrack: trackId });
          },
          textTrackVisibilityChange: ({ isVisible }) => {
            set({ textTrackIsVisible: isVisible });
          },
          buffering: ({ isBuffering }) => {
            set({ isBuffering });
          },
          playbackEnd: async () => {
            const media = get().cuedMedia;
            if (get().isSeeking)
              return;
            if (queue.isLast() && options.loadMoreMediaItems) {
              const items = await options.loadMoreMediaItems(media);
              if (items == null ? void 0 : items.length) {
                get().appendToQueue(items);
              }
            }
            get().playNext();
          },
          posterLoaded: ({ url }) => {
            set({ posterUrl: url });
          },
          providerReady: () => {
            const provider = get().providerApi;
            if (provider) {
              provider.setVolume(get().volume);
              provider.setMuted(get().muted);
              if (options.autoPlay) {
                provider.play();
              }
              set({ providerReady: true });
            }
          }
        };
        const queue = playerQueue(get);
        const keybindsHandler = (e) => {
          handlePlayerKeybinds(e, get);
        };
        const initialQueue = initialData.queue || [];
        return {
          options,
          ...createFullscreenSlice(set, get),
          ...createPipSlice(set, get),
          originalQueue: initialQueue,
          shuffledQueue: ((_a2 = initialData.state) == null ? void 0 : _a2.shuffling) ? shuffleArray(initialQueue) : initialQueue,
          isPlaying: false,
          isBuffering: false,
          streamType: null,
          playbackStarted: false,
          providerReady: false,
          pauseWhileSeeking: options.pauseWhileSeeking ?? true,
          isSeeking: false,
          setIsSeeking: (isSeeking) => {
            set({ isSeeking });
          },
          controlsVisible: true,
          setControlsVisible: (isVisible) => {
            set((s) => {
              s.controlsVisible = isVisible;
            });
          },
          volume: ((_b2 = initialData.state) == null ? void 0 : _b2.volume) ?? 30,
          setVolume: (value) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setVolume(value);
            set((s) => {
              s.volume = value;
            });
            setInLocalStorage$1("volume", value);
          },
          muted: ((_c2 = initialData.state) == null ? void 0 : _c2.muted) ?? false,
          setMuted: (isMuted) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setMuted(isMuted);
            set((s) => {
              s.muted = isMuted;
            });
            setInLocalStorage$1("muted", isMuted);
          },
          playbackRates: [],
          playbackRate: 1,
          setPlaybackRate: (speed) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setPlaybackRate(speed);
          },
          playbackQuality: "auto",
          setPlaybackQuality: (quality) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setPlaybackQuality) == null ? void 0 : _b3.call(_a3, quality);
          },
          playbackQualities: [],
          repeat: ((_d2 = initialData.state) == null ? void 0 : _d2.repeat) ?? "all",
          toggleRepeatMode: () => {
            let newRepeat = "all";
            const currentRepeat = get().repeat;
            if (currentRepeat === "all") {
              newRepeat = "one";
            } else if (currentRepeat === "one") {
              newRepeat = false;
            }
            set({ repeat: newRepeat });
            setInLocalStorage$1("repeat", newRepeat);
          },
          shuffling: ((_e = initialData.state) == null ? void 0 : _e.shuffling) ?? false,
          toggleShuffling: () => {
            let newQueue = [];
            if (get().shuffling) {
              newQueue = get().originalQueue;
            } else {
              newQueue = shuffleArray([...get().shuffledQueue]);
            }
            set((s) => {
              s.shuffling = !s.shuffling;
              s.shuffledQueue = newQueue;
            });
          },
          mediaDuration: 0,
          seek: (time) => {
            var _a3;
            const timeStr = `${time}`;
            if (timeStr.startsWith("+")) {
              time = get().getCurrentTime() + Number(time);
            } else if (timeStr.startsWith("-")) {
              time = get().getCurrentTime() - Number(timeStr.replace("-", ""));
            } else {
              time = Number(time);
            }
            (_a3 = get().providerApi) == null ? void 0 : _a3.seek(time);
            get().emit("seek", { time });
          },
          getCurrentTime: () => {
            var _a3;
            return ((_a3 = get().providerApi) == null ? void 0 : _a3.getCurrentTime()) || 0;
          },
          play: async (media) => {
            var _a3, _b3;
            if (media) {
              await get().cue(media);
            } else {
              media = get().cuedMedia || queue.getCurrent();
            }
            if (!media) {
              get().stop();
              return;
            }
            await ((_a3 = options.onBeforePlay) == null ? void 0 : _a3.call(options));
            await ((_b3 = get().providerApi) == null ? void 0 : _b3.play());
          },
          pause: () => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.pause();
          },
          stop: () => {
            if (!get().isPlaying)
              return;
            get().pause();
            get().seek(0);
          },
          playNext: async () => {
            var _a3;
            get().stop();
            let media = queue.getCurrent();
            if (get().repeat === "all" && queue.isLast()) {
              media = queue.getFirst();
            } else if (get().repeat !== "one") {
              media = queue.getNext();
            }
            if (get().repeat === "one" && get().providerName === "youtube") {
              await new Promise((resolve) => setTimeout(resolve, 50));
            }
            if ((_a3 = options.onBeforePlayNext) == null ? void 0 : _a3.call(options, media)) {
              return;
            }
            if (media) {
              await get().play(media);
            } else {
              get().seek(0);
              get().play();
            }
          },
          playPrevious: async () => {
            var _a3;
            get().stop();
            let media = queue.getCurrent();
            if (get().repeat === "all" && queue.getPointer() === 0) {
              media = queue.getLast();
            } else if (get().repeat !== "one") {
              media = queue.getPrevious();
            }
            if ((_a3 = options.onBeforePlayPrevious) == null ? void 0 : _a3.call(options, media)) {
              return;
            }
            if (media) {
              await get().play(media);
            } else {
              get().seek(0);
              get().play();
            }
          },
          cue: async (media) => {
            if (isSameMedia(media, get().cuedMedia))
              return;
            get().emit("beforeCued", { previous: get().cuedMedia });
            return new Promise((resolve, reject) => {
              var _a3;
              const previousProvider = get().providerName;
              const timeoutId = setTimeout(() => {
                unsubscribe();
                resolve();
              }, 3e3);
              const unsubscribe = get().subscribe({
                cued: () => {
                  clearTimeout(timeoutId);
                  unsubscribe();
                  resolve();
                },
                error: (e) => {
                  clearTimeout(timeoutId);
                  unsubscribe();
                  reject("Could not cue media");
                }
              });
              set({
                cuedMedia: media,
                posterUrl: media.poster,
                providerName: media.provider,
                providerReady: previousProvider === media.provider,
                streamType: "streamType" in media ? media.streamType : null
              });
              if (media) {
                (_a3 = options.setMediaSessionMetadata) == null ? void 0 : _a3.call(options, media);
              }
              if (options.persistQueueInLocalStorage) {
                setInLocalStorage$1("cuedMediaId", media.id);
              }
            });
          },
          async overrideQueue(mediaItems, queuePointer = 0) {
            if (!(mediaItems == null ? void 0 : mediaItems.length))
              return;
            const items = [...mediaItems];
            set((s) => {
              s.shuffledQueue = get().shuffling ? shuffleArray(items, true) : items;
              s.originalQueue = items;
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
            const media = queuePointer > -1 ? mediaItems[queuePointer] : queue.getCurrent();
            if (media) {
              return get().cue(media);
            }
          },
          appendToQueue: (mediaItems, afterCuedMedia = true) => {
            const shuffledNewItems = get().shuffling ? shuffleArray([...mediaItems]) : [...mediaItems];
            const index = afterCuedMedia ? queue.getPointer() : 0;
            set((s) => {
              s.shuffledQueue = prependToArrayAtIndex(
                s.shuffledQueue,
                shuffledNewItems,
                index
              );
              s.originalQueue = prependToArrayAtIndex(
                s.originalQueue,
                mediaItems,
                index
              );
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
          },
          removeFromQueue: (mediaItems) => {
            set((s) => {
              s.shuffledQueue = s.shuffledQueue.filter(
                (item) => !mediaItems.find((m2) => isSameMedia(m2, item))
              );
              s.originalQueue = s.originalQueue.filter(
                (item) => !mediaItems.find((m2) => isSameMedia(m2, item))
              );
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
          },
          textTracks: [],
          currentTextTrack: -1,
          setCurrentTextTrack: (trackId) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setCurrentTextTrack) == null ? void 0 : _b3.call(_a3, trackId);
          },
          textTrackIsVisible: false,
          setTextTrackVisibility: (isVisible) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setTextTrackVisibility) == null ? void 0 : _b3.call(_a3, isVisible);
          },
          audioTracks: [],
          currentAudioTrack: -1,
          setCurrentAudioTrack: (trackId) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setCurrentAudioTrack) == null ? void 0 : _b3.call(_a3, trackId);
          },
          destroy: () => {
            var _a3;
            get().destroyFullscreen();
            get().destroyPip();
            (_a3 = options == null ? void 0 : options.onDestroy) == null ? void 0 : _a3.call(options);
            resetMediaSession();
            listeners.clear();
            document.removeEventListener("keydown", keybindsHandler);
          },
          init: async () => {
            var _a3, _b3, _c3;
            get().initFullscreen();
            listeners.add(internalListeners);
            if (options.listeners) {
              listeners.add(options.listeners);
            }
            const mediaId = initialData.cuedMediaId || ((_b3 = (_a3 = initialData.queue) == null ? void 0 : _a3[0]) == null ? void 0 : _b3.id);
            const mediaToCue = (_c3 = initialData.queue) == null ? void 0 : _c3.find(
              (media) => media.id === mediaId
            );
            if (mediaToCue) {
              await get().cue(mediaToCue);
            }
            initPlayerMediaSession(get, options);
            document.addEventListener("keydown", keybindsHandler);
          },
          subscribe: (newListeners) => {
            listeners.add(newListeners);
            return () => listeners.delete(newListeners);
          },
          emit(event, payload) {
            listeners.forEach((l) => {
              var _a3;
              return (_a3 = l[event]) == null ? void 0 : _a3.call(l, { state: get(), ...payload });
            });
          }
        };
      })
    )
  );
};
const PlayerStoreContext = createContext(null);
function PlayerContext({ children, id, options }) {
  const [store] = useState(() => {
    return createPlayerStore(id, options);
  });
  return /* @__PURE__ */ jsx(PlayerStoreContext.Provider, { value: store, children });
}
var YoutubeCommand = /* @__PURE__ */ ((YoutubeCommand2) => {
  YoutubeCommand2["Play"] = "playVideo";
  YoutubeCommand2["Pause"] = "pauseVideo";
  YoutubeCommand2["Stop"] = "stopVideo";
  YoutubeCommand2["Seek"] = "seekTo";
  YoutubeCommand2["Cue"] = "cueVideoById";
  YoutubeCommand2["CueAndPlay"] = "loadVideoById";
  YoutubeCommand2["Mute"] = "mute";
  YoutubeCommand2["Unmute"] = "unMute";
  YoutubeCommand2["SetVolume"] = "setVolume";
  YoutubeCommand2["SetPlaybackRate"] = "setPlaybackRate";
  YoutubeCommand2["SetPlaybackQuality"] = "setPlaybackQuality";
  return YoutubeCommand2;
})(YoutubeCommand || {});
var YouTubePlayerState = /* @__PURE__ */ ((YouTubePlayerState2) => {
  YouTubePlayerState2[YouTubePlayerState2["Unstarted"] = -1] = "Unstarted";
  YouTubePlayerState2[YouTubePlayerState2["Ended"] = 0] = "Ended";
  YouTubePlayerState2[YouTubePlayerState2["Playing"] = 1] = "Playing";
  YouTubePlayerState2[YouTubePlayerState2["Paused"] = 2] = "Paused";
  YouTubePlayerState2[YouTubePlayerState2["Buffering"] = 3] = "Buffering";
  YouTubePlayerState2[YouTubePlayerState2["Cued"] = 5] = "Cued";
  return YouTubePlayerState2;
})(YouTubePlayerState || {});
const loadImage = (src, minWidth = 1) => new Promise((resolve, reject) => {
  const image = new Image();
  const handler = () => {
    delete image.onload;
    delete image.onerror;
    if (image.naturalWidth >= minWidth) {
      resolve(image);
    } else {
      reject("Could not load youtube image");
    }
  };
  Object.assign(image, { onload: handler, onerror: handler, src });
});
const posterCache = /* @__PURE__ */ new Map();
async function loadYoutubePoster(videoId) {
  if (!videoId)
    return;
  if (posterCache.has(videoId)) {
    return posterCache.get(videoId);
  }
  const posterURL = (quality) => `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
  return loadImage(posterURL("maxresdefault"), 121).catch(() => loadImage(posterURL("sddefault"), 121)).catch(() => loadImage(posterURL("hqdefault"), 121)).catch(() => {
  }).then((img) => {
    if (!img)
      return;
    const poster = img.src;
    posterCache.set(videoId, poster);
    return poster;
  });
}
function isNumber$1(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function handleYoutubeEmbedMessage(e, internalStateRef, iframeRef, store) {
  var _a2, _b2;
  const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
  const info = data.info;
  const internalState = internalStateRef.current;
  const emit = store.getState().emit;
  if (!info)
    return;
  if ((_a2 = info.videoData) == null ? void 0 : _a2.video_id) {
    internalState.videoId = info.videoData.video_id;
  }
  if ((_b2 = info.videoData) == null ? void 0 : _b2.errorCode) {
    const event = {
      code: info.videoData.errorCode,
      videoId: internalState.videoId
    };
    emit("error", { sourceEvent: event });
  }
  if (isNumber$1(info.duration) && info.duration !== internalState.duration) {
    internalState.duration = info.duration;
    emit("durationChange", { duration: internalState.duration });
  }
  if (isNumber$1(info.currentTime) && info.currentTime !== internalState.currentTime) {
    internalState.currentTime = info.currentTime;
    if (!store.getState().isSeeking) {
      emit("progress", { currentTime: internalState.currentTime });
    }
  }
  if (isNumber$1(info.currentTimeLastUpdated)) {
    internalState.lastTimeUpdate = info.currentTimeLastUpdated;
  }
  if (isNumber$1(info.playbackRate)) {
    if (internalState.playbackRate !== info.playbackRate) {
      emit("playbackRateChange", { rate: info.playbackRate });
    }
    internalState.playbackRate = info.playbackRate;
  }
  if (isNumber$1(info.videoLoadedFraction)) {
    const buffered = info.videoLoadedFraction * internalState.duration;
    if (internalState.buffered !== buffered) {
      emit("buffered", {
        seconds: info.videoLoadedFraction * internalState.duration
      });
    }
    internalState.buffered = buffered;
  }
  if (Array.isArray(info.availablePlaybackRates)) {
    emit("playbackRates", { rates: info.availablePlaybackRates });
  }
  if (isNumber$1(info.playerState)) {
    onYoutubeStateChange(info, internalStateRef, iframeRef, store);
    internalState.state = info.playerState;
  }
}
function onYoutubeStateChange(info, internalStateRef, iframeRef, store) {
  const emit = store.getState().emit;
  const state = info.playerState;
  const onCued = async () => {
    var _a2, _b2;
    if (((_a2 = info.videoData) == null ? void 0 : _a2.video_id) && !((_b2 = store.getState().cuedMedia) == null ? void 0 : _b2.poster)) {
      const url = await loadYoutubePoster(info.videoData.video_id);
      if (url) {
        store.getState().emit("posterLoaded", { url });
      }
    }
    if (!internalStateRef.current.playbackReady) {
      emit("providerReady", { el: iframeRef.current });
      internalStateRef.current.playbackReady = true;
    }
    emit("cued");
  };
  emit("youtubeStateChange", { state });
  emit("buffering", { isBuffering: state === YouTubePlayerState.Buffering });
  if (state !== YouTubePlayerState.Ended) {
    internalStateRef.current.firedPlaybackEnd = false;
  }
  switch (state) {
    case YouTubePlayerState.Unstarted:
      onCued();
      break;
    case YouTubePlayerState.Ended:
      if (!internalStateRef.current.firedPlaybackEnd) {
        emit("playbackEnd");
        internalStateRef.current.firedPlaybackEnd = true;
      }
      break;
    case YouTubePlayerState.Playing:
      onCued();
      emit("play");
      break;
    case YouTubePlayerState.Paused:
      emit("pause");
      break;
    case YouTubePlayerState.Cued:
      onCued();
      break;
  }
}
const usePlayerStore = (selector, equalityFn) => {
  const store = useContext(PlayerStoreContext);
  return useStoreWithEqualityFn(store, selector, equalityFn);
};
function usePlayerActions() {
  const store = useContext(PlayerStoreContext);
  return useMemo(() => {
    const s = store.getState();
    const overrideQueueAndPlay = async (mediaItems, queuePointer) => {
      s.stop();
      await s.overrideQueue(mediaItems, queuePointer);
      return s.play();
    };
    return {
      play: s.play,
      playNext: s.playNext,
      playPrevious: s.playPrevious,
      pause: s.pause,
      subscribe: s.subscribe,
      emit: s.emit,
      getCurrentTime: s.getCurrentTime,
      seek: s.seek,
      toggleRepeatMode: s.toggleRepeatMode,
      toggleShuffling: s.toggleShuffling,
      getState: store.getState,
      setVolume: s.setVolume,
      setMuted: s.setMuted,
      appendToQueue: s.appendToQueue,
      removeFromQueue: s.removeFromQueue,
      enterFullscreen: s.enterFullscreen,
      exitFullscreen: s.exitFullscreen,
      toggleFullscreen: s.toggleFullscreen,
      enterPip: s.enterPip,
      exitPip: s.exitPip,
      setTextTrackVisibility: s.setTextTrackVisibility,
      setCurrentTextTrack: s.setCurrentTextTrack,
      setCurrentAudioTrack: s.setCurrentAudioTrack,
      setIsSeeking: s.setIsSeeking,
      setControlsVisible: s.setControlsVisible,
      cue: s.cue,
      overrideQueueAndPlay,
      overrideQueue: s.overrideQueue,
      setPlaybackRate: s.setPlaybackRate,
      setPlaybackQuality: s.setPlaybackQuality
    };
  }, [store]);
}
function youtubeIdFromSrc(src) {
  var _a2;
  return (_a2 = src.match(/((?:\w|-){11})/)) == null ? void 0 : _a2[0];
}
const queryString = "&controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&showinfo=0";
function useYoutubeProviderSrc(loadVideoById) {
  var _a2;
  const { getState, emit } = usePlayerActions();
  const options = usePlayerStore((s) => s.options);
  const media = usePlayerStore((s) => s.cuedMedia);
  const origin = ((_a2 = options.youtube) == null ? void 0 : _a2.useCookies) ? "https://www.youtube.com" : "https://www.youtube-nocookie.com";
  const [initialVideoId, setInitialVideoId] = useState(() => {
    if ((media == null ? void 0 : media.src) && media.src !== "resolve") {
      return youtubeIdFromSrc(media.src);
    }
  });
  const updateVideoIds = useCallback(
    (src) => {
      const videoId = youtubeIdFromSrc(src);
      if (!videoId)
        return;
      setInitialVideoId((prevId) => {
        if (!prevId) {
          return videoId;
        } else {
          loadVideoById(videoId);
          return prevId;
        }
      });
    },
    [loadVideoById]
  );
  useEffect(() => {
    var _a3, _b2;
    if ((media == null ? void 0 : media.src) && media.src !== "resolve") {
      updateVideoIds(media.src);
    } else if (media) {
      emit("buffering", { isBuffering: true });
      (_b2 = (_a3 = options.youtube) == null ? void 0 : _a3.srcResolver) == null ? void 0 : _b2.call(_a3, media).then((item) => {
        var _a4;
        if ((item == null ? void 0 : item.src) && ((_a4 = getState().cuedMedia) == null ? void 0 : _a4.id) === item.id) {
          updateVideoIds(item.src);
        }
      });
    }
  }, [options, updateVideoIds, media == null ? void 0 : media.id]);
  return {
    initialVideoUrl: initialVideoId ? `${origin}/embed/${initialVideoId}?${queryString}&autoplay=${options.autoPlay ? "1" : "0"}&mute=${getState().muted ? "1" : "0"}&start=${(media == null ? void 0 : media.initialTime) ?? 0}` : void 0,
    origin
  };
}
function YoutubeProvider() {
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const iframeRef = useRef(null);
  const youtubeApi = useCallback(
    (command, arg) => {
      var _a2, _b2;
      return (_b2 = (_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) == null ? void 0 : _b2.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: arg ? [arg] : void 0
        }),
        "*"
      );
    },
    []
  );
  const loadVideoById = useCallback(
    (videoId) => {
      youtubeApi(YoutubeCommand.CueAndPlay, videoId);
    },
    [youtubeApi]
  );
  const { initialVideoUrl, origin } = useYoutubeProviderSrc(loadVideoById);
  const store = useContext(PlayerStoreContext);
  const internalStateRef = useRef({
    duration: 0,
    currentTime: 0,
    lastTimeUpdate: 0,
    playbackRate: 1,
    state: -1,
    playbackReady: false,
    buffered: 0,
    firedPlaybackEnd: false
  });
  const registerApi = useCallback(() => {
    const internalProviderApi = {
      loadVideoById
    };
    store.setState({
      providerApi: {
        play: () => {
          youtubeApi(YoutubeCommand.Play);
        },
        pause: () => {
          youtubeApi(YoutubeCommand.Pause);
        },
        stop: () => {
          youtubeApi(YoutubeCommand.Stop);
        },
        seek: (time) => {
          if (time !== internalStateRef.current.currentTime) {
            youtubeApi(YoutubeCommand.Seek, time);
          }
        },
        setVolume: (volume) => {
          youtubeApi(YoutubeCommand.SetVolume, volume);
        },
        setMuted: (muted) => {
          if (muted) {
            youtubeApi(YoutubeCommand.Mute);
          } else {
            youtubeApi(YoutubeCommand.Unmute);
          }
        },
        setPlaybackRate: (value) => {
          youtubeApi(YoutubeCommand.SetPlaybackRate, value);
        },
        setPlaybackQuality: (value) => {
          youtubeApi(YoutubeCommand.SetPlaybackQuality, value);
        },
        getCurrentTime: () => {
          return internalStateRef.current.currentTime;
        },
        getSrc: () => {
          return internalStateRef.current.videoId;
        },
        internalProviderApi
      }
    });
  }, [store, loadVideoById, youtubeApi]);
  useEffect(() => {
    addGlobalListener(window, "message", (event) => {
      var _a2;
      const e = event;
      if (e.origin === origin && e.source === ((_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow)) {
        handleYoutubeEmbedMessage(e, internalStateRef, iframeRef, store);
      }
    });
    registerApi();
    return () => {
      removeAllGlobalListeners();
    };
  }, [addGlobalListener, removeAllGlobalListeners, store, origin, registerApi]);
  if (!initialVideoUrl) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      className: "w-full h-full",
      ref: iframeRef,
      src: initialVideoUrl,
      allowFullScreen: true,
      allow: "autoplay; encrypted-media; picture-in-picture;",
      onLoad: () => {
        setTimeout(() => {
          var _a2, _b2;
          (_b2 = (_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) == null ? void 0 : _b2.postMessage(
            JSON.stringify({ event: "listening" }),
            "*"
          );
          registerApi();
        });
      }
    }
  );
}
function createRafLoop(callback) {
  let id;
  function start() {
    if (!isUndefined(id))
      return;
    loop();
  }
  function loop() {
    id = window.requestAnimationFrame(function rafLoop() {
      if (isUndefined(id))
        return;
      callback();
      loop();
    });
  }
  function stop() {
    if (isNumber(id))
      window.cancelAnimationFrame(id);
    id = void 0;
  }
  return {
    start,
    stop
  };
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function useHtmlMediaInternalState(ref) {
  const store = useContext(PlayerStoreContext);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const internalState = useRef({
    currentTime: 0,
    buffered: 0,
    isMediaWaiting: false,
    playbackReady: false,
    /**
     * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
     * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
     * resolve that by retrieving time updates in a request animation frame loop.
     */
    timeRafLoop: createRafLoop(() => {
      updateCurrentTime();
      updateBuffered();
    })
  });
  const updateBuffered = useCallback(() => {
    var _a2;
    const timeRange = (_a2 = ref.current) == null ? void 0 : _a2.buffered;
    const seconds = !timeRange || timeRange.length === 0 ? 0 : timeRange.end(timeRange.length - 1);
    if (internalState.current.buffered !== seconds) {
      store.getState().emit("buffered", { seconds });
      internalState.current.buffered = seconds;
    }
  }, [ref, store]);
  const updateCurrentTime = useCallback(() => {
    var _a2;
    const newTime = ((_a2 = ref.current) == null ? void 0 : _a2.currentTime) || 0;
    if (internalState.current.currentTime !== newTime && !store.getState().isSeeking) {
      store.getState().emit("progress", { currentTime: newTime });
      internalState.current.currentTime = newTime;
    }
  }, [internalState, store, ref]);
  const toggleTextTrackModes = useCallback(
    (newTrackId, isVisible) => {
      if (!ref.current)
        return;
      const { textTracks } = ref.current;
      if (newTrackId === -1) {
        Array.from(textTracks).forEach((track) => {
          track.mode = "disabled";
        });
      } else {
        const oldTrack = textTracks[store.getState().currentTextTrack];
        if (oldTrack)
          oldTrack.mode = "disabled";
      }
      const nextTrack = textTracks[newTrackId];
      if (nextTrack) {
        nextTrack.mode = isVisible ? "showing" : "hidden";
      }
      store.getState().emit("currentTextTrackChange", {
        trackId: !isVisible ? -1 : newTrackId
      });
      store.getState().emit("textTrackVisibilityChange", { isVisible });
    },
    [ref, store]
  );
  useEffect(() => {
    const timeRafLoop = internalState.current.timeRafLoop;
    return () => {
      timeRafLoop.stop();
    };
  }, []);
  useEffect(() => {
    var _a2;
    (_a2 = ref.current) == null ? void 0 : _a2.load();
  }, [cuedMedia == null ? void 0 : cuedMedia.src, ref]);
  return {
    ref,
    internalState,
    updateCurrentTime,
    toggleTextTrackModes,
    updateBuffered
  };
}
const defaultPlaybackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
function useHtmlMediaEvents({
  ref,
  updateCurrentTime,
  updateBuffered,
  internalState
}) {
  const store = useContext(PlayerStoreContext);
  const onTextTracksChange = useCallback(() => {
    if (!ref.current)
      return;
    const tracks = Array.from(ref.current.textTracks).filter(
      (t) => t.label && (t.kind === "subtitles" || t.kind === "captions")
    );
    let trackId = -1;
    for (let id = 0; id < tracks.length; id += 1) {
      if (tracks[id].mode === "hidden") {
        trackId = id;
      } else if (tracks[id].mode === "showing") {
        trackId = id;
        break;
      }
    }
    const isVisible = trackId !== -1 && tracks[trackId].mode === "showing";
    store.getState().emit("currentTextTrackChange", { trackId });
    store.getState().emit("textTrackVisibilityChange", { isVisible });
    store.getState().emit("textTracks", { tracks });
  }, [ref, store]);
  useEffect(() => {
    const el = ref.current;
    return () => {
      el == null ? void 0 : el.textTracks.removeEventListener("change", onTextTracksChange);
    };
  }, [ref, onTextTracksChange]);
  return useMemo(() => {
    const emit = store.getState().emit;
    return {
      // set some common props used on audio/video/hls/dash providers
      autoPlay: false,
      onContextMenu: (e) => e.preventDefault(),
      controlsList: "nodownload",
      preload: "metadata",
      "x-webkit-airplay": "allow",
      onEnded: () => {
        emit("playbackEnd");
        updateCurrentTime();
        internalState.current.timeRafLoop.stop();
      },
      onStalled: (e) => {
        if (e.currentTarget.readyState < 3) {
          emit("buffering", { isBuffering: true });
        }
      },
      onWaiting: () => {
        emit("buffering", { isBuffering: true });
      },
      onPlaying: () => {
        emit("play");
        emit("buffering", { isBuffering: false });
      },
      onPause: (e) => {
        emit("pause");
        emit("buffering", { isBuffering: false });
        internalState.current.timeRafLoop.stop();
      },
      onSuspend: () => {
        emit("buffering", { isBuffering: false });
      },
      onSeeking: () => {
        updateCurrentTime();
      },
      onSeeked: () => {
        updateCurrentTime();
      },
      onTimeUpdate: () => {
        updateCurrentTime();
      },
      onError: (e) => {
        emit("error", { sourceEvent: e });
      },
      onDurationChange: (e) => {
        updateCurrentTime();
        emit("durationChange", { duration: e.currentTarget.duration });
      },
      onRateChange: (e) => {
        emit("playbackRateChange", { rate: e.currentTarget.playbackRate });
      },
      onLoadedMetadata: (e) => {
        if (!internalState.current.playbackReady) {
          emit("providerReady", { el: e.currentTarget });
          internalState.current.playbackReady = true;
          updateBuffered();
          onTextTracksChange();
          e.currentTarget.textTracks.addEventListener("change", () => {
            onTextTracksChange();
          });
        }
        emit("cued");
        emit("playbackRates", { rates: defaultPlaybackRates });
      }
    };
  }, [
    internalState,
    store,
    updateCurrentTime,
    onTextTracksChange,
    updateBuffered
  ]);
}
function useHtmlMediaApi({
  ref,
  internalState,
  toggleTextTrackModes
}) {
  const store = useContext(PlayerStoreContext);
  return useMemo(
    () => ({
      play: async () => {
        var _a2;
        try {
          await ((_a2 = ref.current) == null ? void 0 : _a2.play());
        } catch (e) {
          store.getState().emit("error", { sourceEvent: e });
        }
        internalState.current.timeRafLoop.start();
      },
      pause: () => {
        var _a2;
        (_a2 = ref.current) == null ? void 0 : _a2.pause();
        internalState.current.timeRafLoop.stop();
      },
      stop: () => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      },
      seek: (time) => {
        if (time !== internalState.current.currentTime && ref.current) {
          ref.current.currentTime = time;
        }
      },
      setVolume: (volume) => {
        if (ref.current) {
          ref.current.volume = volume / 100;
        }
      },
      setMuted: (muted) => {
        if (ref.current) {
          ref.current.muted = muted;
        }
      },
      setPlaybackRate: (value) => {
        if (ref.current) {
          ref.current.playbackRate = value;
        }
      },
      setTextTrackVisibility: (isVisible) => {
        toggleTextTrackModes(store.getState().currentTextTrack, isVisible);
      },
      setCurrentTextTrack: (newTrackId) => {
        toggleTextTrackModes(newTrackId, store.getState().textTrackIsVisible);
      },
      getCurrentTime: () => {
        return internalState.current.currentTime;
      },
      getSrc: () => {
        var _a2;
        return (_a2 = ref.current) == null ? void 0 : _a2.src;
      }
    }),
    [ref, store, internalState, toggleTextTrackModes]
  );
}
function HtmlVideoProvider() {
  var _a2;
  const ref = useRef(null);
  const autoPlay = usePlayerStore((s) => s.options.autoPlay);
  const muted = usePlayerStore((s) => s.muted);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const store = useContext(PlayerStoreContext);
  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);
  useEffect(() => {
    store.setState({
      providerApi
    });
  }, [store, providerApi]);
  let src = cuedMedia == null ? void 0 : cuedMedia.src;
  if (src && (cuedMedia == null ? void 0 : cuedMedia.initialTime)) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }
  return /* @__PURE__ */ jsx(
    "video",
    {
      className: "w-full h-full",
      ref,
      src,
      playsInline: true,
      poster: cuedMedia == null ? void 0 : cuedMedia.poster,
      autoPlay,
      muted,
      ...events,
      children: (_a2 = cuedMedia == null ? void 0 : cuedMedia.captions) == null ? void 0 : _a2.map((caption, index) => /* @__PURE__ */ jsx(
        "track",
        {
          label: caption.label,
          kind: "subtitles",
          srcLang: caption.language || "en",
          src: caption.src,
          default: index === 0
        },
        caption.id
      ))
    }
  );
}
function HtmlAudioProvider() {
  const ref = useRef(null);
  const autoPlay = usePlayerStore((s) => s.options.autoPlay);
  const muted = usePlayerStore((s) => s.muted);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const store = useContext(PlayerStoreContext);
  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);
  useEffect(() => {
    store.setState({
      providerApi
    });
  }, [store, providerApi]);
  let src = cuedMedia == null ? void 0 : cuedMedia.src;
  if (src && (cuedMedia == null ? void 0 : cuedMedia.initialTime)) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }
  return /* @__PURE__ */ jsx(
    "audio",
    {
      className: "w-full h-full",
      ref,
      src,
      autoPlay,
      muted,
      ...events
    }
  );
}
const HlsProvider = React.lazy(
  () => import("./hls-provider-aa723e8e.mjs")
);
const DashProvider = React.lazy(
  () => import("./dash-provider-67e2c6bd.mjs")
);
const PlayerOutlet = memo(({ className }) => {
  const { getState } = useContext(PlayerStoreContext);
  useEffect(() => {
    getState().init();
    return getState().destroy;
  }, [getState]);
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(Provider, {}) });
});
function Provider() {
  const provider = usePlayerStore((s) => s.providerName);
  switch (provider) {
    case "youtube":
      return /* @__PURE__ */ jsx(YoutubeProvider, {});
    case "htmlVideo":
      return /* @__PURE__ */ jsx(HtmlVideoProvider, {});
    case "htmlAudio":
      return /* @__PURE__ */ jsx(HtmlAudioProvider, {});
    case "hls":
      return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(HlsProvider, {}) });
    case "dash":
      return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(DashProvider, {}) });
    default:
      return null;
  }
}
function PlayerPoster({
  className,
  hideDuringPlayback = true,
  fallback,
  ...domProps
}) {
  const posterUrl = usePlayerStore((s) => s.posterUrl);
  const shouldHidePoster = usePlayerStore(
    (s) => hideDuringPlayback && s.playbackStarted && s.providerName !== "htmlAudio"
  );
  if (!posterUrl && !fallback)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      className: clsx(
        "pointer-events-none flex max-h-full w-full items-center justify-center bg-black transition-opacity",
        shouldHidePoster ? "opacity-0" : "opacity-100",
        className
      ),
      children: posterUrl ? /* @__PURE__ */ jsx(
        "img",
        {
          loading: "lazy",
          src: posterUrl,
          alt: "",
          className: "max-h-full w-full flex-shrink-0 object-cover"
        }
      ) : fallback
    }
  );
}
function usePlayerClickHandler() {
  const clickRef = useRef(0);
  const player = usePlayerActions();
  const togglePlay = useCallback(() => {
    if (player.getState().isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);
  return useCallback(() => {
    if (!player.getState().providerReady)
      return;
    clickRef.current += 1;
    togglePlay();
    if (clickRef.current === 1) {
      setTimeout(() => {
        if (clickRef.current > 1) {
          player.toggleFullscreen();
        }
        clickRef.current = 0;
      }, 300);
    }
  }, [player, togglePlay]);
}
function BufferingSpinner({
  className,
  trackColor,
  fillColor,
  size
}) {
  const isActive = usePlayerStore(
    (s) => (
      // YouTube will already show a spinner, no need for a custom one
      s.isBuffering && s.providerName !== "youtube" || s.playbackStarted && !s.providerReady
    )
  );
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isActive && /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className, children: /* @__PURE__ */ jsx(
    ProgressCircle,
    {
      isIndeterminate: true,
      trackColor,
      fillColor,
      size
    }
  ) }) });
}
function useCurrentTime({ precision, disabled } = { precision: "ms", disabled: false }) {
  const timeRef = useRef(0);
  const { subscribe, getCurrentTime } = usePlayerActions();
  const providerKey = usePlayerStore(
    (s) => {
      var _a2;
      return s.providerName && ((_a2 = s.cuedMedia) == null ? void 0 : _a2.id) ? `${s.providerName}+${s.cuedMedia.id}` : null;
    }
  );
  const [currentTime, setCurrentTime] = useState(() => getCurrentTime());
  useEffect(() => {
    let unsubscribe;
    if (!disabled) {
      unsubscribe = subscribe({
        progress: ({ currentTime: currentTime2 }) => {
          const time = precision === "ms" ? currentTime2 : Math.floor(currentTime2);
          if (timeRef.current !== time) {
            setCurrentTime(time);
            timeRef.current = time;
          }
        }
      });
    }
    return () => unsubscribe == null ? void 0 : unsubscribe();
  }, [precision, subscribe, disabled]);
  useEffect(() => {
    if (providerKey) {
      setCurrentTime(getCurrentTime());
    }
  }, [providerKey, getCurrentTime]);
  return currentTime;
}
function Seekbar({
  trackColor,
  fillColor,
  className,
  onPointerMove
}) {
  const { pause, seek, setIsSeeking, play, getState } = usePlayerActions();
  const duration = usePlayerStore((s) => s.mediaDuration);
  const playerReady = usePlayerStore((s) => s.providerReady);
  const pauseWhileSeeking = usePlayerStore((s) => s.pauseWhileSeeking);
  const currentTime = useCurrentTime();
  const wasPlayingBeforeDragging = useRef(false);
  return /* @__PURE__ */ jsx(
    Slider,
    {
      fillColor,
      trackColor,
      thumbSize: "w-14 h-14",
      showThumbOnHoverOnly: true,
      className,
      width: "w-auto",
      isDisabled: !playerReady,
      value: currentTime,
      minValue: 0,
      maxValue: duration,
      onPointerMove,
      onPointerDown: () => {
        setIsSeeking(true);
        if (pauseWhileSeeking) {
          wasPlayingBeforeDragging.current = getState().isPlaying || getState().isBuffering;
          pause();
        }
      },
      onChange: (value) => {
        getState().emit("progress", { currentTime: value });
        seek(value);
      },
      onChangeEnd: () => {
        setIsSeeking(false);
        if (pauseWhileSeeking && wasPlayingBeforeDragging.current) {
          play();
          wasPlayingBeforeDragging.current = false;
        }
      }
    }
  );
}
const MediaPauseIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M8.66667 6.66667C8.29848 6.66667 8 6.96514 8 7.33333V24.6667C8 25.0349 8.29848 25.3333 8.66667 25.3333H12.6667C13.0349 25.3333 13.3333 25.0349 13.3333 24.6667V7.33333C13.3333 6.96514 13.0349 6.66667 12.6667 6.66667H8.66667Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M19.3333 6.66667C18.9651 6.66667 18.6667 6.96514 18.6667 7.33333V24.6667C18.6667 25.0349 18.9651 25.3333 19.3333 25.3333H23.3333C23.7015 25.3333 24 25.0349 24 24.6667V7.33333C24 6.96514 23.7015 6.66667 23.3333 6.66667H19.3333Z"
      },
      "1"
    )
  ],
  "MediaPause",
  "0 0 32 32"
);
function PlayButton({
  size = "md",
  iconSize = "xl",
  color,
  stopPropagation
}) {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const playerReady = usePlayerStore((s) => s.providerReady);
  const player = usePlayerActions();
  const label = isPlaying ? /* @__PURE__ */ jsx(Trans, { message: "Pause (k)" }) : /* @__PURE__ */ jsx(Trans, { message: "Play (k)" });
  return /* @__PURE__ */ jsx(Tooltip, { label, usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size,
      iconSize,
      disabled: !playerReady,
      onClick: (e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        if (isPlaying) {
          player.pause();
        } else {
          player.play();
        }
      },
      children: isPlaying ? /* @__PURE__ */ jsx(MediaPauseIcon, {}) : /* @__PURE__ */ jsx(MediaPlayIcon, {})
    }
  ) });
}
const MediaNextIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M6.39617 6.78532C5.9561 6.46017 5.33334 6.77434 5.33334 7.32151V24.6785C5.33334 25.2257 5.95612 25.5398 6.39619 25.2147L18.1415 16.5358C18.5021 16.2693 18.5021 15.7299 18.1415 15.4634L6.39617 6.78532Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M23.5339 6.6667C23.1657 6.6667 22.8672 6.96518 22.8672 7.33337V24.6667C22.8672 25.0349 23.1657 25.3334 23.5339 25.3334H25.5339C25.902 25.3334 26.2005 25.0349 26.2005 24.6667V7.33337C26.2005 6.96518 25.902 6.6667 25.5339 6.6667H23.5339Z"
      },
      "1"
    )
  ],
  "MediaNext",
  "0 0 32 32"
);
function NextButton({
  size = "md",
  iconSize,
  color,
  className,
  stopPropagation
}) {
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Next" }), usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      size,
      color,
      iconSize,
      className,
      onClick: (e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        player.playNext();
      },
      children: /* @__PURE__ */ jsx(MediaNextIcon, {})
    }
  ) });
}
const MediaMuteIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M17.5091 24.6594C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3325V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.8036C16.8863 6.47842 17.5091 6.79259 17.5091 7.33977L17.5091 24.6594Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M28.8621 13.6422C29.1225 13.3818 29.1225 12.9597 28.8621 12.6994L27.9193 11.7566C27.659 11.4962 27.2368 11.4962 26.9765 11.7566L24.7134 14.0197C24.6613 14.0717 24.5769 14.0717 24.5248 14.0197L22.262 11.7568C22.0016 11.4964 21.5795 11.4964 21.3191 11.7568L20.3763 12.6996C20.116 12.9599 20.116 13.382 20.3763 13.6424L22.6392 15.9053C22.6913 15.9573 22.6913 16.0418 22.6392 16.0938L20.3768 18.3562C20.1165 18.6166 20.1165 19.0387 20.3768 19.299L21.3196 20.2419C21.58 20.5022 22.0021 20.5022 22.2624 20.2418L24.5248 17.9795C24.5769 17.9274 24.6613 17.9274 24.7134 17.9795L26.976 20.2421C27.2363 20.5024 27.6585 20.5024 27.9188 20.2421L28.8616 19.2992C29.122 19.0389 29.122 18.6168 28.8616 18.3564L26.599 16.0938C26.547 16.0418 26.547 15.9573 26.599 15.9053L28.8621 13.6422Z"
      },
      "1"
    )
  ],
  "MediaMute",
  "0 0 32 32"
);
const MediaVolumeLowIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M17.5091 24.6594C17.5091 25.2066 16.8864 25.5207 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3324V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.80358C16.8863 6.4784 17.5091 6.79258 17.5091 7.33975L17.5091 24.6594Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M22.8424 12.6667C22.8424 12.2985 22.544 12 22.1758 12H20.8424C20.4743 12 20.1758 12.2985 20.1758 12.6667V19.3333C20.1758 19.7015 20.4743 20 20.8424 20H22.1758C22.544 20 22.8424 19.7015 22.8424 19.3333V12.6667Z"
      },
      "1"
    )
  ],
  "MediaVolumeLow",
  "0 0 32 32"
);
const MediaVolumeHighIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M17.5091 24.6595C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9992 9.36923 19.9992H4.66667C4.29848 19.9992 4 19.7007 4 19.3325V12.6658C4 12.2976 4.29848 11.9992 4.66667 11.9992H9.37115C9.39967 11.9992 9.42745 11.99 9.45039 11.9731L16.4463 6.80363C16.8863 6.47845 17.5091 6.79262 17.5091 7.3398L17.5091 24.6595Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M27.5091 9.33336C27.8773 9.33336 28.1758 9.63184 28.1758 10V22C28.1758 22.3682 27.8773 22.6667 27.5091 22.6667H26.1758C25.8076 22.6667 25.5091 22.3682 25.5091 22V10C25.5091 9.63184 25.8076 9.33336 26.1758 9.33336L27.5091 9.33336Z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M22.1758 12C22.544 12 22.8424 12.2985 22.8424 12.6667V19.3334C22.8424 19.7016 22.544 20 22.1758 20H20.8424C20.4743 20 20.1758 19.7016 20.1758 19.3334V12.6667C20.1758 12.2985 20.4743 12 20.8424 12H22.1758Z"
      },
      "2"
    )
  ],
  "MediaVolumeHigh",
  "0 0 32 32"
);
function VolumeControls({
  trackColor,
  fillColor,
  buttonColor,
  className
}) {
  const volume = usePlayerStore((s) => s.volume);
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex w-min items-center gap-4", className), children: [
    /* @__PURE__ */ jsx(ToggleMuteButton, { color: buttonColor }),
    /* @__PURE__ */ jsx(
      Slider,
      {
        isDisabled: !playerReady,
        showThumbOnHoverOnly: true,
        thumbSize: "w-14 h-14",
        trackColor,
        fillColor,
        minValue: 0,
        maxValue: 100,
        className: "flex-auto",
        width: "w-96",
        value: volume,
        onChange: (value) => {
          player.setVolume(value);
        }
      }
    )
  ] });
}
function ToggleMuteButton({
  color,
  size = "sm",
  iconSize = "md"
}) {
  const isMuted = usePlayerStore((s) => s.muted);
  const volume = usePlayerStore((s) => s.volume);
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  if (isMuted) {
    return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Unmute" }), usePortal: false, children: /* @__PURE__ */ jsx(
      IconButton,
      {
        disabled: !playerReady,
        color,
        size,
        iconSize,
        onClick: () => player.setMuted(false),
        children: /* @__PURE__ */ jsx(MediaMuteIcon, {})
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Mute" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      color,
      size,
      iconSize,
      onClick: () => player.setMuted(true),
      children: volume < 40 ? /* @__PURE__ */ jsx(MediaVolumeLowIcon, {}) : /* @__PURE__ */ jsx(MediaVolumeHighIcon, {})
    }
  ) });
}
const FormattedDuration = memo(
  ({
    minutes,
    seconds,
    ms,
    verbose = false,
    addZeroToFirstUnit = true
  }) => {
    const { trans } = useTrans();
    if (minutes) {
      ms = minutes * 6e4;
    } else if (seconds) {
      ms = seconds * 1e3;
    }
    if (!ms) {
      ms = 0;
    }
    const unsignedMs = ms < 0 ? -ms : ms;
    const parsedMS = {
      days: Math.trunc(unsignedMs / 864e5),
      hours: Math.trunc(unsignedMs / 36e5) % 24,
      minutes: Math.trunc(unsignedMs / 6e4) % 60,
      seconds: Math.trunc(unsignedMs / 1e3) % 60
    };
    let formattedValue;
    if (verbose) {
      formattedValue = formatVerbose(parsedMS, trans);
    } else {
      formattedValue = formatCompact(parsedMS, addZeroToFirstUnit);
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formattedValue });
  }
);
function formatVerbose(t, trans) {
  const output = [];
  if (t.days) {
    output.push(`${t.days}${trans(message("d"))}`);
  }
  if (t.hours) {
    output.push(`${t.hours}${trans(message("hr"))}`);
  }
  if (t.minutes) {
    output.push(`${t.minutes}${trans(message("min"))}`);
  }
  if (t.seconds && !t.hours) {
    output.push(`${t.seconds}${trans(message("sec"))}`);
  }
  return output.join(" ");
}
function formatCompact(t, addZeroToFirstUnit = true) {
  const seconds = addZero(t.seconds);
  let output = "";
  if (t.days && !output) {
    output = `${t.days}:${addZero(t.hours)}:${addZero(t.minutes)}:${seconds}`;
  }
  if (t.hours && !output) {
    output = `${addZero(t.hours, addZeroToFirstUnit)}:${addZero(
      t.minutes
    )}:${seconds}`;
  }
  if (!output) {
    output = `${addZero(t.minutes, addZeroToFirstUnit)}:${seconds}`;
  }
  return output;
}
function addZero(v, addZero2 = true) {
  if (!addZero2)
    return v;
  let value = `${v}`;
  if (value.length === 1) {
    value = "0" + value;
  }
  return value;
}
function FormattedCurrentTime({ className }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  const currentTime = useCurrentTime();
  return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
    FormattedDuration,
    {
      seconds: currentTime,
      addZeroToFirstUnit: duration >= 600
    }
  ) });
}
function FormattedPlayerDuration({ className }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
    FormattedDuration,
    {
      seconds: duration,
      addZeroToFirstUnit: duration >= 600
    }
  ) });
}
const MediaClosedCaptionsIcon = createSvgIcon(
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z"
    }
  ),
  "MediaClosedCaptions",
  "0 0 32 32"
);
const MediaClosedCaptionsOnIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M8 28.0003C8 27.6321 8.29848 27.3336 8.66667 27.3336H23.3333C23.7015 27.3336 24 27.6321 24 28.0003V29.3336C24 29.7018 23.7015 30.0003 23.3333 30.0003H8.66667C8.29848 30.0003 8 29.7018 8 29.3336V28.0003Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.66602 6.66699C4.29783 6.66699 3.99935 6.96547 3.99935 7.33366V24.667C3.99935 25.0352 4.29783 25.3337 4.66602 25.3337H27.3327C27.7009 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.7009 6.66699 27.3327 6.66699H4.66602ZM8.66659 21.3333C8.2984 21.3333 7.99992 21.0349 7.99992 20.6667V11.3333C7.99992 10.9651 8.2984 10.6667 8.66659 10.6667H13.9999C14.3681 10.6667 14.6666 10.9651 14.6666 11.3333V12.6667C14.6666 13.0349 14.3681 13.3333 13.9999 13.3333H10.7999C10.7263 13.3333 10.6666 13.393 10.6666 13.4667V18.5333C10.6666 18.607 10.7263 18.6667 10.7999 18.6667H13.9999C14.3681 18.6667 14.6666 18.9651 14.6666 19.3333V20.6667C14.6666 21.0349 14.3681 21.3333 13.9999 21.3333H8.66659ZM17.9999 21.3333C17.6317 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6317 10.6667 17.9999 10.6667H23.3333C23.7014 10.6667 23.9999 10.9651 23.9999 11.3333V12.6667C23.9999 13.0349 23.7014 13.3333 23.3333 13.3333H20.1333C20.0596 13.3333 19.9999 13.393 19.9999 13.4667V18.5333C19.9999 18.607 20.0596 18.6667 20.1333 18.6667H23.3333C23.7014 18.6667 23.9999 18.9651 23.9999 19.3333V20.6667C23.9999 21.0349 23.7014 21.3333 23.3333 21.3333H17.9999Z"
      },
      "1"
    )
  ],
  "MediaClosedCaptionsOn",
  "0 0 32 32"
);
function ToggleCaptionsButton({
  size = "md",
  iconSize,
  color,
  className
}) {
  const { trans } = useTrans();
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  const captionsVisible = usePlayerStore((s) => s.textTrackIsVisible);
  const haveCaptions = usePlayerStore((s) => !!s.textTracks.length);
  if (!haveCaptions) {
    return null;
  }
  const labelMessage = trans(
    captionsVisible ? message("Hide subtitles/captions (c)") : message("Show subtitles/captions (c)")
  );
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: labelMessage }), usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      "aria-label": labelMessage,
      size,
      color,
      iconSize,
      className,
      onClick: () => {
        player.setTextTrackVisibility(!captionsVisible);
      },
      children: captionsVisible ? /* @__PURE__ */ jsx(MediaClosedCaptionsOnIcon, {}) : /* @__PURE__ */ jsx(MediaClosedCaptionsIcon, {})
    }
  ) });
}
const ArrowRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m10 17 5-5-5-5v10z" }),
  "ArrowRightOutlined"
);
const MediaSettingsIcon = createSvgIcon(
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M13.5722 5.33333C13.2429 5.33333 12.9629 5.57382 12.9132 5.89938L12.4063 9.21916C12.4 9.26058 12.3746 9.29655 12.3378 9.31672C12.2387 9.37118 12.1409 9.42779 12.0444 9.48648C12.0086 9.5083 11.9646 9.51242 11.9255 9.49718L8.79572 8.27692C8.48896 8.15732 8.14083 8.27958 7.9762 8.56472L5.5491 12.7686C5.38444 13.0538 5.45271 13.4165 5.70981 13.6223L8.33308 15.7225C8.3658 15.7487 8.38422 15.7887 8.38331 15.8306C8.38209 15.8867 8.38148 15.9429 8.38148 15.9993C8.38148 16.0558 8.3821 16.1121 8.38332 16.1684C8.38423 16.2102 8.36582 16.2503 8.33313 16.2765L5.7103 18.3778C5.45334 18.5836 5.38515 18.9462 5.54978 19.2314L7.97688 23.4352C8.14155 23.7205 8.48981 23.8427 8.79661 23.723L11.926 22.5016C11.9651 22.4864 12.009 22.4905 12.0449 22.5123C12.1412 22.5709 12.2388 22.6274 12.3378 22.6818C12.3745 22.7019 12.4 22.7379 12.4063 22.7793L12.9132 26.0993C12.9629 26.4249 13.2429 26.6654 13.5722 26.6654H18.4264C18.7556 26.6654 19.0356 26.425 19.0854 26.0995L19.5933 22.7801C19.5997 22.7386 19.6252 22.7027 19.6619 22.6825C19.7614 22.6279 19.8596 22.5711 19.9564 22.5121C19.9923 22.4903 20.0362 22.4862 20.0754 22.5015L23.2035 23.7223C23.5103 23.842 23.8585 23.7198 24.0232 23.4346L26.4503 19.2307C26.6149 18.9456 26.5467 18.583 26.2898 18.3771L23.6679 16.2766C23.6352 16.2504 23.6168 16.2104 23.6177 16.1685C23.619 16.1122 23.6196 16.0558 23.6196 15.9993C23.6196 15.9429 23.619 15.8866 23.6177 15.8305C23.6168 15.7886 23.6353 15.7486 23.668 15.7224L26.2903 13.623C26.5474 13.4172 26.6156 13.0544 26.451 12.7692L24.0239 8.56537C23.8592 8.28023 23.5111 8.15797 23.2043 8.27757L20.0758 9.49734C20.0367 9.51258 19.9927 9.50846 19.9569 9.48664C19.8599 9.42762 19.7616 9.37071 19.6618 9.31596C19.6251 9.2958 19.5997 9.25984 19.5933 9.21843L19.0854 5.89915C19.0356 5.57369 18.7556 5.33333 18.4264 5.33333H13.5722ZM16.0001 20.2854C18.3672 20.2854 20.2862 18.3664 20.2862 15.9993C20.2862 13.6322 18.3672 11.7132 16.0001 11.7132C13.6329 11.7132 11.714 13.6322 11.714 15.9993C11.714 18.3664 13.6329 20.2854 16.0001 20.2854Z"
    }
  ),
  "MediaSettings",
  "0 0 32 32"
);
const MediaPlaybackSpeedCircleIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M13.9213 5.53573C14.3146 5.45804 14.6666 5.76987 14.6666 6.17079V7.57215C14.6666 7.89777 14.4305 8.17277 14.114 8.24925C12.5981 8.61559 11.2506 9.41368 10.2091 10.506C9.98474 10.7414 9.62903 10.8079 9.34742 10.6453L8.14112 9.94885C7.79394 9.7484 7.69985 9.28777 7.96359 8.98585C9.48505 7.24409 11.5636 6.00143 13.9213 5.53573Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M5.88974 12.5908C6.01805 12.2101 6.46491 12.0603 6.81279 12.2611L8.01201 12.9535C8.29379 13.1162 8.41396 13.4577 8.32238 13.7699C8.11252 14.4854 7.99998 15.2424 7.99998 16.0257C7.99998 16.809 8.11252 17.566 8.32238 18.2814C8.41396 18.5936 8.29378 18.9352 8.01201 19.0979L6.82742 19.7818C6.48051 19.9821 6.03488 19.8337 5.90521 19.4547C5.5345 18.3712 5.33331 17.2091 5.33331 16C5.33331 14.8078 5.5289 13.6613 5.88974 12.5908Z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M8.17106 22.0852C7.82291 22.2862 7.72949 22.7486 7.99532 23.0502C9.51387 24.773 11.5799 26.0017 13.9213 26.4642C14.3146 26.5419 14.6666 26.2301 14.6666 25.8291V24.4792C14.6666 24.1536 14.4305 23.8786 14.114 23.8021C12.5981 23.4358 11.2506 22.6377 10.2091 21.5453C9.98474 21.31 9.62903 21.2435 9.34742 21.4061L8.17106 22.0852Z"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M17.3333 25.8291C17.3333 26.2301 17.6857 26.5418 18.079 26.4641C22.9748 25.4969 26.6666 21.1796 26.6666 16C26.6666 10.8204 22.9748 6.50302 18.079 5.5358C17.6857 5.4581 17.3333 5.76987 17.3333 6.17079V7.57215C17.3333 7.89777 17.5697 8.17282 17.8862 8.24932C21.3942 9.09721 24 12.2572 24 16.0257C24 19.7942 21.3942 22.9542 17.8862 23.802C17.5697 23.8785 17.3333 24.1536 17.3333 24.4792V25.8291Z"
      },
      "3"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M14.3961 10.4163C13.9561 10.0911 13.3333 10.4053 13.3333 10.9525L13.3333 21.0474C13.3333 21.5946 13.9561 21.9087 14.3962 21.5836L21.2273 16.5359C21.5879 16.2694 21.5879 15.73 21.2273 15.4635L14.3961 10.4163Z"
      },
      "4"
    )
  ],
  "MediaPlaybackSpeedCircle",
  "0 0 32 32"
);
const MediaSettingsMenuIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M18.6669 10.4001C18.6669 10.7683 18.3684 11.0667 18.0002 11.0667H16.2668C15.8987 11.0667 15.6002 10.7683 15.6002 10.4001V9.86674C15.6002 9.7931 15.5405 9.73341 15.4669 9.73341H5.99998C5.63179 9.73341 5.33331 9.43493 5.33331 9.06674V7.33341C5.33331 6.96522 5.63179 6.66674 5.99998 6.66674H15.4669C15.5405 6.66674 15.6002 6.60704 15.6002 6.53341V6.00007C15.6002 5.63188 15.8987 5.3334 16.2668 5.3334H18.0002C18.3684 5.3334 18.6669 5.63188 18.6669 6.00007V10.4001Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M11.3334 18.8668C11.7016 18.8668 12.0001 18.5683 12.0001 18.2001V13.8001C12.0001 13.4319 11.7016 13.1335 11.3334 13.1335H9.60006C9.23187 13.1335 8.93339 13.4319 8.93339 13.8001V14.3335C8.93339 14.4071 8.8737 14.4668 8.80006 14.4668H6.00006C5.63187 14.4668 5.33339 14.7653 5.33339 15.1335V16.8668C5.33339 17.235 5.63187 17.5335 6.00006 17.5335H8.80006C8.8737 17.5335 8.93339 17.5932 8.93339 17.6668V18.2001C8.93339 18.5683 9.23187 18.8668 9.60006 18.8668H11.3334Z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M18.6667 26.0001C18.6667 26.3683 18.3682 26.6668 18 26.6668H16.2667C15.8985 26.6668 15.6 26.3683 15.6 26.0001V25.4668C15.6 25.3931 15.5403 25.3334 15.4667 25.3334H6.00014C5.63195 25.3334 5.33348 25.0349 5.33348 24.6668V22.9334C5.33348 22.5652 5.63195 22.2668 6.00014 22.2668H15.4667C15.5403 22.2668 15.6 22.2071 15.6 22.1334V21.6001C15.6 21.2319 15.8985 20.9334 16.2667 20.9334H18C18.3682 20.9334 18.6667 21.2319 18.6667 21.6001V26.0001Z"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M22 24.6668C22 25.0349 22.2985 25.3334 22.6667 25.3334H26.0001C26.3683 25.3334 26.6668 25.0349 26.6668 24.6668V22.9334C26.6668 22.5652 26.3683 22.2668 26.0001 22.2668H22.6667C22.2985 22.2668 22 22.5652 22 22.9334V24.6668Z"
      },
      "3"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M16.0001 17.5335C15.6319 17.5335 15.3334 17.235 15.3334 16.8668V15.1335C15.3334 14.7653 15.6319 14.4668 16.0001 14.4668H26.0001C26.3683 14.4668 26.6667 14.7653 26.6667 15.1335V16.8668C26.6667 17.235 26.3683 17.5335 26.0001 17.5335H16.0001Z"
      },
      "4"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M22.0002 9.06674C22.0002 9.43493 22.2987 9.73341 22.6669 9.73341H26C26.3682 9.73341 26.6666 9.43493 26.6666 9.06674V7.3334C26.6666 6.96521 26.3682 6.66674 26 6.66674H22.6669C22.2987 6.66674 22.0002 6.96522 22.0002 7.33341V9.06674Z"
      },
      "5"
    )
  ],
  "MediaSettingsMenu",
  "0 0 32 32"
);
const MediaArrowLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M13.0908 14.3334C12.972 14.3334 12.9125 14.1898 12.9965 14.1058L17.7021 9.40022C17.9625 9.13987 17.9625 8.71776 17.7021 8.45741L16.2879 7.04319C16.0275 6.78284 15.6054 6.78284 15.3451 7.04319L6.8598 15.5285C6.59945 15.7888 6.59945 16.2109 6.8598 16.4713L8.27401 17.8855L8.27536 17.8868L15.3453 24.9568C15.6057 25.2172 16.0278 25.2172 16.2881 24.9568L17.7024 23.5426C17.9627 23.2822 17.9627 22.8601 17.7024 22.5998L12.9969 17.8944C12.9129 17.8104 12.9724 17.6668 13.0912 17.6668L26 17.6668C26.3682 17.6668 26.6667 17.3683 26.6667 17.0001V15.0001C26.6667 14.6319 26.3682 14.3334 26 14.3334L13.0908 14.3334Z" }),
  "MediaArrowLeft",
  "0 0 32 32"
);
const MediaLanguageIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M4 7.38854C4 7.3149 4.0597 7.2552 4.13333 7.2552H10.1792C10.2528 7.2552 10.3125 7.19551 10.3125 7.12187V5.46666C10.3125 5.39302 10.3722 5.33333 10.4458 5.33333H12.726C12.7997 5.33333 12.8594 5.39302 12.8594 5.46666V7.12187C12.8594 7.19551 12.9191 7.2552 12.9927 7.2552H19.0333C19.107 7.2552 19.1667 7.3149 19.1667 7.38854V9.66354C19.1667 9.73717 19.107 9.79687 19.0333 9.79687H16.7106C16.6533 9.79687 16.6021 9.83433 16.5838 9.88869C15.4447 13.2641 14.1144 15.1953 13.5156 16.0573C13.4808 16.113 15.1333 17.5629 15.4974 17.8813C15.5402 17.9187 15.5534 17.9781 15.5321 18.0308L14.6529 20.2077C14.622 20.2843 14.5295 20.3146 14.4597 20.2703C13.5546 19.6951 12.8558 19.0727 11.9724 18.1584C11.9193 18.1036 11.8302 18.1049 11.7777 18.1603C9.69726 20.3578 8.60797 21.1142 6.80933 22.179C6.7475 22.2156 6.66731 22.1967 6.62871 22.1361L5.43696 20.2647C5.39711 20.2021 5.41633 20.1189 5.47911 20.0794C7.36746 18.8903 8.68502 17.6997 10.1302 16.1862C10.1752 16.139 10.1792 16.0655 10.14 16.0134C8.91005 14.3765 8.20369 13.2435 7.313 11.3664C7.28331 11.3039 7.30645 11.2285 7.36636 11.1938L9.32729 10.0573C9.39495 10.0181 9.48168 10.0453 9.51522 10.116C10.2082 11.5756 10.9182 12.7663 11.7071 13.8661C11.7622 13.9428 11.8775 13.9384 11.9269 13.8579C12.7208 12.5654 13.2411 11.5051 13.8451 9.97878C13.8797 9.89149 13.8153 9.79687 13.7214 9.79687H4V7.38854Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.8316 26.6665C17.1181 26.6665 17.3726 26.4835 17.4637 26.2119L18.4836 23.1708C18.5018 23.1165 18.5527 23.0799 18.61 23.0799H23.8867C23.9439 23.0799 23.9948 23.1165 24.0131 23.1708L25.035 26.2122C25.1262 26.4837 25.3805 26.6665 25.6669 26.6665H27.0582C27.5181 26.6665 27.8398 26.2119 27.687 25.7782L23.0292 12.5661C22.9352 12.2994 22.6832 12.1211 22.4004 12.1211H20.0915C19.8087 12.1211 19.5566 12.2996 19.4627 12.5664L14.8113 25.7785C14.6587 26.2122 14.9804 26.6665 15.4402 26.6665H16.8316ZM23.0859 20.9634C23.1771 20.9634 23.2414 20.874 23.2123 20.7876L21.3208 15.1579C21.31 15.1257 21.2798 15.104 21.2459 15.104C21.2119 15.104 21.1818 15.1257 21.171 15.1579L19.2829 20.7877C19.2539 20.8741 19.3182 20.9634 19.4093 20.9634H23.0859Z"
      },
      "1"
    )
  ],
  "MediaLanguage",
  "0 0 32 32"
);
const Panels = {
  rate: PlaybackRatePanel,
  quality: PlaybackQualityPanel,
  options: OptionsListPanel,
  captions: CaptionsPanel,
  language: LanguagePanel
};
function PlaybackOptionsButton({
  color,
  size,
  iconSize,
  className
}) {
  const darkThemeVars = useDarkThemeVariables();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      mobileType: "tray",
      placement: "top-end",
      usePortal: !!isMobile,
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            color,
            size,
            iconSize,
            className,
            children: /* @__PURE__ */ jsx(MediaSettingsIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(Dialog, { size: "w-256", style: darkThemeVars, children: /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(PlaybackOptionsPanel, {}) }) })
      ]
    }
  );
}
function PlaybackOptionsPanel() {
  const [activePanel, setActivePanel] = useState("options");
  const PanelComponent = Panels[activePanel];
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
    PanelComponent,
    {
      activePanel,
      onActivePanelChange: setActivePanel
    }
  ) });
}
function OptionsListPanel({ onActivePanelChange }) {
  const activeRate = usePlayerStore((s) => s.playbackRate);
  const availableQualities = usePlayerStore((s) => s.playbackQualities);
  const activeQuality = usePlayerStore((s) => s.playbackQuality);
  const availableTextTracks = usePlayerStore((s) => s.textTracks);
  const textTrackId = usePlayerStore((s) => s.currentTextTrack);
  const currentTextTrack = availableTextTracks[textTrackId];
  const availableAudioTracks = usePlayerStore((s) => s.audioTracks);
  const audioTrackId = usePlayerStore((s) => s.currentAudioTrack);
  const currentAudioTrack = availableAudioTracks[audioTrackId];
  return /* @__PURE__ */ jsx(
    m.div,
    {
      initial: { x: "-100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
      transition: { type: "tween", duration: 0.14 },
      children: /* @__PURE__ */ jsxs(List, { children: [
        /* @__PURE__ */ jsx(
          ListItem,
          {
            startIcon: /* @__PURE__ */ jsx(MediaPlaybackSpeedCircleIcon, {}),
            endSection: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              activeRate,
              "x",
              /* @__PURE__ */ jsx(ArrowRightIcon, { size: "sm" })
            ] }),
            onSelected: () => onActivePanelChange("rate"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Speed" })
          }
        ),
        /* @__PURE__ */ jsx(
          ListItem,
          {
            isDisabled: !availableQualities.length,
            startIcon: /* @__PURE__ */ jsx(MediaSettingsMenuIcon, {}),
            endSection: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 capitalize", children: [
              activeQuality ? activeQuality : /* @__PURE__ */ jsx(Trans, { message: "Auto" }),
              /* @__PURE__ */ jsx(ArrowRightIcon, { size: "sm" })
            ] }),
            onSelected: () => onActivePanelChange("quality"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Quality" })
          }
        ),
        /* @__PURE__ */ jsx(
          ListItem,
          {
            isDisabled: !availableTextTracks.length,
            startIcon: /* @__PURE__ */ jsx(MediaClosedCaptionsIcon, {}),
            endSection: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 capitalize", children: [
              currentTextTrack ? currentTextTrack.label : /* @__PURE__ */ jsx(Trans, { message: "None" }),
              /* @__PURE__ */ jsx(ArrowRightIcon, { size: "sm" })
            ] }),
            onSelected: () => onActivePanelChange("captions"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Subtitles/CC" })
          }
        ),
        availableAudioTracks.length > 1 && /* @__PURE__ */ jsx(
          ListItem,
          {
            startIcon: /* @__PURE__ */ jsx(MediaLanguageIcon, {}),
            endSection: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 capitalize", children: [
              currentAudioTrack ? currentAudioTrack.label : /* @__PURE__ */ jsx(Trans, { message: "None" }),
              /* @__PURE__ */ jsx(ArrowRightIcon, { size: "sm" })
            ] }),
            onSelected: () => onActivePanelChange("language"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Language" })
          }
        )
      ] })
    }
  );
}
function PlaybackRatePanel({
  activePanel,
  onActivePanelChange
}) {
  const activeRate = usePlayerStore((s) => s.playbackRate);
  const availableRates = usePlayerStore((s) => s.playbackRates);
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    PanelLayout,
    {
      activePanel,
      onActivePanelChange,
      title: /* @__PURE__ */ jsx(Trans, { message: "Playback speed" }),
      children: /* @__PURE__ */ jsx(List, { children: availableRates.map((rate) => /* @__PURE__ */ jsxs(
        ListItem,
        {
          showCheckmark: true,
          isSelected: activeRate === rate,
          onSelected: () => {
            player.setPlaybackRate(rate);
            onActivePanelChange("options");
          },
          children: [
            rate,
            "x"
          ]
        },
        rate
      )) })
    }
  );
}
function PlaybackQualityPanel({
  activePanel,
  onActivePanelChange
}) {
  const activeQuality = usePlayerStore((s) => s.playbackQuality);
  const availableQualities = usePlayerStore((s) => s.playbackQualities);
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    PanelLayout,
    {
      activePanel,
      onActivePanelChange,
      title: /* @__PURE__ */ jsx(Trans, { message: "Playback quality" }),
      children: /* @__PURE__ */ jsx(List, { children: availableQualities.map((quality) => /* @__PURE__ */ jsx(
        ListItem,
        {
          capitalizeFirst: true,
          showCheckmark: true,
          isSelected: activeQuality === quality,
          onSelected: () => {
            player.setPlaybackQuality(quality);
            onActivePanelChange("options");
          },
          children: quality
        },
        quality
      )) })
    }
  );
}
function CaptionsPanel({ activePanel, onActivePanelChange }) {
  const currentTextTrack = usePlayerStore((s) => s.currentTextTrack);
  const textTracks = usePlayerStore((s) => s.textTracks);
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    PanelLayout,
    {
      activePanel,
      onActivePanelChange,
      title: /* @__PURE__ */ jsx(Trans, { message: "Subtitles/Captions" }),
      children: /* @__PURE__ */ jsxs(List, { children: [
        /* @__PURE__ */ jsx(
          ListItem,
          {
            showCheckmark: true,
            isSelected: currentTextTrack === -1,
            onSelected: () => {
              player.setCurrentTextTrack(-1);
              onActivePanelChange("options");
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Off" })
          },
          "off"
        ),
        textTracks.map((track, index) => /* @__PURE__ */ jsx(
          ListItem,
          {
            showCheckmark: true,
            isSelected: currentTextTrack === index,
            onSelected: () => {
              player.setCurrentTextTrack(index);
              onActivePanelChange("options");
            },
            children: track.label
          },
          index
        ))
      ] })
    }
  );
}
function LanguagePanel({ activePanel, onActivePanelChange }) {
  const currentAudioTrack = usePlayerStore((s) => s.currentAudioTrack);
  const audioTracks = usePlayerStore((s) => s.audioTracks);
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    PanelLayout,
    {
      activePanel,
      onActivePanelChange,
      title: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
      children: /* @__PURE__ */ jsx(List, { children: audioTracks.map((track, index) => /* @__PURE__ */ jsx(
        ListItem,
        {
          showCheckmark: true,
          isSelected: currentAudioTrack === index,
          onSelected: () => {
            player.setCurrentAudioTrack(index);
            onActivePanelChange("options");
          },
          children: track.label
        },
        index
      )) })
    }
  );
}
function PanelLayout({ onActivePanelChange, children, title }) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
      transition: { type: "tween", duration: 0.14 },
      children: [
        /* @__PURE__ */ jsx("div", { className: "border-b p-10", children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full",
            color: "white",
            justify: "justify-start",
            startIcon: /* @__PURE__ */ jsx(MediaArrowLeftIcon, {}),
            onClick: () => onActivePanelChange("options"),
            children: title
          }
        ) }),
        children
      ]
    }
  );
}
const MediaFullscreenExitIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M19.3334 13.3333C18.9652 13.3333 18.6667 13.0349 18.6667 12.6667L18.6667 7.33333C18.6667 6.96514 18.9652 6.66666 19.3334 6.66666H21.3334C21.7015 6.66666 22 6.96514 22 7.33333V9.86666C22 9.9403 22.0597 10 22.1334 10L24.6667 10C25.0349 10 25.3334 10.2985 25.3334 10.6667V12.6667C25.3334 13.0349 25.0349 13.3333 24.6667 13.3333L19.3334 13.3333Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M13.3334 19.3333C13.3334 18.9651 13.0349 18.6667 12.6667 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V21.3333C6.66669 21.7015 6.96516 22 7.33335 22H9.86669C9.94032 22 10 22.0597 10 22.1333L10 24.6667C10 25.0349 10.2985 25.3333 10.6667 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667L13.3334 19.3333Z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M18.6667 24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333H21.3334C21.7015 25.3333 22 25.0349 22 24.6667V22.1333C22 22.0597 22.0597 22 22.1334 22H24.6667C25.0349 22 25.3334 21.7015 25.3334 21.3333V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667L19.3334 18.6667C18.9652 18.6667 18.6667 18.9651 18.6667 19.3333L18.6667 24.6667Z"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M10.6667 13.3333H12.6667C13.0349 13.3333 13.3334 13.0349 13.3334 12.6667L13.3334 10.6667V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H10.6667C10.2985 6.66666 10 6.96514 10 7.33333L10 9.86666C10 9.9403 9.94033 10 9.86669 10L7.33335 10C6.96516 10 6.66669 10.2985 6.66669 10.6667V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333L10.6667 13.3333Z"
      },
      "3"
    )
  ],
  "MediaFullscreenExit",
  "0 0 32 32"
);
const MediaFullscreenIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M25.3299 7.26517C25.2958 6.929 25.0119 6.66666 24.6667 6.66666H19.3334C18.9652 6.66666 18.6667 6.96514 18.6667 7.33333V9.33333C18.6667 9.70152 18.9652 10 19.3334 10L21.8667 10C21.9403 10 22 10.0597 22 10.1333V12.6667C22 13.0349 22.2985 13.3333 22.6667 13.3333H24.6667C25.0349 13.3333 25.3334 13.0349 25.3334 12.6667V7.33333C25.3334 7.31032 25.3322 7.28758 25.3299 7.26517Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M22 21.8667C22 21.9403 21.9403 22 21.8667 22L19.3334 22C18.9652 22 18.6667 22.2985 18.6667 22.6667V24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333L24.6667 25.3333C25.0349 25.3333 25.3334 25.0349 25.3334 24.6667V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667H22.6667C22.2985 18.6667 22 18.9651 22 19.3333V21.8667Z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M12.6667 22H10.1334C10.0597 22 10 21.9403 10 21.8667V19.3333C10 18.9651 9.70154 18.6667 9.33335 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V24.6667C6.66669 25.0349 6.96516 25.3333 7.33335 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667V22.6667C13.3334 22.2985 13.0349 22 12.6667 22Z"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M10 12.6667V10.1333C10 10.0597 10.0597 10 10.1334 10L12.6667 10C13.0349 10 13.3334 9.70152 13.3334 9.33333V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H7.33335C6.96516 6.66666 6.66669 6.96514 6.66669 7.33333V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333H9.33335C9.70154 13.3333 10 13.0349 10 12.6667Z"
      },
      "3"
    )
  ],
  "MediaFullscreen",
  "0 0 32 32"
);
function FullscreenButton({
  size = "md",
  iconSize,
  color,
  className
}) {
  const { trans } = useTrans();
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  const isFullscreen = usePlayerStore((s) => s.isFullscreen);
  const canFullscreen = usePlayerStore((s) => s.canFullscreen);
  if (!canFullscreen) {
    return null;
  }
  const labelMessage = trans(
    isFullscreen ? message("Exit fullscreen (f)") : message("Enter fullscreen (f)")
  );
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: labelMessage }), usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      "aria-label": labelMessage,
      size,
      color,
      iconSize,
      className,
      onClick: () => {
        if (isFullscreen) {
          player.exitFullscreen();
        } else {
          player.enterFullscreen();
        }
      },
      children: isFullscreen ? /* @__PURE__ */ jsx(MediaFullscreenExitIcon, {}) : /* @__PURE__ */ jsx(MediaFullscreenIcon, {})
    }
  ) });
}
const MediaPictureInPictureExitIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M5.33334 26V19.4667C5.33334 19.393 5.39304 19.3333 5.46668 19.3333H7.86668C7.94031 19.3333 8.00001 19.393 8.00001 19.4667V23.3333C8.00001 23.7015 8.29849 24 8.66668 24H23.3333C23.7015 24 24 23.7015 24 23.3333V8.66666C24 8.29847 23.7015 7.99999 23.3333 7.99999H19.4667C19.393 7.99999 19.3333 7.9403 19.3333 7.86666V5.46666C19.3333 5.39302 19.393 5.33333 19.4667 5.33333H26C26.3682 5.33333 26.6667 5.63181 26.6667 5.99999V26C26.6667 26.3682 26.3682 26.6667 26 26.6667H6.00001C5.63182 26.6667 5.33334 26.3682 5.33334 26Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M14.0098 8.42359H10.806C10.6872 8.42359 10.6277 8.56721 10.7117 8.6512L16.5491 14.4886C16.8094 14.7489 16.8094 15.171 16.5491 15.4314L15.3234 16.657C15.0631 16.9174 14.641 16.9174 14.3806 16.657L8.63739 10.9138C8.55339 10.8298 8.40978 10.8893 8.40978 11.0081V14.0236C8.40978 14.3918 8.1113 14.6903 7.74311 14.6903H6.00978C5.64159 14.6903 5.34311 14.3918 5.34311 14.0236L5.34311 6.02359C5.34311 5.6554 5.64159 5.35692 6.00978 5.35692L14.0098 5.35692C14.378 5.35692 14.6764 5.6554 14.6764 6.02359V7.75692C14.6764 8.12511 14.378 8.42359 14.0098 8.42359Z"
      },
      "1"
    )
  ],
  "MediaPictureInPictureExit",
  "0 0 32 32"
);
const MediaPictureInPictureIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M16 15.3333C15.6318 15.3333 15.3333 15.6318 15.3333 16V20C15.3333 20.3682 15.6318 20.6667 16 20.6667H21.3333C21.7015 20.6667 22 20.3682 22 20V16C22 15.6318 21.7015 15.3333 21.3333 15.3333H16Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.33333 7.33334C5.33333 6.96515 5.63181 6.66667 5.99999 6.66667H26C26.3682 6.66667 26.6667 6.96515 26.6667 7.33334V24.6667C26.6667 25.0349 26.3682 25.3333 26 25.3333H5.99999C5.63181 25.3333 5.33333 25.0349 5.33333 24.6667V7.33334ZM7.99999 10C7.99999 9.63182 8.29847 9.33334 8.66666 9.33334H23.3333C23.7015 9.33334 24 9.63182 24 10V22C24 22.3682 23.7015 22.6667 23.3333 22.6667H8.66666C8.29847 22.6667 7.99999 22.3682 7.99999 22V10Z"
      },
      "1"
    )
  ],
  "MediaPictureInPicture",
  "0 0 32 32"
);
function PipButton({ size = "md", iconSize, color, className }) {
  const { trans } = useTrans();
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  const isPip = usePlayerStore((s) => s.isPip);
  const canPip = usePlayerStore((s) => s.canPip);
  if (!canPip) {
    return null;
  }
  const labelMessage = trans(
    isPip ? message("Exit picture-in-picture (p)") : message("Enter picture-in-picture (p)")
  );
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: labelMessage }), usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      "aria-label": labelMessage,
      size,
      color,
      iconSize,
      className,
      onClick: () => {
        if (isPip) {
          player.exitPip();
        } else {
          player.enterPip();
        }
      },
      children: isPip ? /* @__PURE__ */ jsx(MediaPictureInPictureExitIcon, {}) : /* @__PURE__ */ jsx(MediaPictureInPictureIcon, {})
    }
  ) });
}
function VideoPlayerControls(props) {
  const isMobile = useIsMobileMediaQuery();
  const controlsVisible = usePlayerStore((s) => s.controlsVisible);
  const className = clsx(
    "player-bottom-text-shadow absolute z-40 text-white/87 transition-opacity duration-300",
    controlsVisible ? "opacity-100" : "opacity-0"
  );
  return isMobile ? /* @__PURE__ */ jsx(MobileControls, { className, ...props }) : /* @__PURE__ */ jsx(DesktopControls, { className, ...props });
}
function DesktopControls({
  onPointerEnter,
  onPointerLeave,
  rightActions,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onPointerEnter,
      onPointerLeave,
      onClick: (e) => e.stopPropagation(),
      className: clsx("bottom-0 left-0 right-0 p-8", className),
      children: [
        /* @__PURE__ */ jsx(Seekbar, { trackColor: "bg-white/40" }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-4", children: [
          /* @__PURE__ */ jsx(PlayButton, { color: "white" }),
          /* @__PURE__ */ jsx(NextButton, { color: "white" }),
          /* @__PURE__ */ jsx(
            VolumeControls,
            {
              className: "max-md:hidden",
              fillColor: "bg-white",
              trackColor: "bg-white/20",
              buttonColor: "white"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "ml-10 text-sm", children: [
            /* @__PURE__ */ jsx(FormattedCurrentTime, { className: "min-w-40 text-right" }),
            " /",
            " ",
            /* @__PURE__ */ jsx(FormattedPlayerDuration, { className: "min-w-40 text-right" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-shrink-0 items-center gap-4", children: [
            rightActions,
            /* @__PURE__ */ jsx(ToggleCaptionsButton, { color: "white" }),
            /* @__PURE__ */ jsx(PlaybackOptionsButton, { color: "white" }),
            /* @__PURE__ */ jsx(FullscreenButton, { className: "ml-auto", color: "white" }),
            /* @__PURE__ */ jsx(PipButton, { color: "white" })
          ] })
        ] })
      ]
    }
  );
}
function MobileControls({
  rightActions,
  onPointerEnter,
  onPointerLeave,
  className
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onPointerEnter,
        onPointerLeave,
        onClick: (e) => e.stopPropagation(),
        className: clsx("left-0 right-0 top-0 px-6 pt-6 ", className),
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-end", children: [
          rightActions,
          /* @__PURE__ */ jsx(ToggleCaptionsButton, { color: "white" }),
          /* @__PURE__ */ jsx(PlaybackOptionsButton, { color: "white" }),
          /* @__PURE__ */ jsx(PipButton, { color: "white" }),
          /* @__PURE__ */ jsx(ToggleMuteButton, { color: "white", size: "md" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        onPointerEnter,
        onPointerLeave,
        onClick: (e) => e.stopPropagation(),
        className: clsx("bottom-0 left-0 right-0 px-12", className),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx(FormattedCurrentTime, { className: "min-w-40 text-right" }),
              " /",
              " ",
              /* @__PURE__ */ jsx(FormattedPlayerDuration, { className: "min-w-40 text-right" })
            ] }),
            /* @__PURE__ */ jsx(
              FullscreenButton,
              {
                size: "sm",
                iconSize: "lg",
                color: "white",
                className: "ml-auto"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Seekbar, { trackColor: "bg-white/40" })
        ]
      }
    )
  ] });
}
function VideoPlayer({
  id,
  queue,
  cuedMediaId,
  autoPlay,
  src,
  listeners,
  onBeforePlayPrevious,
  onBeforePlayNext,
  onDestroy,
  apiRef,
  rightActions
}) {
  return /* @__PURE__ */ jsxs(
    PlayerContext,
    {
      id,
      options: {
        autoPlay,
        listeners,
        onDestroy,
        onBeforePlayNext,
        onBeforePlayPrevious,
        initialData: {
          queue: queue ? queue : [mediaItemFromSrc(src)],
          cuedMediaId
        }
      },
      children: [
        /* @__PURE__ */ jsx(QueueOverrider, { src, queue }),
        /* @__PURE__ */ jsx(PlayerLayout, { apiRef, rightActions })
      ]
    }
  );
}
function PlayerLayout({ apiRef, rightActions }) {
  const leaveTimerRef = useRef();
  const inactiveTimerRef = useRef();
  const pointerIsOverControls = useRef(false);
  const actions = usePlayerActions();
  const controlsVisible = usePlayerStore((s) => s.controlsVisible);
  const { setControlsVisible, getState } = actions;
  const clickHandler = usePlayerClickHandler();
  const clearTimers = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);
      inactiveTimerRef.current = null;
    }
  };
  const startInactiveTimer = useCallback(() => {
    if (getState().isPlaying) {
      inactiveTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3500);
    }
  }, [getState, setControlsVisible]);
  useEffect(() => {
    const listener = () => {
      clearTimers();
      setControlsVisible(true);
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [setControlsVisible]);
  useEffect(() => {
    if (apiRef) {
      apiRef.current = actions;
      return actions.subscribe({
        play: () => startInactiveTimer()
      });
    }
  }, [apiRef, actions, setControlsVisible, startInactiveTimer]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "fullscreen-host relative isolate aspect-video bg-black",
        !controlsVisible && "cursor-none"
      ),
      onClick: clickHandler,
      onPointerEnter: () => {
        setControlsVisible(true);
        clearTimers();
      },
      onPointerMove: () => {
        if (pointerIsOverControls.current && controlsVisible) {
          return;
        }
        if (inactiveTimerRef.current) {
          setControlsVisible(true);
        }
        clearTimers();
        startInactiveTimer();
      },
      onPointerLeave: () => {
        clearTimers();
        if (!getState().isPlaying) {
          return;
        }
        leaveTimerRef.current = window.setTimeout(() => {
          setControlsVisible(false);
        }, 2500);
      },
      children: [
        /* @__PURE__ */ jsx(PlayerOutlet, { className: "z-50 h-full w-full" }),
        /* @__PURE__ */ jsx(Blocker, {}),
        /* @__PURE__ */ jsx(PlayerPoster, { className: "absolute inset-0 z-30" }),
        /* @__PURE__ */ jsx(OverlayButtons, {}),
        /* @__PURE__ */ jsx(
          BufferingSpinner,
          {
            className: "spinner pointer-events-none absolute inset-0 z-40 m-auto h-50 w-50",
            fillColor: "border-white",
            trackColor: "border-white/30",
            size: "w-50 h-50"
          }
        ),
        /* @__PURE__ */ jsx(BottomGradient, {}),
        /* @__PURE__ */ jsx(
          VideoPlayerControls,
          {
            rightActions,
            onPointerEnter: () => {
              pointerIsOverControls.current = true;
              setControlsVisible(true);
              clearTimers();
            },
            onPointerLeave: () => {
              pointerIsOverControls.current = false;
            }
          }
        )
      ]
    }
  );
}
function OverlayButtons() {
  const showPlayButton = usePlayerStore((s) => !s.isPlaying && !s.isSeeking);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center transition-opacity",
        showPlayButton ? "opacity-100" : "pointer-events-none opacity-0"
      ),
      children: /* @__PURE__ */ jsx(
        IconButton,
        {
          color: "primary",
          variant: "raised",
          size: "lg",
          radius: "rounded-full",
          children: /* @__PURE__ */ jsx(MediaPlayIcon, {})
        }
      )
    }
  );
}
function Blocker() {
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-20" });
}
function BottomGradient() {
  const controlsVisible = usePlayerStore((s) => s.controlsVisible);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "player-bottom-gradient pointer-events-none absolute bottom-0 z-30 h-full w-full transition-opacity duration-300",
        controlsVisible ? "opacity-100" : "opacity-0"
      )
    }
  );
}
function mediaItemFromSrc(src) {
  return {
    id: src,
    src,
    provider: guessPlayerProvider(src)
  };
}
function QueueOverrider({ src, queue }) {
  const { getState, overrideQueue } = usePlayerActions();
  const queueKey = (queue == null ? void 0 : queue.map((item) => item.id).join("-")) ?? "";
  const previousKey = usePrevious(queueKey);
  useEffect(() => {
    if (queue && previousKey && queueKey && previousKey !== queueKey) {
      overrideQueue(queue);
    }
  }, [queueKey, previousKey, queue, overrideQueue]);
  useEffect(() => {
    var _a2;
    if (src && ((_a2 = getState().cuedMedia) == null ? void 0 : _a2.src) !== src) {
      overrideQueue([mediaItemFromSrc(src)]);
    }
  }, [src, getState, overrideQueue]);
  return null;
}
function TitleBackdrop({
  src: initialSrc,
  title,
  episode,
  className,
  size,
  srcSize,
  lazy = true,
  wrapWithLink = false,
  showPlayButton,
  wrapperClassName
}) {
  const { trans } = useTrans();
  const primaryVideo = (episode == null ? void 0 : episode.primary_video) || (title == null ? void 0 : title.primary_video);
  if (!primaryVideo) {
    showPlayButton = false;
  }
  if (!initialSrc && episode) {
    initialSrc = episode == null ? void 0 : episode.poster;
  }
  if (!initialSrc && title) {
    initialSrc = title.backdrop;
  }
  const src = useImageSrc(initialSrc, { size: srcSize });
  const item = episode || title;
  const srcset = useImageSrcSet(initialSrc);
  const imageClassName = clsx(
    className,
    size,
    "aspect-video bg-fg-base/4 object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  let img = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      draggable: false,
      decoding: "async",
      sizes: !srcSize ? `100vw` : void 0,
      loading: lazy ? "lazy" : "eager",
      src,
      srcSet: !srcSize ? srcset : void 0,
      alt: item ? trans(
        message("Backdrop for :name", {
          values: { name: item.name }
        })
      ) : ""
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(MovieIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  const playButton = showPlayButton ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-14 left-14", children: /* @__PURE__ */ jsx(
    IconButton,
    {
      color: "white",
      variant: "flat",
      className: "shadow-md",
      radius: "rounded-full",
      elementType: Link,
      to: getWatchLink(primaryVideo),
      "aria-label": "Play",
      children: /* @__PURE__ */ jsx(MediaPlayIcon, {})
    }
  ) }) : null;
  if (wrapWithLink) {
    if (episode) {
      img = /* @__PURE__ */ jsx(
        EpisodeLink,
        {
          episode,
          title,
          seasonNumber: episode.season_number,
          displayContents: true,
          children: img
        }
      );
    } else if (title) {
      img = /* @__PURE__ */ jsx(TitleLink, { title, displayContents: true, children: img });
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx("group relative flex-shrink-0", wrapperClassName), children: [
    img,
    playButton,
    wrapWithLink && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" })
  ] });
}
function VideoThumbnail({
  video,
  isLazy,
  title,
  episode,
  srcSize,
  size = "w-full max-h-full",
  fallback,
  forceTitleBackdrop = false
}) {
  const [thumbnailUrl, setThumbnailUrl] = useState(
    video.thumbnail
  );
  useEffect(() => {
    if (!video.thumbnail && !forceTitleBackdrop && video.src.includes("youtube")) {
      const youtubeId = youtubeIdFromSrc(video.src);
      if (youtubeId) {
        loadYoutubePoster(youtubeId).then((url) => {
          if (url) {
            setThumbnailUrl(url);
          }
        });
      }
    }
  }, [video.src, video.thumbnail, forceTitleBackdrop]);
  if (forceTitleBackdrop || !thumbnailUrl) {
    if (title) {
      return /* @__PURE__ */ jsx(
        TitleBackdropFallback,
        {
          title,
          episode,
          srcSize,
          size
        }
      );
    }
    if (fallback) {
      return fallback;
    }
    return /* @__PURE__ */ jsx(VideoPlayerSkeleton, { animate: false });
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      loading: isLazy ? "lazy" : void 0,
      decoding: "async",
      src: thumbnailUrl,
      alt: "",
      className: clsx(size, "aspect-video flex-shrink-0 object-cover")
    }
  );
}
function TitleBackdropFallback({
  title,
  episode,
  srcSize,
  size
}) {
  return /* @__PURE__ */ jsx(
    TitleBackdrop,
    {
      title,
      episode,
      srcSize,
      size
    }
  );
}
function useLogVideoPlay(playerRef, { enabled = true } = {}) {
  return useCallback(() => {
    var _a2;
    const player = playerRef.current;
    if (!player || !enabled) {
      return false;
    }
    const media = player.getState().cuedMedia;
    if (!((_a2 = media == null ? void 0 : media.meta) == null ? void 0 : _a2.id) || player.getCurrentTime() === 0) {
      return false;
    }
    return navigator.sendBeacon(
      `/api/v1/videos/${media.meta.id}/log-play`,
      JSON.stringify({
        currentTime: player.getCurrentTime(),
        duration: player.getState().mediaDuration,
        _token: getCookie("XSRF-TOKEN")
      })
    );
  }, [playerRef, enabled]);
}
function EpisodePoster({
  episode,
  title,
  seasonNumber,
  className,
  size,
  srcSize,
  lazy = true,
  children,
  aspect = "aspect-video",
  link,
  wrapWithLink = true,
  showPlayButton,
  rightAction
}) {
  const { trans } = useTrans();
  const src = useImageSrc(episode.poster, { size: srcSize });
  const imageClassName = clsx(
    "w-full h-full object-cover bg-fg-base/4",
    !src ? "flex items-center justify-center" : "block"
  );
  let image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      draggable: false,
      loading: lazy ? "lazy" : "eager",
      src,
      alt: trans(message("Poster for :name", { values: { name: episode.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(MovieIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  const playButton = showPlayButton && episode.primary_video ? /* @__PURE__ */ jsx(
    IconButton,
    {
      color: "white",
      variant: "flat",
      className: "absolute bottom-12 left-12 z-10 shadow-md",
      elementType: Link,
      radius: "rounded-full",
      to: getWatchLink(episode.primary_video),
      children: /* @__PURE__ */ jsx(MediaPlayIcon, {})
    }
  ) : null;
  if (wrapWithLink) {
    image = link ? /* @__PURE__ */ jsx(Link, { to: link, children: image }) : /* @__PURE__ */ jsx(
      EpisodeLink,
      {
        title,
        episode,
        seasonNumber: episode.season_number ?? seasonNumber,
        displayContents: true,
        children: image
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("group relative flex-shrink-0", size, aspect, className),
      children: [
        image,
        playButton,
        children && /* @__PURE__ */ jsx("div", { className: "absolute bottom-14 left-14", children }),
        wrapWithLink && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" }),
        rightAction && /* @__PURE__ */ jsx("div", { className: "absolute bottom-12 right-12 z-10 shadow-md", children: rightAction })
      ]
    }
  );
}
const ArrowForwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" }),
  "ArrowForwardOutlined"
);
const TvIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" }),
  "TvOutlined"
);
const seasonQueryKey = (titleId, season, params) => {
  const key = ["titles", `${titleId}`, "seasons", `${season}`];
  if (params) {
    key.push(params);
  }
  return key;
};
function useSeason(loader) {
  const { titleId, season } = useParams();
  return useQuery({
    queryKey: seasonQueryKey(titleId, season, loader),
    queryFn: () => fetchSeason(titleId, season, loader),
    initialData: () => {
      var _a2, _b2, _c2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      if (((_b2 = data == null ? void 0 : data.title) == null ? void 0 : _b2.id) == titleId && ((_c2 = data == null ? void 0 : data.season) == null ? void 0 : _c2.number) == season) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchSeason(titleId, seasonNumber, loader) {
  return apiClient.get(`titles/${titleId}/seasons/${seasonNumber}`, {
    params: { loader }
  }).then((response) => response.data);
}
function useSeasonEpisodes(initialPage, queryParams, props = {}) {
  const urlParams = useParams();
  const titleId = props.titleId || urlParams.titleId;
  const season = props.season || urlParams.season;
  return useInfiniteData({
    initialPage,
    willSortOrFilter: props.willSortOrFilter,
    defaultOrderBy: props.defaultOrderBy,
    defaultOrderDir: props.defaultOrderDir,
    endpoint: `titles/${titleId}/seasons/${season}/episodes`,
    queryKey: [...seasonQueryKey(titleId, season), "episodes"],
    queryParams
  });
}
function InfiniteScrollSentinel({
  query: { isInitialLoading, fetchNextPage, isFetchingNextPage, hasNextPage: hasNextPage2 },
  children,
  loaderMarginTop = "mt-24",
  style,
  className,
  variant: _variant = "infiniteScroll",
  loadMoreExtraContent,
  size = "md"
}) {
  const sentinelRef = useRef(null);
  const isLoading = isFetchingNextPage || isInitialLoading;
  const [loadMoreClickCount, setLoadMoreClickCount] = useState(0);
  const innerVariant = _variant === "loadMore" && loadMoreClickCount < 3 ? "loadMore" : "infiniteScroll";
  const leftViewAfterLoading = useRef(false);
  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl || innerVariant === "loadMore")
      return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!leftViewAfterLoading.current)
          return;
        if (hasNextPage2 && !isLoading) {
          leftViewAfterLoading.current = false;
          fetchNextPage();
        }
      } else {
        leftViewAfterLoading.current = true;
      }
    });
    observer.observe(sentinelEl);
    return () => {
      observer.unobserve(sentinelEl);
    };
  }, [fetchNextPage, hasNextPage2, isLoading, innerVariant]);
  let content;
  if (children) {
    content = isFetchingNextPage ? children : null;
  } else if (innerVariant === "loadMore") {
    content = !isInitialLoading && hasNextPage2 && /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-8", loaderMarginTop), children: [
      loadMoreExtraContent,
      /* @__PURE__ */ jsx(
        Button,
        {
          size: size === "md" ? "sm" : "xs",
          className: clsx(
            size === "sm" ? "min-h-24 min-w-96" : "min-h-36 min-w-112"
          ),
          variant: "outline",
          color: "primary",
          onClick: () => {
            fetchNextPage();
            setLoadMoreClickCount(loadMoreClickCount + 1);
          },
          disabled: isLoading,
          children: loadMoreClickCount >= 2 && !isFetchingNextPage ? /* @__PURE__ */ jsx(Trans, { message: "Load all" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
        }
      )
    ] });
  } else {
    content = /* @__PURE__ */ jsx(AnimatePresence, { children: isFetchingNextPage && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx("flex w-full justify-center", loaderMarginTop),
        ...opacityAnimation,
        children: /* @__PURE__ */ jsx(ProgressCircle, { size, isIndeterminate: true, "aria-label": "loading" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style,
      className: clsx("w-full", className, hasNextPage2 && "min-h-36"),
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx("div", { ref: sentinelRef, "aria-hidden": true }),
        content
      ]
    }
  );
}
const MediaEpisodesIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M24 19.3328V9.46667C24 9.39303 23.9403 9.33334 23.8667 9.33334L11.3333 9.33334C10.9652 9.33334 10.6667 9.03486 10.6667 8.66667V7.33334C10.6667 6.96515 10.9652 6.66667 11.3333 6.66667H26C26.3682 6.66667 26.6667 6.96515 26.6667 7.33334V19.3328C26.6667 19.701 26.3682 19.9994 26 19.9994H24.6667C24.2985 19.9994 24 19.701 24 19.3328Z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.00001 12C5.63182 12 5.33334 12.2985 5.33334 12.6667V24.6667C5.33334 25.0349 5.63182 25.3333 6.00001 25.3333H20.6672C21.0354 25.3333 21.3338 25.0349 21.3338 24.6667V12.6667C21.3338 12.2985 21.0354 12 20.6672 12H6.00001ZM8.66668 14.6667C8.29849 14.6667 8.00001 14.9651 8.00001 15.3333V22C8.00001 22.3682 8.29849 22.6667 8.66668 22.6667H18C18.3682 22.6667 18.6667 22.3682 18.6667 22V15.3333C18.6667 14.9651 18.3682 14.6667 18 14.6667H8.66668Z"
      },
      "1"
    )
  ],
  "MediaEpisodes",
  "0 0 32 32"
);
function EpisodeSelector(props) {
  const trigger = props.trigger || /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Episodes" }), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(MediaEpisodesIcon, {}) }) });
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", placement: "top", children: [
    trigger,
    /* @__PURE__ */ jsx(EpisodeSelectorDialog, { ...props })
  ] });
}
function EpisodeSelectorDialog({ title, currentEpisode, onSelected }) {
  const { close } = useDialogContext();
  const darkThemeVars = useDarkThemeVariables();
  const [activeTab, setActiveTab] = useState("episodes");
  const [selectedSeason, setSelectedSeason] = useState(
    currentEpisode.season_number
  );
  const heading = activeTab === "episodes" ? /* @__PURE__ */ jsx(Trans, { message: "Season :number", values: { number: selectedSeason } }) : title.name;
  const showBackButton = activeTab === "episodes" && title.seasons_count > 1;
  return /* @__PURE__ */ jsxs(Dialog, { style: darkThemeVars, className: "dark", size: "lg", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        titleTextSize: "text-md",
        closeButtonSize: "md",
        className: "h-60",
        padding: showBackButton ? "pl-10 pr-20" : "px-20",
        leftAdornment: showBackButton ? /* @__PURE__ */ jsx(IconButton, { onClick: () => setActiveTab("seasons"), children: /* @__PURE__ */ jsx(ArrowBackIcon, {}) }) : null,
        children: heading
      }
    ),
    /* @__PURE__ */ jsx(
      DialogBody,
      {
        className: "stable-scrollbar relative h-780 text-main md:h-400",
        padding: "p-0",
        children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: activeTab === "episodes" ? /* @__PURE__ */ jsx(
          EpisodeList,
          {
            title,
            season: selectedSeason,
            onSelected: (episode) => {
              close();
              onSelected(episode);
            },
            selectedEpisodeId: currentEpisode.season_number === selectedSeason ? currentEpisode.id : void 0
          }
        ) : /* @__PURE__ */ jsx(
          SeasonList,
          {
            title,
            selectedSeason,
            onSelected: (number) => {
              setSelectedSeason(number);
              setActiveTab("episodes");
            }
          }
        ) })
      }
    )
  ] });
}
function SeasonList({ title, onSelected, selectedSeason }) {
  return /* @__PURE__ */ jsx(AnimatedPanel, { name: "seasons", children: /* @__PURE__ */ jsx(List, { children: [...new Array(title.seasons_count).keys()].map((season) => {
    const seasonNumber = season + 1;
    return /* @__PURE__ */ jsx(
      ListItem,
      {
        className: "group",
        endIcon: /* @__PURE__ */ jsx(
          ArrowForwardIcon,
          {
            className: "invisible group-hover:visible",
            size: "sm"
          }
        ),
        showCheckmark: true,
        isSelected: selectedSeason === seasonNumber,
        onSelected: () => onSelected(seasonNumber),
        onClick: () => onSelected(seasonNumber),
        children: /* @__PURE__ */ jsx(Trans, { message: "Season :number", values: { number: seasonNumber } })
      },
      seasonNumber
    );
  }) }) });
}
function EpisodeList({
  title,
  season,
  selectedEpisodeId,
  onSelected
}) {
  const query = useSeasonEpisodes(
    void 0,
    { truncateDescriptions: "true" },
    { titleId: title.id, season }
  );
  let content;
  if (query.noResults) {
    content = /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "pt-56",
        imageMargin: "mb-8",
        image: /* @__PURE__ */ jsx("div", { className: "text-muted", children: /* @__PURE__ */ jsx(TvIcon, { size: "xl" }) }),
        imageHeight: "h-auto",
        title: /* @__PURE__ */ jsx(Trans, { message: "This season has not episodes yet." })
      }
    );
  } else if (query.isLoading) {
    content = /* @__PURE__ */ jsx(FullPageLoader, {});
  } else {
    content = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Accordion,
        {
          defaultExpandedValues: selectedEpisodeId ? [selectedEpisodeId] : void 0,
          children: query.items.map((episode) => /* @__PURE__ */ jsx(
            AccordionItem,
            {
              value: episode.id,
              buttonPadding: "py-10 pl-26 pr-10",
              label: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
                /* @__PURE__ */ jsx("div", { children: episode.episode_number }),
                /* @__PURE__ */ jsx("div", { children: episode.name })
              ] }),
              children: /* @__PURE__ */ jsx(
                EpisodeItem,
                {
                  title,
                  episode,
                  isSelected: episode.id === selectedEpisodeId,
                  onSelected: () => onSelected(episode)
                }
              )
            },
            episode.id
          ))
        }
      ),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] });
  }
  return /* @__PURE__ */ jsx(AnimatedPanel, { name: "episodes", children: content });
}
function EpisodeItem({
  episode,
  title,
  isSelected,
  onSelected
}) {
  const isPlayable = !isSelected && episode.primary_video;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex gap-20 text-lg text-main",
      onClick: isPlayable ? () => onSelected() : void 0,
      children: [
        /* @__PURE__ */ jsx(
          EpisodePoster,
          {
            wrapWithLink: false,
            size: "w-84 md:w-224",
            title,
            episode,
            className: "overflow-hidden rounded-panel",
            children: isPlayable ? /* @__PURE__ */ jsx(IconButton, { variant: "flat", color: "white", radius: "rounded-full", children: /* @__PURE__ */ jsx(MediaPlayIcon, {}) }) : void 0
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "pt-12 text-sm", children: episode.description })
      ]
    }
  );
}
const variants = {
  enter: (activeTab) => {
    return {
      x: activeTab === "episodes" ? 608 : -608,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction === "seasons" ? 608 : -608,
      opacity: 0
    };
  }
};
function AnimatedPanel({ name, children }) {
  return /* @__PURE__ */ jsx(
    m.div,
    {
      className: "absolute h-full w-full",
      custom: name,
      variants,
      initial: "enter",
      animate: "center",
      exit: "exit",
      transition: { type: "tween", duration: 0.15 },
      children
    },
    name
  );
}
const SiteVideoPlayer = memo((props) => {
  const { video, autoPlay, title, episode } = props;
  if (video.type === "video" || video.type === "stream" || video.type === "embed" && video.src.includes("youtube")) {
    return /* @__PURE__ */ jsx(NativeVideoPlayer, { ...props });
  }
  if (video.type === "embed") {
    return /* @__PURE__ */ jsx(EmbedPlayer, { src: video.src, autoPlay });
  }
  if (video.type === "external") {
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        VideoThumbnail,
        {
          title,
          episode,
          video,
          fallback: /* @__PURE__ */ jsx("div", { className: "aspect-video w-full bg-fg-base/4" })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute left-0 top-0 flex h-full w-full items-center justify-center",
          onClick: () => window.open(video.src, "_blank"),
          children: /* @__PURE__ */ jsx(IconButton, { variant: "flat", color: "primary", size: "lg", children: /* @__PURE__ */ jsx(MediaPlayIcon, {}) })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx(VideoPlayerSkeleton, {});
});
const EmbedPlayer = memo(({ src, autoPlay }) => {
  var _a2;
  let finalSrc = "";
  try {
    const url = src.includes("<iframe") ? (_a2 = src.match(/src="([^"]*)"/)) == null ? void 0 : _a2[1] : src;
    const parsed = new URL(url || "");
    parsed.searchParams.set("autoplay", autoPlay ? "1" : "0");
    finalSrc = parsed.toString();
  } catch {
  }
  if (!finalSrc) {
    return /* @__PURE__ */ jsx("div", { className: "flex aspect-video w-full items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "rounded-panel border p-10", children: /* @__PURE__ */ jsx(Trans, { message: "There was an issue playting this video." }) }) });
  }
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      src: finalSrc,
      className: "aspect-video w-full",
      allowFullScreen: true,
      allow: "autoplay; encrypted-media; picture-in-picture;"
    }
  );
});
function NativeVideoPlayer({
  video,
  title,
  episode,
  mediaItemId,
  relatedVideos,
  autoPlay,
  logPlays,
  showEpisodeSelector
}) {
  const playerRef = useRef(null);
  const logVideoPlay = useLogVideoPlay(playerRef, { enabled: logPlays });
  const mediaItem = videoToMediaItem(video, mediaItemId);
  const related = (relatedVideos == null ? void 0 : relatedVideos.map((v) => videoToMediaItem(v))) ?? [];
  const navigate = useNavigate$1();
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        logVideoPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [logVideoPlay]);
  return /* @__PURE__ */ jsx(
    VideoPlayer,
    {
      apiRef: playerRef,
      id: "player",
      queue: [mediaItem, ...related],
      autoPlay,
      onBeforePlayNext: (nextMedia) => {
        if (nextMedia && !isSameMedia(mediaItem, nextMedia)) {
          navigate(getWatchLink(nextMedia.meta));
        }
        return true;
      },
      onDestroy: () => logVideoPlay(),
      listeners: {
        playbackEnd: () => logVideoPlay(),
        beforeCued: ({ previous }) => {
          if (previous) {
            logVideoPlay();
          }
        }
      },
      rightActions: showEpisodeSelector && title && episode ? /* @__PURE__ */ jsx(
        EpisodeSelector,
        {
          title,
          currentEpisode: episode,
          onSelected: (episode2) => {
            navigate(getWatchLink(episode2.primary_video));
          }
        }
      ) : void 0
    }
  );
}
function videoToMediaItem(video, mediaItemId) {
  var _a2, _b2;
  return {
    id: mediaItemId || video.id,
    provider: guessPlayerProvider(video.src),
    src: video.src,
    poster: video.thumbnail,
    meta: video,
    initialTime: ((_a2 = video.latest_play) == null ? void 0 : _a2.time_watched) ?? void 0,
    captions: (_b2 = video.captions) == null ? void 0 : _b2.map((caption) => ({
      id: caption.id,
      src: caption.url,
      label: caption.name,
      language: caption.language
    }))
  };
}
const GENRE_MODEL = "genre";
const PRODUCTION_COUNTRY_MODEL = "production_country";
const getTitleChannelFilters = ({
  languages,
  countries,
  genres,
  ageRatings,
  restriction
}) => {
  return [
    (restriction == null ? void 0 : restriction.model_type) !== GENRE_MODEL ? {
      key: "genres",
      label: message("Genres"),
      defaultOperator: FilterOperator.hasAll,
      control: {
        type: FilterControlType.ChipField,
        placeholder: message("Pick genres"),
        defaultValue: [],
        options: genres.map((genre) => ({
          label: message(genre.name),
          key: genre.value,
          value: genre.value
        }))
      }
    } : null,
    {
      key: "release_date",
      label: message("Release date"),
      defaultOperator: FilterOperator.between,
      control: {
        type: FilterControlType.DateRangePicker,
        defaultValue: dateRangeToAbsoluteRange(
          DateRangePresets[9].getRangeValue()
        ),
        min: parseDateTime("1900-01-01"),
        max: now(getUserTimezone()).add({ years: 5 })
      }
    },
    {
      control: {
        type: FilterControlType.Input,
        inputType: "number",
        minValue: 1,
        maxValue: 10,
        defaultValue: 7
      },
      key: getBootstrapData().settings.content.title_provider !== "tmdb" ? "tmdb_vote_average" : "local_vote_average",
      label: message("User rating"),
      defaultOperator: FilterOperator.gte,
      operators: ALL_PRIMITIVE_OPERATORS
    },
    {
      key: "runtime",
      label: message("Runtime"),
      description: message("Runtime in minutes"),
      defaultOperator: FilterOperator.lte,
      operators: ALL_PRIMITIVE_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: "number",
        minValue: 1,
        maxValue: 255,
        defaultValue: 180
      }
    },
    {
      key: "language",
      label: message("Original language"),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.Select,
        placeholder: message("Pick a language"),
        searchPlaceholder: message("Search for language"),
        showSearchField: true,
        options: languages.map(({ name, value }) => ({
          label: message(name),
          key: value,
          value
        }))
      }
    },
    (restriction == null ? void 0 : restriction.model_type) !== PRODUCTION_COUNTRY_MODEL ? {
      control: {
        type: FilterControlType.ChipField,
        placeholder: message("Pick countries"),
        defaultValue: [],
        options: countries == null ? void 0 : countries.map(({ name, value }) => ({
          label: message(name),
          key: value,
          value
        }))
      },
      key: "productionCountries",
      label: message("Production countries"),
      defaultOperator: FilterOperator.hasAll
    } : null,
    {
      key: "certification",
      label: message("Age rating"),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.Select,
        placeholder: message("Pick an age rating"),
        showSearchField: true,
        searchPlaceholder: message("Search for age rating"),
        options: ageRatings.map(({ name, value }) => ({
          label: message(name),
          key: value,
          value
        }))
      }
    },
    {
      key: "budget",
      label: message("Budget"),
      description: message("Budget in US dollars"),
      defaultOperator: FilterOperator.lte,
      operators: ALL_PRIMITIVE_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: "number",
        minValue: 1,
        maxValue: 1e9,
        defaultValue: 1e8
      }
    },
    {
      key: "revenue",
      label: message("Revenue"),
      description: message("Revenue in US dollars"),
      defaultOperator: FilterOperator.lte,
      operators: ALL_PRIMITIVE_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: "number",
        minValue: 1,
        maxValue: 1e9,
        defaultValue: 1e8
      }
    }
  ].filter(Boolean);
};
function useTitleIndexFilters(options = {}) {
  const { data, isLoading, fetchStatus } = useValueLists(
    [
      "titleFilterLanguages",
      "productionCountries",
      "genres",
      "titleFilterAgeRatings"
    ],
    void 0,
    options
  );
  const filters = useMemo(() => {
    return getTitleChannelFilters({
      countries: (data == null ? void 0 : data.productionCountries) || [],
      languages: (data == null ? void 0 : data.titleFilterLanguages) || [],
      genres: (data == null ? void 0 : data.genres) || [],
      ageRatings: (data == null ? void 0 : data.titleFilterAgeRatings) || []
    });
  }, [data]);
  return { filters, filtersLoading: isLoading && fetchStatus !== "idle" };
}
function useTitle(loader) {
  const { titleId } = useParams();
  return useQuery({
    queryKey: ["titles", `${titleId}`, loader],
    queryFn: () => fetchTitle(titleId, loader),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      if (((_b2 = data == null ? void 0 : data.title) == null ? void 0 : _b2.id) == titleId) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchTitle(titleId, loader) {
  return apiClient.get(`titles/${titleId}`, { params: { loader } }).then((response) => response.data);
}
const EPISODE_MODEL = "episode";
function useCreateReview(form) {
  return useMutation({
    mutationFn: (payload) => createReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reviewsQueryKey() });
    },
    onError: (r) => form ? onFormQueryError(r, form) : showHttpErrorToast(r)
  });
}
function createReview(payload) {
  return apiClient.post(`reviews`, {
    reviewable_id: payload.reviewable.id,
    reviewable_type: payload.reviewable.model_type,
    score: payload.score,
    title: payload.title,
    body: payload.body
  }).then((r) => r.data);
}
function RatingDialog({ title, episode, initialRating }) {
  const item = episode || title;
  const createReview2 = useCreateReview();
  const deleteReview = useDeleteReviews();
  const { close } = useDialogContext();
  const [currentRating, setCurrentRating] = useState((initialRating == null ? void 0 : initialRating.score) || 0);
  const handleCreateReview = () => {
    if (currentRating) {
      createReview2.mutate(
        { reviewable: item, score: currentRating },
        {
          onSuccess: () => close()
        }
      );
    }
  };
  const handleDeleteReview = () => {
    if (initialRating) {
      deleteReview.mutate(
        { reviewIds: [initialRating.id] },
        {
          onSuccess: () => close()
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "w-auto", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { item }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      item.model_type === EPISODE_MODEL ? /* @__PURE__ */ jsx(EpisodeDetails, { title, episode }) : /* @__PURE__ */ jsx(TitleDetails, { title }),
      /* @__PURE__ */ jsxs("div", { className: "pb-16", children: [
        /* @__PURE__ */ jsx(
          StarSelector,
          {
            count: 10,
            value: currentRating,
            onValueChange: setCurrentRating,
            className: "my-14"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            className: "w-full",
            disabled: !currentRating || createReview2.isPending,
            onClick: handleCreateReview,
            children: /* @__PURE__ */ jsx(Trans, { message: "Rate" })
          }
        ),
        initialRating && /* @__PURE__ */ jsx(
          Button,
          {
            className: "mt-14 w-full",
            disabled: deleteReview.isPending,
            onClick: handleDeleteReview,
            children: /* @__PURE__ */ jsx(Trans, { message: "Remove rating" })
          }
        )
      ] })
    ] })
  ] });
}
function TitleDetails({ title }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-center gap-12", children: [
    /* @__PURE__ */ jsx(TitlePoster, { size: "w-60", srcSize: "sm", title }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
      /* @__PURE__ */ jsx("div", { children: title.name }),
      /* @__PURE__ */ jsx("div", { children: title.year })
    ] })
  ] });
}
function EpisodeDetails({ title, episode }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-center gap-12", children: [
    /* @__PURE__ */ jsx(EpisodePoster, { size: "w-100", title, episode }),
    /* @__PURE__ */ jsxs("div", { className: "text-base", children: [
      /* @__PURE__ */ jsx(TitleLink, { title, color: "primary" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        episode.name,
        " (",
        /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode }),
        ")"
      ] })
    ] })
  ] });
}
function DialogTitle({ item }) {
  if (item.model_type === EPISODE_MODEL) {
    return /* @__PURE__ */ jsx(Trans, { message: "Rate this episode" });
  } else if (item.is_series) {
    return /* @__PURE__ */ jsx(Trans, { message: "Rate this series" });
  } else {
    return /* @__PURE__ */ jsx(Trans, { message: "Rate this movie" });
  }
}
function useCurrentUserRatings() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["reviews", "users", `${user == null ? void 0 : user.id}`],
    queryFn: () => fetchRatings(),
    enabled: !!user
  });
}
function useCurrentUserRatingFor(item) {
  var _a2, _b2, _c2;
  const query = useCurrentUserRatings();
  return {
    isLoading: query.isLoading && query.fetchStatus !== "idle",
    rating: (_c2 = (_b2 = (_a2 = query.data) == null ? void 0 : _a2.ratings) == null ? void 0 : _b2[item.model_type]) == null ? void 0 : _c2[item.id]
  };
}
function fetchRatings() {
  return apiClient.get(`users/me/ratings`).then((response) => response.data);
}
function useAuthClickCapture() {
  const dialogContext = useDialogContext();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate$1();
  return useCallback(
    (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        e.stopPropagation();
        if (dialogContext) {
          dialogContext.close();
        }
        navigate("/login");
      }
    },
    [navigate, isLoggedIn, dialogContext]
  );
}
function InteractableRating({
  title,
  episode,
  size = "md",
  className
}) {
  const isUpcoming = episode ? episode.status === "upcoming" : title.status === "upcoming";
  const score = (episode || title).rating;
  if (isUpcoming) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex min-w-[243px] flex-shrink-0 items-center",
        getSizeClassName(size),
        className
      ),
      children: [
        score ? /* @__PURE__ */ jsx("div", { className: "border-r pr-14", children: /* @__PURE__ */ jsx(TitleRating, { score }) }) : null,
        /* @__PURE__ */ jsx(RateButton, { title, episode })
      ]
    }
  );
}
function RateButton({ title, episode }) {
  const item = episode || title;
  const { isLoading, rating } = useCurrentUserRatingFor(item);
  const authHandler = useAuthClickCapture();
  let content;
  if (isLoading) {
    content = /* @__PURE__ */ jsx(
      m.div,
      {
        ...opacityAnimation,
        className: "flex min-h-36 items-center",
        children: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-[106px] h-16 ml-14" })
      },
      "skeleton"
    );
  } else {
    content = /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      rating ? /* @__PURE__ */ jsx(Button, { onClickCapture: authHandler, children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Your rating: :value / 10",
          values: { value: rating.score }
        }
      ) }) : /* @__PURE__ */ jsx(
        Button,
        {
          onClickCapture: authHandler,
          startIcon: /* @__PURE__ */ jsx(StarBorderIcon, {}),
          className: "min-w-120",
          children: /* @__PURE__ */ jsx(Trans, { message: "Rate this" })
        }
      ),
      /* @__PURE__ */ jsx(
        RatingDialog,
        {
          title,
          episode,
          initialRating: rating
        }
      )
    ] }) }, "button");
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: content });
}
function getSizeClassName(size) {
  switch (size) {
    case "sm":
      return "text-sm";
    case "md":
      return "text-base";
    case "lg":
      return "text-lg";
  }
}
function EpisodeListItem({
  episode,
  title,
  allowRating = true,
  className,
  children,
  showPlayButton
}) {
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-20", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-288 flex-shrink-0 overflow-hidden rounded max-md:hidden", children: [
      /* @__PURE__ */ jsx(
        EpisodePoster,
        {
          title,
          episode,
          seasonNumber: episode.season_number,
          lazy: true,
          srcSize: "md",
          showPlayButton
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full bg-black/50 p-6 text-center text-sm text-white", children: /* @__PURE__ */ jsx(CompactSeasonEpisode, { episode }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx(
        EpisodeLink,
        {
          title,
          seasonNumber: episode.season_number,
          episode,
          color: "primary",
          className: "text-base font-semibold"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-4 text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedDate, { date: episode.release_date, preset: "long" }) }),
      /* @__PURE__ */ jsx("div", { className: "my-12", children: /* @__PURE__ */ jsx(
        EpisodeRating,
        {
          title,
          episode,
          allowRating
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: episode.description || /* @__PURE__ */ jsx("span", { className: "italic", children: /* @__PURE__ */ jsx(Trans, { message: "We have no overview for this episode yet." }) }) }),
      children
    ] })
  ] });
}
function EpisodeRating({ title, episode, allowRating }) {
  if (episode.status === "upcoming") {
    return null;
  }
  return allowRating ? /* @__PURE__ */ jsx(InteractableRating, { title, episode }) : /* @__PURE__ */ jsx(TitleRating, { score: episode.rating });
}
const titleSeasonsQueryKey = (titleId) => [
  "title",
  `${titleId}`,
  "seasons"
];
function useTitleSeasons(titleId, initialPage, queryParams) {
  return useInfiniteData({
    initialPage,
    endpoint: `titles/${titleId}/seasons`,
    queryKey: titleSeasonsQueryKey(titleId),
    queryParams
  });
}
function SeasonPoster({
  title,
  season,
  className,
  size = "w-full",
  srcSize,
  lazy = true,
  link
}) {
  const { trans } = useTrans();
  const src = useImageSrc(season.poster || title.poster, { size: srcSize });
  const imageClassName = clsx(
    className,
    size,
    "object-cover bg-fg-base/4 aspect-poster rounded",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imageClassName,
      draggable: false,
      loading: lazy ? "lazy" : "eager",
      src,
      alt: trans(
        message("Poster for season :number of :title", {
          values: { number: season.number, title: title.name }
        })
      )
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(MovieIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
  return link ? /* @__PURE__ */ jsx(Link, { to: link, className: "flex-shrink-0", children: image }) : /* @__PURE__ */ jsx(
    SeasonLink,
    {
      title,
      seasonNumber: season.number,
      className: "flex-shrink-0",
      children: image
    }
  );
}
const PlayCircleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5 7-4.5-7-4.5v9z" }),
  "PlayCircleOutlined"
);
function VideoGrid({ videos, heading, count, title, episode }) {
  const isMobile = useIsMobileMediaQuery();
  if (!(videos == null ? void 0 : videos.length))
    return null;
  if (!count) {
    count = isMobile ? 4 : 3;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
    heading,
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-24", children: videos.slice(0, count).map((video) => /* @__PURE__ */ jsx(
      VideoGridItem,
      {
        video,
        title,
        episode
      },
      video.id
    )) })
  ] });
}
function VideoGridItem({
  video,
  className,
  title,
  episode,
  name,
  showCategory = true,
  forceTitleBackdrop = false
}) {
  const link = getWatchLink(video);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs(Link, { to: link, className: "relative isolate block", children: [
      /* @__PURE__ */ jsx(
        VideoThumbnail,
        {
          video,
          title,
          episode,
          srcSize: "lg",
          forceTitleBackdrop
        }
      ),
      /* @__PURE__ */ jsx(VideoGridItemBottomGradient, {}),
      /* @__PURE__ */ jsxs("span", { className: "absolute bottom-0 left-0 z-30 flex items-center gap-x-6 p-10 text-white", children: [
        /* @__PURE__ */ jsx(PlayCircleIcon, { size: showCategory ? "md" : "lg" }),
        showCategory && /* @__PURE__ */ jsx("span", { className: "capitalize", children: video.category })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: link, className: "mt-12 block hover:underline", children: name || video.name })
  ] }, video.id);
}
function VideoGridItemSkeleton({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: clsx(className, "h-[228px]"), children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-full aspect-video", animation: "pulsate" }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "text", size: "w-3/4 mt-12 h-20" })
  ] });
}
function VideoGridItemBottomGradient() {
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute bottom-0 z-20 h-full w-full bg-gradient-to-t from-black to-40%" });
}
function useEpisode(loader) {
  const { titleId, season, episode } = useParams();
  return useQuery({
    queryKey: [
      ...seasonQueryKey(titleId, season),
      "episodes",
      `${episode}`,
      loader
    ],
    queryFn: () => fetchEpisode(titleId, season, episode, loader),
    initialData: () => {
      var _a2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      if ((data == null ? void 0 : data.title.id) == titleId && (data == null ? void 0 : data.episode.season_number) == season && (data == null ? void 0 : data.episode.episode_number) == episode) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchEpisode(titleId, seasonNumber, episodeNumber, loader) {
  return apiClient.get(
    `titles/${titleId}/seasons/${seasonNumber}/episodes/${episodeNumber}`,
    { params: { loader } }
  ).then((response) => response.data);
}
function PersonLink({
  person,
  className,
  children,
  color = "inherit",
  ...linkProps
}) {
  const finalUri = useMemo(() => {
    return getPersonLink(person);
  }, [person]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        color === "primary" ? "text-primary hover:text-primary-dark" : "text-inherit",
        "overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline",
        className
      ),
      to: finalUri,
      children: children ?? person.name
    }
  );
}
function getPersonLink(person, { absolute } = {}) {
  let link = `/people/${person.id}/${slugifyString(person.name)}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
function PersonPoster({
  person,
  className,
  size,
  srcSize,
  lazy = true,
  rounded = false
}) {
  const { trans } = useTrans();
  const src = useImageSrc(person == null ? void 0 : person.poster, { size: srcSize });
  const imageClassName = clsx(
    className,
    size,
    "bg-fg-base/4 object-cover",
    rounded ? "aspect-square rounded-full" : "aspect-poster rounded",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      decoding: "async",
      className: imageClassName,
      draggable: false,
      loading: lazy ? "lazy" : "eager",
      src,
      alt: trans(
        message("Cover image for :name", { values: { name: person.name } })
      )
    }
  ) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(PersonIcon, { className: "max-w-[60%] text-divider", size: "text-5xl" }) });
  return /* @__PURE__ */ jsx(PersonLink, { person, className: "flex-shrink-0", children: image });
}
function KnownForCompact({
  person,
  linkTarget,
  linkColor = "primary"
}) {
  return /* @__PURE__ */ jsxs(BulletSeparatedItems, { children: [
    person.known_for ? /* @__PURE__ */ jsx(Trans, { message: person.known_for }) : null,
    person.primary_credit ? /* @__PURE__ */ jsx(
      TitleLink,
      {
        target: linkTarget,
        color: linkColor,
        title: person.primary_credit,
        onClick: (e) => {
          e.stopPropagation();
        }
      }
    ) : null
  ] });
}
function usePerson(loader) {
  const { personId } = useParams();
  return useQuery({
    queryKey: ["people", `${personId}`, loader],
    queryFn: () => fetchPerson(personId, loader),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      if (((_b2 = data == null ? void 0 : data.person) == null ? void 0 : _b2.id) == personId) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchPerson(personId, loader) {
  return apiClient.get(`people/${personId}`, { params: { loader } }).then((response) => response.data);
}
function useNewsArticle(loader) {
  const { articleId } = useParams();
  return useQuery({
    queryKey: ["news-articles", `${articleId}`],
    queryFn: () => fetchNewsArticle(articleId),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      if (((_b2 = data == null ? void 0 : data.article) == null ? void 0 : _b2.id) == articleId) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchNewsArticle(articleId) {
  return apiClient.get(`news/${articleId}`).then((response) => response.data);
}
const todoImage = "/assets/todo-ec93dd23.svg";
function useCreateList(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => createList$1(payload),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("channel")
      });
      toast(trans(message("List created")));
      navigate(`../${response.channel.id}/edit`, {
        replace: true,
        relative: "path"
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createList$1(payload) {
  return apiClient.post("channel", payload).then((r) => r.data);
}
function CrupdateUserListForm() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        required: true,
        autoFocus: true,
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        inputElementType: "textarea",
        rows: 2,
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      ContentModelField,
      {
        config: channelContentConfig,
        className: "mb-24",
        exclude: [NEWS_ARTICLE_MODEL, CHANNEL_MODEL, MOVIE_MODEL, SERIES_MODEL]
      }
    ),
    /* @__PURE__ */ jsx(ContentOrderField, { config: channelContentConfig, className: "mb-24" }),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "w-full flex-auto",
        selectionMode: "single",
        name: "config.layout",
        label: /* @__PURE__ */ jsx(Trans, { message: "Layout" }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: Layout.grid, children: /* @__PURE__ */ jsx(Trans, { ...channelContentConfig.layoutMethods[Layout.grid].label }) }),
          /* @__PURE__ */ jsx(Item, { value: Layout.list, children: /* @__PURE__ */ jsx(Trans, { ...channelContentConfig.layoutMethods[Layout.list].label }) }),
          /* @__PURE__ */ jsx(Item, { value: Layout.landscapeGrid, children: /* @__PURE__ */ jsx(
            Trans,
            {
              ...channelContentConfig.layoutMethods[Layout.landscapeGrid].label
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { name: "public", className: "mt-24", children: /* @__PURE__ */ jsx(Trans, { message: "Public" }) })
  ] });
}
function CreateUserListPage() {
  const form = useForm({
    defaultValues: {
      type: "list",
      public: true,
      config: {
        contentType: "manual",
        contentModel: TITLE_MODEL,
        layout: "grid",
        contentOrder: "channelables.order:asc"
      },
      content: EMPTY_PAGINATION_RESPONSE.pagination
    }
  });
  const createList2 = useCreateList(form);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "New list" }) }),
    /* @__PURE__ */ jsx(
      CrupdateResourceLayout,
      {
        submitButtonText: /* @__PURE__ */ jsx(Trans, { message: "Create" }),
        backButton: /* @__PURE__ */ jsx(IconButton, { elementType: Link, relative: "path", to: "../", children: /* @__PURE__ */ jsx(ArrowBackIcon, {}) }),
        form,
        onSubmit: (values) => {
          createList2.mutate(values);
        },
        title: /* @__PURE__ */ jsx(Trans, { message: "New list" }),
        isLoading: createList2.isPending,
        children: /* @__PURE__ */ jsx(CrupdateUserListForm, {})
      }
    )
  ] });
}
function useUpdateList(form) {
  const { trans } = useTrans();
  const { slugOrId } = useParams();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => createList(payload, slugOrId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("channel")
      });
      toast(trans(message("List updated")));
      navigate(`../../`, {
        replace: true,
        relative: "path"
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createList(payload, listId) {
  return apiClient.put(`channel/${listId}`, payload).then((r) => r.data);
}
function EditUserListPage() {
  const query = useChannel(void 0, "editUserListPage");
  return query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Edit list" }) }),
    /* @__PURE__ */ jsxs(PageContent, { list: query.data.channel, children: [
      /* @__PURE__ */ jsx(CrupdateUserListForm, {}),
      /* @__PURE__ */ jsx(
        ChannelContentEditor,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "List content" }),
          searchField: /* @__PURE__ */ jsx(SearchField, {}),
          noResultsMessage: /* @__PURE__ */ jsx(NoResultsMessage, {})
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute m-auto inset-0" });
}
function PageContent({ list, children }) {
  const form = useForm({
    // @ts-ignore
    defaultValues: {
      ...list
    }
  });
  const updateList = useUpdateList(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      backButton: /* @__PURE__ */ jsx(IconButton, { elementType: Link, relative: "path", to: "../../", children: /* @__PURE__ */ jsx(ArrowBackIcon, {}) }),
      form,
      onSubmit: (values) => {
        updateList.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ List", values: { name: list.name } }),
      isLoading: updateList.isPending,
      children
    }
  );
}
function SearchField(props) {
  return /* @__PURE__ */ jsx(
    ChannelContentSearchField,
    {
      ...props,
      imgRenderer: (item) => /* @__PURE__ */ jsx(ChannelContentItemImage, { item })
    }
  );
}
function NoResultsMessage() {
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "List is empty" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "No content is attached to this list yet." }),
      image: /* @__PURE__ */ jsx(SvgImage, { src: playlist })
    }
  );
}
function UserProfileLink({
  user,
  className,
  ...linkProps
}) {
  const { auth } = useContext(SiteConfigContext);
  const finalUri = useMemo(() => {
    return auth.getUserProfileLink(user);
  }, [auth, user]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx("hover:underline", className),
      to: finalUri,
      children: user.display_name
    }
  );
}
export {
  ContentModelField as $,
  AddFilterButton as A,
  BackendFiltersUrlKey as B,
  Calendar as C,
  DateRangePresets as D,
  DragPreview as E,
  FilterOperator as F,
  moveItemInNewArray as G,
  DragHandleIcon as H,
  Tabs as I,
  TabList as J,
  KeyboardArrowRightIcon as K,
  Tab as L,
  MoreVertIcon as M,
  NameWithAvatar as N,
  Avatar as O,
  CrupdateResourceHeader as P,
  ArrowBackIcon as Q,
  ImageZoomDialog as R,
  Switch as S,
  Table as T,
  useNormalizedModels as U,
  CrupdateResourceLayout as V,
  ChevronLeftIcon as W,
  FormNormalizedModelField as X,
  playlist as Y,
  useChannel as Z,
  channelContentConfig as _,
  FilterControlType as a,
  todoImage as a$,
  ContentOrderField as a0,
  ChannelContentEditor as a1,
  ChannelContentSearchField as a2,
  ChannelContentItemImage as a3,
  EMPTY_PAGINATION_RESPONSE as a4,
  MOVIE_MODEL as a5,
  TableContext as a6,
  NewsArticleImage as a7,
  NewsArticleLink as a8,
  useDeleteComments as a9,
  useSeason as aA,
  TvIcon as aB,
  useSeasonEpisodes as aC,
  EpisodeListItem as aD,
  InfiniteScrollSentinel as aE,
  titleSeasonsQueryKey as aF,
  useTitleSeasons as aG,
  SeasonPoster as aH,
  SeasonLink as aI,
  TitleBackdrop as aJ,
  ImageIcon as aK,
  SortIcon as aL,
  useInfiniteData as aM,
  MediaPlayIcon as aN,
  VideoThumbnail as aO,
  VideoGridItemBottomGradient as aP,
  PlayCircleIcon as aQ,
  useEpisode as aR,
  PersonPoster as aS,
  TableRow as aT,
  PRODUCTION_COUNTRY_MODEL as aU,
  GENRE_MODEL as aV,
  PersonLink as aW,
  KnownForCompact as aX,
  PERSON_MODEL as aY,
  usePerson as aZ,
  useNewsArticle as a_,
  UserAvatar as aa,
  useDeleteReviews as ab,
  TitleRating as ac,
  BulletSeparatedItems as ad,
  StarSelector as ae,
  TITLE_MODEL as af,
  ALL_PRIMITIVE_OPERATORS as ag,
  ReviewListSortButton as ah,
  TitlePoster as ai,
  getWatchLink as aj,
  CompactSeasonEpisode as ak,
  FormattedNumber as al,
  useNormalizedModel as am,
  FilterListItemDialogTrigger as an,
  Input as ao,
  useIsTouchDevice as ap,
  VideoPlayerSkeleton as aq,
  SiteVideoPlayer as ar,
  TitleLink as as,
  FormDateRangePicker as at,
  useTitleIndexFilters as au,
  useTitle as av,
  seasonQueryKey as aw,
  useStickySentinel as ax,
  getTitleLink as ay,
  useScrollToTop as az,
  useDatatableData as b,
  FormattedDateTimeRange as b0,
  useDateRangePickerState as b1,
  DateRangeComparePresets as b2,
  DateRangeDialog as b3,
  EpisodePoster as b4,
  UserProfileLink as b5,
  EpisodeLink as b6,
  TitleLinkWithEpisodeNumber as b7,
  CreateUserListPage as b8,
  EditUserListPage as b9,
  EpisodeSelector as bA,
  MediaEpisodesIcon as bB,
  StarIcon as bC,
  ArrowDownwardIcon as bD,
  ArrowRightAltIcon as bE,
  ArrowRightIcon as bF,
  FilterAltIcon as bG,
  FirstPageIcon as bH,
  NewspaperIcon as bI,
  RefreshIcon as bJ,
  StarBorderIcon as bK,
  ViewListIcon as bL,
  ViewWeekIcon as bM,
  PlayerStoreContext as bN,
  usePlayerStore as bO,
  useHtmlMediaInternalState as bP,
  useHtmlMediaEvents as bQ,
  useHtmlMediaApi as bR,
  CrupdateResourceSection as ba,
  DirtyFormSaveDrawer as bb,
  useChannelQueryParams as bc,
  channelQueryKey as bd,
  channelEndpoint as be,
  Sort as bf,
  GridViewIcon as bg,
  BaseMediaLink as bh,
  getBaseMediaLink as bi,
  SERIES_MODEL as bj,
  NEWS_ARTICLE_MODEL as bk,
  useChannelContent as bl,
  PaginationControls as bm,
  FormattedDuration as bn,
  InteractableRating as bo,
  CHANNEL_MODEL as bp,
  getPersonLink as bq,
  ArrowForwardIcon as br,
  useCreateReview as bs,
  useAuthClickCapture as bt,
  useReviews as bu,
  getEpisodeLink as bv,
  VideoGrid as bw,
  getSeasonLink as bx,
  VideoGridItemSkeleton as by,
  VideoGridItem as bz,
  FilterListSkeleton as c,
  dateRangeToAbsoluteRange as d,
  FilterList as e,
  DatatableDataQueryKey as f,
  AddIcon as g,
  hasNextPage as h,
  useCurrentDateTime as i,
  useBaseDatePickerState as j,
  DatePickerField as k,
  DateRangeIcon as l,
  DateSegmentList as m,
  FormSwitch as n,
  ChipList as o,
  FormSlider as p,
  Accordion as q,
  AccordionItem as r,
  usePrevious as s,
  toSafeZoned as t,
  useBackendFilterUrlParams as u,
  FormChipField as v,
  useSortable as w,
  TuneIcon as x,
  ChipField as y,
  TabContext as z
};
//# sourceMappingURL=user-profile-link-f8f65fb7.mjs.map
