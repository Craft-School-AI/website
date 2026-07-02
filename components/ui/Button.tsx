import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  // CTA — оксид зелени (см. палитру в globals.css)
  primary:
    'bg-green text-graphite shadow-soft hover:brightness-105 hover:shadow-hover active:scale-[0.98]',
  secondary:
    'bg-amber text-graphite shadow-soft hover:brightness-105 active:scale-[0.98]',
  outline:
    'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-ivory',
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
