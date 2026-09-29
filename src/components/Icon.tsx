const raw = import.meta.glob('../assets/icons/*.svg', { eager: true, import: 'default', query: '?raw' }) as Record<string, string>
const icons: Record<string, string> = Object.fromEntries(
  Object.entries(raw).map(([path, svg]) => [
    path.split('/').pop()!.replace('.svg', ''),
    // Strip colour attributes so currentColor wins.
    svg.replace(/\s(fill|stroke)="(?!none)[^"]*"/g, (_m, a) => ` ${a}="currentColor"`).replace(/<svg/, '<svg width="100%" height="100%"'),
  ]),
)

/** Icon slot: src/assets/icons/<name>.svg, else a labelled outline square. */
export function Icon({ name, size = 40, className = '' }: { name: string; size?: number; className?: string }) {
  const svg = icons[name]
  if (svg) return <span aria-hidden className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: svg }} />
  const letters = name.replace(/^(group|step|proof|ind|fam)-/, '').slice(0, 2).toUpperCase()
  return (
    <span
      aria-hidden
      title={name}
      className={`inline-grid shrink-0 place-items-center border border-current font-mono opacity-80 ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.28) }}
    >
      {letters}
    </span>
  )
}
