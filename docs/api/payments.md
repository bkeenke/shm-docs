# Платежи

API для работы с платежами.

## Получение списка платежей

```http
GET /api/v1/payments
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| user_id | int | Фильтр по пользователю |
| status | string | Статус платежа |
| from | date | Дата от |
| to | date | Дата до |

### Ответ

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 5,
      "amount": 500.00,
      "status": "completed",
      "pay_system": "yookassa",
      "created": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Создание платежа

```http
POST /api/v1/payments
```

```json
{
  "user_id": 5,
  "amount": 500.00,
  "pay_system": "yookassa"
}
```

### Ответ

```json
{
  "id": 123,
  "payment_url": "https://yookassa.ru/pay/..."
}
```

## Получение платежа

```http
GET /api/v1/payments/{id}
```

## Ручное подтверждение

```http
POST /api/v1/payments/{id}/confirm
```
