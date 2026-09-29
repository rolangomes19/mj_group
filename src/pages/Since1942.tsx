import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { CtaBand } from '../components/Blocks'
import { HeatRule } from '../components/HeatRule'
import { Placeholder } from '../components/Placeholder'
import { SampleChip } from '../components/SampleChip'
import { timeline } from '../data/timeline'
import type { TimelineEntry } from '../data/types'

const filters = [
  ['all', 'All'],
  ['founder', 'Founder'],
  ['group', 'Group'],
  ['steel', 'Steel'],
] as const

const decade = (y: number) => Math.floor(y / 10) * 10

export default function Since1942() {
  const [type, setType] = useState<(typeof filters)[number][0]>('all')
  const list = timeline.filter((e) => type === 'all' || e.type === type)
  const decades = [...new Set(list.map((e) => decade(e.year)))]

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-forge pb-20 pt-24 text-cream">
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(50% 70% at 20% 110%, rgba(240,138,60,.4), rgba(192,40,27,.2) 45%, transparent 75%)' }} />
        <div className="wrap relative">
          <p className="hero-in font-mono text-[14px] text-molten">Maghanmal Jethanand Group</p>
          <h1 className="t-display hero-in mt-6 text-cream" style={{ animationDelay: '80ms' }}>Since 1942</h1>
          <p className="hero-in mt-6 max-w-[52ch] text-[19px] leading-[30px] text-silver" style={{ animationDelay: '160ms' }}>
            From pearls and textiles in 1942 to steel for the UAE's skyline. The dates that shaped the group, and the man who started it.
          </p>
          <div className="hero-in mt-10 flex gap-2" style={{ animationDelay: '240ms' }} role="group" aria-label="Filter timeline">
            {filters.map(([k, label]) => (
              <button
                key={k}
                type="button"
                aria-pressed={type === k}
                onClick={() => setType(k)}
                className={`h-9 rounded-[2px] border px-4 text-[14px] transition-colors ${type === k ? 'border-molten bg-molten text-forge' : 'border-cream/25 text-cream hover:border-molten'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <HeatRule />

      <section className="py-24">
        <div className="wrap grid grid-cols-12 gap-8">
          <nav aria-label="Decades" className="col-span-2">
            <ul className="sticky top-[calc(var(--header-h)+32px)] space-y-1 border-s border-silver-2">
              {decades.map((d) => (
                <li key={d}>
                  <a href={`#d${d}`} className="t-data block py-1 ps-4 text-steel hover:text-oxblood">
                    {d}s
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ol className="relative col-span-10">
            {/* Spine: silver track, heat fill driven by page scroll. */}
            <div aria-hidden className="absolute bottom-0 start-1/2 top-0 w-[3px] -translate-x-1/2 bg-silver-2" />
            <div aria-hidden className="spine-fill absolute bottom-0 start-1/2 top-0 w-[3px] -translate-x-1/2" style={{ background: 'linear-gradient(180deg, #f08a3c, #c0281b 30%, #b87333 60%, #5b6168)' }} />
            {list.map((e, i) => (
              <Entry key={e.year + e.title} e={e} left={i % 2 === 0} anchor={i === 0 || decade(list[i - 1].year) !== decade(e.year) ? `d${decade(e.year)}` : undefined} />
            ))}
          </ol>
        </div>
      </section>
      <div className="wrap pb-16 text-center">
        <Link to="/founder" className="inline-flex items-center gap-2 font-semibold text-ember underline-offset-4 hover:underline">
          Read the founder's story <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
      <CtaBand />
    </>
  )
}

function Entry({ e, left, anchor }: { e: TimelineEntry; left: boolean; anchor?: string }) {
  const badge = { founder: 'Founder', group: 'Group', steel: 'Steel' }[e.type]
  return (
    <li id={anchor} className="relative grid grid-cols-2 gap-16 pb-16 [&:not(:first-of-type)]:-mt-32 scroll-mt-[calc(var(--header-h)+32px)]">
      <span aria-hidden className="absolute start-1/2 top-3 h-4 w-4 -translate-x-1/2 rotate-45 border-2 border-oxblood bg-cream" />
      <article className={`reveal heat-top border border-silver-2 bg-cream-2 ${left ? 'col-start-1' : 'col-start-2'}`}>
        {e.slot && <Placeholder slot={e.slot} />}
        <div className="p-7">
          <div className="flex items-baseline justify-between gap-4">
            <p className="t-data !text-[40px] !leading-[44px] text-oxblood">{e.year}</p>
            <span className="inline-flex h-7 items-center border border-silver-2 px-2.5 text-[13px] text-steel">{badge}</span>
          </div>
          <h2 className="t-h3 mt-3">
            {e.title}
            <SampleChip sample={e.sample} />
          </h2>
          <p className="mt-2 text-steel">{e.body}</p>
          {e.link && (
            <Link to={e.link.to} className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ember underline-offset-4 hover:underline">
              {e.link.label} <ArrowRight size={15} aria-hidden />
            </Link>
          )}
        </div>
      </article>
    </li>
  )
}
