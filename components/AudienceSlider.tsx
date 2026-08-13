'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  GraduationCap,
  Music,
  Palette,
  Rocket,
  Scissors,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

type Accent = 'terracotta' | 'amber' | 'green';

type Item = {
  photo: string;
  icon: LucideIcon;
  role: string;
  quote: string;
  accent: Accent;
};

const accentColor: Record<Accent, string> = {
  terracotta: 'rgb(var(--brand-terracotta))',
  amber: 'rgb(var(--brand-amber))',
  green: 'rgb(var(--brand-green))',
};

// Небольшой разворот на каждую карточку — эффект «перетасованной колоды»
const tilt = [
  '-rotate-2',
  'rotate-2',
  '-rotate-3',
  'rotate-1',
  '-rotate-1',
  'rotate-3',
  '-rotate-2',
  'rotate-1',
];

// Роли под реальные фото учеников (public/images/students/*).
// Когда пришлёшь ещё — добавляем сюда новую карточку с photo/role/quote.
const items: Item[] = [
  {
    photo: '/images/students/learner.webp',
    icon: GraduationCap,
    role: 'Репетитор и преподаватель',
    quote: 'Хочу сайт с расписанием, ценами и записью на пробный урок. Без переписки в мессенджерах.',
    accent: 'terracotta',
  },
  {
    photo: '/images/students/beauty.webp',
    icon: Scissors,
    role: 'Бьюти-мастер и салон',
    quote: 'Записываю клиентов в переписке. Нужна витрина услуг с ценами и онлайн-запись.',
    accent: 'amber',
  },
  {
    photo: '/images/students/creator.webp',
    icon: Palette,
    role: 'Художник и иллюстратор',
    quote: 'Портфолио, которое показывает работы и принимает заказы на них.',
    accent: 'green',
  },
  {
    photo: '/images/students/dancer.webp',
    icon: Music,
    role: 'Преподаватель танцев',
    quote: 'Сайт студии с расписанием групп, ценами и записью на первое занятие.',
    accent: 'terracotta',
  },
  {
    photo: '/images/students/fitness.webp',
    icon: Dumbbell,
    role: 'Фитнес-тренер',
    quote: 'Программы тренировок, цены и онлайн-запись на одной странице.',
    accent: 'amber',
  },
  {
    photo: '/images/students/businessman.webp',
    icon: Rocket,
    role: 'Основатель стартапа',
    quote: 'Проверяю идею продукта. Нужен лендинг с описанием, ценами и заявками, который правлю сам.',
    accent: 'green',
  },
  {
    photo: '/images/students/e-com.webp',
    icon: ShoppingBag,
    role: 'Продавец на маркетплейсах',
    quote: 'Продаю на Wildberries и Ozon, а хочу свой сайт бренда с каталогом и заказами напрямую.',
    accent: 'terracotta',
  },
  {
    photo: '/images/students/auto.webp',
    icon: Car,
    role: 'Продажа авто',
    quote: 'Витрина машин с фильтрами и формой заявки, которую я обновляю сам.',
    accent: 'amber',
  },
];

export function AudienceSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startLeft: 0, active: false });

  const step = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  // Drag-to-scroll только для мыши; на тач-устройствах работает нативный свайп
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // указатель мог не быть захвачен — игнорируем
    }
  };

  return (
    <div className="relative">
      {/* Стрелки — десктоп (на мобилке листаем свайпом) */}
      <div className="mb-5 hidden justify-end gap-2 sm:flex">
        {[
          { dir: -1, label: 'Назад', Icon: ChevronLeft },
          { dir: 1, label: 'Вперёд', Icon: ChevronRight },
        ].map(({ dir, label, Icon }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => step(dir)}
            className="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-surface text-ink shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--brand-terracotta))] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--brand-terracotta))]"
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Лента карточек */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="hide-scrollbar flex cursor-grab select-none snap-x snap-mandatory overflow-x-auto px-1 pb-8 pt-3 active:cursor-grabbing"
      >
        {items.map((item, i) => {
          const color = accentColor[item.accent];
          return (
            <article
              key={item.role}
              style={{ marginLeft: i === 0 ? 0 : '-1.5rem' }}
              className={`relative w-[220px] shrink-0 snap-center overflow-hidden border-[3px] border-ink bg-graphite shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))] sm:w-[248px] ${tilt[i % tilt.length]}`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.photo}
                  alt={item.role}
                  fill
                  sizes="248px"
                  draggable={false}
                  className="pointer-events-none object-cover"
                />

                {/* Скрим снизу — держит контраст текста на фото */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/45 to-transparent"
                  aria-hidden
                />

                {/* Бейдж сферы */}
                <span
                  className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center border-b-[3px] border-r-[3px] border-ink text-graphite"
                  style={{ backgroundColor: color }}
                  aria-hidden
                >
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </span>

                {/* Текст поверх фото */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-base font-bold leading-tight text-ivory">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-ivory/85">
                    «{item.quote}»
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        {/* Хвостовой отступ, чтобы последняя карточка не липла к краю */}
        <div className="w-3 shrink-0" aria-hidden />
      </div>
    </div>
  );
}
