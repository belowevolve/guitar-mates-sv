# План выполнения ДЗ по nginx

## Этап 1: Теоретическая подготовка

### 1.1. Архитектура веб-сервера

- [ ] Изучить последовательность запуска веб-сервера
- [ ] Понять процессы веб-сервера (main, workers)
- [ ] Изучить цикл работы worker-процессов
- [ ] Познакомиться с модулями веб-сервера
- [ ] Изучить модели обработки сетевых соединений:
  - Блокирующая модель
  - Неблокирующая модель
  - Преимущества и недостатки каждой
- [ ] Понять архитектуру frontend-backend серверов

**Ресурсы:**

- Материалы из таблицы YouTrack
- Видео-лекции Технопарка (лекции 7 и 8)

### 1.2. Принципы работы nginx

- [ ] Задачи, которые решает nginx
- [ ] Области применения nginx
- [ ] Команды управления:
  - Запуск: `nginx` или `systemctl start nginx`
  - Перезагрузка: `nginx -s reload` или `systemctl reload nginx`
  - Остановка: `nginx -s stop` или `systemctl stop nginx`
  - Проверка конфигурации: `nginx -t`
- [ ] Основные файлы:
  - Конфигурационный файл (обычно `/etc/nginx/nginx.conf`)
  - Init-скрипт (`/etc/init.d/nginx` или systemd unit)
  - PID-файл (обычно `/var/run/nginx.pid`)
  - Error log (`/var/log/nginx/error.log`)
  - Access log (`/var/log/nginx/access.log`)
- [ ] Структура конфигурационного файла:
  - Понятие virtual host (server block)
  - Понятие location
  - Директивы:
    - `root` - корневая директория для статических файлов
    - `alias` - алиас для пути (заменяет location в пути)
    - `return` - возврат HTTP кода или редирект
    - `try_files` - попытка найти файл по списку путей
    - `rewrite` - перезапись URL
    - `proxy_pass` - проксирование запросов на другой сервер
- [ ] Виды location и их приоритет:
  1. Точное совпадение (`location = /path`)
  2. Префикс с приоритетом (`location ^~ /path`)
  3. Регулярное выражение (`location ~ /path` или `location ~* /path`)
  4. Обычный префикс (`location /path`)

## Этап 2: Практическая настройка

### 2.1. Установка nginx

- [ ] Установить nginx на сервер:

  ```bash
  # Ubuntu/Debian
  sudo apt update
  sudo apt install nginx

  # CentOS/RHEL
  sudo yum install nginx
  ```

- [ ] Проверить статус: `sudo systemctl status nginx`
- [ ] Убедиться, что nginx запущен и доступен

### 2.2. Базовый сетап проекта

- [x] Проект уже настроен (SvelteKit)
- [ ] Собрать статические файлы: `pnpm build`
- [ ] Проверить структуру директории `build/` после сборки

### 2.3. Настройка раздачи статических файлов по `/static`

- [ ] Создать конфигурацию nginx для раздачи статики
- [ ] Использовать различные виды location:
  - [ ] Строгое совпадение (`location = /static/exact`)
  - [ ] Совпадение по префиксу (`location /static`)
  - [ ] Регулярное выражение (`location ~ \.(jpg|png|gif)$`)
  - [ ] Префикс с приоритетом (`location ^~ /static/priority`)
- [ ] Протестировать приоритеты путей
- [ ] Настроить раздачу различных типов файлов:
  - HTML файлы
  - CSS файлы
  - JavaScript файлы
  - Изображения (jpg, png, svg, etc.)
  - Другие статические ресурсы

### 2.4. Настройка проксирования на API

- [ ] Настроить проксирование через nginx на сторонний API по пути `/api`
- [ ] Пример: проксирование на `api.github.com`
- [ ] Использовать директиву `proxy_pass`
- [ ] Настроить заголовки для проксирования:
  - `proxy_set_header Host`
  - `proxy_set_header X-Real-IP`
  - `proxy_set_header X-Forwarded-For`
  - `proxy_set_header X-Forwarded-Proto`

## Этап 3: Углубленное изучение

### 3.1. Избежание типичных ошибок конфигурации

