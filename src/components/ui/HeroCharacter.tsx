import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  HERO_CHARACTER_LAYOUT,
  HERO_CHARACTER_LAYOUT_MD,
  buildCharacterWrapperStyle,
} from '@/config/heroCharacter';

interface HeroCharacterProps {
  src: string;
  alt: string;
}

interface HitboxStyle {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CLICK_DELAY_MS = 260;

export function HeroCharacter({ src, alt }: HeroCharacterProps) {
  const controls = useAnimation();
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [hitbox, setHitbox] = useState<HitboxStyle | null>(null);

  const syncHitbox = useCallback(() => {
    const visual = visualRef.current;
    const figure = visual?.closest('.hero-figure') as HTMLElement | null;

    if (!visual || !figure) {
      return;
    }

    const visualRect = visual.getBoundingClientRect();
    const figureRect = figure.getBoundingClientRect();

    setHitbox({
      top: visualRect.top - figureRect.top,
      left: visualRect.left - figureRect.left,
      width: visualRect.width,
      height: visualRect.height,
    });
  }, []);

  useLayoutEffect(() => {
    syncHitbox();

    const visual = visualRef.current;
    if (!visual) {
      return;
    }

    const observer = new ResizeObserver(syncHitbox);
    observer.observe(visual);
    window.addEventListener('resize', syncHitbox);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHitbox);
    };
  }, [syncHitbox]);

  const playJump = useCallback(async () => {
    await controls.start({
      y: [0, -34, -10, 0],
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    });
    controls.set({ y: 0 });
  }, [controls]);

  const playSpin = useCallback(async () => {
    await controls.start({
      rotateY: [0, 360],
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    });
    controls.set({ rotateY: 0 });
  }, [controls]);

  const handleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickTimer.current = setTimeout(() => {
      void playJump();
      clickTimer.current = null;
    }, CLICK_DELAY_MS);
  };

  const handleDoubleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }

    void playSpin();
  };

  const wrapperStyle = buildCharacterWrapperStyle(
    HERO_CHARACTER_LAYOUT,
    HERO_CHARACTER_LAYOUT_MD,
  );

  return (
    <>
      <div
        ref={visualRef}
        className="hero-character hero-character--visual"
        style={wrapperStyle}
        aria-hidden="true"
      >
        <motion.div
          className="hero-character__motion"
          animate={controls}
          initial={{ y: 0, rotateY: 0 }}
        >
          <img
            src={src}
            alt=""
            className="hero-character__image"
            draggable={false}
            loading="eager"
          />
        </motion.div>
      </div>

      {hitbox && (
        <motion.button
          type="button"
          className="hero-character__hitbox"
          style={{
            top: hitbox.top,
            left: hitbox.left,
            width: hitbox.width,
            height: hitbox.height,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          animate={controls}
          initial={{ y: 0, rotateY: 0 }}
          aria-label={alt}
        />
      )}
    </>
  );
}
