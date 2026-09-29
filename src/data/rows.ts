import { familyById } from './families'
import type { Row } from './types'

const CAT = 'MJ catalogue'
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

type Opt = Partial<Row> & { sample?: boolean }

/** One row per designation x thickness: id = family-designation-thickness. */
function mk(familyId: string, designation: string, kg: number, o: Opt = {}): Row {
  const t = o.thickness
  return {
    id: [familyId, slug(designation), t !== undefined ? t.toFixed(1).replace('.', '_') : ''].filter(Boolean).join('-'),
    familyId,
    designation,
    kgPerM: kg,
    lengths: [6, 12],
    source: CAT,
    sample: false,
    ...o,
  }
}

/** Hollow sections: size with thickness/mass pairs, as printed. */
function hollow(familyId: string, size: string, pairs: [number, number][]): Row[] {
  return pairs.map(([t, kg]) => mk(familyId, size, kg, { thickness: t }))
}

const shs: Row[] = [
  ...hollow('shs', '40 x 40', [[2.5, 2.89], [3.0, 3.41], [4.0, 4.39]]),
  ...hollow('shs', '50 x 50', [[2.5, 3.68], [3.0, 4.35], [4.0, 5.64]]),
  ...hollow('shs', '60 x 60', [[3.0, 5.29], [4.0, 6.9]]),
  ...hollow('shs', '75 x 75', [[3.0, 6.6], [4.0, 8.59], [5.0, 10.5]]),
  ...hollow('shs', '80 x 80', [[4.0, 9.41], [5.0, 11.6], [6.0, 13.6]]),
  ...hollow('shs', '100 x 100', [[4.0, 11.9], [5.0, 14.7], [6.0, 17.4], [8.0, 22.6], [10.0, 27.4]]),
  ...hollow('shs', '150 x 150', [[5.0, 22.6], [6.0, 26.8], [8.0, 35.1], [10.0, 43.1]]),
  ...hollow('shs', '200 x 200', [[6.3, 38.0], [8.0, 47.7], [10.0, 58.8]]),
]

const rhs: Row[] = [
  ...hollow('rhs', '100 x 50', [[3.2, 7.13], [4.0, 8.78], [5.0, 10.8]]),
  ...hollow('rhs', '150 x 100', [[5.0, 18.6], [6.0, 22.1], [8.0, 28.9]]),
  ...hollow('rhs', '300 x 200', [[6.0, 45.7], [8.0, 60.3], [10.0, 74.5]]),
]

// EN 10255 Medium series, as printed (NB, wall, kg/m black).
const pipe: Row[] = (
  [
    [15, 2.6, 1.21], [20, 2.6, 1.56], [25, 3.2, 2.41], [32, 3.2, 3.1], [40, 3.2, 3.56], [50, 3.6, 5.03],
    [65, 3.6, 6.42], [80, 4.0, 8.36], [100, 4.5, 12.2], [125, 5.0, 16.6], [150, 5.0, 19.8],
  ] as const
).map(([nb, t, kg]) => mk('pipe-en10255', `${nb} NB`, kg, { thickness: t, lengths: [6] }))

const a53: Row[] = (
  [[50, 3.91, 5.44], [100, 6.02, 16.07], [150, 7.11, 28.26]] as const
).map(([nb, t, kg]) => mk('pipe-a53', `${nb} NB`, kg, { thickness: t, lengths: [6] }))

const ipe: Row[] = (
  [
    [100, 8.1], [120, 10.4], [140, 12.9], [160, 15.8], [180, 18.8], [200, 22.4], [220, 26.2], [240, 30.7],
    [270, 36.1], [300, 42.2], [330, 49.1], [360, 57.1], [400, 66.3], [450, 77.6], [500, 90.7], [550, 106], [600, 122],
  ] as const
).map(([h, kg]) => mk('ipe', String(h), kg))

const simple = (familyId: string, list: [string, number][], o: Opt = {}) =>
  list.map(([d, kg]) => mk(familyId, d, kg, o))

const hea = simple('hea', [['200 A', 42.3], ['300 A', 88.3], ['400 A', 125]])
const ub = simple('ub', [['305 x 165 x 40', 40.3], ['406 x 178 x 60', 60.1], ['533 x 210 x 82', 82.2], ['610 x 229 x 113', 113.0]])
const uc = simple('uc', [['152 x 152 x 23', 23.0], ['203 x 203 x 46', 46.1], ['254 x 254 x 89', 88.9], ['305 x 305 x 97', 96.9]])
const upn = simple('upn', [['100', 10.6], ['200', 25.3], ['300', 46.2]])
const pfc = simple('pfc', [['150 x 75 x 18', 17.9], ['230 x 90 x 32', 32.2]])
const eqa = simple('equal-angle', [['50 x 50 x 5', 3.77], ['75 x 75 x 6', 6.87], ['100 x 100 x 10', 15.0], ['150 x 150 x 12', 27.3]])
const uqa = simple('unequal-angle', [['100 x 75 x 8', 10.6], ['150 x 90 x 12', 21.6]])

