/**
 * Фоновый слой hero: роботы-агенты ездят по нижней кромке экрана,
 * дрон парит в углу, искры ИИ мерцают за текстом.
 *
 * Чистый SVG + CSS-keyframes, без JavaScript. Цвета — из токенов темы,
 * при prefers-reduced-motion всё замирает. Слой декоративный
 * (aria-hidden, pointer-events-none) — на SEO и доступность не влияет.
 */

const terracotta = 'rgb(var(--brand-terracotta))';
const amber = 'rgb(var(--brand-amber))';
const green = 'rgb(var(--brand-green))';
const ink = 'rgb(var(--text-primary))';
const faint = 'rgb(var(--text-tertiary))';
const surface = 'rgb(var(--bg-primary))';

const styles = `
  .rb-drive-a { animation: rb-drive-a 30s linear infinite; }
  @keyframes rb-drive-a {
    from { transform: translateX(-160px); }
    to { transform: translateX(calc(100vw + 160px)); }
  }
  .rb-drive-b { animation: rb-drive-b 22s linear infinite; animation-delay: -9s; }
  @keyframes rb-drive-b {
    from { transform: translateX(calc(100vw + 160px)); }
    to { transform: translateX(-180px); }
  }
  .rb-wheel { transform-box: fill-box; transform-origin: center; animation: rb-spin 0.9s linear infinite; }
  .rb-wheel-rev { animation-direction: reverse; }
  @keyframes rb-spin { to { transform: rotate(360deg); } }
  .rb-gear { transform-box: fill-box; transform-origin: center; animation: rb-spin 26s linear infinite; }
  .rb-bob { animation: rb-bob 3.6s ease-in-out infinite; }
  @keyframes rb-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  .rb-rotor { transform-box: fill-box; transform-origin: center; animation: rb-rotor 0.4s linear infinite; }
  @keyframes rb-rotor {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.25); }
  }
  .rb-pulse { animation: rb-pulse 1.6s ease-in-out infinite; }
  @keyframes rb-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }
  .rb-blink { transform-box: fill-box; transform-origin: center; animation: rb-blink 4s infinite; }
  @keyframes rb-blink {
    0%, 91%, 100% { transform: scaleY(1); }
    94% { transform: scaleY(0.12); }
  }
  .rb-twinkle { transform-box: fill-box; transform-origin: center; animation: rb-twinkle 2.8s ease-in-out infinite; }
  @keyframes rb-twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.7); }
    50% { opacity: 0.8; transform: scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    [class*='rb-'] { animation: none !important; }
  }
`;

const sparklePath =
  'M0,-7 L1.8,-1.8 L7,0 L1.8,1.8 L0,7 L-1.8,1.8 L-7,0 L-1.8,-1.8 Z';

/** Робот-курьер: везёт кнопку для сайта */
function CourierRobot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-32 -68 102 80" className={className} aria-hidden>
      <line x1="0" y1="-46" x2="0" y2="-58" stroke={ink} strokeWidth="2.5" />
      <circle className="rb-pulse" cx="0" cy="-61" r="4" fill={amber} />
      <rect x="-28" y="-46" width="56" height="38" rx="10" fill={terracotta} />
      <rect x="-20" y="-40" width="40" height="18" rx="6" fill={surface} />
      <circle className="rb-blink" cx="-8" cy="-31" r="3.5" fill={ink} />
      <circle className="rb-blink" cx="8" cy="-31" r="3.5" fill={ink} style={{ animationDelay: '-0.1s' }} />
      <path d="M28,-34 L46,-26" stroke={terracotta} strokeWidth="5" strokeLinecap="round" />
      <rect x="42" y="-26" width="22" height="14" rx="7" fill={green} />
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
function ForkliftRobot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-44 -42 68 52" className={className} aria-hidden>
      <line x1="-26" y1="-36" x2="-26" y2="-4" stroke={ink} strokeWidth="3.5" />
      <line x1="-26" y1="-10" x2="-40" y2="-10" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="-40" y="-24" width="13" height="13" rx="2.5" fill={amber} />
      <rect x="-20" y="-30" width="40" height="24" rx="7" fill={amber} />
      <rect x="-12" y="-26" width="13" height="9" rx="3" fill={surface} />
      <circle className="rb-pulse" cx="14" cy="-33" r="3" fill={terracotta} style={{ animationDelay: '-0.8s' }} />
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
function Drone({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="272 96 56 44" className={className} aria-hidden>
      <line className="rb-rotor" x1="278" y1="104" x2="294" y2="104" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <line className="rb-rotor" x1="306" y1="104" x2="322" y2="104" stroke={ink} strokeWidth="3" strokeLinecap="round" style={{ animationDelay: '-0.2s' }} />
      <line x1="286" y1="106" x2="292" y2="114" stroke={ink} strokeWidth="2.5" />
      <line x1="314" y1="106" x2="308" y2="114" stroke={ink} strokeWidth="2.5" />
      <rect x="284" y="112" width="32" height="18" rx="8" fill={terracotta} />
      <circle cx="300" cy="121" r="4" fill={surface} />
      <circle className="rb-pulse" cx="300" cy="134" r="3" fill={amber} />
    </svg>
  );
}

/** Медленная шестерёнка */
function Gear({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="325 45 54 54" className={className} aria-hidden>
      <g className="rb-gear">
        <circle cx="352" cy="72" r="15" fill="none" stroke={faint} strokeWidth="5" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={352 + 15 * Math.cos((angle * Math.PI) / 180)}
            y1={72 + 15 * Math.sin((angle * Math.PI) / 180)}
            x2={352 + 22 * Math.cos((angle * Math.PI) / 180)}
            y2={72 + 22 * Math.sin((angle * Math.PI) / 180)}
            stroke={faint}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}

function Sparkle({
  className = '',
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg viewBox="-8 -8 16 16" className={className} aria-hidden>
      <path
        d={sparklePath}
        fill={amber}
        className="rb-twinkle"
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      />
    </svg>
  );
}

export function RobotBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{styles}</style>

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

      {/* Дрон в правом верхнем углу */}
      <div className="rb-bob absolute right-[8%] top-16 opacity-80 sm:right-[12%]">
        <Drone className="h-12 w-auto sm:h-14" />
      </div>

      {/* Шестерёнка в левом верхнем углу */}
      <Gear className="absolute left-[6%] top-10 h-14 w-14 opacity-20" />

      {/* Искры ИИ */}
      <Sparkle className="absolute left-[12%] top-[42%] h-4 w-4" />
      <Sparkle className="absolute right-[18%] top-[30%] h-3.5 w-3.5" delay={-1} />
      <Sparkle className="absolute right-[7%] top-[58%] h-3 w-3" delay={-1.9} />
      <Sparkle className="absolute left-[22%] top-[16%] h-3 w-3" delay={-0.6} />
    </div>
  );
}
