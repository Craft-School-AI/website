import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Craft School',
    short_name: 'Craft School',
    description:
      'Цифровая мастерская для предпринимателей: сайты своими руками с помощью ИИ-агентов.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F0',
    theme_color: '#C67B5A',
    lang: 'ru',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
