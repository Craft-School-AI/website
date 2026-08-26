import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { BlogCard } from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';

/** Две свежие статьи блога на главной — перед формой заявки. */
export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <section id="blog-teaser" className="section scroll-mt-24 bg-surface-soft">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Свежее из блога</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Пишем о том, как делать сайты самому с помощью ИИ-агентов: разборы,
            инструкции и чеклисты.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--brand-terracotta))] active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--brand-terracotta))]"
            >
              Все статьи
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
