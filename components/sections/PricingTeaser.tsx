import { Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';
import { TARIFFS, formatRub } from '@/lib/tariffs';

/**
 * Ценовой якорь на главной: три тарифа одной строкой, без деталей.
 * Полное сравнение — на странице «Тарифы»; мини-карточки зеркалят её стили
 * (тень серым / терракотой / янтарём, см. app/pricing/page.tsx).
 */
export function PricingTeaser() {
  const shadows = [
    'shadow-[6px_6px_0_0_rgb(var(--text-tertiary))]',
    'shadow-[6px_6px_0_0_rgb(var(--brand-terracotta))]',
    'shadow-[6px_6px_0_0_rgb(var(--brand-amber))]',
  ];

  return (
    <section id="pricing-teaser" className="section scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Сколько стоит обучение</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Три тарифа под разные задачи. Любой из них дешевле, чем один сайт
            в студии.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3 sm:gap-4">
          {TARIFFS.map((tariff, index) => {
            const premium = index === TARIFFS.length - 1;
            return (
              <Reveal key={tariff.id} delay={index * 100}>
                <article
                  className={`relative flex h-full flex-col items-center border-[3px] border-ink p-6 text-center ${
                    shadows[index % shadows.length]
                  } ${premium ? 'bg-graphite text-ivory' : 'bg-surface'}`}
                >
                  {tariff.recommended && (
                    <span className="absolute -top-3.5 inline-flex items-center gap-1 bg-terracotta px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ivory">
                      <Star className="h-3 w-3 fill-ivory" aria-hidden />
                      Выбор большинства
                    </span>
                  )}
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest">
                    {tariff.name}
                  </h3>
                  <p
                    className={`mt-3 font-display text-3xl font-bold leading-none ${
                      premium ? 'text-amber' : ''
                    }`}
                  >
                    {formatRub(tariff.amount)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/pricing" variant="outline">
              Что входит в тарифы
            </Button>
            <Button href="/#zayavka">Записаться в мастерскую</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
