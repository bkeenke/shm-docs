# Шаблоны

Шаблоны в SHM используют синтаксис [Template Toolkit](http://www.template-toolkit.org/) — мощный язык шаблонов для Perl.

## Основы синтаксиса

### Переменные

```
[% variable %]
[% user.login %]
[% user.settings.email %]
```

### Условия

```
[% IF user.balance > 0 %]
  Баланс положительный
[% ELSE %]
  Баланс отрицательный
[% END %]
```

### Циклы

```
[% FOREACH service IN user.services %]
  - [% service.name %]: [% service.expire %]
[% END %]
```

## Доступные переменные

### Пользователь (user)

| Переменная | Описание |
|------------|----------|
| `user.id` | ID пользователя |
| `user.login` | Логин |
| `user.name` | Имя |
| `user.balance` | Баланс |
| `user.discount` | Скидка |
| `user.created` | Дата регистрации |
| `user.settings.*` | Дополнительные поля |

### Услуга (us)

| Переменная | Описание |
|------------|----------|
| `us.id` | ID услуги пользователя |
| `us.name` | Название |
| `us.cost` | Стоимость |
| `us.expire` | Дата окончания |
| `us.status` | Статус |
| `us.settings.*` | Настройки услуги |

### Сервер (server)

| Переменная | Описание |
|------------|----------|
| `server.id` | ID сервера |
| `server.name` | Название |
| `server.host` | Хост |

## Встроенные функции

### Форматирование даты

```
[% date.format(user.created, '%d.%m.%Y') %]
```

### Генерация случайных значений

```
[% random(8) %]  # случайная строка 8 символов
[% random(16, 'hex') %]  # hex строка
```

### JSON

```
[% json.encode(data) %]
[% json.decode(string) %]
```

## Примеры шаблонов

### Конфиг WireGuard клиента

```ini
[Interface]
PrivateKey = [% us.settings.private_key %]
Address = [% us.settings.ip %]/32
DNS = 1.1.1.1

[Peer]
PublicKey = [% server.settings.public_key %]
Endpoint = [% server.host %]:51820
AllowedIPs = 0.0.0.0/0
```

### Email уведомление

```html
Здравствуйте, [% user.name %]!

Ваша услуга "[% us.name %]" продлена до [% us.expire %].

Текущий баланс: [% user.balance %] руб.

--
С уважением, Команда SHM
```

### API запрос

```json
{
  "username": "[% user.login %]",
  "expire": "[% us.expire %]",
  "traffic_limit": [% us.settings.traffic_limit || 0 %]
}
```

## Отладка шаблонов

Используйте панель администратора для тестирования шаблонов:

1. Перейдите в **Шаблоны**
2. Выберите шаблон
3. Нажмите **Тест**
4. Выберите пользователя для подстановки данных

## Следующие шаги

- [Настройка платежей](/guide/setup/payments)
- [Интеграция с Telegram](/guide/integrations/telegram-bot)
