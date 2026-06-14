import type { Profile } from '@/core/models';
import type { ScreenId } from '@/core/services/ScreenNavigationService';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';

interface FooterProps {
  profile: Profile;
  onNavigate: (screenId: ScreenId) => void;
}

export function Footer({ profile, onNavigate }: FooterProps) {
  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="pointer-events-auto cursor-pointer border-none bg-transparent p-0 outline-none"
          aria-label="Ir a inicio"
        >
          <LayeredShape
            variant="social-bar"
            interactive
            tilt={{ skewX: -10, rotate: 1, origin: 'left center' }}
            layers={[{ color: 'bg-persona-white', offsetX: -5, offsetY: 5 }]}
            contentClassName="bg-persona-black px-5 py-3"
          >
            <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-persona-white uppercase">
              <span className="text-persona-red">▶</span>
              <span>INICIO</span>
            </div>
          </LayeredShape>
        </button>

        <div className="pointer-events-auto">
          <SocialLinks links={profile.socialLinks} />
        </div>
      </div>
    </footer>
  );
}
