import { en } from "./en.ts";
import type { TranslationTable } from "./zh.ts";

// Russian is introduced in layers. Untranslated keys deliberately retain the reviewed
// English copy until a complete Russian wording is available; no screen renders a raw key.
const russian = {
  "app.name": "Pi Bot",
  "common.back": "Назад",
  "common.continue": "Продолжить",
  "common.getStarted": "Начать",
  "common.skip": "Пропустить",
  "common.cancel": "Отмена",
  "common.save": "Сохранить",
  "common.delete": "Удалить",
  "common.replace": "Заменить",
  "common.retry": "Повторить",
  "common.loading": "Загрузка…",
  "common.search": "Поиск",
  "common.optional": "Необязательно",
  "common.comingSoon": "Скоро появится",
  "common.unsupported": "Пока не поддерживается на этой платформе",
  "combobox.searchPlaceholder": "Поиск по названию или ID…",
  "combobox.searchCategories": "Поиск по категориям",
  "combobox.noResults": "Подходящих вариантов нет",
  "combobox.moreResults": "Ещё вариантов: {count}. Продолжайте ввод, чтобы сузить список.",
  "datePicker.placeholder.date": "Выберите дату",
  "datePicker.placeholder.datetime": "Выберите дату и время",
  "datePicker.placeholder.time": "Выберите время",
  "datePicker.previousMonth": "Предыдущий месяц",
  "datePicker.nextMonth": "Следующий месяц",
  "datePicker.today": "Сегодня",
  "datePicker.tomorrow": "Завтра",
  "datePicker.nextMonday": "Следующий понедельник",
  "datePicker.clear": "Очистить",
  "datePicker.time": "Время (24-часовой формат)",
  "datePicker.hour": "Часы",
  "datePicker.minute": "Минуты",
  "language.label": "Язык",
  "language.zh": "中文",
  "language.en": "English",
  "language.ru": "Русский",
  "language.system": "Как в системе",
  "language.note": "Меняет язык меню и кнопок. Боты отвечают на языке вашего сообщения.",
  "theme.label": "Оформление",
  "theme.light": "Светлая тема",
  "theme.dark": "Тёмная тема",
  "theme.system": "Как в системе",
  "theme.preview": "Предпросмотр темы: {theme}",
  "welcome.title": "Добро пожаловать в Pi Bot",
  "welcome.subtitle": "Команда ИИ-ботов работает на вашем компьютере",
  "welcome.progress": "Шаг {step} из {total}",
  "welcome.value.team.title": "Команда ботов",
  "welcome.value.team.body":
    "Начните с общения с Pi. Позже вы сможете создавать других ботов и групповые чаты на боковой панели и распределять между ними задачи.",
  "welcome.value.local.title": "На вашем компьютере",
  "welcome.value.local.body":
    "История чатов и настройки остаются на вашем компьютере. При использовании онлайн-модели сообщения отправляются выбранному вами поставщику.",
  "welcome.value.approval.title": "Сначала спрашивает разрешение",
  "welcome.value.approval.body":
    "Доступ к папкам, файлам, командам и веб-страницам регулируется вашими настройками разрешений. При необходимости бот сначала запросит подтверждение.",
  "welcome.model.title": "Какую модель использовать Pi?",
  "welcome.model.subtitle": "Позже это можно изменить в настройках.",
  "welcome.model.route": "Источник модели",
  "welcome.model.recommended": "Рекомендуем · OpenRouter",
  "welcome.model.deepseek": "DeepSeek",
  "welcome.model.deepseekShort":
    "Официальный API: невысокая стоимость и поддержка инструментов. Выбрана модель DeepSeek V4.1 Flash.",
  "welcome.model.deepseekPrivacy":
    "Сообщения отправляются напрямую в DeepSeek, без промежуточного сервиса.",
  "welcome.model.deepseekGetKey": "Получить API-ключ в DeepSeek",
  "welcome.model.openrouter": "OpenRouter",
  "welcome.model.recommendedTag": "Рекомендуем",
  "welcome.model.recommendedNote":
    "Один ключ для многих моделей. Уже выбрана недорогая модель с поддержкой инструментов.",
  "welcome.model.recommendedPrivacy":
    "В OpenRouter есть и бесплатные модели. Сообщения сначала отправляются в OpenRouter, а затем поставщику выбранной модели.",
  "welcome.model.getKey": "Получить API-ключ в OpenRouter",
  "welcome.model.recommendedModel": "Модель: {name}",
  "welcome.model.changeModel": "Сменить модель",
  "welcome.model.local": "Локальная · Ollama",
  "welcome.model.localNote":
    "Полностью автономная работа: модель запускается на этом компьютере, переписка остаётся здесь.",
  "welcome.model.apiKey": "Использовать мой API-ключ",
  "welcome.model.apiKeyNote":
    "Подключите выбранного поставщика моделей. Оплата зависит от использования у поставщика.",
  "welcome.model.openrouterShort":
    "Один ключ для многих моделей; выбрана недорогая модель с поддержкой инструментов.",
  "welcome.model.chatgptNote": "Использовать лимиты вашего плана ChatGPT, API-ключ не нужен.",
  "welcome.model.chatgptBody":
    "Запускайте модели OpenAI в рамках плана ChatGPT: войдите на сайте OpenAI, переписка будет отправляться напрямую в OpenAI и учитываться в лимитах плана. Токен входа хранится в зашифрованном виде только на этом компьютере.",
  "welcome.model.chatgptAfter":
    "После входа выберите модель здесь. Позже её можно сменить или отключить в разделе «Настройки › Модели и API-ключи › Подписки › План ChatGPT».",
  "welcome.model.apiKeyShort": "API-ключ, облачные учётные данные или собственный URL.",
  "welcome.model.chatgptPlans": "Поддерживаемые планы",
  "welcome.model.plan.go": "Go",
  "welcome.model.plan.plus": "Plus",
  "welcome.model.plan.pro": "Pro",
  "welcome.model.plan.business": "Business",
  "welcome.model.proxyToggle": "Нужен прокси? Настроить сетевой прокси",
  "welcome.model.proxyFromError": "Настроить сетевой прокси",
  "welcome.model.proxyHint":
    "В некоторых регионах для доступа к сервисам моделей, например Google и OpenAI, требуется прокси.",
  "welcome.model.detecting": "Поиск Ollama…",
  "welcome.model.detected": "Ollama обнаружена · моделей: {count}",
  "welcome.model.notDetected": "Ollama не обнаружена",
  "welcome.model.installOllama": "Инструкция по установке Ollama",
  "welcome.model.noLocalModels":
    "Ollama запущена, но модели не установлены. Сначала загрузите модель.",
  "welcome.model.detectAgain": "Проверить ещё раз",
  "welcome.computer.title": "Разрешения системы",
  "welcome.computer.body":
    "Разрешите ботам управлять приложениями на этом компьютере. Каждое действие по-прежнему подчиняется вашим настройкам разрешений.",
  "welcome.computer.later": "Не сейчас",
  "welcome.computer.restartHint":
    "Если запись экрана не заработала после выдачи разрешения, перезапустите Pi Bot.",
  "welcome.computer.restart": "Перезапустить Pi Bot",
  "welcome.computer.restartFailed":
    "Не удалось перезапустить Pi Bot. Полностью закройте приложение и откройте его снова.",
  "welcome.pi.title": "Знакомство с главным ботом",
  "welcome.pi.subtitle":
    "Pi — ваш главный бот. Начните с обсуждения своих идей. Позже можно будет создавать других ботов, групповые чаты и расписания на боковой панели.",
  "welcome.pi.hello":
    "Привет! Я Pi. Расскажите, что вы задумали. Мы можем упорядочить идеи, подготовить текст или вместе разобраться с проблемой. Я умею читать и записывать файлы в рабочих папках, запускать команды и открывать веб-страницы. Когда потребуется разрешение, я сначала спрошу вас.",
  "welcome.pi.chat": "Начать чат с Pi",
  "suggestion.plan": "Помоги спланировать мой рабочий день",
  "suggestion.write": "Помоги составить письмо",
  "suggestion.learn": "Объясни понятие простыми словами",
  "suggestion.brainstorm": "Давай вместе придумаем несколько идей",
  "sidebar.chats": "Чаты",
  "sidebar.mainBot": "Главный бот",
  "sidebar.piLabel": "Pi · ваш главный бот",
  "sidebar.settings": "Настройки",
  "startup.cached": "Предыдущий интерфейс (кэш только для чтения)",
  "startup.connecting": "Подключение к фоновой службе…",
  "startup.connectingPhase": "Подключение к фоновой службе… ({step})",
  "startup.startingPhase": "Запуск… ({step})",
  "startup.step.recovery": "восстановление данных",
  "startup.step.network": "подготовка сети",
  "startup.step.capabilities": "подготовка функций",
  "startup.step.services": "подготовка служб",
  "startup.refreshing": "Обновление интерфейса…",
  "startup.readonly":
    "До подключения отправка сообщений, подтверждения и настройки недоступны. Кэшированные сообщения не означают, что они были отправлены.",
  "startup.clearFailed":
    "Не удалось очистить кэш интерфейса; старые предпросмотры могут остаться на диске. Повторите попытку. История запусков не удалялась.",
  "startup.newerData":
    "Эти данные созданы более новой версией Pi Bot и не могут быть открыты этой версией. Обновите Pi Bot и повторите попытку. Не удаляйте данные.",
  "startup.clear": "Очистить кэш интерфейса",
  "startup.clearNote":
    "Удалить локально сохранённые элементы боковой панели и предпросмотры последних сообщений. До следующего запуска сохранение будет приостановлено.",
  "brain.starting": "Запуск фоновой службы…",
  "brain.ready": "Фоновая служба готова",
  "brain.restarting": "Перезапуск фоновой службы…",
  "brain.failed":
    "Не удалось запустить фоновую службу. Экспортируйте журналы и свяжитесь с разработчиком.",
  "chat.hello": "Здравствуйте, я {name}",
  "chat.empty": "Расскажите, что вы задумали, и начнём.",
  "chat.placeholder": "Сообщение для {name}…",
  "chat.send": "Отправить",
  "chat.stop": "Остановить генерацию",
  "chat.generating": "{name} отвечает…",
  "chat.answeredOnPhone": "Ответ отправлен с телефона, пока компьютер был офлайн",
  "chat.activity.waiting": "Ожидание модели · {seconds} с",
  "chat.activity.preparing": "Подготовка {tool} · около {characters} символов · {seconds} с",
  "chat.activity.executing": "Выполняется {tool} · {seconds} с",
  "chat.activity.generatingImage": "Создание изображения · {seconds} с",
  "chat.stopped": "Остановлено. Уже созданный текст сохранён.",
  "chat.stoppedEmpty": "Остановлено.",
  "chat.stoppedPreserved": "Уже созданный текст сохранён.",
  "chat.interrupted": "Прервано ·",
  "chat.resuming": "Продолжение…",
  "chat.resumeFailed":
    "Не удалось продолжить. Обновите страницу и проверьте, доступен ли этот запуск.",
  "chat.resumeUncertain":
    "Запрос на продолжение мог быть получен. Перед повторной попыткой обновите страницу, чтобы не запустить задачу дважды.",
  "chat.inputHint":
    "Enter — отправить, Shift+Enter — новая строка, ↑/↓ в первой или последней строке — история ввода",
  "chat.noModel": "Пока нет доступной модели",
  "chat.goToSettings": "Открыть настройки",
  "chat.checkKey": "Проверить API-ключ",
  "chat.loadEarlier": "Загрузить предыдущие сообщения",
  "chat.loadingHistory": "Загрузка истории чата…",
  "chat.historyError": "Не удалось загрузить историю чата. Повторите попытку.",
  "chat.noMoreHistory": "Вы достигли начала этого чата",
  "chat.you": "Вы",
  "chat.model": "Текущая модель: {model}",
  "chat.thinking": "Уровень рассуждения: {level}",
  "chat.busy":
    "{name} ещё отвечает на ваше предыдущее сообщение. Дождитесь ответа или остановите генерацию.",
  "settings.title": "Настройки",
  "settings.languageTheme": "Язык и оформление",
  "settings.general": "Общие",
  "settings.models": "Модели и API-ключи",
  "settings.browser": "Браузер",
  "settings.browserSection": "Браузер",
  "settings.browserDefault": "Браузер по умолчанию",
  "settings.browserUnknown": "Неизвестно",
  "settings.browserExtension": "Расширение Pi Bot",
  "settings.browserExtensionStatus.connected": "Подключено",
  "settings.browserExtensionStatus.installed": "Установлено, но не подключено",
  "settings.browserExtensionStatus.not_installed": "Не установлено",
  "settings.browserExtensionStatus.unsupported": "Не поддерживается",
  "settings.browserPreference": "Использование браузера",
  "settings.browserPreferenceUser": "Предпочитать ваш браузер (с вашей авторизацией)",
  "settings.browserPreferenceBot": "Использовать только встроенный браузер Pi Bot",
  "settings.startup": "Запуск",
  "settings.openAtLogin": "Запускать при входе в систему",
  "settings.openAtLoginNote":
    "Автоматически запускать Pi Bot после входа в систему на этом компьютере.",
  "settings.showTrayIcon": "Показывать значок в области уведомлений",
  "settings.showTrayIconNote":
    "После закрытия окна Pi Bot продолжит работать в фоне. Откройте его через значок в области уведомлений или строку меню. Для полного выхода используйте команду выхода в меню значка.",
  "settings.about": "О приложении",
  "settings.exportLogs": "Экспортировать журналы",
  "settings.exportLogsNote":
    "Архив содержит очищенные от чувствительных данных журналы, версию, язык и часовой пояс системы, состояние соединения и известных разрешений, а также статусы, коды ошибок и длительность последних 50 запусков и 200 вызовов инструментов. Текст чатов, содержимое файлов, контакты и секреты не включаются. Данные не отправляются автоматически.",
  "settings.exportingLogs": "Экспорт журналов…",
  "settings.logsExported": "Журналы экспортированы",
  "settings.logsExportError": "Не удалось экспортировать журналы. Повторите попытку.",
  "settings.data": "Данные и хранилище",
  "settings.runCleanup": "Очистить старые записи запусков",
  "settings.runCleanupNote":
    "Удаляет события запусков, файлы результатов, файлы сеансов и записи выполнения старше указанного количества дней. Чаты сохраняются; записи аудита хранятся по правилу 90 дней.",
  "settings.runCleanupDays": "Дней",
  "settings.backgroundCommands": "Фоновые команды",
  "settings.backgroundLimit": "Общий лимит времени",
  "settings.backgroundLimitNote":
    "По умолчанию — 120 минут с момента запуска команды. Перевод в фоновый режим не сбрасывает таймер. Изменения сразу применяются к выполняющимся фоновым командам.",
  "settings.backgroundMinutes": "Минут",
  "settings.backgroundLimitInvalid": "Введите целое число от 30 до 1440",
  "settings.backgroundLimitSave": "Сохранить",
  "settings.runCleanupAction": "Очистить",
  "settings.runCleanupConfirm": "Подтвердить очистку",
  "settings.runCleaning": "Очистка…",
  "settings.runCleanupInvalid": "Введите целое число дней от 1 до 36500.",
  "settings.runCleanupError":
    "Не удалось очистить записи запусков. Незавершённая очистка файлов будет повторена при следующем запуске.",
  "settings.runCleanupDone":
    "Очищено: запусков — {runs}, событий — {events}, записей выполнения — {executions}, файлов — {files}.",
  "settings.saveError": "Не удалось сохранить настройки. Повторите попытку.",
  "settings.themeNote": "Светлая, тёмная тема или режим по настройкам системы.",
  "settings.lead.general": "Язык, оформление, запуск и локальные данные.",
  "settings.lead.models": "Встроенные поставщики моделей, локальные модели и собственные шлюзы.",
  "settings.lead.computer":
    "Возможность остановить действия, запретные приложения и срок хранения снимков экрана.",
  "settings.lead.routines":
    "Задачи, запускаемые по расписанию, при изменениях папок или событиях подключений.",
  "settings.moreInfo": "Подробнее",
  "permissions.isolationOn": "Команды выполняются в изолированной среде (включено)",
  "permissions.advanced": "Дополнительно",
  "permissions.advancedSummary": "Пути поиска команд, локальный Docker и SSH-хосты",
  "permissions.advancedSandbox":
    "Строгая изоляция · Команды, всегда выполняемые вне изолированной среды",
  "permissions.edit": "Изменить",
  "permissions.collapse": "Готово",
  "permissions.domains": "Разрешённые сайты",
  "permissions.domainsCount": "Разрешённые сайты · {count}",
  "permissions.sandboxOutsideNone": "Пока нет",
  "permissions.short.strictSandbox":
    "Заблокированная команда не предлагается для запуска вне изолированной среды",
  "permissions.short.yoloUnisolated":
    "Перед включением требуется подтверждение; при выключении каждая команда запрашивает разрешение",
  "errors.no_model":
    "Нет доступной модели. Сначала настройте поставщика в разделе «Настройки» и выберите модель для этого бота.",
  "errors.subscription_unsupported":
    "Вход через подписку временно недоступен. Вместо него используйте API-ключ.",
  "errors.claude_subscription_unsupported":
    "Вход через подписку Claude больше не поддерживается. Используйте API-ключ.",
  "errors.chatgpt_reconnect_required":
    "Вход через подписку временно недоступен. Вместо него используйте API-ключ.",
  "errors.openai_approval_required":
    "Для этого требуется разрешение OpenAI. Вход через подписку пока недоступен, но можно использовать API-ключ OpenAI.",
  "errors.chatgpt_plan_denied":
    "План ChatGPT отклонил запрос: срок действия входа истёк или этот план не поддерживает выбранную модель. Войдите снова в разделе «Настройки › Модели и API-ключи › Подписки › План ChatGPT» или выберите другую модель.",
  "errors.chatgpt_plan_not_eligible":
    "OpenAI сообщает, что этот аккаунт ChatGPT сейчас не может использовать план в других приложениях из-за ограничений аккаунта, рабочего пространства или политики. Повторный вход этого не изменит. Выберите «ChatGPT (вход через Codex)» в разделе «Настройки › Модели и API-ключи › Подписки», другую модель или API-ключ OpenAI.",
  "errors.auth_failed":
    "Ошибка аутентификации. Проверьте правильность и срок действия API-ключа, а также наличие доступа к этой модели.",
  "errors.billing":
    "Недостаточно средств на счёте или нет оплаченной квоты. Пополните баланс у поставщика и повторите попытку.",
  "errors.network":
    "Не удалось подключиться к сервису модели. Проверьте сеть (в некоторых регионах для Google, OpenAI и других сервисов требуется прокси в настройках) или убедитесь, что локальная служба запущена, затем повторите попытку.",
  "errors.rate_limited":
    "Сервис модели временно ограничил частоту запросов. Повторите попытку позже.",
  "errors.provider_error": "Поставщик модели не смог выполнить запрос. Повторите попытку позже.",
  "errors.provider_overloaded":
    "Поставщик модели перегружен или временно недоступен. Повторите попытку позже или выберите другую модель.",
  "errors.provider_rejected":
    "Поставщик модели отклонил запрос: имя модели или параметры не поддерживаются. Повторная отправка не поможет — выберите другую модель или проверьте настройки.",
  "errors.aborted": "Ответ остановлен. Уже созданный текст сохранён.",
  "errors.internal":
    "Произошла внутренняя ошибка. Повторите попытку. Если проблема сохраняется, экспортируйте журналы и свяжитесь с разработчиком.",
  "tray.open": "Открыть Pi Bot",
  "tray.quit": "Выйти",
  "tray.backgroundTitle": "Pi Bot продолжает работать в фоновом режиме",
  "tray.backgroundBody":
    "Откройте Pi Bot через значок в области уведомлений. Для полного выхода выберите соответствующую команду в меню значка.",
} satisfies Partial<TranslationTable>;

export const ru: TranslationTable = { ...en, ...russian };
