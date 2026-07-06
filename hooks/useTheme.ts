'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'craft-school-theme';

/**
 * Светлая/тёмная тема. Класс `dark` на <html> выставляется ещё до гидратации
 * инлайн-скриптом в layout.tsx, здесь — только чтение и переключение.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Пока пользователь не выбрал тему вручную, следуем за системной —
  // в том числе если она сменилась прямо во время просмотра
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const followSystem = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return; // ручной выбор важнее
      } catch {
        // приватный режим — считаем, что ручного выбора нет
      }
      document.documentElement.classList.toggle('dark', event.matches);
      setTheme(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', followSystem);
    return () => media.removeEventListener('change', followSystem);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // приватный режим — просто не сохраняем
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
