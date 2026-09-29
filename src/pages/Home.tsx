import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CertBand, CtaBand, GradesTable, GroupTile } from '../components/Blocks'
import { ButtonLink } from '../components/Button'
import { CountUp } from '../components/CountUp'
import { HeatRule } from '../components/HeatRule'
import { Icon } from '../components/Icon'
import { Placeholder } from '../components/Placeholder'
import { SearchBox, rowHref } from '../components/SearchBox'
import { Section } from '../components/Section'
import { t } from '../copy/en'
import { groups } from '../data/groups'
import { industries } from '../data/industries'
import { rowById, rowLabel, rows } from '../data/rows'
import { searchRows } from '../data/search'
import { formatKg, lineWeightKg } from '../data/weight'

const heroGlow = {
  background: 'radial-gradient(60% 50% at 50% 100%, rgba(240,138,60,.55), rgba(192,40,27,.35) 40%, transparent 70%)',
}
const brushed = { backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 3px)' }

// Three real rows for the quote slip in the hero.
const slip = [
  { id: 'shs-100-x-100-5_0', qty: 24, length: 6 },
  { id: 'pipe-en10255-50-nb-3_6', qty: 60, length: 6 },
  { id: 'ipe-200', qty: 12, length: 12 },
].map((s) => {
  const row = rowById(s.id)!
  return { ...s, row, kg: lineWeightKg({ qty: s.qty, unit: 'pcs', length: s.length }, row) }
})

