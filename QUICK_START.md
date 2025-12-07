# Быстрый старт для деплоя через nginx

## Локальная подготовка

1. **Установите зависимости:**

   ```bash
   pnpm install
   ```

2. **Соберите проект:**

   ```bash
   pnpm build
   ```

3. **Проверьте результат сборки:**
   ```bash
   ls -la build/
   ```

## Настройка на сервере

### 1. Установите nginx

```bash
sudo apt update && sudo apt install nginx  # Ubuntu/Debian
# или
sudo yum install nginx  # CentOS/RHEL
```

### 2. Создайте директорию для проекта

```bash
sudo mkdir -p /var/www/guitar-mates-sv
sudo chown -R $USER:$USER /var/www/guitar-mates-sv
```

### 3. Загрузите файлы

```bash
# С локального компьютера
scp -r build/* user@your-server:/var/www/guitar-mates-sv/
```

### 4. Настройте nginx

```bash
# Скопируйте конфигурацию
sudo cp nginx.conf.example /etc/nginx/sites-available/guitar-mates-sv

# Отредактируйте под свои нужды
sudo nano /etc/nginx/sites-available/guitar-mates-sv

# Активируйте
sudo ln -s /etc/nginx/sites-available/guitar-mates-sv /etc/nginx/sites-enabled/

# Проверьте конфигурацию
sudo nginx -t

# Перезагрузите
sudo systemctl reload nginx
```

### 5. Установите права доступа

```bash
sudo chown -R www-data:www-data /var/www/guitar-mates-sv
sudo chmod -R 755 /var/www/guitar-mates-sv
```

## Проверка работы

Откройте браузер и перейдите по адресу вашего сервера.

## Обновление проекта

```bash
# Локально
pnpm build

# Загрузите на сервер
scp -r build/* user@your-server:/var/www/guitar-mates-sv/

# Перезагрузите nginx
ssh user@your-server "sudo systemctl reload nginx"
```

## Полезные команды

```bash
# Проверка конфигурации
sudo nginx -t

# Перезагрузка
sudo systemctl reload nginx

# Логи
sudo tail -f /var/log/nginx/guitar-mates-error.log
```

## Документация

- Подробная инструкция: [DEPLOYMENT.md](./DEPLOYMENT.md)
- План изучения nginx: [NGINX_STUDY_PLAN.md](./NGINX_STUDY_PLAN.md)
- Пример конфигурации: [nginx.conf.example](./nginx.conf.example)
