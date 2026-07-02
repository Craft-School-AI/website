import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type PageHeroProps = {
  tag?: string;
  title: ReactNode;
  subtitle?: string;
};

/** Единая шапка внутренних страниц. */
export function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-surface-soft">
      <div className="container-page py-14 text-center sm:py-20">
        <Reveal>
          {tag && (
            <span className="ai-tag">
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
