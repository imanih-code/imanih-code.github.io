export type ProjectCategory = 'producto' | 'lab' | 'open-source'

export type ProjectVisual = 'orbit' | 'waves' | 'grid' | 'mesh' | 'prism' | 'terminal'

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  year: string
  role: string
  category: ProjectCategory
  tags: string[]
  highlights: string[]
  visual: ProjectVisual
  gradient: [string, string]
  demo?: string
  code?: string
  featured?: boolean
}

export const profile = {
  name: 'Imanih',
  handle: 'imanih-code',
  role: 'Frontend Engineer',
  focus: 'React · TypeScript · Motion',
  location: 'Remoto · GMT+1',
  email: 'hola@imanih.dev',
  github: 'https://github.com/imanih-code',
  linkedin: 'https://www.linkedin.com/in/imanih',
  availability: 'Disponible para nuevos proyectos',
  roles: [
    'React + TypeScript',
    'Design systems',
    'Microinteracciones',
    'Performance web',
    'Accesibilidad real',
  ],
}

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'playground', label: 'Playground' },
  { id: 'stack', label: 'Stack' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
] as const

export const stats = [
  { value: 5, suffix: '+', label: 'años construyendo interfaces' },
  { value: 30, suffix: '+', label: 'proyectos enviados a producción' },
  { value: 99, suffix: '/100', label: 'Lighthouse en performance' },
  { value: 18, suffix: 'k', label: 'commits (y contando)' },
]

export const projects: Project[] = [
  {
    slug: 'nebula',
    title: 'Nebula',
    tagline: 'Analytics en tiempo real para equipos de producto.',
    description:
      'Un dashboard que recibe miles de eventos por segundo y los convierte en gráficos comprensibles. Widgets arrastrables, layout persistente y gráficos SVG escritos desde cero para mantener el bundle ligero.',
    year: '2025',
    role: 'Frontend Lead',
    category: 'producto',
    tags: ['React 19', 'TypeScript', 'WebSocket', 'SVG', 'Zustand'],
    highlights: [
      'Widgets drag & drop con Pointer Events y layout persistido por usuario.',
      'Gráficos SVG propios a 60 fps, sin librerías de charts.',
      'Streaming de datos con reconexión exponencial y UI optimista.',
      'Patrón reducer + selectores para evitar re-renders innecesarios.',
    ],
    visual: 'orbit',
    gradient: ['#ff5a3c', '#ffb15c'],
    code: 'https://github.com/imanih-code',
    featured: true,
  },
  {
    slug: 'flowboard',
    title: 'Flowboard',
    tagline: 'Kanban colaborativo con presencia en vivo.',
    description:
      'Tablero pensado para equipos remotos: drag & drop accesible por teclado, cursores de otros usuarios y resolución de conflictos sin pisar el trabajo de nadie.',
    year: '2025',
    role: 'Frontend Engineer',
    category: 'producto',
    tags: ['React', 'useReducer', 'DnD', 'Supabase', 'Realtime'],
    highlights: [
      'Drag & drop con soporte completo de teclado y lectores de pantalla.',
      'Actualizaciones optimistas con rollback automático ante errores.',
      'Presencia y cursores en vivo con canales realtime.',
      'Memoización por columna: mover una tarjeta re-renderiza solo dos listas.',
    ],
    visual: 'grid',
    gradient: ['#6d5efc', '#3ec5ff'],
    code: 'https://github.com/imanih-code',
  },
  {
    slug: 'aurora-store',
    title: 'Aurora Store',
    tagline: 'E-commerce con checkout en tres pasos.',
    description:
      'Una tienda de objetos de diseño donde el carrito es un estado derivado, el checkout se siente instantáneo y cada interacción tiene feedback inmediato.',
    year: '2024',
    role: 'Frontend Engineer',
    category: 'producto',
    tags: ['React', 'Context', 'React Query', 'Stripe', 'View Transitions'],
    highlights: [
      'Carrito como máquina de estados con useReducer + Context.',
      'Checkout multi-paso con validación progresiva y persistencia.',
      'View Transitions entre listado y detalle de producto.',
      'Prefetch inteligente de la siguiente ruta según intención de compra.',
    ],
    visual: 'waves',
    gradient: ['#35e0b0', '#0f8f7a'],
    code: 'https://github.com/imanih-code',
  },
  {
    slug: 'pulse',
    title: 'Pulse',
    tagline: 'Chat en tiempo real que no se siente lento.',
    description:
      'Mensajería con listas virtualizadas de 10k+ mensajes, indicadores de escritura y entrega optimista. La UI responde antes de que el servidor conteste.',
    year: '2024',
    role: 'Frontend Engineer',
    category: 'producto',
    tags: ['React', 'Virtualización', 'WebSocket', 'IndexedDB'],
    highlights: [
      'Lista virtualizada con scroll anclado y carga bidireccional.',
      'Mensajes optimistas con estados pending / sent / failed.',
      'Agrupación por autor y día calculada con memoización.',
      'Borradores persistidos en IndexedDB por conversación.',
    ],
    visual: 'mesh',
    gradient: ['#ff3d81', '#7d3dff'],
    code: 'https://github.com/imanih-code',
  },
  {
    slug: 'motion-lab',
    title: 'Motion Lab',
    tagline: 'Un laboratorio de microinteracciones.',
    description:
      'Colección de experimentos para estudiar cómo se siente una interfaz: springs, transiciones de layout, cursores magnéticos y animaciones que respetan prefers-reduced-motion.',
    year: '2026',
    role: 'Design Engineer',
    category: 'lab',
    tags: ['React', 'Motion', 'CSS', 'Canvas', 'A11y'],
    highlights: [
      '20 experimentos interactivos documentados con su curva de easing.',
      'Todas las animaciones desactivables con prefers-reduced-motion.',
      'Componentes copiables y sin dependencias de estilos.',
      'Playground en vivo con controles de duración y spring.',
    ],
    visual: 'prism',
    gradient: ['#ffb15c', '#ff3b2f'],
    code: 'https://github.com/imanih-code',
  },
  {
    slug: 'signal-ui',
    title: 'Signal UI',
    tagline: 'Sistema de diseño headless y accesible.',
    description:
      'Librería de componentes sin estilos impuestos: comportamiento accesible, composición por compound components y tokens que se adaptan a cualquier marca.',
    year: '2023',
    role: 'Maintainer',
    category: 'open-source',
    tags: ['React', 'TypeScript', 'Radix', 'Storybook', 'Tests'],
    highlights: [
      'Compound components con contexto interno y API predecible.',
      'Foco gestionado, roles ARIA y navegación por teclado en todos los patrones.',
      'Cobertura de tests con Testing Library y axe.',
      'Documentación viva con Storybook y controles interactivos.',
    ],
    visual: 'terminal',
    gradient: ['#a8ff78', '#35e0b0'],
    code: 'https://github.com/imanih-code',
  },
]

