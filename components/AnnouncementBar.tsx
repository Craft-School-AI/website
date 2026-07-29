import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Бегущая строка о наборе на сентябрь. Клик ведёт к карточкам потоков
// на странице расписания (#potoki). Кислотный цвет — чтобы бросалось в глаза.
const MESSAGE = 'Идёт набор учеников на сентябрь — места в группах ограничены';

export function AnnouncementBar() {
  // Дублируем контент в дорожке, чтобы лента была бесшовной при прокрутке.
  const items = Array.from({ length: 4 });

  return (
    <Link
      href="/schedule#potoki"
      aria-label="Идёт набор учеников на сентябрь — открыть расписание потоков"
      className="announce-bar group block overflow-hidden text-graphite"
    >
      <div className="announce-track flex w-max items-center py-2 group-hover:[animation-play-state:paused]">
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap px-6 text-sm font-bold uppercase tracking-wide"
            aria-hidden={i > 0}
          >
            {MESSAGE}
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            <span className="px-2 opacity-40">•</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
