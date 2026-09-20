'use client';

import { PointerEvent, useEffect, useRef } from 'react';

export type TiltOptions = {
  /** Максимальный наклон по осям X/Y, градусы. */
  maxTilt?: number;
  /** Максимальный доворот вокруг Z, градусы. */
  maxTwist?: number;
  /** Увеличение карточки под курсором. */
  hoverScale?: number;
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

const isRest = (p: Pose) => p.rx === 0 && p.ry === 0 && p.rz === 0 && p.s === 1;

/**
 * 3D-наклон элемента за курсором с инерцией: угол под мышкой уходит вглубь,
 * противоположный край подаётся к зрителю, плюс лёгкий доворот вокруг оси Z.
 * Движение считается пружиной на requestAnimationFrame, поэтому элемент
 * догоняет курсор с запаздыванием и слегка перелетает.
 * На тач-устройствах и узких экранах не делает ничего.
 *
 * Возвращает ref и обработчики указателя — их нужно повесить на один
 * и тот же элемент (см. TiltCard как готовую обёртку).
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 12,
  maxTwist = 2,
  hoverScale = 1.03,
  stiffness = 0.005,
  damping = 0.93,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
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
      if (isRest(t)) {
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

  const onPointerEnter = () => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    el.style.willChange = 'transform';
  };

  const onPointerMove = (e: PointerEvent<T>) => {
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
      s: hoverScale,
    };
    start();
  };

  const onPointerLeave = () => {
    target.current = { ...REST };
    start();
  };

  return {
    ref,
    /** Стиль контейнера: сохраняет 3D для вложенных элементов. */
    style: { transformStyle: 'preserve-3d' } as const,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  };
}
