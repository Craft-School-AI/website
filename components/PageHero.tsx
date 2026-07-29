import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { RobotActivity } from '@/components/RobotActivity';

type PageHeroProps = {
  tag?: string;
  title: ReactNode;
  subtitle?: string;
};

/** Единая шапка внутренних страниц. */
export function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-soft">
      {/* Случайная активность роботов — своя при каждом заходе на страницу.
          Полом служит нижняя граница секции (border-b), поэтому собственную
          линию пола не рисуем — иначе рядом получаются две линии. */}
      <RobotActivity laneMin={12} laneMax={30} withFloor={false} />

      <div className="container-page relative z-10 pb-28 pt-14 text-center sm:pb-32 sm:pt-20">
        <Reveal>
          {tag && (
            <span className="ai-tag bg-surface/80 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> {tag}
            </span>
          )}
          <h1 className="heading-xl mt-5 text-balance">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
