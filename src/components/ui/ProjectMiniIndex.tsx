import { useEffect, useState, type RefObject } from 'react';
import type { Project } from '@/core/models';
import { cn } from '@/utils/cn';

type ProjectSection = 'featured' | 'learning';

interface ProjectMiniIndexProps {
  featuredProjects: readonly Project[];
  learningProjects: readonly Project[];
  scrollContainerRef: RefObject<HTMLElement | null>;
  hidden?: boolean;
}

export function ProjectMiniIndex({
  featuredProjects,
  learningProjects,
  scrollContainerRef,
  hidden = false,
}: ProjectMiniIndexProps) {
  const [activeSection, setActiveSection] = useState<ProjectSection>('featured');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    featuredProjects[0]?.id ?? null,
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || hidden) {
      return;
    }

    const observedElements = container.querySelectorAll('[data-project-id]');
    if (observedElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (!topEntry) {
          return;
        }

        const projectId = topEntry.target.getAttribute('data-project-id');
        const section = topEntry.target.getAttribute('data-project-section');

        if (projectId) {
          setActiveProjectId(projectId);
        }

        if (section === 'featured' || section === 'learning') {
          setActiveSection(section);
        }
      },
      {
        root: container,
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    );

    observedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [featuredProjects, learningProjects, scrollContainerRef, hidden]);

  if (hidden) {
    return null;
  }

  const scrollToTarget = (targetId: string) => {
    const container = scrollContainerRef.current;
    const target = container?.querySelector<HTMLElement>(`#${targetId}`);

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToProject = (projectId: string) => {
    scrollToTarget(`project-${projectId}`);
  };

  return (
    <aside className="project-mini-index" aria-label="Índice de proyectos">
      <div className="project-mini-index__header">
        <p className="project-mini-index__title">Índice rápido</p>
        <div className="project-mini-index__sections">
          <button
            type="button"
            className={cn(
              'project-mini-index__section-btn',
              activeSection === 'featured' && 'project-mini-index__section-btn--active',
            )}
            onClick={() => scrollToTarget('projects-featured')}
          >
            Destacados
          </button>
          <button
            type="button"
            className={cn(
              'project-mini-index__section-btn',
              activeSection === 'learning' && 'project-mini-index__section-btn--active',
            )}
            onClick={() => scrollToTarget('projects-learning')}
          >
            Aprendizaje
          </button>
        </div>
      </div>

      <p className="project-mini-index__group-label">Proyectos principales</p>
      <div className="project-mini-index__chips">
        {featuredProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={cn(
              'project-mini-index__chip',
              activeProjectId === project.id && 'project-mini-index__chip--active',
            )}
            onClick={() => scrollToProject(project.id)}
            aria-current={activeProjectId === project.id ? 'true' : undefined}
          >
            <span className="project-mini-index__chip-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{project.title}</span>
          </button>
        ))}
      </div>

      <p className="project-mini-index__group-label">Aprendizaje</p>
      <div className="project-mini-index__chips">
        {learningProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={cn(
              'project-mini-index__chip',
              activeProjectId === project.id && 'project-mini-index__chip--active',
            )}
            onClick={() => scrollToProject(project.id)}
            aria-current={activeProjectId === project.id ? 'true' : undefined}
          >
            <span className="project-mini-index__chip-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{project.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
