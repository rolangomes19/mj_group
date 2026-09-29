import type { Industry } from './types'

// Industries served, as listed in the catalogue.
export const industries: Industry[] = [
  { id: 'oilgas', name: 'Oil and gas', icon: 'ind-oilgas', photo: 'industry-oilgas', line: 'Line pipe, structural skids, platforms and grating.' },
  { id: 'water', name: 'Water treatment and desalination', icon: 'ind-water', photo: 'industry-water', line: 'Pipe, plate and supports for plants and pump stations.' },
  { id: 'construction', name: 'Construction and infrastructure', icon: 'ind-construction', photo: 'industry-construction', line: 'Beams, columns and hollow sections for frames.' },
  { id: 'peb', name: 'Pre-engineered buildings', icon: 'ind-peb', photo: 'industry-peb', line: 'Sections, plate and purlins for warehouse frames.' },
  { id: 'machinery', name: 'Machine and equipment manufacturing', icon: 'ind-machinery', photo: 'industry-machinery', line: 'Bars, flats and plate for bases, guards and parts.' },
  { id: 'marine', name: 'Marine, shipbuilding and ship repair', icon: 'ind-marine', photo: 'industry-marine', line: 'Plate, flats and angles for hulls and fit-out.' },
  { id: 'autobody', name: 'Auto body fabrication', icon: 'ind-autobody', line: 'Hollow sections and channels for chassis and bodies.' },
  { id: 'hvac', name: 'HVAC and MEP', icon: 'ind-hvac', line: 'Fire and chilled water pipe, supports and angles.' },
  { id: 'other', name: 'Other allied sectors', icon: 'ind-other', line: 'Tell us the job and we will match the steel.' },
]
