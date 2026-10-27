import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { BUILD_FACTS } from '@/lib/faq';
import { pageMetadata, webPageJsonLd, BUSINESS_ID } from '@/lib/seo';
import { ABOUT_TEAM, DELIVERY_LINE, EXPERIENCE_LINE, deliveryAreaNames, listInWords } from '@/lib/site';

const TITLE = 'About Our Surat Furniture Workshop';
const DESCRIPTION =
  'Woodflex Designs is a small furniture workshop in Surat, Gujarat. Architects and homeowners bring us drawings; we build them in solid wood, inspected by hand.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/about' });

const forArchitects = [
  'You own the design. We focus only on execution.',
  'We work off DWG, PDFs, moodboards or even rough sketches with sizes.',
  'You get material options, realistic timelines and transparent costing.',
  'Need 1 prototype or 30 pieces for a project? We’re set up for both.',
];

const forHomeowners = [
  'When store catalogues don’t match your space, we build to size.',
  'You can start with a reference photo and basic measurements.',
  'We help you choose wood and finishes that will actually age well.',
  'Once a piece is delivered, we stay available for touch-ups and repeats.',
];

const buildPoints = [
  { title: 'Kiln-dried wood', text: BUILD_FACTS.wood },
  { title: 'Mortise-and-tenon joinery', text: BUILD_FACTS.joinery },
  { title: 'Foam and lining', text: BUILD_FACTS.foam },
  { title: '3-year warranty', text: BUILD_FACTS.warranty },
];

const reasons = [
  { title: 'Direct access to makers', desc: 'You talk to the people who actually build your pieces.' },
  { title: 'Custom over compromise', desc: 'Dimensions, wood and polish tuned to your project, not forced products.' },
  { title: 'Quality over volume', desc: 'Solid frames, clean joinery, hardware we’d use in our own homes.' },
  { title: 'Predictable outcomes', desc: 'We’d rather say no than over-promise on timelines or complexity.' },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-6">
      {items.map((bullet) => (
        <li key={bullet} className="flex gap-4 items-start text-lg text-ink/70">
          <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-ink/30 flex-shrink-0" />
          {bullet}
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-40">
      <JsonLd
        data={webPageJsonLd({
          type: 'AboutPage',
          path: '/about',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ],
          mainEntity: { '@id': BUSINESS_ID },
        })}
      />

      {/* INTRO */}
      <section className="px-6 md:px-12 py-24 border-b border-ink/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          <div>
            <h1 className="text-sm uppercase tracking-[0.2em] font-bold text-ink/50">About Woodflex Designs</h1>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] text-ink mb-12">
              A small furniture workshop built for custom work, not catalogues.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-ink/80 max-w-3xl">
              Woodflex Designs is a manufacturing studio in Surat. We don&rsquo;t run a design agency or a giant
              showroom. Architects, interior designers and homeowners bring us drawings, references or 3D views – we turn
              them into finished furniture with the right wood, polish and joinery. Every piece is built in small batches,
              inspected by hand, and delivered with the mindset that it should survive moves, kids and real life.
            </p>
            <p className="mt-8 text-xl md:text-2xl leading-relaxed font-light text-ink/80 max-w-3xl">{EXPERIENCE_LINE}</p>
            <p className="mt-8 text-sm uppercase tracking-widest text-ink">{DELIVERY_LINE}</p>
            <p className="mt-2 text-ink/60">We deliver to {listInWords(deliveryAreaNames)}.</p>
          </div>
        </div>
      </section>

      {/* WHO WE'RE FOR */}
      <section aria-labelledby="for-heading" className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 id="for-heading" className="text-sm uppercase tracking-[0.2em] font-bold text-ink/50 mb-16">
            Who we&rsquo;re for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h3 className="font-serif text-3xl mb-8">For architects &amp; interior designers</h3>
              <BulletList items={forArchitects} />
            </div>
            <div>
              <h3 className="font-serif text-3xl mb-8">For homeowners</h3>
              <BulletList items={forHomeowners} />
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section aria-labelledby="build-heading" className="px-6 md:px-12 py-24 border-t border-ink/10">
        <div className="max-w-7xl mx-auto">
          <h2 id="build-heading" className="font-serif text-4xl md:text-5xl mb-16">
            How we build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
            {buildPoints.map((point) => (
              <div key={point.title} className="border-t border-ink/10 pt-8">
                <h3 className="font-serif text-2xl mb-3">{point.title}</h3>
                <p className="text-lg text-ink/70 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="inline-block mt-12 text-sm underline underline-offset-4 hover:text-ink">
            More questions? See our FAQ
          </Link>
        </div>
      </section>

      {/* THE PEOPLE BEHIND WOODFLEX */}
      <section aria-labelledby="team-heading" className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 id="team-heading" className="text-sm uppercase tracking-[0.2em] font-bold text-ink/50 mb-6">
            The people behind Woodflex
          </h2>
          <p className="font-serif text-3xl md:text-4xl leading-snug max-w-3xl mb-16">
            A small team that runs the workshop, the numbers and your project from first drawing to delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {ABOUT_TEAM.map((person) => (
              <article key={person.name} className="border-t border-ink/10 pt-8">
                <h3 className="font-serif text-2xl">{person.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest font-bold text-ink/50">{person.role}</p>
                <p className="mt-4 text-ink/70 leading-relaxed">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY A SMALL WORKSHOP */}
      <section aria-labelledby="trust-heading" className="px-6 md:px-12 py-24 bg-ink text-stone">
        <div className="max-w-7xl mx-auto">
          <h2 id="trust-heading" className="font-serif text-4xl md:text-5xl mb-16">
            Why teams trust a small workshop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
            {reasons.map((item) => (
              <div key={item.title} className="border-t border-white/10 pt-8">
                <h3 className="font-serif text-xl mb-3 tracking-wide">{item.title}</h3>
                <p className="text-stone/60 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="px-6 py-3 bg-stone text-ink text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-stone/30 text-xs uppercase tracking-widest rounded-full hover:bg-stone hover:text-ink transition-colors"
            >
              Talk to the workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
