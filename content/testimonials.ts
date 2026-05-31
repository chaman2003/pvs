export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'PVS Farmland Buyer',
    role: 'Phase-1 Owner',
    quote:
      'My time at PVS Promoters has been wonderful so far; the property is magnificent and has many wonderful amenities. My family and I are very enthusiastic to start farming here as well! This property certainly stands out from the rest.',
    rating: 5,
    photo: '/images/testimonials/author-1.jpg',
  },
  {
    name: 'Investor',
    role: 'Coco Farmland Buyer',
    quote:
      'I made the decision to go to the farm after learning about their unique ideas and seeing it for myself. The administration is excellent, and the entire farmland has a serene village vibe. I\'ve prepared my investment and am eagerly anticipating earning significant returns!',
    rating: 5,
    photo: '/images/testimonials/author-2.jpg',
  },
  {
    name: 'First-time Buyer',
    role: 'Managed Farmland Owner',
    quote:
      'My first time buying a farmland a smooth experience. They truly cares about what you need. After Sales Service is very much appreciable and very helpful as per my experiences.',
    rating: 5,
    photo: '/images/testimonials/author-3.jpg',
  },
  {
    name: 'Family Investor',
    role: 'Farmland Owner',
    quote:
      'Perfect place to invest in lands for your and your family\'s better future. Invest in property is always better choice than others investment plan because here growth level of return is very high and to be higher day by day.',
    rating: 5,
    photo: '/images/testimonials/author-4.jpg',
  },
  {
    name: 'Hosur Resident',
    role: 'Farmland Investor',
    quote:
      'The best company in Hosur that deals in farmland and embroidered with staffs maintaining proper customer-dealing punctilios. Simply, an estuary of professionalism, cordiality and class. Wishing all of you a very bright future ahead.',
    rating: 5,
    photo: '/images/testimonials/author-5.jpg',
  },
  {
    name: 'Satisfied Customer',
    role: 'Plot Owner',
    quote:
      'This business offers excellent customer service. They sold me farmland, which they promptly delivered to me. Their cooperation has met my expectations.',
    rating: 5,
    photo: '/images/testimonials/author-6.jpg',
  },
];

// Re-export for backward compatibility
export { homeStats } from '@/content/trust-stats';
export { timelineEvents } from '@/content/timeline';
export { amenities } from '@/content/amenities';
