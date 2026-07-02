import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Полезные материалы для предпринимателей: как устроены сайты, сколько они стоят и как ИИ-агенты меняют правила игры. Без технического жаргона.',
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
      <PageHero
        tag="Блог"
        title="Материалы из мастерской"
        subtitle="Коротко и без жаргона: про сайты, деньги и ИИ-агентов — для тех, кто ведёт своё дело."
      />

      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 100}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="card flex h-full flex-col transition-transform duration-200 group-hover:-translate-y-1">
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
      </section>
    </>
  );
}
