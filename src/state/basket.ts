import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { rowById } from '../data/rows'
import type { Line, Unit } from '../data/types'
import { lineWeightKg } from '../data/weight'

type Basket = {
  lines: Line[]
  mtc: boolean
  notes: string
  boqName: string
  bumpKey: number
  add: (rowId: string, qty: number, unit: Unit, length: number, grade?: string) => void
  update: (id: string, patch: Partial<Line>) => void
  remove: (id: string) => void
  set: (patch: Partial<Pick<Basket, 'mtc' | 'notes' | 'boqName'>>) => void
  clear: () => void
}

const uid = () => Math.random().toString(36).slice(2, 9)

export const useBasket = create<Basket>()(
  persist(
    (set) => ({
      lines: [],
      mtc: true,
      notes: '',
      boqName: '',
      bumpKey: 0,
      // Same row at the same length and unit adds to the existing line.
      add: (rowId, qty, unit, length, grade = '') =>
        set((s) => {
          const hit = s.lines.find((l) => l.rowId === rowId && l.length === length && l.unit === unit && (l.grade ?? '') === grade)
          const lines = hit
            ? s.lines.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { id: uid(), rowId, qty, unit, length, grade }]
          return { lines, bumpKey: s.bumpKey + 1 }
        }),
      update: (id, patch) => set((s) => ({ lines: s.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      set: (patch) => set(patch),
      clear: () => set({ lines: [], notes: '', boqName: '', mtc: true }),
    }),
    { name: 'mj-basket', storage: createJSONStorage(() => sessionStorage), partialize: ({ bumpKey: _b, ...s }) => s },
  ),
)

export function basketTotalKg(lines: Line[]): number {
  return lines.reduce((sum, l) => {
    const row = rowById(l.rowId)
    return row ? sum + lineWeightKg(l, row) : sum
  }, 0)
}

/** Step 1 can continue with lines, a file, or notes of 10+ characters. */
export const canContinue = (b: Pick<Basket, 'lines' | 'boqName' | 'notes'>) =>
  b.lines.length > 0 || !!b.boqName || b.notes.trim().length >= 10
