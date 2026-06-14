import type { ReactNode } from 'react';
import { LayeredShape } from './LayeredShape';
import { HERO_STACK_TILT } from '@/utils/shapeTransform';

interface PersonaInfoPanelProps {
  children: ReactNode;
  className?: string;
}

export function PersonaInfoPanel({ children, className }: PersonaInfoPanelProps) {
  return (
    <LayeredShape
      variant="info-panel"
      interactive
      className={className}
      tilt={{ ...HERO_STACK_TILT, rotate: -0.5 }}
      layers={[
        { color: 'bg-persona-white/80', offsetX: -8, offsetY: 8 },
        { color: 'bg-persona-black', offsetX: -4, offsetY: 4 },
      ]}
      contentClassName="w-full bg-persona-black/90 px-5 py-4 backdrop-blur-[2px]"
    >
      {children}
    </LayeredShape>
  );
}
