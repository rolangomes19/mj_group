import { Check, FileText, MessageCircle, Plus, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router'
import { CtaBand } from '../components/Blocks'
import { Breadcrumb, Chip } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { HeatRule } from '../components/HeatRule'
import { QtyStepper, selectCls } from '../components/LineControls'
import { Placeholder } from '../components/Placeholder'
import { ProductIcon } from '../components/ProductIcon'
import { t } from '../copy/en'
import { contact } from '../data/contact'
import { familyById } from '../data/families'
import { groupById } from '../data/groups'
import { rowById, rowLabel, rowsInFamily } from '../data/rows'
import { norm } from '../data/search'
import { specFor } from '../data/specs'
import type { Family as FamilyT, Row } from '../data/types'
import { formatKg, formatWeight, lineWeightKg, pieceKg } from '../data/weight'
import { basketTotalKg, useBasket } from '../state/basket'
import { useDemo } from '../state/demo'

const th = 'sticky top-[var(--header-h)] z-10 bg-gunmetal px-3 py-2.5 leading-4 text-[13px] font-semibold tracking-wide text-cream'

export function Family() {
  const { group: groupId, family: familyId } = useParams()
  const family = familyById(familyId ?? '')
  const group = groupById(groupId ?? '')
  if (!family || !group || family.groupId !== group.id) return <Navigate to="/catalogue" replace />
  return <FamilyView key={family.id} family={family} groupName={group.name} />
}

function FamilyView({ family, groupName }: { family: FamilyT; groupName: string }) {
  const [params] = useSearchParams()
  const target = params.get('row')
  const rows = useMemo(() => rowsInFamily(family.id), [family.id])
  const spec = specFor(family.id)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)

  const [tab, setTab] = useState(0)
  const [size, setSize] = useState('')
  const [thick, setThick] = useState<number | null>(null)
  const [grade, setGrade] = useState('')
  const [length, setLength] = useState(rows[0]?.lengths[0] ?? 6)

  const thicknesses = [...new Set(rows.map((r) => r.thickness).filter((x): x is number => x !== undefined))].sort((a, b) => a - b)
  const lengths = [...new Set(rows.flatMap((r) => r.lengths))]
  const shown = rows.filter((r) => (!size || norm(rowLabel(r)).includes(norm(size))) && (thick === null || r.thickness === thick))

  const basis = family.massBasis ?? 'm'
  const hasThick = thicknesses.length > 0 && family.id !== 'binding-wire'
  const isPipe = family.id.startsWith('pipe')

  useEffect(() => {
    if (!target) return
    const id = setTimeout(() => document.getElementById(`row-${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
    return () => clearTimeout(id)
  }, [target])

  return (
    <>
      <section className="pb-10 pt-12">
        <div className="wrap">
          <Breadcrumb items={[{ to: '/', label: 'Home' }, { to: '/catalogue', label: t.catalogue.title }, { to: `/catalogue/${family.groupId}`, label: groupName }, { label: family.name }]} />
          <div className="mt-6 grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <div className="flex items-center gap-4">
                <span className="t-data border border-oxblood/40 bg-cream-2 px-2.5 py-0.5 !text-[14px] text-oxblood">{family.standard}</span>
                <span className="text-[14px] text-steel">{t.family.reviewed}</span>
              </div>
              <h1 className="t-h1 mt-4">{family.name}</h1>
              <HeatRule light animate className="mt-5 w-24" />
              <p className="mt-5 text-[19px] text-gunmetal">{family.use}.</p>
              <p className="mt-2 text-steel">{t.family.proof}</p>
              {family.groupId === 'pipes-tubes' && (
                <p className="mt-4 flex items-center gap-2.5 text-[15px] text-gunmetal">
                  <ShieldCheck size={18} className="shrink-0 text-ember" aria-hidden /> {t.family.approvals}
                </p>
              )}
            </div>
            <div className="col-span-4 flex flex-col self-end">
            <div className="heat-top mb-6 border border-silver-2 bg-cream-2 p-3">
              <ProductIcon name={family.id} size="l" label className="!w-full" />
            </div>
            <dl className="border-t-2 border-oxblood">
              {[
                ['Sizes in stock', String(rows.length)],
                ['Grades', spec.grades.join(', ')],
                ['Lengths', lengths.length ? lengths.map((l) => `${l} m`).join(', ') : family.pcLabel?.replace('kg/', 'Per ') ?? ''],
                ['Certificate', 'EN 10204 3.1'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-silver-2 py-3">
                  <dt className="text-[14px] text-steel">{k}</dt>
                  <dd className="t-data text-end !text-[14px] text-gunmetal">{v}</dd>
                </div>
              ))}
            </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap grid grid-cols-12 items-start gap-8">
          <div className="col-span-8">
            <div role="tablist" aria-label="Product information" className="flex gap-8 border-b border-silver-2">
              {t.family.tabs.map((label, i) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`relative -mb-px pb-3 text-[16px] font-semibold transition-colors ${tab === i ? 'text-oxblood' : 'text-steel hover:text-oxblood'}`}
                >
                  {label}
                  {tab === i && <span className="heat-rule-light absolute inset-x-0 bottom-0" />}
                </button>
              ))}
            </div>

            {tab === 0 && (
              <div role="tabpanel">
                <div className="flex flex-wrap items-end gap-6 py-6">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-steel">{t.family.sizeSearch}</span>
                    <input value={size} onChange={(e) => setSize(e.target.value)} placeholder={rows[Math.floor(rows.length / 2)]?.designation ?? ''} className={`${selectCls} t-data w-44 !h-10`} />
                  </label>
                  {hasThick && (
                    <div className="order-last flex basis-full flex-col gap-1.5">
                      <span className="text-[13px] font-semibold text-steel">{isPipe ? 'Wall (mm)' : `${t.family.thickness} (mm)`}</span>
                      <div className="flex flex-wrap gap-1.5">
                        <Chip active={thick === null} onClick={() => setThick(null)}>
                          {t.family.any}
                        </Chip>
                        {thicknesses.slice(0, 9).map((x) => (
                          <Chip key={x} mono active={thick === x} onClick={() => setThick(thick === x ? null : x)}>
                            {x.toFixed(1)}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-steel">{t.family.grade}</span>
                    <select value={grade} onChange={(e) => setGrade(e.target.value)} className={`${selectCls} !h-10`}>
                      <option value="">{t.quote.notSure}</option>
                      {spec.grades.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </label>
                  {lengths.length > 0 && (
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[13px] font-semibold text-steel">{t.family.length}</span>
                      <select value={length} onChange={(e) => setLength(Number(e.target.value))} className={`${selectCls} !h-10`}>
                        {lengths.map((l) => (
                          <option key={l} value={l}>
                            {l} m
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th scope="col" className={`${th} text-start`}>{t.family.cols.designation}</th>
                      {hasThick && <th scope="col" className={`${th} text-end`}>{isPipe ? 'Wall (mm)' : t.family.cols.thickness}</th>}
                      {family.id === 'plate' && <th scope="col" className={`${th} text-end`}>{t.family.cols.width}</th>}
                      <th scope="col" className={`${th} text-end`}>{basis === 'm2' ? t.family.cols.massM2 : basis === 'pc' ? `Mass (${family.pcLabel})` : t.family.cols.mass}</th>
                      {lengths.length > 0 && <th scope="col" className={`${th} text-end`}>{t.family.cols.length}</th>}
                      <th scope="col" className={`${th} text-center`}>{t.family.cols.qty}</th>
                      <th scope="col" className={`${th} text-end`}>{t.family.cols.weight}</th>
                      <th scope="col" className={th}>
                        <span className="sr-only">{t.family.add}</span>
                      </th>
                    </tr>
                    <tr aria-hidden>
                      <td colSpan={8} className="heat-rule sticky top-[calc(var(--header-h)+44px)] z-10 p-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((r) => (
                      <SizeRow key={r.id} row={r} family={family} hasThick={hasThick} showLength={lengths.length > 0} defaultLength={length} grade={grade} target={r.id === target} />
                    ))}
                  </tbody>
                </table>
                {shown.length === 0 && (
                  <p className="border border-t-0 border-silver-2 p-10 text-center text-steel">
                    {t.family.noRows}{' '}
                    <button className="font-semibold text-ember hover:underline" onClick={() => { setSize(''); setThick(null) }}>
                      {t.catalogue.clear}
                    </button>
                  </p>
                )}
                <p className="mt-3 text-[13px] text-steel">Weights are theoretical, from nominal dimensions and a density of 7,850 kg/m³.</p>
              </div>
            )}

            {tab === 1 && <SpecPanel familyId={family.id} />}

            {tab === 2 && (
              <ul role="tabpanel" className="divide-y divide-silver-2 border-b border-silver-2">
                {[
                  ['EN 10204 3.1 mill test certificate', 'Sent with every order, matched to heat numbers.'],
                  [`${family.name}: product data sheet`, `Sizes, tolerances and properties to ${family.standard}.`],
                  ['ISO 9001:2015 certificate', 'WRG Certifications, QMS-MMXXIV-10-15184.'],
                ].map(([title, body]) => (
                  <li key={title} className="flex items-center gap-5 py-5">
                    <FileText size={22} className="shrink-0 text-steel" aria-hidden />
                    <div className="flex-1">
                      <p className="font-semibold text-gunmetal">{title}</p>
                      <p className="text-[15px] text-steel">{body}</p>
                    </div>
                    <button type="button" onClick={() => openWhatsApp(`Hello, please send the ${title} for ${family.name}.`)} className="h-9 border border-oxblood/60 px-3.5 text-[14px] font-semibold text-oxblood hover:bg-oxblood/[.06]">
                      Request a copy
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-20 grid grid-cols-8 gap-8">
              <div className="col-span-8">
                <h2 className="t-h2">{t.family.about}</h2>
                <HeatRule light animate className="mt-5 w-24" />
              </div>
              <div className="col-span-6 space-y-5 text-[17px] leading-[28px] text-gunmetal">
                {family.explainer.map((p) => (
                  <p key={p} className="measure">
                    {p}
                  </p>
                ))}
                <p className="text-[14px] text-steel">{t.family.reviewed}</p>
              </div>
            </div>

            <div className="mt-20">
              <h2 className="t-h2">{t.family.proofTitle}</h2>
              <HeatRule light animate className="mt-5 w-24" />
              <div className="mt-10 grid grid-cols-3 gap-6">
                {(['proof-mtc', 'proof-stencil', 'proof-bundle'] as const).map((slot, i) => (
                  <figure key={slot} className="reveal">
                    <div className="aspect-[4/5] relative overflow-hidden border border-silver-2">
                      <Placeholder slot={slot} fill tone="heat" />
                    </div>
                    <figcaption className="mt-3 text-[15px] text-gunmetal">{t.family.proofCaptions[i]}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <QuoteRail />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function SizeRow({ row, family, hasThick, showLength, defaultLength, grade, target }: { row: Row; family: FamilyT; hasThick: boolean; showLength: boolean; defaultLength: number; grade: string; target: boolean }) {
  const [qty, setQty] = useState(1)
  const [length, setLength] = useState(row.lengths.includes(defaultLength) ? defaultLength : row.lengths[0] ?? 0)
  const trRef = useRef<HTMLTableRowElement>(null)
  const add = useBasket((s) => s.add)
  const addedQty = useBasket((s) => s.lines.filter((l) => l.rowId === row.id).reduce((n, l) => n + l.qty, 0))

  // Filter-bar length seeds each row's own select.
  useEffect(() => {
    if (row.lengths.includes(defaultLength)) setLength(defaultLength)
  }, [defaultLength, row.lengths])

  const weight = lineWeightKg({ qty, unit: 'pcs', length }, row)
  const label = rowLabel(row)
  const mass = family.massBasis === 'm2' ? row.kgPerM2 : family.massBasis === 'pc' ? row.kgPerPc : row.kgPerM
  const td = 'px-4'

  return (
    <tr
      id={`row-${row.id}`}
      ref={trRef}
      className={`h-11 border-b border-silver-2 transition-colors odd:bg-cream-2 hover:bg-oxblood/[.06] ${addedQty ? 'shadow-[inset_4px_0_0_var(--color-ember)]' : ''} ${target ? 'row-target' : ''}`}
    >
      <th scope="row" className={`${td} t-data whitespace-nowrap text-start font-normal text-oxblood`}>
        {label}
      </th>
      {hasThick && <td className={`${td} t-data text-end`}>{row.thickness?.toFixed(1)}</td>}
      {family.id === 'plate' && <td className={`${td} t-data text-end`}>{row.width?.toFixed(2)}</td>}
      <td className={`${td} t-data text-end`}>{mass?.toFixed(2)}</td>
      {showLength && (
        <td className={`${td} text-end`}>
          {row.lengths.length > 1 ? (
            <select aria-label={`Length for ${label}`} value={length} onChange={(e) => setLength(Number(e.target.value))} className={`${selectCls} t-data !h-8`}>
              {row.lengths.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          ) : (
            <span className="t-data">{length}</span>
          )}
        </td>
      )}
      <td className={`${td} py-1 text-center`}>
        <QtyStepper value={qty} onChange={setQty} label={`quantity of ${label}`} />
      </td>
      <td className={`${td} t-data text-end`} aria-live="polite" title={`${formatKg(pieceKg(row, length))} kg per piece`}>
        {formatKg(weight)}
      </td>
      <td className="pe-3 ps-2 text-end">
        <button
          type="button"
          onClick={() => {
            add(row.id, qty, 'pcs', length, grade)
            // Heat flash on the row. WAAPI so React's className updates can't cancel it.
            if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
              trRef.current?.animate(
                [
                  { boxShadow: 'inset 6px 0 0 #f08a3c', backgroundColor: 'rgb(240 138 60 / .18)' },
                  { boxShadow: 'inset 4px 0 0 #c0281b', backgroundColor: 'transparent' },
                ],
                { duration: 900, easing: 'ease-out' },
              )
          }}
          className={`inline-flex h-8 w-[118px] items-center justify-center gap-1.5 rounded-[2px] text-[14px] font-semibold transition-colors ${
            addedQty ? 'border border-oxblood/50 bg-cream text-oxblood hover:border-ember hover:text-ember' : 'bg-ember text-cream hover:bg-[#b0231a]'
          }`}
        >
          {addedQty ? (
            <>
              <Check size={14} aria-hidden /> {t.family.added} ({addedQty})
            </>
          ) : (
            <>
              <Plus size={14} aria-hidden /> {t.family.add}
            </>
          )}
        </button>
      </td>
    </tr>
  )
}

function SpecPanel({ familyId }: { familyId: string }) {
  const spec = specFor(familyId)
  const table = (title: string, data: { grade: string; values: Record<string, string> }[]) => {
    if (!data.length) return null
    const cols = [...new Set(data.flatMap((d) => Object.keys(d.values)))]
    return (
      <div className="mt-10">
        <h3 className="t-h3">{title}</h3>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr className="bg-gunmetal text-cream">
              <th scope="col" className="px-4 py-3 text-start text-[13px] font-semibold">{t.family.grade}</th>
              {cols.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 text-end text-[13px] font-semibold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.grade} className="t-data h-11 border-b border-silver-2 odd:bg-cream-2">
                <th scope="row" className="px-4 text-start font-normal text-oxblood">{d.grade}</th>
                {cols.map((c) => (
                  <td key={c} className="px-4 text-end">{d.values[c] ?? '–'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div role="tabpanel" className="py-8">
      <p className="text-[14px] text-steel">{t.family.reviewed}</p>
      <div className="mt-6 grid grid-cols-2 gap-8">
        <div>
          <h3 className="t-h3">{t.family.tolerances}</h3>
          <dl className="mt-4 divide-y divide-silver-2 border-y border-silver-2">
            {spec.tolerances.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 py-2.5 text-[15px]">
                <dt className="text-steel">{k}</dt>
                <dd className="text-gunmetal">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="t-h3">{t.family.grades}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {spec.grades.map((g) => (
              <li key={g} className="t-data border border-silver-2 bg-cream-2 px-3 py-1 text-oxblood">{g}</li>
            ))}
          </ul>
        </div>
      </div>
      {table(t.family.chemical, spec.chemical)}
      {table(t.family.mechanical, spec.mechanical)}
    </div>
  )
}

function QuoteRail() {
  const lines = useBasket((s) => s.lines)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  return (
    <aside className="sticky top-[calc(var(--header-h)+24px)] col-span-4 border border-silver-2 bg-cream-2" aria-label={t.rail.title}>
      <div className="heat-rule-light" />
      <div className="p-7">
        <div className="flex items-baseline justify-between">
          <h2 className="t-h3">{t.rail.title}</h2>
          <span className="t-data !text-[14px] text-steel">{lines.length} lines</span>
        </div>
        {lines.length === 0 ? (
          <p className="mt-5 text-[15px] leading-6 text-steel">{t.rail.empty}</p>
        ) : (
          <ul className="mt-5 max-h-[300px] overflow-auto border-t border-silver-2">
            {lines.map((l) => {
              const row = rowById(l.rowId)
              if (!row) return null
              return (
                <li key={l.id} className="flex items-baseline justify-between gap-3 border-b border-silver-2 py-2.5">
                  <span className="t-data !text-[14px] text-oxblood">{rowLabel(row)}</span>
                  <span className="t-data shrink-0 !text-[13px] text-steel">
                    {l.qty} {l.unit === 'pcs' ? `x ${l.length} m` : t.units[l.unit]}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-[14px] text-steel">{t.rail.total}</span>
          <span className="t-data !text-[22px] text-oxblood">{formatWeight(basketTotalKg(lines))}</span>
        </div>
        <ButtonLink to="/quote" size="lg" className="mt-6 w-full">
          {t.rail.review}
        </ButtonLink>
        <p className="mt-4 text-[14px] leading-5 text-steel">{contact.replyPromise}</p>
        <button type="button" onClick={() => openWhatsApp('Hello, I need one length today. Can you help?')} className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ember hover:underline underline-offset-4">
          <MessageCircle size={16} aria-hidden /> {t.rail.small}
        </button>
      </div>
    </aside>
  )
}
