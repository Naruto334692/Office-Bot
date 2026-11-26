import { en } from "./en.ts";
import { ru } from "./ru.ts";
import { type TranslationKey, zh } from "./zh.ts";

export type { ManagedResourceKey } from "@pibot/workspaces-contract/i18n";
export { en } from "./en.ts";
export { ru } from "./ru.ts";
export { isolationReasonText } from "./isolation.ts";
export { type TranslationKey, type TranslationTable, zh } from "./zh.ts";

export type Language = "zh" | "en" | "ru";
export type LanguageSetting = Language | "system";
export type TranslationVars = Readonly<Record<string, string | number>>;

export function resolveLanguage(setting: LanguageSetting, systemLocale: string): Language {
  if (setting !== "system") return setting;
  const locale = systemLocale.toLowerCase();
  if (locale.startsWith("zh")) return "zh";
  if (locale.startsWith("ru")) return "ru";
  return "en";
}

// Renderer and tray menus can use different translators without shared mutable state.
export function t(key: TranslationKey, vars?: TranslationVars, language: Language = "en"): string {
  const table = { zh, en, ru }[language];
  const hasPluralForms = typeof vars?.count === "number" && Object.hasOwn(table, `${key}.one`);
  const pluralKey = hasPluralForms
    ? `${key}.${new Intl.PluralRules(language).select(vars.count as number)}`
    : key;
  // English fallback strings do not necessarily define Russian's extra plural categories
  // (few / many). Use the catalog's generic form rather than looking up a missing key.
  const templateKey = Object.hasOwn(table, pluralKey)
    ? pluralKey
    : hasPluralForms && Object.hasOwn(table, `${key}.other`)
      ? `${key}.other`
      : key;
  const template = table[templateKey as TranslationKey];
  return template.replace(
    /\{(\w+)\}/g,
    (placeholder: string, name: string, offset: number, whole: string) => {
      if (!vars || !Object.hasOwn(vars, name)) return placeholder;
      const value = String(vars[name]);
      return language === "zh"
        ? spaced(value, whole[offset - 1], whole[offset + placeholder.length])
        : value;
    },
  );
}

const HAN = /\p{Script=Han}/u;
const LATIN = /[A-Za-z0-9]/;
/**
 * Chinese text puts a space between Han characters and Latin letters or digits ("请 OpenCode 审查").
 * Names and numbers arrive through placeholders, so the template cannot hold the space itself:
 * "请{name}审查" must read "请小审审查" and "请 OpenCode 审查" alike.
 */
function spaced(value: string, before: string | undefined, after: string | undefined) {
  const lead = before && HAN.test(before) && LATIN.test(value.charAt(0)) ? " " : "";
  const tail = after && HAN.test(after) && LATIN.test(value.charAt(value.length - 1)) ? " " : "";
  return `${lead}${value}${tail}`;
}

export function createTranslator(language: Language) {
  return (key: TranslationKey, vars?: TranslationVars) => t(key, vars, language);
}

/** Look up only fixed, translated check codes. Never render an unknown code as text. */
export function policyReasonKey(code: string): TranslationKey | undefined {
  const key = `policy.reason.${code}`;
  return Object.hasOwn(zh, key) ? (key as TranslationKey) : undefined;
}

/** Only fixed catalog keys qualify; external error text never becomes a translation key. */
export function failureReasonKey(code: string): TranslationKey | undefined {
  for (const prefix of ["errors.", "connectors.failure.", "remote.status.", "policy.reason."]) {
    const key = `${prefix}${code}`;
    if (Object.hasOwn(zh, key)) return key as TranslationKey;
  }
  return undefined;
}
