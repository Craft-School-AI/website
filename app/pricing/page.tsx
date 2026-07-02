import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Тарифы',
  description:
    'Тарифы Craft-School.ai: обучение в группе, с личным сопровождением мастера или индивидуально. Дешевле одного сайта у подрядчика — навык остаётся навсегда.',
};

const plans = [
  {
    name: 'Подмастерье',
    price: '29 900 ₽',
    description: 'Для самостоятельных: движетесь в группе, опираясь на материалы.',
    features: [
      'Все 3 спринта программы',
      'Общий чат потока с мастером',
      'Еженедельные групповые разборы',
      'Доступ к материалам — 6 месяцев',
    ],
    cta: 'Выбрать тариф',
    highlighted: false,
  },
  {
    name: 'Мастеровой',
    price: '49 900 ₽',
    description: 'Самый популярный: группа плюс личное внимание мастера.',
    features: [
      'Всё из тарифа «Подмастерье»',
      '3 личные встречи с мастером',
      'Проверка вашего сайта после каждого спринта',
      'Помощь с запуском и доменом',
      'Доступ к материалам — навсегда',
    ],
    cta: 'Выбрать тариф',
    highlighted: true,
  },
  {
    name: 'Цех',
    price: '99 900 ₽',
    description: 'Индивидуально: мастер ведёт только вас и ваш проект.',
    features: [
      'Личная программа под ваш бизнес',
      'Встречи с мастером каждую неделю',
      'Разбор любых вопросов без очереди',
      'Месяц поддержки после выпуска',
      'Доступ к материалам — навсегда',
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
        title="Дешевле одного сайта у подрядчика"
        subtitle="Студия возьмёт от 150 000 ₽ за один сайт. Здесь вы за меньшие деньги получаете навык делать сайты всегда."
      />

      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 120}>
              <article
                className={`card relative flex h-full flex-col ${
                  plan.highlighted
                    ? 'border-2 border-terracotta shadow-hover'
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-4 py-1 text-xs font-bold uppercase tracking-wider text-ivory">
                    Выбор большинства
                  </span>
                )}
                <h2 className="heading-md">{plan.name}</h2>
                <p className="mt-3 font-display text-4xl font-bold">{plan.price}</p>
                <p className="mt-3 text-sm text-ink-soft">
                  {plan.description}
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
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal>
            <div className="card mx-auto max-w-3xl text-center">
              <h2 className="heading-md">Сомневаетесь, какой тариф ваш?</h2>
              <p className="mt-3 text-ink-soft">
                Оставьте заявку — мастер расспросит про ваш бизнес и честно скажет,
                хватит ли вам группового формата или нужен индивидуальный.
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
