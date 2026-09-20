import { Check, ChevronDown } from 'lucide-react';
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

// Результаты трёх недель программы (PROGRAM.md)
const outcomes = [
  'Сайт для своего дела',
  'Тексты и логотип',
  'Форма заявок',
  'Запуск в интернет',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Тёплый градиент с сеткой под тему — самый нижний слой */}
      <div aria-hidden className="hero-surface pointer-events-none absolute inset-0" />

      {/* С lg: блок занимает первый экран целиком (100svh минус шапка 7rem), поля 48px */}
      <div className="container-page section relative z-10 flex flex-col items-center pb-20 pt-10 text-center sm:pb-24 sm:pt-14 lg:min-h-[calc(100svh-7rem)] lg:max-w-none lg:justify-center lg:px-12 lg:py-12">
        {/* До lg: стек по центру — фото, текст, чек-лист.
            С lg: три колонки — текст слева, фото в центре, чек-лист справа */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
          <Reveal className="order-2 lg:order-1 lg:text-left">
            <p className="inline-flex items-center border-2 border-terracotta px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-terracotta">
              2–4 недели до сайта
            </p>
            <h1 className="mt-5 font-display font-bold leading-none tracking-tight">
              <span className="block text-3xl sm:text-4xl lg:text-3xl 2xl:text-4xl">
                Соберите
              </span>
              <span className="mt-1 block text-5xl uppercase text-terracotta sm:text-6xl lg:text-5xl 2xl:text-6xl">
                свой сайт
              </span>
              <span className="mt-2 block text-2xl sm:text-3xl lg:text-2xl 2xl:text-3xl">
                с помощью ИИ
              </span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-ink-soft sm:text-xl lg:text-lg 2xl:text-xl">
              и сэкономьте{' '}
              <span className="text-terracotta">сотни тысяч рублей</span> на студиях
              и фрилансерах
            </p>
            <p className="mt-4 text-sm font-semibold text-ink-faint">
              Без программирования <span className="mx-1.5 text-terracotta">•</span> Без
              жаргона <span className="mx-1.5 text-terracotta">•</span> Онлайн
            </p>
          </Reveal>

          {/* Фото: с lg высота зависит и от высоты, и от ширины окна.
              Низ растворяется в фон (hero-photo), логотипы агентов на уровне ушей */}
          {/* Боковые отступы обёртки — место под логотипы, чтобы они не наезжали на соседние колонки */}
          <div className="relative order-1 mx-auto h-56 w-auto px-14 sm:h-80 sm:px-20 lg:order-2 lg:h-[min(54svh,36vw)] lg:px-[clamp(4.5rem,6.5vw,7rem)]">
            <Image
              src="/images/roman-hero.webp"
              alt=""
              width={900}
              height={866}
              priority
              className="hero-photo pointer-events-none h-full w-auto object-contain"
            />

            <div className="agent-badge absolute left-0 top-[38%] text-[10px] text-[#d97757] sm:text-xs">
              <ClaudeLogo className="agent-claude h-9 w-9 sm:h-11 sm:w-11 lg:h-[clamp(2.75rem,4.5vw,4.5rem)] lg:w-[clamp(2.75rem,4.5vw,4.5rem)]" />
              <span>Claude</span>
            </div>
            <div className="agent-badge absolute right-0 top-[38%] text-[10px] text-ink sm:text-xs">
              <ChatGPTLogo className="agent-chatgpt h-9 w-9 sm:h-11 sm:w-11 lg:h-[clamp(2.75rem,4.5vw,4.5rem)] lg:w-[clamp(2.75rem,4.5vw,4.5rem)]" />
              <span>ChatGPT</span>
            </div>
          </div>

          {/* Чек-лист результатов — плашка, как на референсе */}
          <Reveal delay={200} className="order-3 mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-start">
            <ul className="card space-y-3 text-left">
              {outcomes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base font-semibold">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 bg-terracotta" />
                  <span className="flex-1">{item}</span>
                  <Check className="h-5 w-5 shrink-0 text-terracotta" strokeWidth={3} aria-hidden />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:mt-6">
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
