'use client';

import { useEffect } from 'react';
import type LocomotiveScroll from 'locomotive-scroll';

// Высота липкой шапки (h-20 = 80px) + небольшой отступ
const ANCHOR_OFFSET = -96;

/**
 * Плавный скролл на Locomotive Scroll v5.
 *
 * Важно для SEO: v5 работает поверх нативного скролла окна (через Lenis),
 * без обёрток-контейнеров и transform-хаков — весь контент остаётся обычным
 * серверным HTML, боты видят страницу как есть. Эффект — чистое
 * client-side-улучшение.
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    // Уважаем системную настройку «меньше движения»
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    let scroll: LocomotiveScroll | undefined;
    // Эффект может размонтироваться до завершения динамического импорта
    // (например, StrictMode в dev) — без этого флага получится два
    // конкурирующих экземпляра
    let cancelled = false;

    // Динамический импорт: библиотека обращается к window при загрузке,
    // поэтому подключаем её только в браузере
    import('locomotive-scroll').then(({ default: LocomotiveScrollClass }) => {
      if (cancelled) return;
      scroll = new LocomotiveScrollClass({
        lenisOptions: {
          lerp: 0.1, // мягкость догоняющего скролла
          wheelMultiplier: 1,
          smoothWheel: true,
        },
      });
    });

    // Якорные ссылки ведём сами через Locomotive: иначе нативный прыжок
    // браузера и анимация Lenis спорят и промахиваются мимо цели
    const handleAnchorClick = (event: MouseEvent) => {
      if (!scroll) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.pathname !== window.location.pathname || !link.hash) return;

      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, '', link.hash);
      scroll.scrollTo(target, { offset: ANCHOR_OFFSET });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelled = true;
      document.removeEventListener('click', handleAnchorClick);
      scroll?.destroy();
      scroll = undefined;
    };
  }, []);

  return null;
}
