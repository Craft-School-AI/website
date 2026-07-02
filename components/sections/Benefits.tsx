import { Target, Wallet, Zap, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Сайт за 2 часа вместо 2 месяцев',
    text: 'ИИ-агент собирает страницы, пока вы пьёте кофе. Вы задаёте цель и проверяете результат — как мастер за станком.',
  },
  {
    icon: Wallet,
    title: 'Без найма программистов',
    text: 'Студия возьмёт от 150 000 ₽ за сайт и ещё столько же за правки. Вы делаете то же самое сами — навсегда.',
  },
  {
    icon: Target,
    title: 'Полный контроль над результатом',
    text: 'Захотели поменять цену, фото или акцию — меняете за минуты. Никаких «подрядчик пропал» и «правки через неделю».',
  },
];

export function Benefits() {
  return (
    <section className="section bg-surface-soft">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 120}>
              <article className="card h-full bg-surface transition-shadow hover:shadow-hover">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
                  aria-hidden
                >
                  <benefit.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="heading-md mt-5">{benefit.title}</h3>
                <p className="mt-3 text-ink-soft">{benefit.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
