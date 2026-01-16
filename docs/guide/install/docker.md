# Установка через Docker

> Прежде чем начать, убедитесь, что на вашем сервере запущен демон синхронизации времени (NTP)

## Почему Docker?

### Плюсы

- ✅ **Простота** — SHM очень просто запустить и крайне легко обновлять
- ✅ **Безопасность** — контейнеризация изолирует SHM от вашей системы
- ✅ **Надежность** — обновления системы не затронут работу SHM
- ✅ **Совместимость** — любые другие программы на сервере не помешают SHM
- ✅ **Кроссплатформенность** — работает на любой ОС с Docker (Linux, Mac, Windows)
- ✅ **Ресурсы** - Docker позволяет ограничивать потребляемые ресурсы контейнеров.
- ✅ **Переносимость** - SHM легко перенести на другой сервер. Достаточно только сделать backup базы данных и импортировать его на новом сервере.
- ✅ **Kubernetes** — SHM прекрасно работает в k8s для промышленных масштабов.
- ✅ **Современность** - В наши дни почти весь серверный софт запускают в контейнерах, по выше описанным причинам.


### Минусы

- ❌ Необходимо установить Docker на сервер

## Установка базовых пакетов

```bash
apt update
apt install curl nginx certbot python3-certbot-nginx
```

## Установка Docker

```bash
curl -sL https://get.docker.com | bash
```

## Запуск SHM

Создайте рабочую директорию и перейдите в неё:

```bash
mkdir -p /opt/shm && cd /opt/shm
```

Скачайте файлы конфигурации:

```bash
curl -sO https://raw.githubusercontent.com/danuk/shm/master/docker-compose.yml
curl -sO https://raw.githubusercontent.com/danuk/shm/master/.env
```

::: tip Настройка
В файле `.env` вы можете изменить:
- Пароли для базы данных
- Временную зону (важно: после первого запуска менять нельзя!)
:::

Запустите SHM:

```bash
docker compose up -d
```

## Проверка

SHM будет доступен по адресу: `http://АДРЕС_СЕРВЕРА:8081`

- **Логин:** `admin`
- **Пароль:** `admin`

## Настройка Nginx и SSL

### DNS записи

Настройте DNS вашего домена:

```
admin  IN A  ПУБЛИЧНЫЙ_IP_ВАШЕГО_СЕРВЕРА
bill   IN A  ПУБЛИЧНЫЙ_IP_ВАШЕГО_СЕРВЕРА
```

### Конфигурация Nginx

Создайте файл `/etc/nginx/sites-available/admin.conf`:

```nginx
server {
    listen 80;
    server_name admin.ваш-домен.ru;

    location / {
        proxy_pass         http://127.0.0.1:8081;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```
Создайте файл `/etc/nginx/sites-available/client.conf`:

```nginx
server {
    listen 80;
    server_name client.ваш-домен.ru;

    location / {
        proxy_pass         http://127.0.0.1:8081;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

Включите ваши сайты:

```bash
ln -s /etc/nginx/sites-available/admin.conf /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/client.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Получение SSL сертификата

```bash
certbot --nginx -d admin.ваш-домен.ru -d client.ваш-домен.ru
```

### Проверьте, что всё работает:

SHM будет доступен по адресу: `http://admin.ваш-домен.ru`

- **Логин:** `admin`
- **Пароль:** `admin`

::: danger Важно!
Сразу после первого входа смените пароль администратора!
:::
