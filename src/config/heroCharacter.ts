import type { CSSProperties } from 'react';

export interface HeroCharacterLayout {
  /** Mueve el PNG del personaje. Positivo = derecha */
  offsetX?: number;
  /** Mueve el PNG del personaje. Positivo = abajo */
  offsetY?: number;
  /** Escala uniforme. 1 = tamaño base, 1.2 = 20% más grande */
  scale?: number;
  /** Altura base de la imagen */
  height?: string;
  /** Ancho máximo de la imagen */
  maxWidth?: string;
  /** Punto de origen para translate/scale (por defecto: pies del personaje) */
  transformOrigin?: string;
}

/** Ajusta posición y escala del OC en la sección principal */
export const HERO_CHARACTER_LAYOUT: HeroCharacterLayout = {
  offsetX: 0,
  offsetY: 298,
  scale: 2.3,
  height: '20rem',
  maxWidth: '17rem',
  transformOrigin: 'center bottom',
};

/** Tamaño en pantallas md+ (opcional) */
export const HERO_CHARACTER_LAYOUT_MD: Pick<
  HeroCharacterLayout,
  'height' | 'maxWidth'
> = {
  height: '22rem',
  maxWidth: '19rem',
};

export function buildCharacterTransform(
  layout: HeroCharacterLayout,
): string | undefined {
  const parts: string[] = [];

  if (layout.offsetX || layout.offsetY) {
    parts.push(`translate(${layout.offsetX ?? 0}px, ${layout.offsetY ?? 0}px)`);
  }

  if (layout.scale && layout.scale !== 1) {
    parts.push(`scale(${layout.scale})`);
  }

  return parts.length > 0 ? parts.join(' ') : undefined;
}

export function buildCharacterWrapperStyle(
  layout: HeroCharacterLayout,
  md?: Pick<HeroCharacterLayout, 'height' | 'maxWidth'>,
): CSSProperties {
  return {
    transform: buildCharacterTransform(layout),
    transformOrigin: layout.transformOrigin ?? 'center bottom',
    ['--hero-char-height' as string]: layout.height ?? '20rem',
    ['--hero-char-max-width' as string]: layout.maxWidth ?? '17rem',
    ...(md?.height && { ['--hero-char-height-md' as string]: md.height }),
    ...(md?.maxWidth && {
      ['--hero-char-max-width-md' as string]: md.maxWidth,
    }),
  };
}
