import type { StandardKey } from './types'
import icvLogo from '../assets/certs/icv-logo.png'
import isoSeal from '../assets/certs/wrg-iso9001-seal.png'

export const standardChips: { key: StandardKey; label: string }[] = [
  { key: 'EN10219', label: 'EN 10219' },
  { key: 'EN10255', label: 'EN 10255' },
  { key: 'EURONORM', label: 'Euronorm' },
  { key: 'BS4', label: 'BS 4' },
  { key: 'DIN', label: 'DIN 1026' },
  { key: 'BS4848', label: 'BS EN 10056' },
  { key: 'EN10025', label: 'EN 10025' },
  { key: 'ASTM-A53', label: 'ASTM A53' },
  { key: 'ASTM-A36', label: 'ASTM A36' },
  { key: 'JIS', label: 'JIS' },
]

// Catalogue grade cross-reference (Appendix A). Weathering row uses standard grade names.
export const gradeTable = [
  { en: 'S235JR', astm: 'A283 Gr C', jis: 'SS330', yield: 235 },
  { en: 'S275JR', astm: 'A36', jis: 'SS400', yield: 275 },
  { en: 'S355JR', astm: 'A572 Gr 50', jis: 'SS490', yield: 355 },
  { en: 'S355J2', astm: 'A572 Gr 50', jis: 'SS490', yield: 355 },
  { en: 'S355J2W', astm: 'A588 Gr A', jis: 'SMA490AW', yield: 355 },
]

// badge.src null: drawn in code (Cert204Label). Marks are third-party, shown at 96 px high at most.
export type Badge = { src: string | null; alt: string; h: number }

export const certificates: {
  title: string
  body: string
  issuer: string
  number: string
  validTo?: string
  sample: boolean
  badge: Badge
}[] = [
  { title: 'ISO 9001:2015', body: 'Quality management system for steel trading and stockholding, certified by WRG Certifications.', issuer: 'WRG Certifications', number: 'QMS-MMXXIV-10-15184', validTo: 'Nov 2027', sample: false, badge: { src: isoSeal, alt: 'WRG Certifications ISO 9001 registered seal', h: 96 } },
  { title: 'In-Country Value certificate', body: 'Certified local value for UAE government and major project tenders.', issuer: 'Mazars', number: 'ICV-132761', sample: true, badge: { src: icvLogo, alt: 'In-Country Value programme logo', h: 88 } },
  { title: 'EN 10204 3.1 mill test certificates', body: 'Chemistry and mechanical results, traceable by heat number, with every order.', issuer: 'Issued by the producing mill', number: 'Per heat', validTo: 'Every delivery', sample: false, badge: { src: null, alt: 'EN 10204 3.1 label', h: 96 } },
]

export const approvals = {
  total: 81,
  line: 'Approved supplier on 81 projects across the UAE, Qatar and Saudi Arabia',
  split: [{ place: 'UAE', n: 60 }, { place: 'Qatar', n: 16 }, { place: 'Saudi Arabia', n: 5 }],
  projects: ['Dubai Metro', 'Dubai Frame', 'Dubai Marina Mall', 'Executive Towers, Business Bay', 'Meydan Residences', 'The Index', 'Palm Jumeirah Apartments', 'Barwa City, Doha'],
  source: 'MJ catalogue pp.145-148',
  sample: false,
}
