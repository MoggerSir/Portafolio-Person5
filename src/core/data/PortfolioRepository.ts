import {
  CourseProgress,
  NavItem,
  Profile,
  Project,
  Skill,
  SocialLink,
  Stat,
} from '@/core/models';
import josmarOc from '@/assets/josmar-oc.png';

const ASSET = (path: string) => `/assets/img/${path}`;

export class PortfolioRepository {
  private static instance: PortfolioRepository | null = null;

  private constructor(
    public readonly profile: Profile,
    public readonly navigation: readonly NavItem[],
    public readonly projects: readonly Project[],
    public readonly skills: readonly Skill[],
    public readonly courses: readonly CourseProgress[],
  ) {}

  static getInstance(): PortfolioRepository {
    if (!PortfolioRepository.instance) {
      PortfolioRepository.instance = PortfolioRepository.createDefault();
    }
    return PortfolioRepository.instance;
  }

  getFeaturedProjects(): readonly Project[] {
    return this.projects.filter((project) => project.category === 'featured');
  }

  getLearningProjects(): readonly Project[] {
    return this.projects.filter((project) => project.category === 'learning');
  }

  getCurrentSkills(): readonly Skill[] {
    return this.skills.filter((skill) => skill.level === 'current');
  }

  getLearningSkills(): readonly Skill[] {
    return this.skills.filter((skill) => skill.level === 'learning');
  }

