import { useDemo } from '../state/demo'

/** Presenter-only mark for sample records. Off by default (v1.3 F1). */
export function SampleChip({ sample = true }: { sample?: boolean }) {
  const show = useDemo((s) => s.showSample)
  if (!show || !sample) return null
  return <span className="ms-2 inline-block border border-current px-1 align-middle font-mono text-[10px] leading-4 tracking-widest opacity-80">SAMPLE</span>
}
