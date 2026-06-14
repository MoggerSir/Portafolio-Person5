# Josmar Galindo — Portfolio

Portfolio personal con estética **Persona 5**. SPA en pantalla completa con navegación por secciones, animaciones y contenido centralizado en capa de dominio.

**Live:** [josmargalindo.com](https://josmargalindo.com)

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19, TypeScript 6 |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`, `@theme`) |
| Animaciones | Framer Motion 12 |
| Utilidades | `clsx` |
| Lint | ESLint 10 + typescript-eslint |
| Fuentes | Google Fonts (Bebas Neue, Oswald) |
| Iconos | SVG inline estilo [Iconoir](https://iconoir.com) (redes sociales) |

### Dependencias

**Producción**
- `react`, `react-dom` — UI declarativa
- `framer-motion` — transiciones, hover Persona, personaje interactivo, modales
- `clsx` — composición condicional de clases (`cn()`)

**Desarrollo**
- `vite`, `@vitejs/plugin-react` — bundler y HMR
- `tailwindcss`, `@tailwindcss/vite` — utilidades + tokens de diseño
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node` — tipado
- `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` — calidad de código

## Tipografía

Cargadas desde Google Fonts en `index.html`.

| Token CSS | Fuente | Uso |
|-----------|--------|-----|
| `--font-display` | **Bebas Neue** | Títulos, logo, nav, botones CTA, stats (nombre/LVL) |
| `--font-body` | **Oswald** (400–700) | Párrafos, labels de stats, subtítulos, UI general |

**Convenciones**
- Títulos de sección: `font-display`, tracking amplio (`tracking-wider` / `0.08em–0.3em`)
- Texto corrido y etiquetas: `font-body`, peso 600 en nav y stats
- Mayúsculas en nav, CTAs y badges para reforzar la estética de menú Persona

## Paleta de colores

Definida en `@theme` (`src/index.css`) y expuesta como utilidades Tailwind (`bg-persona-red`, `text-persona-black`, etc.).

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `--color-persona-red` | `#e60012` | `persona-red` | Acento principal, barras de stats, CTAs, fondo sección About |
| `--color-persona-red-dark` | `#b8000e` | `persona-red-dark` | Hover de botones rojos |
| `--color-persona-black` | `#0a0a0a` | `persona-black` | Fondos, bordes, sombras, texto sobre blanco |
| `--color-persona-white` | `#f5f5f5` | `persona-white` | Texto sobre negro/rojo, contenedores activos del nav |
| `--color-persona-gray` | `#1a1a1a` | `persona-gray` | Tarjetas de proyectos, paneles secundarios |

**Efectos recurrentes**
- Halftone (puntos) sobre fondos rojos/negros — `.persona-halftone`, `.persona-halftone-light`
- Sombras duras tipo UI japonesa — `shadow-[8px_8px_0_#…]`, capas desplazadas en `LayeredShape`
- Selección de texto: fondo negro, texto rojo (`::selection`)

## Diseño

- **Referencia visual:** menús e interfaces de *Persona 5* (Atlus).
- **Componentes visuales:** formas inclinadas (`clip-path`), capas de sombra (`LayeredShape`), halftone, bordes angulados, animación hover (pop 3D + esquinas + swap de color).
- **Navegación:** botones con número + etiqueta; badge rojo solo al seleccionar; contenedor blanco activo.
- **Hero:** fondo PNG, OC interactivo (clic = salto, doble clic = giro en Y), tarjeta de stats (marco PNG + overlay HTML calibrado en `personaStatCard.ts`).
- **Layout:** pantallas fijas (`100vh`, sin scroll global); scroll interno en proyectos y sobre mí.
- **Iconografía:** GitHub, LinkedIn y email con trazos Iconoir embebidos en `src/components/ui/icons/socialIcons.tsx` (sin dependencia npm).

## Arquitectura

```
src/
├── App.tsx                 # Composición raíz + PortfolioApplication
├── components/
│   ├── layout/             # Header, Footer, ScreenTransition
│   ├── sections/           # Hero, Projects, About, Contact
│   └── ui/                 # Piezas reutilizables y shapes Persona
├── config/                 # Ajuste visual (stats card, personaje hero)
├── core/
│   ├── data/               # PortfolioRepository (datos del sitio)
│   ├── models/             # Entidades de dominio (Profile, Project, Skill…)
│   └── services/           # Lógica de negocio (navegación)
├── hooks/                  # Puente React ↔ servicios
└── utils/                  # Helpers puros (transforms, bio, cn)
```

### Flujo

1. `PortfolioRepository` expone perfil, proyectos, skills y navegación.
2. `useScreenNavigation` gestiona la pantalla activa vía `ScreenNavigationService`.
3. `App` renderiza la sección correspondiente con `AnimatePresence`.
4. Las secciones reciben datos ya filtrados (p. ej. `getFeaturedProjects()`).

## Patrones de diseño

| Patrón | Uso |
|--------|-----|
| **Singleton** | `PortfolioRepository.getInstance()` — una fuente de datos |
| **Repository** | Acceso y filtrado de proyectos, skills y cursos |
| **Service** | `ScreenNavigationService` — validación y resolución de pantallas |
| **Composition** | UI modular: `LayeredShape`, `PersonaCard`, secciones |
| **Config-driven UI** | `personaStatCard.ts`, `heroCharacter.ts` — posición/escala sin tocar JSX |
| **Custom Hook** | `useScreenNavigation` — estado de navegación desacoplado |
| **Facade** | `PortfolioApplication` — punto de entrada OOP sobre la vista React |

## Uso de las tecnologías

- **React + TypeScript:** componentes tipados; modelos de dominio como clases inmutables.
- **Vite:** dev server, alias `@/` → `src/`, build estático para GitHub Pages.
- **Tailwind v4:** tokens en `@theme`; estilos Persona en `index.css` donde hace falta control fino (clip-path, animaciones hover).
- **Framer Motion:** transiciones entre pantallas, entrada de bloques, interacción del personaje y modal de proyectos.
- **Assets:** estáticos en `public/`; imágenes embebidas en build vía import en `src/assets/` cuando deben versionarse con Vite.

## Scripts

```bash
npm install
npm run dev      # desarrollo
npm run build    # tsc + vite build → dist/
npm run preview  # preview del build
npm run lint     # ESLint
```

## Deploy

Build estático en `dist/`. Guía completa de migración y dominio: **[DEPLOY.md](./DEPLOY.md)**.

### Resumen rápido

1. Copia variables: `cp .env.example .env`
2. Push a `main` → GitHub Actions despliega automáticamente (`.github/workflows/deploy-pages.yml`)
3. En el repo **Settings → Pages**: source **GitHub Actions**, custom domain **`josmargalindo.com`**
4. Quita el dominio del repo antiguo `portafolio-personal`
5. DNS raíz → registros **A** de GitHub Pages; `www` → **CNAME** `MoggerSir.github.io`

Archivos clave:

| Archivo | Rol |
|---------|-----|
| `public/CNAME` | Dominio `josmargalindo.com` |
| `public/.nojekyll` | Build Vite sin Jekyll |
| `.env.example` | `VITE_SITE_URL`, `VITE_BASE_PATH` |
| `.github/workflows/deploy-pages.yml` | CI/CD a GitHub Pages |

## Ajustes visuales

| Archivo | Qué controla |
|---------|----------------|
| `src/config/personaStatCard.ts` | Posición, escala y texto de la tarjeta de stats |
| `src/config/heroCharacter.ts` | Posición y escala del OC en el hero |
| `src/core/data/PortfolioRepository.ts` | Contenido: perfil, proyectos, skills, links |
