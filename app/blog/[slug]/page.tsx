import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { BlogChecklist } from '@/components/BlogChecklist';
import { getAllPosts, getPostBySlug, type BlogBlock } from '@/lib/blog';

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
      ...(post.cover ? { images: [post.cover] } : {}),
    },
    ...(post.cover
      ? { twitter: { card: 'summary_large_image', images: [post.cover] } }
      : {}),
  };
}

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// Лёгкая инлайн-разметка внутри текста блоков:
//   [подпись](ссылка) · `код` · **жирный**
const INLINE = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[1] !== undefined) {
      const href = match[2];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={key++}
          href={href}
          className="font-medium text-terracotta underline underline-offset-2 transition-colors hover:text-terracotta/70"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="rounded-md bg-surface-deep px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
        >
          {match[3]}
        </code>,
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {match[4]}
        </strong>,
      );
    }

    last = INLINE.lastIndex;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function BlogContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'heading':
      return block.level === 3 ? (
        <h3 className="heading-md pt-4 text-ink">{renderInline(block.text)}</h3>
      ) : (
        <h2 className="heading-lg pt-6 text-ink">{renderInline(block.text)}</h2>
      );
    case 'steps':
      return (
        <ol className="list-decimal space-y-3 pl-6 text-lg leading-relaxed text-ink-soft marker:font-semibold marker:text-terracotta">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink-soft marker:text-terracotta">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <div className="rounded-2xl border border-amber/40 bg-amber/10 p-5 text-base leading-relaxed text-ink-soft">
          <span className="mr-1.5" aria-hidden>
            💡
          </span>
          {renderInline(block.text)}
        </div>
      );
    case 'checklist':
      return <BlogChecklist id={block.id} items={block.items} />;
    case 'paragraph':
    default:
      return (
        <p className="text-lg leading-relaxed text-ink-soft">
          {renderInline(block.text)}
        </p>
      );
  }
}

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

        {post.cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-deep">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10 space-y-5">
          {post.body.map((block, index) => (
            <BlogContentBlock
              key={index}
              block={
                typeof block === 'string'
                  ? { type: 'paragraph', text: block }
                  : block
              }
            />
          ))}
        </div>

        <footer className="card mt-14 text-center">
          <h2 className="heading-md">Хотите так же — своими руками?</h2>
          <p className="mt-2 text-ink-soft">
            Запишитесь в мастерскую: за 2–4 недели соберёте сайт для своего дела.
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
