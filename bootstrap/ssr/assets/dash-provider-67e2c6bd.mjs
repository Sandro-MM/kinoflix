import { jsx } from "react/jsx-runtime";
import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { bN as PlayerStoreContext, bO as usePlayerStore, bP as useHtmlMediaInternalState, bQ as useHtmlMediaEvents, bR as useHtmlMediaApi } from "./user-profile-link-f8f65fb7.mjs";
import { supportsMediaSource, MediaPlayer } from "dashjs";
import "../server-entry.mjs";
import "react-dom/server";
import "process";
import "http";
import "zustand";
import "react-router-dom/server.mjs";
import "@tanstack/react-query";
import "framer-motion";
import "axios";
import "slugify";
import "deepmerge";
import "zustand/middleware/immer";
import "nanoid";
import "clsx";
import "@react-aria/utils";
import "nano-memoize";
import "@react-aria/focus";
import "react-dom";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@internationalized/date";
import "react-router-dom";
import "@internationalized/number";
import "react-hook-form";
import "dot-object";
import "@react-stately/utils";
import "@react-aria/ssr";
import "immer";
import "axios-retry";
import "tus-js-client";
import "react-use-cookie";
import "mime-match";
import "zustand/traditional";
import "react-use-clipboard";
import "./OpenInNew-08e8296f.mjs";
import "fscreen";
import "zustand/middleware";
import "@react-aria/interactions";
function DashProvider() {
  const store = useContext(PlayerStoreContext);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const videoRef = useRef(null);
  const htmlMediaState = useHtmlMediaInternalState(videoRef);
  const htmlMediaEvents = useHtmlMediaEvents(htmlMediaState);
  const htmlMediaApi = useHtmlMediaApi(htmlMediaState);
  const dash = useRef();
  const [dashReady, setDashReady] = useState(false);
  const destroyDash = useCallback(() => {
    if (dash.current) {
      dash.current.destroy();
      dash.current = void 0;
      setDashReady(false);
    }
  }, []);
  const setupDash = useCallback(() => {
    if (!supportsMediaSource()) {
      store.getState().emit("error", { fatal: true });
      return;
    }
    const dashInstance = MediaPlayer().create();
    dashInstance.on(MediaPlayer.events.ERROR, (e) => {
      store.getState().emit("error", { sourceEvent: e });
    });
    dashInstance.on(MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
      const levels = dashInstance.getBitrateInfoListFor("video");
      if (!(levels == null ? void 0 : levels.length))
        return;
      store.getState().emit("playbackQualities", {
        qualities: ["auto", ...levels.map(levelToPlaybackQuality)]
      });
      store.getState().emit("playbackQualityChange", { quality: "auto" });
    });
    dashInstance.initialize(videoRef.current, void 0, false);
    dash.current = dashInstance;
    setDashReady(true);
  }, [store]);
  useEffect(() => {
    setupDash();
    return () => {
      destroyDash();
    };
  }, [setupDash, destroyDash]);
  useEffect(() => {
    if (dash.current && (cuedMedia == null ? void 0 : cuedMedia.src)) {
      dash.current.attachSource(cuedMedia.src);
    }
  }, [cuedMedia == null ? void 0 : cuedMedia.src, dashReady]);
  useEffect(() => {
    if (!dashReady)
      return;
    store.setState({
      providerApi: {
        ...htmlMediaApi,
        setPlaybackQuality: (quality) => {
          if (!dash.current)
            return;
          const levels = dash.current.getBitrateInfoListFor("video");
          const index = levels.findIndex(
            (level) => levelToPlaybackQuality(level) === quality
          );
          dash.current.updateSettings({
            streaming: {
              abr: {
                autoSwitchBitrate: {
                  video: index === -1
                }
              }
            }
          });
          if (index >= 0) {
            dash.current.setQualityFor("video", index);
          }
          store.getState().emit("playbackQualityChange", { quality });
        }
      }
    });
  }, [store, htmlMediaApi, dashReady]);
  return /* @__PURE__ */ jsx(
    "video",
    {
      className: "h-full w-full",
      ref: videoRef,
      playsInline: true,
      poster: cuedMedia == null ? void 0 : cuedMedia.poster,
      ...htmlMediaEvents
    }
  );
}
const levelToPlaybackQuality = (level) => {
  return level === -1 ? "auto" : `${level.height}p`;
};
export {
  DashProvider as default
};
//# sourceMappingURL=dash-provider-67e2c6bd.mjs.map
