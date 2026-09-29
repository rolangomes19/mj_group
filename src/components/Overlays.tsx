import { MessageCircle, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { t } from '../copy/en'
import { contact, LIVE_LINKS } from '../data/contact'
import { rowById, rowLabel } from '../data/rows'
import { formatKg, formatWeight, lineWeightKg } from '../data/weight'
import { basketTotalKg, useBasket } from '../state/basket'
import { useDemo } from '../state/demo'
import { ButtonLink } from './Button'
import { LengthSelect, QtyStepper, UnitSelect } from './LineControls'

/** Keeps a native <dialog> in sync with a boolean. showModal gives focus trap, Esc and inert background. */
function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  useEffect(() => {
    const d = ref.current
    if (!d) return
    const close = () => onClose()
    const backdrop = (e: MouseEvent) => {
      if (e.target === d) d.close()
    }
    d.addEventListener('close', close)
    d.addEventListener('click', backdrop)
    return () => {
      d.removeEventListener('close', close)
      d.removeEventListener('click', backdrop)
    }
  }, [onClose])
  return ref
}

export function BasketDrawer() {
  const open = useDemo((s) => s.drawerOpen)
  const openDrawer = useDemo((s) => s.openDrawer)
  const { lines, update, remove } = useBasket()
  const ref = useDialog(open, () => openDrawer(false))
  const loc = useLocation()

  // Close on navigation.
  useEffect(() => openDrawer(false), [loc.pathname, openDrawer])

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="drawer-title">
      <div className="flex h-full flex-col">
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-silver-2 px-6">
          <h2 id="drawer-title" className="t-h3">
            {t.drawer.title} <span className="t-data !text-[18px] text-steel">({lines.length})</span>
          </h2>
          <button type="button" onClick={() => openDrawer(false)} aria-label={t.drawer.close} className="grid h-10 w-10 place-items-center text-steel hover:text-ember">
            <X size={20} />
          </button>
        </div>
        <div className="heat-rule-light" />

        <ul className="flex-1 overflow-auto px-6">
          {lines.length === 0 && (
            <li className="py-12 text-steel">
              <p>{t.drawer.empty}</p>
              <ButtonLink to="/catalogue" variant="secondary" className="mt-6">
                {t.drawer.browse}
              </ButtonLink>
            </li>
          )}
          {lines.map((l) => {
            const row = rowById(l.rowId)
            if (!row) return null
            return (
              <li key={l.id} className="border-b border-silver-2 py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="t-data text-oxblood">{rowLabel(row)}</p>
                  <button type="button" onClick={() => remove(l.id)} aria-label={`${t.quote.remove} ${rowLabel(row)}`} className="text-steel hover:text-ember">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <QtyStepper value={l.qty} onChange={(qty) => update(l.id, { qty })} label={`quantity for ${rowLabel(row)}`} />
                  <UnitSelect line={l} row={row} onChange={(p) => update(l.id, p)} />
                  <LengthSelect line={l} row={row} onChange={(p) => update(l.id, p)} />
                  <span className="t-data ms-auto text-gunmetal">{formatKg(lineWeightKg(l, row))} kg</span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="shrink-0 border-t border-silver-2 bg-cream-2 px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-[14px] text-steel">{t.rail.total}</span>
            <span className="t-data !text-[20px] text-oxblood">{formatWeight(basketTotalKg(lines))}</span>
          </div>
          <ButtonLink to="/quote" className="w-full" size="lg" aria-disabled={lines.length === 0}>
            {t.drawer.review}
          </ButtonLink>
          <p className="mt-3 text-center text-[13px] text-steel">{contact.replyPromise}</p>
        </div>
      </div>
    </dialog>
  )
}

/** In the demo, WhatsApp buttons show what would be sent instead of leaving the app. */
export function WhatsAppDialog() {
  const text = useDemo((s) => s.waText)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  const ref = useDialog(!!text && !LIVE_LINKS, () => openWhatsApp(null))

  useEffect(() => {
    if (text && LIVE_LINKS) {
      window.open(`https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
      openWhatsApp(null)
    }
  }, [text, openWhatsApp])

  return (
    <dialog ref={ref} aria-labelledby="wa-title" className="m-auto w-[440px] border-0 bg-cream p-0 text-gunmetal backdrop:bg-forge/50">
      <div className="heat-rule-light" />
      <div className="p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1f7a4d] text-cream">
            <MessageCircle size={20} aria-hidden />
          </span>
          <div>
            <h2 id="wa-title" className="font-semibold text-gunmetal">
              {t.wa.title}
            </h2>
            <p className="t-data !text-[13px] text-steel">{contact.whatsapp}</p>
          </div>
        </div>
        <p className="mt-5 rounded-[2px] rounded-tl-none border border-silver-2 bg-[#e3f1e8] px-4 py-3 text-[15px] leading-6 text-gunmetal">{text}</p>
        <p className="mt-4 text-[13px] leading-5 text-steel">{t.wa.note}</p>
        <form method="dialog" className="mt-5 flex justify-end">
          <button className="h-10 rounded-[2px] border border-oxblood/70 px-4 font-semibold text-oxblood hover:bg-oxblood/[.06]">{t.wa.close}</button>
        </form>
      </div>
    </dialog>
  )
}

export function WhatsAppFab() {
  const loc = useLocation()
  const presenter = useDemo((s) => s.presenter)
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  if (loc.pathname.startsWith('/quote')) return null
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(t.wa.default)}
      aria-label={t.wa.fab}
      className="fixed end-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#1f7a4d] text-cream shadow-[0_10px_30px_-8px_rgb(26_18_16_/_.6)] transition-[bottom,transform] duration-300 hover:scale-105"
      style={{ bottom: presenter ? 24 + 48 : 24 }}
    >
      <MessageCircle size={24} aria-hidden />
    </button>
  )
}
