import { families } from '../data/families'
import { ProductIcon } from '../components/ProductIcon'
import { Button } from '../components/Button'
import { HeatRule } from '../components/HeatRule'
import { Icon } from '../components/Icon'
import { Placeholder } from '../components/Placeholder'

const colors = ['oxblood', 'ember', 'molten', 'copper', 'forge', 'cream', 'cream-2', 'gunmetal', 'steel', 'silver', 'silver-2', 'mist']
const type = [
  ['t-display', 'Display 72/72'],
  ['t-h1', 'H1 64/68'],
  ['t-h2', 'H2 44/48'],
  ['t-h3', 'H3 28/34'],
  ['t-body', 'Body 17/27 IBM Plex Sans'],
  ['t-label', 'Label 12/16'],
  ['t-data', 'Data 15/22 SHS 100 x 100 x 5.0  14.70'],
]

/** Dev-only token sheet (M0 acceptance). */
export default function Tokens() {
  return (
    <div className="wrap space-y-16 py-16">
      <section>
        <h1 className="t-h1">Tokens</h1>
        <div className="mt-8 grid grid-cols-6 gap-4">
          {colors.map((c) => (
            <div key={c} className="border border-silver-2">
              <div className="h-20" style={{ background: `var(--color-${c})` }} />
              <p className="t-data p-2 !text-[13px]">{c}</p>
            </div>
          ))}
        </div>
        <HeatRule className="mt-8" />
        <HeatRule light className="mt-4" />
      </section>
      <section className="space-y-4">
        {type.map(([cls, label]) => (
          <p key={cls} className={cls}>
            {label}
          </p>
        ))}
      </section>
      <section className="flex gap-4">
        <Button>Add to quote</Button>
        <Button variant="secondary">Review quote</Button>
        <div className="on-dark bg-forge p-4">
          <Button variant="dark">WhatsApp us</Button>
        </div>
        <Icon name="group-pipes" />
        <Icon name="step-reply" />
      </section>
      <section className="grid grid-cols-4 gap-6">
        {families.map((f) => (
          <div key={f.id} className="heat-top border border-silver-2 bg-cream-2 p-4">
            <ProductIcon name={f.id} size="l" label />
          </div>
        ))}
      </section>
      <section className="grid grid-cols-3 gap-6">
        <Placeholder slot="founder-band" />
        <Placeholder slot="hero-yard" />
        <Placeholder slot="industry-oilgas" tone="heat" />
      </section>
    </div>
  )
}
