import type { Metadata } from 'next';
import { CalendarDays, Check, Clock, Users, Video, X, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { AskMaster } from '@/components/AskMaster';
import { Button } from '@/components/ui/Button';
import { getCohorts } from '@/lib/cohorts';

export const metadata: Metadata = {
  title: 'Программа обучения',
  description:
    'Программа Craft School: занятия по вторникам и четвергам в 20:00 МСК, два занятия в неделю по 1,5 часа, группа 2–5 человек. Спринты от первой версии сайта до запуска бизнеса под ключ.',
};

type FormatFact = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const formatFacts: FormatFact[] = [
  {
    icon: CalendarDays,
    title: 'Вторник и четверг, 20:00 МСК',
    text: 'Новый поток стартует в первый вторник месяца. Обучение занимает от 2 до 4 недель, в зависимости от тарифа.',
  },
  {
    icon: Clock,
    title: 'Два занятия в неделю по 1,5 часа',
    text: 'Три часа в неделю вечером, чтобы занятия не выпадали из рабочего дня.',
  },
  {
    icon: Users,
    title: 'Группа 2–5 человек',
    text: 'Преподаватель успевает разобрать работу каждого. На тарифе «Индивидуальный» занятия идут один на один в удобное вам время.',
  },
  {
    icon: Video,
    title: 'Занятия в Zoom, запись остаётся у вас',
    text: 'Пропустили встречу, посмотрите запись и догоните группу к следующему занятию.',
  },
];

const sprintPrinciples = [
  {
    title: 'Неделя, понятный результат',
    text: 'Спринт это рабочая неделя с конкретной целью: страница с услугами готова, форма заявок принимает клиентов. Никаких лекций впрок.',
  },
  {
    title: 'Ваш проект, а не учебный',
    text: 'С первого дня вы работаете над сайтом своего бизнеса. В конце обучения у вас на руках работающий инструмент продаж, а не сертификат.',
  },
  {
    title: 'Преподаватель рядом',
    text: 'Небольшие группы, разборы работ, ответы на вопросы в чате между занятиями. Вы не остаётесь один на один с непонятной ошибкой.',
  },
  {
    title: 'Слова вместо кода',
    text: 'Вы ставите задачи ИИ-агенту обычным языком: «сделай страницу с ценами тёплой и уютной». Агент пишет код, вы принимаете работу.',
  },
];

type Sprint = {
  number: string;
  duration: string;
  title: string;
  result: string;
  tiers: string;
  points: string[];
};

const sprints: Sprint[] = [
  {
    number: 'Спринт 1',
    duration: '1 неделя · 2 занятия',
    title: 'Знакомство с ИИ-агентом',
    result: 'Первая версия вашего сайта на компьютере',
    tiers: 'Все тарифы',
    points: [
      'Настраиваем рабочее место: всё нужное за один вечер',
      'Учимся ставить задачи ИИ-агенту простыми словами',
      'Подробно описываем идею, и агент собирает первую версию сайта',
      'Разбираем, как проверять работу агента и просить переделать',
    ],
  },
  {
    number: 'Спринт 2',
    duration: '1 неделя · 2 занятия',
    title: 'Сайт целиком и публикация',
    result: 'Готовый сайт в интернете: рабочая ссылка на Vercel',
    tiers: 'Все тарифы',
    points: [
      'Дорабатываем страницы, тексты и цены под ваш бизнес',
      'Подбираем цвета и шрифты под характер вашего дела',
      'Добавляем анимации и живые детали',
      'Публикуем сайт на Vercel, на выходе настоящая ссылка',
    ],
  },
  {
    number: 'Спринт 3',
    duration: '1 неделя · 2 занятия',
    title: 'Запуск и заявки',
    result: 'Сайт на своём домене принимает заявки в Telegram',
    tiers: 'Тарифы «Стандарт» и «Индивидуальный»',
    points: [
      'Покупаем и подключаем свой домен',
      'Разворачиваем сайт на настоящем хостинге',
      'Подключаем форму, заявки приходят вам в Telegram',
      'Добавляем аналитику, cookie-баннер и документы (политика, оферта)',
    ],
  },
  {
    number: 'Спринт 4',
    duration: '1 неделя · 2 занятия',
    title: 'Бизнес под ключ',
    result: 'Сайт продаёт: оплата, запись и аналитика под ваш бизнес',
    tiers: 'Только тариф «Индивидуальный»',
    points: [
      'Подключаем приём оплаты или онлайн-запись, по потребности',
      'Настраиваем базовое SEO и цели в аналитике',
      'Дорабатываем сайт индивидуально под вашу задачу',
      'Составляем план развития и месяц поддержки после выпуска',
    ],
  },
];

const fits = [
  'Вы ведёте своё дело: услуги, товары, консультации',
  'Платили подрядчикам и уставали ждать правок неделями',
  'Хотите запускать акции и менять сайт в тот же день, а не «после согласования»',
  'Готовы выделять 3 часа в неделю: два занятия по 1,5 часа',
];

const notFits = [
  'Хотите стать программистом и писать код руками: это не IT-курс',
  'Ждёте, что сайт сделают за вас: в мастерской работают своими руками',
  'Нужен сложный портал с личными кабинетами на сотни тысяч пользователей',
];

export default function ProgramPage() {
  const [nextCohort] = getCohorts();

  return (
    <>
      <PageHero
        tag="Программа обучения"
        title={
          <>
            От первой версии сайта <br /> до запуска бизнеса
          </>
        }
        subtitle="Обучение идёт спринтами: каждая неделя заканчивается готовой частью вашего настоящего сайта. Сколько спринтов, зависит от тарифа."
      />

      <section className="section">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center">Формат и расписание</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
              Занятия идут онлайн, небольшими группами, на вашем реальном
              проекте. Опыт в IT не нужен.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {formatFacts.map((fact, index) => (
              <Reveal key={fact.title} delay={index * 100}>
                <article className="card flex h-full items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-amber/20 text-terracotta">
                    <fact.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="heading-md">{fact.title}</h3>
                    <p className="mt-2 text-ink-soft">{fact.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {nextCohort && (
            <Reveal delay={200}>
              <div className="card mt-6 flex flex-col items-center gap-4 border-l-4 border-l-terracotta text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-terracotta">
                    Ближайший поток
                  </p>
                  <p className="heading-md mt-2">
                    {nextCohort.monthLabel}, старт {nextCohort.startLabel}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Первые занятия: {nextCohort.sessions.join(' · ')} и дальше по
                    вторникам и четвергам.
                  </p>
                </div>
                <Button href="/schedule" variant="outline">
                  Все потоки и даты
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center">Что такое спринт</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {sprintPrinciples.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 100}>
                <article className="card h-full">
                  <h3 className="heading-md">{principle.title}</h3>
                  <p className="mt-3 text-ink-soft">{principle.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg text-center">Из чего состоит обучение</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
              От 2 до 4 спринтов: первая версия сайта, публикация, свой домен с
              заявками и запуск под ключ. Набор спринтов зависит от тарифа.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {sprints.map((sprint, index) => (
              <Reveal key={sprint.number} delay={index * 100}>
                <article className="card grid gap-6 lg:grid-cols-[240px_1fr]">
                  <div>
                    <p className="font-display text-3xl font-bold text-terracotta">
                      {sprint.number}
                    </p>
                    <p className="mt-1 text-sm text-ink-faint">{sprint.duration}</p>
                    <p className="mt-3 inline-block rounded-none border border-line px-3 py-1 text-xs font-semibold text-ink-soft">
                      {sprint.tiers}
                    </p>
                    <p className="mt-4 inline-block rounded-none bg-amber/20 px-3 py-2 text-sm font-semibold">
                      Результат: {sprint.result}
                    </p>
                  </div>
                  <div>
                    <h3 className="heading-md">{sprint.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {sprint.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-ink-soft">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full border-l-4 border-l-green">
              <h2 className="heading-md">Вам подойдёт, если</h2>
              <ul className="mt-4 space-y-3">
                {fits.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card h-full border-l-4 border-l-terracotta">
              <h2 className="heading-md">Честно: не подойдёт, если</h2>
              <ul className="mt-4 space-y-3">
                {notFits.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-ink-soft">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section text-center">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg">Готовы освоить ИИ-агента?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Оставьте заявку, обсудим ваш проект, подберём тариф и поток.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/#zayavka" size="lg">
                Записаться в мастерскую
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                Смотреть тарифы
              </Button>
            </div>
            <AskMaster className="mt-6" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
