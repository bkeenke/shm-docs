# API Reference

SHM предоставляет полноценный REST API для интеграции с внешними системами.

## Базовый URL

```
https://your-domain/api/v1/
```

## Аутентификация

SHM поддерживает два способа аутентификации:

### API ключ (рекомендуется)

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-domain/api/v1/users
```

### Basic Auth

```bash
curl -u "login:password" \
  https://your-domain/api/v1/users
```

## Формат ответа

Все ответы возвращаются в формате JSON:

```json
{
  "status": "success",
  "data": { ... }
}
```

При ошибке:

```json
{
  "status": "error",
  "message": "Описание ошибки"
}
```

## HTTP коды

| Код | Описание |
|-----|----------|
| 200 | Успешный запрос |
| 201 | Ресурс создан |
| 400 | Неверный запрос |
| 401 | Не авторизован |
| 403 | Доступ запрещён |
| 404 | Не найдено |
| 500 | Ошибка сервера |

## Пагинация

Для списков используется пагинация:

```
GET /api/v1/users?page=1&limit=20
```

Ответ включает метаданные:

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

## Основные эндпоинты

- [Пользователи](/api/users) — управление пользователями
- [Услуги](/api/services) — управление услугами
- [Платежи](/api/payments) — работа с платежами
- [Шаблоны](/api/templates) — шаблоны и конфиги

## Примеры

### Получение списка пользователей

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://your-domain/api/v1/users
```

### Создание пользователя

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"login": "user1", "name": "Иван Иванов"}' \
  https://your-domain/api/v1/users
```

## Swagger / OpenAPI

Интерактивная документация API доступна по адресу:

```
https://your-domain/api/docs
```
