import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { BUSINESS, GA_MEASUREMENT_ID, SITE_URL } from '@/lib/site';
import { businessJsonLd } from '@/lib/seo';
import './globals.css';

// Self-hosted variable fonts (latin subset, from Fontsource; OFL licences in app/fonts/).
// Weight ranges match what the site used before: Inter 300–600, Playfair Display 400–600.
const inter = localFont({
  src: [{ path: './fonts/inter-latin-wght-normal.woff2', weight: '300 600', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});
const playfair = localFont({
  src: [
    { path: './fonts/playfair-display-latin-wght-normal.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/playfair-display-latin-wght-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} — Custom Furniture Manufacturer in Surat`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export const viewport: Viewport = {
  themeColor: '#e8e6e1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
        <JsonLd data={businessJsonLd()} />

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
