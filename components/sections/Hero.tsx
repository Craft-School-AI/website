import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import { ChatGPTLogo, ClaudeLogo } from '@/components/AgentLogos';

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
      {/* Тёплый градиент с сеткой под тему — самый нижний слой */}
      <div aria-hidden className="hero-surface pointer-events-none absolute inset-0" />

      {/* С lg: блок занимает первый экран целиком (100svh минус шапка 7rem), поля 48px */}
      <div className="container-page section relative z-10 flex flex-col items-center pb-20 pt-10 text-center sm:pb-24 sm:pt-14 lg:min-h-[calc(100svh-7rem)] lg:max-w-none lg:justify-center lg:px-12 lg:py-12">
        {/* Заголовок лежит на заднем плане, фото — поверх него.
            До lg: стопка «Учу» / фото / «Использовать AI», фото наезжает на строки сверху и снизу.
            С lg: одна строка, фото стоит посередине и перекрывает края слов. */}
        <h1 className="hero-title flex w-full flex-col items-center font-display font-bold uppercase leading-none tracking-tight lg:flex-row lg:items-end lg:justify-center">
          <span className="hero-word hero-word-lead relative z-0 lg:min-w-0 lg:flex-1 lg:pb-[calc(min(58svh,38vw)*0.16)] lg:text-right">
            Учимся <span className="block">вместе</span>
          </span>

          {/* Фото: с lg высота зависит и от высоты, и от ширины окна.
              Низ растворяется в фон (hero-photo), логотипы агентов на уровне ушей.
              Логотипы вынесены за края фото отрицательными left/right.
              Отрицательные поля обёртки — чтобы фото заметно легло поверх слов. */}
          <span className="relative z-10 -mb-7 -mt-3 mx-auto block h-64 w-auto shrink-0 sm:-mb-9 sm:-mt-4 sm:h-80 lg:-mx-[clamp(2.5rem,4.2vw,4.75rem)] lg:my-0 lg:h-[min(58svh,38vw)]">
            <Image
              src="/images/roman-hero.webp"
              alt=""
              width={900}
              height={866}
              priority
              className="hero-photo pointer-events-none h-full w-auto object-contain"
            />

            <span className="agent-badge absolute -left-10 top-[38%] sm:-left-20 lg:-left-[clamp(4.5rem,6.5vw,7rem)] text-[10px] text-[#d97757] sm:text-xs">
              <ClaudeLogo className="agent-claude h-9 w-9 sm:h-11 sm:w-11 lg:h-[clamp(2.75rem,4.5vw,4.5rem)] lg:w-[clamp(2.75rem,4.5vw,4.5rem)]" />
              <span>Claude</span>
            </span>
            <span className="agent-badge absolute -right-10 top-[38%] sm:-right-20 lg:-right-[clamp(4.5rem,6.5vw,7rem)] text-[10px] text-ink sm:text-xs">
              <ChatGPTLogo className="agent-chatgpt h-9 w-9 sm:h-11 sm:w-11 lg:h-[clamp(2.75rem,4.5vw,4.5rem)] lg:w-[clamp(2.75rem,4.5vw,4.5rem)]" />
              <span>ChatGPT</span>
            </span>
          </span>

          <span className="hero-word relative z-0 lg:min-w-0 lg:flex-1 lg:pb-[calc(min(58svh,38vw)*0.16)] lg:text-left">
            Использовать{' '}
            <span className="block lg:pl-[0.8em]">
              <span className="text-terracotta">AI</span>-агентов
            </span>
          </span>
        </h1>

        <Reveal delay={300} className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:mt-8">
          <Button href="/#zayavka" size="lg">
            Записаться в мастерскую
          </Button>
          <Button href="/program" variant="outline" size="lg">
            Как устроено обучение
          </Button>
        </Reveal>

        <Reveal delay={400}>
          {/* Полоска доверия: реальные ученики + ссылка на их сайты */}
          {/* Мобилка: фото сверху, подпись под ними; с sm — в одну строку */}
          <Link
            href="#works"
            className="group mt-8 flex flex-col items-center gap-2.5 sm:flex-row sm:gap-3 lg:mt-5"
          >
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
            <span className="text-center text-sm text-ink-soft transition-colors group-hover:text-terracotta sm:text-left">
              Сайты учеников уже в интернете —{' '}
              <span className="underline underline-offset-4">смотрите сами</span>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={500} className="mt-10 lg:mt-5">
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
