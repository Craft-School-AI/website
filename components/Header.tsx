'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/program', label: 'О программе' },
  { href: '/modules', label: 'Модули' },
  { href: '/master', label: 'О мастере' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Закрываем бургер-меню при переходе на другую страницу
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface/90 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* Логотип — визуальная доминанта хедера */}
        <Link href="/" className="group flex items-center gap-2.5 whitespace-nowrap">
          <LogoMark className="h-10 w-auto transition-transform duration-300 group-hover:rotate-[-6deg] sm:h-11" />
          <span className="flex items-baseline gap-0.5">
            <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Craft-School
            </span>
            <span className="font-display text-2xl font-bold text-amber transition-colors group-hover:text-terracotta sm:text-3xl">
              .ai
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-terracotta ${
                pathname.startsWith(link.href)
                  ? 'font-semibold text-terracotta'
                  : 'text-ink-soft'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button href="/#zayavka">Записаться</Button>
          </div>

          {/* Бургер */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? 'translate-y-1 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-opacity ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? '-translate-y-3 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <nav
          className="border-t border-line/70 bg-surface px-4 pb-6 pt-2 lg:hidden"
          aria-label="Мобильная навигация"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block border-b border-line/70 py-3 text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <Button href="/#zayavka" className="w-full">
              Записаться в мастерскую
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
