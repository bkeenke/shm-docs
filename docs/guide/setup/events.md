# События

События — это действия, которые SHM выполняет автоматически при изменении состояния услуги.

## Типы событий

| Событие | Когда срабатывает |
|---------|-------------------|
| `CREATE` | При создании услуги у пользователя |
| `PROLONGATE` | При успешном продлении услуги |
| `BLOCK` | При блокировке за неоплату |
| `REMOVE` | При полном удалении услуги |
| `ACTIVATE` | При разблокировке услуги |

## Настройка события

Для каждого события указывается:

1. **Сервер** — где выполнять команду
2. **Шаблон** — текст команды с переменными
3. **Категория** — тип команды (shell, API и т.д.)

## Переменные в шаблонах

В командах можно использовать переменные Template Toolkit:

```bash
# Данные пользователя
[% user.id %]
[% user.login %]
[% user.name %]
[% user.settings.email %]

# Данные услуги
[% us.id %]
[% us.name %]
[% us.expire %]
```

## Примеры

### Создание VPN аккаунта

```bash
#!/bin/bash
# Событие: CREATE
wg genkey | tee /etc/wireguard/clients/[% user.login %].key | \
wg pubkey > /etc/wireguard/clients/[% user.login %].pub
```

### Отправка уведомления

```bash
# Событие: BLOCK
curl -X POST https://api.telegram.org/bot$TOKEN/sendMessage \
  -d chat_id=[% user.settings.telegram_id %] \
  -d text="Ваша услуга заблокирована. Пополните баланс."
```

### Удаление аккаунта

```bash
# Событие: REMOVE
rm -f /etc/wireguard/clients/[% user.login %].*
wg syncconf wg0 <(wg-quick strip wg0)
```

## Последовательность событий

```
Покупка услуги → CREATE
      ↓
Оплата → PROLONGATE
      ↓
Нет оплаты → BLOCK
      ↓
Оплата → ACTIVATE
      ↓
Истечение → REMOVE
```

## Отладка событий

В логах SHM можно увидеть результат выполнения каждого события:

```bash
docker compose logs -f shm-core
```

## Следующие шаги

- [Настройка серверов](/guide/setup/servers)
- [Работа с шаблонами](/guide/setup/templates)
