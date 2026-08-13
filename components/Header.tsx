'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/Logo';
import { MapleLeaf } from '@/components/AutumnLeaf';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/program', label: 'О программе' },
  { href: '/modules', label: 'Модули' },
  { href: '/master', label: 'О преподавателе' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/schedule', label: 'Расписание' },
  { href: '/blog', label: 'Блог' },
  // «Контакты» намеренно только в футере (components/Footer.tsx)
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
          <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Craft Schoo
            {/* Осенний акцент: кленовый лист на букве «l» */}
            <span className="relative inline-block">
              l
              <MapleLeaf
                color="rgb(var(--brand-terracotta))"
                className="absolute left-1/2 -top-[0.5em] h-[0.72em] w-[0.72em] -translate-x-1/2 rotate-[18deg] transition-transform duration-300 group-hover:rotate-[32deg]"
              />
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
            {/* Сдвиг на 8px: центр верхней полоски совпадает с центром стека */}
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-opacity ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню: grid-rows 0fr→1fr плавно анимирует высоту
          до фактического размера контента; inert выключает скрытые ссылки */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav
          className="overflow-hidden"
          aria-label="Мобильная навигация"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <div
            className={`border-t border-line/70 bg-surface px-4 pb-6 pt-2 transition-[opacity,transform] duration-300 ease-out ${
              menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
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
          </div>
        </nav>
      </div>
    </header>
  );
}
