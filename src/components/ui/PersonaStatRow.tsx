import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import type { Stat } from '@/core/models';
import { cn } from '@/utils/cn';

interface PersonaStatRowProps {
  stat: Stat;
  index: number;
  style?: CSSProperties;
}

const SEGMENTS = 5;

export function PersonaStatRow({ stat, index, style }: PersonaStatRowProps) {
  const filledSegments = Math.round((stat.percentage / 100) * SEGMENTS);

  return (
    <div className={cn('persona-stat-row', style && 'persona-stat-row--placed')} style={style}>
      <span className="persona-stat-row__label">{stat.label}</span>
      <div className="persona-stat-row__segments" aria-hidden="true">
        {Array.from({ length: SEGMENTS }, (_, segmentIndex) => (
          <motion.span
            key={segmentIndex}
            className={cn(
              'persona-stat-row__segment',
              filledSegments > segmentIndex
                ? 'persona-stat-row__segment--filled'
                : 'persona-stat-row__segment--empty',
            )}
            style={{
              originX: 0,
              ['--blink-delay' as string]: `${index * 120 + segmentIndex * 90}ms`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.08 + segmentIndex * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
