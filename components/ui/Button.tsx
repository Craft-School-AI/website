import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'md' | 'lg';

// Брутальный квадратный стиль: острые углы, толстая рамка, плотная терракотовая
// тень со смещением и «нажатие» на active — в едином языке с карточками.
const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-[3px] border-ink font-semibold transition-all duration-150 shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--brand-terracotta))] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--brand-terracotta))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  // CTA — оксид зелени (см. палитру в globals.css)
  primary: 'bg-green text-graphite hover:brightness-105',
  secondary: 'bg-amber text-graphite hover:brightness-105',
  outline: 'bg-surface text-terracotta hover:bg-terracotta hover:text-ivory',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-2.5 text-sm sm:text-base',
  lg: 'px-8 py-3.5 text-base sm:text-lg',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
