import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Quote } from '../data/types'
import { useBasket } from './basket'

type Demo = {
  quote: Quote | null
  presenter: boolean
  showSample: boolean
  drawerOpen: boolean
  waText: string | null
  setQuote: (q: Quote | null) => void
  togglePresenter: () => void
  toggleSample: () => void
  openDrawer: (open: boolean) => void
  openWhatsApp: (text: string | null) => void
}

export const useDemo = create<Demo>()(
  persist(
    (set) => ({
      quote: null,
      presenter: false,
      showSample: false,
      drawerOpen: false,
      waText: null,
      setQuote: (quote) => set({ quote }),
      togglePresenter: () => set((s) => ({ presenter: !s.presenter })),
      toggleSample: () => set((s) => ({ showSample: !s.showSample })),
      openDrawer: (drawerOpen) => set({ drawerOpen }),
      openWhatsApp: (waText) => set({ waText }),
    }),
    {
      name: 'mj-demo',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ quote: s.quote, presenter: s.presenter, showSample: s.showSample }),
    },
  ),
)

/** Seeds one line from each showcase family (demo path E8). */
export function fillBasket() {
  const b = useBasket.getState()
  b.clear()
  b.add('shs-100-x-100-5_0', 24, 'pcs', 6)
  b.add('shs-50-x-50-3_0', 40, 'pcs', 6)
  b.add('pipe-en10255-50-nb-3_6', 60, 'pcs', 6)
  b.add('ipe-200', 12, 'pcs', 12)
  const first = useBasket.getState().lines[0]
  if (first) b.update(first.id, { grade: 'S355J2H' })
}

export const newRef = () => `MJ-Q-2026-${String(Math.floor(1000 + Math.random() * 9000))}`
