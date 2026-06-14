import { AnimatePresence, motion } from 'framer-motion';
import type { NavItem, Profile } from '@/core/models';
import type { ScreenId } from '@/core/services/ScreenNavigationService';
import { PersonaNavButton } from '@/components/ui/shapes/PersonaNavButton';
import { SocialLinks } from '@/components/ui/SocialLinks';

interface MobileBottomNavProps {
  navigation: readonly NavItem[];
  activeScreen: ScreenId;
  expanded: boolean;
  profile: Profile;
  onToggle: () => void;
  onNavigate: (screenId: ScreenId) => void;
}

export function MobileBottomNav({
  navigation,
  activeScreen,
  expanded,
  profile,
  onToggle,
  onNavigate,
}: MobileBottomNavProps) {
  const activeItem =
    navigation.find((item) => item.id === activeScreen) ?? navigation[0];

  return (
    <nav
      className="mobile-bottom-nav lg:hidden"
      aria-label="Navegación móvil"
    >
      <div
        className="mobile-bottom-nav__panel"
        data-expanded={expanded ? 'true' : 'false'}
      >
        <button
          type="button"
          className="mobile-bottom-nav__toggle"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls="mobile-bottom-nav-menu"
        >
          <span className="mobile-bottom-nav__toggle-label">
            <span className="mobile-bottom-nav__toggle-eyebrow">
              {expanded ? 'Cerrar menú' : 'Sección actual'}
            </span>
            <span className="mobile-bottom-nav__toggle-title">
              {activeItem.number} · {activeItem.label}
            </span>
          </span>
          <span className="mobile-bottom-nav__chevron" aria-hidden="true">
            ▲
          </span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id="mobile-bottom-nav-menu"
              className="mobile-bottom-nav__menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="mobile-bottom-nav__items">
                {navigation.map((item, index) => (
                  <li key={item.id}>
                    <PersonaNavButton
                      number={item.number}
                      label={item.label}
                      isActive={activeScreen === item.id}
                      index={index}
                      layout="dock"
                      onClick={() => onNavigate(item.id as ScreenId)}
                    />
                  </li>
                ))}
              </ul>

              <div className="mobile-bottom-nav__social">
                <SocialLinks links={profile.socialLinks} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
