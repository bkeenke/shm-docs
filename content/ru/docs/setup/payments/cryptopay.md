
---
title: Crypto Bot
weight: 1
---

Настройка платежной системы (https://t.me/CryptoBot) или так же известный как (https://t.me/send)

> SHM не умеет конвертировать валюты, поэтому в биллинге следует установить все цены для услуг в той валюте какую указываете в `fiat`

* Валюту для приёма платежа можно выбрать из списка доступнх: `USD`, `EUR`, `RUB`, `BYN`, `UAH`, `GBP`, `CNY`, `KZT`, `UZS`, `GEL`, `TRY`, `AMD`, `THB`, `INR`, `BRL`, `IDR`, `AZN`, `AED`, `PLN` и `ILS`

* Сохраните в [конфиг]({{< ref "/docs/api/config" >}}) SHM следующие данные:
```yaml
{
  "pay_systems": {
    "cryptopay": {
      "api_key":"ВАШ_Секретный_ключ",
      "description":"укажите_наименования_товара_для_чека",
      "fiat":"валюта_USD_EUR_RUB",
      "name":"CryptoPay",
      "paid_btn_name":"openBot",
      "paid_btn_url":"укажите_url_бота_для_возврата_после_удачного_платежа",
      "show_for_client":"true"
    }
  }
}
```

* В телеграм боте (https://t.me/CryptoBot) "Crypto Pay" -> "Мои приложения" -> "Название приложения" -> "Вебхуки" нажмите `включть вебхука`, на сообщение `Пришлите URL` укажите URL для уведомлений вида:

  `https://admin.ВАШ_ДОМЕН/shm/pay_systems/cryptopay.cgi`


Ваш секретный ключ можно посмотреть в "Crypto Pay" -> "Мои приложения" -> "API-токен"

> Если вы хотите попробовать и используете API-токен из Тестового Бота то SHM не сможет обработать платеж.

### Пример ссылки для создания платежа:

`https://admin.ВАШ_ДОМЕН/shm/pay_systems/cryptopay.cgi?action=create&amount=123`

