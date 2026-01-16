# Услуги

API для управления услугами.

## Получение списка услуг

```http
GET /api/v1/services
```

### Ответ

```json
{
  "data": [
    {
      "id": 1,
      "name": "VPN Basic",
      "cost": 100.00,
      "period": 30,
      "group_id": 1
    }
  ]
}
```

## Получение услуги

```http
GET /api/v1/services/{id}
```

## Создание услуги

```http
POST /api/v1/services
```

```json
{
  "name": "VPN Premium",
  "cost": 500.00,
  "period": 30,
  "group_id": 1
}
```

## Услуги пользователей

### Добавление услуги пользователю

```http
POST /api/v1/users/{user_id}/services
```

```json
{
  "service_id": 1
}
```

### Продление услуги

```http
POST /api/v1/user-services/{id}/prolong
```

### Отмена услуги

```http
DELETE /api/v1/user-services/{id}
```
