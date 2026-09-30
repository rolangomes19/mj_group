// Shapes match the reference (section 11 + v1.3 amendments) so real data can drop in later.

export type StandardKey =
  | 'EN10219' | 'EN10255' | 'BS4' | 'ASTM-A53' | 'ASTM-A36' | 'EURONORM' | 'DIN' | 'JIS' | 'BS4848' | 'EN10025'

export type Group = {
  id: string
  name: string
  use: string
  /** Family whose drawing leads the group tile. */
  lead: string
}

export type Spec = {
  grades: string[]
  tolerances: [string, string][]
  chemical: { grade: string; values: Record<string, string> }[]
  mechanical: { grade: string; values: Record<string, string> }[]
  sample: boolean
}

export type Family = {
  id: string
  groupId: string
  name: string
  /** Short prefix used in designations and search, e.g. "SHS", "IPE". */
  prefix: string
  standard: string
  standardKey: StandardKey
  use: string
  explainer: string[]
  industries: string[]
  reviewed?: string
  /** Mass column is kg/m² (plate) or kg/pc (panels, coils) instead of kg/m. */
  massBasis?: 'm' | 'm2' | 'pc'
  pcLabel?: string
  showcase?: boolean
  sample: boolean
}

export type Row = {
  id: string
  familyId: string
  designation: string
  thickness?: number
  kgPerM?: number
  kgPerM2?: number
  /** Plate width in metres. */
  width?: number
  /** Mass of one piece for sheet, panel and coil items. */
  kgPerPc?: number
  lengths: number[]
  grade?: string
  source?: string
  sample?: boolean
}

export type Unit = 'pcs' | 'm' | 't'

export type Line = {
  id: string
  rowId: string
  qty: number
  unit: Unit
  length: number
  grade?: string
}

export type QuoteLine = {
  designation: string
  qty: number
  unit: Unit
  length: number
  grade?: string
  weightKg: number
}

export type Quote = {
  ref: string
  createdAt: string
  lines: QuoteLine[]
  totalKg: number
  emirate: string
  neededBy?: string
  contact: { name: string; company?: string; mobile?: string; email?: string; trn?: string }
  notes?: string
  mtc: boolean
  boqName?: string
  sample: boolean
}

export type TimelineEntry = {
  year: number
  type: 'founder' | 'group' | 'steel'
  title: string
  body: string
  slot?: string
  link?: { to: string; label: string }
  sample: boolean
  source: string
}

export type Industry = {
  id: string
  name: string
  icon: string
  photo?: string
  line: string
}
