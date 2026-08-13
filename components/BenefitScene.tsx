/**
 * Нарисованные визуалы для карточек «Чему вы научитесь» на главной.
 * Чистый SVG во флэт-стиле бренда. Цвета — токены темы, поэтому сцена
 * светлая в светлой теме и тёмная в тёмной (обводки/текст — ink, фон — surface).
 * Заполняют карточку как фон (preserveAspectRatio slice), поверх — скрим и текст.
 * Декоративны (aria-hidden). variant: 0 — ИИ-агент, 1 — рабочие сайты, 2 — подход.
 */

const T = 'rgb(var(--brand-terracotta))';
const A = 'rgb(var(--brand-amber))';
const G = 'rgb(var(--brand-green))';
const INK = 'rgb(var(--text-primary))';
const BG = 'rgb(var(--bg-secondary))'; // фон сцены = фон карточки
const PANEL = 'rgb(var(--bg-primary))'; // внутренняя панель — светлее фона

const sparkle = 'M0,-9 L2.3,-2.3 L9,0 L2.3,2.3 L0,9 L-2.3,2.3 L-9,0 L-2.3,-2.3 Z';

type Props = { variant: number; className?: string };

export function BenefitScene({ variant, className = '' }: Props) {
  const common = {
    viewBox: '0 0 400 500',
    preserveAspectRatio: 'xMidYMid slice',
    className,
    'aria-hidden': true as const,
  };

  // 0 — ИИ-агент: дружелюбный робот-помощник
  if (variant === 0) {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill={BG} />
        {/* искры ИИ */}
        <path d={sparkle} transform="translate(316 150)" fill={A} />
        <path d={sparkle} transform="translate(92 232) scale(0.7)" fill={T} />
        {/* антенна */}
        <line x1="200" y1="98" x2="200" y2="122" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="90" r="10" fill={A} />
        {/* голова */}
        <rect x="120" y="120" width="160" height="122" rx="28" fill={T} />
        <rect x="142" y="144" width="116" height="66" rx="16" fill={PANEL} />
        <circle cx="180" cy="176" r="9" fill={INK} />
        <circle cx="220" cy="176" r="9" fill={INK} />
        <path d="M184,197 Q200,208 216,197" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="120" cy="182" r="10" fill={A} />
        <circle cx="280" cy="182" r="10" fill={A} />
        {/* шея и корпус */}
        <rect x="176" y="242" width="48" height="18" fill={INK} />
        <rect x="132" y="260" width="136" height="88" rx="22" fill={G} />
        <circle cx="200" cy="302" r="15" fill={PANEL} />
        <circle cx="200" cy="302" r="6" fill={T} />
      </svg>
    );
  }

  // 1 — Рабочие сайты: собранное окно браузера
  if (variant === 1) {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill={BG} />
        <g stroke={INK} strokeOpacity="0.06" strokeWidth="10">
          <line x1="-20" y1="120" x2="420" y2="120" />
          <line x1="-20" y1="210" x2="420" y2="210" />
          <line x1="-20" y1="300" x2="420" y2="300" />
        </g>
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
        {/* галочка «готово» */}
        <path d="M300,286 l14,14 l24,-28" fill="none" stroke={G} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 2 — Правильный подход: панель со слайдерами + мишень
  return (
    <svg {...common}>
      <rect width="400" height="500" fill={BG} />
      <rect x="48" y="92" width="212" height="236" rx="16" fill={PANEL} stroke={INK} strokeWidth="4" />
      <line x1="76" y1="140" x2="232" y2="140" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="150" cy="140" r="14" fill={T} stroke={INK} strokeWidth="3" />
      <line x1="76" y1="184" x2="232" y2="184" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="198" cy="184" r="14" fill={A} stroke={INK} strokeWidth="3" />
      <line x1="76" y1="228" x2="232" y2="228" stroke={INK} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
      <circle cx="110" cy="228" r="14" fill={G} stroke={INK} strokeWidth="3" />
      <rect x="76" y="270" width="66" height="32" rx="16" fill={G} />
      <circle cx="126" cy="286" r="12" fill={PANEL} />
      <circle cx="312" cy="196" r="52" fill="none" stroke={T} strokeWidth="12" />
      <circle cx="312" cy="196" r="30" fill="none" stroke={A} strokeWidth="12" />
      <circle cx="312" cy="196" r="10" fill={T} />
    </svg>
  );
}
