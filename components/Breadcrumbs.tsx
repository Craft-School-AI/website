'use client';

import { usePathname } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// Человеческие названия разделов для хлебных крошек.
const SECTION_LABELS: Record<string, string> = {
  program: 'Программа обучения',
  master: 'Преподаватель',
  pricing: 'Тарифы',
  schedule: 'Расписание',
  blog: 'Блог',
  contacts: 'Контакты',
  privacy: 'Политика конфиденциальности',
  oferta: 'Оферта',
};

/**
 * BreadcrumbList (JSON-LD) для внутренних страниц — строится из URL.
 * Главную пропускаем (крошки не нужны), а страницы статей (/blog/<slug>)
 * отдают свои крошки с заголовком поста прямо на странице поста.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Главная — без крошек; отдельные посты блога обрабатываются на своей странице.
  if (segments.length === 0) return null;
  if (segments[0] === 'blog' && segments.length > 1) return null;

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: SECTION_LABELS[segment] ?? segment,
      item: `${SITE_URL}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        name: `${SITE_NAME} — хлебные крошки`,
        itemListElement: items,
      }}
    />
  );
}
