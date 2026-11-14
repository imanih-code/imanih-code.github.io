import { Pause, Play, Shuffle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type Algo = 'bubble' | 'insertion' | 'selection'

interface Frame {
  values: number[]
  active: number[]
  sorted: number[]
  comparisons: number
  swaps: number
}

const algorithms: { id: Algo; label: string; complexity: string }[] = [
  { id: 'bubble', label: 'Bubble', complexity: 'O(n²)' },
  { id: 'insertion', label: 'Insertion', complexity: 'O(n²)' },
  { id: 'selection', label: 'Selection', complexity: 'O(n²)' },
]

const BAR_COUNT = 22

const randomArray = () =>
  Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 84) + 12)

function buildFrames(input: number[], algorithm: Algo): Frame[] {
  const values = [...input]
  const frames: Frame[] = []
  const sorted = new Set<number>()
  let comparisons = 0
  let swaps = 0

  const snapshot = (active: number[]) => {
    frames.push({
      values: [...values],
      active,
      sorted: [...sorted],
      comparisons,
      swaps,
    })
  }

  snapshot([])

  if (algorithm === 'bubble') {
    for (let i = 0; i < values.length - 1; i += 1) {
      for (let j = 0; j < values.length - 1 - i; j += 1) {
        comparisons += 1
        snapshot([j, j + 1])
        if ((values[j] as number) > (values[j + 1] as number)) {
          const current = values[j] as number
          values[j] = values[j + 1] as number
          values[j + 1] = current
          swaps += 1
          snapshot([j, j + 1])
        }
      }
      sorted.add(values.length - 1 - i)
    }
  }

  if (algorithm === 'insertion') {
    for (let i = 1; i < values.length; i += 1) {
      let j = i
      while (j > 0) {
        comparisons += 1
        snapshot([j - 1, j])
        if ((values[j - 1] as number) > (values[j] as number)) {
          const current = values[j] as number
          values[j] = values[j - 1] as number
          values[j - 1] = current
          swaps += 1
          snapshot([j - 1, j])
          j -= 1
        } else {
          break
        }
      }
      for (let k = 0; k <= i; k += 1) sorted.add(k)
    }
  }

  if (algorithm === 'selection') {
    for (let i = 0; i < values.length - 1; i += 1) {
      let min = i
      for (let j = i + 1; j < values.length; j += 1) {
        comparisons += 1
        snapshot([min, j])
        if ((values[j] as number) < (values[min] as number)) min = j
      }
      if (min !== i) {
        const current = values[i] as number
        values[i] = values[min] as number
        values[min] = current
        swaps += 1
        snapshot([i, min])
      }
      sorted.add(i)
    }
  }

  for (let i = 0; i < values.length; i += 1) sorted.add(i)
  snapshot([])

  return frames
}

const snippet = `useEffect(() => {
  if (!playing) return
  if (index >= frames.length - 1) return setPlaying(false)

  const id = setTimeout(() => setIndex(i => i + 1), speed)
  return () => clearTimeout(id)
}, [playing, index, speed, frames])`

