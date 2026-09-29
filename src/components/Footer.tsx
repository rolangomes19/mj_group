import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { t } from '../copy/en'
import { contact, locations } from '../data/contact'
import { groups } from '../data/groups'
import { useDemo } from '../state/demo'
import { HeatRule } from './HeatRule'
import { Lockup } from './Logo'

export function Footer() {
  const openWhatsApp = useDemo((s) => s.openWhatsApp)
  return (
    <footer id="contact" className="on-dark relative bg-forge text-cream">
      <HeatRule />
      <div className="wrap grid grid-cols-12 gap-x-8 gap-y-14 pb-10 pt-20">
        <div className="col-span-12 flex items-end justify-between gap-8 border-b border-cream/10 pb-14">
          <Lockup height={64} nameClass="text-[44px] text-cream" className="text-cream" />
          <p className="max-w-[34ch] text-end text-silver">{contact.replyPromise}</p>
        </div>

        <div className="col-span-6">
          <h2 className="t-label mb-6 !text-silver">{t.footer.locations}</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
            {locations.map((l) => (
              <li key={l.name}>
                <p className="font-semibold text-cream">{l.name}</p>
                {l.lines.map((line) => (
                  <p key={line} className="text-[15px] leading-6 text-silver">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3">
          <h2 className="t-label mb-6 !text-silver">{t.footer.contact}</h2>
          <ul className="space-y-3 text-[15px]">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-molten" href={contact.phoneHref}>
                <Phone size={16} aria-hidden className="text-molten" /> {contact.phone}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-molten" href={`mailto:${contact.email}`}>
                <Mail size={16} aria-hidden className="text-molten" /> {contact.email}
              </a>
            </li>
            <li>
              <button type="button" onClick={() => openWhatsApp(t.wa.default)} className="inline-flex items-center gap-2 hover:text-molten">
                <MessageCircle size={16} aria-hidden className="text-molten" /> WhatsApp {contact.whatsapp}
              </button>
            </li>
          </ul>
        </div>

        <div className="col-span-3">
          <h2 className="t-label mb-6 !text-silver">{t.footer.links}</h2>
          <ul className="grid grid-cols-1 gap-2 text-[15px]">
            {groups.slice(0, 4).map((g) => (
              <li key={g.id}>
                <Link className="hover:text-molten" to={`/catalogue/${g.id}`}>
                  {g.name}
                </Link>
              </li>
            ))}
            <li><Link className="hover:text-molten" to="/standards">Standards and certificates</Link></li>
            <li><Link className="hover:text-molten" to="/founder">Our founder</Link></li>
            <li><Link className="hover:text-molten" to="/since-1942">Since 1942</Link></li>
          </ul>
        </div>

        <div className="col-span-12 flex justify-between border-t border-cream/10 pt-6 text-[13px] text-silver">
          <span>{t.footer.legal}</span>
          <span>ISO 9001:2015 certified by WRG Certifications</span>
        </div>
      </div>
    </footer>
  )
}
