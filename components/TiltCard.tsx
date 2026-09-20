'use client';

import { PointerEvent, ReactNode, useEffect, useRef } from 'react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Максимальный наклон по осям X/Y, градусы. */
  maxTilt?: number;
  /** Максимальный доворот вокруг Z, градусы. */
  maxTwist?: number;
  /** Жёсткость пружины: меньше — медленнее догоняет курсор. */
  stiffness?: number;
  /** Затухание: ближе к 1 — дольше качается по инерции. */
  damping?: number;
};

/** Только desktop с мышью, без reduced-motion. */
const DESKTOP_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)';

type Pose = { rx: number; ry: number; rz: number; s: number };

const REST: Pose = { rx: 0, ry: 0, rz: 0, s: 1 };

/**
 * 3D-наклон карточки за курсором с инерцией: угол под мышкой уходит вглубь,
 * противоположный край подаётся к зрителю, плюс лёгкий доворот вокруг оси Z.
 * Движение считается пружиной на requestAnimationFrame, поэтому карточка
 * догоняет курсор с запаздыванием и слегка перелетает.
 * На тач-устройствах и узких экранах не делает ничего.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  maxTwist = 2,
  stiffness = 0.005,
  damping = 0.93,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const target = useRef<Pose>({ ...REST });
  const current = useRef<Pose>({ ...REST });
  const velocity = useRef<Pose>({ rx: 0, ry: 0, rz: 0, s: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => {
      enabled.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const tick = () => {
    const el = ref.current;
    if (!el) return;
    const c = current.current;
    const t = target.current;
    const v = velocity.current;
    let settled = true;

    (Object.keys(c) as (keyof Pose)[]).forEach((k) => {
      v[k] = (v[k] + (t[k] - c[k]) * stiffness) * damping;
      c[k] += v[k];
      if (Math.abs(v[k]) > 0.001 || Math.abs(t[k] - c[k]) > 0.001) {
        settled = false;
      }
    });

    el.style.transform = `perspective(900px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) rotateZ(${c.rz.toFixed(2)}deg) scale3d(${c.s.toFixed(3)}, ${c.s.toFixed(3)}, 1)`;

    if (settled) {
      frame.current = 0;
      if (t === REST || (t.rx === 0 && t.ry === 0 && t.rz === 0 && t.s === 1)) {
        el.style.transform = '';
        el.style.willChange = '';
      }
      return;
    }
    frame.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  };

  const handleEnter = () => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    el.style.willChange = 'transform';
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    const rect = el.getBoundingClientRect();
    // Позиция курсора относительно центра: от -0.5 до 0.5
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    target.current = {
      rx: -py * maxTilt * 2,
      ry: px * maxTilt * 2,
      rz: px * maxTwist * 2,
      s: 1.03,
    };
    start();
  };

  const handleLeave = () => {
    target.current = { ...REST };
    start();
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}
