import { FileUp, MessageCircle, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Stepper } from '../components/Blocks'
import { Button, ButtonLink } from '../components/Button'
import { HeatRule } from '../components/HeatRule'
import { GradeSelect, LengthSelect, QtyStepper, UnitSelect } from '../components/LineControls'
import { t } from '../copy/en'
import { contact } from '../data/contact'
import { rowById, rowLabel } from '../data/rows'
import { formatKg, formatWeight, lineWeightKg } from '../data/weight'
import { basketTotalKg, canContinue, useBasket } from '../state/basket'
import { useDemo } from '../state/demo'

export function QuoteHeader({ step, title, intro }: { step: 0 | 1 | 2; title: string; intro: string }) {
  return (
    <div className="flex items-end justify-between gap-12 pb-10 pt-12">
      <div>
        <h1 className="t-h1">{title}</h1>
        <HeatRule light animate className="mt-5 w-24" />
        <p className="measure mt-5 text-steel">{intro}</p>
      </div>
      <Stepper step={step} />
    </div>
  )
}

export function Quote() {
  const b = useBasket()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const fileRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLLabelElement>(null)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  const ok = canContinue(b)

  useEffect(() => {
    if (params.get('focus') === 'boq') {
      dropRef.current?.scrollIntoView({ block: 'center' })
      fileRef.current?.focus()
    }
  }, [params])

  const th = 'px-4 py-3 text-[13px] font-semibold text-cream'
  return (
    <div className="wrap pb-24">
      <QuoteHeader step={0} title={t.quote.title} intro={t.quote.intro} />
      <div className="grid grid-cols-12 items-start gap-8">
        <div className="col-span-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gunmetal">
                <th scope="col" className={`${th} text-start`}>{t.family.cols.designation}</th>
                <th scope="col" className={`${th} text-start`}>Quantity</th>
                <th scope="col" className={`${th} text-start`}>Unit</th>
                <th scope="col" className={`${th} text-start`}>{t.family.length}</th>
                <th scope="col" className={`${th} text-start`}>{t.family.grade}</th>
                <th scope="col" className={`${th} text-end`}>Weight (kg)</th>
                <th scope="col" className={th}><span className="sr-only">{t.quote.remove}</span></th>
              </tr>
              <tr aria-hidden><td colSpan={7} className="heat-rule p-0" /></tr>
            </thead>
            <tbody>
              {b.lines.length === 0 && (
                <tr>
                  <td colSpan={7} className="border-b border-silver-2 px-4 py-10 text-center text-steel">
                    {t.quote.empty}{' '}
                    <ButtonLink to="/catalogue" variant="ghost">{t.drawer.browse}</ButtonLink>
                  </td>
                </tr>
              )}
              {b.lines.map((l) => {
                const row = rowById(l.rowId)
                if (!row) return null
                const label = rowLabel(row)
                return (
                  <tr key={l.id} className="h-14 border-b border-silver-2 odd:bg-cream-2">
                    <th scope="row" className="t-data px-4 text-start font-normal text-oxblood">{label}</th>
                    <td className="px-4"><QtyStepper value={l.qty} onChange={(qty) => b.update(l.id, { qty })} label={`quantity for ${label}`} /></td>
                    <td className="px-4"><UnitSelect line={l} row={row} onChange={(p) => b.update(l.id, p)} /></td>
                    <td className="px-4"><LengthSelect line={l} row={row} onChange={(p) => b.update(l.id, p)} /></td>
                    <td className="px-4"><GradeSelect line={l} row={row} onChange={(p) => b.update(l.id, p)} /></td>
                    <td className="t-data px-4 text-end">{formatKg(lineWeightKg(l, row))}</td>
                    <td className="px-2 text-end">
                      <button type="button" onClick={() => b.remove(l.id)} aria-label={`${t.quote.remove} ${label}`} className="grid h-9 w-9 place-items-center text-steel hover:text-ember">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="mt-10 grid grid-cols-2 gap-8">
            <label
              ref={dropRef}
              className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-steel/60 bg-cream-2 p-8 text-center transition-colors hover:border-ember focus-within:border-ember"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const f = e.dataTransfer.files[0]
                if (f) b.set({ boqName: f.name })
              }}
            >
              <FileUp size={28} className="text-ember" aria-hidden />
              {b.boqName ? (
                <>
                  <span className="t-data text-oxblood">{b.boqName}</span>
                  <span className="text-[14px] text-steel">{t.quote.boqChange}</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-gunmetal">{t.quote.boq}</span>
                  <span className="text-[14px] text-steel">{t.quote.boqHelp}</span>
                </>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.xlsx,.xls,.csv,image/*" className="sr-only" onChange={(e) => b.set({ boqName: e.target.files?.[0]?.name ?? '' })} />
            </label>
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-[14px] font-semibold text-gunmetal">{t.quote.notes}</span>
                <textarea value={b.notes} onChange={(e) => b.set({ notes: e.target.value })} placeholder={t.quote.notesPh} rows={4} className="resize-none rounded-[2px] border border-silver-2 bg-cream-2 px-3 py-2 text-[15px] outline-none placeholder:text-steel focus-visible:border-ember" />
              </label>
              <label className="inline-flex items-center gap-3 text-[15px]">
                <input type="checkbox" checked={b.mtc} onChange={(e) => b.set({ mtc: e.target.checked })} className="h-5 w-5 accent-[#c0281b]" />
                {t.quote.mtc}
              </label>
            </div>
          </div>
          {b.boqName && (
            <button type="button" onClick={() => b.set({ boqName: '' })} className="mt-2 inline-flex items-center gap-1 text-[14px] text-steel hover:text-ember">
              <X size={14} aria-hidden /> Remove file
            </button>
          )}
        </div>

        <aside className="sticky top-[calc(var(--header-h)+24px)] col-span-4 border border-silver-2 bg-cream-2 p-7">
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-steel">{t.rail.total}</span>
            <span className="t-data !text-[24px] text-oxblood">{formatWeight(basketTotalKg(b.lines))}</span>
          </div>
          <p className="mt-1 text-[13px] text-steel">{b.lines.length} lines · theoretical</p>
          <Button size="lg" className="mt-6 w-full" disabled={!ok} onClick={() => nav('/quote/details')}>
            {t.quote.continue}
          </Button>
          {!ok && <p className="mt-3 text-[14px] leading-5 text-steel">{t.quote.continueHelp}</p>}
          <p className="mt-5 border-t border-silver-2 pt-5 text-[14px] leading-5 text-steel">{contact.replyPromise}</p>
          <button type="button" onClick={() => openWhatsApp('Hello, I need one length today. Can you help?')} className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ember hover:underline underline-offset-4">
            <MessageCircle size={16} aria-hidden /> {t.rail.small}
          </button>
        </aside>
      </div>
    </div>
  )
}
