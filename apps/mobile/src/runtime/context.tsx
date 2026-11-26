import { createTranslator, resolveLanguage } from "@pibot/i18n";
import { useLocales } from "expo-localization";
import { addNetworkStateListener, getIpAddressAsync, getNetworkStateAsync } from "expo-network";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AppState, Button, Platform, Text, View } from "react-native";
import { en, formatText, type MobileKey, type TextVars, ru, zh } from "../i18n/messages.ts";
import { androidEn, androidZh } from "../i18n/sections/android.ts";
import { androidRu } from "../i18n/sections/russian.ts";
import { useDisplay } from "../theme/display.tsx";
import { useTheme } from "../theme/use-theme.ts";
import { mobileOwner } from "./bootstrap.ts";
import type { MobileRuntime, MobileSnapshot } from "./runtime.ts";

const Context = createContext<MobileRuntime | null>(null);
/** The phone's own choice, or the system language when it follows the system. */
export function useLanguage() {
  const locales = useLocales();
  return resolveLanguage(useDisplay().prefs.language, locales[0]?.languageTag ?? "en");
}
export function useText() {
  const language = useLanguage();
  const android =
    Platform.OS === "android"
      ? language === "zh"
        ? androidZh
        : language === "ru"
          ? androidRu
          : androidEn
      : {};
  const table = language === "zh" ? zh : language === "ru" ? ru : en;
  return (key: MobileKey, vars?: TextVars) => formatText(android[key] ?? table[key], vars);
}
export function useStatusText() {
  const t = useText();
  const keys: Record<string, MobileKey> = {
    open: "runWaiting",
    paused: "runWaiting",
    queued: "runQueued",
    running: "runRunning",
    waiting: "runWaiting",
    done: "runDone",
    error: "runFailed",
    failed: "runFailed",
    aborted: "runStopped",
    interrupted: "runInterrupted",
    stopping: "runStopping",
    scheduled: "runScheduled",
    missed: "runMissed",
    cancelled: "runCancelled",
    skipped: "runSkipped",
    expired: "runExpired",
  };
  return (status: string) => t(keys[status] ?? "status");
}
export function useSharedText() {
  return createTranslator(useLanguage());
}
export function useRuntime() {
  const value = useContext(Context);
  if (!value) throw new Error("mobile_runtime_unavailable");
  return value;
}
/**
 * The whole snapshot: re-renders on every runtime change (each session publish, upload progress
 * tick, outbox count). Screens mounted for long — providers, the chat page, list rows — read
 * through useMobileSelector or useLinkState instead.
 */
export function useMobile() {
  const runtime = useRuntime();
  return useSyncExternalStore(runtime.subscribe, runtime.getSnapshot, runtime.getSnapshot);
}
function shallowEqual(a: unknown, b: unknown) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
  const left = a as Record<string, unknown>,
    right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every((key) => Object.hasOwn(right, key) && Object.is(left[key], right[key]));
}
/**
 * Part of the snapshot; the component re-renders only when that part changes (shallowly), so a
 * reconnect attempt that republishes the same "offline" or an upload tick no longer re-renders
 * every screen and provider (2026-11-14 phone profile: 53 slow UI frames).
 */
export function useMobileSelector<T>(select: (snapshot: MobileSnapshot) => T): T {
  const runtime = useRuntime();
  const cache = useRef<{ snapshot: MobileSnapshot; select: unknown; value: T } | undefined>(
    undefined,
  );
  const read = () => {
    const snapshot = runtime.getSnapshot();
    const previous = cache.current;
    if (previous && previous.snapshot === snapshot && previous.select === select)
      return previous.value;
    const next = select(snapshot);
    // Keep the old reference for an equal value: useSyncExternalStore then skips the render.
    const value = previous && shallowEqual(previous.value, next) ? previous.value : next;
    cache.current = { snapshot, select, value };
    return value;
  };
  return useSyncExternalStore(runtime.subscribe, read, read);
}
/** The link fields most screens read; named so declaration emit stays small. */
export type LinkState = Pick<
  MobileSnapshot,
  "selectedId" | "peer" | "status" | "reconnecting" | "refreshVersion"
