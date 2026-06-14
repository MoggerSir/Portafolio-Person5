import { cn } from '@/utils/cn';

interface HalftoneOverlayProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function HalftoneOverlay({
  variant = 'dark',
  className,
}: HalftoneOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 opacity-40',
        variant === 'dark' ? 'persona-halftone' : 'persona-halftone-light',
        className,
      )}
    />
  );
}
