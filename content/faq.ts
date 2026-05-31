import { siteConfig } from '@/lib/site-config';

export const faqCategories = [
  { id: 'general', label: 'General' },
  { id: 'projects', label: 'Projects' },
  { id: 'booking', label: 'Buying & Booking' },
  { id: 'legal', label: 'Legal & Documentation' },
  { id: 'support', label: 'Support & Policies' },
] as const;

export type FaqCategoryId = (typeof faqCategories)[number]['id'];

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategoryId;
};

const { name, phoneDisplay, email, address, founded } = siteConfig;

export const faqItems: FaqItem[] = [
  {
    category: 'general',
    question: 'What are the benefits of owning a managed farmland?',
    answer:
      'Managed farmland near Bangalore offers weekend retreats, organic farming opportunities, appreciation potential, and gated community amenities including security, water supply, internal roads, and plantation support. PVS Promoters provides end-to-end management so you enjoy farmland ownership without daily maintenance burden.',
  },
  {
    category: 'legal',
    question: 'Can anyone buy agricultural land in Tamil Nadu?',
    answer:
      'Tamil Nadu has restrictions under Section 79A and 79B of the Tamil Nadu Land Reforms Act. Non-agriculturists may require special permissions or must meet eligibility criteria. PVS Promoters guides buyers through legal verification and documentation to ensure compliant purchases.',
  },
  {
    category: 'projects',
    question: 'What is the minimum area of plot one can purchase?',
    answer:
      'The minimum plot size is typically 10 guntas (approximately 1,200 sq ft) depending on the project. Contact our sales team for current availability and dimensions at each location including Pathakotta, Shoolagiri, and other PVS projects.',
  },
  {
    category: 'projects',
    question: 'What is the source of water in the farmland?',
    answer:
      'Our coco farmland projects include borewells, sustainable water management systems, and in some locations access to natural water sources. Water availability is verified during site visits — ask our team for project-specific details.',
  },
  {
    category: 'projects',
    question: 'What safety precautions are taken around the farm houses?',
    answer:
      'All PVS gated community farmland projects include 24/7 CCTV surveillance, trained security staff, gated entry points, and well-lit internal roads. Safety is a core amenity across Pathakotta, Shoolagiri, and all managed farmland developments.',
  },
  {
    category: 'booking',
    question: 'What is the booking procedure for farmland?',
    answer:
      'Select your plot during a site visit, pay 10% as booking advance, complete the sale agreement, and proceed to registration within approximately 35 days. PVS Promoters assists with 11E clearance and all documentation through registration at the sub-registrar office.',
  },
  {
    category: 'general',
    question: 'What are the benefits of investing in a farmland project?',
    answer:
      'Farmland investment near Hosur and Bangalore offers capital appreciation, rental income potential, tax benefits on agricultural land, a peaceful weekend home, and diversification from traditional financial instruments. Coco farmland with managed plantation adds recurring yield potential.',
  },
  {
    category: 'general',
    question: 'What is PVS Promoters?',
    answer: `${name} is a premium real estate developer based in Hosur, Tamil Nadu. Since ${founded}, we have delivered residential layouts, commercial plots, and managed farmland projects across Tamil Nadu with a focus on transparency, quality infrastructure, and lifelong customer support.`,
  },
  {
    category: 'general',
    question: 'What types of properties does PVS Promoters offer?',
    answer:
      'We offer residential gated community layouts, commercial plots, managed coco farmland, plantation estates, and luxury villa projects. Explore our portfolio on the Projects page for Phase-1, Phase-2, Shoolagiri, Emerald Estate, Shanvi Garden City, and more.',
  },
  {
    category: 'general',
    question: 'Where are your projects located?',
    answer: `Our projects are primarily located in and around Hosur, Tamil Nadu — including Pathakotta, Shoolagiri, and key highway corridors near Bangalore. Our office is at ${address}.`,
  },
  {
    category: 'general',
    question: 'What services does PVS Promoters provide?',
    answer:
      'We provide property development, curated land sales with verified titles, and real estate consultation — including site feasibility, investment advisory, and end-to-end support from enquiry to registration.',
  },
  {
    category: 'projects',
    question: 'Which projects are currently available?',
    answer:
      'Availability changes by project phase. Visit our Projects page for live listings including PVS Coco Farmland Phase-1 & Phase-2, Coco Farmland Shoolagiri, The Emerald Estate, Shanvi Garden City, Village Farm projects, and more. Each project page shows status, pricing, gallery, and videos.',
  },
  {
    category: 'projects',
    question: 'Are the projects DTCP or legally approved?',
    answer:
      'Each project has its own approval and documentation status. RERA, DTCP, or other applicable approvals are shared transparently during site visits and in project documentation. Please enquire for project-specific legal details before booking.',
  },
  {
    category: 'projects',
    question: 'Are the farmland projects legally clear?',
    answer:
      'Yes. All our projects are offered with proper title verification and legal documentation. We emphasize clear ownership records and transparent due diligence so buyers can invest with confidence.',
  },
  {
    category: 'projects',
    question: 'What amenities are included in residential layouts?',
    answer:
      'Typical amenities include internal cement roads, street lighting, drainage, borewell/water supply, electrical infrastructure, security provisions, and landscaped open spaces. Premium projects may include clubhouses, plantation support, and gated community features.',
  },
  {
    category: 'projects',
    question: 'What is the minimum plot size available?',
    answer: `Plot sizes vary by project — from compact residential plots to larger farmland parcels. Contact our sales team at ${phoneDisplay} or submit the contact form for current availability, dimensions, and pricing for your preferred project.`,
  },
  {
    category: 'booking',
    question: 'Can I schedule a site visit?',
    answer: `Yes. Call us at ${phoneDisplay}, WhatsApp us, or submit the contact form on our website. Our team will arrange a guided site visit at your convenience and walk you through available plots, amenities, and documentation.`,
  },
  {
    category: 'booking',
    question: 'What is the booking process?',
    answer:
      'Select your preferred plot or project, verify documentation with our team, pay the booking advance, and complete the sale agreement. We support you through site selection, legal verification, payment milestones, and registration.',
  },
  {
    category: 'booking',
    question: 'Do you provide home loan assistance?',
    answer:
      'We guide buyers through financing options and connect you with partner banks and financial institutions for eligible residential and farmland purchases. Our consultation team can advise on loan eligibility and documentation requirements.',
  },
  {
    category: 'booking',
    question: 'Are there any additional charges or hidden fees?',
    answer:
      'We maintain complete transparency in all our dealings. All costs, registration charges, and applicable fees are communicated upfront. Please discuss the full cost breakdown with our sales team before making any commitment.',
  },
  {
    category: 'legal',
    question: 'What documents will I receive when purchasing a plot?',
    answer:
      'Buyers typically receive sale agreement copies, title documents, layout approvals (where applicable), payment receipts, and guidance on registration. Specific document sets vary by project type — our team provides a checklist during your site visit.',
  },
  {
    category: 'legal',
    question: 'Does PVS Promoters help with registration?',
    answer:
      'Yes. We assist buyers through the registration process, coordinate with legal partners, and ensure documentation is in order from booking through final registration at the sub-registrar office.',
  },
  {
    category: 'support',
    question: 'How can I contact customer support?',
    answer: `Reach us via the Contact page, call ${phoneDisplay}, email ${email}, or visit our office at ${address}. Our team responds to enquiries about projects, site visits, bookings, and after-sales support.`,
  },
  {
    category: 'support',
    question: 'How do I subscribe to project updates?',
    answer:
      'Use the newsletter signup in our website footer to receive early access to premium launches and project updates. You can also submit the contact form and mention your project interests.',
  },
  {
    category: 'support',
    question: 'Can I unsubscribe from the newsletter?',
    answer:
      'Yes. You can unsubscribe at any time using the unsubscribe link in our emails or by contacting our support team at the email address on our Contact page.',
  },
  {
    category: 'support',
    question: 'What is your refund policy?',
    answer:
      'Refund policies vary depending on the project phase, payment stage, and terms of your sale agreement. Please refer to your booking documents or contact our customer support team for project-specific refund and cancellation details.',
  },
];

export const faqHighlights = [
  'Clear documentation and transparent pricing',
  'Premium amenities and quality infrastructure',
  'Dedicated support from enquiry to registration',
  '17+ years of trusted real estate development',
] as const;
