import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type GlassCardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function GlassCard<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...props
}: GlassCardProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component className={`glass-card ${className}`} {...props}>
      {children}
    </Component>
  );
}
