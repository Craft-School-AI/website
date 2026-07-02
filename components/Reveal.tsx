'use client';

import { CSSProperties, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

type RevealProps = {
  children: ReactNode;
  /** Задержка в мс — для ступенчатого появления карточек */
  delay?: number;
  className?: string;
};

/** Обёртка с анимацией появления при скролле (Intersection Observer + CSS). */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isInView } = useInView();

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal ${isInView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
