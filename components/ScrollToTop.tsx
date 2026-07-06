'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Кнопка «Наверх» в правом нижнем углу.
 * Появляется после прокрутки на высоту экрана; клик поднимает страницу
 * плавно через Locomotive Scroll (см. SmoothScrollProvider), а при его
 * отсутствии — нативным smooth-скроллом.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    // Если активен Locomotive, провайдер перехватит событие (preventDefault)
    const event = new CustomEvent('craft:scroll-top', { cancelable: true });
    const notHandled = window.dispatchEvent(event);
    if (notHandled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft shadow-soft transition-all duration-300 hover:border-terracotta hover:text-terracotta ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
