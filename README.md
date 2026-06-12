# SmartCardio — Next.js App

## Требования

- Node.js >= 18
- npm / yarn / pnpm

---

## Установка

```bash
npm install
```

---

## Переменные окружения

Создай файл `.env.local` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполни значения (см. `.env.example`).

### PORT

```env
PORT=3000
```

Сервер по умолчанию слушает только `127.0.0.1` (localhost). Менять значение порта достаточно через эту переменную — в коде ничего трогать не нужно.

### SMTP и SSL

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true   # true = всегда SSL, false = выключить SSL (STARTTLS / plain)
                   # если не задано — SSL включается автоматически при порте 465
SMTP_USER=user@example.com
SMTP_PASS=secret
```

| `SMTP_SECURE` | Поведение |
|---|---|
| не задано | SSL только если `SMTP_PORT=465` |
| `true` | SSL всегда включён |
| `false` | SSL всегда выключен (нужно для STARTTLS или незащищённых серверов) |

> OAuth-токен СДЭК получается автоматически при старте сервера и обновляется каждые 30 минут.
> Токен хранится в файле `token.json` в корне проекта (создаётся автоматически).

---

## Запуск

### Режим разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

### Продакшн-сборка

```bash
npm run build
npm run start
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
