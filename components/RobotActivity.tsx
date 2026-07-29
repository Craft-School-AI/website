'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  CourierRobot,
  Drone,
  ForkliftRobot,
  Gear,
  Sparkle,
} from '@/components/RobotBackdrop';

/**
 * Случайная «жизнь» роботов для фонов.
 *
 * Конфигурация (кто выехал, откуда, по какой полосе и с какой скоростью)
 * генерируется на клиенте после монтирования и обновляется при каждом
 * переходе между страницами — поэтому активность всякий раз разная.
 * На сервере слой пустой: декорации не попадают в HTML и не влияют
 * ни на SEO, ни на гидратацию.
 */

type GroundBot = {
  kind: 'courier' | 'forklift';
  /** 1 — слева направо, -1 — справа налево */
  dir: 1 | -1;
  bottom: number;
  height: number;
  duration: number;
  /** Отрицательная задержка — робот появляется из случайной точки маршрута */
  delay: number;
  opacity: number;
};

type Config = {
  bots: GroundBot[];
  drone: { side: 'left' | 'right'; inset: number; top: number; height: number; delay: number } | null;
  gear: { side: 'left' | 'right'; inset: number; top: number; size: number; opacity: number } | null;
  sparkles: { left: number; top: number; size: number; delay: number; color: string }[];
};

// Палитра звёздочек — токены бренда, подхватывают тему (см. globals.css)
const SPARKLE_COLORS = [
  'rgb(var(--brand-amber))',
  'rgb(var(--brand-terracotta))',
  'rgb(var(--brand-green))',
];

function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function makeConfig(laneMin: number, laneMax: number, withDrone: boolean): Config {
  const botCount = Math.random() < 0.5 ? 1 : 2;

  const bots: GroundBot[] = Array.from({ length: botCount }, (_, index) => {
    const duration = between(18, 40);
    return {
      kind: Math.random() < 0.5 ? 'courier' : 'forklift',
      dir: Math.random() < 0.5 ? 1 : -1,
      // Разводим роботов по разным полосам, чтобы не слипались
      bottom: between(laneMin, laneMax) + index * 14,
      height: between(44, 62),
      duration,
      delay: -duration * Math.random(),
      opacity: between(0.65, 0.9),
    };
  });

  return {
    bots,
    drone:
      withDrone && Math.random() < 0.6
        ? {
            side: Math.random() < 0.5 ? 'left' : 'right',
            inset: between(6, 16),
            top: between(12, 30),
            height: between(38, 52),
            delay: -between(0, 3.6),
          }
        : null,
    gear:
      Math.random() < 0.7
        ? {
            side: Math.random() < 0.5 ? 'left' : 'right',
            inset: between(4, 12),
            top: between(8, 24),
            size: between(40, 56),
            opacity: between(0.14, 0.24),
          }
        : null,
    sparkles: Array.from({ length: 6 + Math.floor(Math.random() * 4) }, () => ({
      left: between(4, 94),
      top: between(10, 74),
      size: between(9, 18),
      delay: -between(0, 2.8),
      color: pick(SPARKLE_COLORS),
    })),
  };
}

type RobotActivityProps = {
  /** Диапазон полос движения, px от нижнего края */
  laneMin?: number;
  laneMax?: number;
  /** Разрешить дрону парить над сценой */
  withDrone?: boolean;
  /** Рисовать линию пола */
  withFloor?: boolean;
};

export function RobotActivity({
  laneMin = 6,
  laneMax = 26,
  withDrone = true,
  withFloor = true,
}: RobotActivityProps) {
  const pathname = usePathname();
  const [config, setConfig] = useState<Config | null>(null);

  // Новая случайная сцена при каждом переходе между страницами
  useEffect(() => {
    setConfig(makeConfig(laneMin, laneMax, withDrone));
  }, [pathname, laneMin, laneMax, withDrone]);

  if (!config) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {withFloor && (
        <div
          className="absolute inset-x-0 border-t border-line/60"
          style={{ bottom: laneMin - 1 }}
        />
      )}

      {config.bots.map((bot, index) => {
        const Sprite = bot.kind === 'courier' ? CourierRobot : ForkliftRobot;
        // Курьер нарисован мордой вправо, погрузчик — влево;
        // при движении в «чужую» сторону зеркалим спрайт
        const flip =
          (bot.kind === 'courier' && bot.dir === -1) ||
          (bot.kind === 'forklift' && bot.dir === 1);

        return (
          <div
            key={index}
            className={bot.dir === 1 ? 'rb-drive-a absolute left-0' : 'rb-drive-b absolute left-0'}
            style={{
              bottom: bot.bottom,
              opacity: bot.opacity,
              animationDuration: `${bot.duration}s`,
              animationDelay: `${bot.delay}s`,
            }}
          >
            <div style={flip ? { transform: 'scaleX(-1)' } : undefined}>
              <Sprite className="w-auto" style={{ height: bot.height }} />
            </div>
          </div>
        );
      })}

      {config.drone && (
        <div
          className="rb-bob absolute opacity-75"
          style={{
            [config.drone.side]: `${config.drone.inset}%`,
            top: config.drone.top,
            animationDelay: `${config.drone.delay}s`,
          }}
        >
          <Drone className="w-auto" style={{ height: config.drone.height }} />
        </div>
      )}

      {config.gear && (
        <Gear
          className="absolute"
          style={{
            [config.gear.side]: `${config.gear.inset}%`,
            top: config.gear.top,
            width: config.gear.size,
            height: config.gear.size,
            opacity: config.gear.opacity,
          }}
        />
      )}

      {config.sparkles.map((sparkle, index) => (
        <Sparkle
          key={index}
          className="absolute"
          delay={sparkle.delay}
          color={sparkle.color}
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </div>
  );
}
