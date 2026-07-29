import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { getAllPosts } from '@/lib/blog';

const description =
  'Полезные материалы для предпринимателей: как устроены сайты, сколько они стоят и как ИИ-агенты меняют правила игры. Без технического жаргона.';

export const metadata: Metadata = {
  title: 'Блог',
  description,
  openGraph: {
    title: 'Блог — Craft School',
    description,
    images: ['/images/blog/blog-index.webp'],
  },
};

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="section">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-lg">Материалы из мастерской</h1>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Коротко и без жаргона: про сайты, деньги и ИИ-агентов.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 100}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="card flex h-full flex-col overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
                  {post.cover && (
                    <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden bg-surface-deep">
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
                    aria-hidden
                  >
                    <post.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h2 className="heading-md mt-4 transition-colors group-hover:text-terracotta">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-ink-soft">
                    {post.description}
                  </p>
                  <p className="mt-5 text-xs text-ink-faint">
                    {dateFormatter.format(new Date(post.date))} · {post.readingTime}
                  </p>
                </article>
              </Link>
            </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
