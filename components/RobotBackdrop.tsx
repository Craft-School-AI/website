/**
 * Роботы-персонажи Craft School.
 *
 * Спрайты — чистый SVG, анимации — CSS-keyframes из globals.css (префикс rb-).
 * Цвета берутся из токенов темы, при prefers-reduced-motion всё замирает.
 * Фоновые слои декоративные (aria-hidden, pointer-events-none) —
 * на SEO и доступность не влияют.
 *
 * - RobotBackdrop — полная сцена для hero главной страницы
 * - RobotActivity (components/RobotActivity.tsx) — случайная активность
 *   для шапок внутренних страниц и футера
 */

import type { CSSProperties } from 'react';

const terracotta = 'rgb(var(--brand-terracotta))';
const amber = 'rgb(var(--brand-amber))';
const green = 'rgb(var(--brand-green))';
const ink = 'rgb(var(--text-primary))';
const faint = 'rgb(var(--text-tertiary))';
const surface = 'rgb(var(--bg-primary))';

const sparklePath =
  'M0,-7 L1.8,-1.8 L7,0 L1.8,1.8 L0,7 L-1.8,1.8 L-7,0 L-1.8,-1.8 Z';

type SpriteProps = {
  className?: string;
  style?: CSSProperties;
};

/** Робот-курьер: везёт кнопку для сайта */
export function CourierRobot({ className = '', style }: SpriteProps) {
  return (
    <svg viewBox="-32 -68 102 80" className={className} style={style} aria-hidden>
      <line x1="0" y1="-46" x2="0" y2="-58" stroke={ink} strokeWidth="2.5" />
      <rect className="rb-pulse" x="-4" y="-65" width="8" height="8" fill={amber} />
      <rect x="-28" y="-46" width="56" height="38" fill={terracotta} />
      <rect x="-20" y="-40" width="40" height="18" fill={surface} />
      <rect className="rb-blink" x="-11" y="-34" width="7" height="7" fill={ink} />
      <rect className="rb-blink" x="4" y="-34" width="7" height="7" fill={ink} style={{ animationDelay: '-0.1s' }} />
      <path d="M28,-34 L46,-26" stroke={terracotta} strokeWidth="5" />
      <rect x="42" y="-26" width="22" height="14" fill={green} />
      <g className="rb-wheel">
        <circle cx="-14" cy="0" r="10" fill={ink} />
        <line x1="-14" y1="-6" x2="-14" y2="6" stroke={surface} strokeWidth="2.5" />
      </g>
      <g className="rb-wheel">
        <circle cx="14" cy="0" r="10" fill={ink} />
        <line x1="14" y1="-6" x2="14" y2="6" stroke={surface} strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Робот-погрузчик: везёт блок с картинкой */
export function ForkliftRobot({ className = '', style }: SpriteProps) {
  return (
    <svg viewBox="-44 -42 68 52" className={className} style={style} aria-hidden>
      <line x1="-26" y1="-36" x2="-26" y2="-4" stroke={ink} strokeWidth="3.5" />
      <line x1="-26" y1="-10" x2="-40" y2="-10" stroke={ink} strokeWidth="3.5" />
      <rect x="-40" y="-24" width="13" height="13" fill={amber} />
      <rect x="-20" y="-30" width="40" height="24" fill={amber} />
      <rect x="-12" y="-26" width="13" height="9" fill={surface} />
      <rect className="rb-pulse" x="11" y="-36" width="6" height="6" fill={terracotta} style={{ animationDelay: '-0.8s' }} />
      <g className="rb-wheel rb-wheel-rev">
        <circle cx="-10" cy="0" r="7" fill={ink} />
        <line x1="-10" y1="-4" x2="-10" y2="4" stroke={surface} strokeWidth="2" />
      </g>
      <g className="rb-wheel rb-wheel-rev">
        <circle cx="10" cy="0" r="7" fill={ink} />
        <line x1="10" y1="-4" x2="10" y2="4" stroke={surface} strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Дрон с мигающим огоньком */
export function Drone({ className = '', style }: SpriteProps) {
  return (
    <svg viewBox="272 96 56 44" className={className} style={style} aria-hidden>
      <line className="rb-rotor" x1="278" y1="104" x2="294" y2="104" stroke={ink} strokeWidth="3" />
      <line className="rb-rotor" x1="306" y1="104" x2="322" y2="104" stroke={ink} strokeWidth="3" style={{ animationDelay: '-0.2s' }} />
      <line x1="286" y1="106" x2="292" y2="114" stroke={ink} strokeWidth="2.5" />
      <line x1="314" y1="106" x2="308" y2="114" stroke={ink} strokeWidth="2.5" />
      <rect x="284" y="112" width="32" height="18" fill={terracotta} />
      <rect x="296" y="117" width="8" height="8" fill={surface} />
      <rect className="rb-pulse" x="297" y="131" width="6" height="6" fill={amber} />
    </svg>
  );
}

/** Медленная шестерёнка — квадратная обойма с зубьями по сторонам и углам */
export function Gear({ className = '', style }: SpriteProps) {
  // Зубья по сторонам стартуют от грани обоймы, угловые — от её угла
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg viewBox="325 45 54 54" className={className} style={style} aria-hidden>
      <g className="rb-gear">
        <rect x="337" y="57" width="30" height="30" fill="none" stroke={faint} strokeWidth="5" />
        {teeth.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const from = angle % 90 === 0 ? 15 : 21.2;

          return (
            <line
              key={angle}
              x1={352 + from * Math.cos(rad)}
              y1={72 + from * Math.sin(rad)}
              x2={352 + (from + 7) * Math.cos(rad)}
              y2={72 + (from + 7) * Math.sin(rad)}
              stroke={faint}
              strokeWidth="5"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Sparkle({
  className = '',
  style,
  delay = 0,
  color = amber,
}: SpriteProps & { delay?: number; color?: string }) {
  return (
    <svg viewBox="-8 -8 16 16" className={className} style={style} aria-hidden>
      <path
        d={sparklePath}
        fill={color}
        className="rb-twinkle"
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      />
    </svg>
  );
}

/** Полная сцена для hero главной страницы */
export function RobotBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Пол, по которому ездят роботы */}
      <div className="absolute inset-x-0 bottom-24 border-t border-line/70" />

      {/* Робот-курьер: слева направо по дальней полосе */}
      <div className="rb-drive-a absolute bottom-24 left-0">
        <CourierRobot className="h-20 w-auto sm:h-24" />
      </div>

      {/* Робот-погрузчик: справа налево по ближней полосе */}
      <div className="rb-drive-b absolute bottom-4 left-0">
        <ForkliftRobot className="h-14 w-auto sm:h-16" />
      </div>

      {/* Дрон в правом верхнем углу; на мобильных — выше и ближе к краю,
          чтобы не пересекаться с AI-меткой */}
      <div className="rb-bob absolute right-[3%] top-5 opacity-80 sm:right-[12%] sm:top-16">
        <Drone className="h-10 w-auto sm:h-14" />
      </div>

      {/* Шестерёнка в левом верхнем углу */}
      <Gear className="absolute left-[6%] top-10 h-14 w-14 opacity-20" />

      {/* Искры ИИ — разноцветные звёздочки бренда (янтарь / терракот / зелень) */}
      <Sparkle className="absolute left-[12%] top-[42%] h-4 w-4" color={amber} />
      <Sparkle className="absolute right-[18%] top-[30%] h-3.5 w-3.5" delay={-1} color={terracotta} />
      <Sparkle className="absolute right-[7%] top-[58%] h-3 w-3" delay={-1.9} color={green} />
      <Sparkle className="absolute left-[22%] top-[16%] h-3 w-3" delay={-0.6} color={amber} />
      <Sparkle className="absolute left-[6%] top-[68%] h-3.5 w-3.5" delay={-2.3} color={green} />
      <Sparkle className="absolute left-[34%] top-[22%] h-2.5 w-2.5" delay={-1.4} color={terracotta} />
      <Sparkle className="absolute right-[30%] top-[64%] h-3 w-3" delay={-0.9} color={amber} />
      <Sparkle className="absolute right-[40%] top-[13%] h-2.5 w-2.5" delay={-2.7} color={green} />
      <Sparkle className="absolute right-[24%] top-[46%] h-4 w-4" delay={-0.4} color={terracotta} />
      <Sparkle className="absolute left-[16%] top-[80%] h-2.5 w-2.5" delay={-1.6} color={amber} />
      <Sparkle className="absolute right-[10%] top-[76%] h-3 w-3" delay={-2.1} color={green} />
    </div>
  );
}
