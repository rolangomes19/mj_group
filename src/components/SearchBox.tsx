import { Search } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { t } from '../copy/en'
import { familyById } from '../data/families'
import { searchRows } from '../data/search'
import type { Row } from '../data/types'

export const rowHref = (row: Row) => `/catalogue/${familyById(row.familyId)!.groupId}/${row.familyId}?row=${row.id}`

type Props = { size?: 'md' | 'lg'; dark?: boolean; autoFocus?: boolean; onDone?: () => void; className?: string; placeholder?: string }

/** Designation autocomplete. Enter goes to the family with the row highlighted. */
export function SearchBox({ size = 'md', dark, autoFocus, onDone, className = '', placeholder = t.search.placeholder }: Props) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const hits = useMemo(() => searchRows(q), [q])
  const nav = useNavigate()
  const id = useId()

  const go = (row: Row) => {
    nav(rowHref(row))
    setQ('')
    setOpen(false)
    onDone?.()
  }

  const lg = size === 'lg'
  const field = dark
    ? 'bg-forge/60 border-silver/40 text-cream placeholder:text-silver focus-within:border-molten'
    : 'bg-cream-2 border-silver-2 text-gunmetal placeholder:text-steel focus-within:border-ember'

  return (
    <div className={`relative ${className}`}>
      <label className={`flex items-center gap-3 border ${field} rounded-[2px] transition-colors ${lg ? 'h-16 px-5' : 'h-11 px-3.5'}`}>
        <Search size={lg ? 22 : 18} aria-hidden className={dark ? 'text-molten' : 'text-steel'} />
        <span className="sr-only">{t.search.label}</span>
        <input
          role="combobox"
          aria-expanded={open && q.length > 1}
          aria-controls={id}
          aria-activedescendant={hits[active] ? `${id}-${active}` : undefined}
          autoFocus={autoFocus}
          value={q}
          placeholder={placeholder}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
            setActive(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, hits.length - 1))
            else if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0))
            else if (e.key === 'Enter' && hits[active]) go(hits[active].row)
            else if (e.key === 'Escape') {
              setOpen(false)
              onDone?.()
            } else return
            e.preventDefault()
          }}
          className={`min-w-0 flex-1 bg-transparent outline-none ${lg ? 't-data !text-[20px]' : 'text-[15px]'}`}
        />
      </label>
      {open && q.trim().length > 1 && (
        <ul
          id={id}
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-1 max-h-[360px] overflow-auto border border-silver-2 bg-cream-2 py-1 text-gunmetal shadow-[0_18px_40px_-18px_rgb(26_18_16_/_.45)]"
        >
          {hits.length === 0 && <li className="px-4 py-3 text-[14px] text-steel">{t.search.empty}</li>}
          {hits.map((h, i) => (
            <li
              key={h.row.id}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault()
                go(h.row)
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2.5 ${i === active ? 'bg-oxblood/[.07] shadow-[inset_3px_0_0_var(--color-ember)]' : ''}`}
            >
              <span className="t-data text-oxblood">{h.label}</span>
              <span className="truncate text-[13px] text-steel">{h.familyName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
