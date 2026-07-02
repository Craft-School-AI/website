import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://craft-school.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Craft-School.ai — сайты своими руками с помощью ИИ-агентов',
    template: '%s — Craft-School.ai',
  },
  description:
    'Цифровая мастерская для предпринимателей: за 2–3 недели вы научитесь делать сайты с помощью ИИ-агентов — без подрядчиков, программистов и переплат.',
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
    siteName: 'Craft-School.ai',
    title: 'Craft-School.ai — сайты своими руками с помощью ИИ-агентов',
    description:
      'Цифровая мастерская: предприниматели делают сайты сами с помощью ИИ-агентов и экономят сотни тысяч на подрядчиках.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft-School.ai — сайты своими руками с помощью ИИ-агентов',
    description:
      'Цифровая мастерская: предприниматели делают сайты сами с помощью ИИ-агентов.',
  },
  robots: { index: true, follow: true },
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
