# Платежные системы

SHM поддерживает множество платёжных систем для приёма оплаты от клиентов.

## Поддерживаемые системы

| Система | Описание |
|---------|----------|
| [YooKassa](/guide/setup/payments#yookassa) | Популярная в России |
| [YooMoney](/guide/setup/payments#yoomoney) | Кошелёк ЮMoney |
| [Tbank](/guide/setup/payments#tbank) | Тинькофф |
| [FreeKassa](/guide/setup/payments#freekassa) | Агрегатор |
| [CryptoCloud](/guide/setup/payments#cryptocloud) | Криптовалюта |
| [Cryptomus](/guide/setup/payments#cryptomus) | Криптовалюта |
| [AAIO](/guide/setup/payments#aaio) | Агрегатор |
| [Heleket](/guide/setup/payments#heleket) | Криптовалюта |

## Общий принцип настройки

1. Зарегистрируйтесь в платёжной системе
2. Получите API ключи
3. Настройте webhook URL: `https://ваш-домен/pay/СИСТЕМА/`
4. Добавьте систему в SHM

## YooKassa {#yookassa}

Одна из самых популярных платёжных систем в России.

### Настройка

1. Зарегистрируйтесь на [yookassa.ru](https://yookassa.ru)
2. Получите `shop_id` и `secret_key`
3. Укажите URL для уведомлений: `https://bill.example.com/pay/yookassa/`

### Конфигурация в SHM

```json
{
  "shop_id": "123456",
  "secret_key": "live_xxxxxxxxxxxxx"
}
```

## Tbank (Тинькофф) {#tbank}

### Настройка

1. Подключите интернет-эквайринг в Тинькофф Бизнес
2. Получите `terminal_key` и `password`

### Конфигурация

```json
{
  "terminal_key": "xxxxxxxxxxxxx",
  "password": "xxxxxxxxxxxxx"
}
```

## CryptoCloud {#cryptocloud}

Приём криптовалюты.

### Настройка

1. Зарегистрируйтесь на [cryptocloud.plus](https://cryptocloud.plus)
2. Создайте магазин
3. Получите API ключ

### Конфигурация

```json
{
  "shop_id": "xxxxx",
  "api_key": "xxxxxxxxxxxxx"
}
```

## Добавление платёжной системы

1. Перейдите в **Настройки** → **Платежные системы**
2. Нажмите **Добавить**
3. Выберите систему из списка
4. Заполните настройки
5. Активируйте

## Webhook и callback

Каждая платёжная система отправляет уведомления о платежах на webhook URL:

```
https://bill.example.com/pay/{system_name}/
```

Убедитесь, что:
- URL доступен из интернета
- SSL сертификат валидный
- Firewall не блокирует запросы

## Тестирование

1. Создайте тестовый платёж
2. Проверьте логи SHM
3. Убедитесь, что баланс пользователя изменился

```bash
docker compose logs -f shm-core | grep payment
```

## Следующие шаги

- [Telegram бот](/guide/integrations/telegram-bot)
- [Настройка уведомлений](/guide/setup/templates)
