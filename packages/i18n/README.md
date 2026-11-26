# @pibot/i18n

纯 TypeScript 字符串表，无 React、Electron 或浏览器依赖。`zh` 定义扁平键集合；`en` 通过 `satisfies TranslationTable` 同时拒绝缺键和多键。

```ts
import { createTranslator, resolveLanguage, t } from "@pibot/i18n";

const language = resolveLanguage("system", "zh-CN");
const translate = createTranslator(language);
translate("welcome.progress", { step: 1, total: 5 });
// 第 1 步，共 5 步

t("tray.quit"); // Quit：不指定语言时默认英文
t("tray.quit", undefined, "zh"); // 退出
```

`resolveLanguage(setting, systemLocale)`：显式 `zh` / `en` / `ru` 优先；`system` 下以 `zh` 开头的系统语言用中文，以 `ru` 开头的系统语言用俄语，其他用英文。俄语采用渐进式翻译：已审核的俄语文案优先，尚未翻译的键暂时回退到英文。调用方负责获取系统 locale，并在设置或系统语言变化后重建 translator。这里没有可变的全局语言，renderer 和 main 的托盘菜单可以各自绑定当前语言。

`t(key, vars?, language?)` 与绑定后的 `translate(key, vars?)` 支持 `{name}` 插值，值为字符串或数字。缺少变量时保留占位符，不递归解释插入的值；返回普通文本，由 React 等显示层负责转义，不用于拼接 HTML。

文案覆盖首版界面及错误码：欢迎页五步、四个开场建议、侧栏、私聊、通用设置、模型与密钥、自定义厂商、后台服务状态、托盘菜单。尚未支持的能力明确标成后续版本，不写自动更新或多 Bot 已可用之类的承诺。

手机端仍维护独立目录 `apps/mobile/src/i18n/sections/`。当前 `ru` 已覆盖手机导航、连接状态、聊天列表与消息、显示设置、Bot 和群组设置；其余条目先回退英文。Android 的生物识别与锁屏确认文案在同一俄语目录中单独覆盖。
