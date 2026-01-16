# Аутентификация

## API ключ

Рекомендуемый способ аутентификации для интеграций.

### Создание ключа

1. Войдите в админ-панель
2. Перейдите в **Настройки** → **API ключи**
3. Нажмите **Создать ключ**
4. Сохраните ключ (отображается только один раз!)

### Использование

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-domain/api/v1/users
```

## Session Auth

Для веб-интерфейсов используется session-based аутентификация.

### Логин

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"login": "admin", "password": "secret"}' \
  -c cookies.txt \
  https://your-domain/api/v1/auth/login
```

### Использование сессии

```bash
curl -b cookies.txt \
  https://your-domain/api/v1/users
```

### Выход

```bash
curl -X POST \
  -b cookies.txt \
  https://your-domain/api/v1/auth/logout
```

## Права доступа

Разные API ключи могут иметь разные права:

| Право | Описание |
|-------|----------|
| `read` | Только чтение |
| `write` | Чтение и запись |
| `admin` | Полный доступ |
