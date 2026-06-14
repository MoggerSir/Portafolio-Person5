import type { ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioRepository } from '@/core/data/PortfolioRepository';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScreenTransition } from '@/components/layout/ScreenTransition';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import {
  useScreenNavigation,
  type ScreenId,
} from '@/hooks/useScreenNavigation';

export class PortfolioApplication {
  private readonly repository: PortfolioRepository;

  constructor(repository: PortfolioRepository = PortfolioRepository.getInstance()) {
    this.repository = repository;
  }

  render(): ReactElement {
    return <PortfolioView repository={this.repository} />;
  }
}

interface PortfolioViewProps {
  repository: PortfolioRepository;
}

function PortfolioView({ repository }: PortfolioViewProps) {
  const { activeScreen, navigateTo } = useScreenNavigation(repository.navigation);

  const bioParagraphs = [
    '¡Hola! Soy estudiante de Ingeniería en Software, actualmente en el tercer cuatrimestre, y estoy buscando una oportunidad de prácticas profesionales donde pueda aportar y seguir creciendo.',
    'Tengo experiencia en desarrollo web con HTML5, CSS3 y JavaScript moderno. Mis habilidades están en formación constante en cursos de Udemy donde estoy aprendiendo JS moderno (ES6+), Git, GitHub y TypeScript.',
    'Me apasiona el desarrollo fullstack y estoy en constante aprendizaje de nuevas tecnologías. Soy autodidacta, comprometido y con buenas habilidades para el trabajo en equipo.',
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-persona-black">
      <Header
        logo={repository.profile.initials}
        navigation={repository.navigation}
        activeScreen={activeScreen}
        onNavigate={navigateTo}
      />

      <main className="relative h-full">
        <AnimatePresence mode="wait">
          <ScreenRenderer
            activeScreen={activeScreen}
            onNavigate={navigateTo}
            repository={repository}
            bioParagraphs={bioParagraphs}
          />
        </AnimatePresence>
      </main>

      <Footer profile={repository.profile} onNavigate={navigateTo} />
    </div>
  );
}

interface ScreenRendererProps {
  activeScreen: ScreenId;
  onNavigate: (screenId: ScreenId) => void;
  repository: PortfolioRepository;
  bioParagraphs: readonly string[];
}

function ScreenRenderer({
  activeScreen,
  onNavigate,
  repository,
  bioParagraphs,
}: ScreenRendererProps) {
  switch (activeScreen) {
    case 'inicio':
      return (
        <ScreenTransition screenKey="inicio">
          <HeroSection profile={repository.profile} onNavigate={onNavigate} />
        </ScreenTransition>
      );
    case 'proyectos':
      return (
        <ScreenTransition screenKey="proyectos">
          <ProjectsSection
            featuredProjects={repository.getFeaturedProjects()}
            learningProjects={repository.getLearningProjects()}
          />
        </ScreenTransition>
      );
    case 'sobre-mi':
      return (
        <ScreenTransition screenKey="sobre-mi">
          <AboutSection
            bioParagraphs={bioParagraphs}
            currentSkills={repository.getCurrentSkills()}
            learningSkills={repository.getLearningSkills()}
            courses={repository.courses}
          />
        </ScreenTransition>
      );
    case 'contacto':
      return (
        <ScreenTransition screenKey="contacto">
          <ContactSection profile={repository.profile} />
        </ScreenTransition>
      );
    default:
      return null;
  }
}