export const categories: { id: 'todos' | ProjectCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'producto', label: 'Producto' },
  { id: 'lab', label: 'UI Lab' },
  { id: 'open-source', label: 'Open Source' },
]

export const techMarquee = [
  'React 19',
  'TypeScript',
  'Vite',
  'Next.js',
  'Motion',
  'TanStack Query',
  'Zustand',
  'Tailwind',
  'CSS Grid',
  'Node.js',
  'Testing Library',
  'Storybook',
  'Playwright',
  'Figma',
]

export interface SkillGroup {
  title: string
  caption: string
  skills: { name: string; level: number }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Core',
    caption: 'El día a día',
    skills: [
      { name: 'React', level: 96 },
      { name: 'TypeScript', level: 92 },
      { name: 'JavaScript (ES2024)', level: 94 },
      { name: 'HTML semántico + CSS moderno', level: 95 },
    ],
  },
  {
    title: 'Ecosistema',
    caption: 'Herramientas que elijo',
    skills: [
      { name: 'Vite / Next.js', level: 90 },
      { name: 'Motion / animaciones', level: 88 },
      { name: 'TanStack Query / Zustand', level: 86 },
      { name: 'Testing (Vitest, Testing Library)', level: 82 },
    ],
  },
  {
    title: 'Producto',
    caption: 'Lo que se nota al usarlo',
    skills: [
      { name: 'Accesibilidad (WCAG 2.2)', level: 89 },
      { name: 'Performance (Core Web Vitals)', level: 91 },
      { name: 'Design systems', level: 87 },
      { name: 'Prototipado en Figma', level: 80 },
    ],
  },
]

export const reactToolkit = [
  'Custom hooks',
  'Compound components',
  'Context + useReducer',
  'Suspense + lazy',
  'Portals',
  'Optimistic UI',
  'Memoización quirúrgica',
  'Error boundaries',
  'Render props',
  'Máquinas de estado',
  'Testing Library',
  'Server Components',
]

export const principles = [
  {
    title: 'El estado mínimo',
    body: 'Todo lo que se puede derivar, se deriva. Menos estado significa menos bugs y menos re-renders.',
  },
  {
    title: 'Movimiento con propósito',
    body: 'Cada transición explica un cambio. Si no ayuda a entender la interfaz, se elimina.',
  },
  {
    title: 'Accesible por defecto',
    body: 'Teclado, foco visible y contraste no son una fase final: son parte del diseño inicial.',
  },
]

export const terminalScript = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Imanih — Frontend Engineer · Remoto (GMT+1)' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'react · typescript · design systems · motion · accesibilidad' },
  { type: 'cmd', text: 'cat about.md' },
  {
    type: 'out',
    text: 'Empecé con HTML y CSS a los 15. Me enganché a React cuando entendí que',
  },
  {
    type: 'out',
    text: 'la UI podía ser una función del estado. Desde entonces construyo producto:',
  },
  {
    type: 'out',
    text: 'interfaces rápidas, sistemas que escalan y detalles que se sienten bien.',
  },
  { type: 'cmd', text: 'npm run philosophy' },
  { type: 'out', text: '> accesibilidad primero · performance es una feature · menos, pero mejor' },
  { type: 'out', text: '> listo. ¿construimos algo?' },
] as const
