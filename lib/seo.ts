import type { Metadata } from 'next';
import { BUSINESS, SITE_URL } from './site';

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the brand. */
  absoluteTitle?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: BUSINESS.name,
      title: fullTitle,
      description,
      locale: 'en_IN',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${BUSINESS.name} — custom furniture made in Surat` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

// ---------- Structured data ----------

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['FurnitureStore', 'Organization'],
        '@id': BUSINESS_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        logo: absoluteUrl('/icon.svg'),
        image: absoluteUrl('/og-image.jpg'),
        description: BUSINESS.description,
        slogan: 'Designed by you, crafted by us.',
        foundingDate: BUSINESS.foundingYear,
        telephone: BUSINESS.phoneE164,
        email: BUSINESS.email,
        address: { '@type': 'PostalAddress', ...BUSINESS.address },
        areaServed: { '@type': 'Country', name: 'India' },
        sameAs: [BUSINESS.instagram],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: BUSINESS.phoneE164,
          email: BUSINESS.email,
          areaServed: 'IN',
        },
        knowsAbout: [
          'Custom furniture manufacturing',
          'Solid wood furniture',
          'Sofas',
          'Dining tables',
          'Dining chairs',
          'Lounge chairs',
          'Café and restaurant seating',
          'Teak wood',
          'Sheesham wood',
          'Wood finishes and polishing',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS.name,
        description: BUSINESS.description,
        inLanguage: 'en-IN',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  };
}

interface WebPageInput {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  path: string;
  name: string;
  description: string;
  breadcrumb: { name: string; path: string }[];
  extra?: Record<string, unknown>;
  mainEntity?: Record<string, unknown>;
}

export function webPageJsonLd({ type = 'WebPage', path, name, description, breadcrumb, extra, mainEntity }: WebPageInput) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        ...(mainEntity ? { mainEntity } : {}),
        ...extra,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: breadcrumb.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: absoluteUrl(b.path),
        })),
      },
    ],
  };
}
