import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SkewBoxProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SkewBox({ children, className, contentClassName }: SkewBoxProps) {
  return (
    <div className={cn('persona-skew', className)}>
      <div className={cn('persona-unskew', contentClassName)}>{children}</div>
    </div>
  );
}
