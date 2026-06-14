import { motion } from 'framer-motion';
import type { Profile } from '@/core/models';
import { PersonaStatRow } from './PersonaStatRow';
import {
  PERSONA_STAT_CARD_ASPECT,
  PERSONA_STAT_CARD_FRAME,
  PERSONA_STAT_CARD_LAYOUT,
  PERSONA_STAT_CARD_MAX_WIDTH,
  PERSONA_STAT_CARD_SLOTS,
  buildCardWrapperStyle,
  buildSlotStyle,
} from '@/config/personaStatCard';

interface PersonaCardProps {
  profile: Profile;
}

export function PersonaCard({ profile }: PersonaCardProps) {
  const { header, stats } = PERSONA_STAT_CARD_SLOTS;

  return (
    <div
      className="persona-stat-card-wrapper persona-stat-card-interactive"
      style={buildCardWrapperStyle(PERSONA_STAT_CARD_LAYOUT)}
    >
      <motion.aside
        className="persona-stat-card"
        style={{
          aspectRatio: PERSONA_STAT_CARD_ASPECT,
          maxWidth: PERSONA_STAT_CARD_MAX_WIDTH,
        }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-label={`Estadísticas de ${profile.firstName}`}
      >
        <img
          src={PERSONA_STAT_CARD_FRAME}
          alt=""
          className="persona-stat-card__frame"
          draggable={false}
        />

        <div className="persona-stat-card__overlay">
          <header className="persona-stat-card__header" style={buildSlotStyle(header)}>
            <p className="persona-stat-card__eyebrow">PERSONA —</p>
            <p className="persona-stat-card__name">{profile.firstName}</p>
            <p className="persona-stat-card__level">
              LVL <span>{profile.level}</span>
            </p>
          </header>

          <div className="persona-stat-card__stats-layer" style={buildSlotStyle(stats)}>
            {profile.stats.map((stat, index) => (
              <PersonaStatRow
                key={stat.label}
                stat={stat}
                index={index}
                style={{ top: stats.rows[index] }}
              />
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
