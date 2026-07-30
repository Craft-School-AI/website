'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
  // Экземпляр держим в ref, чтобы к нему был доступ и из обработчиков,
  // и из эффекта на смену маршрута.
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Уважаем системную настройку «меньше движения»
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    // Эффект может размонтироваться до завершения динамического импорта
    // (например, StrictMode в dev) — без этого флага получится два
    // конкурирующих экземпляра
    let cancelled = false;

    // Динамический импорт: библиотека обращается к window при загрузке,
    // поэтому подключаем её только в браузере
    import('locomotive-scroll').then(({ default: LocomotiveScrollClass }) => {
      if (cancelled) return;
      scrollRef.current = new LocomotiveScrollClass({
        lenisOptions: {
          lerp: 0.1, // мягкость догоняющего скролла
          wheelMultiplier: 1,
          smoothWheel: true,
        },
      });
      // Первичная загрузка по ссылке с якорем (#...): Lenis стартует с нуля и
      // перебивает нативный переход браузера — доводим до цели сами.
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) {
          requestAnimationFrame(() =>
            scrollRef.current?.scrollTo(target, { offset: ANCHOR_OFFSET }),
          );
        }
      }
    });

    // Якорные ссылки ведём сами через Locomotive: иначе нативный прыжок
    // браузера и анимация Lenis спорят и промахиваются мимо цели
    const handleAnchorClick = (event: MouseEvent) => {
      const scroll = scrollRef.current;
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

    // Кнопка «Наверх» просит плавный подъём через Locomotive
    const handleScrollTop = (event: Event) => {
      const scroll = scrollRef.current;
      if (!scroll) return;
      event.preventDefault();
      scroll.scrollTo(0);
    };
    window.addEventListener('craft:scroll-top', handleScrollTop);

    // Плавный скролл к якорю по запросу компонентов (напр. карточки расписания).
    // detail.handled сообщает отправителю, что Locomotive взял скролл на себя.
    const handleScrollTo = (event: Event) => {
      const scroll = scrollRef.current;
      const detail = (event as CustomEvent<{ hash?: string; handled?: boolean }>)
        .detail;
      if (!scroll || !detail?.hash) return;
      const target = document.querySelector<HTMLElement>(detail.hash);
      if (!target) return;
      detail.handled = true;
      scroll.scrollTo(target, { offset: ANCHOR_OFFSET });
    };
    window.addEventListener('craft:scroll-to', handleScrollTo);

    return () => {
      cancelled = true;
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('craft:scroll-top', handleScrollTop);
      window.removeEventListener('craft:scroll-to', handleScrollTo);
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, []);

  // Скролл при клиентском переходе. Пока скроллом управляет Locomotive/Lenis,
  // штатное поведение Next.js (сброс наверх и переход к #якорю) не срабатывает —
  // делаем это сами: есть #якорь → плавно к цели, иначе → мгновенно наверх.
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) scroll.scrollTo(target, { offset: ANCHOR_OFFSET });
      return;
    }
    scroll.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
