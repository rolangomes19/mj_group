import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

export function Breadcrumb({ items, dark }: { items: { to?: string; label: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center gap-1.5 text-[14px] ${dark ? 'text-silver' : 'text-steel'}`}>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} aria-hidden />}
            {it.to ? (
              <Link to={it.to} className={dark ? 'hover:text-cream' : 'hover:text-oxblood'}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? 'text-cream' : 'text-gunmetal'}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

type ChipProps = { active?: boolean; mono?: boolean; children: ReactNode; to?: string; onClick?: () => void; keepQuery?: boolean }

export function Chip({ active, mono, children, to, onClick, keepQuery }: ChipProps) {
  const { search } = useLocation()
  const cls = `inline-flex h-8 items-center rounded-[2px] border px-3 text-[14px] transition-colors ${mono ? 'font-mono' : ''} ${
    active ? 'border-oxblood bg-oxblood text-cream' : 'border-silver-2 bg-cream-2 text-gunmetal hover:border-oxblood hover:text-oxblood'
  }`
  if (to)
    return (
      <Link to={to + (keepQuery ? search : '')} className={cls} aria-current={active ? 'page' : undefined}>
        {children}
      </Link>
    )
  return (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {children}
    </button>
  )
}
