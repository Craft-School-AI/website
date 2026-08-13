/**
 * Осенние листья Craft School.
 *
 * - MapleLeaf — статичный SVG-лист (кленовый / простой), цвета из токенов темы.
 *   Используется как акцент у логотипа и как спрайт в падающих листьях.
 * - FallingLeaves — декоративный слой падающих листьев для hero главной.
 *   Анимации — CSS-keyframes из globals.css (leaf-fall / leaf-sway),
 *   при prefers-reduced-motion слой скрывается. Слой декоративный
 *   (aria-hidden, pointer-events-none) — на SEO и доступность не влияет.
 */

import type { CSSProperties } from 'react';

const terracotta = 'rgb(var(--brand-terracotta))';
const amber = 'rgb(var(--brand-amber))';
const olive = 'rgb(var(--brand-green))';
const rust = '#B5451F';
const pumpkin = '#A8571E';

// Прожилки — тёплый тёмный тон текста, приглушённый прозрачностью
const vein = 'rgb(var(--text-primary))';

type LeafProps = {
  className?: string;
  style?: CSSProperties;
  color?: string;
  /** 0 — простой лист, 1 — кленовый */
  variant?: 0 | 1;
};

export function MapleLeaf({
  className = '',
  style,
  color = terracotta,
  variant = 1,
}: LeafProps) {
  if (variant === 0) {
    // Простой лист: капля с прожилкой и черешком
    return (
      <svg viewBox="-9 -13 18 28" className={className} style={style} aria-hidden>
        <line x1="0" y1="10" x2="0" y2="14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M0,-11 C6,-6 6,6 0,11 C-6,6 -6,-6 0,-11 Z" fill={color} />
        <path d="M0,-8 L0,9" stroke={vein} strokeWidth="0.9" opacity="0.35" />
        <path d="M0,-3 L4,-6 M0,1 L4.5,-1 M0,-3 L-4,-6 M0,1 L-4.5,-1" stroke={vein} strokeWidth="0.8" opacity="0.3" fill="none" />
      </svg>
    );
  }

  // Кленовый лист: пять лопастей с зубчиками и черешком
  return (
    <svg viewBox="-13 -14 26 30" className={className} style={style} aria-hidden>
      <line x1="0" y1="5" x2="0" y2="13" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M0,-12 L2.4,-5 L8.5,-6.5 L5,-1 L10,3 L3.3,3.4 L4.8,9.5 L0,5 L-4.8,9.5 L-3.3,3.4 L-10,3 L-5,-1 L-8.5,-6.5 L-2.4,-5 Z"
        fill={color}
      />
      <path
        d="M0,4 L0,-9 M0,1 L6.5,-3.5 M0,1 L-6.5,-3.5 M0,3.4 L7.5,2.4 M0,3.4 L-7.5,2.4"
        stroke={vein}
        strokeWidth="0.8"
        opacity="0.32"
        fill="none"
      />
    </svg>
  );
}

// Детерминированный набор листьев (без Math.random — чтобы SSR и клиент совпали)
type FallingLeaf = {
  left: string;
  size: number;
  color: string;
  variant: 0 | 1;
  fallDur: number;
  fallDelay: number;
  swayDur: number;
  swayDelay: number;
};

const LEAVES: FallingLeaf[] = [
  { left: '6%', size: 26, color: terracotta, variant: 1, fallDur: 13, fallDelay: -2, swayDur: 3.4, swayDelay: -0.5 },
  { left: '15%', size: 18, color: amber, variant: 0, fallDur: 10, fallDelay: -6, swayDur: 2.8, swayDelay: -1.2 },
  { left: '24%', size: 30, color: rust, variant: 1, fallDur: 16, fallDelay: -9, swayDur: 4.2, swayDelay: -0.2 },
  { left: '33%', size: 16, color: amber, variant: 0, fallDur: 11, fallDelay: -1, swayDur: 3.0, swayDelay: -2.0 },
  { left: '44%', size: 22, color: pumpkin, variant: 1, fallDur: 14, fallDelay: -11, swayDur: 3.7, swayDelay: -0.8 },
  { left: '54%', size: 19, color: olive, variant: 0, fallDur: 12, fallDelay: -4, swayDur: 3.2, swayDelay: -1.6 },
  { left: '63%', size: 28, color: terracotta, variant: 1, fallDur: 15, fallDelay: -8, swayDur: 4.0, swayDelay: -0.4 },
  { left: '72%', size: 17, color: rust, variant: 0, fallDur: 10.5, fallDelay: -3, swayDur: 2.9, swayDelay: -1.0 },
  { left: '81%', size: 24, color: amber, variant: 1, fallDur: 13.5, fallDelay: -12, swayDur: 3.6, swayDelay: -2.3 },
  { left: '89%', size: 20, color: pumpkin, variant: 1, fallDur: 12.5, fallDelay: -5, swayDur: 3.3, swayDelay: -0.6 },
  { left: '95%', size: 16, color: olive, variant: 0, fallDur: 11.5, fallDelay: -7, swayDur: 3.1, swayDelay: -1.8 },
];

export function FallingLeaves() {
  return (
    <>
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="leaf-fall"
          style={{
            left: leaf.left,
            animationDuration: `${leaf.fallDur}s`,
            animationDelay: `${leaf.fallDelay}s`,
          }}
        >
          <span
            className="leaf-sway"
            style={{
              animationDuration: `${leaf.swayDur}s`,
              animationDelay: `${leaf.swayDelay}s`,
            }}
          >
            <MapleLeaf
              color={leaf.color}
              variant={leaf.variant}
              style={{ width: leaf.size, height: 'auto', display: 'block' }}
            />
          </span>
        </span>
      ))}
    </>
  );
}
