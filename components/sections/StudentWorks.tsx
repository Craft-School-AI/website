import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

type Work = {
  title: string;
  /** Имя ученика (если есть). */
  student?: string;
  description: string;
  url: string;
  /** Скрин сайта — добавим позже: image: '/images/works/espanol.webp' */
  image?: string;
  /** Фото автора — в правый нижний угол карточки. */
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
    image: '/images/works/artist.webp',
    photo: '/images/students/anastasia.webp',
    accent: 'terracotta',
  },
  {
    title: 'Сквош-туры',
    student: 'Ксения',
    description: 'Тренер по сквошу: программа туров и заявки на участие.',
    url: 'https://squashtrip.ru/',
    image: '/images/works/squash.webp',
    photo: '/images/students/ksenia.webp',
    accent: 'amber',
  },
  {
    title: 'Школа испанского языка',
    student: 'Екатерина',
    description:
      'Онлайн-школа испанского: индивидуальные занятия и запись на пробный урок.',
    url: 'https://education-beta-snowy.vercel.app/',
    image: '/images/works/espanol.webp',
    photo: '/images/students/ekaterina.webp',
    accent: 'green',
  },
  {
    title: 'Лазерное сведение тату',
    student: 'Евгений',
    description:
      'Медицинский лазерный центр: сведение тату и татуажа без следа на коже.',
    url: 'https://laser-clinic-koja.vercel.app/',
    image: '/images/works/laser.webp',
    photo: '/images/students/evgeniy.webp',
    accent: 'terracotta',
  },
];

// Карточки с картинкой — вперёд (порядок внутри групп сохраняется)
const orderedWorks = [...works].sort(
  (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)),
);

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {orderedWorks.map((work, index) => {
            const color = accentColor[work.accent];
            return (
              <Reveal key={work.url} delay={index * 80}>
                <article className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden border-[3px] border-ink bg-surface-deep shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))]">
                  {/* Картинка на всю карточку (скрин) либо браузер-заглушка с адресом */}
                  {work.image ? (
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col bg-surface-deep">
                      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green" />
                        <span className="ml-2 truncate font-mono text-[11px] text-ink-faint">
                          {hostname(work.url)}
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-center pb-10">
                        <span
                          className="font-display text-6xl font-black opacity-90"
                          style={{ color }}
                        >
                          {work.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Скрим снизу — держит контраст текста поверх картинки */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-transparent"
                    aria-hidden
                  />

                  {/* Фото автора — круглый аватар в левом верхнем углу */}
                  {/* На мобилке меньше и в правом углу: слева крупная аватарка
                      наезжала на подпись и заголовок */}
                  {work.photo && (
                    <div className="absolute right-4 top-4 z-20 h-11 w-11 overflow-hidden rounded-none border-[3px] border-ink shadow-[2px_2px_0_0_rgb(var(--brand-terracotta))] sm:left-4 sm:right-auto sm:h-[68px] sm:w-[68px]">
                      <Image
                        src={work.photo}
                        alt={work.student ?? work.title}
                        fill
                        sizes="(max-width: 640px) 44px, 68px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Текст поверх картинки */}
                  <div className="relative z-10 p-5">
                    {work.student && (
                      <p className="font-mono text-[11px] uppercase tracking-widest text-amber">
                        {work.student} · ученик
                      </p>
                    )}
                    <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-ivory">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-ivory/80">
                      {work.description}
                    </p>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 self-start border-2 border-ivory bg-transparent px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ivory transition-colors hover:bg-ivory hover:text-graphite"
                    >
                      Перейти
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
