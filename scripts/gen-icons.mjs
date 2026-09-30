// Generates product icons (files A and B) from catalogue dimensions, and runs the area test.
//   node scripts/gen-icons.mjs
// Faces are separate shapes so CSS can recolour cold and hot. See MJ_Icon_Geometry_and_Placement_v1.md.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { specs } from './icon-spec.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/assets/product-icons')
const STEEL_T_M3 = 7.85
const W = 240, H = 180, MARGIN = 16, FRONT_LONG = 0.4 * W
const ANG = (40 * Math.PI) / 180
const C = Math.cos(ANG), S = Math.sin(ANG)
const COL = { front: '#E4E7EA', long: '#C9CED3', deep: '#9AA1A8', shadow: '#9AA1A8', line: '#2B2F33' }
const HEAT = [['0', '#F08A3C'], ['.28', '#C0281B'], ['.52', '#B87333'], ['.78', '#9AA1A8'], ['1', '#C9CED3']]
const r2 = (n) => Math.round(n * 100) / 100

// ---------- contour helpers (math coordinates, y up, counter-clockwise) ----------
const unit = (v) => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l] }
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]

/** Round the corners of a closed polygon. radii[i] = 0 keeps vertex i sharp. */
function roundPoly(pts, radii) {
  const out = []
  const n = pts.length
  for (let i = 0; i < n; i++) {
    const p = pts[i], r = radii[i] || 0
    if (!r) { out.push(p); continue }
    const v1 = unit(sub(pts[(i + n - 1) % n], p)), v2 = unit(sub(pts[(i + 1) % n], p))
    const th = Math.acos(Math.max(-1, Math.min(1, v1[0] * v2[0] + v1[1] * v2[1])))
    const t = r / Math.tan(th / 2)
    const bis = unit([v1[0] + v2[0], v1[1] + v2[1]])
    const c = [p[0] + (bis[0] * r) / Math.sin(th / 2), p[1] + (bis[1] * r) / Math.sin(th / 2)]
    const t1 = [p[0] + v1[0] * t, p[1] + v1[1] * t], t2 = [p[0] + v2[0] * t, p[1] + v2[1] * t]
    const a1 = Math.atan2(t1[1] - c[1], t1[0] - c[0])
    let d = Math.atan2(t2[1] - c[1], t2[0] - c[0]) - a1
    while (d > Math.PI) d -= 2 * Math.PI
    while (d < -Math.PI) d += 2 * Math.PI
    const steps = Math.max(6, Math.ceil(Math.abs(d) / (Math.PI / 2) * 24))
    for (let k = 0; k <= steps; k++) out.push([c[0] + r * Math.cos(a1 + (d * k) / steps), c[1] + r * Math.sin(a1 + (d * k) / steps)])
  }
  return out
}
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
const circle = (cx, cy, r, n = 120) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / n), cy + r * Math.sin((2 * Math.PI * i) / n)])
const area = (pts) => pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + (p[0] * q[1] - q[0] * p[1]) }, 0) / 2

