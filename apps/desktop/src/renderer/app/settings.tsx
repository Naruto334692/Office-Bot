import { createTranslator, resolveLanguage } from "@pibot/i18n";
import { type NetworkProxyConfig, type Settings, SettingsSchema } from "@pibot/protocol";
import { SettingsContext, useRpc, useRpcEvent } from "@pibot/renderer-kit";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useStartupDisplay } from "./startup-display.tsx";

const appearanceSchema = SettingsSchema.pick({ language: true, theme: true });
const appearanceKey = "pibot.appearance";

function readAppearance(): Pick<Settings, "language" | "theme"> {
  try {
    const parsed = appearanceSchema.safeParse(
      JSON.parse(localStorage.getItem(appearanceKey) ?? "null"),
    );
    if (parsed.success) return parsed.data;
  } catch {
    // Storage can be disabled or contain an old value; settings remain authoritative.
  }
  return { language: "system", theme: "system" };
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { peer } = useRpc();
  const [settings, setSettings] = useState<Settings>();
  // Bumped by every change; a settings.get that started earlier must not overwrite a choice made
  // while it was in flight (the welcome page can change language before the first read returns).
  const writes = useRef(0);
  const [network, setNetwork] = useState<NetworkProxyConfig>();
  const display = useStartupDisplay();
  const initial = display?.snapshot;
  const setReadSettled = display?.setReadSettled;
  const [appearance, setAppearance] = useState(() => {
    const saved = readAppearance();
    // Display-cache theme belongs to its surface; only live settings control the root theme.
    return { language: initial?.language ?? saved.language, theme: saved.theme };
  });
  const applySettings = useCallback((next: Settings) => {
    setSettings(next);
    const appearance = { language: next.language, theme: next.theme };
    setAppearance(appearance);
    try {
      localStorage.setItem(appearanceKey, JSON.stringify(appearance));
    } catch {
      // A cache write failure must not reject a successful settings update.
    }
  }, []);

  useEffect(() => {
    if (!peer) return;
    let active = true;
    const started = writes.current;
    void peer
      .call("settings.get", undefined)
      .then((next) => {
        if (active && writes.current === started) applySettings(next);
      })
      .catch(() => {
        // Release the preview even when settings cannot load; never claim a live settings value.
        if (active)
          console.warn(JSON.stringify({ module: "startup", event: "settings_unavailable" }));
      })
      .finally(() => {
        if (active) setReadSettled?.(true);
      });
    return () => {
      active = false;
    };
  }, [peer, applySettings, setReadSettled]);
  useRpcEvent("settings.changed", applySettings);
  useRpcEvent("network.changed", setNetwork);
  useEffect(() => {
    if (!peer) return;
    let active = true;
    setNetwork(undefined);
    void peer
      .call("network.getConfig", undefined)
      .then((value) => {
        if (active) setNetwork(value);
      })
      .catch(() => {
        /* A disconnected or older brain cannot expose network controls. */
      });
    return () => {
      active = false;
    };
  }, [peer]);

  const update = useCallback(
    async (patch: Partial<Settings>) => {
      if (!peer) return;
      writes.current++;
      // Mac acceptance 2026-11-20: on a busy machine the reply came late, so choosing 中文 on the
      // welcome page changed nothing and the UI switched by itself much later. Language and theme
      // apply at once; a failed save goes back to what the brain actually has.
      if (patch.language !== undefined || patch.theme !== undefined)
        setAppearance((current) => ({
          language: patch.language ?? current.language,
          theme: patch.theme ?? current.theme,
        }));
      try {
        applySettings(await peer.call("settings.set", patch));
      } catch (error) {
        void peer.call("settings.get", undefined).then(applySettings, () => {
          // Disconnected: the next settings.get or settings.changed restores the real values.
        });
        throw error;
      }
    },
    [peer, applySettings],
  );

  const language = resolveLanguage(
    appearance.language,
    display?.systemLocale ?? navigator.language,
  );
  // Display snapshot updates also render this provider. A new translator would restart metadata
  // reads and schedule another snapshot capture every 500 ms even when nothing changed.
  const t = useMemo<ReturnType<typeof createTranslator>>(() => {
    const translate = createTranslator(language);
    return (key, vars) =>
      translate(
        key,
        key === "errors.proxy_unavailable" || key === "errors.proxy_auth_failed"
          ? { address: network?.address ?? translate("network.unknown"), ...vars }
          : vars,
      );
  }, [language, network?.address]);
  useEffect(() => {
    document.documentElement.lang =
      language === "zh" ? "zh-CN" : language === "ru" ? "ru-RU" : "en";
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{ settings, network, update, language, theme: appearance.theme, t }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
