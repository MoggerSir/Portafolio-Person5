import { motion } from 'framer-motion';
import type { ComponentType, SVGProps } from 'react';
import type { SocialLink } from '@/core/models';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';
import {
  IconoirGithub,
  IconoirLinkedin,
  IconoirMail,
} from '@/components/ui/icons/socialIcons';

interface SocialLinksProps {
  links: readonly SocialLink[];
  className?: string;
}

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<SocialLink['icon'], IconComponent> = {
  github: IconoirGithub,
  linkedin: IconoirLinkedin,
  email: IconoirMail,
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <LayeredShape
      variant="social-bar"
      interactive
      className={className}
      tilt={{ skewX: -10, rotate: 1, origin: 'right center' }}
      layers={[
        { color: 'bg-persona-white', offsetX: -6, offsetY: 6 },
        { color: 'bg-persona-red', offsetX: -3, offsetY: 3 },
      ]}
      contentClassName="bg-persona-black px-6 py-3"
    >
      <div className="flex items-center gap-5">
        {links.map((link, index) => {
          const Icon = iconMap[link.icon];

          return (
            <motion.a
              key={link.id}
              href={link.url}
              target={link.icon === 'email' ? undefined : '_blank'}
              rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              className="inline-flex text-persona-white transition-colors hover:text-persona-red"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.15 }}
            >
              <Icon aria-hidden="true" />
            </motion.a>
          );
        })}
      </div>
    </LayeredShape>
  );
}
