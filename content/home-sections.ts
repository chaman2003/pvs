export const homeHero = {
  kicker: 'Managed Farmland Near Bangalore',
  headline: 'Your lifelong realtor!',
  headlineAccent: 'PVS Promoters',
  description:
    'We create high-quality coco farmland and premium properties with expertise and professionalism — turning blueprints into legacy estates near Hosur and Bangalore.',
  primaryCta: 'Book Now',
  secondaryCta: 'View Projects',
} as const;

export const homeServices = {
  kicker: 'Welcome to PVS Promoters',
  title: 'Buy a fantastic',
  titleAccent: 'Farmland?',
  description:
    'Premium managed farmland near Bangalore with gated community access, coco plantation support, and world-class amenities.',
  cards: [
    {
      title: '24/7 Security',
      description: 'Gated communities with round-the-clock surveillance and secure access.',
      icon: 'shield' as const,
    },
    {
      title: '24/7 Support',
      description: 'Dedicated customer support from enquiry through registration and beyond.',
      icon: 'headphones' as const,
    },
    {
      title: 'Licensed Agents',
      description: 'Experienced real estate professionals guiding every step of your purchase.',
      icon: 'badge' as const,
    },
    {
      title: 'Luxury Farm Living',
      description: 'Weekend retreats with pool, clubhouse, co-working, and plantation amenities.',
      icon: 'trees' as const,
    },
  ],
} as const;

export const homeAbout = {
  title: "We're here to support your dream",
  titleAccent: 'Farmland!',
  paragraphs: [
    'At PVS Promoters, we believe farmland is more than an investment — it is the foundation of a healthier, more connected lifestyle for your family.',
    'With 17+ years of experience since 2009, we have delivered over 240 projects and served more than 11,000 satisfied families across Hosur and Tamil Nadu.',
    'Our coco farmland projects combine clear titles, managed plantation support, and gated community amenities that set us apart from ordinary agricultural land.',
  ],
  bullets: [
    'Clear title and transparent documentation',
    'Managed coco farmland with plantation support',
    'Gated community with premium amenities',
    'Strategic locations near Bangalore and Hosur',
  ],
} as const;

export const cocoBenefits = {
  kicker: 'Introduction',
  title: 'Around Hosur, we have cultivated more than',
  titleAccent: '10 Million sq ft of Coco Farmland',
  description:
    "India's first farm-based co-working space — premium coco farmland with club membership, maintenance support, and unbeatable connectivity.",
  driveTimes: [
    { destination: 'HSR Layout, Bangalore', time: '45 mins' },
    { destination: 'Electronic City', time: '30 mins' },
    { destination: 'Sarjapura', time: '30 mins' },
    { destination: 'Hosur Town', time: '10 mins' },
    { destination: 'Bangalore–Krishnagiri Highway', time: 'Direct access' },
  ],
  perks: [
    'Free Lifetime Club Membership',
    '6 Months Free Maintenance',
    'Managed farmland with plantation support',
    'Premium gated community amenities',
  ],
} as const;

export const progressOverview = {
  completed: {
    label: 'Completed Projects',
    value: '10M',
    unit: 'sq ft developed',
    detail: 'Across Hosur and Tamil Nadu since 2009',
  },
  ongoing: {
    label: 'Ongoing Projects',
    value: '47',
    unit: 'plots & ~25 acres',
    detail: 'Active development across Pathakotta and Shoolagiri',
  },
} as const;

export const bottomCta = {
  kicker: 'Luxury Farm Living',
  title: 'We have developed over more than 10 Million sq ft of real estate around Hosur',
  titleAccent: 'PVS Promoters!',
  description: 'Book a site visit today and experience managed coco farmland near Bangalore.',
  cta: 'Book Now!',
} as const;
