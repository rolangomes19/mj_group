import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { t } from '../copy/en'
import { familiesInGroup } from '../data/families'
import { sizeCount } from '../data/rows'
import { approvals, certificates, gradeTable } from '../data/standards'
import type { Group } from '../data/types'
import { useDemo } from '../state/demo'
import { Button, ButtonLink } from './Button'
import { HeatRule } from './HeatRule'
import { Icon } from './Icon'
import { Placeholder } from './Placeholder'
import { SampleChip } from './SampleChip'

export function GroupTile({ group }: { group: Group }) {
  const n = sizeCount(familiesInGroup(group.id).map((f) => f.id))
  return (
    <Link
      to={`/catalogue/${group.id}`}
      className="heat-top group flex flex-col border border-silver-2 bg-cream-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgb(26_18_16_/_.55)]"
    >
      <Placeholder slot={group.photo} tone="heat" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[24px] leading-7 text-oxblood">{group.name}</h3>
          <Icon name={group.icon} size={32} className="text-steel" />
        </div>
        <p className="mt-2 flex-1 text-[15px] leading-6 text-steel">{group.use}</p>
        <p className="mt-5 flex items-center justify-between border-t border-silver-2 pt-3 text-[14px]">
          <span className="t-data !text-[14px] text-gunmetal">{n} sizes</span>
          <ArrowRight size={16} className="text-ember transition-transform group-hover:translate-x-1" aria-hidden />
        </p>
      </div>
    </Link>
  )
}

export function Stepper({ step }: { step: 0 | 1 | 2 }) {
  return (
    <ol className="flex items-center gap-3" aria-label="Quote progress">
      {t.stepper.map((label, i) => (
        <li key={label} className="flex items-center gap-3" aria-current={i === step ? 'step' : undefined}>
          <span
            className={`t-data grid h-8 w-8 place-items-center rounded-full border !text-[13px] ${
              i < step ? 'border-oxblood bg-oxblood text-cream' : i === step ? 'border-ember bg-ember text-cream' : 'border-silver-2 text-steel'
            }`}
          >
            {i < step ? <Check size={14} aria-hidden /> : i + 1}
          </span>
          <span className={`text-[15px] ${i === step ? 'font-semibold text-gunmetal' : 'text-steel'}`}>{label}</span>
          {i < 2 && <span aria-hidden className={`h-[2px] w-16 ${i < step ? 'bg-[image:var(--heat-light)]' : 'bg-silver-2'}`} />}
        </li>
      ))}
    </ol>
  )
}

export function CtaBand() {
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  return (
    <section className="on-dark relative overflow-hidden bg-forge text-cream">
      <div aria-hidden className="absolute inset-0 opacity-35">
        <Placeholder slot="cta-yard" fill tone="heat" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(50% 80% at 85% 100%, rgb(240 138 60 / .35), rgb(192 40 27 / .2) 45%, transparent 75%), linear-gradient(90deg, #1a1210 30%, rgb(26 18 16 / .6))' }}
      />
      <HeatRule className="relative" />
      <div className="wrap relative flex items-end justify-between gap-12 py-28">
        <div>
          <h2 className="t-display text-cream">{t.cta.title}</h2>
          <p className="mt-5 text-[19px] text-silver">{t.cta.line}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <ButtonLink to="/quote" size="lg">
            {t.cta.start}
          </ButtonLink>
          <Button variant="dark" size="lg" onClick={() => openWhatsApp(t.wa.default)}>
            {t.cta.whatsapp}
          </Button>
          <ButtonLink to="/quote?focus=boq" variant="dark" size="lg">
            {t.cta.boq}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export function GradesTable() {
  return (
    <table className="w-full border-collapse text-start">
      <thead>
        <tr className="bg-gunmetal text-cream">
          {t.grades.cols.map((c, i) => (
            <th key={c} scope="col" className={`relative px-6 py-3.5 text-[13px] font-semibold tracking-wide ${i === 3 ? 'text-end' : 'text-start'}`}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr aria-hidden>
          <td colSpan={4} className="heat-rule p-0" />
        </tr>
        {gradeTable.map((g) => (
          <tr key={g.en} className="t-data h-12 border-b border-silver-2 odd:bg-cream-2 hover:bg-oxblood/[.06]">
            <th scope="row" className="px-6 text-start font-normal text-oxblood">{g.en}</th>
            <td className="px-6">{g.astm}</td>
            <td className="px-6">{g.jis}</td>
            <td className="px-6 text-end">{g.yield}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function CertBand() {
  return (
    <div className="grid grid-cols-12 gap-8">
      {certificates.map((c) => (
        <article key={c.title} className="heat-top col-span-4 flex flex-col border border-silver-2 bg-cream-2 p-8">
          <h3 className="t-h3">
            {c.title}
            <SampleChip sample={c.sample} />
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-6 text-steel">{c.body}</p>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-silver-2 pt-4 text-[14px]">
            <dt className="text-steel">{t.certs.issuer}</dt>
            <dd className="text-gunmetal">{c.issuer}</dd>
            <dt className="text-steel">{t.certs.number}</dt>
            <dd className="t-data !text-[14px] text-gunmetal">{c.number}</dd>
            <dt className="text-steel">{t.certs.valid}</dt>
            <dd className="t-data !text-[14px] text-gunmetal">{c.validTo}</dd>
          </dl>
        </article>
      ))}
      <div className="col-span-12 mt-4 overflow-hidden border-y border-silver-2 py-6">
        <div className="flex items-center gap-10">
          <p className="shrink-0 font-display text-[24px] text-oxblood">
            <span className="t-data !text-[22px] text-ember">{approvals.total}</span> project approvals
          </p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee-track flex w-max gap-10 [animation:marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
              {[...approvals.projects, ...approvals.projects].map((p, i) => (
                <li key={i} aria-hidden={i >= approvals.projects.length} className="flex items-center gap-3 whitespace-nowrap text-[15px] text-gunmetal">
                  <span className="h-1.5 w-1.5 rotate-45 bg-copper" aria-hidden />
                  {p}
                  <span className="text-steel">approved supplier</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-steel">
          {approvals.line}. {approvals.split.map((s) => `${s.place} ${s.n}`).join(', ')}.
        </p>
      </div>
    </div>
  )
}
