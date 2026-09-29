import type { Spec } from './types'

// Credible values from the named standards. Reviewed flag lives on the family.
const en10025 = {
  chemical: [
    { grade: 'S235JR', values: { 'C max': '0.17', 'Mn max': '1.40', 'P max': '0.035', 'S max': '0.035', 'Cu max': '0.55' } },
    { grade: 'S275JR', values: { 'C max': '0.21', 'Mn max': '1.50', 'P max': '0.035', 'S max': '0.035', 'Cu max': '0.55' } },
    { grade: 'S355JR', values: { 'C max': '0.24', 'Mn max': '1.60', 'P max': '0.035', 'S max': '0.035', 'Cu max': '0.55' } },
    { grade: 'S355J2', values: { 'C max': '0.20', 'Mn max': '1.60', 'P max': '0.025', 'S max': '0.025', 'Cu max': '0.55' } },
  ],
  mechanical: [
    { grade: 'S235JR', values: { 'Yield min (MPa)': '235', 'Tensile (MPa)': '360 to 510', 'Elongation min': '26%', Impact: '27 J at 20 °C' } },
    { grade: 'S275JR', values: { 'Yield min (MPa)': '275', 'Tensile (MPa)': '410 to 560', 'Elongation min': '23%', Impact: '27 J at 20 °C' } },
    { grade: 'S355JR', values: { 'Yield min (MPa)': '355', 'Tensile (MPa)': '470 to 630', 'Elongation min': '22%', Impact: '27 J at 20 °C' } },
    { grade: 'S355J2', values: { 'Yield min (MPa)': '355', 'Tensile (MPa)': '470 to 630', 'Elongation min': '22%', Impact: '27 J at −20 °C' } },
  ],
}

const beamTol: [string, string][] = [
  ['Height', '±2 mm up to 180 mm, ±3 mm above'],
  ['Flange width', '±1 mm to ±4 mm by size'],
  ['Web thickness', '±0.5 mm to ±1.0 mm by size'],
  ['Straightness', '0.15% of length'],
  ['Mass', '±4% of the table value'],
  ['Length', '+100 / −0 mm on stock lengths'],
]

const hollow: Spec = {
  grades: ['S235JRH', 'S275J0H', 'S355J2H'],
  tolerances: [
    ['Outside dimensions', '±1%, minimum ±0.5 mm'],
    ['Wall thickness', '±10% up to 5 mm, ±0.5 mm above'],
    ['Squareness of sides', '90° ±1°'],
    ['Straightness', '0.15% of total length'],
    ['Mass', '±6% on individual lengths'],
    ['Length', '+150 / −0 mm on stock lengths'],
  ],
  chemical: [
    { grade: 'S235JRH', values: { 'C max': '0.17', 'Mn max': '1.40', 'P max': '0.040', 'S max': '0.040', 'Si max': '–' } },
    { grade: 'S275J0H', values: { 'C max': '0.20', 'Mn max': '1.50', 'P max': '0.035', 'S max': '0.035', 'Si max': '–' } },
    { grade: 'S355J2H', values: { 'C max': '0.22', 'Mn max': '1.60', 'P max': '0.030', 'S max': '0.030', 'Si max': '0.55' } },
  ],
  mechanical: [
    { grade: 'S235JRH', values: { 'Yield min (MPa)': '235', 'Tensile (MPa)': '360 to 510', 'Elongation min': '24%', Impact: '27 J at 20 °C' } },
    { grade: 'S275J0H', values: { 'Yield min (MPa)': '275', 'Tensile (MPa)': '410 to 560', 'Elongation min': '20%', Impact: '27 J at 0 °C' } },
    { grade: 'S355J2H', values: { 'Yield min (MPa)': '355', 'Tensile (MPa)': '470 to 630', 'Elongation min': '20%', Impact: '27 J at −20 °C' } },
  ],
  sample: true,
}

const sections: Spec = { grades: ['S275JR', 'S355JR', 'S355J2'], tolerances: beamTol, ...en10025, sample: true }

