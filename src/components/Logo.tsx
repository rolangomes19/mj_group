import svg from '../assets/logo/mj-monogram.svg?raw'
import { t } from '../copy/en'

const sized = svg.replace('<svg', '<svg height="100%" width="100%" aria-hidden="true" focusable="false"')

export function Monogram({ height = 40, className = '' }: { height?: number; className?: string }) {
  return <span className={`inline-block shrink-0 ${className}`} style={{ height, width: (height * 47) / 31 }} dangerouslySetInnerHTML={{ __html: sized }} />
}

export function Lockup({ height = 40, className = '', nameClass = '' }: { height?: number; className?: string; nameClass?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram height={height} />
      <span className={`font-display leading-none ${nameClass}`}>{t.brand}</span>
    </span>
  )
}
