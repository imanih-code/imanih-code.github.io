import { principles, reactToolkit, skillGroups } from '../data/portfolio'
import type { SkillGroup } from '../data/portfolio'
import { useInView } from '../hooks'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <Reveal delay={index * 0.08} className="skill-card-wrap">
      <div className="skill-card" ref={ref}>
        <div className="skill-card__head">
          <h3>{group.title}</h3>
          <span className="mono">{group.caption}</span>
        </div>
        <ul className="skill-card__list">
          {group.skills.map((skill, skillIndex) => (
            <li key={skill.name}>
              <div className="skill-card__row">
                <span>{skill.name}</span>
                <span className="mono">{skill.level}</span>
              </div>
              <div className="skill-bar">
                <span
                  className="skill-bar__fill"
                  style={{
                    width: inView ? `${skill.level}%` : '0%',
                    transitionDelay: `${120 + skillIndex * 90}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function Stack() {
  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          index="03"
          kicker="Stack y herramientas"
          title={<span id="stack-title">Lo que uso para construir.</span>}
          description="No colecciono librerías: elijo las que resuelven un problema concreto. Estas son las que están en mi día a día."
        />

        <div className="stack__grid">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>

        <Reveal className="toolkit">
          <div className="toolkit__head">
            <span className="mono">react toolkit</span>
            <p>Patrones que aplico sin pensarlo dos veces.</p>
          </div>
          <ul className="toolkit__list">
            {reactToolkit.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="principles">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.08} className="principle">
              <span className="principle__index mono">0{index + 1}</span>
              <h3 className="principle__title">{principle.title}</h3>
              <p className="principle__body">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
