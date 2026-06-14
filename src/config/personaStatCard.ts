import type { CSSProperties } from 'react';
import personaStatCardFrame from '@/assets/ui/persona-stat-card-frame.png';

export const PERSONA_STAT_CARD_FRAME = personaStatCardFrame;

export interface PersonaStatCardLayout {
  /** Mueve toda la tarjeta (PNG + textos). Positivo = derecha */
  offsetX?: number;
  /** Mueve toda la tarjeta (PNG + textos). Positivo = abajo */
  offsetY?: number;
  /** Escala uniforme de toda la tarjeta (PNG + textos). 1 = base, 0.85 = 15% más chica */
  scale?: number;
  /** Origen de escala y desplazamiento */
  transformOrigin?: string;
}

export interface PersonaStatCardSlotTransform {
  rotate?: number;
  skewX?: number;
  fontScale?: number;
  transformOrigin?: string;
}

export interface PersonaStatCardHeaderSlot extends PersonaStatCardSlotTransform {
  top: string;
  left: string;
  width: string;
}

export interface PersonaStatCardStatsSlot extends PersonaStatCardSlotTransform {
  left: string;
  width: string;
  rows: readonly string[];
}

/** Posición global: mueve y escala marco PNG + textos juntos */
export const PERSONA_STAT_CARD_LAYOUT: PersonaStatCardLayout = {
  offsetX: 90,
  offsetY: 250,
  scale: 0.85,
  transformOrigin: 'center center',
};

/** Zonas calibradas para persona-stat-card-frame.png (1792×2400) */
export const PERSONA_STAT_CARD_SLOTS = {
  header: {
    top: '15%',
    left: '17.5%',
    width: '60%',
    rotate: -9,
    skewX: -10,
    fontScale: 1.6,
    transformOrigin: 'left top',
  },
  stats: {
    left: '17.5%',
    width: '57%',
    rotate: -10,
    skewX: -10,
    fontScale: 1.4,
    transformOrigin: 'left center',
    rows: ['53.5%', '64%', '73.5%', '83.2%'],
  },
} satisfies {
  header: PersonaStatCardHeaderSlot;
  stats: PersonaStatCardStatsSlot;
};

export const PERSONA_STAT_CARD_ASPECT = '1792 / 2400';

/** Ancho máximo de la tarjeta en la sección hero */
export const PERSONA_STAT_CARD_MAX_WIDTH = '24.5rem';

/** Desplaza y escala toda la tarjeta como un solo bloque */
export function buildCardTransform(
  layout: PersonaStatCardLayout,
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

/** Estilos globales de posición y escala de la tarjeta */
export function buildCardWrapperStyle(
  layout: PersonaStatCardLayout,
): CSSProperties {
  return {
    transform: buildCardTransform(layout),
    transformOrigin: layout.transformOrigin ?? 'center center',
  };
}

/** Construye transform: rotate + skewX */
export function buildSlotTransform(
  slot: Pick<PersonaStatCardSlotTransform, 'rotate' | 'skewX'>,
): string | undefined {
  const parts: string[] = [];

  if (slot.rotate) {
    parts.push(`rotate(${slot.rotate}deg)`);
  }

  if (slot.skewX) {
    parts.push(`skewX(${slot.skewX}deg)`);
  }

  return parts.length > 0 ? parts.join(' ') : undefined;
}

/** Estilos de posición, transform y escala tipográfica del slot */
export function buildSlotStyle(
  slot: PersonaStatCardSlotTransform & {
    top?: string;
    left?: string;
    width?: string;
  },
): CSSProperties {
  return {
    ...(slot.top !== undefined && { top: slot.top }),
    ...(slot.left !== undefined && { left: slot.left }),
    ...(slot.width !== undefined && { width: slot.width }),
    transform: buildSlotTransform(slot),
    transformOrigin: slot.transformOrigin,
    ['--slot-font-scale' as string]: String(slot.fontScale ?? 1),
  };
}
