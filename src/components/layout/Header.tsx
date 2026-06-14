import { motion } from 'framer-motion';
import type { NavItem } from '@/core/models';
import type { ScreenId } from '@/core/services/ScreenNavigationService';
import { PersonaNavButton } from '@/components/ui/shapes/PersonaNavButton';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';

interface HeaderProps {
  logo: string;
  navigation: readonly NavItem[];
  activeScreen: ScreenId;
  onNavigate: (screenId: ScreenId) => void;
}

export function Header({
  logo,
  navigation,
  activeScreen,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="app-header fixed top-0 right-0 left-0 z-50 pb-4 lg:px-10 lg:pt-10">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 lg:gap-6">
        <motion.button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="cursor-pointer border-none bg-transparent p-0 outline-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Ir a inicio"
        >
          <LayeredShape
            variant="logo-bubble"
            interactive
            tilt={{ skewX: -8, rotate: -3, origin: 'left center' }}
            layers={[
              { color: 'bg-persona-red', offsetX: -5, offsetY: 5 },
              { color: 'bg-persona-black', offsetX: -2, offsetY: 2 },
            ]}
            contentClassName="bg-persona-white px-5 py-2"
          >
            <span className="font-display text-3xl tracking-wider text-persona-black md:text-4xl">
              {logo}
            </span>
          </LayeredShape>
        </motion.button>

        <div className="flex items-start gap-4 lg:gap-6">
          <nav
            aria-label="Navegación principal"
            className="hidden pt-2 lg:block lg:pt-3"
          >
            <ul className="flex flex-wrap justify-end gap-2 lg:gap-5">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <PersonaNavButton
                    number={item.number}
                    label={item.label}
                    isActive={activeScreen === item.id}
                    index={index}
                    onClick={() => onNavigate(item.id as ScreenId)}
                  />
                </motion.li>
              ))}
            </ul>
          </nav>

          <div
            aria-hidden="true"
            className="hidden flex-col items-center gap-2 pt-4 lg:flex"
          >
            <span className="text-[10px] tracking-[0.35em] text-persona-white/80 uppercase [writing-mode:vertical-rl]">
              Select Menu
            </span>
            <div className="flex flex-col gap-1">
              <span className="persona-diamond" />
              <span className="persona-diamond" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
