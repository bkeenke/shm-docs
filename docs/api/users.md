# Пользователи

API для управления пользователями системы.

## Получение списка

```http
GET /api/v1/users
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| page | int | Номер страницы |
| limit | int | Записей на странице |
| search | string | Поиск по логину/имени |

### Пример

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://your-domain/api/v1/users?page=1&limit=20"
```

### Ответ

```json
{
  "data": [
    {
      "id": 1,
      "login": "user1",
      "name": "Иван Иванов",
      "balance": 500.00,
      "created": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

## Получение пользователя

```http
GET /api/v1/users/{id}
```

### Ответ

```json
{
  "id": 1,
  "login": "user1",
  "name": "Иван Иванов",
  "balance": 500.00,
  "discount": 0,
  "created": "2024-01-15T10:30:00Z",
  "settings": {
    "email": "user@example.com",
    "phone": "+79001234567"
  }
}
```

## Создание пользователя

```http
POST /api/v1/users
```

### Тело запроса

```json
{
  "login": "newuser",
  "password": "secret123",
  "name": "Новый пользователь",
  "settings": {
    "email": "new@example.com"
  }
}
```

### Ответ

```json
{
  "id": 152,
  "login": "newuser",
  "name": "Новый пользователь"
}
```

## Обновление пользователя

```http
PUT /api/v1/users/{id}
```

### Тело запроса

```json
{
  "name": "Обновлённое имя",
  "settings": {
    "email": "updated@example.com"
  }
}
```

## Удаление пользователя

```http
DELETE /api/v1/users/{id}
```

## Баланс пользователя

### Получение баланса

```http
GET /api/v1/users/{id}/balance
```

### Изменение баланса

```http
POST /api/v1/users/{id}/balance
```

```json
{
  "amount": 100.00,
  "comment": "Ручное пополнение"
}
```

## Услуги пользователя

```http
GET /api/v1/users/{id}/services
```

### Ответ

```json
{
  "data": [
    {
      "id": 1,
      "service_id": 5,
      "name": "VPN Basic",
      "status": "active",
      "expire": "2024-02-15T00:00:00Z"
    }
  ]
}
```
