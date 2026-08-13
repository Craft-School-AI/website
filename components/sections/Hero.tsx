import { ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import { RobotBackdrop } from '@/components/RobotBackdrop';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Анимация «роботы за работой» на заднем плане */}
      <RobotBackdrop />

      <div className="container-page section relative z-10 flex flex-col items-center pb-48 text-center sm:pb-56">
        <Reveal>
          <span className="ai-tag bg-surface/80 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Сайты делают ИИ-агенты
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="heading-xl mt-6 max-w-4xl text-balance">
            Вашему бизнесу больше не нужны подрядчики.
            <br />
            <span className="text-terracotta">
              Сайт вы сделаете сами
            </span> — с помощью ИИ-агентов.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft sm:text-xl">
            За 2–4 недели вы научитесь собирать сайты для своего дела — и
            сэкономите сотни тысяч рублей на студиях и фрилансерах. Без
            программирования. Без технического жаргона.
          </p>
        </Reveal>

        <Reveal delay={300} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/#zayavka" size="lg">
            Записаться в мастерскую
          </Button>
          <Button href="/program" variant="outline" size="lg">
            Как устроено обучение
          </Button>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 text-sm text-ink-faint">
            Формат спринтов · Первый сайт — уже на первой неделе
          </p>
        </Reveal>

        <Reveal delay={500} className="mt-10">
          <Link
            href="#benefits"
            aria-label="К следующему разделу"
            className="flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-surface text-ink shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--brand-terracotta))] active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--brand-terracotta))]"
          >
            <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
