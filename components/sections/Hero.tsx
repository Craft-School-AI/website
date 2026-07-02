import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import heroImage from '@/public/images/hero-workshop.jpg';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page section grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Текстовая колонка */}
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-terracotta">
              Цифровая мастерская
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="heading-xl mt-6 text-balance">
              Вашему бизнесу больше не нужны подрядчики.
              <br />
              <span className="text-terracotta">
                Сайт вы сделаете сами
              </span> — с помощью ИИ-агентов.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
              За 2–3 недели вы научитесь собирать сайты для своего дела — и
              сэкономите сотни тысяч рублей на студиях и фрилансерах. Без
              программирования. Без технического жаргона.
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
        </div>

        {/* Фото мастерской */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Смещённая рамка позади фото */}
          <div
            aria-hidden
            className="absolute -inset-0 translate-x-4 translate-y-4 rounded-t-[9rem] rounded-b-3xl border border-terracotta/40"
          />
          <div className="relative overflow-hidden rounded-t-[9rem] rounded-b-3xl shadow-hover">
            <Image
              src={heroImage}
              alt="Руки мастера за ноутбуком в тёплом свете мастерской"
              priority
              placeholder="blur"
              className="aspect-[4/5] w-full object-cover"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
            />
          </div>
          {/* Янтарная AI-метка поверх фото */}
          <span className="ai-tag absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Сайты делают ИИ-агенты. Управляете — вы
          </span>
        </Reveal>
      </div>
    </section>
  );
}