// Flats: kg/m = w x t x 0.00785. Printed rows first, generated rows marked sample.
const flatPrinted: [number, number][] = [[50, 10], [75, 8], [100, 10], [200, 20]]
const flatGen: [number, number][] = [[25, 5], [40, 6], [50, 6], [65, 8], [100, 12], [150, 10]]
const flats: Row[] = [
  ...flatPrinted.map(([w, t]) => mk('ms-flat', `${w} x ${t}`, +(w * t * 0.00785).toFixed(2))),
  ...flatGen.map(([w, t]) => mk('ms-flat', `${w} x ${t}`, +(w * t * 0.00785).toFixed(2), { sample: true, source: 'Calculated' })),
].sort((a, b) => a.kgPerM! - b.kgPerM!)

// Round bar: kg/m = d² x 0.00617.
const rounds: Row[] = [12, 16, 20, 25, 32, 40, 50, 63, 75, 100].map((d) =>
  mk('round-bar', `${d} mm`, +(d * d * 0.00617).toFixed(2), [20, 32, 50, 100].includes(d) ? {} : { sample: true, source: 'Calculated' }),
)

// Plate: kg/m² = t x 7.85, per width.
const plates: Row[] = [4, 6, 8, 10, 12, 16, 20, 25, 30, 40, 50, 60].flatMap((t) =>
  [2, 2.5, 3.05].map((w) => ({
    id: `plate-${t}-${String(w).replace('.', '_')}`,
    familyId: 'plate',
    designation: `${t} mm x ${w.toFixed(2).replace(/0$/, '')} m`,
    thickness: t,
    kgPerM2: +(t * 7.85).toFixed(2),
    width: w,
    lengths: [6, 12],
    source: 'Calculated',
    sample: true,
  })),
)

// GI wire: sold per 25 kg coil.
const wire: Row[] = [1.6, 2.0, 2.5, 3.0, 4.0, 5.0].map((d) => ({
  id: `binding-wire-${String(d).replace('.', '_')}`,
  familyId: 'binding-wire',
  designation: `${d.toFixed(1)} mm`,
  thickness: d,
  kgPerPc: 25,
  lengths: [],
  source: CAT,
  sample: true,
}))

// Grating: 1 x 6 m panels, kg/panel = kg/m² x 6, as printed.
const grating: Row[] = (
  [
    ['20 x 3', 18.85, 14.6], ['20 x 5', 29.51, 22.45], ['25 x 3', 22.8, 17.55], ['30 x 3', 26.85, 20.5],
    ['30 x 5', 42.87, 32.27], ['32 x 5', 45.54, 34.24], ['40 x 3', 34.9, 26.4], ['40 x 5', 56.2, 42.1],
  ] as const
).flatMap(([bar, p30, p40]) =>
  ([['30 x 100', p30], ['40 x 100', p40]] as const).map(([pitch, kgm2]) => ({
    id: `ms-grating-${slug(bar)}-${slug(pitch)}`,
    familyId: 'ms-grating',
    designation: `${bar} bar, ${pitch} pitch`,
    kgPerM2: kgm2,
    kgPerPc: +(kgm2 * 6).toFixed(1),
    lengths: [],
    source: CAT,
    sample: false,
  })),
)

export const rows: Row[] = [
  ...shs, ...rhs, ...pipe, ...a53, ...ipe, ...hea, ...ub, ...uc, ...upn, ...pfc,
  ...eqa, ...uqa, ...flats, ...rounds, ...plates, ...wire, ...grating,
]

export const rowsInFamily = (familyId: string) => rows.filter((r) => r.familyId === familyId)
export const rowById = (id: string) => rows.find((r) => r.id === id)

/** Display name, e.g. "SHS 100 x 100 x 5.0", "Pipe 50 NB x 3.6", "IPE 200". */
export function rowLabel(row: Row): string {
  const f = familyById(row.familyId)
  const prefix = f?.prefix ?? ''
  if (row.familyId === 'plate' || row.familyId === 'binding-wire' || row.familyId === 'ms-grating') return `${prefix} ${row.designation}`
  if (row.thickness !== undefined) return `${prefix} ${row.designation} x ${row.thickness.toFixed(1)}`
  return `${prefix} ${row.designation}`
}

export const sizeCount = (familyIds: string[]) => rows.filter((r) => familyIds.includes(r.familyId)).length
