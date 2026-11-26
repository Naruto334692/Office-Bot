import { describe, expect, it } from "vitest";
import { en, formatText, ru, zh } from "./messages.ts";

describe("mobile translations", () => {
  it("keeps every phone message key available in Russian", () => {
    expect(Object.keys(ru).sort()).toEqual(Object.keys(en).sort());
    expect(Object.keys(en).sort()).toEqual(Object.keys(zh).sort());
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      expect(ru[key].trim()).not.toBe("");
      expect(ru[key].match(/\{\w+\}/g)?.sort()).toEqual(en[key].match(/\{\w+\}/g)?.sort());
    }
  });

  it("uses Russian copy for the phone navigation and display settings", () => {
    expect(ru.chat).toBe("Чаты");
    expect(ru.languageTitle).toBe("Язык");
    expect(ru.langRu).toBe("Русский");
    expect(ru.followSystem).toBe("Как в системе");
  });

  it("falls back to English for a section not yet translated", () => {
    expect(ru.offlineEntryTitle).toBe(en.offlineEntryTitle);
  });

  it("formats Russian placeholders without changing the catalog", () => {
    expect(formatText(ru.newMessages, { count: 3 })).toBe("Новых сообщений: 3");
    expect(formatText(ru.homeWaiting, { greet: "Доброе утро", count: 2 })).toBe(
      "Доброе утро, вас ждёт задач: 2",
    );
  });
});
