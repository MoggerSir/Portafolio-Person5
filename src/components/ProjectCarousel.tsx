import { ArrowLeft, ArrowRight, OpenNewWindow } from 'iconoir-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../core/models';
import { ProjectCarouselController } from '../services/ProjectCarouselController';
import { ProjectCaseStudy } from './ProjectCaseStudy';

const AUTOPLAY_INTERVAL = 10_000;
const AUTOPLAY_TRANSITION_DURATION = 1.5;

export function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const interactionPausedUntil = useRef(0);
  const resumeTimer = useRef<number | null>(null);
  const autoplayTimer = useRef<number | null>(null);
  const scrollingByAnimation = useRef(false);
  const scrollFrame = useRef<number | null>(null);
  const controller = useMemo(() => new ProjectCarouselController(projects.length), [projects.length]);

  const animate = useCallback((index: number, duration = 0.85) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const cards = [...track.querySelectorAll<HTMLElement>('.project-card')];
    controller.goTo(index);
    scrollingByAnimation.current = true;
    controller.animate(viewport, track, cards, duration);
    window.setTimeout(() => { scrollingByAnimation.current = false; }, duration * 1000 + 100);
    setActiveIndex(index);
  }, [controller]);

  const scheduleAutoplay = useCallback(function schedule(delay = AUTOPLAY_INTERVAL) {
    // Continuous scrollLeft animation competes with native touch scrolling.
    // On phones/tablets the carousel remains fully swipeable but does not autoplay.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (autoplayTimer.current !== null) window.clearTimeout(autoplayTimer.current);
    autoplayTimer.current = window.setTimeout(() => {
      const remainingPause = interactionPausedUntil.current - Date.now();
      if (remainingPause > 0) {
        schedule(remainingPause);
        return;
      }
      const state = controller.next();
      animate(state.activeIndex, AUTOPLAY_TRANSITION_DURATION);
      schedule(AUTOPLAY_INTERVAL);
    }, delay);
  }, [animate, controller]);

  useEffect(() => {
    animate(0);
    scheduleAutoplay();

    return () => {
      if (autoplayTimer.current !== null) window.clearTimeout(autoplayTimer.current);
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
      controller.destroy();
    };
  }, [animate, controller, scheduleAutoplay]);

  const move = (direction: 1 | -1) => {
    const state = direction === 1 ? controller.next() : controller.previous();
    animate(state.activeIndex);
    scheduleAutoplay();
  };

  const pauseMotion = () => {
    interactionPausedUntil.current = Number.POSITIVE_INFINITY;
    scrollingByAnimation.current = false;
    controller.pause();
    if (autoplayTimer.current !== null) window.clearTimeout(autoplayTimer.current);
  };

  const resumeMotion = () => {
    interactionPausedUntil.current = Date.now() + 3000;
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      interactionPausedUntil.current = 0;
      controller.resume();
      scheduleAutoplay(0);
    }, 3000);
  };

  const syncFromScroll = () => {
    if (scrollingByAnimation.current) return;
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(() => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const cards = [...track.querySelectorAll<HTMLElement>('.project-card')];
      setActiveIndex(controller.followScroll(viewport, cards));
    });
    resumeMotion();
  };

  return (
    <section className="projects section-shell" id="trabajo">
      <div className="section-heading">
        <div><p className="kicker">MI TRABAJO</p><h2>Proyectos destacados</h2></div>
        <p>Productos reales en producción que nacieron de ideas espontáneas y se convirtieron en mi trabajo más serio.</p>
      </div>

      <div
        className="carousel-stage"
      >
        <div
          className="carousel-viewport"
          ref={viewportRef}
          onPointerDown={pauseMotion}
          onPointerUp={resumeMotion}
          onPointerCancel={resumeMotion}
          onScroll={syncFromScroll}
        >
          <div className="carousel-track" ref={trackRef}>
          {projects.map((project, index) => (
            <article
              className={`project-card tone-${project.tone}`}
              key={project.id}
              aria-current={index === activeIndex}
              role="button"
              tabIndex={0}
              aria-label={`Abrir caso de estudio de ${project.name}`}
              onClick={() => {
                controller.pause();
                if (autoplayTimer.current !== null) window.clearTimeout(autoplayTimer.current);
                setSelectedProject(project);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  controller.pause();
                  if (autoplayTimer.current !== null) window.clearTimeout(autoplayTimer.current);
                  setSelectedProject(project);
                }
              }}
            >
              <img
                src={project.image}
                alt=""
                width="720"
                height="520"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
              <div className="project-shade" />
              <div className="project-index">0{index + 1}</div>
              <div className="project-content">
                <p>{project.eyebrow}</p>
                <h3>{project.name}</h3>
                <span>{project.summary}</span>
                <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              {(project.liveUrl || project.repoUrl) && (
                <a className="project-link" href={project.liveUrl ?? project.repoUrl} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name}`} onClick={(event) => event.stopPropagation()}><OpenNewWindow /></a>
              )}
            </article>
          ))}
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Proyecto anterior"><ArrowLeft /></button>
          <div className="carousel-progress"><span style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} /></div>
          <span>0{activeIndex + 1} / 0{projects.length}</span>
          <button onClick={() => move(1)} aria-label="Proyecto siguiente"><ArrowRight /></button>
        </div>
      </div>
      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null);
            resumeMotion();
          }}
        />
      )}
    </section>
  );
}
