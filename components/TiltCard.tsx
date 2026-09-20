'use client';

import { PointerEvent, ReactNode, useEffect, useRef } from 'react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Максимальный наклон по осям X/Y, градусы. */
  maxTilt?: number;
  /** Максимальный доворот вокруг Z, градусы. */
  maxTwist?: number;
};

/** Только desktop с мышью, без reduced-motion. */
const DESKTOP_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * 3D-наклон карточки за курсором: угол под мышкой приподнимается к зрителю,
 * противоположный край уходит вглубь, плюс лёгкий доворот вокруг оси Z.
 * На тач-устройствах и узких экранах не делает ничего.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  maxTwist = 2,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => {
      enabled.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleEnter = () => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    el.style.transition = 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.willChange = 'transform';
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    const rect = el.getBoundingClientRect();
    // Позиция курсора относительно центра: от -0.5 до 0.5
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    // pointermove браузер сам ограничивает частотой кадров, rAF не нужен
    const rotateX = -py * maxTilt * 2;
    const rotateY = px * maxTilt * 2;
    const rotateZ = px * maxTwist * 2;
    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = '';
    el.style.willChange = '';
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
