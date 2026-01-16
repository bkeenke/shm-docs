# Безопасность

Рекомендации по обеспечению безопасности SHM.

## Базовые меры

### Смена паролей по умолчанию

Сразу после установки:

1. Смените пароль администратора SHM
2. Измените пароли MySQL в `.env`
3. Перезапустите контейнеры

```bash
# В файле .env
MYSQL_ROOT_PASSWORD=strong_random_password
MYSQL_PASSWORD=another_strong_password
```

### Firewall

Ограничьте доступ к портам:

```bash
# Разрешить только SSH и HTTP/HTTPS
ufw default deny incoming
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

::: warning Внимание
Порт 8081 (SHM Admin) должен быть доступен только через Nginx!
:::

### SSL/TLS

Всегда используйте HTTPS:

```bash
certbot --nginx -d admin.example.com -d bill.example.com
```

## Защита админ-панели

### Ограничение по IP

В Nginx:

```nginx
location / {
    allow 192.168.1.0/24;  # Ваша сеть
    allow 1.2.3.4;         # Ваш IP
    deny all;

    proxy_pass http://127.0.0.1:8081;
}
```

### HTTP Basic Auth

```bash
# Создание пользователя
htpasswd -c /etc/nginx/.htpasswd admin

# В конфиге Nginx
location / {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://127.0.0.1:8081;
}
```

## Защита API

### API ключи

Для внешних интеграций используйте API ключи вместо логина/пароля.

### Rate Limiting

В Nginx:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://127.0.0.1:8080;
}
```

## Логирование

Включите детальное логирование для аудита:

```bash
# Просмотр логов
docker compose logs -f

# Сохранение логов
docker compose logs > shm_logs_$(date +%Y%m%d).txt
```

## Регулярные обновления

- Обновляйте SHM до последней версии
- Обновляйте хостовую ОС
- Обновляйте Docker

## Чеклист безопасности

- [ ] Пароли изменены с дефолтных
- [ ] SSL сертификаты установлены
- [ ] Firewall настроен
- [ ] Админ-панель защищена
- [ ] Резервное копирование настроено
- [ ] Логирование включено

## Следующие шаги

- [Резервное копирование](/guide/manage/backup)
- [Обновление](/guide/manage/upgrade)
