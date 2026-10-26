// Single source of truth for site-wide facts used in pages, metadata and structured data.

// Canonical origin — matches the Google Search Console property (non-www).
// www.woodflexdesigns.com redirects here (see next.config.ts).
export const SITE_URL = 'https://woodflexdesigns.com';

export const BUSINESS = {
  name: 'Woodflex Designs',
  legalName: 'Woodflex Designs',
  tagline: 'Custom solid wood furniture, made in Surat',
  description:
    'Woodflex Designs is a custom furniture manufacturer in Surat, Gujarat. We build sofas, dining tables, chairs, lounge chairs, centre tables and café seating to your drawings, references and sizes — in teak, walnut, acacia and white ash.',
  foundingYear: '2024',
  phoneDisplay: '+91 94290 04803',
  phoneE164: '+919429004803',
  email: 'woodflexdesigns@gmail.com',
  instagram: 'https://www.instagram.com/woodflex.design/',
  instagramHandle: '@woodflex.design',
  address: {
    streetAddress: 'Shop No. 554–557, 2nd Floor, above Pradeep Plastic, RJD Integrated Textile Park',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    postalCode: '394510',
    addressCountry: 'IN',
  },
} as const;

// Contact numbers, primary first. Visitors choose which one to call.
export const PHONES = [
  { display: BUSINESS.phoneDisplay, e164: BUSINESS.phoneE164 },
  { display: '+91 97254 08989', e164: '+919725408989' },
  { display: '+91 94281 50511', e164: '+919428150511' },
] as const;

const phoneFor = (e164: string) => {
  const phone = PHONES.find((p) => p.e164 === e164);
  if (!phone) throw new Error(`Unknown phone ${e164}`);
  return phone;
};

// The team. Footer "Talk to us" shows who to call for what; the About page shows
// the same people in order of seniority (without phone numbers).
export const TEAM = {
  amit: {
    name: 'Amit Bhayani',
    role: 'Founder & Managing Director',
    bio: 'Oversees finance and the day-to-day running of Woodflex.',
    contactFor: 'Accounts & partnerships',
    phone: phoneFor('+919725408989'),
  },
  ronit: {
    name: 'Ronit Bhayani',
    role: 'Co-Founder, Production & Brand',
    bio: 'Runs production on the workshop floor and leads our brand and social media.',
    contactFor: 'Production & delivery updates',
    phone: phoneFor('+919428150511'),
  },
  vigyat: {
    name: 'Vigyat Pansari',
    role: 'Head of Sales & Operations',
    bio: 'Leads sales, pricing and costing, and internal operations, including raw-material management on an in-house system he built. Works directly with architects and designers on new projects.',
    contactFor: 'Quotes & new projects',
    phone: phoneFor('+919429004803'),
  },
} as const;

export const FOOTER_CONTACTS = [TEAM.vigyat, TEAM.ronit, TEAM.amit];
export const ABOUT_TEAM = [TEAM.amit, TEAM.ronit, TEAM.vigyat];

export const ADDRESS_LINES = [
  'Shop No. 554–557, 2nd Floor, above Pradeep Plastic',
  'RJD Integrated Textile Park',
  'Surat, Gujarat 394510, India',
];

// Woodflex Designs was set up in 2024; the experience figure belongs to the team behind it,
// never to the company itself.
export const EXPERIENCE_LINE = '50 years of furniture-making experience behind us.';

// Where we deliver. Used on Home, About, Contact, the FAQ and in structured data (areaServed).
export const DELIVERY_AREAS = [
  { name: 'Surat', type: 'City' },
  { name: 'Pune', type: 'City' },
  { name: 'Mumbai', type: 'City' },
  { name: 'Hyderabad', type: 'City' },
  { name: 'Bengaluru', type: 'City' },
  { name: 'Chennai', type: 'City' },
  { name: 'Nagpur', type: 'City' },
  { name: 'Rajasthan', type: 'State' },
] as const;

export const DELIVERY_LINE = 'Made in Surat, delivered across India.';

/** "A, B and C" */
export const listInWords = (items: readonly string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export const deliveryAreaNames = DELIVERY_AREAS.map((a) => a.name);


export const NAV_LINKS = [
  { label: 'Our Work', href: '/work' },
  { label: 'Products', href: '/products' },
  { label: 'Materials', href: '/materials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = [...NAV_LINKS, { label: 'FAQ', href: '/faq' }] as const;

export const GA_MEASUREMENT_ID = 'G-3BDJ3FK4JK';
