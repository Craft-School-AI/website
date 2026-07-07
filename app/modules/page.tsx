import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Модули — спринты',
  description:
    'Спринты Craft School: от первой версии сайта и публикации на Vercel до своего домена, приёма заявок и запуска бизнеса под ключ. Каждый спринт — готовый результат.',
};

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
    title: 'Знакомство с ИИ-станком',
    result: 'Первая версия вашего сайта на компьютере',
    tiers: 'Все тарифы',
    points: [
      'Настраиваем рабочее место: всё нужное — за один вечер',
      'Учимся ставить задачи ИИ-агенту простыми словами',
      'Подробно описываем идею — и агент собирает первую версию сайта',
      'Разбираем, как проверять работу агента и просить переделать',
    ],
  },
  {
    number: 'Спринт 2',
    duration: '1 неделя · 2 занятия',
    title: 'Сайт целиком и публикация',
    result: 'Готовый сайт в интернете — рабочая ссылка на Vercel',
    tiers: 'Все тарифы',
    points: [
      'Дорабатываем страницы, тексты и цены под ваш бизнес',
      'Подбираем цвета и шрифты под характер вашего дела',
      'Добавляем wow-эффект: анимации и живые детали',
      'Публикуем сайт на Vercel — на выходе настоящая ссылка',
    ],
  },
  {
    number: 'Спринт 3',
    duration: '1 неделя · 2 занятия',
    title: 'Запуск и заявки',
    result: 'Сайт на своём домене принимает заявки в Telegram',
    tiers: 'Средний и высший тариф',
    points: [
      'Покупаем и подключаем свой домен',
      'Разворачиваем сайт на настоящем хостинге',
      'Подключаем форму — заявки приходят вам в Telegram',
      'Добавляем аналитику, cookie-баннер и документы (политика, оферта)',
    ],
  },
  {
    number: 'Спринт 4',
    duration: '1 неделя · 2 занятия',
    title: 'Бизнес под ключ',
    result: 'Сайт продаёт: оплата, запись, аналитика — под ваш бизнес',
    tiers: 'Только высший тариф',
    points: [
      'Подключаем приём оплаты или онлайн-запись — по потребности',
      'Настраиваем базовое SEO и цели в аналитике',
      'Дорабатываем сайт индивидуально под вашу задачу',
      'Составляем план развития и месяц поддержки после выпуска',
    ],
  },
];

export default function ModulesPage() {
  return (
    <>
      <PageHero
        tag="Программа"
        title="Спринты — от первой ссылки до продаж"
        subtitle="Каждый спринт заканчивается не «пройденной темой», а готовой частью вашего сайта. Сколько спринтов — зависит от тарифа."
      />

      <section className="section">
        <div className="container-page space-y-8">
          {sprints.map((sprint, index) => (
            <Reveal key={sprint.number} delay={index * 100}>
              <article className="card grid gap-6 lg:grid-cols-[240px_1fr]">
                <div>
                  <p className="font-display text-3xl font-bold text-terracotta">
                    {sprint.number}
                  </p>
                  <p className="mt-1 text-sm text-ink-faint">{sprint.duration}</p>
                  <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">
                    {sprint.tiers}
                  </p>
                  <p className="mt-4 inline-block rounded-xl bg-amber/20 px-3 py-2 text-sm font-semibold">
                    Результат: {sprint.result}
                  </p>
                </div>
                <div>
                  <h2 className="heading-md">{sprint.title}</h2>
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
      </section>

      <section className="section bg-surface-soft text-center">
        <div className="container-page">
          <Reveal>
            <h2 className="heading-lg">Готовы встать за станок?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Оставьте заявку — обсудим ваш проект, подберём тариф и поток.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/#zayavka" size="lg">
                Записаться в мастерскую
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                Смотреть тарифы
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
