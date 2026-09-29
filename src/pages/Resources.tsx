import { ButtonLink } from '../components/Button'
import { HeatRule } from '../components/HeatRule'

function Stub({ title, body, cta }: { title: string; body: string; cta: { to: string; label: string } }) {
  return (
    <section className="wrap py-32">
      <h1 className="t-h1">{title}</h1>
      <HeatRule light animate className="mt-5 w-24" />
      <p className="measure mt-6 text-[19px] text-steel">{body}</p>
      <ButtonLink to={cta.to} size="lg" className="mt-10">
        {cta.label}
      </ButtonLink>
    </section>
  )
}

export function Resources() {
  return (
    <Stub
      title="Resources"
      body="Weight tables, data sheets and guides to choosing a grade are on their way. Until then, every product page has the full size table and specification."
      cta={{ to: '/catalogue', label: 'Browse products' }}
    />
  )
}

export function NotFound() {
  return <Stub title="This page has moved" body="The link may be old. Start from the product groups or search for a size in the header." cta={{ to: '/catalogue', label: 'Browse products' }} />
}
