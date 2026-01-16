# Интеграция с Remnawave

[Remnawave](https://github.com/remnawave/backend) — современная панель управления VPN на базе XRay.

## Описание

SHM интегрируется с Remnawave через REST API для автоматического управления пользователями.

## Настройка

### 1. Установка Remnawave

Следуйте [официальной документации](https://github.com/remnawave/backend) для установки.

### 2. Добавление сервера в SHM

```yaml
name: "Remnawave Server"
transport: http
settings:
  url: "https://remnawave.example.com/api"
  api_key: "your-api-key"
```

### 3. Настройка событий

#### CREATE

```json
{
  "method": "POST",
  "url": "[% server.settings.url %]/users",
  "headers": {
    "X-API-Key": "[% server.settings.api_key %]"
  },
  "body": {
    "username": "[% user.login %]",
    "expire_at": "[% us.expire %]"
  }
}
```

#### PROLONGATE

```json
{
  "method": "PATCH",
  "url": "[% server.settings.url %]/users/[% user.login %]",
  "headers": {
    "X-API-Key": "[% server.settings.api_key %]"
  },
  "body": {
    "expire_at": "[% us.expire %]",
    "enabled": true
  }
}
```

## Следующие шаги

- [Интеграция с WireGuard](/guide/integrations/wireguard)
- [Telegram бот](/guide/integrations/telegram-bot)
