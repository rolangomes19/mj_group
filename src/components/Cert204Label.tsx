/** EN 10204 3.1 is a document type, not a scheme. Plain label, no seal. */
export function Cert204Label({ size = 96 }: { size?: number }) {
  return (
    <svg viewBox="0 0 96 96" width={size} height={size} role="img" aria-label="EN 10204 3.1 label">
      <defs>
        <linearGradient id="cert204-heat" x1="0" x2="1">
          <stop offset="0" stopColor="#F08A3C" />
          <stop offset=".28" stopColor="#C0281B" />
          <stop offset=".52" stopColor="#B87333" />
          <stop offset=".78" stopColor="#9AA1A8" />
          <stop offset="1" stopColor="#C9CED3" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="94" height="94" fill="none" stroke="#7A0000" strokeWidth="2" />
      <rect x="6" y="6" width="84" height="84" fill="none" stroke="#7A0000" strokeWidth="1" />
      <text x="48" y="28" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" fontSize="14" fill="#7A0000">EN 10204</text>
      <text x="48" y="68" textAnchor="middle" fontFamily="var(--font-display)" fontSize="44" fill="#7A0000">3.1</text>
      <rect x="14" y="76" width="68" height="2" fill="url(#cert204-heat)" />
    </svg>
  )
}
