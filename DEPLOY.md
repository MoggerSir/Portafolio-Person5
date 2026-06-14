# Deploy — GitHub Pages + josmargalindo.com

Guía para publicar este portafolio y reemplazar el sitio antiguo (`portafolio-personal`).

**Repositorio nuevo:** [github.com/MoggerSir/Portafolio-Person5](https://github.com/MoggerSir/Portafolio-Person5)  
**Repositorio antiguo:** [github.com/MoggerSir/portafolio-personal](https://github.com/MoggerSir/portafolio-personal)  
**Dominio:** `josmargalindo.com`

---

## Qué ya está configurado en el proyecto

| Archivo | Función |
|---------|---------|
| `public/CNAME` | Dominio personalizado (`josmargalindo.com`) — se copia a `dist/` en el build |
| `public/.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |
| `.env.example` | Variables documentadas (`VITE_SITE_URL`, `VITE_BASE_PATH`) |
| `.github/workflows/deploy-pages.yml` | Build + deploy automático al hacer push a `main` |
| `vite.config.ts` | `base: '/'` para servir en la raíz del dominio |

---

## 1. Variables de entorno (local)

```bash
cp .env.example .env
```

Contenido recomendado para producción con dominio propio:

```env
VITE_SITE_URL=https://josmargalindo.com
VITE_BASE_PATH=/
```

> `.env` está en `.gitignore`. En CI, el workflow ya inyecta estas variables al compilar.

---

## 2. Activar GitHub Pages (repo nuevo)

1. Entra a **Portafolio-Person5** → **Settings** → **Pages**.
2. En **Build and deployment** → **Source**, elige **GitHub Actions** (no “Deploy from a branch”).
3. Haz push a `main` (o ejecuta el workflow manualmente en **Actions** → **Deploy GitHub Pages** → **Run workflow**).
4. Cuando termine, verifica la URL temporal: `https://moggersir.github.io/Portafolio-Person5/` (solo hasta configurar el dominio).

---

## 3. Conectar el dominio personalizado

### En GitHub (repo Portafolio-Person5)

1. **Settings** → **Pages** → **Custom domain**.
2. Escribe: `josmargalindo.com`
3. Guarda y espera la verificación DNS (puede tardar minutos u horas).
4. Activa **Enforce HTTPS** cuando GitHub lo permita.

### Quitar el dominio del repo antiguo

1. Entra a **portafolio-personal** → **Settings** → **Pages**.
2. Borra el custom domain `josmargalindo.com` (solo un repo puede usarlo a la vez).

### DNS (en tu registrador: Cloudflare, GoDaddy, etc.)

**Raíz (`josmargalindo.com`)** — registros **A**:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Opcional IPv6 (AAAA):**

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Subdominio `www`** — **CNAME** apuntando a:

```
MoggerSir.github.io
```

> Si usas Cloudflare, deja el proxy en “DNS only” (nube gris) hasta que el certificado HTTPS de GitHub esté activo.

Documentación oficial: [Configuring a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 4. Reemplazar el portafolio antiguo

Orden recomendado:

1. Confirma que `npm run build` genera `dist/CNAME` y `dist/.nojekyll`.
2. Push a `main` de **Portafolio-Person5** y espera el deploy en Actions.
3. Prueba `https://moggersir.github.io/Portafolio-Person5/`.
4. Configura custom domain en el repo nuevo (paso 3).
5. Quita el dominio del repo **portafolio-personal**.
6. Verifica `https://josmargalindo.com` y el candado HTTPS.
7. (Opcional) Archiva **portafolio-personal** o añade un README indicando que el sitio migró.

---

## 5. Comandos útiles

```bash
# Desarrollo
npm install
npm run dev

# Build local (misma salida que CI)
npm run build

# Preview del build de producción
npm run preview
```

---

## 6. Checklist post-deploy

- [ ] `https://josmargalindo.com` carga el hero Persona 5
- [ ] Imágenes en `/assets/...` visibles (fondo, proyectos, OC)
- [ ] Enlaces externos (GitHub, LinkedIn, demos) funcionan
- [ ] Menú móvil inferior no queda bajo la barra de gestos
- [ ] HTTPS activo sin advertencias del navegador

---

## Pantalla en blanco — causa y solución

Si el sitio carga vacío, abre **Ver código fuente** y busca el script:

```html
<!-- ❌ Mal: GitHub sirve el código fuente sin compilar -->
<script type="module" src="/src/main.tsx"></script>

<!-- ✅ Bien: build de producción -->
<script type="module" crossorigin src="/assets/index-XXXX.js"></script>
```

**Causa:** Pages está publicando la rama `main` (código fuente) en lugar del build.

**Solución rápida (sin permiso `workflow` en el token):**

```bash
npm run deploy
```

Luego en GitHub → **Settings → Pages**:

1. **Source:** Deploy from a branch
2. **Branch:** `gh-pages` → carpeta `/ (root)`
3. Guardar y esperar 1–2 minutos

La rama `gh-pages` ya contiene solo el contenido de `dist/` (HTML, JS, CSS, CNAME).

**Solución definitiva:** activar **GitHub Actions** como source (requiere PAT con scope `workflow`) y subir `.github/workflows/deploy-pages.yml`.

---

## Alternativa: publicar en el repo antiguo

Si prefieres mantener **portafolio-personal** como repo de Pages:

1. Sube el código de este proyecto a ese repositorio.
2. Activa **GitHub Actions** como source en ese repo.
3. Mantén `public/CNAME` con `josmargalindo.com`.
4. No hace falta cambiar DNS si ya apuntaba a GitHub Pages.

La configuración de archivos (`CNAME`, workflow, `.nojekyll`) es la misma.
