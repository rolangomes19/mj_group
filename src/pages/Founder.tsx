import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { HeatRule } from '../components/HeatRule'
import { Placeholder } from '../components/Placeholder'
import { Section } from '../components/Section'
import { t } from '../copy/en'
import { founder } from '../data/founder'
import { timeline } from '../data/timeline'

export default function Founder() {
  const teaser = timeline.filter((e) => e.type !== 'steel')

  return (
    <>
      {/* 1. Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-forge text-cream">
        <div aria-hidden className="absolute inset-y-0 end-0 w-[52%]">
          <Placeholder slot="founder-portrait" fill tone="heat" position="50% 18%" alt="" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#1a1210_0%,rgb(26_18_16_/_.55)_30%,transparent_70%)]" />
        </div>
        <div aria-hidden className="glow-breathe absolute inset-0" style={{ background: 'radial-gradient(45% 60% at 30% 100%, rgba(240,138,60,.35), rgba(192,40,27,.2) 45%, transparent 75%)' }} />
        <div aria-hidden className="grain absolute inset-0 opacity-[.06]" />
        <div className="wrap relative flex min-h-[720px] flex-col justify-end pb-24 pt-28">
          <p className="hero-in font-mono text-[14px] text-molten">{t.founderBand.label}</p>
          <h1 className="t-display hero-in mt-6 max-w-[11ch] !text-[80px] !leading-[80px] text-cream" style={{ animationDelay: '80ms' }}>
            {founder.name}
          </h1>
          <p className="t-data hero-in mt-6 !text-[22px] text-silver" style={{ animationDelay: '160ms' }}>
            {founder.dates}
          </p>
          <p className="hero-in mt-6 max-w-[44ch] text-[19px] leading-[30px] text-cream/85" style={{ animationDelay: '240ms' }}>
            {founder.heroLine}
          </p>
        </div>
        <HeatRule className="relative" />
      </section>

      {/* 2. Origin */}
      <Section title="From Karachi to the Creek">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-5 space-y-5 text-[19px] leading-[31px]">
            {founder.origin.map((p) => (
              <p key={p} className="measure">{p}</p>
            ))}
          </div>
          <div className="col-span-6 col-start-7">
            <Placeholder slot="founder-archive-1" />
          </div>
        </div>
      </Section>

      {/* 3. Civic firsts */}
      <Section title="A life of civic firsts" className="bg-cream-2">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 grid grid-cols-2 gap-6">
            {founder.civic.map((c) => (
              <article key={c.title} className="heat-top reveal border border-silver-2 bg-cream p-8">
                <p className={`t-data text-copper ${/^\d+$/.test(c.year) ? '!text-[44px] !leading-[48px]' : '!text-[26px] !leading-[48px]'}`}>{c.year}</p>
                <h3 className="t-h3 mt-4">{c.title}</h3>
                <p className="mt-3 text-steel">{c.body}</p>
              </article>
            ))}
          </div>
          <div className="col-span-4 grid gap-6">
            <Placeholder slot="founder-archive-2" />
          </div>
        </div>
      </Section>

      {/* 4. Values */}
      <section className="on-dark relative overflow-hidden bg-oxblood py-32 text-cream">
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(60% 80% at 50% 120%, rgba(240,138,60,.35), transparent 70%)' }} />
        <div className="wrap relative text-center">
          <p className="mx-auto max-w-[16ch] font-display text-[96px] font-semibold leading-[96px] tracking-[-0.02em] [text-wrap:balance]">{founder.values}</p>
          <HeatRule animate className="mx-auto mt-10 w-40" />
          <p className="mt-6 text-[18px] text-cream/80">{founder.valuesNote}</p>
        </div>
      </section>

      {/* 6. Book + 7. Tributes */}
      <Section className="bg-cream-2">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="w-[260px] shadow-[0_30px_60px_-30px_rgb(26_18_16_/_.6)]">
              <Placeholder slot="founder-book" />
            </div>
          </div>
          <div className="col-span-8">
            <p className="font-mono text-[14px] text-steel">His memoir</p>
            <h2 className="t-h2 mt-3 max-w-[20ch]">{founder.book.title}</h2>
            <p className="mt-4 text-steel">
              {founder.book.publisher}, {founder.book.year}
            </p>
            <h3 className="t-h3 mt-16">Remembered by</h3>
            <HeatRule light className="mt-4 w-24" />
            <ul className="mt-6 divide-y divide-silver-2 border-y border-silver-2">
              {founder.tributes.map((tr) => (
                <li key={tr.role} className="grid grid-cols-[1fr_1.3fr] gap-8 py-5">
                  <div>
                    <p className="font-semibold text-gunmetal">{tr.role}</p>
                    <p className="text-[14px] text-steel">{tr.outlet}</p>
                  </div>
                  <p className="text-gunmetal">{tr.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 8. Leadership */}
      <Section title="The group today" intro="The family still runs the business he started.">
        <div className="grid grid-cols-12 gap-8">
          {founder.leaders.map((l, i) => (
            <article key={l.name} className={`col-span-4 ${i === 0 ? 'col-start-3' : ''}`}>
              <Placeholder slot={l.slot} alt={l.name} />
              <h3 className="t-h3 mt-5">{l.name}</h3>
              <p className="text-steel">{l.role}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 9. Timeline teaser */}
      <Section title="Since 1942" className="bg-cream-2" aside={<Link to="/since-1942" className="inline-flex items-center gap-2 font-semibold text-ember underline-offset-4 hover:underline">See the full timeline <ArrowRight size={16} aria-hidden /></Link>}>
        <ol className="relative grid grid-cols-9 gap-4">
          <HeatRule light animate className="absolute inset-x-0 top-[7px]" />
          {teaser.map((e) => (
            <li key={e.year + e.title} className="relative">
              <span className="block h-4 w-4 rotate-45 border-2 border-oxblood bg-cream" aria-hidden />
              <p className="t-data mt-4 !text-[20px] text-oxblood">{e.year}</p>
              <p className="mt-1 text-[14px] leading-5 text-steel">{e.title}</p>
            </li>
          ))}
        </ol>
      </Section>

    </>
  )
}