// ---------- sections: each returns solids {contour, holes, z0, z1, finite, order} ----------
// k multiplies thickness only (file B). Outer sizes and radii stay true.
function solids(s, k = 1) {
  const endless = { z0: 0, z1: Infinity, finite: false }
  switch (s.kind) {
    case 'ibeam': {
      const { h, b, r } = s, tw = s.tw * k, tf = s.tf * k, x0 = (b - tw) / 2, x1 = (b + tw) / 2
      const p = [[0, 0], [b, 0], [b, tf], [x1, tf], [x1, h - tf], [b, h - tf], [b, h], [0, h], [0, h - tf], [x0, h - tf], [x0, tf], [0, tf]]
      return [{ contour: roundPoly(p, [0, 0, 0, r, r, 0, 0, 0, 0, r, r, 0]), ...endless }]
    }
    case 'channel': {
      const { h, b, r, r2: rt } = s, tw = s.tw * k, tf = s.tf * k, sl = s.slope
      const t = (x) => tf + sl * (b / 2 - x) * 1 // thickness at x from the web back, nominal at b/2
      const tr = t(tw), tt = t(b)
      const p = [[0, 0], [b, 0], [b, tt], [tw, tr], [tw, h - tr], [b, h - tt], [b, h], [0, h]]
      return [{ contour: roundPoly(p, [0, 0, rt, r, r, rt, 0, 0]), ...endless }]
    }
    case 'angle': {
      const { a, b, r1, r2: rt } = s, t = s.t * k
      const p = [[0, 0], [a, 0], [a, t], [t, t], [t, b], [0, b]]
      return [{ contour: roundPoly(p, [0, 0, rt, r1, rt, 0]), ...endless }]
    }
    case 'rhs': {
      const { w, h } = s, t = s.t * k
      const ro = s.ro * s.t, ri = s.ri * s.t * (k === 1 ? 1 : 1) // outer radius fixed by the true wall
      const outer = roundPoly(rect(0, 0, w, h), [ro, ro, ro, ro])
      const inner = roundPoly(rect(t, t, w - t, h - t), [ri, ri, ri, ri])
      return [{ contour: outer, holes: [inner], ...endless }]
    }
    case 'pipe': {
      const t = s.t * k
      return [{ contour: circle(s.od / 2, s.od / 2, s.od / 2), holes: [circle(s.od / 2, s.od / 2, s.od / 2 - t)], ...endless }]
    }
    case 'solid-rect': return [{ contour: rect(0, 0, s.w, s.h), ...endless }]
    case 'solid-round': return [{ contour: circle(s.d / 2, s.d / 2, s.d / 2), ...endless }]
    case 'plate': return [{ contour: rect(0, 0, s.w, s.h), z0: 0, z1: s.len, finite: true }]
    case 'coil': {
      const c = s.od / 2
      return [{ contour: circle(c, c, c), holes: [circle(c, c, s.bore / 2)], z0: 0, z1: s.len, finite: true, rings: [0.62, 0.74, 0.86].map((f) => c * f) }]
    }
    case 'grating': {
      const list = []
      for (let i = 0; i < s.bars; i++) list.push({ contour: rect(i * s.pitch, 0, i * s.pitch + s.bt, s.bh), z0: 0, z1: s.len, finite: true, order: 1 })
      const wTot = (s.bars - 1) * s.pitch + s.bt
      for (const z of [s.len * 0.06, s.len - 22]) list.push({ contour: rect(0, s.bh - 9, wTot, s.bh), z0: z, z1: z + 8, finite: true, order: 2 - z / 1000 })
      return list
    }
  }
  throw new Error('kind ' + s.kind)
}

const bbox = (list) => {
  const pts = list.flatMap((o) => o.contour)
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1])
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}

// ---------- drawing ----------
const path = (pts) => 'M' + pts.map((p) => r2(p[0]) + ' ' + r2(p[1])).join('L') + 'Z'
const seg = (l) => 'M' + l.map((p) => r2(p[0]) + ' ' + r2(p[1])).join('L')

