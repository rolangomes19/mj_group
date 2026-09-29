import type { Line, Row, Unit } from './types'

/** Which units make sense for a row. Metres only exist for items sold by the running metre. */
export function unitsFor(row: Row): Unit[] {
  return row.kgPerM ? ['pcs', 'm', 't'] : ['pcs', 't']
}

/** Theoretical mass of one piece at the given length. */
export function pieceKg(row: Row, length: number): number {
  if (row.kgPerPc) return row.kgPerPc
  if (row.kgPerM2) return row.kgPerM2 * (row.width ?? 1) * length
  return (row.kgPerM ?? 0) * length
}

/** Theoretical line weight in kg.
 *  pcs = piece mass x qty, m = kg/m x qty, t = qty x 1000. */
export function lineWeightKg(line: Pick<Line, 'qty' | 'unit' | 'length'>, row: Row): number {
  if (line.unit === 't') return line.qty * 1000
  if (line.unit === 'm') return (row.kgPerM ?? 0) * line.qty
  return pieceKg(row, line.length) * line.qty
}

const kgFmt = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })
const tFmt = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** kg under 10 t, tonnes with 2 decimals above. */
export function formatWeight(kg: number): string {
  return kg < 10000 ? `${kgFmt.format(Math.round(kg))} kg` : `${tFmt.format(kg / 1000)} t`
}

export function formatKg(kg: number): string {
  return new Intl.NumberFormat('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(kg)
}

if (import.meta.env.DEV) {
  const plate: Row = { id: 'p', familyId: 'plate', designation: '', thickness: 10, kgPerM2: 78.5, width: 2, lengths: [6] }
  const shs: Row = { id: 's', familyId: 'shs', designation: '', kgPerM: 14.7, lengths: [6, 12] }
  console.assert(lineWeightKg({ qty: 2, unit: 'pcs', length: 6 }, plate) === 1884, 'plate weight')
  console.assert(Math.abs(lineWeightKg({ qty: 10, unit: 'pcs', length: 6 }, shs) - 882) < 1e-9, 'pcs weight')
  console.assert(Math.abs(lineWeightKg({ qty: 100, unit: 'm', length: 6 }, shs) - 1470) < 1e-9, 'm weight')
  console.assert(lineWeightKg({ qty: 3, unit: 't', length: 6 }, shs) === 3000, 't weight')
  console.assert(formatWeight(12345) === '12.35 t' && formatWeight(950) === '950 kg', 'format')
}
