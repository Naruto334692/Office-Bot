import { File, Paths } from "expo-file-system";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { z } from "zod";

/**
 * Language and appearance chosen on the phone, like the computer's settings. They live in a
 * small file rather than the SQLite cache because the very first frame (and the headless push
 * task) needs them before the runtime has opened its database, and a synchronous read keeps the
 * app from flashing the system theme first.
 */
const DisplaySchema = z.object({
  language: z.enum(["system", "zh", "en", "ru"]).catch("system"),
  appearance: z.enum(["system", "light", "dark"]).catch("system"),
});
export type DisplayPrefs = z.infer<typeof DisplaySchema>;
const DEFAULT: DisplayPrefs = { language: "system", appearance: "system" };
const prefsFile = () => new File(Paths.document, "display.json");

export function readDisplayPrefs(): DisplayPrefs {
  try {
    const file = prefsFile();
    if (!file.exists) return DEFAULT;
    return DisplaySchema.parse(JSON.parse(file.textSync()));
  } catch {
    // A damaged or unreadable file only costs the choice; following the system is always valid.
    return DEFAULT;
  }
}
function writeDisplayPrefs(prefs: DisplayPrefs) {
  const file = prefsFile();
  if (!file.exists) file.create({ intermediates: true });
  file.writeSync(JSON.stringify(prefs));
}

interface DisplayValue {
  prefs: DisplayPrefs;
  /** The applied appearance, after resolving "system". */
  scheme: "light" | "dark";
  update: (patch: Partial<DisplayPrefs>) => void;
  /** Set when the last choice could not be saved; it still applies until the app restarts. */
  saveFailed: boolean;
}
const Context = createContext<DisplayValue | null>(null);

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState(readDisplayPrefs);
  const [saveFailed, setSaveFailed] = useState(false);
  const system = useColorScheme();
  const scheme =
    prefs.appearance === "system" ? (system === "dark" ? "dark" : "light") : prefs.appearance;
  const value = useMemo<DisplayValue>(
    () => ({
      prefs,
      scheme,
      saveFailed,
      update(patch) {
        const next = { ...prefs, ...patch };
        setPrefs(next);
        try {
          writeDisplayPrefs(next);
          setSaveFailed(false);
        } catch {
          setSaveFailed(true);
        }
      },
    }),
    [prefs, scheme, saveFailed],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
/** Outside the provider (never in the app tree) the system settings apply. */
export function useDisplay(): DisplayValue {
  const value = useContext(Context);
  const system = useColorScheme();
  return (
    value ?? {
      prefs: DEFAULT,
      scheme: system === "dark" ? "dark" : "light",
      saveFailed: false,
      update: () => undefined,
    }
  );
}
