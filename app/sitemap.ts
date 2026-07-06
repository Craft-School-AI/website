import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://craft-school.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/program',
    '/modules',
    '/master',
    '/pricing',
    '/blog',
    '/contacts',
    '/privacy',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const blogPages = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
