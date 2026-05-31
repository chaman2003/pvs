// Office is opposite Seventh-day Adventist HSS, Appavu Nagar, Thally Road, Hosur.
const officeCoordinates = {
  lat: 12.733267,
  lng: 77.811358,
} as const;

const officeMapLabel =
  'Manjunatha Complex, #79/B Appavu Nagar, Thally Road, Hosur, Tamil Nadu 635109';

export const siteConfig = {
  name: 'PVS Promoters',
  tagline: 'Your Lifelong Realtor!',
  phone: '+919600795354',
  phoneDisplay: '+91 96007 95354',
  email: 'pvscivilconstruction@gmail.com',
  addressLines: [
    '#79/B, 1st Floor',
    'Manjunatha Complex',
    'Opp-Seventhday School',
    'Appavu Nagar, Thally Road',
    'Hosur - 635109',
  ],
  addressShort: 'Appavu Nagar, Thally Road, Hosur - 635109',
  address:
    '#79/B, 1st Floor, Manjunatha Complex, Opp-Seventhday School, Appavu Nagar, Thally Road, Hosur - 635109',
  whatsapp: '919600795354',
  founded: 2009,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pvs-promoters.com',
  mapCoordinates: officeCoordinates,
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${officeCoordinates.lat},${officeCoordinates.lng}&destination_place_name=${encodeURIComponent(officeMapLabel)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${officeCoordinates.lat},${officeCoordinates.lng}&hl=en&z=17&output=embed`,
  social: {
    facebook: 'https://www.facebook.com/AgricultureFarmland/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    youtube: 'https://www.youtube.com/',
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
] as const;
