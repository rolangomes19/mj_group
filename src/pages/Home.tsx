import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CertBand, CtaBand, GroupTile } from '../components/Blocks'
import { ButtonLink } from '../components/Button'
import { CountUp } from '../components/CountUp'
import { HeatRule } from '../components/HeatRule'
import { Icon } from '../components/Icon'
import { Placeholder } from '../components/Placeholder'
import { ProductIcon } from '../components/ProductIcon'
import { SectionDrawing } from '../components/SectionDrawing'
import { SearchBox, rowHref } from '../components/SearchBox'
import { Section } from '../components/Section'
import { t } from '../copy/en'
import { groups } from '../data/groups'
import { industries } from '../data/industries'
import { rows } from '../data/rows'
import { searchRows } from '../data/search'

const heroGlow = {
  background: 'radial-gradient(60% 50% at 50% 100%, rgba(240,138,60,.55), rgba(192,40,27,.35) 40%, transparent 70%)',
}
const brushed = { backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 3px)' }

function Hero() {
  const stats = t.proof.map((p) => (p.value === 'SIZES' ? { ...p, value: String(rows.length) } : p))
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forge text-cream">
      <div aria-hidden className="absolute inset-0" style={heroGlow} />
      <div aria-hidden className="pointer-events-none absolute bottom-[90px] end-[-8%] w-[62%]">
        <ProductIcon name="ipe" size="xl" className="pi-dark pi-lit !w-full" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,#1a1210_18%,rgb(26_18_16_/_.55)_48%,transparent_75%)]" />
      <div aria-hidden className="absolute inset-0" style={brushed} />
      <div aria-hidden className="grain absolute inset-0 opacity-[.06]" />

      <div className="wrap relative grid min-h-[760px] grid-cols-12 gap-x-8 pb-0 pt-24">
        <div className="col-span-7 flex flex-col">
          <p className="hero-in font-mono text-[14px] tracking-wide text-molten" style={{ animationDelay: '0ms' }}>
            {t.hero.eyebrow}
          </p>
          <h1 className="t-display hero-in mt-6 max-w-[18ch] text-cream" style={{ animationDelay: '80ms' }}>
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

        <dl className="col-span-12 mt-20 grid grid-cols-5 border-t border-cream/15">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col py-7 ${i ? 'border-s border-cream/15 ps-8' : ''}`}>
              <dt className="order-2 mt-1 text-[14px] text-silver">{s.label}</dt>
              <dd className={`t-data order-1 text-cream ${i === 0 ? '!text-[56px] !leading-[58px] text-molten' : '!text-[40px] !leading-[44px]'}`}>
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
          <blockquote className="mt-6 font-display text-[60px] leading-[66px] text-cream">{t.founderBand.line}</blockquote>
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
                  <h3 className="font-display text-[24px] leading-7 text-oxblood">{ind.name}</h3>
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
      <Section title={t.drawn.title} intro={t.drawn.intro} className="bg-cream-2">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-7">
            <SectionDrawing />
          </div>
          <dl className="col-span-4 col-start-9 border-t-2 border-oxblood">
            {t.drawn.rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-silver-2 py-3">
                <dt className="text-[14px] text-steel">{k}</dt>
                <dd className="t-data !text-[14px] text-gunmetal">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      <Steps />
      <Section title={t.certs.title} intro={t.certs.intro}>
        <CertBand />
      </Section>
      <FounderBand />
      <Industries />
      <CtaBand />
    </>
  )
}
