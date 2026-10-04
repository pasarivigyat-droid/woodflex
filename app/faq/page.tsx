import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { FAQS } from '@/lib/faq';
import { absoluteUrl, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';

const TITLE = 'FAQ — Wood, Joinery, Warranty & Delivery';
const DESCRIPTION =
  'Answers about our kiln-dried solid wood, mortise-and-tenon joinery, sofa foam, 3-year warranty, samples, and delivery across India from our Surat workshop.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/faq' });

export default function FaqPage() {
  return (
    <div className="pt-40 pb-24 px-6 md:px-12">
      <JsonLd
        data={webPageJsonLd({
          path: '/faq',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ],
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${absoluteUrl('/faq')}#faq`,
          url: absoluteUrl('/faq'),
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex gap-2 text-xs uppercase tracking-widest text-ink/50">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">FAQ</li>
          </ol>
        </nav>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">Frequently asked questions</h1>
        <p className="text-xl font-light text-ink/70 leading-relaxed mb-16 max-w-2xl">
          How we build, what goes into every piece, and how to work with us.
        </p>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((f) => (
            <section key={f.id} id={f.id} aria-labelledby={`${f.id}-q`} className="py-10 scroll-mt-28">
              <h2 id={`${f.id}-q`} className="font-serif text-2xl md:text-3xl mb-4">
                {f.q}
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed max-w-3xl">{f.a}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-serif text-2xl max-w-xl">Have a question we haven&rsquo;t answered?</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-ink text-white text-xs uppercase tracking-widest rounded-full hover:bg-black transition-colors"
            >
              Ask us on WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border border-ink/30 text-xs uppercase tracking-widest rounded-full hover:bg-ink hover:text-white transition-colors"
            >
              Contact page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
