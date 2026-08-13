import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Work = {
  title: string;
  /** Имя ученика (если есть). */
  student?: string;
  description: string;
  url: string;
  /** Скрин сайта — добавим позже: image: '/images/works/espanol.webp' */
  image?: string;
  /** Фото ученика — добавим позже: photo: '/images/students/ekaterina.webp' */
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
    title: 'Школа испанского языка',
    student: 'Екатерина',
    description: 'Программа, расписание и запись на занятия.',
    url: 'https://education-beta-snowy.vercel.app',
    accent: 'terracotta',
  },
  {
    title: 'Аренда и покупка лошадей',
    description: 'Витрина лошадей с фильтрами и заявкой на аренду или покупку.',
    url: 'https://horse-nu.vercel.app',
    accent: 'amber',
  },
  {
    title: 'Трекер привычек',
    student: 'Андрей',
    description: 'Отмечайте прогресс и держите ритм каждый день.',
    url: 'https://education-mocha-alpha.vercel.app',
    accent: 'green',
  },
  {
    title: 'Продажа картин и личный бренд',
    student: 'Анастасия',
    description: 'Сайт художника: витрина работ и продажа картин.',
    url: 'https://fd-coral.vercel.app/',
    image: '/images/works/artist.webp',
    accent: 'terracotta',
  },
  {
    title: 'Сквош-туры',
    student: 'Ксения',
    description: 'Тренер по сквошу: программа туров и заявки на участие.',
    url: 'https://squash-nu.vercel.app',
    accent: 'amber',
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => {
            const color = accentColor[work.accent];
            return (
              <Reveal key={work.url} delay={index * 80}>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden border-[3px] border-ink bg-surface shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_rgb(var(--brand-terracotta))]"
                >
                  {/* Превью сайта: скрин (если есть) либо браузер-заглушка с адресом */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink bg-surface-deep">
                    {work.image ? (
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col">
                        <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green" />
                          <span className="ml-2 truncate font-mono text-[11px] text-ink-faint">
                            {hostname(work.url)}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                          <span
                            className="font-display text-6xl font-black opacity-90"
                            style={{ color }}
                          >
                            {work.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Описание */}
                  <div className="flex flex-1 flex-col p-5">
                    {work.student && (
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center overflow-hidden border-2 border-ink text-[11px] font-bold text-graphite"
                          style={{ backgroundColor: color }}
                          aria-hidden
                        >
                          {work.photo ? (
                            <Image
                              src={work.photo}
                              alt={work.student}
                              width={24}
                              height={24}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            work.student.charAt(0)
                          )}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                          {work.student} · ученик
                        </span>
                      </div>
                    )}
                    <h3 className="heading-md text-ink">{work.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-snug text-ink-soft">
                      {work.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-semibold text-terracotta">
                      Открыть сайт
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
