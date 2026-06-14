import { motion } from 'framer-motion';
import type { Profile } from '@/core/models';
import { PersonaButton } from '@/components/ui/PersonaButton';
import { PersonaCard } from '@/components/ui/PersonaCard';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { highlightBioText } from '@/utils/highlightBioText';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';
import { PersonaInfoPanel } from '@/components/ui/shapes/PersonaInfoPanel';
import type { ScreenId } from '@/core/services/ScreenNavigationService';
import { HeroCharacter } from '@/components/ui/HeroCharacter';
import { HERO_STACK_TILT } from '@/utils/shapeTransform';

interface HeroSectionProps {
  profile: Profile;
  onNavigate: (screenId: ScreenId) => void;
}

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  const bioSegments = highlightBioText(profile.bio, profile.bioHighlights);

  return (
    <section className="screen-panel screen-panel--inset relative h-full overflow-y-auto overflow-x-hidden lg:overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-rows-[auto_auto] gap-6 px-0 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:px-10">
        <div className="flex flex-col gap-4 lg:gap-5">
          <motion.div
            className="relative z-10 w-fit"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LayeredShape
              variant="motto"
              interactive
              tilt={{ ...HERO_STACK_TILT, rotate: -2 }}
              layers={[
                { color: 'bg-persona-red', offsetX: -5, offsetY: 5 },
                { color: 'bg-persona-white', offsetX: -2, offsetY: 2 },
              ]}
              contentClassName="bg-persona-black px-4 py-2 text-xs tracking-[0.2em] text-persona-white uppercase"
            >
              {profile.motto}
            </LayeredShape>
          </motion.div>

          <div className="relative z-20 space-y-0">
            <motion.div
              className="relative z-20 w-fit"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LayeredShape
                variant="hero-name"
                interactive
                tilt={HERO_STACK_TILT}
                layers={[
                  { color: 'bg-persona-white', offsetX: -8, offsetY: 8 },
                  { color: 'bg-persona-red', offsetX: -4, offsetY: 4 },
                ]}
                contentClassName="bg-persona-black px-6 py-2 md:px-8 md:py-3"
              >
                <h1 className="font-display text-6xl tracking-[0.08em] text-persona-white md:text-8xl lg:text-[7.5rem]">
                  {profile.firstName}
                </h1>
              </LayeredShape>
            </motion.div>

            <motion.div
              className="relative z-30 -mt-1 ml-5 w-fit md:ml-10"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LayeredShape
                variant="hero-title"
                interactive
                tilt={{ ...HERO_STACK_TILT, rotate: 0.5 }}
                layers={[
                  { color: 'bg-persona-black', offsetX: -7, offsetY: 7 },
                  { color: 'bg-persona-white', offsetX: -3, offsetY: 3 },
                ]}
                contentClassName="bg-persona-red px-6 py-2 md:px-8 md:py-3"
              >
                <p className="font-display text-5xl tracking-[0.08em] text-persona-black md:text-7xl lg:text-8xl">
                  {profile.role}
                </p>
              </LayeredShape>
            </motion.div>
          </div>

          <motion.div
            className="relative z-40 ml-2 w-fit md:ml-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <LayeredShape
              variant="subtitle"
              interactive
              tilt={{ ...HERO_STACK_TILT, rotate: 1 }}
              layers={[{ color: 'bg-persona-red', offsetX: -4, offsetY: 4 }]}
              contentClassName="inline-flex items-center gap-3 bg-persona-black px-5 py-2"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center border-2 border-persona-red text-xs text-persona-red"
              >
                ★
              </span>
              <p className="text-sm font-semibold tracking-[0.25em] text-persona-white uppercase">
                {profile.subtitle}
              </p>
            </LayeredShape>
          </motion.div>

          <motion.div
            className="relative z-50 mt-1 w-full max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <PersonaInfoPanel>
              <p className="text-base leading-relaxed text-persona-white/95 md:text-lg">
                {bioSegments.map((segment, index) => (
                  <span
                    key={`${segment.text}-${index}`}
                    className={
                      segment.highlighted
                        ? 'font-bold text-persona-red'
                        : undefined
                    }
                  >
                    {segment.text}
                  </span>
                ))}
              </p>
            </PersonaInfoPanel>
          </motion.div>

          <motion.div
            className="relative z-50 ml-2 w-fit md:ml-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <PersonaButton onClick={() => onNavigate('proyectos')}>
              Ver Proyectos
            </PersonaButton>
          </motion.div>
        </div>

        <div className="relative z-20 flex min-h-[28rem] flex-col items-end justify-center md:min-h-[32rem]">
          <motion.div
            className="relative w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-[58%] rounded-full border-[14px] border-persona-black bg-persona-red/85 md:h-80 md:w-80"
            />
            <div className="hero-figure relative">
              <HeroCharacter
                src={profile.avatar}
                alt={`OC de ${profile.fullName}`}
              />

              <div className="hero-figure__stats pointer-events-none">
                <PersonaCard profile={profile} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