>;
const linkFields = (s: MobileSnapshot): LinkState => ({
  selectedId: s.selectedId,
  peer: s.peer,
  status: s.status,
  reconnecting: s.reconnecting,
  refreshVersion: s.refreshVersion,
});
/** What most screens need: the selected computer, its business peer and the link status. */
export function useLinkState(): LinkState {
  return useMobileSelector(linkFields);
}
export function MobileProvider({ children }: { children: ReactNode }) {
  const t = useText();
  const language = useLanguage();
  // The runtime outlives language switches; the service notice reads the current one.
  const languageRef = useRef(language);
  languageRef.current = language;
  const { styles, colors } = useTheme();
  const [retry, setRetry] = useState(0);
  const [runtime, setRuntime] = useState<MobileRuntime>();
  const [error, setError] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: explicit retry recreates the failed native owner.
  useEffect(() => {
    setError(false);
    let disposed = false;
    let current: MobileRuntime | undefined;
    let released = false;
    const release = async () => {
      if (!current || released) return;
      released = true;
      await mobileOwner.release();
    };
    const boot = async () => {
      current = await mobileOwner.acquire(() => languageRef.current);
      if (disposed) {
        await release();
        return;
      }
      await current.setForeground(AppState.currentState === "active");
      current.setLanguage(languageRef.current);
      if (!disposed) setRuntime(current);
      else await release();
    };
    void boot().catch(async () => {
      try {
        await release();
      } catch {
        /* Failed initialization remains unavailable; never publish a partial runtime. */
      }
      if (!disposed) setError(true);
    });
    const listener = AppState.addEventListener("change", (state) => {
      // Native biometric/permission sheets cause inactive without entering the background.
      if (state !== "active" && state !== "background") return;
      void current?.setForeground(state === "active").catch(() => {
        if (!disposed) setError(true);
      });
      // A change while the OS froze the app may have produced no event: compare once on return.
      // Only a different key rebuilds the link (B3: every return used to rebuild a healthy one).
      if (state === "active") checkNetwork(true);
    });
    // Native network events also cover Wi-Fi-to-Wi-Fi changes with the same connectivity flags.
    // One change arrives as a burst (Wi-Fi, then a VPN TUN re-attaching): each event used to cut
    // the link again, three "connection_failed" in the same second on the owner's phone.
    let settle: ReturnType<typeof setTimeout> | undefined;
    // Maintainers 2026-11-12 "一会连接，一会离线": Android also reports signal, cellular-type and
    // reachability changes as network events, and every one cut a working link (5 times in four
    // minutes). Only a different network (type, connected, address) rebuilds the link now.
    const networkKey = async () => {
      const state = await getNetworkStateAsync();
      const address = await getIpAddressAsync().catch(() => "");
      return `${state.type}|${state.isConnected ? 1 : 0}|${address}`;
    };
    let lastNetwork: string | undefined;
    void networkKey()
      .then((key) => {
        lastNetwork ??= key;
      })
      .catch(() => {
        // Unknown until the first event; that event then counts as a change.
      });
    /** `resume`: no event behind it, so an unreadable network is not taken for a change. */
    const checkNetwork = (resume = false) => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        void networkKey()
          .catch(() => undefined)
          .then((key) => {
            if (disposed || (key === undefined ? resume : key === lastNetwork)) return;
            lastNetwork = key;
            return current?.networkChanged();
          })
          .catch(() => {
            if (!disposed) setError(true);
          });
      }, 800);
    };
    const network = addNetworkStateListener(() => checkNetwork());
    return () => {
      disposed = true;
      clearTimeout(settle);
      listener.remove();
      network.remove();
      void release().catch(() => {
        /* Unmounted UI cannot report; no raw native error is logged. */
      });
    };
  }, [retry]);
  useEffect(() => {
    runtime?.setLanguage(language);
  }, [runtime, language]);
  if (!runtime)
    return (
      <View style={[styles.page, styles.content]}>
        <Text style={styles.text}>{t(error ? "storageError" : "loading")}</Text>
        {error && (
          <Button
            title={t("reconnect")}
            color={colors.accent}
            onPress={() => setRetry((value) => value + 1)}
          />
        )}
      </View>
    );
  return <Context.Provider value={runtime}>{children}</Context.Provider>;
}
