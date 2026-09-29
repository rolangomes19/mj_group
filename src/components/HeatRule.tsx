export function HeatRule({ animate = false, light = false, className = '' }: { animate?: boolean; light?: boolean; className?: string }) {
  return <div aria-hidden className={`${light ? 'heat-rule-light' : 'heat-rule'} ${animate ? 'draw' : ''} ${className}`} />
}