function draw(spec, k, variant) {
  const list = solids(spec, k)
  const bb = bbox(solids(spec, 1)) // scale from the true outer size so A and B share one frame
  const sc = FRONT_LONG / Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0)
  const ox = MARGIN - bb.x0 * sc, oy = H - MARGIN + bb.y0 * sc
  const P = (x, y, z) => [ox + sc * (x + z * C), oy - sc * (y + z * S)]
  const farZ = 320 / sc // long enough to leave the frame
  const id = `${spec.id}-${variant}`
  const strokeW = variant === 'a' ? 1.2 : 2.3
  const solidsOut = []
  for (const so of list) {
    const z1 = so.finite ? so.z1 : farZ
    const c = so.contour, n = c.length
    const nrm = (i) => { const e = unit(sub(c[(i + 1) % n], c[i])); return [e[1], -e[0]] }
    const vis = (i) => { const m = nrm(i); return m[0] * C + m[1] * S > 1e-6 }
    const items = []
    for (let i = 0; i < n; i++) {
      if (!vis(i)) continue
      const p = c[i], q = c[(i + 1) % n], m = nrm(i)
      items[i] = {
        role: m[1] >= m[0] * 0.85 ? 'long' : 'deep',
        pts: [P(...p, so.z0), P(...q, so.z0), P(...q, z1), P(...p, z1)],
        key: ((p[0] + q[0]) / 2) * C + ((p[1] + q[1]) / 2) * S,
        edges: so.finite ? [[P(...p, z1), P(...q, z1)]] : [],
      }
    }
    // Ridge lines run along the extrusion. They belong to the face drawn last on either side.
    for (let i = 0; i < n; i++) {
      const prev = (i + n - 1) % n
      const dot = nrm(prev)[0] * nrm(i)[0] + nrm(prev)[1] * nrm(i)[1]
      const turn = Math.acos(Math.max(-1, Math.min(1, dot)))
      const v1 = vis(prev), v2 = vis(i)
      if (!(v1 !== v2 || (v1 && v2 && turn > 0.45))) continue
      const owner = v1 && v2 ? (items[prev].key > items[i].key ? items[prev] : items[i]) : v1 ? items[prev] : items[i]
      owner.edges.push([P(...c[i], so.z0), P(...c[i], z1)])
    }
    solidsOut.push({ so, items: items.filter(Boolean).sort((a, b) => a.key - b.key) })
  }
  // Painter: back to front. Grating sets `order`. Others keep list order.
  solidsOut.sort((a, b) => (b.so.order ?? 0) - (a.so.order ?? 0) || b.so.z0 - a.so.z0)

  const fb = bbox(solids(spec, 1))
  const [cx, cy] = P((fb.x0 + fb.x1) / 2, (fb.y0 + fb.y1) / 2, 0)
  const defs = `<linearGradient id="${id}-hl" gradientUnits="userSpaceOnUse" x1="${r2(cx)}" y1="${r2(cy)}" x2="${r2(cx + C * 300)}" y2="${r2(cy - S * 300)}">${HEAT.map(([o, col]) => `<stop offset="${o}" stop-color="${col}"/>`).join('')}</linearGradient>` +
    `<radialGradient id="${id}-hf" gradientUnits="userSpaceOnUse" cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(FRONT_LONG * 0.75)}"><stop offset="0" stop-color="#F08A3C"/><stop offset="1" stop-color="#C0281B"/></radialGradient>`

  const frontD = (so) => path(so.contour.map((p) => P(...p, so.z0)))
  const holeD = (so) => (so.holes || []).map((h) => path(h.map((p) => P(...p, so.z0)))).join('')
  const lineAttr = `fill="none" stroke="${COL.line}" stroke-linejoin="miter" stroke-linecap="round"`
  const body = solidsOut.map(({ so, items }, si) => {
    let out = ''
    // merge consecutive faces of one role into one path, keep order
    let g = null
    const groups = []
    for (const it of items) { if (g && g.role === it.role) { g.pts.push(it.pts); g.edges.push(...it.edges) } else { g = { role: it.role, pts: [it.pts], edges: [...it.edges] }; groups.push(g) } }
    for (const gr of groups) {
      const d = gr.pts.map(path).join('')
      out += `<path class="f-${gr.role}" fill="${COL[gr.role]}" stroke="${COL[gr.role]}" stroke-width=".4" stroke-linejoin="round" d="${d}"/>`
      if (gr.role === 'long') out += `<path class="hot" opacity="0" fill="url(#${id}-hl)" stroke="url(#${id}-hl)" stroke-width=".4" stroke-linejoin="round" d="${d}"/>`
      if (gr.edges.length) out += `<path class="f-line" ${lineAttr} stroke-width="${r2(strokeW)}" d="${gr.edges.map(seg).join('')}"/>`
    }
    out += `<path class="f-front" fill="${COL.front}" d="${frontD(so)}"/><path class="hot" opacity="0" fill="url(#${id}-hf)" d="${frontD(so)}"/>`
    if (so.holes) out += `<path class="f-bore" fill="${COL.deep}" d="${holeD(so)}"/>`
    const bx = bbox([so]), mx = (bx.x0 + bx.x1) / 2, my = (bx.y0 + bx.y1) / 2
    for (const rr of so.rings || []) out += `<path class="f-ring" ${lineAttr} stroke-width=".5" d="${path(circle(mx, my, rr, 72).map((p) => P(...p, so.z0)))}"/>`
    // Front outline is stroked inside the edge (clipped to the front shape), so outer sizes stay true.
    out += `<clipPath id="${id}-c${si}"><path d="${frontD(so)}"/></clipPath>`
    out += `<path class="f-line" clip-path="url(#${id}-c${si})" ${lineAttr} stroke-width="${r2(strokeW * 2)}" d="${frontD(so)}"/>`
    if (so.holes) out += `<path class="f-line" ${lineAttr} stroke-width="${r2(strokeW)}" d="${holeD(so)}"/>`
    return out
  }).join('')
  const shadow = solidsOut.map(({ so, items }) => `<path class="f-shadow" fill="${COL.shadow}" transform="translate(3 3)" d="${items.map((i) => path(i.pts)).join('')}${frontD(so)}"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" data-label="${spec.label}"><defs>${defs}</defs><g class="pi-shadow">${shadow}</g>${body}</svg>\n`
}

