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

Заполни значения:

```env
# Учётные данные СДЭК (получить в личном кабинете СДЭК)
CDEK_CLIENT_ID=your_client_id
CDEK_CLIENT_SECRET=your_client_secret
```

> OAuth-токен получается автоматически при старте сервера и обновляется каждые 30 минут.
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
