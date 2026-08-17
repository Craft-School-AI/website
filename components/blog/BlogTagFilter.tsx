import Link from 'next/link';
import type { UsedBlogTag } from '@/lib/blog';
import { blogHref, tagLabel, toggleTag, type BlogTagSlug } from '@/lib/blog-tags';

const chipBase =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-none border-[3px] border-ink px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta';

const chipActive =
  'bg-terracotta text-ivory shadow-[3px_3px_0_0_rgb(var(--text-primary))]';

const chipIdle =
  'bg-surface text-ink-soft hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-amber hover:text-graphite hover:shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))]';

type Props = {
  /** Теги, у которых есть статьи, со счётчиком */
  tags: UsedBlogTag[];
  /** Выбранные сейчас теги; пустой набор означает «все статьи» */
  selected: BlogTagSlug[];
};

/**
 * Фильтр статей по тегам. Каждый чипс — обычная ссылка с заранее посчитанным
 * адресом «текущий набор плюс/минус этот тег», поэтому мультивыбор работает
 * без состояния в браузере, а ссылкой на любую подборку можно поделиться.
 */
export function BlogTagFilter({ tags, selected }: Props) {
  const total = tags.length;
  const showsAll = selected.length === 0;

  return (
    <nav aria-label="Фильтр статей по тегам" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        aria-current={showsAll ? 'true' : undefined}
        className={`${chipBase} ${showsAll ? chipActive : chipIdle}`}
      >
        Все
      </Link>

      {tags.map(({ slug, count }) => {
        const isActive = selected.includes(slug);

        return (
          <Link
            key={slug}
            href={blogHref(toggleTag(selected, slug), total)}
            aria-current={isActive ? 'true' : undefined}
            className={`${chipBase} ${isActive ? chipActive : chipIdle}`}
          >
            {tagLabel(slug)}
            <span className={isActive ? 'text-ivory/70' : 'text-ink-faint'}>
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
