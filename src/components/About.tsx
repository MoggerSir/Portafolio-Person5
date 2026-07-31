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

    gsap.from(section.querySelectorAll('.section-heading > *'), {
      y: 44,
      opacity: 0,
      duration: 1,
      stagger: .16,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'restart none none reset' },
    });

    gsap.from(section.querySelectorAll('.shape-unit'), {
      y: 72,
      opacity: 0,
      scale: .94,
      rotation: (index) => index % 2 ? 1.5 : -1.5,
      duration: 1.15,
      stagger: .18,
      ease: 'back.out(1.15)',
      scrollTrigger: { trigger: '.organic-grid', start: 'top 84%', toggleActions: 'restart none none reset' },
    });

    gsap.from(section.querySelectorAll('.capability'), {
      x: 28,
      opacity: 0,
      duration: .72,
      stagger: .11,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.capabilities-card', start: 'top 76%', toggleActions: 'restart none none reset' },
    });

    gsap.from(section.querySelectorAll('.skills-card span'), {
      y: 18,
      scale: .82,
      opacity: 0,
      duration: .55,
      stagger: .055,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.skills-card', start: 'top 84%', toggleActions: 'restart none none reset' },
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
