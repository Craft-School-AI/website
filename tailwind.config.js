/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Все цвета — семантические токены из CSS-переменных (app/globals.css).
      // Переменные заданы RGB-триплетами, поэтому работают модификаторы
      // прозрачности вида bg-amber/15.
      colors: {
        // Фоны: основной / карточки / акцентные блоки
        surface: {
          DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)',
          soft: 'rgb(var(--bg-secondary) / <alpha-value>)',
          deep: 'rgb(var(--bg-tertiary) / <alpha-value>)',
        },
        // Текст: основной / подзаголовки / мелкий
        ink: {
          DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
          soft: 'rgb(var(--text-secondary) / <alpha-value>)',
          faint: 'rgb(var(--text-tertiary) / <alpha-value>)',
        },
        // Границы
        line: 'rgb(var(--border-light) / <alpha-value>)',
        // Акценты бренда
        terracotta: 'rgb(var(--brand-terracotta) / <alpha-value>)', // главный цвет
        amber: 'rgb(var(--brand-amber) / <alpha-value>)', // AI-акценты
        green: 'rgb(var(--brand-green) / <alpha-value>)', // CTA
        // Статичные цвета — не зависят от темы (текст на цветных кнопках и бейджах)
        ivory: '#FDF8F0',
        graphite: '#1A1D1F',
      },
      fontFamily: {
        display: ['var(--font-body)', 'Arial', 'sans-serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        hover: 'var(--shadow-hover)',
      },
    },
  },
  plugins: [],
};
