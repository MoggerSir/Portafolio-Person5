import { ArrowUpRight, CodeBrackets, LightBulb, OpenNewWindow, Wrench, Xmark } from 'iconoir-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../core/models';
import { CaseStudyGallery } from './CaseStudyGallery';

interface ProjectCaseStudyProps {
  readonly project: Project;
  readonly onClose: () => void;
}

export function ProjectCaseStudy({ project, onClose }: ProjectCaseStudyProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const detail = project.caseStudy;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.querySelector('.image-lightbox')) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!detail) return null;

  return (
    <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title">
      <article className="case-study">
        <header className="case-header">
          <div>
            <p>CASO DE ESTUDIO · {project.eyebrow}</p>
            <h2 id="case-title">{project.name}</h2>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Cerrar caso de estudio"><Xmark /></button>
        </header>

        <CaseStudyGallery images={detail.gallery} projectName={project.name} />

        <div className="case-intro">
          <p className="kicker">01 · QUÉ ES</p>
          <p>{detail.overview}</p>
          <div className="case-links">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Visitar sitio web <OpenNewWindow /></a>}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Ver código <CodeBrackets /></a>}
          </div>
        </div>

        <section className="case-block case-problem">
          <span><LightBulb /></span>
          <div><p className="kicker">02 · EL PROBLEMA</p><h3>La razón detrás del proyecto</h3><p>{detail.problem}</p></div>
        </section>

        <section className="case-process">
          <div className="case-section-title"><p className="kicker">03 · EL PROCESO</p><h3>De la idea a una solución usable</h3></div>
          <ol>
            {detail.process.map((step, index) => (
              <li key={step}><span>0{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </section>

        <section className="case-stack">
          <div className="case-section-title"><p className="kicker">04 · STACK Y DECISIONES</p><h3>Tecnología con una razón</h3></div>
          <div className="case-stack-grid">
            {detail.stackDecisions.map(({ technology, reason }) => (
              <div key={technology}><Wrench /><h4>{technology}</h4><p>{reason}</p></div>
            ))}
          </div>
        </section>

        <button className="case-close-bottom" onClick={onClose}>Volver a proyectos <ArrowUpRight /></button>
      </article>
    </div>
  );
}
