import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';
import { HERO_STACK_TILT } from '@/utils/shapeTransform';

interface PersonaButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function PersonaButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className,
}: PersonaButtonProps) {
  const content = (
    <LayeredShape
      variant="cta"
      interactive
      tilt={{ ...HERO_STACK_TILT, rotate: -1.5 }}
      layers={[
        { color: 'bg-persona-white', offsetX: -8, offsetY: 8 },
        { color: 'bg-persona-black', offsetX: -4, offsetY: 4 },
      ]}
      contentClassName={cn(
        'inline-flex items-center gap-4 px-8 py-4 font-display text-xl tracking-wider uppercase',
        variant === 'primary'
          ? 'bg-persona-red text-persona-white'
          : 'bg-persona-black text-persona-white',
      )}
    >
      <span className="persona-halftone-light absolute inset-0 opacity-20" />
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="persona-clip-arrow-box relative z-10 inline-flex h-9 w-9 items-center justify-center bg-persona-black text-lg text-persona-white transition-transform duration-200 group-hover/btn:translate-x-1"
      >
        →
      </motion.span>
    </LayeredShape>
  );

  const interactionClasses =
    'group/btn cursor-pointer border-none bg-transparent p-0 outline-none';

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(interactionClasses, className)}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(interactionClasses, className)}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
