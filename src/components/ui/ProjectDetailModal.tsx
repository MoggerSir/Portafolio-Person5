import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/core/models';
import { HalftoneOverlay } from '@/components/ui/HalftoneOverlay';
import { LayeredShape } from '@/components/ui/shapes/LayeredShape';
import { cn } from '@/utils/cn';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="project-detail-modal__backdrop"
            aria-label="Cerrar detalle del proyecto"
            onClick={onClose}
          />

          <motion.div
            className="project-detail-modal__panel-wrap"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <LayeredShape
              variant="info-panel"
              tilt={{ skewX: -8, rotate: -1, origin: 'center center' }}
              layers={[
                { color: 'bg-persona-red', offsetX: -8, offsetY: 8 },
                { color: 'bg-persona-black', offsetX: -4, offsetY: 4 },
              ]}
              contentClassName="project-detail-modal__panel bg-persona-black"
            >
              <HalftoneOverlay variant="light" className="opacity-10" />

              <button
                type="button"
                className="project-detail-modal__close"
                onClick={onClose}
                aria-label="Cerrar"
              >
                ×
              </button>

              <div className="project-detail-modal__grid">
                <div className="project-detail-modal__media">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-detail-modal__image"
                  />
                </div>

                <div className="project-detail-modal__content">
                  <p className="project-detail-modal__eyebrow">
                    {project.category === 'featured' ? 'PROYECTO DESTACADO' : 'APRENDIZAJE'}
                  </p>
                  <h3
                    id="project-detail-title"
                    className="project-detail-modal__title"
                  >
                    {project.title}
                  </h3>
                  <p className="project-detail-modal__subtitle">{project.subtitle}</p>

                  <p className="project-detail-modal__description">
                    {project.longDescription}
                  </p>

                  <div className="project-detail-modal__tags">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="project-detail-modal__tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-detail-modal__actions">
                    {project.isPrivateRepository && (
                      <span
                        className="project-detail-modal__action project-detail-modal__action--muted"
                        title="Repositorio privado"
                      >
                        Repositorio privado
                      </span>
                    )}
                    {project.hasRepository && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-detail-modal__action project-detail-modal__action--primary"
                      >
                        Ver Repositorio
                      </a>
                    )}
                    {project.hasLiveDemo && (
                      <a
                        href={project.liveUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-detail-modal__action project-detail-modal__action--secondary"
                      >
                        Ver Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </LayeredShape>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ProjectCardButtonProps {
  project: Project;
  onSelect: (project: Project) => void;
  className?: string;
  children: ReactNode;
}

export function ProjectCardButton({
  project,
  onSelect,
  className,
  children,
}: ProjectCardButtonProps) {
  return (
    <button
      type="button"
      className={cn('project-card-button', className)}
      onClick={() => onSelect(project)}
      aria-label={`Ver detalles de ${project.title}`}
    >
      {children}
    </button>
  );
}
