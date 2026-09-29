import { familyById } from './families'
import { rowLabel, rows } from './rows'
import type { Row } from './types'

/** Lowercase, × to x, drop spaces and punctuation that people type differently. */
export const norm = (s: string) => s.toLowerCase().replace(/×/g, 'x').replace(/[\s,."”']/g, '')

type Hit = { row: Row; label: string; familyName: string }

const index = rows.map((row) => {
  const label = rowLabel(row)
  const f = familyById(row.familyId)!
  return { row, label, familyName: f.name, key: norm(`${label} ${f.name} ${f.standard}`), labelKey: norm(label) }
})

/** Rows whose label (or family text) contains the query. Label-prefix matches rank first. */
export function searchRows(q: string, limit = 8): Hit[] {
  const n = norm(q)
  if (n.length < 2) return []
  const hits = index.filter((i) => i.key.includes(n))
  hits.sort((a, b) => Number(b.labelKey.startsWith(n)) - Number(a.labelKey.startsWith(n)) || Number(b.labelKey.includes(n)) - Number(a.labelKey.includes(n)))
  return hits.slice(0, limit).map(({ row, label, familyName }) => ({ row, label, familyName }))
}

if (import.meta.env.DEV) {
  const first = (q: string) => searchRows(q)[0]?.row.id
  console.assert(first('IPE 200') === 'ipe-200', 'IPE 200')
  console.assert(first('ipe200') === 'ipe-200', 'ipe200')
  console.assert(first('shs 100x100')?.startsWith('shs-100-x-100'), 'shs 100x100')
  console.assert(first('SHS 100 × 100')?.startsWith('shs-100-x-100'), 'SHS 100 × 100')
  console.assert(first('50 NB')?.startsWith('pipe-en10255-50-nb'), '50 NB')
}
