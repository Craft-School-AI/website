type LogoMarkProps = {
  className?: string;
};

/**
 * Знак Craft-School.ai: буква «C» с код-стрелками внутри и точками нейросети.
 * Цвета берутся из CSS-переменных темы, поэтому знак сам адаптируется
 * к светлой и тёмной теме.
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

      {/* Буква «C» — внешняя дуга */}
      <path
        d="M 260 140
           C 260 100, 220 80, 190 80
           C 140 80, 110 120, 110 170
           L 110 230
           C 110 280, 140 320, 190 320
           C 220 320, 260 300, 260 260"
        fill="none"
        stroke="url(#logo-main-gradient)"
        strokeWidth="24"
        strokeLinecap="round"
      />

      {/* Стрелка вперёд — символ кода и ИИ */}
      <path
        d="M 180 140 L 210 160 L 180 180"
        fill="none"
        stroke="rgb(var(--brand-amber))"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Стрелка назад — символ развития */}
      <path
        d="M 220 220 L 190 240 L 220 260"
        fill="none"
        stroke="rgb(var(--brand-amber))"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Точки нейросети */}
      <circle cx="120" cy="140" r="8" fill="rgb(var(--brand-amber))" opacity="0.8" />
      <circle cx="260" cy="260" r="8" fill="rgb(var(--brand-amber))" opacity="0.8" />
      <circle cx="270" cy="180" r="6" fill="rgb(var(--brand-terracotta))" opacity="0.6" />
      <circle cx="110" cy="220" r="6" fill="rgb(var(--brand-terracotta))" opacity="0.6" />
    </svg>
  );
}
