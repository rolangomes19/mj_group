import type { TimelineEntry } from './types'

const pb = 'Founder Legacy Trust Playbook s3'

export const timeline: TimelineEntry[] = [
  { year: 1924, type: 'founder', title: 'Born', body: 'Maghanmal Jethanand Pancholia is born on 24 October 1924.', sample: false, source: pb },
  { year: 1942, type: 'group', title: 'Group established', body: 'Reached Sharjah in 1942 by way of Karachi. Family trades included pearls, finance, textiles and food.', slot: 'timeline-1', sample: false, source: pb, link: { to: '/founder', label: 'Read his story' } },
  { year: 1943, type: 'group', title: 'Dubai', body: 'Moved to Dubai in 1943, where the group has been based since.', sample: false, source: pb },
  { year: 1957, type: 'founder', title: 'Power for Dubai', body: 'Among the first, with a few other Indian expatriates, to start a power company in Dubai.', slot: 'timeline-2', sample: false, source: pb },
  { year: 1961, type: 'founder', title: 'Dubai Electricity', body: 'Elected director of Dubai Electricity in 1961.', sample: false, source: pb },
  { year: 1965, type: 'founder', title: 'Dubai Chamber board', body: 'Served on the Dubai Chamber board from 1965 to 1980.', sample: false, source: pb },
  { year: 2009, type: 'founder', title: 'Footprints', body: 'His memoir, Footprints: Memoirs of an Indian Patriarch, is published by Motivate.', slot: 'timeline-4', sample: false, source: pb },
  { year: 2019, type: 'founder', title: 'Passes away', body: 'Maghanmal Jethanand Pancholia passes away on 2 September 2019.', sample: false, source: pb },
  { year: 2024, type: 'steel', title: 'ISO 9001:2015', body: 'The quality management system is certified to ISO 9001:2015 by WRG Certifications.', sample: false, source: 'MJ catalogue' },
  { year: 2024, type: 'founder', title: '100 years', body: 'His 100th birth anniversary is marked in October 2024.', sample: false, source: 'Gulf News' },
]
