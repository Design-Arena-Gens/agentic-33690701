## AgenticHelper Project

Этот репозиторий содержит:

- **Minecraft-плагин AgenticHelper** — приветствие игроков и ежедневные подарки командой `/agentgift`.
- **Веб-приложение на Next.js** — лендинг с описанием возможностей и прямой ссылкой на скачивание готового JAR файла.

### Быстрый старт

```bash
# Установка зависимостей веб-приложения
cd webapp
npm install

# Запуск режима разработки
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

### Сборка плагина

```bash
cd minecraft-plugin
./build.sh
```

Скрипт загрузит JDK 21 (если он недоступен), скачает `spigot-api` (теневой JAR) и соберёт `build/AgenticHelper.jar`. Готовый артефакт автоматически копируется в `webapp/public/downloads/AgenticHelper.jar` для публикации на сайте.

### Сборка веб-приложения

```bash
cd webapp
npm run build
npm run start
```

### Структура

```
├── minecraft-plugin/   # Исходники плагина и скрипт сборки
├── webapp/             # Next.js приложение для Vercel
└── README.md
```

### Совместимость

- Плагин поддерживает Paper/Spigot 1.20+
- Веб-приложение готово к деплою на Vercel (`npm run build` → `vercel deploy`)
