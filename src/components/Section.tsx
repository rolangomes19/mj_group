import type { ReactNode } from 'react'
import { HeatRule } from './HeatRule'

type Props = {
  id?: string
  title?: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  dark?: boolean
  className?: string
  children: ReactNode
}

/** Page section: 96px rhythm, H2 with a heat rule under it. */
export function Section({ id, title, intro, aside, dark, className = '', children }: Props) {
  return (
    <section id={id} className={`py-24 ${dark ? 'on-dark bg-forge text-cream' : ''} ${className}`}>
      <div className="wrap">
        {title && (
          <header className="reveal mb-12 flex items-end justify-between gap-12">
            <div>
              <h2 className={`t-h2 ${dark ? 'text-cream' : ''}`}>{title}</h2>
              <HeatRule animate light={!dark} className="mt-5 w-24" />
              {intro && <p className={`measure mt-5 ${dark ? 'text-silver' : 'text-steel'}`}>{intro}</p>}
            </div>
            {aside}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
