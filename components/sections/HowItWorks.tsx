import { Reveal } from '@/components/Reveal';

const steps = [
  {
    number: '01',
    title: 'Выбираете цель',
    text: 'Определяем вместе с мастером, какой сайт нужен вашему бизнесу: визитка, витрина или магазин.',
  },
  {
    number: '02',
    title: 'Осваиваете ИИ-станок',
    text: 'На первом спринте вы учитесь ставить задачи ИИ-агенту простыми словами — и он собирает страницы за вас.',
  },
  {
    number: '03',
    title: 'Собираете свой сайт',
    text: 'Каждую неделю — готовый кусок вашего настоящего сайта. Не учебный проект, а рабочий инструмент.',
  },
  {
    number: '04',
    title: 'Запускаете и растёте',
    text: 'Публикуем сайт в интернете, подключаем приём заявок. Дальше вы меняете и дополняете его сами.',
  },
];

export function HowItWorks() {
  return (
    <section className="section bg-surface-deep">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Как это работает</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Формат спринтов: короткие недельные этапы с понятным результатом в конце каждого.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 120}>
              <li className="h-full rounded-2xl border border-line bg-surface/70 p-6">
                <span className="font-display text-4xl font-bold text-amber">
                  {step.number}
                </span>
                <h3 className="heading-md mt-4">{step.title}</h3>
                <p className="mt-3 text-sm text-ink-soft">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
