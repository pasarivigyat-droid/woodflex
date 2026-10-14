import { Mail, MapPin, Phone, Truck } from 'lucide-react';
import { InstagramIcon } from '@/components/InstagramIcon';
import { JsonLd } from '@/components/JsonLd';
import { BUSINESS_ID, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { ADDRESS_LINES, BUSINESS, DELIVERY_LINE, PHONES, deliveryAreaNames, listInWords } from '@/lib/site';

const TITLE = 'Contact Us — Custom Furniture Quotes';
const DESCRIPTION =
  'Call +91 94290 04803 or email woodflexdesigns@gmail.com for feasibility, rough costing and timelines, or visit our workshop in Surat, Gujarat.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/contact' });

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${BUSINESS.name}, ${ADDRESS_LINES.join(', ')}`,
)}`;

export default function ContactPage() {
  return (
    <div className="pt-40 pb-24">
      <JsonLd
        data={webPageJsonLd({
          type: 'ContactPage',
          path: '/contact',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ],
          mainEntity: { '@id': BUSINESS_ID },
        })}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <div className="flex flex-col">
            <h1 className="text-sm uppercase tracking-[0.2em] font-bold text-ink/50 mb-8">Contact Woodflex Designs</h1>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink mb-8">
              Tell us what you&rsquo;re planning. We&rsquo;ll tell you if we can build it.
            </h2>
            <p className="text-xl leading-relaxed font-light text-ink/70 max-w-lg mb-12">
              Call us or email us with a few details about your project and we&rsquo;ll get back with feasibility,
              rough costing and timelines. Architects can email drawings; homeowners can share reference links or
              screenshots.
            </p>

            <div className="space-y-6 text-ink/80">
              <div className="flex gap-4">
                <Truck size={20} className="mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-1">Delivery</h3>
                  <p>{DELIVERY_LINE}</p>
                  <p className="text-sm text-ink/60">We deliver to {listInWords(deliveryAreaNames)}.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <InstagramIcon size={20} className="mt-1 shrink-0" />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-1">Instagram</h3>
                  <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    {BUSINESS.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <address className="not-italic bg-white p-8 md:p-12 shadow-sm border border-ink/5 rounded-sm self-start space-y-10">
            <div className="flex gap-4">
              <Phone size={22} className="mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-3">Call us</h3>
                <ul className="space-y-2">
                  {PHONES.map((p) => (
                    <li key={p.e164}>
                      <a href={`tel:${p.e164}`} className="font-serif text-2xl md:text-3xl text-ink hover:underline underline-offset-4">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={22} className="mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-3">Email</h3>
                <a href={`mailto:${BUSINESS.email}`} className="text-lg text-ink break-all hover:underline underline-offset-4">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin size={22} className="mt-1 shrink-0" aria-hidden="true" />
              <div className="text-ink/80">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-3">Workshop</h3>
                {ADDRESS_LINES.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm underline underline-offset-4 hover:text-ink"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </address>
        </div>
      </div>
    </div>
  );
}
