import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSocialLinks } from '@/components/blog/BlogSocialLinks';
import { BlogTagFilter } from '@/components/blog/BlogTagFilter';
import { BlogWordmark } from '@/components/blog/BlogWordmark';
import { filterPostsByTags, getAllPosts, getUsedTags } from '@/lib/blog';
import {
  BLOG_TAGS,
  TAGS_PARAM,
  normalizeSelection,
  parseTagsParam,
} from '@/lib/blog-tags';

const description =
  'Полезные материалы для предпринимателей: как устроены сайты, сколько они стоят и как ИИ-агенты меняют правила игры. Без технического жаргона.';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const selected = normalizeSelection(
    parseTagsParam((await searchParams)[TAGS_PARAM]),
    getUsedTags().length,
  );

  // Отфильтрованная выдача — это срез того же списка, поэтому канонический
  // адрес всегда /blog, а сами подборки закрыты от индексации.
  if (selected.length > 0) {
    const labels = selected.map((slug) => BLOG_TAGS[slug]).join(', ');

    return {
      title: `Блог: ${labels}`,
      description,
      alternates: { canonical: '/blog' },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: 'Блог',
    description,
    alternates: { canonical: '/blog' },
    openGraph: {
      title: 'Блог — Craft School',
      description,
      images: ['/images/blog/blog-index.webp'],
    },
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const tags = getUsedTags();
  const selected = normalizeSelection(
    parseTagsParam((await searchParams)[TAGS_PARAM]),
    tags.length,
  );
  const posts = filterPostsByTags(getAllPosts(), selected);

  return (
    <>
      {/* Верхний отступ меньше базового: над заголовком сразу шапка сайта,
          а не отдельная секция-обложка, как на остальных страницах */}
      <section className="section pt-10 sm:pt-14">
        <div className="container-page">
          <Reveal>
            <BlogWordmark />
            {/* На планшете и десктопе подпись крупнее базового размера;
                мобильное значение остаётся прежним */}
            <p className="mt-4 max-w-2xl text-ink-soft sm:text-lg lg:text-xl">
              Читайте обучающие статьи в нашем AI блоге.
            </p>
            <div className="mt-5">
              <BlogSocialLinks />
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <BlogTagFilter tags={tags} selected={selected} />
          </Reveal>

          {posts.length === 0 ? (
            <Reveal className="mt-10">
              <p className="text-ink-soft">
                По выбранным тегам статей пока нет.{' '}
                <Link
                  href="/blog"
                  className="font-medium text-terracotta underline underline-offset-2 transition-colors hover:text-terracotta/70"
                >
                  Показать все
                </Link>
              </p>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 100}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
