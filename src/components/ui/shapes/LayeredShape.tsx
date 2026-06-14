import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import {
  buildContainerTransform,
  buildLayerTransform,
  DEFAULT_VARIANT_TILTS,
  type ShapeTilt,
} from '@/utils/shapeTransform';

export type PersonaClipVariant =
  | 'nav'
  | 'hero-name'
  | 'hero-title'
  | 'motto'
  | 'subtitle'
  | 'info-panel'
  | 'stat-card'
  | 'cta'
  | 'logo-bubble'
  | 'social-bar';

const clipClasses: Record<PersonaClipVariant, string> = {
  nav: 'persona-clip-nav',
  'hero-name': 'persona-clip-hero-name',
  'hero-title': 'persona-clip-title',
  motto: 'persona-clip-motto',
  subtitle: 'persona-clip-subtitle',
  'info-panel': 'persona-clip-info-panel',
  'stat-card': 'persona-clip-stat-card',
  cta: 'persona-clip-cta',
  'logo-bubble': 'persona-clip-logo-bubble',
  'social-bar': 'persona-clip-social-bar',
};

interface ShapeLayer {
  color: string;
  offsetX: number;
  offsetY: number;
}

interface LayeredShapeProps {
  variant: PersonaClipVariant;
  layers?: readonly ShapeLayer[];
  tilt?: ShapeTilt;
  className?: string;
  contentClassName?: string;
  /** Efecto hover estilo Persona 5: pop, bordes y capas animadas */
  interactive?: boolean;
  /** Estado seleccionado (nav activo): mantiene el efecto sin hover */
  selected?: boolean;
  children: ReactNode;
}

const defaultLayers: ShapeLayer[] = [
  { color: 'bg-persona-white', offsetX: -6, offsetY: 6 },
  { color: 'bg-persona-black', offsetX: -3, offsetY: 3 },
];

export function LayeredShape({
  variant,
  layers = defaultLayers,
  tilt,
  className,
  contentClassName,
  interactive = false,
  selected = false,
  children,
}: LayeredShapeProps) {
  const clipClass = clipClasses[variant];
  const resolvedTilt = tilt ?? DEFAULT_VARIANT_TILTS[variant];
  const transformOrigin = resolvedTilt.origin ?? 'left center';

  return (
    <div
      className={cn(
        'persona-shape-root inline-block max-w-full',
        interactive && 'persona-shape-interactive',
        selected && 'persona-shape-selected',
        className,
      )}
      data-variant={variant}
    >
      <div
        className="persona-shape-tilt relative inline-block max-w-full"
        style={{
          transform: buildContainerTransform(resolvedTilt),
          transformOrigin,
        }}
      >
        <div className="persona-shape-lift relative inline-block max-w-full">
          {layers.map((layer, index) => (
            <span
              key={`${layer.color}-${index}`}
              aria-hidden="true"
              className={cn(
                'persona-shape-shadow absolute inset-0',
                clipClass,
                layer.color,
              )}
              style={{
                ['--layer-x' as string]: `${layer.offsetX}px`,
                ['--layer-y' as string]: `${layer.offsetY}px`,
                transform: buildLayerTransform(layer.offsetX, layer.offsetY),
              }}
            />
          ))}

          <div
            className={cn(
              'persona-shape-content relative',
              clipClass,
              contentClassName,
            )}
          >
            {interactive && (
              <>
                <span
                  aria-hidden="true"
                  className="persona-shape-accent persona-shape-accent--tl"
                />
                <span
                  aria-hidden="true"
                  className="persona-shape-accent persona-shape-accent--tr"
                />
                <span
                  aria-hidden="true"
                  className="persona-shape-accent persona-shape-accent--bl"
                />
                <span
                  aria-hidden="true"
                  className="persona-shape-accent persona-shape-accent--br"
                />
                <span
                  aria-hidden="true"
                  className="persona-shape-sweep persona-halftone-light"
                />
              </>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
