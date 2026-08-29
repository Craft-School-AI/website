import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import { RobotBackdrop } from '@/components/RobotBackdrop';

// Фото учеников для полоски доверия — те же, что в «Сайтах наших учеников»
const studentPhotos = [
  { src: '/images/students/anastasia.webp', name: 'Анастасия' },
  { src: '/images/students/ksenia.webp', name: 'Ксения' },
  { src: '/images/students/ekaterina.webp', name: 'Екатерина' },
  { src: '/images/students/evgeniy.webp', name: 'Евгений' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Анимация «роботы за работой» на заднем плане */}
      <RobotBackdrop />

      <div className="container-page section relative z-10 flex flex-col items-center pb-48 text-center sm:pb-56">
        <Reveal>
          <h1 className="heading-xl max-w-4xl text-balance">
            Учим предпринимателей{' '}
            <span className="text-terracotta">создавать сайты с помощью ИИ</span>
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
          {/* Полоска доверия: реальные ученики + ссылка на их сайты */}
          <Link href="#works" className="group mt-8 inline-flex items-center gap-3">
            {/* shrink-0: иначе flex ужимает полоску, и фото вылезают под текст */}
            <span className="flex shrink-0" aria-hidden>
              {studentPhotos.map((student, index) => (
                <Image
                  key={student.src}
                  src={student.src}
                  alt=""
                  width={36}
                  height={36}
                  className={`h-9 w-9 border-2 border-ink object-cover ${
                    index > 0 ? '-ml-2' : ''
                  }`}
                />
              ))}
            </span>
            <span className="text-left text-sm text-ink-soft transition-colors group-hover:text-terracotta">
              Сайты учеников уже в интернете —{' '}
              <span className="underline underline-offset-4">смотрите сами</span>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={500} className="mt-10">
          <Link
            href="#audience"
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
