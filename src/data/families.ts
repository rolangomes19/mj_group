import type { Family } from './types'

const reviewed = 'Sep 2026'

export const families: Family[] = [
  // ---------- Pipes & Tubes ----------
  {
    id: 'shs', groupId: 'pipes-tubes', name: 'Square hollow sections', prefix: 'SHS',
    standard: 'EN 10219', standardKey: 'EN10219', showcase: true, reviewed, sample: false,
    use: 'Columns, frames, gates and fabricated structures',
    industries: ['construction', 'peb', 'machinery', 'autobody'],
    explainer: [
      'Square hollow sections are cold-formed, welded steel tubes with four equal sides. We stock them to EN 10219, the European standard for structural hollow sections, from 40 x 40 up to 200 x 200, in walls from 2.5 to 10 mm.',
      'A closed square profile resists twisting far better than an open section of the same weight. That makes SHS the usual choice for columns, portal frames, canopies, balustrades, gates and machine bases. Flat faces make them easy to cut, drill and weld to plate, so fabricators can build clean joints without special tooling.',
      'Pick the size and wall you need from the table. Each row shows the mass per metre, so the weight of your order is worked out as you type. We supply S235JRH and S355J2H grades in 6 m and 12 m lengths, black or galvanized, with an EN 10204 3.1 mill test certificate on every order. Need a length cut to size? Add it to your notes and we will price it with the quote.',
    ],
  },
  {
    id: 'rhs', groupId: 'pipes-tubes', name: 'Rectangular hollow sections', prefix: 'RHS',
    standard: 'EN 10219', standardKey: 'EN10219', reviewed, sample: true,
    use: 'Beams, rafters, trailer chassis and frames',
    industries: ['construction', 'peb', 'autobody'],
    explainer: ['Rectangular hollow sections give more stiffness in one direction for the same weight. Use them as beams, rafters and chassis rails where the load comes from one side.'],
  },
  {
    id: 'pipe-en10255', groupId: 'pipes-tubes', name: 'Steel pipe, EN 10255 Medium', prefix: 'Pipe',
    standard: 'EN 10255', standardKey: 'EN10255', showcase: true, reviewed, sample: false,
    use: 'Fire-fighting, water and general services pipework',
    industries: ['hvac', 'water', 'construction', 'oilgas'],
    explainer: [
      'EN 10255 covers non-alloy steel tubes made for welding and threading. It replaced BS 1387, so older drawings that ask for "BS 1387 Medium" point to the same pipe. We stock the Medium series from 15 NB to 150 NB, black or hot-dip galvanized.',
      'Medium series pipe is the workhorse of building services in the UAE. It carries fire-fighting mains and sprinkler branches, chilled and potable water, compressed air and general low-pressure lines. Walls are thick enough to thread cleanly and to take grooved couplings, and the pipe is rated to 50 bar test pressure.',
      'Order by nominal bore. The table shows the wall and mass per metre for each size, so you can check weights against your schedule before you send it. Ends come plain, threaded and socketed, or grooved. Every order ships with an EN 10204 3.1 mill test certificate, and colour-coded ends make each size easy to check at the site gate.',
    ],
  },
  {
    id: 'pipe-a53', groupId: 'pipes-tubes', name: 'Steel pipe, ASTM A53 Sch 40', prefix: 'A53',
    standard: 'ASTM A53', standardKey: 'ASTM-A53', reviewed, sample: true,
    use: 'Process, mechanical and pressure pipework to US specs',
    industries: ['oilgas', 'water', 'machinery'],
    explainer: ['ASTM A53 pipe is the US standard for welded and seamless black and galvanized pipe. Choose it when the project specification calls for ASTM rather than EN pipe.'],
  },

  // ---------- Structural ----------
  {
    id: 'ipe', groupId: 'structural', name: 'IPE beams', prefix: 'IPE',
    standard: 'Euronorm 19-57', standardKey: 'EURONORM', showcase: true, reviewed, sample: false,
    use: 'Floor beams, secondary framing and mezzanines',
    industries: ['construction', 'peb', 'machinery'],
    explainer: [
      'IPE beams are European I-sections with parallel flange faces. They are tall and narrow, so they carry bending loads efficiently for their weight. We stock the full range from IPE 100 to IPE 600.',
      'Across the Gulf, IPE is the standard choice for floor beams, secondary framing, mezzanines, crane girders and equipment supports. Parallel flanges make bolted connections simple, because the bolt heads and nuts sit flat without tapered washers. That saves time on site and in the fabrication shop.',
      'The table lists each size with its mass per metre, so the weight of your order is worked out as you pick. Standard stock lengths are 6 m and 12 m in S275JR and S355JR. Cut lengths, drilling and shot blasting can be priced with your quote. Every order comes with an EN 10204 3.1 mill test certificate and a heat number stencilled on the section.',
    ],
  },
  {
    id: 'hea', groupId: 'structural', name: 'HEA broad flange beams', prefix: 'HE',
    standard: 'Euronorm 53-62', standardKey: 'EURONORM', reviewed, sample: true,
    use: 'Columns and heavy beams with wide flanges',
    industries: ['construction', 'peb', 'oilgas'],
    explainer: ['HEA sections have wide flanges, so they work well as columns and short heavy beams. They stay stable under load where a narrow beam would twist.'],
  },
  {
    id: 'ub', groupId: 'structural', name: 'Universal beams', prefix: 'UB',
    standard: 'BS 4-1', standardKey: 'BS4', reviewed, sample: true,
    use: 'Main beams to British Standard drawings',
    industries: ['construction', 'peb'],
    explainer: ['Universal beams are the British Standard I-section for main floor and roof beams. Use them where drawings are detailed to BS 4.'],
  },
  {
    id: 'uc', groupId: 'structural', name: 'Universal columns', prefix: 'UC',
    standard: 'BS 4-1', standardKey: 'BS4', reviewed, sample: true,
    use: 'Columns and heavy posts to British Standard drawings',
    industries: ['construction', 'peb'],
    explainer: ['Universal columns have near-square proportions, so they carry axial load well. They are the British Standard choice for building columns.'],
  },

  // ---------- Channels ----------
  {
    id: 'upn', groupId: 'channels', name: 'UPN channels', prefix: 'UPN',
    standard: 'DIN 1026', standardKey: 'DIN', reviewed, sample: true,
    use: 'Trimmers, frames, stair stringers and rails',
    industries: ['construction', 'machinery', 'autobody'],
    explainer: ['UPN channels have tapered inner flanges. They suit frames, trimmers and stair stringers where one flat back face is needed.'],
  },
  {
    id: 'pfc', groupId: 'channels', name: 'Parallel flange channels', prefix: 'PFC',
    standard: 'BS 4-1', standardKey: 'BS4', reviewed, sample: true,
    use: 'Edge beams and bolted frames',
    industries: ['construction', 'peb'],
    explainer: ['Parallel flange channels bolt up without tapered washers. They are common as edge beams and in back-to-back compound members.'],
  },

  // ---------- Angles ----------
  {
    id: 'equal-angle', groupId: 'angles', name: 'Equal angles', prefix: 'L',
    standard: 'BS EN 10056', standardKey: 'BS4848', reviewed, sample: true,
    use: 'Bracing, cleats, frames and supports',
    industries: ['construction', 'peb', 'machinery', 'hvac'],
    explainer: ['Equal angles have two legs of the same length. They are used for bracing, cleats, lintels, supports and light frames.'],
  },
  {
    id: 'unequal-angle', groupId: 'angles', name: 'Unequal angles', prefix: 'L',
    standard: 'BS EN 10056', standardKey: 'BS4848', reviewed, sample: true,
    use: 'Lintels, shelf angles and long-leg supports',
    industries: ['construction', 'peb'],
    explainer: ['Unequal angles put more steel in one leg. Use them where a long leg carries the load and a short leg makes the fixing.'],
  },

  // ---------- Flat & Long ----------
  {
    id: 'ms-flat', groupId: 'flat-long', name: 'MS flats', prefix: 'Flat',
    standard: 'EN 10058', standardKey: 'EN10025', reviewed, sample: true,
    use: 'Base plates, stiffeners, straps and gates',
    industries: ['construction', 'machinery', 'autobody', 'marine'],
    explainer: ['Mild steel flats are hot rolled bars of rectangular section. Fabricators use them for stiffeners, straps, brackets and gate frames.'],
  },
  {
    id: 'round-bar', groupId: 'flat-long', name: 'MS round bars', prefix: 'Round',
    standard: 'EN 10060', standardKey: 'EN10025', reviewed, sample: true,
    use: 'Shafts, pins, anchors and machined parts',
    industries: ['machinery', 'marine', 'oilgas'],
    explainer: ['Mild steel round bars are hot rolled solid bars. They are turned into shafts, pins and anchors, or used as ties and handrail infill.'],
  },

  // ---------- Plate ----------
  {
    id: 'plate', groupId: 'plate-sheet', name: 'Hot rolled plates', prefix: 'Plate',
    standard: 'EN 10025 / ASTM A36', standardKey: 'EN10025', reviewed, sample: false, massBasis: 'm2',
    use: 'Base plates, gussets, tanks and cut parts',
    industries: ['construction', 'oilgas', 'marine', 'machinery', 'water'],
    explainer: ['Hot rolled plate from 4 to 60 mm in widths of 2, 2.5 and 3.05 m. We stock S275JR, S355JR and A36, and can cut to your schedule. Weight is worked out from width x length x mass per square metre.'],
  },

  // ---------- Wire ----------
  {
    id: 'binding-wire', groupId: 'wire', name: 'GI wire', prefix: 'GI wire',
    standard: 'JIS G3547', standardKey: 'JIS', reviewed, sample: true, massBasis: 'pc', pcLabel: 'kg/coil',
    use: 'Rebar tying, fencing and general binding',
    industries: ['construction', 'water', 'other'],
    explainer: ['Galvanized iron wire in soft and medium tensile, 1.6 to 5 mm. Sold by the 25 kg coil for rebar tying, fencing and binding.'],
  },

  // ---------- Grating & Mesh ----------
  {
    id: 'ms-grating', groupId: 'grating-mesh', name: 'MS gratings', prefix: 'Grating',
    standard: 'ASTM A36', standardKey: 'ASTM-A36', reviewed, sample: false, massBasis: 'pc', pcLabel: 'kg/panel',
    use: 'Walkways, platforms, stair treads and trench covers',
    industries: ['oilgas', 'water', 'marine', 'hvac'],
    explainer: ['Plain or serrated bar grating in standard 1 x 6 m panels. The load bearing bar meets ASTM A36 or BS 4360 Gr 43A. Pick the bar and pitch from the table.'],
  },
]

export const familyById = (id: string) => families.find((f) => f.id === id)
export const familiesInGroup = (groupId: string) => families.filter((f) => f.groupId === groupId)
