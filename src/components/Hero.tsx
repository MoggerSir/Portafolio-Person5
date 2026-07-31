import { ArrowDownRight, Github, Mail } from 'iconoir-react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import type { Profile } from '../core/models';
import { useGsapContext } from '../hooks/useGsapContext';

const mainSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js'];

export function Hero({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    const items = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!items) return;
    gsap.from(items, {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    });
    gsap.from(sectionRef.current?.querySelectorAll('.hero-stack span') ?? [], {
      y: 12,
      opacity: 0,
      scale: .78,
      duration: .48,
      delay: .58,
      stagger: .08,
      ease: 'back.out(1.8)',
    });
  });

  return (
    <section className="hero section-shell" id="inicio" ref={sectionRef}>
      <div className="hero-card-shell">
        <div className="hero-card">
          <div className="hero-photo-wrap" data-reveal>
            <img
              className="hero-photo"
              src="/images/josmar-face.webp"
              alt="Josmar Francisco Galindo Ocampo"
              width="720"
              height="900"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="hero-heading">
            <p className="hero-overline" data-reveal>HOLA, SOY</p>
            <h1 data-reveal>Josmar Francisco<br /><span>Galindo Ocampo</span></h1>
          </div>

          <div className="hero-roles" data-reveal>
            <strong>Estudiante de Ingeniería en Software</strong>
            <span>Especializado en aplicaciones web, PWAs y experiencias móviles</span>
          </div>
          <p className="hero-intro" data-reveal>{profile.intro}</p>

          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              <Mail /> Contáctame
            </a>
            <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </div>

          <div className="hero-stack" data-reveal>
            <small>TRABAJO CON</small>
            <div>{mainSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
        </div>

        <a className="hero-scroll" href="#trabajo" aria-label="Ver proyectos">
          <ArrowDownRight />
        </a>
      </div>
    </section>
  );
}
