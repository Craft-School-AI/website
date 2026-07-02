'use client';

import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Задержка в мс — для ступенчатого появления карточек */
  delay?: number;
  className?: string;
};

/** Обёртка с анимацией появления при скролле (Intersection Observer + CSS). */
export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
  ...rest
}: RevealProps) {
  const { ref, isInView } = useInView();

  const mergedStyle: CSSProperties | undefined = delay
    ? { ...style, transitionDelay: `${delay}ms` }
    : style;

  return (
    <div
      ref={ref}
      style={mergedStyle}
      className={`reveal ${isInView ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
