import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Миниатюрные карточки похожих статей в конце поста. Подбор идёт по общим
 * тегам, поэтому читатель остаётся в той же теме, а не уходит на общий список.
 */
export function BlogRelated({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-posts">
      <h2
        id="related-posts"
        className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint"
      >
        Читайте по теме
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-stretch gap-3 border-[3px] border-ink bg-surface-soft transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--brand-terracotta))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            {post.cover && (
              <div className="relative w-20 shrink-0 self-stretch overflow-hidden bg-graphite">
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            )}

            <div className="min-w-0 py-3 pr-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-terracotta">
                {dateFormatter.format(new Date(post.date))} · {post.readingTime}
              </p>
              <p className="mt-1 line-clamp-2 font-semibold leading-snug text-ink">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
