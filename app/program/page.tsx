import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { AskMaster } from '@/components/AskMaster';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'О программе',
  description:
    'Формат спринтов: 2–4 недели практики, в конце каждой недели — готовая часть вашего настоящего сайта. Для предпринимателей без опыта в IT.',
};

const sprintPrinciples = [
  {
    title: 'Неделя — понятный результат',
    text: 'Спринт — это рабочая неделя с конкретной целью: «страница с услугами готова», «форма заявок принимает клиентов». Никаких лекций впрок.',
  },
  {
    title: 'Ваш проект, а не учебный',
    text: 'С первого дня вы работаете над сайтом своего бизнеса. Закончили обучение — получили не сертификат, а работающий инструмент продаж.',
  },
  {
    title: 'Мастер рядом',
    text: 'Небольшие группы, разборы работ, ответы на вопросы в чате. Вы не остаётесь один на один с непонятной ошибкой.',
  },
  {
    title: 'Слова вместо кода',
    text: 'Вы ставите задачи ИИ-агенту обычным языком: «сделай страницу с ценами тёплой и уютной». Агент пишет код — вы принимаете работу.',
  },
];

const fits = [
  'Вы ведёте своё дело: услуги, товары, консультации',
  'Платили подрядчикам и уставали ждать правок неделями',
  'Хотите запускать акции и менять сайт в тот же день, а не «после согласования»',
  'Готовы выделять 5–7 часов в неделю на практику',
];

const notFits = [
  'Хотите стать программистом и писать код руками — это не IT-курс',
  'Ждёте, что сайт сделают за вас — в мастерской работают своими руками',
  'Нужен сложный портал с личными кабинетами на сотни тысяч пользователей',
];

export default function ProgramPage() {
  return (
    <>
      <PageHero
        tag="Формат обучения"
        title={
          <>
            Спринты: короткий путь <br /> от идеи к работающему сайту
          </>
        }
        subtitle="2–4 недели практики. В конце каждой недели — готовая часть вашего настоящего сайта, а не конспект."
      />

      <section className="section">
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
            <h2 className="heading-lg">Посмотрите, из чего состоит обучение</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              От 2 до 4 спринтов — от первой версии сайта на Vercel до запуска
              бизнеса под ключ. Сколько именно — зависит от тарифа.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/modules" size="lg">
                Смотреть модули
              </Button>
              <Button href="/#zayavka" variant="outline" size="lg">
                Оставить заявку
              </Button>
            </div>
            <AskMaster className="mt-6" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
