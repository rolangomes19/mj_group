// Image slot registry (reference 8.3). <Placeholder slot> needs only the name.
type Slot = { ratio: string; min: string; subject: string }

const tile = (subject: string): Slot => ({ ratio: '4/3', min: '1200 w', subject })
const ind = (subject: string): Slot => ({ ratio: '3/2', min: '1200 w', subject })

export const slots: Record<string, Slot> = {
  'hero-yard': { ratio: '16/9', min: '2400 w', subject: 'Yard or warehouse, stacked steel' },
  'tile-pipes': tile('Pipes and tubes'),
  'tile-structural': tile('Beams and columns'),
  'tile-channels': tile('Channels'),
  'tile-angles': tile('Angles'),
  'tile-flat-long': tile('Bars and flats'),
  'tile-plate-sheet': tile('Plate, sheet, coil'),
  'tile-wire': tile('Wire'),
  'tile-grating-mesh': tile('Grating and mesh'),
  'founder-band': { ratio: '4/5', min: '1200 w', subject: 'Founder portrait' },
  'industry-oilgas': ind('Oil and gas'),
  'industry-water': ind('Water'),
  'industry-construction': ind('Construction'),
  'industry-peb': ind('Pre-engineered buildings'),
  'industry-machinery': ind('Machinery'),
  'industry-marine': ind('Marine'),
  'proof-mtc': { ratio: '3/4', min: '900 w', subject: 'Mill test certificate' },
  'proof-stencil': { ratio: '3/2', min: '1200 w', subject: 'Stencilled pipe ends' },
  'proof-bundle': { ratio: '3/2', min: '1200 w', subject: 'Packed pipe bundle' },
  'proof-loading': { ratio: '3/2', min: '1200 w', subject: 'Loading and delivery' },
  'cta-yard': { ratio: '21/9', min: '2400 w', subject: 'Wide yard shot' },
  'founder-portrait': { ratio: '3/4', min: '1800 h', subject: 'Portrait' },
  'founder-archive-1': { ratio: '3/2', min: '1400 w', subject: 'Family archive' },
  'founder-archive-2': { ratio: '4/5', min: '1400 w', subject: 'Family archive' },
  'founder-archive-3': { ratio: '4/5', min: '1400 w', subject: 'Family archive' },
  'founder-book': { ratio: '3/4', min: '900 w', subject: 'Book cover' },
  ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`timeline-${i + 1}`, { ratio: '4/3', min: '1000 w', subject: 'Timeline photo' }])),
}
