import Link from 'next/link';
import { TAGS_PARAM, tagLabel, type BlogTagSlug } from '@/lib/blog-tags';

/**
 * Теги под текстом статьи. Ведут в список блога с этим фильтром: читатель
 * переходит к соседним статьям на ту же тему.
 */
export function BlogTagList({ tags }: { tags: BlogTagSlug[] }) {
  if (tags.length === 0) return null;

  return (
    <nav aria-label="Теги статьи" className="flex flex-wrap gap-2">
      {tags.map((slug) => (
        <Link
          key={slug}
          href={`/blog?${TAGS_PARAM}=${slug}`}
          className="inline-flex items-center whitespace-nowrap rounded-none border-[3px] border-ink bg-surface px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-amber hover:text-graphite hover:shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          {tagLabel(slug)}
        </Link>
      ))}
    </nav>
  );
}