function Hero() {
  const stats = t.proof.map((p) => (p.value === 'SIZES' ? { ...p, value: String(rows.length) } : p))
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forge text-cream">
      <div aria-hidden className="absolute inset-y-0 end-0 w-[58%]">
        <Placeholder slot="hero-yard" fill tone="heat" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#1a1210_0%,rgb(26_18_16_/_.85)_22%,rgb(26_18_16_/_.2)_60%,rgb(26_18_16_/_.35)_100%)]" />
      </div>
      <div aria-hidden className="glow-breathe absolute inset-0" style={heroGlow} />
      <div aria-hidden className="absolute inset-0" style={brushed} />
      <div aria-hidden className="grain absolute inset-0 opacity-[.06]" />

      <div className="wrap relative grid min-h-[760px] grid-cols-12 gap-x-8 pb-0 pt-24">
        <div className="col-span-7 flex flex-col">
          <p className="hero-in font-mono text-[14px] tracking-wide text-molten" style={{ animationDelay: '0ms' }}>
            {t.hero.eyebrow}
          </p>
          <h1 className="t-display hero-in mt-6 max-w-[15ch] text-cream" style={{ animationDelay: '80ms' }}>
            {t.hero.title}
          </h1>
          <p className="hero-in mt-7 max-w-[52ch] text-[19px] leading-[30px] text-silver" style={{ animationDelay: '160ms' }}>
            {t.hero.line}
          </p>
          <div className="hero-in relative z-20 mt-10 max-w-[600px]" style={{ animationDelay: '240ms' }}>
            <SearchBox size="lg" dark />
          </div>
          <div className="hero-in mt-6 flex gap-3" style={{ animationDelay: '300ms' }}>
            <ButtonLink to="/catalogue" size="lg">
              {t.hero.browse}
            </ButtonLink>
            <ButtonLink to="/quote" variant="dark" size="lg">
              {t.hero.start}
            </ButtonLink>
          </div>
        </div>

        <div className="col-span-5 flex items-center justify-end">
          <QuoteSlip />
        </div>

        <dl className="col-span-12 mt-20 grid grid-cols-5 border-t border-cream/15">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col py-7 ${i ? 'border-s border-cream/15 ps-8' : ''}`}>
              <dt className="order-2 mt-1 text-[14px] text-silver">{s.label}</dt>
              <dd className="t-data order-1 !text-[40px] !leading-[44px] text-cream">
                {s.count ? <CountUp to={Number(s.value)} /> : s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <HeatRule className="relative" />
    </section>
  )
}

/** The product in one glance: three rows becoming a quote. */
function QuoteSlip() {
  const total = slip.reduce((s, l) => s + l.kg, 0)
  return (
    <div className="hero-in relative w-[400px] -rotate-[1.5deg] border border-cream/15 bg-cream text-gunmetal shadow-[0_40px_80px_-30px_rgb(0_0_0_/_.8)]" style={{ animationDelay: '420ms' }}>
      <div className="heat-rule-light" />
      <div className="flex items-baseline justify-between px-6 pb-3 pt-5">
        <span className="font-display text-[22px] font-medium text-oxblood">Your quote</span>
        <span className="t-data !text-[13px] text-steel">3 lines</span>
      </div>
      <ul className="border-t border-silver-2">
        {slip.map((l) => (
          <li key={l.id} className="flex items-baseline justify-between gap-3 border-b border-silver-2 px-6 py-3 shadow-[inset_3px_0_0_var(--color-ember)]">
            <Link to={rowHref(l.row)} className="t-data text-oxblood hover:underline">
              {rowLabel(l.row)}
            </Link>
            <span className="t-data !text-[13px] text-steel">
              {l.qty} x {l.length} m
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between px-6 py-4">
        <span className="text-[13px] text-steel">Theoretical weight</span>
        <span className="t-data !text-[18px] text-oxblood">{formatKg(total)} kg</span>
      </div>
      <div className="bg-cream-2 px-6 py-3 text-[13px] text-steel">Priced and back to you in 2 hours.</div>
    </div>
  )
}

function ShapeSelector() {
  const [tab, setTab] = useState<'know' | 'browse'>('browse')
  const nav = useNavigate()
  const tabs = [
    ['browse', t.shape.browse],
    ['know', t.shape.know],
  ] as const
  return (
    <Section
      title={t.shape.title}
      aside={
        <div role="tablist" aria-label={t.shape.title} className="flex border border-silver-2 bg-cream-2 p-1">
          {tabs.map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              aria-controls={`panel-${k}`}
              onClick={() => setTab(k)}
              className={`h-10 px-5 text-[15px] font-semibold transition-colors ${tab === k ? 'bg-oxblood text-cream' : 'text-steel hover:text-oxblood'}`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {tab === 'browse' ? (
        <div id="panel-browse" role="tabpanel" className="grid grid-cols-4 gap-6">
          {groups.map((g) => (
            <GroupTile key={g.id} group={g} />
          ))}
        </div>
      ) : (
        <div id="panel-know" role="tabpanel" className="grid grid-cols-12 gap-8 border border-silver-2 bg-cream-2 p-12">
          <div className="col-span-8">
            <SearchBox size="lg" autoFocus />
            <p className="mt-4 text-steel">{t.shape.knowHelp}</p>
          </div>
          <div className="col-span-4">
            <p className="text-[14px] text-steel">{t.shape.try}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {['SHS 100x100', '50 NB', 'IPE 200', 'HE 300 A', 'Plate 12 mm'].map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => {
                      const hit = searchRows(q)[0]
                      if (hit) nav(rowHref(hit.row))
                    }}
                    className="t-data h-9 border border-silver-2 bg-cream px-3 !text-[14px] text-oxblood hover:border-ember"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  )
}

function FounderBand() {
  return (
    <section className="on-dark relative overflow-hidden text-cream" style={{ background: 'linear-gradient(100deg, #7a0000 0%, #3a0a06 45%, #1a1210 100%)' }}>
      <div className="wrap grid grid-cols-12 items-center gap-8">
        <div className="col-span-4 -my-px">
          <Placeholder slot="founder-band" tone="heat" alt="Maghanmal Jethanand Pancholia" position="50% 20%" />
        </div>
        <div className="col-span-7 col-start-6 py-24">
          <p className="font-mono text-[14px] text-molten">{t.founderBand.label}</p>
          <blockquote className="mt-6 font-display text-[64px] font-semibold leading-[68px] tracking-[-0.015em] text-cream">{t.founderBand.line}</blockquote>
          <p className="mt-6 max-w-[48ch] text-[18px] text-cream/80">{t.founderBand.note}</p>
          <Link to="/founder" className="mt-10 inline-flex items-center gap-2 border-b border-molten pb-1 text-[17px] font-semibold text-molten hover:gap-3 transition-[gap]">
            {t.founderBand.link} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <Section title={t.steps.title}>
      <ol className="relative grid grid-cols-4 gap-8">
        <HeatRule animate light className="absolute inset-x-0 top-[23px]" />
        {t.steps.items.map((s, i) => (
          <li key={s.title} className="reveal relative">
            <span className="t-data relative grid h-12 w-12 place-items-center border border-silver-2 bg-cream !text-[16px] text-oxblood">{i + 1}</span>
            <div className="mt-8 flex items-center gap-3">
              <Icon name={s.icon} size={32} className="text-steel" />
              <h3 className="t-h3">{s.title}</h3>
            </div>
            <p className="mt-3 max-w-[30ch] text-steel">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Industries() {
  return (
    <Section id="industries" title={t.industries.title} intro={t.industries.intro} className="bg-cream-2">
      <ul className="grid grid-cols-3 gap-6">
        {industries.map((ind) => (
          <li key={ind.id} className="heat-top group border border-silver-2 bg-cream transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgb(26_18_16_/_.55)]">
            <Link to={`/catalogue?industry=${ind.id}`} className="block h-full">
              {ind.photo && <Placeholder slot={ind.photo} tone="heat" />}
              <div className="flex items-start gap-4 p-6">
                <Icon name={ind.icon} size={32} className="mt-1 text-steel" />
                <div>
                  <h3 className="font-display text-[22px] font-medium leading-7 text-oxblood">{ind.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-6 text-steel">{ind.line}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <ShapeSelector />
      <Section title={t.grades.title} intro={t.grades.intro} className="bg-cream-2" aside={<Link to="/standards" className="inline-flex items-center gap-2 font-semibold text-ember hover:underline underline-offset-4">{t.grades.link} <ArrowRight size={16} aria-hidden /></Link>}>
        <div className="reveal border border-silver-2 bg-cream">
          <GradesTable />
        </div>
      </Section>
      <Section title={t.certs.title} intro={t.certs.intro}>
        <CertBand />
      </Section>
      <FounderBand />
      <Steps />
      <Industries />
      <CtaBand />
    </>
  )
}
