import { PortfolioRepository, type PortfolioSource } from '../core/PortfolioRepository';
import { Profile, Project } from '../core/models';

const source: PortfolioSource = {
  profile: new Profile(
    'Josmar Galindo',
    'Estudiante de Ingeniería en Software',
    'Me enfoco en resolver problemas reales con soluciones prácticas y fáciles de usar, cuidando especialmente su atractivo visual. Me gusta ponerle cariño a los detalles y a las sensaciones de uso para crear interfaces cómodas y una experiencia única en cada proyecto: trabajos que no solo funcionan bien, sino que también tienen identidad propia.',
    'josmar.galindo.dev@gmail.com',
    'https://github.com/MoggerSir',
    'https://linkedin.com/in/josmar-galindo',
  ),
  projects: [
    new Project('nexo-idiomas', 'Nexo Idiomas', 'Proyecto integrador · UPQROO', 'Launcher modular que nace de una entrevista real con la Dirección de Idiomas y automatiza el perfilado de docentes de inglés.', '/images/nexo-idiomas.webp', ['React', 'FastAPI', 'PostgreSQL', 'PaddleOCR'], 'gold', 'https://idiomas.josmargalindo.com/', undefined, {
      overview: 'Nexo Idiomas es un launcher modular de herramientas administrativas para la Dirección de Idiomas de la UPQROO. La propuesta nació de entrevistar directamente al Lic. Heddbel G. Santos Gutiérrez, Director de Idiomas, y de investigar a fondo su proceso real para diseñarle una solución a la medida de sus necesidades, no una plantilla genérica.',
      problem: 'Recursos Humanos entrega un único drive con todas las postulaciones de la universidad sin segmentar por carrera, así que el Director debe rastrear a mano los perfiles de inglés entre decenas de documentos, descargar e imprimir cada currículum, evaluarlo sin criterios estandarizados y contactar a los aspirantes por canales personales que no dejan rastro. Además mantiene un doble archivo físico y digital, y no existe una bolsa de talento: cada convocatoria empieza desde cero. Detectamos estas causas raíz a partir de la entrevista y del análisis AS-IS del proceso, y las documentamos en una Definición y una Especificación de Requerimientos que el propio Director revisó, avaló y firmó.',
      process: [
        'Entrevisté junto a mi equipo al Director de Idiomas para levantar la problemática real, mapeamos el proceso actual en un diagrama AS-IS y diseñamos el TO-BE de la solución propuesta.',
        'Investigamos a fondo para encontrar el enfoque técnico ideal: un pipeline documental multimodal (parsers para PDF/Word/Excel, OCR con PaddleOCR y clasificación en cascada con reglas, modelo ligero y LLM como último recurso) que automatiza justo las tareas más tediosas del Director.',
        'Definimos los requerimientos en sus tres tipos —funcionales, no funcionales y de dominio— junto con sus criterios de aceptación y método de prueba, y los agrupamos en una Matriz de Requerimientos completa.',
        'Construí el mockup navegable (módulos de importación, evaluación tipo feed, historial y bolsa de talento) siguiendo la arquitectura tipo launcher y los casos de uso definidos.',
        'Validamos la propuesta con el cliente real: el Lic. Heddbel revisó la Definición de Requerimientos y la firmó de conformidad, confirmando que la solución sí resuelve su problema y le agiliza el trabajo.',
      ],
      stackDecisions: [
        { technology: 'React + TypeScript + Vite', reason: 'Interfaz tipada para tarjetas de evaluación, filtros y formularios sin errores silenciosos en los contratos de datos.' },
        { technology: 'FastAPI + Pydantic', reason: 'Endpoints tipados con documentación automática para carga de ZIP, jobs de procesamiento, revisión y expedientes.' },
        { technology: 'PyMuPDF, python-docx, openpyxl', reason: 'Lectura especializada de PDF, Word y Excel para reconstruir la estructura real de cada documento del aspirante.' },
        { technology: 'PaddleOCR + OpenCV', reason: 'OCR multilingüe y preprocesamiento de imagen para currículums escaneados, con Tesseract como alternativa local.' },
        { technology: 'PostgreSQL + MinIO', reason: 'Base de datos relacional para el historial de aspirantes y almacenamiento de expedientes originales compatible con S3.' },
      ],
      gallery: [
        '/images/cases/nexo-import.webp',
        '/images/cases/nexo-aspirantes.webp',
        '/images/cases/nexo-tobe.webp',
        '/images/cases/nexo-aprobacion.webp',
      ],
    }),
    new Project('larper-clothes', 'Larper Clothes', 'E-commerce conceptual', 'Moda alternativa presentada como una experiencia editorial, rápida y enfocada en producto.', '/images/larper-clothes.webp', ['Astro', 'React', 'GSAP', 'Three.js'], 'wine', 'https://larperchlothes.larpmusic.com.mx/', undefined, {
      overview: 'Una tienda editorial de ropa de segunda mano creada para estudiantes de Cancún. Cada prenda es única e incluye precio, talla, color, condición e historia, presentada mediante una experiencia visual cercana a una campaña de moda.',
      problem: 'La ropa de segunda mano suele publicarse en catálogos improvisados donde es difícil comparar estado, medidas y disponibilidad. El proyecto organiza inventario limitado y le da suficiente contexto visual a cada pieza para reducir dudas antes de contactar.',
      process: [
        'Definí un inventario estructurado como única fuente de verdad para separar producto y presentación.',
        'Diseñé una dirección editorial que comunica exclusividad sin esconder la información práctica.',
        'Construí un hero interactivo con modelos 3D y una alternativa fotográfica para dispositivos con menos capacidad.',
        'Añadí fichas, lookbook, selector de variantes y modal de producto, cuidando carga diferida y navegación móvil.',
      ],
      stackDecisions: [
        { technology: 'Astro', reason: 'Genera HTML rápido y permite cargar JavaScript únicamente en los componentes interactivos.' },
        { technology: 'React', reason: 'Facilita el estado de productos, variantes y modales complejos.' },
        { technology: 'GSAP', reason: 'Permite secuencias editoriales y desplazamiento suave con control preciso.' },
        { technology: 'Three.js', reason: 'Presenta algunas prendas como piezas tridimensionales sin convertir toda la página en una app 3D.' },
      ],
      gallery: [
        '/images/cases/larper-hero.webp',
        '/images/cases/larper-products.webp',
        '/images/cases/larper-editorial.webp',
      ],
    }),
    new Project('barry-pollos', 'BarryPollos', 'Negocio local · Cancún', 'Una landing con personalidad y movimiento para convertir visitas en pedidos.', '/images/barry-pollos.webp', ['HTML', 'CSS', 'JavaScript', 'GSAP'], 'coral', 'https://moggersir.github.io/BARRYPOLLO/', 'https://github.com/MoggerSir/BARRYPOLLO', {
      overview: 'Una landing de venta para una rosticería local de Cancún. Presenta sabores, paquetes y extras, permite construir un pedido y lo convierte en un mensaje de WhatsApp listo para enviar al negocio.',
      problem: 'El negocio necesitaba presencia digital sin incorporar una plataforma costosa de comercio electrónico. La solución debía mostrar el menú, informar si el local está abierto y transformar la intención del cliente en un pedido claro.',
      process: [
        'Organicé menú, combos, extras, precios y contacto en una capa de datos independiente.',
        'Construí un estado centralizado que mantiene sincronizados carrito, ticket y total.',
        'Implementé reglas para disponibilidad, cálculo de pedidos y generación del mensaje de WhatsApp.',
        'Diseñé una interfaz rápida, responsive y con animaciones que reflejan el carácter del negocio.',
      ],
      stackDecisions: [
        { technology: 'Vite + JavaScript', reason: 'Mantienen el sitio ligero y permiten control completo sin incorporar un framework innecesario.' },
        { technology: 'CSS modular', reason: 'Sostiene una identidad visual personalizada y componentes reutilizables.' },
        { technology: 'GSAP + AOS', reason: 'GSAP controla interacciones complejas y AOS resuelve revelaciones de contenido sencillas.' },
        { technology: 'WhatsApp', reason: 'Aprovecha el canal que el negocio ya utiliza y evita introducir un sistema de pedidos difícil de operar.' },
      ],
      gallery: [
        '/images/cases/barry-hero.webp',
        '/images/cases/barry-flavors.webp',
        '/images/cases/barry-reviews.webp',
        '/images/cases/barry-ticket.webp',
      ],
    }),
    new Project('sticker-rip', 'StickerRip', 'Herramienta local-first', 'Extrae stickers de TikTok y prepara packs para WhatsApp o Telegram, sin rastreadores.', '/images/sticker-rip.webp', ['React', 'Node.js', 'FFmpeg', 'Go'], 'ruby', 'https://stikerip.com/', 'https://github.com/MoggerSir/StikerRip', {
      overview: 'Herramienta local que detecta stickers de TikTok, los procesa por lotes y genera archivos compatibles con WhatsApp y Telegram. Puede descargar paquetes o vincular WhatsApp mediante un QR creado en la propia computadora.',
      problem: 'Extraer stickers desde TikTok exige copiar recursos, convertir formatos y respetar límites específicos de cada mensajería. Las herramientas remotas además obligan a entregar archivos y sesiones a terceros.',
      process: [
        'Comencé con un bookmarklet capaz de detectar recursos directamente dentro de TikTok Web.',
        'Separé extracción, codificación, validación y entrega en capas independientes del backend.',
        'Unifiqué los encoders y añadí procesamiento por lotes, eventos en tiempo real y limpieza automática de temporales.',
        'Endurecí el modelo local con protección contra DNS rebinding, CORS estricto, CSRF y sesiones cifradas.',
      ],
      stackDecisions: [
        { technology: 'React + Vite', reason: 'Ofrecen una interfaz dinámica y un entorno rápido para los flujos de selección y progreso.' },
        { technology: 'Node.js + Express', reason: 'Integran bien el procesamiento de archivos, SSE y los clientes de mensajería.' },
        { technology: 'FFmpeg', reason: 'Convierte y comprime animaciones respetando tamaño y dimensiones exigidas por WhatsApp.' },
        { technology: 'Go', reason: 'Sirve como alternativa para operaciones concurrentes y una API compilada de bajo consumo.' },
      ],
      gallery: [
        '/images/cases/sticker-home.webp',
        '/images/cases/sticker-pack.webp',
        '/images/cases/sticker-whatsapp.webp',
      ],
    }),
    new Project('larp-music', 'Larp Music', 'PWA + Android', 'Streaming propio con modo offline, playlists colaborativas y una sola base de código.', '/images/larp-music.webp', ['React', 'Capacitor', 'PWA', 'Raspberry Pi'], 'ember', 'https://music.josmargalindo.com/#/', undefined, {
      overview: 'Una plataforma propia de streaming musical disponible como aplicación web, PWA instalable y APK Android. Incluye reproductor con cola, perfiles, favoritos, historial, playlists colaborativas, modo offline y widgets nativos.',
      problem: 'El objetivo era controlar todo el recorrido de la música —almacenamiento, API, reproducción y experiencia móvil— sin depender de un proveedor externo y reutilizando la mayor cantidad posible de código entre plataformas.',
      process: [
        'Diseñé el cliente por features y separé servicios, contextos, repositorios offline y adaptadores de plataforma.',
        'Construí una API propia y la desplegué en una Raspberry Pi expuesta mediante Cloudflare Tunnel.',
        'Implementé caché, catálogo offline cifrado, sincronización y estrategias diferentes para web y Android.',
        'Añadí puentes nativos con Capacitor para reproducción, archivos, notificaciones, widgets y distribución APK.',
      ],
      stackDecisions: [
        { technology: 'React', reason: 'Permite compartir componentes y lógica entre navegador, PWA y WebView de Android.' },
        { technology: 'Capacitor', reason: 'Conserva una base web mientras abre acceso controlado a capacidades nativas.' },
        { technology: 'PWA + Workbox', reason: 'Hace instalable la versión web y permite actualizaciones y funcionamiento offline.' },
        { technology: 'Node.js + SQLite', reason: 'Proporcionan una API compacta y operable desde una Raspberry Pi personal.' },
      ],
      gallery: [
        '/images/cases/music-login.webp',
        '/images/cases/music-dashboard.webp',
        '/images/cases/music-playlist.webp',
      ],
    }),
    new Project('campus-connect', 'Campus Connect', 'Red social universitaria', 'Plataforma mobile-first para comunidad, marketplace y conversación dentro del campus.', '/images/cases/campus-home.webp', ['Next.js', 'Go', 'PostgreSQL', 'Redis'], 'coral', undefined, undefined, {
      overview: 'Red social mobile-first para la comunidad de UPQROO. Reúne publicaciones, conversación, perfiles y espacios de marketplace dentro de un producto pensado alrededor de la vida diaria del campus.',
      problem: 'La información universitaria, las ventas y las conversaciones suelen repartirse entre grupos cerrados y canales difíciles de consultar. Campus Connect propone un espacio común con feed organizado, identidad estudiantil y crecimiento controlado.',
      process: [
        'Modelé usuarios, posts, feeds y eventos como dominios independientes antes de definir las pantallas.',
        'Separé el backend mediante arquitectura hexagonal, puertos y adaptadores para evitar acoplar reglas a HTTP o PostgreSQL.',
        'Construí el frontend como PWA mobile-first con estado de servidor y estado local claramente separados.',
        'Preparé infraestructura reproducible con migraciones, datos de prueba, Docker Compose y verificaciones de salud.',
      ],
      stackDecisions: [
        { technology: 'Next.js + React', reason: 'Combinan renderizado de servidor, navegación de aplicación y una experiencia móvil instalable.' },
        { technology: 'Go + Fiber', reason: 'Ofrecen concurrencia eficiente, tipado fuerte y una API predecible.' },
        { technology: 'PostgreSQL', reason: 'Aporta relaciones, consistencia y consultas adecuadas para usuarios, posts y marketplace.' },
        { technology: 'Redis Streams', reason: 'Desacopla eventos, caché y tareas en tiempo real sin bloquear las solicitudes principales.' },
      ],
      gallery: [
        '/images/cases/campus-home.webp',
        '/images/cases/campus-navigation.webp',
        '/images/cases/campus-search.webp',
      ],
    }),
    new Project('cafe-profesor', 'Café del Profesor', 'Mockup de producto', 'Menú digital premium pensado para descubrir, decidir y ordenar cómodamente desde el móvil.', '/images/cases/cafe-hero.webp', ['Vite', 'Tailwind', 'GSAP', 'Lenis'], 'wine', undefined, undefined, {
      overview: 'Prototipo mobile-first de un menú digital para Café del Profesor. Organiza desayunos, platos, postres y bebidas en categorías navegables, con favoritos visuales, selección de sucursal y detalles de cada producto.',
      problem: 'Los menús extensos son difíciles de recorrer desde un teléfono y suelen ocultar horarios, ubicación o productos destacados. El prototipo prioriza descubrimiento rápido, lectura cómoda y decisiones sin fricción.',
      process: [
        'Convertí el menú en datos estructurados separados de la interfaz para facilitar cambios de precios y categorías.',
        'Diseñé primero el flujo móvil: sucursal, categorías persistentes, destacados y detalle del platillo.',
        'Construí componentes funcionales para hero, navegación, menú, selector y modal.',
        'Añadí movimiento progresivo y scroll suave sin comprometer la navegación ni la legibilidad.',
      ],
      stackDecisions: [
        { technology: 'Vite + JavaScript', reason: 'Mantienen el prototipo sencillo, rápido y sin sobrearquitectura.' },
        { technology: 'Tailwind CSS', reason: 'Acelera la exploración visual manteniendo una escala consistente de espaciado.' },
        { technology: 'GSAP + ScrollTrigger', reason: 'Controlan revelaciones y secuencias vinculadas al desplazamiento.' },
        { technology: 'Lenis', reason: 'Suaviza el recorrido de un menú largo y se sincroniza con las animaciones.' },
      ],
      gallery: [
        '/images/cases/cafe-hero.webp',
        '/images/cases/cafe-featured.webp',
        '/images/cases/cafe-menu.webp',
      ],
    }),
  ],
  skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Go', 'C#', 'Tailwind', 'TanStack Query', 'PostgreSQL', 'Redis', 'BullMQ', 'Git', 'Linux', 'Desarrollo agéntico', 'PWA', 'Android'],
};

export const portfolioRepository = PortfolioRepository.from(source);