  private static createDefault(): PortfolioRepository {
    const profile = new Profile(
      'JG.',
      'JOSMAR',
      'GALINDO',
      'DEVELOPER',
      'SOFTWARE ENGINEER',
      'I CODE, THEREFORE I CREATE.',
      'Desarrollador Full Stack enfocado en crear aplicaciones modernas, funcionales y con experiencias que marcan la diferencia. Estudiante de Ingeniería en Software en constante aprendizaje.',
      ['modernas', 'funcionales', 'marcan la diferencia'],
      josmarOc,
      21,
      [
        new Stat('CREATIVIDAD', 88),
        new Stat('LÓGICA', 92),
        new Stat('DEDICACIÓN', 95),
        new Stat('CAFÉ', 100),
      ],
      [
        new SocialLink(
          'github',
          'GitHub',
          'https://github.com/MoggerSir',
          'github',
        ),
        new SocialLink(
          'linkedin',
          'LinkedIn',
          'https://linkedin.com/in/josmar-galindo',
          'linkedin',
        ),
        new SocialLink(
          'email',
          'Email',
          'mailto:josmar.galindo.dev@gmail.com?subject=Contacto%20desde%20Portafolio&body=Hola%20Josmar,%20me%20gustar%C3%ADa%20contactarte%20para...',
          'email',
        ),
      ],
      'josmar.galindo.dev@gmail.com',
    );

    const navigation = [
      new NavItem('inicio', '01', 'INICIO', '#inicio'),
      new NavItem('proyectos', '02', 'PROYECTOS', '#proyectos'),
      new NavItem('sobre-mi', '03', 'SOBRE MÍ', '#sobre-mi'),
      new NavItem('contacto', '04', 'CONTACTO', '#contacto'),
    ];

    const projects = [
      new Project(
        'stickerrip',
        'StickerRip',
        'Herramienta sencilla para convertir y extraer TikToks en stickers.',
        'Extrae contenido de TikTok y envíalo a WhatsApp como sticker.',
        'StickerRip funciona como un bookmarklet inteligente diseñado para integrarse directamente en la interfaz de TikTok. Al activarlo, el sistema escanea automáticamente los stickers presentes en la web, los extrae y te los presenta en una interfaz propia para que selecciones tus favoritos.',
        ASSET('StikerRip.png'),
        'https://github.com/MoggerSir/StikerRip',
        null,
        ['React', 'Vite', 'Node.js', 'Express', 'FFmpeg', 'Zod'],
        'featured',
      ),
      new Project(
        'barrypollos',
        'BarryPollos',
        'Landing page para un negocio local en Cancún.',
        'BarryPollos Cancún — presencia online con animaciones premium.',
        'Proyecto realizado para que la empresa de pollos asados BarryPollos tuviera más presencia en línea. Landing sencilla con estética y animaciones fuertes, implementada con GSAP y AOS.',
        ASSET('barry_pollo_logo.svg'),
        'https://github.com/MoggerSir/BARRYPOLLO',
        'https://moggersir.github.io/BARRYPOLLO/',
        ['HTML', 'CSS', 'JavaScript', 'GSAP', 'AOS'],
        'featured',
      ),
      new Project(
        'gothic-ui',
        'Gothic UI Framework',
        'Design System & Components',
        'Diseño minimalista y oscuro.',
        'Micro-framework de utilidades CSS enfocado en interfaces góticas modernas. Proporciona variables de color, tipografía cyberpunk y componentes optimizados.',
        ASSET('css-icon.png'),
        '#',
        null,
        ['CSS', 'Design System'],
        'featured',
      ),
      new Project(
        'calculadora-propinas',
        'Calculadora de Propinas',
        'Proyecto de aprendizaje',
        'Demuestra el uso avanzado de JavaScript para generación de interfaces y manipulación del DOM.',
        'Proyecto que demuestra el uso avanzado de JavaScript para la generación de interfaces, manipulación del DOM y procesamiento de datos mediante expresiones regulares.',
        ASSET('proyecto3.png'),
        'https://github.com/MoggerSir/calculadora-de-propinas',
        null,
        ['JavaScript', 'HTML', 'CSS'],
        'learning',
      ),
      new Project(
        'blackjack',
        'BlackJack',
        'Proyecto de aprendizaje',
        'Juego clásico de Blackjack (21) contra la computadora.',
        'Proyecto web sencillo que implementa el juego clásico de Blackjack. El jugador compite contra la máquina para acercarse a 21 sin pasarse.',
        ASSET('proyecto2.png'),
        'https://github.com/MoggerSir/Blackjack_JS',
        null,
        ['JavaScript', 'HTML', 'CSS'],
        'learning',
      ),
      new Project(
        'typescript-first',
        'Mi Primer Proyecto en TypeScript',
        'Proyecto de aprendizaje',
        'Primeros pasos sólidos en el mundo de los lenguajes fuertemente tipados.',
        'Desarrollado con el objetivo de aprender profundamente sobre TypeScript y dar mis primeros pasos en el riguroso mundo de los lenguajes fuertemente tipados.',
        ASSET('proyecto5.png'),
        'https://github.com/MoggerSir/Mi-Primer-Proyecto-en-TypeScript',
        null,
        ['TypeScript', 'JavaScript'],
        'learning',
      ),
      new Project(
        'chavo-game',
        'Chavo Game',
        'Proyecto de aprendizaje',
        'Juego estilo Asteroids ambientado en El Chavo del 8.',
        'Juego sencillo que implementa el género de naves clásico del tipo Asteroids-like, ambientado en la serie animada del Chavo del 8.',
        ASSET('proyecto4.png'),
        'https://github.com/MoggerSir/chavoGame',
        null,
        ['JavaScript', 'Canvas'],
        'learning',
      ),
      new Project(
        'race-game',
        'Carreras Clandestinas de Gokus',
        'Proyecto de aprendizaje',
        'Simulación interactiva de carreras entre versiones de Goku.',
        'Aplicación web interactiva que simula una carrera entre diferentes versiones de Goku. Los usuarios personalizan nombres y observan el avance aleatorio hacia la meta.',
        ASSET('proyecto1.png'),
        'https://github.com/MoggerSir/Race-game',
        null,
        ['JavaScript', 'HTML', 'CSS'],
        'learning',
      ),
      new Project(
        'galaxy-gem',
        'GalaxyGem',
        'Proyecto de aprendizaje',
        'Juego de nave espacial en equipo.',
        'Proyecto para poner a prueba habilidades de programación en equipo, trabajando con Git y GitHub para crear algo divertido desde cero.',
        ASSET('proyecto6.png'),
        'https://github.com/MoggerSir/Jugeo-de-space-racer',
        null,
        ['JavaScript', 'Git', 'GitHub'],
        'learning',
      ),
      new Project(
        'control-habitaciones',
        'Control de Habitaciones',
        'Proyecto de aprendizaje',
        'Sistema de gestión de 30 habitaciones con interfaz moderna.',
        'Aplicación web que permite visualizar y controlar el estado de 30 habitaciones de forma dinámica con una interfaz moderna y minimalista.',
        ASSET('proyecto7.png'),
        'https://github.com/MoggerSir/Control-de-Habitaciones',
        null,
        ['JavaScript', 'HTML', 'CSS'],
        'learning',
      ),
    ];

    const skills = [
      new Skill('JavaScript', ASSET('js-icon.png'), 'current'),
      new Skill('HTML', ASSET('html-icon.png'), 'current'),
      new Skill('CSS', ASSET('css-icon.png'), 'current'),
      new Skill('Git', ASSET('git-icon.png'), 'current'),
      new Skill('C#', ASSET('csharp-icon.svg'), 'current'),
      new Skill('Tailwind', ASSET('tailwind-icon.svg'), 'current'),
      new Skill('TypeScript', ASSET('Tipescript.png'), 'current'),
      new Skill('React', ASSET('react.png'), 'current'),
      new Skill('SQLite', ASSET('sqlite-icon.svg'), 'current'),
      new Skill('PostgreSQL', ASSET('postgresql-icon.svg'), 'current'),
      new Skill('Better SQLite', ASSET('better-sqlite-icon.svg'), 'current'),
      new Skill('Node.js', ASSET('nodejs-icon.png'), 'learning'),
    ];

    const courses = [
      new CourseProgress('JS Moderno', 53, ASSET('js-icon.png')),
      new CourseProgress('TypeScript', 10, ASSET('Tipescript.png')),
      new CourseProgress('Git + GitHub', 25, ASSET('git-icon.png')),
    ];

    return new PortfolioRepository(
      profile,
      navigation,
      projects,
      skills,
      courses,
    );
  }
}
