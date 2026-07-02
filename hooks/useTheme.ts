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
