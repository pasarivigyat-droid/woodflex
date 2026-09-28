import { ArrowDown } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Img } from '@/components/Img';
import { WorkGallery } from '@/components/WorkGallery';
import { heroImage, showcaseAlt, showcaseItems } from '@/lib/catalog';
import { absoluteUrl, BUSINESS_ID, pageMetadata, webPageJsonLd } from '@/lib/seo';

const TITLE = 'Our Work — Custom Furniture Projects';
const DESCRIPTION =
  'Photos of custom chairs, sofas and bed frames built by Woodflex Designs — shown in clients’ homes and in our workshop in Surat, Gujarat.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/work' });

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-ink pt-28 md:pt-36 pb-24">
      <JsonLd
        data={webPageJsonLd({
          type: 'CollectionPage',
          path: '/work',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Our Work', path: '/work' },
          ],
          mainEntity: {
            '@type': 'ImageGallery',
            name: 'Woodflex Designs project gallery',
            creator: { '@id': BUSINESS_ID },
            image: showcaseItems.map((item) => ({
              '@type': 'ImageObject',
              contentUrl: absoluteUrl(item.image.src),
              caption: showcaseAlt(item),
              width: item.image.width,
              height: item.image.height,
              creator: { '@id': BUSINESS_ID },
              copyrightHolder: { '@id': BUSINESS_ID },
            })),
          },
        })}
      />

      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-5/12 text-center lg:text-left animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.3em] text-wood-600 font-bold mb-6">Project Showcase</p>
            <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] mb-8 tracking-tighter">
              Built for <br />
              <span className="italic">Real Homes</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/60 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
              A curated gallery of our workshop creations. Every piece is allowed to keep its natural story, precisely
              as it lives in a home.
            </p>
            <a
              href="#work-grid"
              className="inline-flex px-8 py-4 bg-ink text-white rounded-full text-xs uppercase tracking-widest hover:bg-black transition-all items-center gap-3"
            >
              View Gallery <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="w-full lg:w-7/12">
            <div className="aspect-[16/10] md:aspect-[16/9] bg-wood-50 overflow-hidden rounded-2xl shadow-2xl">
              <Img
                image={heroImage}
                alt="Craftsman cutting timber for custom chairs in the Woodflex Designs workshop, Surat"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <WorkGallery items={showcaseItems} />
    </div>
  );
}
