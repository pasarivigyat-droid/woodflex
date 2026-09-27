import Link from 'next/link';
import { Droplets, TreePine } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Img } from '@/components/Img';
import { WOOD_FINISHES, WOOD_TYPES, type Material } from '@/lib/catalog';
import { absoluteUrl, pageMetadata, webPageJsonLd } from '@/lib/seo';

const TITLE = 'Wood Types & Furniture Finishes';
const DESCRIPTION =
  'Compare the woods and finishes we build with: teak, sheesham, mango, acacia and white ash, plus dark brown, natural, matte black and wire-brushed finishes.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/materials' });

function MaterialGrid({ items, kind }: { items: Material[]; kind: string }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((m, i) => (
        <li key={m.id} id={m.id} className="scroll-mt-32">
          <article className="h-full bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden">
            <div className="aspect-[16/9] bg-[#121212] overflow-hidden">
              <Img
                image={m.image}
                alt={`${m.name} — ${kind.toLowerCase()} sample`}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <p className="text-white/40 text-xs font-mono mb-3 tracking-widest uppercase">
                {kind} {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-3xl mb-4 text-gold leading-tight">{m.name}</h3>
              <p className="text-white/70 leading-relaxed mb-6 font-light">{m.description}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`${m.name} properties`}>
                {m.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/80"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function MaterialsPage() {
  return (
    <div className="bg-ink text-[#eff1f3] pt-36 pb-24 px-6 md:px-12">
      <JsonLd
        data={webPageJsonLd({
          path: '/materials',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Materials', path: '/materials' },
          ],
          mainEntity: {
            '@type': 'ItemList',
            name: 'Woods and finishes available from Woodflex Designs',
            itemListElement: [...WOOD_TYPES, ...WOOD_FINISHES].map((m, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: m.name,
              description: m.description,
              image: absoluteUrl(m.image.src),
              url: absoluteUrl(`/materials#${m.id}`),
            })),
          },
        })}
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">Materials Library</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">Wood types &amp; finishes</h1>
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
            Every piece we build starts with the right timber and ends with the right finish. Here are the woods and
            polishes we work with most — we&rsquo;ll help you pick what suits your room, your budget and how the piece
            will be used.
          </p>
        </header>

        <section aria-labelledby="woods-heading" className="mb-24">
          <h2 id="woods-heading" className="flex items-center gap-3 text-sm uppercase tracking-widest text-gold mb-10">
            <TreePine size={16} aria-hidden="true" /> Wood types
          </h2>
          <MaterialGrid items={WOOD_TYPES} kind="Wood" />
        </section>

        <section aria-labelledby="finishes-heading" className="mb-24">
          <h2 id="finishes-heading" className="flex items-center gap-3 text-sm uppercase tracking-widest text-gold mb-10">
            <Droplets size={16} aria-hidden="true" /> Finishes
          </h2>
          <MaterialGrid items={WOOD_FINISHES} kind="Finish" />
        </section>

        <section className="border-t border-white/10 pt-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="font-serif text-2xl md:text-3xl max-w-2xl">
            Not sure which wood fits your project? Send us your reference and we&rsquo;ll recommend one.
          </p>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 bg-gold text-ink rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
          >
            Ask the workshop
          </Link>
        </section>
      </div>
    </div>
  );
}
