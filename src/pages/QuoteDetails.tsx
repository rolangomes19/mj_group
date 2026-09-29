import { LoaderCircle } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button, ButtonLink } from '../components/Button'
import { t } from '../copy/en'
import { emirates } from '../data/contact'
import { rowById, rowLabel } from '../data/rows'
import { formatWeight, lineWeightKg } from '../data/weight'
import { basketTotalKg, canContinue, useBasket } from '../state/basket'
import { newRef, useDemo } from '../state/demo'
import { QuoteHeader } from './Quote'

const input = 'h-11 w-full rounded-[2px] border bg-cream-2 px-3 text-[16px] outline-none placeholder:text-steel focus-visible:border-ember'
const today = new Date().toISOString().slice(0, 10)

function Field({ label, error, help, required, children }: { label: string; error?: string; help?: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[14px] font-semibold text-gunmetal">
        {label}
        {required && <span className="ms-2 text-[12px] font-normal text-steel">{t.details.required}</span>}
      </span>
      {children}
      {error ? <span className="text-[14px] text-ember" role="alert">{error}</span> : help ? <span className="text-[13px] text-steel">{help}</span> : null}
    </label>
  )
}

export function QuoteDetails() {
  const b = useBasket()
  const setQuote = useDemo((s) => s.setQuote)
  const nav = useNavigate()
  const [f, setF] = useState({ emirate: '', neededBy: '', name: '', company: '', mobile: '', email: '', trn: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)

  if (!canContinue(b) && !sending) return <Navigate to="/quote" replace />

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!f.emirate) err.emirate = t.details.errors.emirate
    if (!f.name.trim()) err.name = t.details.errors.name
    if (!f.mobile.trim() && !f.email.trim()) err.mobile = t.details.errors.contact
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) err.email = t.details.errors.email
    if (f.trn && !/^\d{15}$/.test(f.trn.replace(/\s/g, ''))) err.trn = t.details.errors.trn
    setErrors(err)
    if (Object.keys(err).length) {
      document.querySelector<HTMLElement>(`[name="${Object.keys(err)[0]}"]`)?.focus()
      return
    }
    setSending(true)
    const lines = b.lines.flatMap((l) => {
      const row = rowById(l.rowId)
      return row ? [{ designation: rowLabel(row), qty: l.qty, unit: l.unit, length: l.length, grade: l.grade, weightKg: lineWeightKg(l, row) }] : []
    })
    setTimeout(() => {
      setQuote({
        ref: newRef(),
        createdAt: new Date().toISOString(),
        lines,
        totalKg: basketTotalKg(b.lines),
        emirate: f.emirate,
        neededBy: f.neededBy || undefined,
        contact: { name: f.name, company: f.company, mobile: f.mobile, email: f.email, trn: f.trn || undefined },
        notes: b.notes,
        mtc: b.mtc,
        boqName: b.boqName || undefined,
        sample: true,
      })
      b.clear()
      nav('/quote/received')
    }, 1200)
  }

  const border = (k: string) => (errors[k] ? 'border-ember' : 'border-silver-2')

  return (
    <div className="wrap pb-24">
      <QuoteHeader step={1} title={t.details.title} intro={t.details.intro} />
      <form noValidate onSubmit={submit} className="grid grid-cols-12 items-start gap-8">
        <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-7 border border-silver-2 bg-cream-2 p-10">
          <Field label={t.details.emirate} required error={errors.emirate}>
            <select name="emirate" value={f.emirate} onChange={set('emirate')} className={`${input} ${border('emirate')}`} aria-invalid={!!errors.emirate}>
              <option value="">Choose</option>
              {emirates.map((e) => (
                <option key={e}>{e}</option>
              ))}
              <option value="Pick up">{t.details.pickup}</option>
            </select>
          </Field>
          <Field label={t.details.neededBy}>
            <input name="neededBy" type="date" min={today} value={f.neededBy} onChange={set('neededBy')} className={`${input} border-silver-2`} />
          </Field>
          <Field label={t.details.name} required error={errors.name}>
            <input name="name" autoComplete="name" value={f.name} onChange={set('name')} className={`${input} ${border('name')}`} aria-invalid={!!errors.name} />
          </Field>
          <Field label={t.details.company}>
            <input name="company" autoComplete="organization" value={f.company} onChange={set('company')} className={`${input} border-silver-2`} />
          </Field>
          <Field label={t.details.mobile} error={errors.mobile} help={t.details.contactHelp}>
            <input name="mobile" type="tel" autoComplete="tel" placeholder="+971 5X XXX XXXX" value={f.mobile} onChange={set('mobile')} className={`${input} ${border('mobile')}`} aria-invalid={!!errors.mobile} />
          </Field>
          <Field label={t.details.email} error={errors.email}>
            <input name="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} className={`${input} ${border('email')}`} aria-invalid={!!errors.email} />
          </Field>
          <Field label={t.details.trn} error={errors.trn} help={t.details.trnHelp}>
            <input name="trn" inputMode="numeric" value={f.trn} onChange={set('trn')} className={`${input} t-data ${border('trn')}`} aria-invalid={!!errors.trn} />
          </Field>
        </div>

        <aside className="sticky top-[calc(var(--header-h)+24px)] col-span-4 border border-silver-2 bg-cream-2 p-7">
          <h2 className="t-h3">{t.rail.title}</h2>
          <ul className="mt-4 border-t border-silver-2">
            {b.lines.map((l) => {
              const row = rowById(l.rowId)
              return row ? (
                <li key={l.id} className="flex justify-between gap-3 border-b border-silver-2 py-2.5">
                  <span className="t-data !text-[14px] text-oxblood">{rowLabel(row)}</span>
                  <span className="t-data !text-[13px] text-steel">{l.qty} {l.unit === 'pcs' ? `x ${l.length} m` : t.units[l.unit]}</span>
                </li>
              ) : null
            })}
            {b.boqName && <li className="border-b border-silver-2 py-2.5 text-[14px] text-gunmetal">File: {b.boqName}</li>}
          </ul>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-[14px] text-steel">{t.rail.total}</span>
            <span className="t-data !text-[22px] text-oxblood">{formatWeight(basketTotalKg(b.lines))}</span>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={sending}>
            {sending ? (
              <>
                <LoaderCircle size={18} className="animate-spin" aria-hidden /> {t.details.sending}
              </>
            ) : (
              t.details.send
            )}
          </Button>
          <ButtonLink to="/quote" variant="ghost" className="mt-4 w-full">
            {t.details.back}
          </ButtonLink>
        </aside>
      </form>
    </div>
  )
}
