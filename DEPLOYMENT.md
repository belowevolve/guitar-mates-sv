# Инструкция по деплою проекта через nginx

## Предварительные требования

- Сервер с установленным Linux (Ubuntu/Debian или CentOS/RHEL)
- Доступ по SSH к серверу
- Установленный nginx
- Node.js и pnpm (для сборки проекта)

## Шаг 1: Подготовка проекта к сборке

### 1.1. Убедитесь, что проект настроен для статической сборки

Проект уже настроен с использованием `@sveltejs/adapter-static`. Проверьте файл `svelte.config.js`.

### 1.2. Соберите проект локально (для тестирования)

```bash
# Установите зависимости
pnpm install

# Соберите проект
pnpm build

# Проверьте результат сборки
ls -la build/
```

После сборки в директории `build/` будут находиться все статические файлы для деплоя.

## Шаг 2: Установка nginx на сервер

### 2.1. Установка nginx

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install nginx
```

**CentOS/RHEL:**

```bash
sudo yum install nginx
# или для новых версий
sudo dnf install nginx
```

### 2.2. Проверка установки

```bash
# Проверьте статус
sudo systemctl status nginx

# Запустите nginx (если не запущен)
sudo systemctl start nginx

# Включите автозапуск при загрузке системы
sudo systemctl enable nginx
```

### 2.3. Проверка работы

Откройте браузер и перейдите по адресу вашего сервера. Вы должны увидеть страницу приветствия nginx.

## Шаг 3: Загрузка файлов на сервер

### 3.1. Создайте директорию для проекта

```bash
sudo mkdir -p /var/www/guitar-mates-sv
sudo chown -R $USER:$USER /var/www/guitar-mates-sv
```

### 3.2. Загрузите собранные файлы

**Вариант 1: Использование SCP**

```bash
# С вашего локального компьютера
scp -r build/* user@your-server:/var/www/guitar-mates-sv/
```

**Вариант 2: Использование rsync**

```bash
rsync -avz build/ user@your-server:/var/www/guitar-mates-sv/
```

**Вариант 3: Использование Git (если build в gitignore)**

```bash
# На сервере
cd /var/www/guitar-mates-sv
git clone your-repo-url .
pnpm install
pnpm build
```

### 3.3. Установите правильные права доступа

```bash
sudo chown -R www-data:www-data /var/www/guitar-mates-sv
sudo chmod -R 755 /var/www/guitar-mates-sv
```

## Шаг 4: Настройка nginx

### 4.1. Создайте конфигурационный файл

```bash
sudo nano /etc/nginx/sites-available/guitar-mates-sv
```

Скопируйте содержимое из файла `nginx.conf.example` в этот файл и настройте под ваши нужды:

- Замените `server_name localhost;` на ваш домен
- Проверьте пути к директориям
- Настройте пути для проксирования API (если нужно)

### 4.2. Активируйте конфигурацию

```bash
# Создайте символическую ссылку
sudo ln -s /etc/nginx/sites-available/guitar-mates-sv /etc/nginx/sites-enabled/

# Удалите дефолтную конфигурацию (опционально)
sudo rm /etc/nginx/sites-enabled/default
```

### 4.3. Проверьте конфигурацию

```bash
# Проверка синтаксиса
sudo nginx -t

# Если есть ошибки, исправьте их и повторите проверку
```

### 4.4. Перезагрузите nginx

```bash
# Перезагрузка конфигурации (без остановки сервера)
sudo systemctl reload nginx

# Или полная перезагрузка
sudo systemctl restart nginx
```

## Шаг 5: Настройка файрвола (если используется)

### 5.1. UFW (Ubuntu)

```bash
sudo ufw allow 'Nginx Full'
# или только HTTP
sudo ufw allow 'Nginx HTTP'
# или только HTTPS
sudo ufw allow 'Nginx HTTPS'
```

### 5.2. firewalld (CentOS/RHEL)

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Шаг 6: Проверка работы

1. Откройте браузер и перейдите по адресу вашего сервера
2. Проверьте, что сайт загружается корректно
3. Проверьте различные страницы и маршруты
4. Проверьте работу API проксирования (если настроено)

## Шаг 7: Настройка SSL (опционально, но рекомендуется)

### 7.1. Установка Certbot

**Ubuntu/Debian:**

```bash
sudo apt install certbot python3-certbot-nginx
```

**CentOS/RHEL:**

```bash
sudo yum install certbot python3-certbot-nginx
```

### 7.2. Получение сертификата

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Certbot автоматически настроит SSL и обновит конфигурацию nginx.

### 7.3. Автоматическое обновление сертификата

Certbot автоматически настроит cron для обновления сертификатов. Проверить можно командой:

```bash
sudo certbot renew --dry-run
```

## Шаг 8: Мониторинг и логи

### 8.1. Просмотр логов доступа

```bash
sudo tail -f /var/log/nginx/guitar-mates-access.log
```

### 8.2. Просмотр логов ошибок

```bash
sudo tail -f /var/log/nginx/guitar-mates-error.log
```

### 8.3. Общие логи nginx

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Обновление проекта

При обновлении проекта:

1. Соберите проект локально: `pnpm build`
2. Загрузите новые файлы на сервер
3. Проверьте конфигурацию nginx: `sudo nginx -t`
4. Перезагрузите nginx: `sudo systemctl reload nginx`

## Автоматизация деплоя (опционально)

Можно создать скрипт для автоматизации деплоя:

```bash
#!/bin/bash
# deploy.sh

echo "Building project..."
pnpm build

echo "Uploading files..."
rsync -avz --delete build/ user@your-server:/var/www/guitar-mates-sv/

echo "Reloading nginx..."
ssh user@your-server "sudo systemctl reload nginx"

echo "Deployment complete!"
```

Сделайте скрипт исполняемым:

```bash
chmod +x deploy.sh
```

## Устранение проблем

### Проблема: 502 Bad Gateway

- Проверьте, что nginx запущен: `sudo systemctl status nginx`
- Проверьте логи ошибок: `sudo tail -f /var/log/nginx/error.log`
- Проверьте права доступа к файлам

### Проблема: 403 Forbidden

- Проверьте права доступа: `ls -la /var/www/guitar-mates-sv`
- Убедитесь, что nginx имеет права на чтение файлов
- Проверьте, что index.html существует

### Проблема: Страница не обновляется

- Очистите кэш браузера
- Проверьте настройки кэширования в nginx
- Убедитесь, что файлы действительно обновились на сервере

### Проблема: API проксирование не работает

- Проверьте логи nginx
- Убедитесь, что upstream сервер доступен
- Проверьте настройки proxy_pass и rewrite

## Полезные команды

```bash
# Проверка конфигурации
sudo nginx -t

# Перезагрузка конфигурации
sudo systemctl reload nginx

# Полная перезагрузка
sudo systemctl restart nginx

# Остановка
sudo systemctl stop nginx

# Запуск
sudo systemctl start nginx

# Статус
sudo systemctl status nginx

# Просмотр активных соединений
sudo netstat -tlnp | grep nginx
```

## Дополнительные ресурсы

- [Официальная документация nginx](https://nginx.org/en/docs/)
- [SvelteKit адаптеры](https://svelte.dev/docs/kit/adapters)
- [Let's Encrypt](https://letsencrypt.org/)
