import { siteConfig } from '@/lib/site-config';

export type PrivacySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const { name, email, url, address, phoneDisplay } = siteConfig;

export const privacyPolicyIntro = {
  title: 'Privacy Policy',
  subtitle: `How ${name} collects, uses, and protects your information`,
  lastUpdated: 'May 2026',
};

export const privacyPolicySections: PrivacySection[] = [
  {
    title: 'Introduction',
    paragraphs: [
      `At ${name}, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy explains the types of information collected and recorded by ${name} through our website and how we use it.`,
      `This Privacy Policy applies only to our online activities and is valid for visitors to our website with regard to information they share and/or that we collect through ${name}. This policy is not applicable to information collected offline or via channels other than this website.`,
      'If you have additional questions or require more information about our Privacy Policy, please contact us using the details at the end of this document.',
    ],
  },
  {
    title: 'Consent',
    paragraphs: [
      'By using our website, submitting contact or enquiry forms, subscribing to our newsletter, or otherwise interacting with our services, you consent to our Privacy Policy and agree to its terms.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      'The personal information you are asked to provide, and the reasons why you are asked to provide it, will be made clear at the point we ask for it.',
      'When you use our contact form, we may collect your name, email address, phone number, subject or project interest, and message content.',
      'When you subscribe to our newsletter via the footer or other signup forms, we collect your email address and subscription timestamp.',
      'If you contact us directly by phone, email, or in person at our office, we may receive additional information such as your address, project preferences, and any attachments or documents you choose to share.',
      'We may also collect non-personal usage data described in the Log Files section below.',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: ['We use the information we collect in various ways, including to:'],
    bullets: [
      'Provide, operate, and maintain our website and project listings',
      'Respond to your enquiries, site visit requests, and booking interest',
      'Send newsletter updates about new launches, projects, and availability (with your consent)',
      'Improve, personalize, and expand our website and customer experience',
      'Understand and analyze how visitors use our website',
      'Communicate with you about projects, services, appointments, and customer support',
      'Maintain records related to sales, inquiries, and newsletter subscriptions in our secure systems',
      'Find and prevent fraud or misuse of our services',
    ],
  },
  {
    title: 'Data Storage & Security',
    paragraphs: [
      'Enquiry and newsletter data submitted through our website may be stored in secure databases used to operate our admin and customer communication systems. We implement reasonable administrative and technical measures to protect personal information against unauthorized access, alteration, or disclosure.',
      'We do not sell your personal data to third parties. We share information only when necessary to respond to your requests, comply with law, or with trusted service providers who assist in operating our website under confidentiality obligations.',
    ],
  },
  {
    title: 'Log Files',
    paragraphs: [
      `${name} follows a standard procedure of using log files. These files log visitors when they visit websites. Hosting and analytics services may collect internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks.`,
      'This information is generally not linked to personally identifiable information. It is used for analyzing trends, administering the site, tracking user movement on the website, and gathering demographic information.',
    ],
  },
  {
    title: 'Cookies & Similar Technologies',
    paragraphs: [
      'Our website may use cookies and similar technologies to remember preferences, maintain session state (such as admin authentication where applicable), and improve site performance.',
      'You can choose to disable cookies through your individual browser settings. Disabling cookies may affect certain features of the website.',
      'Third-party services embedded on our site (such as Google Maps on our Contact page or YouTube videos on project pages) may set their own cookies. Please refer to those providers’ privacy policies for more information.',
    ],
  },
  {
    title: 'Third-Party Services & Links',
    paragraphs: [
      `${name}'s Privacy Policy does not apply to other websites or services linked from our site. We advise you to review the privacy policies of third-party platforms you visit through our links, including social media, map providers, and video hosting services.`,
      'We have no control over cookies or tracking technologies used by third-party advertisers or embedded content providers.',
    ],
  },
  {
    title: 'CCPA Privacy Rights (Do Not Sell My Personal Information)',
    paragraphs: [
      'Under the California Consumer Privacy Act (CCPA), among other rights, California consumers have the right to:',
      'If you make a request, we have one month to respond. To exercise any of these rights, please contact us.',
    ],
    bullets: [
      'Request that a business disclose the categories and specific pieces of personal data collected about them',
      'Request that a business delete personal data collected about them',
      'Request that a business not sell their personal data',
    ],
  },
  {
    title: 'GDPR Data Protection Rights',
    paragraphs: [
      'If you are in the European Economic Area, you may have the following data protection rights:',
      'If you make a request, we have one month to respond. To exercise any of these rights, please contact us using the details in the Contact Us section below.',
    ],
    bullets: [
      'The right to access – request copies of your personal data',
      'The right to rectification – request correction of inaccurate or incomplete information',
      'The right to erasure – request deletion of your personal data under certain conditions',
      'The right to restrict processing – request limited use of your data under certain conditions',
      'The right to object to processing – object to our use of your personal data under certain conditions',
      'The right to data portability – request transfer of your data to another organization where applicable',
    ],
  },
  {
    title: "Children's Information",
    paragraphs: [
      'Protecting children while using the internet is important to us. We encourage parents and guardians to observe, participate in, and monitor their children’s online activity.',
      `${name} does not knowingly collect personally identifiable information from children under the age of 13. If you believe your child provided such information on our website, please contact us immediately and we will make best efforts to promptly remove it from our records.`,
    ],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website after changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy, wish to exercise your privacy rights, or want to unsubscribe from communications, please contact us:',
      `${name}`,
      `Office: ${address}`,
      `Phone: ${phoneDisplay}`,
      `Email: ${email}`,
      `Website: ${url}`,
    ],
  },
];
