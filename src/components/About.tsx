import { ArrowUpRight, Code, Database, DesignNib, Server } from 'iconoir-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useGsapContext } from '../hooks/useGsapContext';
import { GlassCard } from './GlassCard';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: DesignNib, label: 'Identidad visual', copy: 'Interfaces con carácter propio, no plantillas disfrazadas.' },
  { icon: Code, label: 'Producto útil', copy: 'Webs, PWAs y herramientas pensadas para tareas reales.' },
  { icon: Server, label: 'Experiencia completa', copy: 'Del primer toque a la API, autenticación e integraciones.' },
  { icon: Database, label: 'Base mantenible', copy: 'Código modular, datos ordenados y despliegues que puedo sostener.' },
];

export function About({ skills }: { skills: readonly string[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.matchMedia('(max-width: 699px)').matches;

    const revealEach = (selector: string, from: gsap.TweenVars, start = 'top 88%') => {
      section.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        gsap.from(element, {
          ...from,
          scrollTrigger: {
            trigger: element,
            start,
            end: isMobile ? 'top 42%' : 'top 66%',
            scrub: isMobile ? 1.35 : .65,
            invalidateOnRefresh: true,
          },
          delay: Math.min(index * .025, .1),
        });
      });
    };

    revealEach('.section-heading > *', {
        y: 48,
        opacity: 0,
        ease: 'none',
      });
    revealEach('.shape-unit', {
        y: 74,
        opacity: 0,
        scale: .93,
        rotation: 1.2,
        ease: 'power2.out',
      }, 'top 90%');
    revealEach('.capability', {
        x: 26,
        opacity: 0,
        ease: 'power2.out',
      }, 'top 91%');
    gsap.from(section.querySelectorAll('.capability > span'), {
      scale: .55,
      rotation: -18,
      opacity: 0,
      duration: isMobile ? .82 : .62,
      stagger: isMobile ? .13 : .1,
      ease: 'back.out(1.8)',
      scrollTrigger: {
        trigger: section.querySelector('.capabilities-card'),
        start: 'top 76%',
        toggleActions: 'restart none none reset',
      },
    });
    gsap.from(section.querySelectorAll('.capability > span svg'), {
      scale: .4,
      rotation: 24,
      opacity: 0,
      duration: isMobile ? .68 : .48,
      stagger: isMobile ? .13 : .1,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: section.querySelector('.capabilities-card'),
        start: 'top 76%',
        toggleActions: 'restart none none reset',
      },
    });
    gsap.from(section.querySelectorAll('.skills-card span'), {
      y: 20,
      scale: .72,
      rotation: -3,
      opacity: 0,
      duration: isMobile ? .72 : .5,
      stagger: isMobile ? .09 : .065,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: section.querySelector('.skills-card'),
        start: 'top 82%',
        toggleActions: 'restart none none reset',
      },
    });
  });

  return (
    <section className="about section-shell" id="perfil" ref={sectionRef}>
      <div className="section-heading">
        <div><p className="kicker">MI FORMA DE TRABAJAR</p><h2>La estética atrae.<br />La experiencia convence.</h2></div>
        <p>Combino una identidad visual cuidada con decisiones prácticas para que cada producto sea reconocible, fácil de usar y viable fuera del mockup.</p>
      </div>

      <div className="organic-grid">
        <div className="shape-unit manifesto-unit">
          <GlassCard className="manifesto-card">
            <span className="card-meta">01 · ENFOQUE</span>
            <h3>De ideas espontáneas a productos que sí se pueden usar.</h3>
            <p>Trabajo desde el problema y construyo alrededor de él. Convierto ventas por WhatsApp, bibliotecas musicales o comunidades universitarias en experiencias completas, cuidando la interfaz, la lógica y esos detalles que vuelven reconocible cada producto.</p>
            <a href="#contacto">Construyamos algo <ArrowUpRight /></a>
          </GlassCard>
        </div>

        <div className="shape-unit capabilities-unit">
          <GlassCard className="capabilities-card">
            <span className="card-meta">4 ÁREAS CONECTADAS</span>
            {capabilities.map(({ icon: Icon, label, copy }, index) => (
              <div className="capability" key={label}>
                <span><Icon /></span><div><small>0{index + 1}</small><strong>{label}</strong><p>{copy}</p></div>
              </div>
            ))}
          </GlassCard>
        </div>

        <div className="shape-unit skills-unit">
          <GlassCard className="skills-card">
            <p className="kicker">STACK ACTUAL</p>
            <div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </GlassCard>
        </div>

        <div className="shape-unit metric-unit">
          <GlassCard className="metric-card">
            <strong>6+</strong><span>productos con identidad propia</span><i>Comercio, herramientas y experiencias sociales</i>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
