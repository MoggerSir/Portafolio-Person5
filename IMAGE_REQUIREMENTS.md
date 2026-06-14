# Requisitos de Imágenes — Portfolio Persona 5

Este documento lista los elementos visuales que **no pueden replicarse fielmente** solo con Tailwind/CSS y requieren assets gráficos dedicados (PNG/SVG con transparencia).

---

## 1. Retrato estilo manga (Hero — lado derecho)

| Campo | Detalle |
|---|---|
| **Uso** | Ilustración principal del hero, reemplazo del retrato fotográfico actual |
| **Referencia** | `public/assets/references/design-reference.png` — personaje estilo Persona 5 |
| **Formato** | PNG con fondo transparente |
| **Dimensiones** | ~800×1200 px (ratio 2:3) |
| **Estilo** | Blanco y negro, trazo manga, cabello rizado, abrigo de cuello alto |
| **Notas** | Debe funcionar sobre fondo rojo con círculo/target detrás |

---

## 2. Marco tarjeta Persona / Stats (PRIORIDAD ALTA)

| Campo | Detalle |
|---|---|
| **Uso** | Contenedor visual de la tarjeta de estadísticas (2 bloques negros inclinados) |
| **Ruta destino** | `src/assets/ui/persona-stat-card-frame.png` |
| **Formato** | PNG con fondo **transparente** |
| **Dimensiones** | **360 × 300 px** (ratio 6:5) — mantener esta proporción |
| **Contenido del PNG** | Solo formas: 2 polígonos negros, bordes blancos gruesos, icono decorativo opcional. **Sin texto.** |
| **Referencia visual** | `public/assets/references/design-reference.png` — bloque superior (header) + bloque inferior (stats) |
| **Estado actual** | PNG en `src/assets/ui/persona-stat-card-frame.png` |

### Cómo reemplazar por tu PNG

1. Exporta el marco desde Figma/Photoshop/Procreate.
2. Guárdalo como `src/assets/ui/persona-stat-card-frame.png`.
3. Si el texto no alinea, ajusta los porcentajes en `PERSONA_STAT_CARD_SLOTS`.

### Zonas de contenido (HTML superpuesto)

| Zona | Posición actual | Contenido dinámico |
|---|---|---|
| Header | top 7%, left 9%, width 72% | PERSONA —, nombre, LVL |
| Stats | top 44%, left 7%, width 86% | Etiquetas + barras segmentadas |

---

## 3. Máscara Phantom Thief (opcional si va en el PNG)

| Campo | Detalle |
|---|---|
| **Uso** | Icono en la unión de los dos bloques (puede ir incluido en el PNG del marco) |
| **Formato** | SVG o PNG 64×64 px |
| **Estilo** | Máscara blanca estilo Persona 5 |

---

## 4. Iconos sociales custom

| Campo | Detalle |
|---|---|
| **Uso** | Footer — GitHub, LinkedIn, Email |
| **Formato** | SVG monocromático blanco, 24×24 px cada uno |
| **Estilo** | Trazo grueso, angular, coherente con UI Persona |
| **Estado actual** | Texto abreviado (GH, IN, @) |

---

## 4. Textura de título con efecto "stamp"

| Campo | Detalle |
|---|---|
| **Uso** | Nombre "JOSMAR" en el hero — efecto texturizado/sellado |
| **Formato** | PNG tileable o SVG pattern |
| **Estilo** | Ruido grano, bordes irregulares como sello de goma |
| **Alternativa CSS** | Parcialmente lograble con `background-clip: text` + noise SVG inline |

---

## 5. Splatter / manchas de pintura decorativas

| Campo | Detalle |
|---|---|
| **Uso** | Elementos decorativos en transiciones entre secciones |
| **Formato** | PNG con transparencia, varios tamaños (200–600 px) |
| **Cantidad** | 3–5 variantes |
| **Colores** | Negro sobre rojo, blanco sobre negro |

---

## 6. Skyline silueta (Hero background)

| Campo | Detalle |
|---|---|
| **Uso** | Silueta de ciudad bajo el retrato |
| **Formato** | SVG o PNG ancho (~1200×200 px) |
| **Estilo** | Silueta negra, edificios angulosos estilo Tokyo |
| **Estado actual** | Aproximación con clip-path CSS |

---

## 7. Flecha CTA angular

| Campo | Detalle |
|---|---|
| **Uso** | Botón "VER PROYECTOS" — flecha dentro de cuadrado negro |
| **Formato** | SVG 32×32 px |
| **Estilo** | Flecha blanca gruesa, esquinas cortadas |
| **Estado actual** | Carácter Unicode → |

---

## 8. Favicon / Logo JG.

| Campo | Detalle |
|---|---|
| **Uso** | Favicon del sitio y posible splash |
| **Formato** | SVG + PNG 512×512 |
| **Estilo** | "JG." en Bebas Neue, sombra roja desplazada |

---

## Prioridad de producción

1. **Alta** — Retrato manga, iconos sociales, máscara Phantom Thief
2. **Media** — Skyline, splatters, flecha CTA
3. **Baja** — Textura stamp, favicon custom

---

## Ubicación sugerida en el proyecto

```
public/assets/ui/
  character-portrait.png
  phantom-mask.svg
  social-github.svg
  social-linkedin.svg
  social-email.svg
  skyline.svg
  splatter-01.png
  splatter-02.png
  arrow-cta.svg
  logo-favicon.svg
```
