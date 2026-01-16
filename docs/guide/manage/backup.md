# Резервное копирование

Регулярное резервное копирование — залог сохранности ваших данных.

## Что нужно бэкапить

1. **База данных MySQL** — все данные SHM
2. **Файл .env** — конфигурация
3. **Шаблоны** (если хранятся локально)

## Резервное копирование базы данных

### Ручной бэкап

```bash
cd /opt/shm

# Создание дампа
docker compose exec mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD shm > backup.sql

# С датой в имени файла
docker compose exec mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD shm > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Автоматический бэкап (cron)

Создайте скрипт `/opt/shm/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/opt/shm/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

cd /opt/shm
docker compose exec -T mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD shm > $BACKUP_DIR/shm_$DATE.sql

# Сжатие
gzip $BACKUP_DIR/shm_$DATE.sql

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: shm_$DATE.sql.gz"
```

Добавьте в cron:

```bash
chmod +x /opt/shm/backup.sh
crontab -e

# Ежедневно в 3:00
0 3 * * * /opt/shm/backup.sh >> /var/log/shm_backup.log 2>&1
```

## Восстановление

### Восстановление базы данных

```bash
cd /opt/shm

# Разархивирование (если сжат)
gunzip backup_20240115.sql.gz

# Восстановление
docker compose exec -T mysql mysql -u root -p$MYSQL_ROOT_PASSWORD shm < backup_20240115.sql
```

### Полное восстановление на новом сервере

1. Установите Docker и Docker Compose
2. Скопируйте файлы:
   - `docker-compose.yml`
   - `.env`
   - Последний бэкап базы
3. Запустите SHM
4. Восстановите базу

```bash
mkdir -p /opt/shm && cd /opt/shm

# Скопируйте файлы...

docker compose up -d
sleep 30  # Дождитесь инициализации MySQL
docker compose exec -T mysql mysql -u root -p$MYSQL_ROOT_PASSWORD shm < backup.sql
```

## Удалённое хранение

Рекомендуется копировать бэкапы на удалённое хранилище:

### S3-совместимое хранилище

```bash
# Установка AWS CLI
apt install awscli

# Загрузка бэкапа
aws s3 cp /opt/shm/backups/shm_latest.sql.gz s3://your-bucket/shm-backups/
```

### rsync на другой сервер

```bash
rsync -avz /opt/shm/backups/ user@backup-server:/backups/shm/
```

## Проверка бэкапов

Регулярно проверяйте работоспособность бэкапов:

1. Разверните тестовое окружение
2. Восстановите последний бэкап
3. Убедитесь, что данные корректны

## Следующие шаги

- [Обновление SHM](/guide/manage/upgrade)
- [Безопасность](/guide/manage/security)
