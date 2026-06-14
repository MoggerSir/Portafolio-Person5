export interface ShapeTilt {
  skewX?: number;
  skewY?: number;
  rotate?: number;
  origin?: string;
}

/** Capas decorativas: solo desplazamiento, sin inclinación extra */
export function buildLayerTransform(offsetX: number, offsetY: number): string {
  return `translate(${offsetX}px, ${offsetY}px)`;
}

/** Contenedor: inclinación 2D controlada */
export function buildContainerTransform(tilt: ShapeTilt): string {
  const parts = [`skewX(${tilt.skewX ?? 0}deg)`];

  if (tilt.skewY) {
    parts.push(`skewY(${tilt.skewY}deg)`);
  }

  if (tilt.rotate) {
    parts.push(`rotate(${tilt.rotate}deg)`);
  }

  return parts.join(' ');
}

export const HERO_STACK_TILT: ShapeTilt = {
  skewX: -10,
  rotate: -1,
  origin: 'left center',
};

export const NAV_BASE_TILT: ShapeTilt = {
  skewX: -12,
  rotate: 0,
  origin: 'center center',
};

export const CARD_TILT: ShapeTilt = {
  skewX: 3,
  rotate: 1.5,
  origin: 'center center',
};

export const DEFAULT_VARIANT_TILTS = {
  nav: NAV_BASE_TILT,
  'hero-name': HERO_STACK_TILT,
  'hero-title': { ...HERO_STACK_TILT, rotate: 0.5 },
  motto: { ...HERO_STACK_TILT, rotate: -2 },
  subtitle: { ...HERO_STACK_TILT, rotate: 1 },
  'info-panel': { ...HERO_STACK_TILT, rotate: -0.5 },
  'stat-card': CARD_TILT,
  cta: { ...HERO_STACK_TILT, rotate: -1.5 },
  'logo-bubble': { skewX: -8, rotate: -3, origin: 'left center' },
  'social-bar': { skewX: -10, rotate: 1, origin: 'right center' },
} as const satisfies Record<string, ShapeTilt>;

export function getNavButtonTilt(index: number): ShapeTilt {
  return {
    ...NAV_BASE_TILT,
    rotate: index * 0.6,
  };
}

export function getNavButtonOffset(index: number): number {
  return index * 3;
}
