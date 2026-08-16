'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className="flex h-10 w-10 items-center justify-center transition-colors hover:text-terracotta"
    >
      {/* До гидратации тема неизвестна — показываем нейтральный символ */}
      {theme === null ? (
        <SunMoon className="h-5 w-5" aria-hidden />
      ) : theme === 'dark' ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
