import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Модули — три спринта',
  description:
    'Три спринта Craft-School.ai: первая страница за неделю, полноценный сайт, запуск и приём заявок. Каждый спринт заканчивается готовым результатом.',
};

const sprints = [
  {
    number: 'Спринт 1',
    duration: '1 неделя',
    title: 'Знакомство с ИИ-станком',
    result: 'Ваша первая страница — в интернете',
    points: [
      'Настраиваем рабочее место: всё нужное — за один вечер',
      'Учимся ставить задачи ИИ-агенту простыми словами',
      'Собираем главную страницу вашего бизнеса: заголовок, услуги, контакты',
      'Публикуем страницу в интернете — с настоящим адресом',
    ],
  },
  {
    number: 'Спринт 2',
    duration: '1 неделя',
    title: 'Сайт целиком',
    result: 'Полноценный сайт с фирменным стилем',
    points: [
      'Добавляем страницы: услуги и цены, о вас, отзывы клиентов',
      'Подбираем цвета и шрифты под характер вашего дела',
      'Делаем сайт удобным на телефоне — там сидит большинство клиентов',
      'Учимся проверять работу агента и просить переделать неудачное',
    ],
  },
  {
    number: 'Спринт 3',
    duration: '1 неделя',
    title: 'Запуск и заявки',
    result: 'Сайт продаёт: заявки приходят вам в мессенджер',
    points: [
      'Подключаем форму заявки — клиенты записываются прямо с сайта',
      'Настраиваем уведомления: новая заявка приходит вам в Telegram',
      'Приводим тексты в порядок: коротко, по делу, продающе',
      'Составляем план: как развивать сайт дальше своими силами',
    ],
  },
];

export default function ModulesPage() {
  return (
    <>
      <PageHero
        tag="Программа"
        title="Три спринта — и сайт работает на вас"
        subtitle="Каждый спринт заканчивается не «пройденной темой», а готовой частью вашего сайта."
      />

      <section className="section">
        <div className="container-page space-y-8">
          {sprints.map((sprint, index) => (
            <Reveal key={sprint.number} delay={index * 100}>
              <article className="card grid gap-6 lg:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-display text-3xl font-bold text-terracotta">
                    {sprint.number}
                  </p>
                  <p className="mt-1 text-sm text-ink-faint">{sprint.duration}</p>
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
              Оставьте заявку — обсудим ваш проект и подберём поток.
            </p>
            <div className="mt-8">
              <Button href="/#zayavka" size="lg">
                Записаться в мастерскую
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
