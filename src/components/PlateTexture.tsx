type Props = { at?: string; rx?: string; ry?: string; className?: string }

/** Chequered-plate lozenges laid inside an existing surface. They glow near `at` and dissolve outward. Adds no height. */
export function PlateTexture({ at = '50% 100%', rx = '70%', ry = '100%', className = '' }: Props) {
  return <div aria-hidden className={`plate pointer-events-none absolute ${className}`} style={{ '--plate-at': at, '--plate-rx': rx, '--plate-ry': ry } as React.CSSProperties} />
}
