// Sample sizes for the 17 families. All lengths in mm. Source: MJ_Icon_Geometry_and_Placement_v1.md section 3
// and the MJ catalogue kg/m. `cat` is the catalogue mass in kg/m. `test: false` means illustrative (no area test).
// `exception` names a documented miss of the 1% area test. Not a blocker, listed for the real build.
export const specs = [
  { id: 'shs', label: 'SHS 100 x 100 x 5', kind: 'rhs', w: 100, h: 100, t: 5, ro: 2.0, ri: 1.0, cat: 14.7,
    exception: 'Corner radius open (EN 10219-2). 2.0T outer is the default. 1.5T gives -0.8%' },
  { id: 'rhs', label: 'RHS 100 x 50 x 5', kind: 'rhs', w: 100, h: 50, t: 5, ro: 2.0, ri: 1.0, cat: 10.8,
    exception: 'Corner radius open (EN 10219-2). Same default as SHS' },
  { id: 'pipe-en10255', label: 'Pipe 2" Medium', kind: 'pipe', od: 60.3, t: 3.6, cat: 5.03 },
  { id: 'pipe-a53', label: 'Pipe 2" Sch 40', kind: 'pipe', od: 60.3, t: 3.91, cat: 5.44 },
  { id: 'ipe', label: 'IPE 200', kind: 'ibeam', h: 200, b: 100, tw: 5.6, tf: 8.5, r: 12, cat: 22.4 },
  { id: 'hea', label: 'HE 200 A', kind: 'ibeam', h: 190, b: 200, tw: 6.5, tf: 10.0, r: 18, cat: 42.3 },
  { id: 'ub', label: 'UB 254 x 146 x 31', kind: 'ibeam', h: 251.4, b: 146.1, tw: 6.0, tf: 8.6, r: 7.6, cat: 31.1 },
  { id: 'uc', label: 'UC 203 x 203 x 46', kind: 'ibeam', h: 203.2, b: 203.6, tw: 7.2, tf: 11.0, r: 10.2, cat: 46.1 },
  { id: 'upn', label: 'UPN 200', kind: 'channel', h: 200, b: 75, tw: 8.5, tf: 11.5, r: 11.5, r2: 6.0, slope: 0.08, cat: 25.3 },
  { id: 'pfc', label: 'PFC 200 x 90 x 30', kind: 'channel', h: 200, b: 90, tw: 7.0, tf: 14.0, r: 12, r2: 0, slope: 0, cat: 29.7 },
  { id: 'equal-angle', label: 'L 100 x 100 x 10', kind: 'angle', a: 100, b: 100, t: 10, r1: 12, r2: 6, cat: 15.0 },
  { id: 'unequal-angle', label: 'L 100 x 75 x 8', kind: 'angle', a: 100, b: 75, t: 8, r1: 10, r2: 5, cat: 10.6 },
  { id: 'ms-flat', label: 'Flat 40 x 10', kind: 'solid-rect', w: 40, h: 10, cat: 3.14 },
  { id: 'round-bar', label: 'Round bar 16', kind: 'solid-round', d: 16, cat: 1.58 },
  // Illustrative: no catalogue drawing. Plate thickness is exaggerated and the piece is cut short.
  { id: 'plate', label: 'Plate 12 mm', kind: 'plate', w: 100, h: 14, len: 100, test: false },
  { id: 'binding-wire', label: 'GI wire coil', kind: 'coil', od: 100, bore: 50, len: 55, test: false },
  { id: 'ms-grating', label: 'MS grating 30 x 100', kind: 'grating', bars: 5, pitch: 26, bt: 7, bh: 30, len: 130, test: false },
]