const specs: Record<string, Spec> = {
  shs: hollow,
  rhs: hollow,
  'pipe-en10255': {
    grades: ['S195T'],
    tolerances: [
      ['Outside diameter', 'Within the min and max in the table'],
      ['Wall thickness', '−10% on the specified wall'],
      ['Mass', '±4% on a lot of 10 t or more'],
      ['Straightness', '0.2% of total length'],
      ['Test pressure', '50 bar, every tube'],
      ['Length', '6 m random, +50 / −0 mm'],
    ],
    chemical: [{ grade: 'S195T', values: { 'C max': '0.20', 'Mn max': '1.40', 'P max': '0.035', 'S max': '0.030' } }],
    mechanical: [{ grade: 'S195T', values: { 'Yield min (MPa)': '195', 'Tensile (MPa)': '320 to 520', 'Elongation min': '20%', 'Bend test': 'Passes' } }],
    sample: true,
  },
  'pipe-a53': {
    grades: ['A53 Gr A', 'A53 Gr B'],
    tolerances: [['Outside diameter', '±1%'], ['Wall thickness', '−12.5%'], ['Mass', '±10%'], ['Length', '6 m single random']],
    chemical: [
      { grade: 'A53 Gr A', values: { 'C max': '0.25', 'Mn max': '0.95', 'P max': '0.05', 'S max': '0.045' } },
      { grade: 'A53 Gr B', values: { 'C max': '0.30', 'Mn max': '1.20', 'P max': '0.05', 'S max': '0.045' } },
    ],
    mechanical: [
      { grade: 'A53 Gr A', values: { 'Yield min (MPa)': '205', 'Tensile min (MPa)': '330' } },
      { grade: 'A53 Gr B', values: { 'Yield min (MPa)': '240', 'Tensile min (MPa)': '415' } },
    ],
    sample: true,
  },
  plate: {
    grades: ['S275JR', 'S355JR', 'A36'],
    tolerances: [
      ['Thickness', 'EN 10029 class A'],
      ['Width', '+20 / −0 mm'],
      ['Length', '+25 / −0 mm'],
      ['Flatness', 'Normal flatness, EN 10029'],
    ],
    chemical: [
      ...en10025.chemical.filter((c) => c.grade !== 'S235JR' && c.grade !== 'S355J2'),
      { grade: 'A36', values: { 'C max': '0.26', 'Mn max': '–', 'P max': '0.040', 'S max': '0.050', 'Cu max': '0.20' } },
    ],
    mechanical: [
      ...en10025.mechanical.filter((c) => c.grade !== 'S235JR' && c.grade !== 'S355J2'),
      { grade: 'A36', values: { 'Yield min (MPa)': '250', 'Tensile (MPa)': '400 to 550', 'Elongation min': '20%', Impact: '–' } },
    ],
    sample: true,
  },
  'binding-wire': {
    grades: ['Soft', 'Medium'],
    tolerances: [['Diameter', '±0.04 mm to ±0.08 mm by size'], ['Coil mass', '25 kg ±2%'], ['Zinc coating', 'Class A to D by order']],
    chemical: [],
    mechanical: [
      { grade: 'Soft', values: { 'Diameter (mm)': '1.60 to 6.00', 'Tensile (N/mm²)': '400 to 600' } },
      { grade: 'Medium', values: { 'Diameter (mm)': '1.60 to 6.00', 'Tensile (N/mm²)': '550 to 750' } },
    ],
    sample: false,
  },
  'ms-grating': {
    grades: ['ASTM A36', 'BS 4360 Gr 43A'],
    tolerances: [['Panel size', '1 x 6 m, ±3 mm'], ['Bearing bar pitch', '30 or 40 mm'], ['Cross bar pitch', '100 mm'], ['Finish', 'Black or hot-dip galvanized']],
    chemical: [{ grade: 'ASTM A36', values: { 'C max': '0.26', 'P max': '0.040', 'S max': '0.050', 'Cu max': '0.20' } }],
    mechanical: [{ grade: 'ASTM A36', values: { 'Yield min (MPa)': '250', 'Tensile (MPa)': '400 to 550' } }],
    sample: false,
  },
}

export const specFor = (familyId: string): Spec => specs[familyId] ?? sections
