# Обновление SHM

## Docker

### Стандартное обновление

```bash
cd /opt/shm

# Получение новых образов
docker compose pull

# Перезапуск с новыми образами
docker compose up -d
```

### Проверка версии

```bash
docker compose exec shm-core cat /app/VERSION
```

## Резервное копирование перед обновлением

::: danger Важно!
Всегда делайте бэкап базы данных перед обновлением!
:::

```bash
# Создание бэкапа
docker compose exec mysql mysqldump -u root -p shm > backup_$(date +%Y%m%d).sql
```

## Откат

Если что-то пошло не так:

```bash
# Остановка
docker compose down

# Указание конкретной версии в docker-compose.yml
# image: danuk/shm:v1.2.3

# Восстановление базы
docker compose up -d mysql
docker compose exec -T mysql mysql -u root -p shm < backup_YYYYMMDD.sql

# Запуск
docker compose up -d
```

## Kubernetes

```bash
helm repo update
helm upgrade shm shm/k8s-shm --namespace shm
```

## Changelog

Список изменений доступен в [GitHub Releases](https://github.com/danuk/shm/releases).

## Следующие шаги

- [Безопасность](/guide/manage/security)
- [Резервное копирование](/guide/manage/backup)
