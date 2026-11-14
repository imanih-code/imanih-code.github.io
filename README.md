# imanih.dev — portfolio

Portfolio personal de **Imanih**, frontend engineer. Construido con **React 19 + TypeScript + Vite**, sin plantillas ni frameworks CSS.

El objetivo del proyecto es demostrar dominio de React más allá de lo básico: hooks propios, estado derivado, animaciones con propósito, portales, accesibilidad y rendimiento.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Motion (Framer Motion) para animaciones y transiciones de layout
- Lucide para iconografía
- CSS puro con design tokens y temas claro/oscuro

## Qué incluye

- **Hero interactivo** con animación de entrada, typewriter y tarjeta 3D que sigue al cursor.
- **Fondo generativo en canvas**: constelación de partículas que reacciona al puntero.
- **Cursor personalizado** con interpolación y etiquetas contextuales (`data-cursor-label`).
- **Command palette** (`Ctrl/⌘ + K`) con búsqueda, navegación por teclado y acciones.
- **Proyectos filtrables** con transiciones de layout, tilt 3D y modal con focus trap.
- **Playground**: sorting lab con frames precalculados, playback controlable y respeto por `prefers-reduced-motion`.
- **Terminal animada** en la sección "Sobre mí".
- **Formulario de contacto** con validación y fallback a `mailto:` (sin backend).
- Tema claro/oscuro persistido y aplicado antes del primer paint.
- Lazy loading de secciones pesadas con `Suspense`.
- Navegación accesible por teclado, skip link y `aria-*` donde hace falta.

## Desarrollo

```bash
npm install
npm run dev
```

```bash
npm run build     # typecheck + build de producción
npm run preview   # sirve dist/
npm run typecheck
```

## Personalizar

Casi todo el contenido vive en **`src/data/portfolio.ts`**: perfil, enlaces, proyectos, skills, stats y el guion de la terminal. Cambia ahí tus datos y el resto del sitio se adapta.

- Colores y tipografía: variables CSS al principio de `src/index.css`.
- Favicon: `public/favicon.svg`.
- Metadata/SEO: `index.html`.

Los proyectos usan visuales generados (gradientes, SVG y CSS), así que no necesitas imágenes para arrancar. Cada proyecto acepta `visual` (`orbit`, `waves`, `grid`, `mesh`, `prism`, `terminal`) y `gradient`.

## Deploy en GitHub Pages

El repo ya incluye el workflow `.github/workflows/deploy.yml`.

1. En GitHub: **Settings → Pages → Source: GitHub Actions**.
2. Haz push a `main`; el workflow instala, construye y publica `dist/`.
3. El sitio queda en `https://imanih-code.github.io/`.

## Licencia

MIT — ver [LICENSE](./LICENSE).
