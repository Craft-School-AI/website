import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';

type Work = {
  title: string;
  /** Имя ученика (если есть). */
  student?: string;
  description: string;
  url: string;
  /** Ч/б вырезка автора без фона (WebP с альфой) — занимает правую половину карточки. */
  portrait?: string;
  /** Квадратное фото автора — запасной вариант, пока нет вырезки. */
  photo?: string;
  accent: 'terracotta' | 'amber' | 'green';
};

const accentColor: Record<Work['accent'], string> = {
  terracotta: 'rgb(var(--brand-terracotta))',
  amber: 'rgb(var(--brand-amber))',
  green: 'rgb(var(--brand-green))',
};

const works: Work[] = [
  {
    title: 'Продажа картин и личный бренд',
    student: 'Анастасия',
    description: 'Сайт художника: витрина работ и продажа картин.',
    url: 'https://anastasia-lenskaya-artist.ru/',
    portrait: '/images/authors/anastasia.webp',
    photo: '/images/students/anastasia.webp',
    accent: 'terracotta',
  },
  {
    title: 'Сквош-туры',
    student: 'Ксения',
    description: 'Тренер по сквошу: программа туров и заявки на участие.',
    url: 'https://squashtrip.ru/',
    portrait: '/images/authors/ksenia.webp',
    photo: '/images/students/ksenia.webp',
    accent: 'amber',
  },
  {
    title: 'Школа испанского языка',
    student: 'Екатерина',
    description:
      'Онлайн-школа испанского: индивидуальные занятия и запись на пробный урок.',
    url: 'https://education-beta-snowy.vercel.app/',
    photo: '/images/students/ekaterina.webp',
    accent: 'green',
  },
  {
    title: 'Лазерное сведение тату',
    student: 'Евгений',
    description:
      'Медицинский лазерный центр: сведение тату и татуажа без следа на коже.',
    url: 'https://laser-clinic-koja.vercel.app/',
    photo: '/images/students/evgeniy.webp',
    accent: 'terracotta',
  },
];

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function StudentWorks() {
  return (
    <section id="works" className="section scroll-mt-24 bg-surface-soft">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Сайты наших учеников</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Настоящие сайты, которые ученики собрали сами с ИИ-агентом. Каждый —
            рабочий проект под своё дело, а не учебный макет.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {works.map((work, index) => {
            const color = accentColor[work.accent];
            return (
              <Reveal key={work.url} delay={index * 80}>
                <TiltCard>
                <article
                  className="group relative aspect-square overflow-hidden sm:aspect-[4/3] border-[3px] border-ink bg-graphite"
                  style={{ boxShadow: `8px 8px 0 0 ${color}` }}
                >
                  {/* Цветная полоса сверху — брутальный акцент карточки */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-2"
                    style={{ backgroundColor: color }}
                  />

                  {/* Автор: ч/б вырезка в правом нижнем углу (56% ширины),
                      жёсткая цветная тень-силуэт слева от фигуры */}
                  {work.portrait ? (
                    <div className="absolute bottom-0 right-0 h-[88%] w-[56%]">
                      <Image
                        src={work.portrait}
                        alt={work.student ?? work.title}
                        fill
                        sizes="(max-width: 640px) 56vw, 28vw"
                        className="object-contain object-right-bottom transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        style={{ filter: `drop-shadow(-12px 0 0 ${color})` }}
                      />
                    </div>
                  ) : (
                    work.photo && (
                      <div
                        className="absolute bottom-0 right-0 aspect-square w-[56%] border-l-[3px] border-t-[3px] border-ink sm:w-[44%]"
                        style={{ boxShadow: `-12px 0 0 0 ${color}` }}
                      >
                        <Image
                          src={work.photo}
                          alt={work.student ?? work.title}
                          fill
                          sizes="(max-width: 640px) 56vw, 22vw"
                          className="object-cover grayscale contrast-125 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    )
                  )}

                  {/* Текст занимает всё свободное место: верхняя полоса на всю
                      ширину (имя, домен, заголовок), описание в нижнем левом углу
                      в колонке уже фигуры. Правый нижний угол за фото. */}
                  <div className="relative z-10 flex h-full flex-col p-5 pt-6 sm:p-6 sm:pt-7">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      {work.student && (
                        <p
                          className="shrink-0 font-mono text-[11px] uppercase tracking-widest"
                          style={{ color }}
                        >
                          {work.student} · ученик
                        </p>
                      )}
                      <p className="min-w-0 truncate font-mono text-[11px] text-white/50">
                        {hostname(work.url)}
                      </p>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-2xl">
                      {work.title}
                    </h3>
                    <p className="mt-auto w-[42%] pt-4 text-[13px] leading-snug text-white/80 sm:text-sm">
                      {work.description}
                    </p>
                  </div>
                </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
