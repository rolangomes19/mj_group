import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { t } from '../copy/en'
import { basketTotalKg, useBasket } from '../state/basket'
import { fillBasket, newRef, useDemo } from '../state/demo'
import { rowById, rowLabel } from '../data/rows'
import { lineWeightKg } from '../data/weight'

const routes = ['/', '/catalogue/pipes-tubes/shs', '/quote', '/quote/details', '/quote/received', '/founder', '/since-1942']

const typing = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))

/** A sample submitted quote so Received never opens empty. */
function sampleQuote() {
  const { lines } = useBasket.getState()
  return {
    ref: newRef(),
    createdAt: new Date().toISOString(),
    lines: lines.map((l) => {
      const row = rowById(l.rowId)!
      return { designation: rowLabel(row), qty: l.qty, unit: l.unit, length: l.length, grade: l.grade, weightKg: lineWeightKg(l, row) }
    }),
    totalKg: basketTotalKg(lines),
    emirate: 'Dubai',
    contact: { name: 'Rashid Al Marri', company: 'Gulf Frame Contracting', mobile: '+971 50 000 0000' },
    mtc: true,
    sample: true,
  }
}

export function PresenterBar() {
  const { presenter, togglePresenter, showSample, toggleSample, setQuote } = useDemo()
  const nav = useNavigate()

  const reset = () => {
    nav('/')
    window.scrollTo(0, 0)
    // After leaving the page, so Received's "no quote" redirect can't win the race.
    setTimeout(() => {
      useBasket.getState().clear()
      setQuote(null)
    }, 0)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.toLowerCase() === 'p' && !e.shiftKey) togglePresenter()
      if (e.key === 'R' && e.shiftKey) reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!presenter) return null

  const go = (i: number) => {
    const path = routes[i]
    if ((path === '/quote/details' || path === '/quote/received') && useBasket.getState().lines.length === 0) fillBasket()
    if (path === '/quote/received') setQuote(sampleQuote())
    nav(path)
    window.scrollTo(0, 0)
  }

  const btn = 'h-8 px-3 font-mono text-[12px] tracking-wide text-silver hover:bg-cream/10 hover:text-cream'
  return (
    <div role="toolbar" aria-label="Presenter" className="on-dark fixed inset-x-0 bottom-0 z-[60] flex h-12 items-center gap-1 border-t border-cream/10 bg-forge px-4">
      <span className="me-3 font-mono text-[12px] text-molten">Presenter</span>
      {t.presenter.items.map((label, i) => (
        <button key={label} type="button" className={btn} onClick={() => go(i)}>
          {label}
        </button>
      ))}
      <span className="mx-2 h-5 w-px bg-cream/15" />
      <button type="button" className={btn} onClick={fillBasket}>
        {t.presenter.fill}
      </button>
      <button type="button" className={btn} onClick={reset}>
        {t.presenter.reset}
      </button>
      <label className={`${btn} inline-flex cursor-pointer items-center gap-2`}>
        <input type="checkbox" checked={showSample} onChange={toggleSample} className="accent-molten" />
        {t.presenter.marks}
      </label>
      <span className="ms-auto font-mono text-[11px] text-silver/80">{t.presenter.hint}</span>
    </div>
  )
}
