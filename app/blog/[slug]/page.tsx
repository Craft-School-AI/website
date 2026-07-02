import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="section">
      <div className="container-page mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm text-terracotta hover:underline"
        >
          ← Все статьи
        </Link>

        <header className="mt-6">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
            aria-hidden
          >
            <post.icon className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <h1 className="heading-xl mt-4 text-balance">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-faint">
            {dateFormatter.format(new Date(post.date))} · {post.readingTime}
          </p>
        </header>

        <div className="mt-10 space-y-5">
          {post.body.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-relaxed text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="card mt-14 text-center">
          <h2 className="heading-md">Хотите так же — своими руками?</h2>
          <p className="mt-2 text-ink-soft">
            Запишитесь в мастерскую: за 2–3 недели соберёте сайт для своего дела.
          </p>
          <div className="mt-6">
            <Button href="/#zayavka" size="lg">
              Записаться в мастерскую
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}
