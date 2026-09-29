import { slots } from '../data/slots'

const files = import.meta.glob('../assets/images/*.{jpg,jpeg,webp,png,avif}', { eager: true, import: 'default', query: '?url' }) as Record<string, string>
const bySlot: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]),
)

export const hasImage = (slot: string) => !!bySlot[slot]

type Props = {
  slot: string
  tone?: 'heat' | 'none'
  /** Fill the parent box instead of holding the slot's ratio. */
  fill?: boolean
  alt?: string
  className?: string
  position?: string
}

/** Image slot: shows src/assets/images/<slot>.* when present, else a labelled steel panel. */
export function Placeholder({ slot, tone = 'none', fill, alt = '', className = '', position = 'center' }: Props) {
  const info = slots[slot]
  const url = bySlot[slot]
  const box = fill ? 'absolute inset-0' : 'relative w-full'
  const style = fill ? undefined : { aspectRatio: info?.ratio ?? '4/3' }
  return (
    <div className={`${box} overflow-hidden bg-gunmetal ${className}`} style={style}>
      {url ? (
        <img src={url} alt={alt} className="absolute inset-0 h-full w-full object-cover grayscale-[.15]" style={{ objectPosition: position }} loading="lazy" />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center bg-gunmetal"
          style={{
            backgroundImage:
              'var(--grain), repeating-linear-gradient(135deg, rgb(255 255 255 / .05) 0 1px, transparent 1px 14px), linear-gradient(160deg, #3a3f45, #23272b)',
          }}
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
        >
          <span className="px-3 text-center font-mono text-[11px] leading-4 tracking-wide text-silver">
            {slot} · {info?.ratio.replace('/', ':') ?? '?'} · {info?.min ?? ''}
          </span>
        </div>
      )}
      {tone === 'heat' && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: 'linear-gradient(160deg, rgb(26 18 16 / .35), rgb(192 40 27 / .35))' }}
        />
      )}
    </div>
  )
}
