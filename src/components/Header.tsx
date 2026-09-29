import { MessageCircle, Phone, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { t } from '../copy/en'
import { contact } from '../data/contact'
import { useBasket } from '../state/basket'
import { useDemo } from '../state/demo'
import { Lockup } from './Logo'
import { SearchBox } from './SearchBox'

export function TopStrip() {
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  return (
    <div className="on-dark h-9 bg-forge text-[13px] text-silver">
      <div className="wrap flex h-full items-center justify-between">
        <span className="font-mono tracking-wide">{t.est}</span>
        <div className="flex items-center gap-6">
          <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-cream">
            <Phone size={13} aria-hidden /> {contact.phone}
          </a>
          <button type="button" onClick={() => openWhatsApp(t.wa.default)} className="inline-flex items-center gap-1.5 hover:text-cream">
            <MessageCircle size={13} aria-hidden /> WhatsApp
          </button>
          <span className="text-cream/90">{contact.replyPromise}</span>
        </div>
      </div>
    </div>
  )
}

const linkBase = 'relative whitespace-nowrap py-2 text-gunmetal hover:text-oxblood transition-colors'
const underline = 'after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[2px] after:bg-[image:var(--heat-light)] after:origin-left after:transition-transform after:duration-300'

export function Header() {
  const count = useBasket((s) => s.lines.length)
  const bumpKey = useBasket((s) => s.bumpKey)
  const openDrawer = useDemo((s) => s.openDrawer)
  const [searchOpen, setSearchOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Close the collapsed search when the route changes.
  const { pathname, search } = useLocation()
  useEffect(() => setSearchOpen(false), [pathname, search])

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-silver-2/80 bg-cream/95 backdrop-blur-sm">
      <div className="wrap flex h-full items-center gap-6">
        <Link to="/" className="shrink-0 text-oxblood" aria-label={`${t.brand}, home`}>
          <Lockup height={40} nameClass="text-[20px] min-[1600px]:text-[22px]" />
        </Link>

        <nav aria-label="Main" className="ms-auto flex items-center gap-5 text-[15px] min-[1600px]:gap-7 min-[1600px]:text-[16px]">
          {t.nav.map((n) =>
            n.to.startsWith('#') ? (
              <a key={n.to} href={n.to} className={`${linkBase} ${underline} after:scale-x-0 hover:after:scale-x-100`}>
                {n.label}
              </a>
            ) : n.to.includes('#') ? (
              <Link key={n.to} to={n.to} className={`${linkBase} ${underline} after:scale-x-0 hover:after:scale-x-100`}>
                {n.label}
              </Link>
            ) : (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `${linkBase} ${underline} ${isActive ? 'text-oxblood after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>
                {n.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <SearchBox className="hidden w-[260px] min-[1600px]:block" />
          <div className="relative min-[1600px]:hidden">
            <button
              ref={btnRef}
              type="button"
              aria-label="Search sizes"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center border border-silver-2 bg-cream-2 text-gunmetal hover:border-ember"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
            {searchOpen && (
              <div className="absolute end-0 top-[calc(100%+14px)] w-[400px] border border-silver-2 bg-cream p-3 shadow-[0_18px_40px_-18px_rgb(26_18_16_/_.45)]">
                <SearchBox autoFocus onDone={() => { setSearchOpen(false); btnRef.current?.focus() }} />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => openDrawer(true)}
            className="inline-flex h-11 items-center gap-2 rounded-[2px] bg-ember px-4 text-[15px] font-semibold text-cream transition-shadow hover:shadow-[0_0_0_4px_rgb(240_138_60_/_.22)]"
          >
            {t.quoteBtn}
            <span key={bumpKey} className={`t-data grid h-6 min-w-6 place-items-center rounded-[2px] bg-cream/95 px-1 !text-[13px] text-oxblood ${bumpKey ? 'bump' : ''}`}>
              {count}
            </span>
            <span className="sr-only">lines in your quote</span>
          </button>
        </div>
      </div>
    </header>
  )
}