export function Playground() {
  const [algorithm, setAlgorithm] = useState<Algo>('bubble')
  const [values, setValues] = useState<number[]>(randomArray)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(45)
  const reducedMotion = usePrefersReducedMotion()

  const frames = useMemo(() => buildFrames(values, algorithm), [values, algorithm])

  useEffect(() => {
    setIndex(0)
    setPlaying(false)
  }, [values, algorithm])

  useEffect(() => {
    if (!playing) return
    if (index >= frames.length - 1) {
      setPlaying(false)
      return
    }
    const timeout = window.setTimeout(() => setIndex((current) => current + 1), speed)
    return () => window.clearTimeout(timeout)
  }, [playing, index, frames.length, speed])

  const frame = frames[Math.min(index, frames.length - 1)] ?? {
    values,
    active: [],
    sorted: [],
    comparisons: 0,
    swaps: 0,
  }
  const max = Math.max(...frame.values)
  const finished = index >= frames.length - 1
  const progress = frames.length > 1 ? (index / (frames.length - 1)) * 100 : 0

  const togglePlay = () => {
    if (reducedMotion) {
      setIndex(frames.length - 1)
      setPlaying(false)
      return
    }
    if (finished) {
      setIndex(0)
      setPlaying(true)
      return
    }
    setPlaying((value) => !value)
  }

  return (
    <section className="section playground" id="playground" aria-labelledby="playground-title">
      <div className="container">
        <SectionHeading
          index="02"
          kicker="Playground"
          title={<span id="playground-title">React, en vivo.</span>}
          description="Un laboratorio para enseñar cómo se comporta un algoritmo paso a paso. Todo el estado vive en React: frames precalculados, un efecto para el playback y controles que respetan tus preferencias."
        />

        <div className="lab">
          <Reveal className="lab__info">
            <span className="lab__tag mono">demo interactiva / sorting lab</span>
            <h3 className="lab__heading">Ordena. Pausa. Observa.</h3>
            <p className="lab__text">
              Cada comparación es un frame inmutable guardado en un <code>useMemo</code>. El reproductor solo avanza
              un índice, así que la animación nunca bloquea el hilo principal y puedes pausar en cualquier momento.
            </p>
            <ul className="lab__notes">
              <li>
                <span className="mono">01</span> Estado derivado: los frames se recalculan solo al barajar o cambiar de
                algoritmo.
              </li>
              <li>
                <span className="mono">02</span> Un único <code>useEffect</code> controla el reloj del playback.
              </li>
              <li>
                <span className="mono">03</span> Con <code>prefers-reduced-motion</code>, el resultado aparece al
                instante.
              </li>
            </ul>
            <pre className="lab__snippet mono" aria-label="Código del efecto de playback">
              <code>{snippet}</code>
            </pre>
          </Reveal>

          <Reveal delay={0.1} className="lab__panel">
            <div className="lab__header">
              <div className="lab__segmented" role="group" aria-label="Elegir algoritmo de ordenación">
                {algorithms.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={algorithm === item.id ? 'is-active' : ''}
                    onClick={() => setAlgorithm(item.id)}
                    aria-pressed={algorithm === item.id}
                  >
                    {item.label}
                    <span className="mono">{item.complexity}</span>
                  </button>
                ))}
              </div>
              <span className="lab__status mono">{finished ? 'completado' : playing ? 'ordenando…' : 'en pausa'}</span>
            </div>

            <div className="lab__chart-shell">
              <div className="lab__chart" aria-hidden="true">
                {frame.values.map((value, barIndex) => {
                  const isActive = frame.active.includes(barIndex)
                  const isSorted = frame.sorted.includes(barIndex)
                  return (
                    <span
                      key={barIndex}
                      className={`lab__bar ${isActive ? 'is-active' : ''} ${isSorted ? 'is-sorted' : ''}`}
                      style={{ height: `${(value / max) * 100}%` }}
                    />
                  )
                })}
              </div>
              <div className="lab__progress">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <dl className="lab__metrics">
              <div>
                <dt>comparaciones</dt>
                <dd className="mono">{frame.comparisons}</dd>
              </div>
              <div>
                <dt>intercambios</dt>
                <dd className="mono">{frame.swaps}</dd>
              </div>
              <div>
                <dt>elementos</dt>
                <dd className="mono">{frame.values.length}</dd>
              </div>
              <div>
                <dt>frame</dt>
                <dd className="mono">
                  {index + 1}/{frames.length}
                </dd>
              </div>
            </dl>

            <div className="lab__controls">
              <button type="button" className="lab__play" onClick={togglePlay}>
                {playing ? <Pause size={17} /> : <Play size={17} />}
                <span>{finished ? 'Repetir' : playing ? 'Pausar' : 'Ordenar'}</span>
              </button>
              <button
                type="button"
                className="lab__shuffle"
                onClick={() => setValues(randomArray())}
                aria-label="Generar una nueva lista aleatoria"
              >
                <Shuffle size={17} />
              </button>
              <label className="lab__speed">
                <span>velocidad</span>
                <input
                  type="range"
                  min={8}
                  max={140}
                  step={4}
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                  aria-label="Velocidad de la animación"
                />
              </label>
            </div>

            <p className="sr-only" aria-live="polite">
              {frame.comparisons} comparaciones y {frame.swaps} intercambios. Frame {index + 1} de {frames.length}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
