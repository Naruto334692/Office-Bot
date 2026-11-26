// TODO: move this catalog into @pibot/i18n / remote-contract once shared ownership lands.
// Approval facts, tool names and next-step suggestions use the shared @pibot/i18n translator.
import { approvalsEn, approvalsZh } from "./sections/approvals.ts";
import { baseEn, baseZh } from "./sections/base.ts";
import { browserEn, browserZh } from "./sections/browser.ts";
import { chatEn, chatZh } from "./sections/chat.ts";
import { composeEn, composeZh } from "./sections/compose.ts";
import { controlsEn, controlsZh } from "./sections/controls.ts";
import { devicesEn, devicesZh } from "./sections/devices.ts";
import { endpointsEn, endpointsZh } from "./sections/endpoints.ts";
import { filesEn, filesZh } from "./sections/files.ts";
import { groupPlanEn, groupPlanZh } from "./sections/group-plan.ts";
import { offlineEn, offlineZh } from "./sections/offline.ts";
import { phoneDataEn, phoneDataZh } from "./sections/phone-data.ts";
import { recordsEn, recordsZh } from "./sections/records.ts";
import { redesignEn, redesignZh } from "./sections/redesign.ts";
import { settingsEn, settingsZh } from "./sections/settings.ts";
import { tasksEn, tasksZh } from "./sections/tasks.ts";
import { todosEn, todosZh } from "./sections/todos.ts";
import { mobileRu } from "./sections/russian.ts";

export const nativePermissions = {
  localNetwork:
    "Connect directly to your paired computer on the same Wi-Fi / 与同一 Wi-Fi 下已配对的电脑直接连接",
  // The same camera also takes photos to send in a chat.
  camera:
    "Scan your computer's pairing code and take photos to send to your Bots / 扫描电脑上的配对码，拍照发给 Bot",
  unlock: "Unlock to confirm a sensitive action / 解锁以确认敏感操作",
  photosAdd: "Save images from your conversations to Photos / 把对话里的图片存到相册",
  // Read only after the owner turns on "Photos and videos" for a paired computer.
  // iOS has one photo-library text for both: the picker and Bot reads.
  photos:
    "Pick photos to send to your Bots, and let Bots on your paired computer view photos you allow when you turn this on / 选照片发给 Bot；在你打开开关后，让已配对电脑上的 Bot 查看你允许的照片",
};
export const zh = {
  ...baseZh,
  ...chatZh,
  ...controlsZh,
  ...groupPlanZh,
  ...tasksZh,
  ...approvalsZh,
  ...devicesZh,
  ...endpointsZh,
  ...filesZh,
  ...browserZh,
  ...settingsZh,
  ...phoneDataZh,
  ...recordsZh,
  ...composeZh,
  ...offlineZh,
  ...redesignZh,
  ...todosZh,
};
export type MobileKey = keyof typeof zh;
export const en: Record<MobileKey, string> = {
  ...baseEn,
  ...chatEn,
  ...controlsEn,
  ...groupPlanEn,
  ...tasksEn,
  ...approvalsEn,
  ...devicesEn,
  ...endpointsEn,
  ...filesEn,
  ...browserEn,
  ...settingsEn,
  ...phoneDataEn,
  ...recordsEn,
  ...composeEn,
  ...offlineEn,
  ...redesignEn,
  ...todosEn,
};
export const ru: Record<MobileKey, string> = { ...en, ...mobileRu };
export type TextVars = Record<string, string | number>;
export function formatText(text: string, vars?: TextVars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.hasOwn(vars, name) ? String(vars[name]) : match,
  );
}
