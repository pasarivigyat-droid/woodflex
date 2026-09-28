// Single source of truth for site-wide facts used in pages, metadata and structured data.

// Canonical origin — matches the Google Search Console property (non-www).
// www.woodflexdesigns.com redirects here (see next.config.ts).
export const SITE_URL = 'https://woodflexdesigns.com';

export const BUSINESS = {
  name: 'Woodflex Designs',
  legalName: 'Woodflex Designs',
  tagline: 'Custom solid wood furniture, made in Surat',
  description:
    'Woodflex Designs is a custom furniture manufacturer in Surat, Gujarat. We build sofas, dining tables, chairs, lounge chairs, centre tables and café seating to your drawings, references and sizes — in teak, sheesham, mango, acacia and ash.',
  foundingYear: '2024',
  phoneDisplay: '+91 94290 04803',
  phoneE164: '+919429004803',
  whatsappNumber: '919429004803',
  email: 'woodflex.vigyat@gmail.com',
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

export const ADDRESS_LINES = [
  'Shop No. 554–557, 2nd Floor, above Pradeep Plastic',
  'RJD Integrated Textile Park',
  'Surat, Gujarat 394510, India',
];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${BUSINESS.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const NAV_LINKS = [
  { label: 'Our Work', href: '/work' },
  { label: 'Products', href: '/products' },
  { label: 'Materials', href: '/materials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const GA_MEASUREMENT_ID = 'G-3BDJ3FK4JK';
