import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';
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
                <Reveal
                  key={post.slug}
                  delay={index * 100}
                  // Свежая статья на широких экранах занимает 2×2 ячейки,
                  // на планшете и телефоне — обычная карточка
                  className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                >
                  <BlogCard post={post} featured={index === 0} />
                </Reveal>
              ))}
            </div>
          )}

          {/* Продолжение воронки для читателей из поиска: статьи объясняют,
              мастерская учит делать — без этого блок листинга упирается в тупик */}
          <Reveal className="mt-16">
            <div className="border-[3px] border-ink bg-surface-soft p-8 text-center shadow-[8px_8px_0_0_rgb(var(--brand-terracotta))] sm:p-10">
              <h2 className="heading-lg">Хотите сайт для своего дела?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
                Статьи помогают разобраться, а в мастерской вы соберёте свой
                сайт за 2–4 недели вместе с преподавателем и ИИ-агентом.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/#zayavka" size="lg">
                  Записаться в мастерскую
                </Button>
                <Button href="/program" variant="outline" size="lg">
                  Смотреть программу
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
