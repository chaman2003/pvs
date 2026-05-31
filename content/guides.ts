export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const guides: GuideArticle[] = [
  {
    slug: 'hosur-farmland-investment',
    title: 'Hosur Farmland Investment Guide',
    description:
      'Complete guide to investing in farmland near Hosur — connectivity, pricing, legal clarity, and why managed coco farmland is gaining traction near Bangalore.',
    publishedAt: '2025-01-15',
    sections: [
      {
        paragraphs: [
          'Hosur sits on the Bangalore–Chennai industrial corridor, making it one of the most sought-after locations for farmland investment in South India. With Electronic City just 30 minutes away and Sarjapura within 30 minutes, Hosur offers the perfect balance of accessibility and affordability.',
          'PVS Promoters has developed over 10 million sq ft of coco farmland around Hosur since 2009, serving 11,000+ satisfied families across 240+ projects.',
        ],
      },
      {
        heading: 'Why invest in Hosur farmland?',
        paragraphs: [
          'Land prices near Bangalore have appreciated significantly over the past decade. Hosur offers lower entry points with strong appreciation potential as infrastructure expands along the Krishnagiri highway.',
          'Managed farmland removes the burden of daily maintenance while providing weekend retreat value, organic farming opportunities, and portfolio diversification.',
        ],
      },
      {
        heading: 'PVS Promoters flagship projects',
        paragraphs: [
          'Explore PVS Coco Farmland Phase-1 and Phase-2 at Pathakotta, and Coco Farmland Shoolagiri — all gated communities with premium amenities including swimming pools, co-working spaces, and 24/7 security.',
        ],
      },
    ],
  },
  {
    slug: 'managed-farmland-bangalore',
    title: 'Managed Farmland Near Bangalore: Complete Buyer\'s Guide',
    description:
      'Everything you need to know about buying managed farmland near Bangalore — benefits, legal checks, amenities, and what to look for in a developer.',
    publishedAt: '2025-01-20',
    sections: [
      {
        paragraphs: [
          'Managed farmland near Bangalore combines the lifestyle benefits of rural living with professional maintenance, security, and plantation support. Unlike raw agricultural land, managed projects offer gated access, internal roads, water supply, and community amenities.',
        ],
      },
      {
        heading: 'Key benefits',
        paragraphs: [
          'Weekend getaway without maintenance headaches. Professional plantation management for coco and timber crops. Gated security with CCTV. Appreciation along the Hosur–Bangalore corridor. Clear documentation and registration support.',
        ],
      },
      {
        heading: 'What to verify before buying',
        paragraphs: [
          'Check title clarity, layout approvals, water source documentation, and developer track record. PVS Promoters provides transparent documentation and has 17+ years of experience since 2009.',
        ],
      },
    ],
  },
  {
    slug: 'coco-farmland-hosur-legal',
    title: 'Coco Farmland Hosur: Benefits, Pricing & Legal Clarity',
    description:
      'Understand coco farmland benefits, typical pricing near Hosur, and legal requirements for buying agricultural land in Tamil Nadu.',
    publishedAt: '2025-02-01',
    sections: [
      {
        paragraphs: [
          'Coco farmland combines agricultural investment with lifestyle amenities. Coco plantations offer recurring yield potential while the land itself appreciates over time.',
          'PVS Promoters specializes in coco farmland at Pathakotta and Shoolagiri with plots from approximately 1,200 sq ft (10 guntas) and clear title documentation.',
        ],
      },
      {
        heading: 'Legal considerations in Tamil Nadu',
        paragraphs: [
          'Section 79A and 79B of the Tamil Nadu Land Reforms Act restrict certain purchases by non-agriculturists. PVS Promoters guides buyers through eligibility verification, 11E clearance, and registration within 35 days of booking.',
        ],
      },
    ],
  },
  {
    slug: 'pathakotta-shoolagiri-locations',
    title: 'Pathakotta & Shoolagiri: PVS Project Locations Explained',
    description:
      'Location guide for PVS Promoters flagship coco farmland projects at Pathakotta and Shoolagiri near Hosur.',
    publishedAt: '2025-02-10',
    sections: [
      {
        paragraphs: [
          'Pathakotta is home to PVS Coco Farmland Phase-1 and Phase-2 — our flagship gated community developments with co-working spaces, swimming pools, and managed coco plantation.',
          'Shoolagiri offers scenic farmland with highway connectivity and lush green surroundings, ideal for weekend homes and long-term investment.',
        ],
      },
      {
        heading: 'Drive times',
        paragraphs: [
          'From Hosur: 10 minutes to town centre. To Electronic City: 30 minutes. To HSR Layout: 45 minutes. To Sarjapura: 30 minutes.',
        ],
      },
    ],
  },
  {
    slug: 'non-farmers-buy-agricultural-land-tn',
    title: 'Can Non-Farmers Buy Agricultural Land in Tamil Nadu?',
    description:
      'FAQ-style guide on Section 79A/79B restrictions and how to legally purchase farmland in Tamil Nadu as a non-agriculturist.',
    publishedAt: '2025-02-15',
    sections: [
      {
        paragraphs: [
          'Tamil Nadu restricts agricultural land purchases by non-agriculturists under the Land Reforms Act. However, legitimate pathways exist including income-based exemptions and proper legal structuring.',
          'PVS Promoters assists buyers with legal verification and documentation. Always consult with a qualified legal advisor and verify eligibility before booking.',
        ],
      },
    ],
  },
  {
    slug: 'hosur-drive-times',
    title: 'Drive Times: Hosur to Electronic City, HSR & Sarjapura',
    description:
      'Connectivity guide from PVS Promoters farmland projects near Hosur to key Bangalore locations.',
    publishedAt: '2025-02-20',
    sections: [
      {
        paragraphs: [
          'One of the biggest advantages of PVS farmland projects is connectivity to Bangalore. Hosur to Electronic City takes approximately 30 minutes via the Bangalore–Krishnagiri Highway.',
          'HSR Layout is approximately 45 minutes away. Sarjapura is about 30 minutes. Hosur town itself is just 10 minutes from our Pathakotta projects.',
        ],
      },
    ],
  },
  {
    slug: 'denkanikottai-thalli-corridor',
    title: 'Denkanikottai & Thalli Farmland Corridor',
    description:
      'Overview of the emerging Denkanikottai and Thalli farmland investment corridor near Hosur and Krishnagiri.',
    publishedAt: '2025-03-01',
    sections: [
      {
        paragraphs: [
          'The Denkanikottai and Thalli corridor is emerging as a premium farmland destination along the Krishnagiri district, driven by Bangalore spillover demand and highway infrastructure.',
          'While PVS Promoters focuses on Pathakotta and Shoolagiri, understanding this broader corridor helps investors contextualize Hosur farmland appreciation trends.',
        ],
      },
    ],
  },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}
