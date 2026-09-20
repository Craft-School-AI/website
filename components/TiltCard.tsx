'use client';

import { ReactNode } from 'react';
import { TiltOptions, useTilt } from '@/hooks/useTilt';

type TiltCardProps = TiltOptions & {
  children: ReactNode;
  className?: string;
};

/**
 * Обёртка с 3D-наклоном за курсором (см. useTilt). Удобна там, где
 * содержимое рендерится на сервере: вся логика живёт в этом div,
 * а дети остаются обычными серверными элементами.
 */
export function TiltCard({
  children,
  className = '',
  ...options
}: TiltCardProps) {
  const { ref, style, handlers } = useTilt<HTMLDivElement>(options);

  return (
    <div ref={ref} className={className} style={style} {...handlers}>
      {children}
    </div>
  );
}
