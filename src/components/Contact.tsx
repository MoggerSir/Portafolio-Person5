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
    const revealEach = (selector: string, from: gsap.TweenVars, start = 'top 88%') => {
      section.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        gsap.from(element, {
          ...from,
          scrollTrigger: {
            trigger: element,
            start,
            end: 'top 67%',
            scrub: .7,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    gsap.from(section.querySelector('.contact-orb'), {
        scale: .55,
        x: 100,
        opacity: 0,
        rotation: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 86%',
          end: 'top 50%',
          scrub: .8,
          invalidateOnRefresh: true,
        },
      });
    revealEach(':scope > .kicker, :scope > h2', {
        y: 56,
        opacity: 0,
        ease: 'power2.out',
      });
    section.querySelectorAll<HTMLElement>('.contact-option').forEach((element, index) => {
      gsap.from(element, {
        x: index % 2 ? 42 : -42,
        scale: .92,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'top 69%',
          scrub: .7,
          invalidateOnRefresh: true,
        },
      });
    });
    revealEach('.footer-meta > *', {
        y: 22,
        opacity: 0,
        ease: 'power2.out',
      }, 'top 94%');
  });

  return (
    <footer className="contact section-shell" id="contacto" ref={sectionRef}>
      <div className="contact-orb" />
      <p className="kicker">¿TIENES UNA IDEA?</p>
      <h2>Cuéntame<br /><span>qué tienes en mente.</span></h2>
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
