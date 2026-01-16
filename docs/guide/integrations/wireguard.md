# Интеграция с WireGuard

WireGuard — современный, быстрый и безопасный VPN протокол.

## Архитектура

```
SHM ──SSH──> WireGuard Server
              │
              ├── Генерация ключей
              ├── Добавление пиров
              └── Выдача конфигов
```

## Подготовка сервера WireGuard

### Установка

```bash
apt update
apt install wireguard qrencode
```

### Генерация ключей сервера

```bash
wg genkey | tee /etc/wireguard/server.key | wg pubkey > /etc/wireguard/server.pub
```

### Базовый конфиг сервера

`/etc/wireguard/wg0.conf`:

```ini
[Interface]
PrivateKey = СЕРВЕРНЫЙ_ПРИВАТНЫЙ_КЛЮЧ
Address = 10.0.0.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
```

### Запуск

```bash
systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0
```

## Настройка сервера в SHM

```yaml
name: "WireGuard Server 1"
transport: ssh
host: wg.example.com
user: root
settings:
  public_key: "ПУБЛИЧНЫЙ_КЛЮЧ_СЕРВЕРА"
  endpoint: "wg.example.com:51820"
  dns: "1.1.1.1"
  allowed_ips: "0.0.0.0/0"
```

## События услуги

### CREATE — Создание клиента

```bash
#!/bin/bash
# Генерация ключей клиента
CLIENT="[% user.login %]_[% us.id %]"
IP="10.0.0.[% us.id + 10 %]"

wg genkey | tee /etc/wireguard/clients/${CLIENT}.key | \
  wg pubkey > /etc/wireguard/clients/${CLIENT}.pub

PRIVATE_KEY=$(cat /etc/wireguard/clients/${CLIENT}.key)
PUBLIC_KEY=$(cat /etc/wireguard/clients/${CLIENT}.pub)

# Добавление пира на сервер
cat >> /etc/wireguard/wg0.conf << EOF

[Peer]
# ${CLIENT}
PublicKey = ${PUBLIC_KEY}
AllowedIPs = ${IP}/32
EOF

# Применение конфига
wg syncconf wg0 <(wg-quick strip wg0)

# Сохранение данных для SHM
echo "${PRIVATE_KEY}" > /etc/wireguard/clients/${CLIENT}.private
echo "${IP}" > /etc/wireguard/clients/${CLIENT}.ip
```

### REMOVE — Удаление клиента

```bash
#!/bin/bash
CLIENT="[% user.login %]_[% us.id %]"
PUBLIC_KEY=$(cat /etc/wireguard/clients/${CLIENT}.pub)

# Удаление пира
wg set wg0 peer ${PUBLIC_KEY} remove

# Удаление из конфига (более сложная логика)
rm -f /etc/wireguard/clients/${CLIENT}.*
```

## Шаблон конфига клиента

Создайте шаблон для выдачи конфига:

```ini
[Interface]
PrivateKey = [% us.settings.private_key %]
Address = [% us.settings.ip %]/32
DNS = [% server.settings.dns %]

[Peer]
PublicKey = [% server.settings.public_key %]
Endpoint = [% server.settings.endpoint %]
AllowedIPs = [% server.settings.allowed_ips %]
PersistentKeepalive = 25
```

## Выдача QR-кода

Для мобильных клиентов удобно генерировать QR-код:

```bash
qrencode -t PNG -o /var/www/html/configs/${CLIENT}.png < /etc/wireguard/clients/${CLIENT}.conf
```

## Следующие шаги

- [Telegram бот](/guide/integrations/telegram-bot) — для выдачи конфигов
- [Marzban](/guide/integrations/marzban) — альтернативное решение
