import { ArrowRight, Github, Linkedin, Mail, Whatsapp } from 'iconoir-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import type { Profile } from '../core/models';
import { useGsapContext } from '../hooks/useGsapContext';

gsap.registerPlugin(ScrollTrigger);

export function Contact({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;
    const replay = { start: 'top 78%', toggleActions: 'restart none none reset' };

    gsap.from(section.querySelector('.contact-orb'), {
      scale: .55,
      x: 100,
      opacity: 0,
      rotation: 12,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, ...replay },
    });
    gsap.from(section.querySelectorAll(':scope > .kicker, :scope > h2'), {
      y: 54,
      opacity: 0,
      duration: 1,
      stagger: .16,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, ...replay },
    });
    gsap.from(section.querySelectorAll('.contact-option'), {
      y: 42,
      scale: .94,
      opacity: 0,
      duration: .9,
      stagger: .14,
      ease: 'back.out(1.25)',
      scrollTrigger: { trigger: '.contact-actions', start: 'top 88%', toggleActions: 'restart none none reset' },
    });
    gsap.from(section.querySelector('.footer-meta'), {
      y: 24,
      opacity: 0,
      duration: .8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.footer-meta', start: 'top 96%', toggleActions: 'restart none none reset' },
    });
  });

  return (
    <footer className="contact section-shell" id="contacto" ref={sectionRef}>
      <div className="contact-orb" />
      <p className="kicker">¿TIENES UNA IDEA?</p>
      <h2>Hagamos que<br /><span>se sienta increíble.</span></h2>
      <div className="contact-actions" aria-label="Opciones de contacto">
        <a className="contact-option contact-option-mail" href={`mailto:${profile.email}`}>
          <Mail />
          <span><small>POR CORREO</small><strong>Escribirme un correo</strong><i>{profile.email}</i></span>
          <ArrowRight />
        </a>
        <a
          className="contact-option contact-option-whatsapp"
          href="https://wa.me/529982360704?text=Hola%20Josmar%2C%20quiero%20contarte%20sobre%20un%20proyecto."
          target="_blank"
          rel="noreferrer"
        >
          <Whatsapp />
          <span><small>POR WHATSAPP</small><strong>Hablar por WhatsApp</strong><i>+52 998 236 0704</i></span>
          <ArrowRight />
        </a>
      </div>
      <div className="footer-meta">
        <span>© 2026 Josmar Galindo</span>
        <div><a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a></div>
        <span>Diseñado y desarrollado en Cancún, MX</span>
      </div>
    </footer>
  );
}
