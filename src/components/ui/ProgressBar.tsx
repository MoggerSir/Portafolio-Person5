import { motion } from 'framer-motion';
import type { Stat } from '@/core/models';

interface ProgressBarProps {
  stat: Stat;
  index: number;
}

const SEGMENTS = 5;

export function ProgressBar({ stat, index }: ProgressBarProps) {
  const filledSegments = Math.round((stat.percentage / 100) * SEGMENTS);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-semibold tracking-[0.2em] text-persona-black">
        <span>{stat.label}</span>
        <span>{stat.percentage}</span>
      </div>
      <div className="flex gap-1" style={{ transform: 'skewX(-6deg)' }}>
        {Array.from({ length: SEGMENTS }, (_, segmentIndex) => {
          const isFilled = segmentIndex < filledSegments;

          return (
            <motion.span
              key={segmentIndex}
              className={`h-3 flex-1 persona-clip-stat-segment ${
                isFilled ? 'bg-persona-red' : 'border border-persona-black/30 bg-persona-white'
              }`}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.1 + segmentIndex * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0 }}
            />
          );
        })}
      </div>
    </div>
  );
}
