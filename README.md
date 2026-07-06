# Craft School — сайт цифровой мастерской

Лендинг/корпоративный сайт школы, которая учит предпринимателей делать сайты
своими руками с помощью ИИ-агентов.

**Стек:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · react-hook-form · Telegram Bot API

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Настроить переменные окружения
cp .env.example .env.local
# заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (см. ниже)

# 3. Запустить дев-сервер
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная | Обязательная | Описание |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | да (для формы) | Токен бота, который присылает заявки |
| `TELEGRAM_CHAT_ID` | да (для формы) | ID чата, куда прилетают заявки |
| `NEXT_PUBLIC_SITE_URL` | нет | Публичный URL сайта для SEO/OG (по умолчанию `https://craft-school.ru`) |
| `YANDEX_METRIKA_ID` | нет | ID счётчика Яндекс.Метрики. Без него счётчик и cookie-баннер не подключаются. Метрика загружается только после согласия посетителя в баннере |

Без токенов сайт работает, но форма заявки вернёт ошибку «Форма временно недоступна».

### Настройка Telegram

1. **Создайте бота:** напишите [@BotFather](https://t.me/BotFather) команду `/newbot`,
   задайте имя — получите токен вида `123456789:AAF...`. Это `TELEGRAM_BOT_TOKEN`.
2. **Узнайте свой chat id:** напишите [@userinfobot](https://t.me/userinfobot) —
   он ответит вашим ID. Это `TELEGRAM_CHAT_ID`.
   (Для группового чата: добавьте бота в группу и возьмите ID группы, обычно со знаком `-`.)
3. **Важно:** отправьте своему боту любое сообщение (нажмите Start) — иначе
   Telegram не даст боту писать вам первым.
4. Впишите оба значения в `.env.local` и перезапустите `npm run dev`.

Проверить отправку можно прямо из терминала:

```bash
curl -X POST http://localhost:3000/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест","phone":"+7 900 000-00-00","email":"test@test.ru","comment":"Проверка"}'
```

## Структура проекта

```
app/
  page.tsx            # Главная (Hero, преимущества, для кого, шаги, отзывы, форма)
  program/            # О программе (спринты, для кого)
  modules/            # Модули — 3 спринта
  master/             # О мастере
  pricing/            # Тарифы
  blog/               # Блог + статьи (данные в lib/blog.ts)
  contacts/           # Контакты + форма
  api/lead/route.ts   # Приём заявок → Telegram
  layout.tsx          # Шрифты, метаданные, тема, Header/Footer
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt
components/
  Header.tsx          # Навигация + бургер-меню
  Footer.tsx          # Контакты и соцсети
  LeadForm.tsx        # Форма заявки (react-hook-form)
  Reveal.tsx          # Анимация появления при скролле
  PageHero.tsx        # Шапка внутренних страниц
  ThemeToggle.tsx     # Переключатель светлой/тёмной темы
  ui/Button.tsx       # Кнопка: primary / secondary / outline
  sections/           # Секции главной страницы
hooks/
  useInView.ts        # Intersection Observer
  useTheme.ts         # Светлая/тёмная тема
lib/
  blog.ts             # Данные статей блога
```

## Дизайн-система

Палитра настроена в `tailwind.config.js`:

- `terracotta` — терракотовый `#C67B5A`, основной акцент (кнопки, ссылки)
- `gold` — золотой `#D4A54A`, вторичный акцент
- `ivory` — слоновая кость `#FDF8F0`, фон светлой темы
- `ink` — тёмный `#2A2421`, фон тёмной темы / текст светлой
- `neon` — неоново-зелёный, метки всего, что связано с ИИ

Шрифты: **Playfair Display** (заголовки, с засечками) + **Manrope** (текст),
подключены через `next/font` — без внешних запросов в рантайме.

Тёмная тема: класс `dark` на `<html>`, переключатель в шапке, выбор
запоминается в `localStorage`, по умолчанию — системная настройка.

## Деплой на Vercel

1. Запушьте репозиторий на GitHub/GitLab.
2. На [vercel.com](https://vercel.com) нажмите **Add New → Project** и выберите репозиторий.
   Vercel сам определит Next.js — настройки сборки менять не нужно.
3. В **Settings → Environment Variables** добавьте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SITE_URL` — боевой адрес сайта, например `https://craft-school.ru`
4. Нажмите **Deploy**.

Либо через CLI:

```bash
npm i -g vercel
vercel            # превью-деплой
vercel --prod     # продакшен
```

После привязки своего домена не забудьте обновить `NEXT_PUBLIC_SITE_URL`.

## Команды

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер с горячей перезагрузкой |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск собранного сайта |

## Что заменить перед запуском

- Отзывы на главной (`components/sections/Testimonials.tsx`) — заглушки.
- Ссылки на соцсети в `components/Footer.tsx` и `app/contacts/page.tsx`.
- Цены в `app/pricing/page.tsx`.
- Статьи блога в `lib/blog.ts`.
