import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ProductBrowser } from '@/components/ProductBrowser';
import { PRODUCT_CATEGORIES, products, productsIn } from '@/lib/catalog';
import { absoluteUrl, pageMetadata, webPageJsonLd } from '@/lib/seo';

const TITLE = 'Sofas, Dining Tables & Chairs Catalogue';
const DESCRIPTION =
  `Browse ${products.length} made-to-order designs: sofas, dining tables, chairs, lounge chairs, centre tables and café seating, with technical drawings. Made in Surat.`;

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/products' });

export default function ProductsPage() {
  const sections = PRODUCT_CATEGORIES.map((category) => ({ category, items: productsIn(category) })).filter(
    (s) => s.items.length > 0,
  );
  const all = sections.flatMap((s) => s.items.map((p) => ({ p, c: s.category })));

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-wood-900 pb-24 pt-28 md:pt-36 px-6 md:px-12">
      <JsonLd
        data={webPageJsonLd({
          type: 'CollectionPage',
          path: '/products',
          name: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ],
          mainEntity: {
            '@type': 'ItemList',
            name: 'Woodflex Designs furniture catalogue',
            numberOfItems: all.length,
            itemListElement: all.map(({ p, c }, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${p.title} (${p.id})`,
              description: `Custom ${c.singular}, made to order in Surat.`,
              image: absoluteUrl(p.image.src),
              url: absoluteUrl(`/products#${c.slug}`),
            })),
          },
        })}
      />

      <header className="max-w-7xl mx-auto mb-12">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex gap-2 text-xs uppercase tracking-widest text-wood-900/50">
            <li>
              <Link href="/" className="hover:text-wood-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Products</li>
          </ol>
        </nav>
        <h1 className="font-serif text-4xl md:text-6xl">Custom Furniture Collection</h1>
        <p className="text-wood-900/60 mt-4 max-w-2xl text-lg">
          Explore our catalogue of handcrafted furniture, built in our Surat workshop. Every design is a starting point
          — we resize it, change the wood and finish, and build it to your drawings.
        </p>
      </header>

      <ProductBrowser sections={sections} />
    </div>
  );
}
