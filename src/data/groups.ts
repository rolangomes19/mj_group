import type { Group } from './types'

// The catalogue's own logical groups (Steel Catalogue Reference 1.3).
export const groups: Group[] = [
  { id: 'pipes-tubes', name: 'Pipes & Tubes', use: 'Hollow sections and pipe for frames, fire lines and services', icon: 'group-pipes', photo: 'tile-pipes' },
  { id: 'structural', name: 'Structural Sections', use: 'Beams and columns for primary and secondary framing', icon: 'group-structural', photo: 'tile-structural' },
  { id: 'channels', name: 'Channels', use: 'Purlins, rails, trimmers and frame edges', icon: 'group-channels', photo: 'tile-channels' },
  { id: 'angles', name: 'Angles', use: 'Bracing, cleats, supports and lintels', icon: 'group-angles', photo: 'tile-angles' },
  { id: 'flat-long', name: 'Flat & Long Products', use: 'Flats and bars for fabrication and machining', icon: 'group-flat-long', photo: 'tile-flat-long' },
  { id: 'plate-sheet', name: 'Plate & Sheet', use: 'Hot rolled plate cut to your schedule', icon: 'group-plate-sheet', photo: 'tile-plate-sheet' },
  { id: 'wire', name: 'Wire Products', use: 'Galvanized wire for tying, fencing and mesh', icon: 'group-wire', photo: 'tile-wire' },
  { id: 'grating-mesh', name: 'Grating & Mesh', use: 'Walkways, platforms, trench covers and screens', icon: 'group-grating-mesh', photo: 'tile-grating-mesh' },
]

export const groupById = (id: string) => groups.find((g) => g.id === id)
