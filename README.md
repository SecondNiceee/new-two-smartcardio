# SmartCardio — Next.js App

## Требования

- Node.js >= 18
- pnpm

---

## Установка

```bash
pnpm install
```

---

## Переменные окружения

Создай файл `.env.local` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполни значения (см. `.env.example`).

### PORT и HOST

```env
PORT=3000
HOST=127.0.0.1
```

Порт и хост меняются через эти переменные — в коде ничего трогать не нужно. Скрипты `dev`/`start` подставляют их в флаги `next --port` / `--hostname`. Чтобы сервер принимал подключения извне, укажите `HOST=0.0.0.0`.

### SMTP и SSL

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true        # true = всегда SSL, false = выключить SSL (STARTTLS / plain)
                        # если не задано — SSL включается автоматически при порте 465
SMTP_USER=user@example.com   # опционально: если не задан — open relay без аутентификации
SMTP_PASS=secret             # опционально: если не задан — open relay без аутентификации
SMTP_FROM=sender@example.com # опционально: адрес отправителя письма
                             # если не задан — берётся SMTP_USER, иначе noreply@smartcardio.ru
```

| `SMTP_SECURE` | Поведение |
|---|---|
| не задано | SSL только если `SMTP_PORT=465` |
| `true` | SSL всегда включён |
| `false` | SSL всегда выключен (нужно для STARTTLS или незащищённых серверов) |

| Переменная | Обязательна | Описание |
|---|---|---|
| `SMTP_HOST` | да | Хост SMTP-сервера |
| `SMTP_PORT` | нет (по умолч. 25) | Порт SMTP |
| `SMTP_SECURE` | нет | Принудительно включить/выключить SSL |
| `SMTP_USER` | нет | Логин (без него — open relay) |
| `SMTP_PASS` | нет | Пароль (без него — open relay) |
| `SMTP_FROM` | нет | Email отправителя (без него — SMTP_USER или noreply@smartcardio.ru) |
| `REVIEW_EMAIL_TO` | да | Email, на который приходят отзывы |

### СДЭК

```env
CDEK_BASE_URL=https://lk.smartcardio.ru   # базовый URL прокси (без /cdek/v2)
CDEK_CLIENT_ID=your_client_id
CDEK_CLIENT_SECRET=your_client_secret
```

> OAuth-токен СДЭК получается автоматически при старте сервера и обновляется каждые 30 минут.
> Токен хранится в файле `token.json` в корне проекта (создаётся автоматически, добавлен в `.gitignore`).

---

## Запуск

### Режим разработки

```bash
pnpm dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

### Продакшн-сборка

```bash
pnpm build
pnpm start
```

---

## Как работает интеграция со СДЭК

1. При старте сервера (`instrumentation.ts`) запускается `startTokenRefreshLoop()`.
2. Токен получается через `POST https://api.cdek.ru/v2/oauth/token` и сохраняется в `token.json`.
3. Токен автоматически обновляется каждые 30 минут.
4. Все API-запросы к СДЭК проксируются через `https://lk.smartcardio.ru/cdek/v2`.
5. Клиент никогда не видит токен — всё через серверные API-роуты (`/api/cdek/*`).

---

## Структура API-роутов

| Роут | Описание |
|------|----------|
| `GET /api/cdek/cities?q=` | Автодополнение городов |
| `GET /api/cdek/pvz?city_code=` | Список ПВЗ в городе |
| `POST /api/cdek/calc` | Расчёт стоимости доставки |
| `POST /api/cdek/order` | Создание заказа |
