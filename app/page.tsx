import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Img } from '@/components/Img';
import { PRODUCT_CATEGORIES, productAlt, productsIn } from '@/lib/catalog';
import { pageMetadata, webPageJsonLd, absoluteUrl } from '@/lib/seo';
import { BUSINESS } from '@/lib/site';

const TITLE = 'Woodflex Designs — Custom Furniture Manufacturer in Surat';
const DESCRIPTION =
  'Solid wood furniture built to your drawings and sizes. Sofas, dining tables, chairs and café seating, made in our Surat workshop for clients across India.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/', absoluteTitle: true });

const personas = [
  {
    id: 'architect',
    title: 'Architects',
    description: 'We collaborate to bring visionary spatial concepts to life with precision and craft.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'homeowner',
    title: 'House Owners',
    description: 'Bespoke furniture solutions that transform your house into a sanctuary of style.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'cafe',
    title: 'Cafe Owners',
    description: 'Durable, aesthetic, and functional designs to elevate your customer experience.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
  },
];

const steps = [
  { title: '01. Discovery', text: 'Understanding your space and functional requirements.' },
  { title: '02. Design', text: 'Creating sketches and 3D models for approval.' },
  { title: '03. Crafting', text: 'Precision woodworking using sustainable materials.' },
  { title: '04. Delivery', text: 'Installation and final touches in your space.' },
];

const faqs = [
  {
    q: 'Where is Woodflex Designs based?',
    a: `Our workshop is in Surat, Gujarat, India. We build every piece there and ship it to your site ready for installation.`,
  },
  {
    q: 'What furniture do you make?',
    a: 'Sofas, dining tables, dining chairs, lounge chairs, centre and side tables, planter stands, and café and retail seating — all made to order in solid wood.',
  },
  {
    q: 'Can you build furniture from my own drawing or reference photo?',
    a: 'Yes. We are manufacturers, not a design studio. We work from DWG files, PDFs, moodboards, reference photos or even rough sketches with sizes, and turn them into finished furniture.',
  },
  {
    q: 'Do you make single pieces or only bulk orders?',
    a: 'Both. Whether you need one prototype or 30 pieces for a project, our workshop is set up for it.',
  },
  {
    q: 'Which woods and finishes can I choose from?',
    a: 'Teak, sheesham (Indian rosewood), mango, acacia and white ash, in finishes including dark brown polish, natural light brown polish, matte black and wire-brushed.',
  },
  {
    q: 'How do I get a quote?',
    a: `Send us your drawings, photos or sizes on WhatsApp at ${BUSINESS.phoneDisplay} or through our contact page. We reply with feasibility, rough costing and timelines.`,
  },
];

