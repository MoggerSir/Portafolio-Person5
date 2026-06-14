import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScreenTransitionProps {
  screenKey: string;
  children: ReactNode;
}

const screenVariants = {
  initial: {
    opacity: 0,
    x: 80,
    skewX: -4,
  },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -80,
    skewX: 4,
    transition: {
      duration: 0.35,
      ease: [0.55, 0, 1, 0.45] as const,
    },
  },
};

export function ScreenTransition({ screenKey, children }: ScreenTransitionProps) {
  return (
    <motion.div
      key={screenKey}
      className="absolute inset-0 overflow-hidden"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
