'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/Logo';
import { MapleLeaf } from '@/components/AutumnLeaf';
import { ThemeToggle } from '@/components/ThemeToggle';
import { HEADER_NAV } from '@/lib/nav';

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
          <LogoMark className="h-8 w-auto transition-transform duration-300 group-hover:rotate-[-6deg] sm:h-9" />
          <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Craft-Schoo
            {/* Осенний акцент: кленовый лист на букве «l» */}
            <span className="relative inline-block">
              l
              <MapleLeaf
                color="rgb(var(--brand-terracotta))"
                className="absolute left-1/2 -top-[0.5em] h-[0.72em] w-[0.72em] -translate-x-1/2 rotate-[18deg] transition-transform duration-300 group-hover:rotate-[32deg]"
              />
            </span>
            {/* Доменная зона — мелко и приглушённо, у нижнего края букв */}
            <span className="ml-1 text-[0.45em] font-semibold tracking-normal text-ink-faint">
              .ru
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Основная навигация">
          {HEADER_NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`group flex items-center gap-1.5 text-sm transition-colors hover:text-terracotta ${
                  active ? 'font-semibold text-terracotta' : 'text-ink-soft'
                }`}
              >
                {/* Иконка бледнее подписи, но догоняет её по цвету на hover —
                    так она помогает узнать раздел, а не спорит с текстом */}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? 'text-terracotta' : 'text-ink-faint group-hover:text-terracotta'
                  }`}
                  strokeWidth={2}
                  aria-hidden
                />
                {label}
              </Link>
            );
          })}
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
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-none border border-line lg:hidden"
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
              {HEADER_NAV.map(({ href, label, hint, Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className="flex items-center gap-3 border-b border-line/70 py-3"
                    >
                      {/* Квадратная плашка с иконкой — держит ряд ссылок
                          выровненным и делает раздел узнаваемым с одного взгляда */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
                          active
                            ? 'border-terracotta bg-terracotta/10 text-terracotta'
                            : 'border-line text-ink-soft'
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-base ${
                            active ? 'font-semibold text-terracotta' : ''
                          }`}
                        >
                          {label}
                        </span>
                        <span className="block text-xs text-ink-faint">{hint}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
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
