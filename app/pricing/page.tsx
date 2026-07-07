import type { Metadata } from 'next';
import { Check, Flame } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Тарифы',
  description:
    'Тарифы Craft School: от лендинга на Vercel до запуска бизнеса под ключ. Цена набора первого потока — со следующих потоков дороже. Токены для практики выдаёт школа.',
};

type Plan = {
  name: string;
  price: string;
  /** Обычная цена (зачёркнута) — со второго потока */
  oldPrice: string;
  duration: string;
  format: string;
  tokens: string;
  description: string;
  result: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

const plans: Plan[] = [
  {
    name: 'Подмастерье',
    price: '19 900 ₽',
    oldPrice: '29 900 ₽',
    duration: '2 недели · 2 спринта · 4 занятия по 1 часу',
    format: 'Группа 2–5 человек, вечерами по будням',
    tokens: 'Токены для агента — бюджет $50',
    description:
      'Первый настоящий сайт своими руками. Учитесь управлять ИИ-агентом и выходите с рабочей ссылкой.',
    result: 'Сайт опубликован на Vercel — готовая ссылка',
    features: [
      'Настройка окружения: VS Code, Git, ИИ-агент',
      'Сборка сайта под ваш бизнес с помощью агента',
      'Тексты, фирменный стиль и wow-анимации',
      'Публикация на Vercel — рабочая ссылка на выходе',
      'Разбор работ и демонстрация в группе',
    ],
    cta: 'Выбрать тариф',
    highlighted: false,
  },
  {
    name: 'Мастер',
    price: '49 000 ₽',
    oldPrice: '69 000 ₽',
    duration: '3 недели · 3 спринта · 6 занятий по 1 часу',
    format: 'Группа 2–5 человек, вечерами по будням',
    tokens: 'Токены для агента — бюджет $100',
    description:
      'Полноценный сайт на своём домене, который принимает заявки. Помогаем довести до настоящего запуска.',
    result: 'Сайт на своём домене принимает заявки в Telegram',
    features: [
      'Всё из тарифа «Подмастерье»',
      'Свой домен: покупка и подключение',
      'Настоящий хостинг и деплой в продакшен',
      'Форма заявок → заявки приходят в Telegram',
      'Аналитика и cookie-баннер',
      'Пакет документов: политика и оферта',
    ],
    cta: 'Выбрать тариф',
    highlighted: true,
  },
  {
    name: 'Цех',
    price: '99 000 ₽',
    oldPrice: '139 000 ₽',
    duration: '4 недели · 4 спринта · 8 занятий по 1 часу',
    format: 'Индивидуально, гибкое время',
    tokens: 'Токены для агента — бюджет $200',
    description:
      'Запуск бизнеса под ключ вместе с мастером. Программа под ваш проект, только вы и наставник.',
    result: 'Готовый к продажам бизнес: сайт, оплата, аналитика',
    features: [
      'Всё из тарифа «Мастер»',
      'Персональная программа под ваш бизнес',
      'Запуск под ключ вместе с мастером',
      'Приём оплаты и онлайн-запись — по потребности',
      'Базовое SEO и цели в аналитике',
      'Месяц поддержки после выпуска',
      'Приоритетные ответы вне очереди',
    ],
    cta: 'Обсудить с мастером',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        tag="Тарифы"
        title="От первой ссылки до бизнеса под ключ"
        subtitle="Учим агентской разработке — на выходе всегда рабочий сайт. Со среднего тарифа помогаем довести проект до настоящего запуска. Токены для практики выдаёт школа."
      />

      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-terracotta/40 bg-terracotta/10 px-5 py-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-terracotta">
                <Flame className="h-4 w-4" aria-hidden /> Идёт набор первого потока
              </span>
              <p className="text-sm text-ink-soft">
                Цены ниже, чем будут дальше: первые ученики получают специальную
                стоимость. Со следующих потоков — дороже.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 120}>
                <article
                  className={`card relative flex h-full flex-col ${
                    plan.highlighted ? 'border-2 border-terracotta shadow-hover' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-4 py-1 text-xs font-bold uppercase tracking-wider text-ivory">
                      Выбор большинства
                    </span>
                  )}
                  <h2 className="heading-md">{plan.name}</h2>

                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg font-semibold text-ink-faint line-through">
                      {plan.oldPrice}
                    </span>
                  </div>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta">
                    <Flame className="h-3.5 w-3.5" aria-hidden /> Цена первого потока · дальше дороже
                  </p>

                  <div className="mt-4 space-y-1.5 text-sm text-ink-faint">
                    <p>{plan.duration}</p>
                    <p>{plan.format}</p>
                    <p className="font-semibold text-amber">{plan.tokens}</p>
                  </div>

                  <p className="mt-4 text-sm text-ink-soft">{plan.description}</p>

                  <p className="mt-4 rounded-xl bg-amber/15 px-3 py-2 text-sm font-semibold">
                    Результат: {plan.result}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      href="/#zayavka"
                      variant={plan.highlighted ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h2 className="heading-md">Токены для агента — за счёт школы</h2>
              <p className="mt-3 text-ink-soft">
                На каждого ученика мы заводим отдельный ключ к ИИ-агенту с
                ограниченным бюджетом ($50 / $100 / $200 по тарифу). Его хватает
                на всё обучение — вам не нужно ничего оплачивать и настраивать
                отдельно. Заодно научим экономно работать с агентом, чтобы после
                курса ваши расходы были копеечными.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card h-full text-center lg:text-left">
              <h2 className="heading-md">Сомневаетесь, какой тариф ваш?</h2>
              <p className="mt-3 text-ink-soft">
                Оставьте заявку — мастер расспросит про ваш бизнес и честно скажет,
                хватит ли группового формата или нужен индивидуальный.
              </p>
              <div className="mt-6">
                <Button href="/#zayavka" size="lg">
                  Получить совет мастера
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
