import { CheckCircle2, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { Button, ButtonLink } from '../components/Button'
import { SampleChip } from '../components/SampleChip'
import { t } from '../copy/en'
import { contact } from '../data/contact'
import { formatKg, formatWeight } from '../data/weight'
import { useBasket } from '../state/basket'
import { useDemo } from '../state/demo'
import { QuoteHeader } from './Quote'

export function QuoteReceived() {
  const quote = useDemo((s) => s.quote)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  // Cleared here, after Details has unmounted, so its empty-basket redirect can't win a race.
  useEffect(() => useBasket.getState().clear(), [])
  if (!quote) return <Navigate to="/quote" replace />

  return (
    <div className="wrap pb-24">
      <QuoteHeader step={2} title={t.received.title} intro={t.received.line} />
      <div className="grid grid-cols-12 items-start gap-8">
        <div className="col-span-8">
          <div className="on-dark relative overflow-hidden bg-forge p-10 text-cream">
            <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(60% 90% at 100% 100%, rgb(240 138 60 / .35), rgb(192 40 27 / .2) 45%, transparent 75%)' }} />
            <div className="relative flex items-center justify-between gap-8">
              <div>
                <p className="flex items-center gap-2 text-[15px] text-molten">
                  <CheckCircle2 size={18} aria-hidden /> {t.received.ref}
                  <SampleChip sample={quote.sample} />
                </p>
                <p className="t-data mt-3 !text-[48px] !leading-[52px] text-cream">{quote.ref}</p>
              </div>
              <p className="max-w-[26ch] text-end text-[17px] text-cream/85">{contact.replyPromise}</p>
            </div>
            <div className="heat-rule relative mt-10" />
          </div>

          <h2 className="t-h3 mt-12">{t.received.summary}</h2>
          <table className="mt-4 w-full border-collapse">
            <thead>
              <tr className="bg-gunmetal text-cream">
                {['Designation', 'Quantity', 'Grade', 'Weight (kg)'].map((c, i) => (
                  <th key={c} scope="col" className={`px-4 py-3 text-[13px] font-semibold ${i === 3 ? 'text-end' : 'text-start'}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quote.lines.map((l, i) => (
                <tr key={i} className="t-data h-11 border-b border-silver-2 odd:bg-cream-2">
                  <th scope="row" className="px-4 text-start font-normal text-oxblood">{l.designation}</th>
                  <td className="px-4">{l.qty} {l.unit === 'pcs' ? `x ${l.length} m` : t.units[l.unit]}</td>
                  <td className="px-4">{l.grade || t.quote.notSure}</td>
                  <td className="px-4 text-end">{formatKg(l.weightKg)}</td>
                </tr>
              ))}
              {quote.boqName && (
                <tr className="h-11 border-b border-silver-2">
                  <td colSpan={4} className="px-4 text-[15px]">Attached: <span className="t-data text-oxblood">{quote.boqName}</span></td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="h-12">
                <td colSpan={3} className="px-4 text-[15px] text-steel">Total theoretical weight{quote.mtc ? ' · mill test certificate requested' : ''}</td>
                <td className="t-data px-4 text-end !text-[18px] text-oxblood">{formatWeight(quote.totalKg)}</td>
              </tr>
            </tfoot>
          </table>
          {quote.notes && <p className="mt-6 border-s-2 border-copper ps-4 text-[15px] text-gunmetal">{quote.notes}</p>}

          <div className="mt-10 flex gap-3">
            <Button size="lg" onClick={() => openWhatsApp(`Hello, following up on quote ${quote.ref}.`)}>
              <MessageCircle size={18} aria-hidden /> {t.received.whatsapp}
            </Button>
            <ButtonLink to="/catalogue" variant="secondary" size="lg">
              {t.received.browse}
            </ButtonLink>
          </div>
        </div>

        <aside className="col-span-4 space-y-6">
          <div className="border border-silver-2 bg-cream-2 p-7">
            <h2 className="t-h3">Delivery</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
              <dt className="text-steel">To</dt>
              <dd>{quote.emirate}</dd>
              {quote.neededBy && (
                <>
                  <dt className="text-steel">Needed by</dt>
                  <dd>{new Date(quote.neededBy).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
                </>
              )}
              <dt className="text-steel">Contact</dt>
              <dd>
                {quote.contact.name}
                {quote.contact.company && <span className="block text-steel">{quote.contact.company}</span>}
              </dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
