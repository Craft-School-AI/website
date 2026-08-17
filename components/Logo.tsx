type LogoMarkProps = {
  className?: string;
};

/**
 * Знак Craft School: буква «C» с код-стрелками внутри и точками нейросети.
 *
 * Форма квадратная, в одном языке с кнопками, карточками и чипсами: прямые
 * отрезки вместо дуг, срезанные торцы линий, квадратные точки. Цвета берутся
 * из CSS-переменных темы, поэтому знак сам адаптируется к светлой и тёмной.
 */
export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <svg
      viewBox="80 50 220 300"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="logo-main-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--brand-terracotta))" />
          <stop offset="100%" stopColor="rgb(var(--brand-amber))" />
        </linearGradient>
      </defs>

      {/* Буква «C» — прямоугольная скоба */}
      <path
        d="M 262 92
           L 122 92
           L 122 308
           L 262 308"
        fill="none"
        stroke="url(#logo-main-gradient)"
        strokeWidth="24"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      {/* Стрелка вперёд — символ кода и ИИ */}
      <path
        d="M 180 140 L 210 160 L 180 180"
        fill="none"
        stroke="rgb(var(--brand-amber))"
        strokeWidth="16"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      {/* Стрелка назад — символ развития */}
      <path
        d="M 222 220 L 192 240 L 222 260"
        fill="none"
        stroke="rgb(var(--brand-amber))"
        strokeWidth="16"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      {/* Точки нейросети — квадратные */}
      <rect x="248" y="60" width="16" height="16" fill="rgb(var(--brand-amber))" opacity="0.8" />
      <rect x="248" y="324" width="16" height="16" fill="rgb(var(--brand-amber))" opacity="0.8" />
      <rect x="272" y="172" width="12" height="12" fill="rgb(var(--brand-terracotta))" opacity="0.6" />
      <rect x="96" y="194" width="12" height="12" fill="rgb(var(--brand-terracotta))" opacity="0.6" />
    </svg>
  );
}