// ---------- area test ----------
const testable = (s) => s.test !== false
function massKgPerM(s) {
  const so = solids(s, 1)[0]
  const a = Math.abs(area(so.contour)) - (so.holes || []).reduce((t, h) => t + Math.abs(area(h)), 0)
  return { area: a, kg: (a * STEEL_T_M3) / 1000 }
}

mkdirSync(outDir, { recursive: true })
const rows = []
let fail = 0
for (const s of specs) {
  // File B factor: web or wall at least 2.5 px and flange at least 3 px at 128 px wide.
  let k = 1
  const thin = s.tw ?? s.t
  if (thin && !['solid-rect', 'solid-round', 'plate'].includes(s.kind)) {
    const bb = bbox(solids(s, 1)), sc = FRONT_LONG / Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0), px = 128 / W
    k = Math.max(1, (2.5 / px) / (thin * sc), s.tf ? (3 / px) / (s.tf * sc) : 1)
    k = Math.round(k * 100) / 100
  }
  writeFileSync(join(outDir, `${s.id}.a.svg`), draw(s, 1, 'a'))
  writeFileSync(join(outDir, `${s.id}.b.svg`), draw(s, k, 'b'))
  if (!testable(s)) { rows.push({ s, k, note: 'illustrative' }); continue }
  const m = massKgPerM(s)
  const diff = ((m.kg - s.cat) / s.cat) * 100
  const ok = Math.abs(diff) <= 1
  const note = ok ? 'pass' : s.exception ? 'exception' : 'FAIL'
  if (note === 'FAIL') fail++
  rows.push({ s, k, m, diff, note })
}

// File B ordering (thickness rules from the Geometry file, section 6).
const th = (id, f) => { const s = specs.find((x) => x.id === id), r = rows.find((x) => x.s.id === id); return s[f] * r.k }
const order = [
  ['IPE flange above web', th('ipe', 'tf') > th('ipe', 'tw')],
  ['HEA flange above IPE flange', th('hea', 'tf') > th('ipe', 'tf')],
  ['A53 wall above EN 10255 wall', th('pipe-a53', 't') > th('pipe-en10255', 't')],
  ['PFC flange above UPN flange', th('pfc', 'tf') > th('upn', 'tf')],
]
order.forEach(([n, ok]) => { if (!ok) { fail++; console.log('ORDER FAIL:', n) } })

const line = (r) => `| ${r.s.id} | ${r.s.label} | ${r.m ? r.m.kg.toFixed(2) : ''} | ${r.s.cat ?? ''} | ${r.diff !== undefined ? (r.diff > 0 ? '+' : '') + r.diff.toFixed(1) + '%' : ''} | ${r.note}${r.s.exception ? ': ' + r.s.exception : ''} | ${r.k} |`
const md = ['# Icon area test', '', `Generated by scripts/gen-icons.mjs. Steel ${STEEL_T_M3} t/m3. Pass is within 1% of catalogue kg/m.`, '',
  '| Family | Sample | Calculated kg/m | Catalogue kg/m | Difference | Result | File B factor |', '| --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map(line), '', '## File B thickness order', '', ...order.map(([n, ok]) => `- ${n}: ${ok ? 'pass' : 'FAIL'}`), ''].join('\n')
writeFileSync(join(root, 'scripts/area-report.md'), md)
console.log(md)
process.exit(fail ? 1 : 0)
