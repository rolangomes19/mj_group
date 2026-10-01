import { rowById } from './rows'
import { searchRows } from './search'
import type { Unit } from './types'
import { useBasket } from '../state/basket'

type Cell = string | number | boolean | Date | null | undefined

/** Minimal CSV reader: quoted fields, "" escapes, , or ; delimiter. */
export function parseCsv(text: string): string[][] {
  const delim = (text.split('\n')[0].match(/;/g)?.length ?? 0) > (text.split('\n')[0].match(/,/g)?.length ?? 0) ? ';' : ','
  const out: string[][] = []
  let row: string[] = []
  let cur = ''
  let q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') (cur += '"', i++)
      else if (c === '"') q = false
      else cur += c
    } else if (c === '"') q = true
    else if (c === delim) (row.push(cur), (cur = ''))
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(cur)
      out.push(row)
      row = []
      cur = ''
    } else cur += c
  }
  if (cur || row.length) out.push([...row, cur])
  return out
}

const unitOf = (s: string): Unit => (/^(m|mtr|metre|meter|metres|meters|rm)$/i.test(s) ? 'm' : /^(t|ton|tons|tonne|tonnes|mt)$/i.test(s) ? 't' : 'pcs')
const col = (head: string[], re: RegExp) => head.findIndex((h) => re.test(h))

export type ImportResult = { added: number; missed: string[] }

/** Reads a CSV or Excel file and adds every matching line to the basket. */
export async function importList(file: File): Promise<ImportResult> {
  let grid: Cell[][]
  if (/\.xlsx$/i.test(file.name)) {
    const { readSheet } = await import('read-excel-file/browser')
    grid = (await readSheet(file)) as Cell[][]
  } else grid = parseCsv(await file.text())
  const rows = grid.map((r) => r.map((c) => String(c ?? '').trim())).filter((r) => r.some(Boolean))

  // Header row is optional. Without one: designation, quantity, unit, length, grade.
  const head = rows[0]?.map((h) => h.toLowerCase()) ?? []
  const named = head.some((h) => /designation|item|size|description|product/.test(h))
  const idx = named
    ? { d: col(head, /designation|item|size|description|product/), q: col(head, /qty|quantity|pcs|nos/), u: col(head, /unit|uom/), l: col(head, /length/), g: col(head, /grade/) }
    : { d: 0, q: 1, u: 2, l: 3, g: 4 }
  const { add } = useBasket.getState()
  const res: ImportResult = { added: 0, missed: [] }
  for (const r of named ? rows.slice(1) : rows) {
    const want = r[idx.d]
    if (!want) continue
    const hit = searchRows(want, 1)[0]
    const row = hit && rowById(hit.row.id)
    if (!row) {
      res.missed.push(want)
      continue
    }
    const len = Number(r[idx.l])
    const length = row.lengths.includes(len) ? len : (row.lengths[0] ?? 0)
    add(row.id, Math.max(1, Math.round(Number(r[idx.q])) || 1), unitOf(r[idx.u] ?? ''), length, r[idx.g] ?? '')
    res.added++
  }
  return res
}

if (import.meta.env.DEV) {
  const g = parseCsv('a,"b,1"\r\n"x ""y""",2')
  console.assert(g[0][1] === 'b,1' && g[1][0] === 'x "y"' && g[1][1] === '2', 'parseCsv')
}
