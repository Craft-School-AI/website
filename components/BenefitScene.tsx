/**
 * Нарисованные визуалы для карточек преимуществ на главной.
 * Чистый SVG во флэт-стиле бренда. Цвета — токены темы, поэтому сцена
 * светлая в светлой теме и тёмная в тёмной (обводки/текст — ink, фон — surface).
 * Заполняют карточку как фон (preserveAspectRatio slice), поверх — скрим и текст.
 * Декоративны (aria-hidden). variant: 0 — скорость, 1 — экономия, 2 — контроль.
 */

const T = 'rgb(var(--brand-terracotta))';
const A = 'rgb(var(--brand-amber))';
const G = 'rgb(var(--brand-green))';
const INK = 'rgb(var(--text-primary))';
const BG = 'rgb(var(--bg-secondary))'; // фон сцены = фон карточки
const PANEL = 'rgb(var(--bg-primary))'; // внутренняя панель — светлее фона

type Props = { variant: number; className?: string };

export function BenefitScene({ variant, className = '' }: Props) {
  const common = {
    viewBox: '0 0 400 500',
    preserveAspectRatio: 'xMidYMid slice',
    className,
    'aria-hidden': true as const,
  };

  // 0 — Скорость: браузер-сайт собирается + молния
  if (variant === 0) {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill={BG} />
        <g stroke={INK} strokeOpacity="0.06" strokeWidth="10">
          <line x1="-20" y1="120" x2="420" y2="120" />
          <line x1="-20" y1="210" x2="420" y2="210" />
          <line x1="-20" y1="300" x2="420" y2="300" />
        </g>
        {/* окно браузера — собираемый сайт */}
        <rect x="52" y="92" width="250" height="228" rx="12" fill={PANEL} stroke={INK} strokeWidth="4" />
        <line x1="52" y1="132" x2="302" y2="132" stroke={INK} strokeWidth="3" />
        <circle cx="76" cy="112" r="7" fill={T} />
        <circle cx="100" cy="112" r="7" fill={A} />
        <circle cx="124" cy="112" r="7" fill={G} />
        <rect x="74" y="152" width="120" height="20" rx="5" fill={A} />
        <rect x="74" y="186" width="150" height="12" rx="4" fill={INK} fillOpacity="0.45" />
        <rect x="74" y="208" width="120" height="12" rx="4" fill={INK} fillOpacity="0.28" />
        <rect x="214" y="152" width="72" height="60" rx="8" fill={T} fillOpacity="0.85" />
        <rect x="74" y="244" width="104" height="34" rx="17" fill={G} />
        {/* молния — скорость */}
        <path d="M330,40 L286,150 L322,150 L280,272 L372,138 L336,138 Z" fill={A} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        {/* блок вот-вот встанет на место */}
        <g stroke={G} strokeWidth="8" strokeLinecap="round">
          <line x1="322" y1="288" x2="322" y2="332" />
          <line x1="300" y1="310" x2="344" y2="310" />
        </g>
      </svg>
    );
  }

  // 1 — Экономия: перечёркнутый ценник, монеты, кошелёк
  if (variant === 1) {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill={BG} />
        {/* перечёркнутый ценник студии */}
        <rect x="60" y="86" width="220" height="62" rx="12" fill={PANEL} stroke={INK} strokeWidth="3" />
        <circle cx="84" cy="117" r="7" fill={BG} stroke={INK} strokeWidth="3" />
        <text x="172" y="126" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="26" fill={INK}>150 000 ₽</text>
        <line x1="72" y1="144" x2="272" y2="92" stroke={T} strokeWidth="8" strokeLinecap="round" />
        {/* стрелка вниз — расходы падают */}
        <g stroke={G} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="330" y1="182" x2="330" y2="252" />
          <path d="M309,233 L330,256 L351,233" />
        </g>
        {/* стопка монет */}
        <g stroke={INK} strokeOpacity="0.3" strokeWidth="3">
          <ellipse cx="150" cy="304" rx="60" ry="18" fill={A} />
          <ellipse cx="150" cy="282" rx="60" ry="18" fill={A} />
          <ellipse cx="150" cy="260" rx="60" ry="18" fill={A} />
          <ellipse cx="150" cy="238" rx="60" ry="18" fill={A} />
        </g>
        <text x="150" y="246" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="22" fill={INK}>₽</text>
        {/* кошелёк */}
        <rect x="250" y="276" width="118" height="82" rx="14" fill={T} />
        <rect x="250" y="276" width="118" height="26" rx="13" fill={PANEL} fillOpacity="0.35" />
        <circle cx="348" cy="317" r="10" fill={A} />
      </svg>
    );
  }

  // 2 — Контроль: панель со слайдерами + мишень
  return (
    <svg {...common}>
      <rect width="400" height="500" fill={BG} />
      {/* панель управления */}
      <rect x="48" y="92" width="212" height="236" rx="16" fill={PANEL} stroke={INK} strokeWidth="4" />
      {/* слайдеры */}
      <line x1="76" y1="140" x2="232" y2="140" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="150" cy="140" r="14" fill={T} stroke={INK} strokeWidth="3" />
      <line x1="76" y1="184" x2="232" y2="184" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="198" cy="184" r="14" fill={A} stroke={INK} strokeWidth="3" />
      <line x1="76" y1="228" x2="232" y2="228" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="110" cy="228" r="14" fill={G} stroke={INK} strokeWidth="3" />
      {/* тумблер «вкл» */}
      <rect x="76" y="270" width="66" height="32" rx="16" fill={G} />
      <circle cx="126" cy="286" r="12" fill={PANEL} />
      {/* мишень — точный результат */}
      <circle cx="312" cy="196" r="52" fill="none" stroke={T} strokeWidth="12" />
      <circle cx="312" cy="196" r="30" fill="none" stroke={A} strokeWidth="12" />
      <circle cx="312" cy="196" r="10" fill={T} />
    </svg>
  );
}
