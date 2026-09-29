import { Minus, Plus } from 'lucide-react'
import { t } from '../copy/en'
import { familyById } from '../data/families'
import { specFor } from '../data/specs'
import type { Line, Row } from '../data/types'
import { unitsFor } from '../data/weight'

const selectCls =
  'h-9 rounded-[2px] border border-silver-2 bg-cream-2 px-2 text-[14px] text-gunmetal hover:border-steel focus-visible:border-ember'

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const set = (n: number) => onChange(Math.max(1, Math.min(99999, Math.round(n) || 1)))
  return (
    <div className="inline-flex h-9 items-stretch border border-silver-2 bg-cream-2">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => set(value - 1)} className="grid w-8 place-items-center text-steel hover:text-ember">
        <Minus size={14} />
      </button>
      <input
        aria-label={label}
        inputMode="numeric"
        value={value}
        onChange={(e) => set(Number(e.target.value.replace(/\D/g, '')))}
        onFocus={(e) => e.target.select()}
        className="t-data w-14 border-x border-silver-2 bg-transparent text-center outline-none focus-visible:bg-cream"
      />
      <button type="button" aria-label={`Increase ${label}`} onClick={() => set(value + 1)} className="grid w-8 place-items-center text-steel hover:text-ember">
        <Plus size={14} />
      </button>
    </div>
  )
}

export function UnitSelect({ line, row, onChange }: { line: Line; row: Row; onChange: (p: Partial<Line>) => void }) {
  return (
    <select aria-label="Unit" value={line.unit} onChange={(e) => onChange({ unit: e.target.value as Line['unit'] })} className={selectCls}>
      {unitsFor(row).map((u) => (
        <option key={u} value={u}>
          {t.units[u]}
        </option>
      ))}
    </select>
  )
}

/** Length only matters when counting pieces of a length-sold item. */
export function LengthSelect({ line, row, onChange }: { line: Line; row: Row; onChange: (p: Partial<Line>) => void }) {
  if (line.unit !== 'pcs' || row.lengths.length === 0) return <span className="t-data text-steel">–</span>
  return (
    <select aria-label="Length" value={line.length} onChange={(e) => onChange({ length: Number(e.target.value) })} className={selectCls}>
      {row.lengths.map((l) => (
        <option key={l} value={l}>
          {l} m
        </option>
      ))}
    </select>
  )
}

export function GradeSelect({ line, row, onChange }: { line: Line; row: Row; onChange: (p: Partial<Line>) => void }) {
  const grades = specFor(familyById(row.familyId)!.id).grades
  return (
    <select aria-label="Grade" value={line.grade ?? ''} onChange={(e) => onChange({ grade: e.target.value })} className={selectCls}>
      <option value="">{t.quote.notSure}</option>
      {grades.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  )
}

export { selectCls }
