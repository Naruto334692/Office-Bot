import { describe, expect, it } from "vitest";
import { createTranslator, en, resolveLanguage, ru, t, zh } from "./index.ts";

describe("translations", () => {
  it("has exactly the same keys, nonempty text, and interpolation names", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(zh).sort());
    expect(Object.keys(en).sort()).toEqual(Object.keys(ru).sort());
    for (const key of Object.keys(zh) as (keyof typeof zh)[]) {
      expect(zh[key].trim()).not.toBe("");
      expect(en[key].trim()).not.toBe("");
      expect(ru[key].trim()).not.toBe("");
      expect(en[key].match(/\{\w+\}/g)?.sort()).toEqual(zh[key].match(/\{\w+\}/g)?.sort());
      expect(ru[key].match(/\{\w+\}/g)?.sort()).toEqual(en[key].match(/\{\w+\}/g)?.sort());
    }
  });

  it.each([
    ["system", "zh-CN", "zh"],
    ["system", "zh-Hant-TW", "zh"],
    ["system", "ZH_hk", "zh"],
    ["system", "en-US", "en"],
    ["system", "ru-RU", "ru"],
    ["system", "RU", "ru"],
    ["system", "ja-JP", "en"],
    ["system", "", "en"],
    ["zh", "en-US", "zh"],
    ["en", "zh-CN", "en"],
    ["ru", "en-US", "ru"],
  ] as const)("resolves %s with %s to %s", (setting, locale, expected) => {
    expect(resolveLanguage(setting, locale)).toBe(expected);
  });

  it("binds a language without changing another caller", () => {
    const chinese = createTranslator("zh");
    const english = createTranslator("en");
    const russian = createTranslator("ru");
    expect(chinese("tray.quit")).toBe("退出");
    expect(english("tray.quit")).toBe("Quit");
    expect(russian("tray.quit")).toBe("Выйти");
    expect(russian("language.ru")).toBe("Русский");
    expect(russian("welcome.progress", { step: 2, total: 5 })).toBe("Шаг 2 из 5");
    expect(russian("models.testFailed")).toBe("Connection failed: {reason}");
    expect(chinese("welcome.progress", { step: 0, total: 5 })).toBe("第 0 步，共 5 步");
    expect(t("welcome.progress", { step: 2, total: 5 })).toBe("Step 2 of 5");
  });

  it("falls back to the generic form when Russian plural categories are not defined", () => {
    expect(t("receipt.chip.files", { count: 1 }, "ru")).toBe("1 file changed");
    expect(t("receipt.chip.files", { count: 2 }, "ru")).toBe("2 files changed");
    expect(t("receipt.chip.files", { count: 5 }, "ru")).toBe("5 files changed");
  });

  it("preserves missing placeholders and inserts values as plain text", () => {
    expect(t("models.testFailed")).toBe("Connection failed: {reason}");
    expect(t("models.testFailed", { reason: "$& {count} <script>" })).toBe(
      "Connection failed: $& {count} <script>",
    );
  });
});
