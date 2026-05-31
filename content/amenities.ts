export type AmenityItem = {
  icon: string;
  title: string;
  description: string;
};

export const amenities: AmenityItem[] = [
  { icon: 'cctv', title: 'CCTV Security', description: '24/7 surveillance across the community.' },
  { icon: 'cowork', title: 'Co-working Space', description: "India's first farm-based co-working space." },
  { icon: 'air', title: 'Fresh Air', description: 'Natural surroundings away from city pollution.' },
  { icon: 'farm', title: 'Farm Fields', description: 'Managed coco plantation and farmland plots.' },
  { icon: 'nature', title: 'Nature Life', description: 'Green landscapes and open spaces.' },
  { icon: 'swim', title: 'Swimming Pool', description: 'Community pool for residents and guests.' },
  { icon: 'meditate', title: 'Meditation Zone', description: 'Peaceful spaces for wellness and relaxation.' },
  { icon: 'veggies', title: 'Fresh Veggies', description: 'Organic farming and fresh produce.' },
  { icon: 'ponds', title: 'Ponds', description: 'Scenic water bodies across the project.' },
  { icon: 'cottages', title: 'Cottages', description: 'Weekend cottages for farm stays.' },
  { icon: 'bonfire', title: 'Bon Fire', description: 'Community bonfire and gathering areas.' },
  { icon: 'books', title: 'Library', description: 'Reading and learning spaces for families.' },
  { icon: 'security', title: '24/7 Security', description: 'Gated entry with trained security staff.' },
  { icon: 'parking', title: 'Parking', description: 'Dedicated parking for visitors and residents.' },
  { icon: 'cricket', title: 'Cricket Ground', description: 'Sports facilities for active living.' },
  { icon: 'amphitheatre', title: 'Amphitheatre', description: 'Open-air venue for events and gatherings.' },
];

export const amenitiesSectionHead = {
  kicker: 'Top Quality Amenities',
  title: 'World-Class Amenities',
  subtitle: '16 amenities across our gated coco farmland communities.',
} as const;
