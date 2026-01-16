# SHM Documentation

Документация для SHM (Simple Hosting Manager) — универсальной биллинговой системы с действиями по событиям.

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшн
npm run build

# Предпросмотр сборки
npm run preview
```

## Структура

```
docs/
├── .vitepress/
│   ├── config.mts      # Конфигурация VitePress
│   └── theme/          # Кастомная тема
├── guide/              # Документация (RU)
├── api/                # API Reference (RU)
├── en/                 # English version
│   ├── guide/
│   └── api/
└── public/             # Статические файлы
```

## Добавление страниц

1. Создайте `.md` файл в нужной директории
2. Добавьте ссылку в `config.mts` в соответствующий sidebar

## Деплой

Документация автоматически собирается и деплоится при пуше в main.

## Технологии

- [VitePress](https://vitepress.dev/) — генератор статических сайтов
- [Vue 3](https://vuejs.org/) — фреймворк для кастомизации
- [Markdown](https://www.markdownguide.org/) — формат контента
