import { ipeSection as s } from '../data/ipeSection'

const K = 1.9 // px per mm
const OX = 150, OY = 44
const X = (mm: number) => OX + mm * K
const Y = (mm: number) => OY + mm * K
const webR = (s.b + s.tw) / 2

function Dim({ d }: { d: string }) {
  return <path d={d} pathLength={1} className="sd" fill="none" stroke="currentColor" strokeWidth={1} />
}

/** IPE 200 section with dimension lines. Draws on scroll. Numbers come from the catalogue row. */
export function SectionDrawing({ compact = false }: { compact?: boolean }) {
  const midY = Y(s.h / 2)
  const rPt = [X(56.3), Y(s.h - 12)] // middle of the top-right root fillet (y flipped)
  return (
    <svg viewBox={compact ? '90 20 260 470' : '0 0 640 500'} className="w-full text-gunmetal" role="img" aria-label={`IPE 200 section: depth ${s.h} mm, width ${s.b} mm, web ${s.tw} mm, flange ${s.tf} mm, root radius ${s.r} mm, ${s.kgPerM} kg per metre`}>
      <g transform={`translate(${OX} ${OY}) scale(${K})`}>
        <path d={s.d} className="sd-fade" fill="var(--color-mist)" />
        <path d={s.d} pathLength={1} className="sd" fill="none" stroke="currentColor" strokeWidth={2.4 / K} strokeLinejoin="miter" />
      </g>
      {!compact && (
        <g className="sd-fade" fontFamily="var(--font-mono)" fontSize="15" fill="currentColor">
          <text x={OX - 62} y={midY} textAnchor="middle" transform={`rotate(-90 ${OX - 62} ${midY})`}>{s.h}</text>
          <text x={X(s.b / 2)} y={OY + s.h * K + 68} textAnchor="middle">{s.b}</text>
          <text x={X(s.b) + 150} y={midY + 5}>tw {s.tw}</text>
          <text x={X(s.b) + 150} y={Y(s.tf / 2) + 32}>tf {s.tf}</text>
          <text x={X(s.b) + 150} y={rPt[1] + 62}>r {s.r}</text>
        </g>
      )}
      {!compact && (
        <>
          {/* depth */}
          <Dim d={`M${OX - 8} ${OY} H${OX - 50} M${OX - 8} ${OY + s.h * K} H${OX - 50} M${OX - 42} ${OY} V${OY + s.h * K} M${OX - 47} ${OY + 5} L${OX - 37} ${OY - 5} M${OX - 47} ${OY + s.h * K + 5} L${OX - 37} ${OY + s.h * K - 5}`} />
          {/* width */}
          <Dim d={`M${OX} ${OY + s.h * K + 8} V${OY + s.h * K + 52} M${X(s.b)} ${OY + s.h * K + 8} V${OY + s.h * K + 52} M${OX} ${OY + s.h * K + 44} H${X(s.b)} M${OX - 5} ${OY + s.h * K + 49} L${OX + 5} ${OY + s.h * K + 39} M${X(s.b) - 5} ${OY + s.h * K + 49} L${X(s.b) + 5} ${OY + s.h * K + 39}`} />
          {/* leaders */}
          <Dim d={`M${X(webR) - 2} ${midY} H${X(s.b) + 140}`} />
          <Dim d={`M${X(s.b) - 4} ${Y(s.tf / 2)} H${X(s.b) + 60} L${X(s.b) + 90} ${Y(s.tf / 2) + 28} H${X(s.b) + 140}`} />
          <Dim d={`M${rPt[0]} ${rPt[1]} L${rPt[0] + 40} ${rPt[1] + 58} H${X(s.b) + 140}`} />
        </>
      )}
    </svg>
  )
}
