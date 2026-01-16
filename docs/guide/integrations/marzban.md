# Интеграция с Marzban

[Marzban](https://github.com/Gozargah/Marzban) — популярная панель управления прокси-серверами на базе Xray.

## Описание интеграции

SHM автоматически управляет пользователями в Marzban:

- ✅ Создание пользователей при покупке
- ✅ Продление при оплате
- ✅ Блокировка при неоплате
- ✅ Удаление просроченных

## Настройка Marzban

1. Установите Marzban по [официальной документации](https://github.com/Gozargah/Marzban)
2. Создайте API токен в панели Marzban
3. Запишите URL панели и токен

## Настройка сервера в SHM

1. Перейдите в **Настройки** → **Серверы**
2. Добавьте новый сервер:

```yaml
name: "Marzban Server 1"
transport: http
settings:
  url: "https://marzban.example.com"
  token: "your-api-token"
```

## Настройка событий

### Событие CREATE

Шаблон для создания пользователя:

```json
{
  "method": "POST",
  "url": "[% server.settings.url %]/api/user",
  "headers": {
    "Authorization": "Bearer [% server.settings.token %]",
    "Content-Type": "application/json"
  },
  "body": {
    "username": "[% user.login %]_[% us.id %]",
    "proxies": {
      "vless": {}
    },
    "expire": [% us.expire_epoch %],
    "data_limit": [% us.settings.traffic_limit || 0 %]
  }
}
```

### Событие PROLONGATE

```json
{
  "method": "PUT",
  "url": "[% server.settings.url %]/api/user/[% user.login %]_[% us.id %]",
  "headers": {
    "Authorization": "Bearer [% server.settings.token %]",
    "Content-Type": "application/json"
  },
  "body": {
    "expire": [% us.expire_epoch %],
    "status": "active"
  }
}
```

### Событие BLOCK

```json
{
  "method": "PUT",
  "url": "[% server.settings.url %]/api/user/[% user.login %]_[% us.id %]",
  "headers": {
    "Authorization": "Bearer [% server.settings.token %]"
  },
  "body": {
    "status": "disabled"
  }
}
```

### Событие REMOVE

```json
{
  "method": "DELETE",
  "url": "[% server.settings.url %]/api/user/[% user.login %]_[% us.id %]",
  "headers": {
    "Authorization": "Bearer [% server.settings.token %]"
  }
}
```

## Получение ссылки подключения

Создайте шаблон для выдачи конфига пользователю:

```
Ваша ссылка для подключения:

[% server.settings.url %]/sub/[% user.login %]_[% us.id %]
```

## Множество серверов

Для балансировки нагрузки:

1. Добавьте несколько серверов Marzban
2. Объедините их в группу
3. При создании услуги укажите группу

SHM автоматически распределит пользователей.

## Следующие шаги

- [Интеграция с WireGuard](/guide/integrations/wireguard)
- [Telegram бот](/guide/integrations/telegram-bot)
