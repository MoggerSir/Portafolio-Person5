import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  animation: () => void,
  dependencies: readonly unknown[] = [],
) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(animation, scope);
    return () => context.revert();
    // The animation callback is intentionally controlled by the caller's dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
