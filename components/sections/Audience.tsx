import Image from 'next/image';
import {
  Calculator,
  Dumbbell,
  Languages,
  Music,
  Palette,
  Rocket,
  Scissors,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Accent = 'terracotta' | 'amber' | 'green';

type AudienceItem = {
  icon: LucideIcon;
  role: string;
  quote: string;
  accent: Accent;
  /** Путь к фото ученика — вставим позже: photo: '/images/students/anna.webp' */
  photo?: string;
};

const accentColor: Record<Accent, string> = {
  terracotta: 'rgb(var(--brand-terracotta))',
  amber: 'rgb(var(--brand-amber))',
  green: 'rgb(var(--brand-green))',
};

// Роли под реальные сферы учеников (без выдуманных имён — честно «для кого»).
// Когда пришлёшь реальных учеников — заменим role/quote и добавим photo.
const audience: AudienceItem[] = [
  {
    icon: Languages,
    role: 'Репетитор по языкам',
    quote: 'Хочу сайт с расписанием, ценами и записью на пробный урок. Без переписки в мессенджерах.',
    accent: 'terracotta',
  },
  {
    icon: Calculator,
    role: 'Репетитор по математике',
    quote: 'Нужна страница с программой, форматами занятий и заявкой на пробный урок.',
    accent: 'amber',
  },
  {
    icon: Scissors,
    role: 'Бьюти-мастер и салон',
    quote: 'Записываю клиентов в переписке. Нужна витрина услуг с ценами и онлайн-запись.',
    accent: 'green',
  },
  {
    icon: Palette,
    role: 'Художник и иллюстратор',
    quote: 'Портфолио, которое показывает работы и принимает заказы на них.',
    accent: 'terracotta',
  },
  {
    icon: Music,
    role: 'Преподаватель танцев',
    quote: 'Сайт студии с расписанием групп, ценами и записью на первое занятие.',
    accent: 'amber',
  },
  {
    icon: Dumbbell,
    role: 'Фитнес-тренер',
    quote: 'Программы тренировок, цены и онлайн-запись на одной странице.',
    accent: 'green',
  },
  {
    icon: Rocket,
    role: 'Основатель стартапа',
    quote: 'Проверяю идею продукта. Нужен лендинг с описанием, ценами и заявками, который правлю сам.',
    accent: 'terracotta',
  },
  {
    icon: ShoppingBag,
    role: 'Продавец на маркетплейсах',
    quote: 'Продаю на Wildberries и Ozon, а хочу свой сайт бренда с каталогом и заказами напрямую.',
    accent: 'amber',
  },
];

/** Рисованный аватар-заглушка (силуэт). Заменяется реальным фото при наличии. */
function PersonAvatar({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="100" height="100" fill="rgb(var(--bg-tertiary))" />
      <circle cx="50" cy="42" r="17" fill={accent} />
      <path d="M22,95 C22,72 78,72 78,95 Z" fill={accent} />
    </svg>
  );
}

export function Audience() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Для кого эта мастерская</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Для тех, кто ведёт своё дело и устал зависеть от подрядчиков.
            Опыт в IT не нужен — нужен ваш бизнес и 5–7 часов в неделю.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, index) => {
            const color = accentColor[item.accent];
            return (
              <Reveal key={item.role} delay={index * 80}>
                <article className="group flex h-full flex-col border-[3px] border-ink bg-surface p-5 shadow-[6px_6px_0_0_rgb(var(--brand-terracotta))] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_rgb(var(--brand-terracotta))]">
                  <div className="flex items-center gap-4">
                    {/* Слот под фото ученика: сейчас рисованный аватар */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-ink">
                      {item.photo ? (
                        <Image
                          src={item.photo}
                          alt={item.role}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <PersonAvatar accent={color} />
                      )}
                      {/* Бейдж сферы */}
                      <span
                        className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center border-2 border-ink text-graphite"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      >
                        <item.icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                      {item.role}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-snug text-ink-soft">
                    «{item.quote}»
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
