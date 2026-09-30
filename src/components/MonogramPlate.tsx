import { HeatRule } from './HeatRule'

/** Stand-in for a portrait: gunmetal plate, two initials, heat rule at the base. */
export function MonogramPlate({ initials, label }: { initials: string; label: string }) {
  return (
    <div role="img" aria-label={label} className="on-dark relative grid aspect-square w-full place-items-center overflow-hidden bg-gunmetal">
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(70% 60% at 50% 110%, rgb(240 138 60 / .28), rgb(192 40 27 / .14) 45%, transparent 75%)' }} />
      <span aria-hidden className="font-display relative text-[120px] leading-[128px] text-cream">{initials}</span>
      <HeatRule className="absolute inset-x-0 bottom-0" />
    </div>
  )
}
