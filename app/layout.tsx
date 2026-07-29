import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { PERSONAL_TELEGRAM_URL, SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

// Structured data уровня сайта — показываются на всех страницах.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description:
    'Цифровая мастерская для предпринимателей: сайты своими руками с помощью ИИ-агентов.',
  sameAs: [PERSONAL_TELEGRAM_URL],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ru-RU',
  publisher: { '@type': 'Organization', name: SITE_NAME },
};

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://craft-school.ru';

// Цвет адресной строки мобильных браузеров под светлую/тёмную тему
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDF8F0' },
    { media: '(prefers-color-scheme: dark)', color: '#141212' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Craft School — сайты своими руками с помощью ИИ-агентов',
    template: '%s — Craft School',
  },
  description:
    'Цифровая мастерская для предпринимателей: за 2–4 недели вы научитесь делать сайты с помощью ИИ-агентов — без подрядчиков, программистов и переплат.',
  keywords: [
    'сайт с помощью ИИ',
    'ИИ-агенты',
    'сайт для бизнеса своими руками',
    'обучение предпринимателей',
    'сделать сайт без программиста',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Craft School',
    title: 'Craft School — сайты своими руками с помощью ИИ-агентов',
    description:
      'Цифровая мастерская: предприниматели делают сайты сами с помощью ИИ-агентов и экономят сотни тысяч на подрядчиках.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft School — сайты своими руками с помощью ИИ-агентов',
    description:
      'Цифровая мастерская: предприниматели делают сайты сами с помощью ИИ-агентов.',
  },
  robots: { index: true, follow: true },
  // Иконки задаём явно (файлы в /public), чтобы отдавать максимально
  // совместимый набор: BMP-ICO для поисковиков (в т.ч. Яндекса), PNG 16/32,
  // SVG для современных браузеров, apple-touch-icon и legacy shortcut.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

// Выставляем тему до гидратации, чтобы не мигал светлый фон
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('craft-school-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={body.variable}>
        <JsonLd data={[orgJsonLd, websiteJsonLd]} />
        <Breadcrumbs />
        <SmoothScrollProvider />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        {/* Метрика и cookie-баннер появляются только при заданном YANDEX_METRIKA_ID */}
        {process.env.YANDEX_METRIKA_ID && (
          <Analytics metrikaId={process.env.YANDEX_METRIKA_ID} />
        )}
      </body>
    </html>
  );
}
