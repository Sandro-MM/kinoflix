import { jsx } from "react/jsx-runtime";
import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { bN as PlayerStoreContext, bO as usePlayerStore, bP as useHtmlMediaInternalState, bQ as useHtmlMediaEvents, bR as useHtmlMediaApi } from "./user-profile-link-f8f65fb7.mjs";
import Hls from "hls.js";
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
function HlsProvider() {
  const store = useContext(PlayerStoreContext);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const videoRef = useRef(null);
  const htmlMediaState = useHtmlMediaInternalState(videoRef);
  const htmlMediaEvents = useHtmlMediaEvents(htmlMediaState);
  const htmlMediaApi = useHtmlMediaApi(htmlMediaState);
  const hls = useRef();
  const [hlsReady, setHlsReady] = useState(false);
  const destroyHls = useCallback(() => {
    var _a;
    if (hls) {
      (_a = hls.current) == null ? void 0 : _a.destroy();
      hls.current = void 0;
      setHlsReady(false);
    }
  }, []);
  const setupHls = useCallback(() => {
    if (!Hls.isSupported()) {
      store.getState().emit("error", { fatal: true });
      return;
    }
    const hlsInstance = new Hls({
      startLevel: -1
    });
    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hlsInstance.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hlsInstance.recoverMediaError();
            break;
          default:
            destroyHls();
            break;
        }
      }
      store.getState().emit("error", { sourceEvent: data, fatal: data.fatal });
    });
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      var _a;
      if (!((_a = hlsInstance.levels) == null ? void 0 : _a.length))
        return;
      store.getState().emit("playbackQualities", {
        qualities: ["auto", ...hlsInstance.levels.map(levelToPlaybackQuality)]
      });
      store.getState().emit("playbackQualityChange", { quality: "auto" });
    });
    hlsInstance.on(Hls.Events.AUDIO_TRACK_SWITCHED, (eventType, data) => {
      const track = store.getState().audioTracks.find((t) => t.id === data.id);
      if (track) {
        store.getState().emit("currentAudioTrackChange", { trackId: track.id });
      }
    });
    hlsInstance.on(
      Hls.Events.LEVEL_LOADED,
      (eventType, data) => {
        var _a;
        if (!store.getState().providerReady) {
          const { type, live, totalduration: duration } = data.details;
          const inferredStreamType = live ? type === "EVENT" && Number.isFinite(duration) ? "live:dvr" : "live" : "on-demand";
          store.getState().emit("streamTypeChange", {
            streamType: ((_a = store.getState().cuedMedia) == null ? void 0 : _a.streamType) || inferredStreamType
          });
          store.getState().emit("durationChange", { duration });
          const audioTracks = hlsInstance.audioTracks.map(
            (track) => ({
              id: track.id,
              label: track.name,
              language: track.lang || "",
              kind: "main"
            })
          );
          store.getState().emit("audioTracks", { tracks: audioTracks });
        }
      }
    );
    hlsInstance.attachMedia(videoRef.current);
    hls.current = hlsInstance;
    setHlsReady(true);
  }, [destroyHls, store]);
  useEffect(() => {
    setupHls();
    return () => {
      destroyHls();
    };
  }, [setupHls, destroyHls]);
  useEffect(() => {
    if (hls.current && (cuedMedia == null ? void 0 : cuedMedia.src) && hls.current.url !== (cuedMedia == null ? void 0 : cuedMedia.src)) {
      hls.current.loadSource(cuedMedia.src);
    }
  }, [cuedMedia == null ? void 0 : cuedMedia.src, hlsReady]);
  useEffect(() => {
    if (!hlsReady)
      return;
    store.setState({
      providerApi: {
        ...htmlMediaApi,
        setCurrentAudioTrack: (trackId) => {
          if (!hls.current)
            return;
          hls.current.audioTrack = trackId;
        },
        setPlaybackQuality: (quality) => {
          if (!hls.current)
            return;
          hls.current.currentLevel = hls.current.levels.findIndex(
            (level) => levelToPlaybackQuality(level) === quality
          );
          store.getState().emit("playbackQualityChange", { quality });
        }
      }
    });
  }, [htmlMediaApi, store, hlsReady]);
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
  HlsProvider as default
};
//# sourceMappingURL=hls-provider-aa723e8e.mjs.map
