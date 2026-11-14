import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type Status = 'idle' | 'sent'
interface FormValues {
  name: string
  email: string
  message: string
}
type FormErrors = Partial<Record<keyof FormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const { copied, copy } = useCopyToClipboard()
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextValue = event.target.value
    setValues((current) => ({ ...current, [field]: nextValue }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validate = (input: FormValues): FormErrors => {
    const next: FormErrors = {}
    if (input.name.trim().length < 2) next.name = 'Dime cómo te llamas (mínimo 2 caracteres).'
    if (!emailPattern.test(input.email.trim())) next.email = 'Necesito un email válido para responderte.'
    if (input.message.trim().length < 12) next.message = 'Cuéntame un poco más: al menos 12 caracteres.'
    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalidKey = (Object.keys(nextErrors) as (keyof FormValues)[])[0]
    if (firstInvalidKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidKey}"]`)?.focus()
      return
    }

    const subject = encodeURIComponent(`Hola Imanih — ${values.name.trim()}`)
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  const reset = () => {
    setValues({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  return (
    <section className="section contact" id="contacto" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index="05"
          kicker="Contacto"
          title={<span id="contact-title">¿Construimos algo?</span>}
          description="Tengo disponibilidad para proyectos de producto, design systems y equipos que quieran subir el nivel de su frontend."
        />

        <div className="contact__grid">
          <Reveal className="contact__info">
            <p className="contact__lead">
              Escríbeme y te respondo en menos de <strong>24 horas</strong>. Si prefieres el clásico, copia mi email:
            </p>

            <div className="contact__email">
              <a href={`mailto:${profile.email}`} className="contact__email-link">
                <Mail size={18} />
                {profile.email}
              </a>
              <button
                type="button"
                className="icon-btn contact__copy"
                onClick={() => void copy(profile.email)}
                aria-label={copied ? 'Email copiado' : 'Copiar email'}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <ul className="contact__socials">
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={16} /> GitHub <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>

            <span className="badge badge--small">
              <span className="status-dot" />
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={0.1} className="contact__form-wrap">
            {status === 'sent' ? (
              <div className="contact__success" role="status">
                <span className="contact__success-icon">
                  <Check size={22} />
                </span>
                <h3>Listo, {values.name.split(' ')[0] || 'gracias'}.</h3>
                <p>
                  Se abrió tu cliente de correo con el mensaje preparado. Si no ocurrió nada, escríbeme directamente a{' '}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
                <div className="contact__success-actions">
                  <button type="button" className="btn btn--primary" onClick={reset}>
                    Escribir otro mensaje
                  </button>
                  <button type="button" className="btn btn--ghost" onClick={() => void copy(profile.email)}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado' : 'Copiar email'}
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact__form" ref={formRef} onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="contact-name">Nombre</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={update('name')}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name ? (
                    <span className="field__error" id="contact-name-error">
                      {errors.name}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={update('email')}
                    placeholder="ada@empresa.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email ? (
                    <span className="field__error" id="contact-email-error">
                      {errors.email}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Cuéntame</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={update('message')}
                    placeholder="Tengo un producto en React y necesito…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message ? (
                    <span className="field__error" id="contact-message-error">
                      {errors.message}
                    </span>
                  ) : null}
                </div>

                <div className="contact__form-footer">
                  <button type="submit" className="btn btn--primary contact__submit">
                    <Send size={16} />
                    Enviar mensaje
                  </button>
                  <p className="contact__form-note mono">sin spam · respuesta &lt; 24 h</p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
