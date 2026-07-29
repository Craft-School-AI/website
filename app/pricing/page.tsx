import type { Metadata } from 'next';
import { Check, Clock, Coins, Flame, Star, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { AskMaster } from '@/components/AskMaster';
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
    duration: '2 недели · 2 спринта · 4 занятия по 1,5 часа',
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
    duration: '3 недели · 3 спринта · 6 занятий по 1,5 часа',
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
    duration: '4 недели · 4 спринта · 8 занятий по 1,5 часа',
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
      <section className="section">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-lg text-center">
              От первой ссылки до бизнеса под ключ
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-ink-soft">
              Учим агентской разработке — на выходе всегда рабочий сайт. Токены
              для практики выдаёт школа.
            </p>
          </Reveal>

          <Reveal>
            <div className="mx-auto mb-10 mt-10 flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-terracotta/40 bg-terracotta/10 px-5 py-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-terracotta">
                <Flame className="h-4 w-4" aria-hidden /> Идёт набор первого потока
              </span>
              <p className="text-sm text-ink-soft">
                Цены ниже, чем будут дальше: первые ученики получают специальную
                стоимость. Со следующих потоков — дороже.
              </p>
            </div>
          </Reveal>

          <div className="grid items-start gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 120} className="relative">
                {plan.highlighted && (
                  <div
                    aria-hidden
                    className="absolute -inset-2 rounded-[2.5rem] bg-terracotta/20 blur-2xl"
                  />
                )}
                <article
                  className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft dark:bg-[#0E0C0C] ${
                    plan.highlighted
                      ? 'border-2 border-terracotta lg:-translate-y-3'
                      : 'border border-ink/10 dark:border-white/10'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-terracotta px-4 py-1 text-xs font-bold uppercase tracking-wider text-ivory">
                      <Star className="h-3.5 w-3.5 fill-ivory" aria-hidden /> Выбор большинства
                    </span>
                  )}
                  <h2 className="heading-md">{plan.name}</h2>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="whitespace-nowrap font-display text-[2.75rem] font-bold leading-none">
                      {plan.price}
                    </span>
                    <span className="whitespace-nowrap text-lg font-semibold text-ink-faint line-through">
                      {plan.oldPrice}
                    </span>
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta">
                    <Flame className="h-3.5 w-3.5" aria-hidden /> Цена первого потока · дальше дороже
                  </p>

                  <div className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm dark:border-white/10">
                    <p className="flex items-center gap-2.5 text-ink-soft">
                      <Clock className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                      {plan.duration}
                    </p>
                    <p className="flex items-center gap-2.5 text-ink-soft">
                      <Users className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                      {plan.format}
                    </p>
                    <p className="flex items-center gap-2.5 font-semibold text-terracotta">
                      <Coins className="h-4 w-4 shrink-0" aria-hidden />
                      {plan.tokens}
                    </p>
                  </div>

                  <p className="mt-6 text-sm text-ink-soft">{plan.description}</p>

                  <p className="mt-4 rounded-xl bg-amber/15 px-4 py-3 text-sm font-semibold">
                    Результат: {plan.result}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-ink/10 pt-6 dark:border-white/10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
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
              <AskMaster className="mt-6" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