export default function HomePage() {
  const categories = PRODUCT_CATEGORIES.map((c) => ({ ...c, items: productsIn(c) })).filter((c) => c.items.length > 0);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: '/',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [{ name: 'Home', path: '/' }],
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${absoluteUrl('/')}#faq`,
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      {/* HERO */}
      <section className="relative w-full pt-40 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-ink/60 mb-8 animate-fade-in-up">
          Custom furniture manufacturers · Surat, India
        </p>
        <h1 className="font-serif text-[11vw] md:text-[7vw] leading-[0.85] uppercase text-ink">
          <span className="block animate-fade-in-up">Designed by you,</span>
          <span className="block animate-fade-in-up [animation-delay:120ms]">crafted by us.</span>
        </h1>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start w-full border-t border-ink/20 pt-8">
          <div className="max-w-md">
            <p className="text-lg leading-relaxed font-light mb-6">
              We&rsquo;re manufacturers, not a design studio. Bring us drawings, references, or moodboards, and we&rsquo;ll
              turn them into real furniture, complete with the right wood, joinery, polish, and after-sales support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-ink text-white text-xs uppercase tracking-widest rounded-full hover:bg-black transition-colors"
              >
                Browse products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-ink/30 text-xs uppercase tracking-widest rounded-full hover:bg-ink hover:text-white transition-colors"
              >
                Start a project
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="block text-sm uppercase tracking-widest mb-2">Est. {BUSINESS.foundingYear}</span>
            <span className="block text-sm uppercase tracking-widest">Surat, India</span>
          </div>
        </div>
      </section>

      {/* WHO ARE YOU */}
      <section aria-labelledby="who-heading" className="w-full py-24 md:py-32 px-6 md:px-12 bg-white text-ink">
        <div className="max-w-[1800px] mx-auto">
          <h2 id="who-heading" className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] mb-20 md:mb-32">
            Who are you?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {personas.map((persona, i) => (
              <Link
                key={persona.id}
                href={`/contact?role=${persona.id}`}
                className="group relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl bg-gray-100 block transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={persona.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium tracking-widest uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                      0{i + 1}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-4">{persona.title}</h3>
                    <p className="max-w-xs text-sm md:text-base text-white/85">{persona.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE MAKE */}
      <section aria-labelledby="make-heading" className="w-full py-24 px-6 md:px-12 bg-stone">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2 id="make-heading" className="font-serif text-5xl md:text-7xl leading-none">
              What we make
            </h2>
            <p className="max-w-md text-ink/60">
              Every design below can be resized, re-timbered and re-finished for your project.
            </p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products#${c.slug}`} className="group block">
                  <div className="aspect-[4/5] bg-white rounded-sm overflow-hidden mb-3">
                    <Img
                      image={c.items[0].image}
                      alt={productAlt(c.items[0])}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-xl">{c.label}</h3>
                  <p className="text-xs uppercase tracking-widest text-ink/50 mt-1">{c.items.length} designs</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section aria-labelledby="method-heading" className="w-full py-24 bg-ink text-stone">
        <div className="px-6 md:px-12 max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-stone/60 mb-4">Our Method</p>
            <h2 id="method-heading" className="font-serif text-5xl md:text-7xl leading-none">
              How we
              <br />
              work
            </h2>
          </div>
          <div className="space-y-8 md:pt-4">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-stone/80">
              We believe in a collaborative process that starts with understanding your needs and ends with a piece of
              furniture that is truly yours. From sketch to final polish, every step is handled with care.
            </p>
            <ol className="grid grid-cols-2 gap-8">
              {steps.map((s) => (
                <li key={s.title}>
                  <h3 className="text-lg font-serif mb-2">{s.title}</h3>
                  <p className="text-sm text-stone/60">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section aria-labelledby="why-heading" className="w-full py-24 bg-wood-50 border-b border-wood-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="why-heading" className="font-serif text-3xl md:text-4xl text-wood-900 text-center mb-20">
            Why teams trust a small workshop
            <br />
            over big catalogs.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200">Built to your space</h3>
              <p className="text-wood-600 font-light leading-relaxed">
                Standard catalog sizes rarely fit Indian homes or compact café layouts perfectly. We adjust dimensions of
                our sofas, dining tables, and jhulas to fit your specific floor plan down to the inch.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200">Material clarity</h3>
              <p className="text-wood-600 font-light leading-relaxed">
                No mystery materials. Order any major product in three simple bands:{' '}
                <strong className="font-medium text-wood-800">Essentials</strong> (solid mango/acacia),{' '}
                <strong className="font-medium text-wood-800">Plus</strong> (teak/oak), or{' '}
                <strong className="font-medium text-wood-800">Signature</strong> (premium imported grains and fabrics).
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200">From workshop to site</h3>
              <p className="text-wood-600 font-light leading-relaxed">
                We handle the messy part. From a quick concept call to dimensions freeze, we build it in our Surat
                workshop with proper joinery and ship it directly to your site ready for installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="w-full py-24 px-6 md:px-12 bg-stone">
        <div className="max-w-4xl mx-auto">
          <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl mb-12">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-xl md:text-2xl">
                  <h3>{f.q}</h3>
                  <span aria-hidden="true" className="ml-6 text-2xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink/70 leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
