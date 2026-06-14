import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/core/models';
import { HalftoneOverlay } from '@/components/ui/HalftoneOverlay';
import {
  ProjectCardButton,
  ProjectDetailModal,
} from '@/components/ui/ProjectDetailModal';
import { cn } from '@/utils/cn';

interface ProjectsSectionProps {
  featuredProjects: readonly Project[];
  learningProjects: readonly Project[];
}

export function ProjectsSection({
  featuredProjects,
  learningProjects,
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="screen-panel relative h-full overflow-y-auto overflow-x-hidden bg-persona-black px-6 pt-28 pb-28 lg:px-10">
      <HalftoneOverlay variant="light" className="opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          number="02"
          title="PROYECTOS"
          subtitle="Herramientas y experimentos que definen mi camino como desarrollador."
        />

        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-3xl text-persona-red">APRENDIZAJE</span>
          <div className="h-px flex-1 bg-persona-red/40" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningProjects.map((project, index) => (
            <LearningProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
}

function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <p className="mb-2 text-sm tracking-[0.3em] text-persona-red">{number}</p>
      <h2 className="font-display text-5xl tracking-wider text-persona-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-persona-white/70">{subtitle}</p>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

function FeaturedProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <ProjectCardButton
        project={project}
        onSelect={onSelect}
        className="group relative overflow-hidden border-4 border-persona-red bg-persona-gray text-left shadow-[8px_8px_0_#e60012] transition-transform hover:-translate-y-1.5"
      >
        <div className="relative h-48 overflow-hidden bg-persona-black">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <HalftoneOverlay variant="light" className="opacity-20" />
          <span className="absolute right-3 bottom-3 bg-persona-red px-2 py-1 text-[10px] font-semibold tracking-[0.2em] text-persona-white uppercase">
            Ver detalle
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="font-display text-3xl tracking-wider text-persona-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-persona-red">{project.subtitle}</p>
          </div>

          <p className="text-sm leading-relaxed text-persona-white/75">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-persona-black px-2 py-1 text-xs tracking-wider text-persona-white uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>
      </ProjectCardButton>
    </motion.div>
  );
}

function LearningProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <ProjectCardButton
        project={project}
        onSelect={onSelect}
        className="group overflow-hidden border-2 border-persona-white/20 bg-persona-gray/50 text-left transition-colors hover:border-persona-red"
      >
        <div className="relative">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="h-32 w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            loading="lazy"
          />
          <span className="absolute right-2 bottom-2 bg-persona-black/80 px-2 py-0.5 text-[10px] tracking-[0.15em] text-persona-white uppercase">
            +
          </span>
        </div>
        <div className="space-y-3 p-4">
          <h3 className="font-display text-xl tracking-wide text-persona-white">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-xs text-persona-white/65">
            {project.shortDescription}
          </p>
          <ProjectLinks project={project} compact />
        </div>
      </ProjectCardButton>
    </motion.div>
  );
}

interface ProjectLinksProps {
  project: Project;
  compact?: boolean;
}

function ProjectLinks({ project, compact = false }: ProjectLinksProps) {
  return (
    <div
      className={cn('flex flex-wrap gap-2', compact && 'text-xs')}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      {project.hasRepository && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-persona-red px-3 py-1.5 font-semibold tracking-wider text-persona-white uppercase transition-colors hover:bg-persona-red-dark"
        >
          Repo
        </a>
      )}
      {project.hasLiveDemo && (
        <a
          href={project.liveUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-persona-white px-3 py-1.5 font-semibold tracking-wider text-persona-white uppercase transition-colors hover:bg-persona-white hover:text-persona-black"
        >
          Demo
        </a>
      )}
    </div>
  );
}
