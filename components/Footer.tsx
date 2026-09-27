import Link from 'next/link';
import { ADDRESS_LINES, BUSINESS, NAV_LINKS, whatsappLink } from '@/lib/site';
import { InstagramIcon } from './InstagramIcon';

export function Footer() {
  return (
    <footer className="w-full bg-wood-50 text-wood-900 pt-16 pb-12 border-t border-wood-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="flex flex-col items-start">
            <p className="font-serif text-2xl tracking-tight font-semibold text-wood-900 mb-4">Woodflex Designs</p>
            <p className="text-wood-600 font-light leading-relaxed max-w-xs">
              Custom furniture manufacturers in Surat, Gujarat. Built to your drawings, sizes and references.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start space-y-2 text-wood-600 font-light">
            <p className="font-medium text-wood-900 uppercase text-xs tracking-widest mb-1">Explore</p>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-wood-900 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <address className="not-italic flex flex-col items-start space-y-2 text-wood-600 font-light">
            <p className="font-medium text-wood-900 uppercase text-xs tracking-widest mb-1">Workshop</p>
            {ADDRESS_LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={whatsappLink()} className="hover:text-wood-900 transition-colors pt-2">
              WhatsApp: {BUSINESS.phoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-wood-900 transition-colors">
              {BUSINESS.email}
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 pt-2 hover:text-wood-900 transition-colors"
            >
              <InstagramIcon size={18} />
              <span className="text-xs uppercase tracking-widest font-medium">{BUSINESS.instagramHandle}</span>
            </a>
          </address>

          <div className="flex flex-col items-start md:items-end md:text-right">
            <p className="text-wood-900 font-serif text-xl leading-snug max-w-xs">
              &ldquo;Send us your floor plan or photos and we&rsquo;ll suggest options for free.&rdquo;
            </p>
          </div>
        </div>

        <p className="mt-16 text-wood-500 text-xs font-medium uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Woodflex Designs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
