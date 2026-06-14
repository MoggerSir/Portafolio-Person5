import { motion } from 'framer-motion';
import type { Profile } from '@/core/models';
import { PersonaButton } from '@/components/ui/PersonaButton';
import { HalftoneOverlay } from '@/components/ui/HalftoneOverlay';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section className="screen-panel relative flex h-full flex-col justify-center overflow-y-auto overflow-x-hidden bg-persona-black px-6 pt-28 pb-28 lg:px-10">
      <HalftoneOverlay variant="light" className="opacity-10" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-persona-red">04</p>
          <h2 className="font-display text-5xl tracking-wider text-persona-white md:text-6xl">
            CONTACTO
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-persona-white/70">
            Disponible para prácticas profesionales. Escríbeme y hablemos sobre
            tu próximo proyecto.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <p className="font-display text-3xl tracking-wider text-persona-red md:text-4xl">
            {profile.email}
          </p>
          <PersonaButton
            href={`mailto:${profile.email}?subject=Contacto%20desde%20Portafolio`}
          >
            Enviar Mensaje
          </PersonaButton>
        </motion.div>
      </div>
    </section>
  );
}
