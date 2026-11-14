import { MotionConfig } from 'framer-motion'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { Background } from './components/Background'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { ProjectModal } from './components/ProjectModal'
import { Projects } from './components/Projects'
import { Stats } from './components/Stats'
import type { Project } from './data/portfolio'
import { useLocalStorage } from './hooks'
import type { Theme } from './types'

const Playground = lazy(() => import('./components/Playground').then((module) => ({ default: module.Playground })))
const Stack = lazy(() => import('./components/Stack').then((module) => ({ default: module.Stack })))

function SectionSkeleton() {
  return (
    <div className="section-skeleton container" aria-hidden="true">
      <span className="section-skeleton__eyebrow" />
      <span className="section-skeleton__title" />
      <span className="section-skeleton__block" />
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useLocalStorage<Theme>('imanih-theme', 'dark')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070709' : '#f7f5f2')
  }, [theme])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const openProject = useCallback((project: Project) => setActiveProject(project), [])
  const closeProject = useCallback(() => setActiveProject(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Cursor />
      <Background theme={theme} />
      <Nav theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="contenido">
        <Hero />
        <Marquee />
        <Stats />
        <Projects onOpenProject={openProject} />

        <Suspense fallback={<SectionSkeleton />}>
          <Playground />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Stack />
        </Suspense>

        <About />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        theme={theme}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenProject={openProject}
      />
      <ProjectModal project={activeProject} onClose={closeProject} />
    </MotionConfig>
  )
}