Изучить статью [Avoiding the Top 10 NGINX Configuration Mistakes](https://www.nginx.com/blog/avoiding-top-10-nginx-configuration-mistakes/)

- [ ] **1. Missing (off) in a redirect**
  - Понять разницу между `return 301` и `return 301 /`
  - Изучить директиву `server_name_in_redirect off`

- [ ] **2. Not using $request_uri in redirects**
  - Понять разницу между `$uri` и `$request_uri`
  - Когда использовать каждый

- [ ] **3. Not using return for redirects**
  - Почему `return` предпочтительнее `rewrite` для редиректов
  - Производительность и читаемость

- [ ] **4. Using if for testing a file**
  - Проблемы с директивой `if`
  - Использование `try_files` вместо `if`

- [ ] **5. Using if as the only directive in a location**
  - Понимание контекста `if`
  - Альтернативные подходы

- [ ] **6. Using $host instead of $server_name**
  - Разница между переменными
  - Когда использовать каждую

- [ ] **7. Not setting client_max_body_size**
  - Проблемы с загрузкой больших файлов
  - Настройка лимитов

- [ ] **8. Not setting proxy_buffering off**
  - Когда отключать буферизацию
  - Влияние на streaming

- [ ] **9. Not setting proxy_bind**
  - Проблемы с несколькими сетевыми интерфейсами
  - Настройка исходящих соединений

- [ ] **10. Not setting proxy_ignore_headers**
  - Управление заголовками от upstream сервера
  - Когда игнорировать заголовки

### 3.2. Ловушки и частые ошибки

Изучить статью [Pitfalls and Common Mistakes](https://web.archive.org/web/20240514122031/https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/)

- [ ] **File Descriptors (FD)**
  - Что такое file descriptors
  - Настройка `worker_connections` и `worker_rlimit_nofile`
  - Формула: `worker_connections * 2 < worker_rlimit_nofile`

- [ ] **Keepalive connections**
  - Что такое keepalive
  - Настройка `keepalive_timeout`
  - Настройка `keepalive_requests`
  - Keepalive для upstream (`keepalive` в upstream блоке)

- [ ] **Upstream**
  - Что такое upstream
  - Настройка балансировки нагрузки
  - Health checks
  - Различные методы балансировки (round-robin, least_conn, ip_hash)

- [ ] **Buffering**
  - `proxy_buffering`
  - `proxy_buffer_size`
  - `proxy_buffers`
  - Когда отключать буферизацию

- [ ] **SSL/TLS**
  - Настройка SSL сертификатов
  - Протоколы и шифры
  - OCSP stapling

- [ ] **Gzip compression**
  - Настройка сжатия
  - Типы файлов для сжатия
  - Уровни сжатия

- [ ] **Caching**
  - Кэширование статических файлов
  - Кэширование проксированных ответов
  - Настройка заголовков кэширования

- [ ] **Security headers**
  - X-Frame-Options
  - X-Content-Type-Options
  - X-XSS-Protection
  - Content-Security-Policy

## Этап 4: Практическое применение

### 4.1. Оптимизация конфигурации

- [ ] Применить знания из этапа 3 к конфигурации проекта
- [ ] Настроить правильные лимиты (file descriptors, body size)
- [ ] Настроить keepalive соединения
- [ ] Оптимизировать буферизацию
- [ ] Настроить кэширование статических файлов
- [ ] Добавить security headers

### 4.2. Тестирование

- [ ] Протестировать все location блоки
- [ ] Проверить приоритеты location
- [ ] Протестировать проксирование
- [ ] Проверить логи (access.log, error.log)
- [ ] Протестировать производительность

### 4.3. Документация

- [ ] Задокументировать конфигурацию
- [ ] Описать назначение каждого блока
- [ ] Создать инструкцию по деплою

## Полезные команды для работы с nginx

```bash
# Проверка конфигурации
sudo nginx -t

# Перезагрузка конфигурации (без остановки)
sudo nginx -s reload
# или
sudo systemctl reload nginx

# Полная перезагрузка
sudo systemctl restart nginx

# Остановка
sudo systemctl stop nginx

# Запуск
sudo systemctl start nginx

# Просмотр логов в реальном времени
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Проверка статуса
sudo systemctl status nginx

# Проверка открытых портов
sudo netstat -tlnp | grep nginx
# или
sudo ss -tlnp | grep nginx
```

## Полезные ресурсы

- [Официальная документация nginx](https://nginx.org/en/docs/)
- [NGINX Blog](https://www.nginx.com/blog/)
- [Avoiding Top 10 NGINX Configuration Mistakes](https://www.nginx.com/blog/avoiding-top-10-nginx-configuration-mistakes/)
- [Pitfalls and Common Mistakes](https://web.archive.org/web/20240514122031/https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/)
- Видео-лекции Технопарка (лекции 7 и 8)
