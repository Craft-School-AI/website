import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { BlogChecklist } from '@/components/BlogChecklist';
import { JsonLd } from '@/components/JsonLd';
import { getAllPosts, getPostBySlug, type BlogBlock } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

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
          className="rounded-none bg-surface-deep px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
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
        <div className="border-2 border-l-[6px] border-ink border-l-amber bg-amber/10 p-5 text-base leading-relaxed text-ink-soft">
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

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {}),
    author: { '@type': 'Person', name: 'Роман Бабанов' },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    inLanguage: 'ru-RU',
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <article className="section">
      <JsonLd data={[blogPostingJsonLd, breadcrumbJsonLd]} />
      <div className="container-page mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-widest text-terracotta transition-colors hover:text-terracotta/70"
        >
          ← Все статьи
        </Link>

        {post.cover ? (
          <figure className="group relative mt-6 aspect-square w-full overflow-hidden border-[3px] border-ink bg-graphite shadow-[16px_16px_0_0_rgb(var(--brand-terracotta))]">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              priority
            />

            {/* Верхний скрим: держит контраст заголовка на любой картинке */}
            <div
              className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-graphite via-graphite/45 to-transparent"
              aria-hidden
            />

            {/* Заголовок поверх картинки — сверху; зеркально карточкам списка */}
            <div className="absolute inset-x-0 top-0 p-6 sm:p-9 lg:p-11">
              <p className="inline-block bg-terracotta px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-ivory">
                {dateFormatter.format(new Date(post.date))} · {post.readingTime}
              </p>
              <h1 className="heading-xl mt-5 max-w-[18ch] text-balance text-ivory">
                {post.title}
              </h1>
            </div>
          </figure>
        ) : (
          <header className="mt-6">
            <h1 className="heading-xl text-balance">{post.title}</h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-faint">
              {dateFormatter.format(new Date(post.date))} · {post.readingTime}
            </p>
          </header>
        )}
      </div>

      <div className="container-page mx-auto mt-12 max-w-3xl">
        <div className="space-y-5">
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

        <footer className="mt-16 border-[3px] border-ink bg-surface-soft p-8 text-center shadow-[12px_12px_0_0_rgb(var(--brand-terracotta))]">
          <h2 className="heading-md">Соберите такой сайт своими руками</h2>
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
