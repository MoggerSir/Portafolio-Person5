import { gsap } from 'gsap';

export interface CarouselState {
  readonly activeIndex: number;
  readonly total: number;
}

export class ProjectCarouselController {
  private activeTimeline: gsap.core.Timeline | null = null;

  constructor(
    private readonly total: number,
    private activeIndex = 0,
  ) {}

  next(): CarouselState {
    this.activeIndex = (this.activeIndex + 1) % this.total;
    return this.state;
  }

  previous(): CarouselState {
    this.activeIndex = (this.activeIndex - 1 + this.total) % this.total;
    return this.state;
  }

  goTo(index: number): CarouselState {
    this.activeIndex = Math.max(0, Math.min(index, this.total - 1));
    return this.state;
  }

  animate(
    viewport: HTMLElement,
    track: HTMLElement,
    cards: readonly HTMLElement[],
    duration = 0.85,
  ): void {
    const card = cards[this.activeIndex];
    if (!card) return;
    const offset = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;

    this.activeTimeline?.kill();
    this.activeTimeline = gsap.timeline();
    gsap.set(track, { x: 0 });
    this.activeTimeline.to(viewport, {
      scrollLeft: offset,
      duration,
      ease: duration > 1 ? 'sine.inOut' : 'power4.inOut',
      overwrite: true,
    }, 0);

    cards.forEach((item, index) => {
      const distance = index - this.activeIndex;
      this.activeTimeline?.to(item, {
        y: Math.min(Math.abs(distance) * 22, 44),
        rotation: distance * 3.5,
        scale: index === this.activeIndex ? 1 : 0.9,
        opacity: Math.abs(distance) > 1 ? 0.45 : 1,
        duration,
        ease: duration > 1 ? 'sine.inOut' : 'back.out(1.35)',
      }, 0);
    });
  }

  followScroll(viewport: HTMLElement, cards: readonly HTMLElement[]): number {
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const useLightweightTouchMode = window.matchMedia('(pointer: coarse)').matches;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const pixelDistance = cardCenter - viewportCenter;
      const distance = pixelDistance / Math.max(card.clientWidth, 1);
      const absoluteDistance = Math.abs(distance);

      if (Math.abs(pixelDistance) < nearestDistance) {
        nearestIndex = index;
        nearestDistance = Math.abs(pixelDistance);
      }

      if (!useLightweightTouchMode) {
        gsap.to(card, {
          y: Math.min(Math.pow(absoluteDistance, 1.35) * 24, 54),
          rotation: Math.max(-7, Math.min(7, distance * 3.6)),
          scale: Math.max(.88, 1 - absoluteDistance * .075),
          opacity: Math.max(.48, 1 - absoluteDistance * .24),
          duration: .46,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    });

    this.activeIndex = nearestIndex;
    return nearestIndex;
  }

  pause(): void {
    this.activeTimeline?.kill();
    this.activeTimeline = null;
  }

  resume(): void {}

  destroy(): void {
    this.activeTimeline?.kill();
    this.activeTimeline = null;
  }

  get state(): CarouselState {
    return { activeIndex: this.activeIndex, total: this.total };
  }
}
