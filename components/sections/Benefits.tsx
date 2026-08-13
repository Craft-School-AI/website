import { Reveal } from '@/components/Reveal';
import { BenefitScene } from '@/components/BenefitScene';

type Benefit = {
  title: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    title: 'Сайт за 2 часа вместо 2 месяцев',
    text: 'ИИ-агент собирает страницы, пока вы пьёте кофе. Вы задаёте цель и проверяете результат — как мастер за станком.',
  },
  {
    title: 'Без найма программистов',
    text: 'Студия возьмёт от 150 000 ₽ за сайт и ещё столько же за правки. Вы делаете то же самое сами — навсегда.',
  },
  {
    title: 'Полный контроль над результатом',
    text: 'Захотели поменять цену, фото или акцию — меняете за минуты. Никаких «подрядчик пропал» и «правки через неделю».',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="section scroll-mt-24 bg-surface-soft">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Что вы получите</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 120}>
              <article className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border-[3px] border-ink bg-surface-soft shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_rgb(var(--brand-terracotta))]">
                {/* Нарисованная сцена как фон */}
                <BenefitScene
                  variant={index}
                  className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Светлый скрим снизу — держит контраст текста поверх рисунка */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-surface-soft via-surface-soft/85 to-transparent"
                  aria-hidden
                />

                {/* Номер-ярлык встык к краю */}
                <span className="absolute left-0 top-0 bg-terracotta px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ivory">
                  0{index + 1}
                </span>

                {/* Текст поверх картинки */}
                <div className="relative z-10 p-6">
                  <h3 className="heading-md text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">
                    {benefit.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
