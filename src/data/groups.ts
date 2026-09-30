import type { Group } from './types'

// The catalogue's own logical groups (Steel Catalogue Reference 1.3).
export const groups: Group[] = [
  { id: 'pipes-tubes', name: 'Pipes & Tubes', use: 'Hollow sections and pipe for frames, fire lines and services', lead: 'pipe-en10255' },
  { id: 'structural', name: 'Structural Sections', use: 'Beams and columns for primary and secondary framing', lead: 'ipe' },
  { id: 'channels', name: 'Channels', use: 'Purlins, rails, trimmers and frame edges', lead: 'upn' },
  { id: 'angles', name: 'Angles', use: 'Bracing, cleats, supports and lintels', lead: 'equal-angle' },
  { id: 'flat-long', name: 'Flat & Long Products', use: 'Flats and bars for fabrication and machining', lead: 'ms-flat' },
  { id: 'plate-sheet', name: 'Plate & Sheet', use: 'Hot rolled plate cut to your schedule', lead: 'plate' },
  { id: 'wire', name: 'Wire Products', use: 'Galvanized wire for tying, fencing and mesh', lead: 'binding-wire' },
  { id: 'grating-mesh', name: 'Grating & Mesh', use: 'Walkways, platforms, trench covers and screens', lead: 'ms-grating' },
]

export const groupById = (id: string) => groups.find((g) => g.id === id)
