import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Карточка статьи в списке блога. */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border-[3px] border-ink bg-graphite shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_rgb(var(--brand-terracotta))]"
    >
      {post.cover && (
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}

      {/* Тёмный скрим снизу: держит контраст текста на любой картинке */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-transparent"
        aria-hidden
      />

      {/* Моно-ярлык встык к краю — единый язык с детальной страницей */}
      <span className="absolute left-0 top-0 bg-graphite px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ivory">
        Craft School
      </span>

      {/* Текст абсолютом поверх картинки */}
      <div className="relative z-10 p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-amber">
          {dateFormatter.format(new Date(post.date))} · {post.readingTime}
        </p>
        <h2 className="heading-md mt-2 text-balance text-ivory">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-ivory/75">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
