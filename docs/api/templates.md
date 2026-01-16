# Шаблоны

API для работы с шаблонами.

## Получение списка шаблонов

```http
GET /api/v1/templates
```

### Ответ

```json
{
  "data": [
    {
      "id": 1,
      "name": "vpn_config",
      "title": "Конфиг VPN"
    }
  ]
}
```

## Получение шаблона

```http
GET /api/v1/templates/{id}
```

## Рендеринг шаблона

```http
POST /api/v1/templates/{id}/render
```

### Тело запроса

```json
{
  "user_id": 5,
  "us_id": 10
}
```

### Ответ

```json
{
  "content": "[Interface]\nPrivateKey = xxx\n..."
}
```

## Создание шаблона

```http
POST /api/v1/templates
```

```json
{
  "name": "new_template",
  "title": "Новый шаблон",
  "content": "[% user.login %]"
}
```

## Обновление шаблона

```http
PUT /api/v1/templates/{id}
```

## Удаление шаблона

```http
DELETE /api/v1/templates/{id}
```
